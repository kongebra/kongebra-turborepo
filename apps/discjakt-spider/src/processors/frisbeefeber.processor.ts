import axios from "axios";
import { Job } from "bull";
import { load } from "cheerio";

import { prisma } from "../lib/prisma";
import { CommonJobItem } from "../types";
import { parsePriceString } from "../utils/price";

export default async function processor({
  id,
  data: {
    loc,
    lastmod,
    store: { id: storeId },
  },
}: Job<CommonJobItem>) {
  console.time(`frisbeefeber - ${id}`);

  const response = await axios.get(loc);
  const html = response.data;
  const $ = load(html);

  const soldOutText = $(".product_stock.stock_box").text();
  const inStock = !soldOutText.includes("**");

  const priceStr = $(".product-price").first()?.text()?.trim() || "";

  const price = parsePriceString(priceStr);

  const data = {
    title: $("h1").first().text()?.trim() || "",
    description: $(".product-information .panel-body").text()?.trim() || "",
    imageUrl:
      $(".product_image_price_row img").first().attr("src")?.trim() || "",
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

      prices: {
        create: {
          amount: price,
          currency: "NOK",
        },
      },
    },
  });

  console.timeEnd(`frisbeefeber - ${id}`);
  return product;
}
