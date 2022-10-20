import { Job } from "bull";
import { CommonJobItem } from "../types";
import axios from "axios";
import { load } from "cheerio";
import { parsePriceString } from "../utils/price";
import { prisma } from "../lib/prisma";
import path from "path";

export default async function processor({
  id,
  data: {
    loc,
    lastmod,
    store: { id: storeId },
  },
}: Job<CommonJobItem>) {
  console.time(`frisbeesor - ${id}`);

  const response = await axios.get(loc);
  const html = response.data;
  const $ = load(html);

  const outOfStockText = $(".stock.out-of-stock").text();
  const inStock = outOfStockText === "";

  const priceStr = $(".product-page-price .amount").text().slice(3) || "";

  const price = parsePriceString(priceStr);

  const data = {
    title: $('meta[property="og:title"]').attr("content")?.trim() || "",
    description:
      $('meta[property="og:description"]').attr("content")?.trim() || "",
    imageUrl: $(".product-images img").first().attr("src")?.trim() || "",
  };

  const product = await prisma.product.upsert({
    where: {
      loc,
    },
    create: {
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl,
      loc,
      lastmod,
      latestPrice: inStock ? price : 0,
      storeId,
      updatedAt: new Date(),

      prices: {
        create: {
          amount: price,
          currency: "NOK",
        },
      },
    },
    update: {
      latestPrice: price,
      lastmod,
      updatedAt: new Date(),
      imageUrl: data.imageUrl,

      prices: {
        create: {
          amount: price,
          currency: "NOK",
        },
      },
    },
  });

  console.timeEnd(`frisbeesor - ${id}`);
  return product;
}
