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
  console.time(`dgshop - ${id}`);

  const response = await axios.get(loc);
  const html = response.data;
  const $ = load(html);

  const priceStr =
    $('meta[property="product:price:amount"]').attr("content")?.trim() || "";

  const price = parsePriceString(priceStr);

  const data = {
    title: $('meta[property="og:title"]').attr("content")?.trim() || "",
    description:
      $('meta[property="og:description"]').attr("content")?.trim() || "",
    imageUrl: $(".product.media img").first().attr("src")?.trim() || "",
  };

  if (!data.title && !data.imageUrl && !data.description && !priceStr) {
    console.log("dgshop edgecase", { data, priceStr });
    return;
  }

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
      latestPrice: price,
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

      prices: {
        create: {
          amount: price,
          currency: "NOK",
        },
      },
    },
  });

  console.timeEnd(`dgshop - ${id}`);
  return product;
}
