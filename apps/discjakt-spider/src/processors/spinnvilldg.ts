import { Job } from "bull";
import { CommonJobItem } from "../types";
import axios from "axios";
import { load } from "cheerio";
import { parsePriceString } from "../utils/price";
import { prisma } from "../lib/prisma";

export default async function processor({
  id,
  data: {
    loc,
    lastmod,
    store: { id: storeId },
  },
}: Job<CommonJobItem>) {
  console.time(`spinnvilldg - ${id}`);

  console.time(`spinnvilldg - ${id} - axios+load`);
  const response = await axios.get(loc);
  const html = response.data;
  const $ = load(html);
  console.timeEnd(`spinnvilldg - ${id} - axios+load`);

  const priceStr =
    $('meta[property="product:price:amount"]').attr("content")?.trim() || "";

  const price = parsePriceString(priceStr);

  const data = {
    title: $('meta[property="og:title"]').attr("content")?.trim() || "",
    description:
      $('meta[property="og:description"]').attr("content")?.trim() || "",
    imageUrl: $('meta[property="og:image"]').attr("content")?.trim() || "",
  };

  console.time(`spinnvilldg - ${id} - prisma.upsert`);
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
  console.timeEnd(`spinnvilldg - ${id} - prisma.upsert`);

  console.timeEnd(`spinnvilldg - ${id}`);
  return product;
}
