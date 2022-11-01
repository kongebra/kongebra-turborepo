import { Product, Store } from "@prisma/client";
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

  const priceStr = $(".product-price").first()?.text()?.trim() || "";

  const price = parsePriceString(priceStr);

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
