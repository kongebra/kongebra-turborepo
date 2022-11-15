import { Product, Store } from "discjakt-db";
import axios from "axios";
import { load } from "cheerio";
import { prisma } from "../../lib/prisma";
import { parsePriceString } from "../../utils/price";

export default async function handler(product: Product & { store: Store }) {
  const response = await axios.get(product.loc);
  if (response.status !== 200) {
    await prisma.product.update({
      where: {
        loc: product.loc,
      },
      data: {
        disabled: true,
        updatedAt: new Date(),
      },
    });

    return;
  }

  const html = response.data;
  const $ = load(html);

  const outOfStockText = $(".summary .stock.out-of-stock").text();
  const inStock = outOfStockText === "";

  const priceStr =
    $(".woocommerce-Price-amount.amount").first().text().trim() || "";

  const price = inStock ? parsePriceString(priceStr.replace("kr", "")) : 0;

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
