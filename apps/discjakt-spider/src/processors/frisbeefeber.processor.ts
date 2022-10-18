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
  console.time(`${path.basename(__filename, ".ts")} - ${id}`);

  const response = await axios.get(loc);
  const html = response.data;
  const $ = load(html);

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

  console.timeEnd(`${path.basename(__filename, ".ts")} - ${id}`);
  return product;
}
