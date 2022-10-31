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
  console.time(`discoverdiscs - ${id}`);

  const response = await axios.get(loc);
  const html = response.data;
  const $ = load(html);

  const soldOutText = $(".price--sold-out").text();
  const inStock = soldOutText === "";

  const priceStr =
    $('meta[property="og:price:amount"]').attr("content")?.trim() || "";

  const price = inStock ? parsePriceString(priceStr) : 0;

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

  console.timeEnd(`discoverdiscs - ${id}`);
  return product;
}
