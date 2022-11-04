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
