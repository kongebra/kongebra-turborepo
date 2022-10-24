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
  console.time(`discshopen - ${id}`);

  const response = await axios.get(loc);
  const html = response.data;
  const $ = load(html);

  const priceStr =
    $(".woocommerce-Price-amount.amount").first().text().trim() || "";

  const price = parsePriceString(priceStr.replace("kr", ""));

  const data = {
    title: $('meta[property="og:title"]').attr("content")?.trim() || "",
    description: $('meta[name="description"]').attr("content")?.trim() || "",
    imageUrl: $('meta[property="og:image"]').attr("content")?.trim() || "",
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

  console.timeEnd(`discshopen - ${id}`);
  return product;
}
