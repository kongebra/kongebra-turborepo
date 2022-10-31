import { Job } from "bull";
import axios from "axios";
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
  console.time(`gurudiscgolf - ${id}`);

  const response = await axios.get(loc);
  const html = response.data;
  const $ = load(html);

  const outOfStockText = $(".summary .stock.out-of-stock").text();
  const inStock = outOfStockText === "";

  if (!inStock) {
    console.log(loc);
  }

  const priceStr =
    $(".woocommerce-Price-amount.amount").first().text().trim() || "";

  const price = inStock ? parsePriceString(priceStr.replace("kr", "")) : 0;

  const data = {
    title: $('meta[property="og:title"]').attr("content")?.trim() || "",
    description:
      $('meta[property="og:description"]').attr("content")?.trim() || "",
    imageUrl:
      $(".woocommerce-product-gallery__wrapper img")
        .first()
        .attr("src")
        ?.trim() || "",
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

  console.timeEnd(`gurudiscgolf - ${id}`);
  return product;
}
