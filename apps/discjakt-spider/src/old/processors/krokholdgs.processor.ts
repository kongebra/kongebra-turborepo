import axios from "axios";
import { Job } from "bull";
import { load } from "cheerio";

import { prisma } from "../../lib/prisma";
import { CommonJobItem } from "../../types";
import { parsePriceString } from "../../utils/price";

export default async function processor({
  id,
  data: {
    loc,
    lastmod,
    store: { id: storeId },
  },
}: Job<CommonJobItem>) {
  console.time(`krokholdgs - ${id}`);

  const response = await axios.get(loc);
  const html = response.data;
  const $ = load(html);

  const priceStr = $("span.product-price")?.text()?.trim() || "";

  const price = parsePriceString(priceStr);

  const data = {
    title: $('meta[property="og:title"]').attr("content")?.trim() || "",
    description:
      $('meta[property="og:description"]').attr("content")?.trim() || "",
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

  console.timeEnd(`krokholdgs - ${id}`);
  return product;
}
