import { Product, Store } from "@prisma/client";
import axios from "axios";
import { load } from "cheerio";
import { prisma } from "../../lib/prisma";
import { parsePriceString } from "../../utils/price";

export default async function handler(product: Product & { store: Store }) {
  const response = await axios.get(product.loc);
  const html = response.data;
  const $ = load(html);

  const outOfStockText = $(".stock.out-of-stock").text();
  const inStock = outOfStockText === "";

  const priceStr = $(".product-page-price .amount").text().slice(3) || "";

  const price = inStock ? parsePriceString(priceStr) : 0;

  await prisma.product.update({
    where: {
      loc: product.loc,
    },
    data: {
      latestPrice: price,
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
