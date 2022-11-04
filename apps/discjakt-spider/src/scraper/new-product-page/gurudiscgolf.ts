import axios from "axios";
import { load } from "cheerio";
import { prisma } from "../../lib/prisma";
import { getQueues } from "../../queue";
import { parsePriceString } from "../../utils/price";

const { findDiscQueue } = getQueues();

export default async function handler({
  loc,
  lastmod,
  store,
}: {
  loc: string;
  lastmod: string;
  store: { id: number };
}) {
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

  await prisma.product.create({
    data: {
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl,
      loc,
      lastmod,
      latestPrice: price,
      storeId: store.id,
      updatedAt: new Date(),

      prices: {
        create: {
          amount: price,
          currency: "NOK",
        },
      },
    },
  });
}
