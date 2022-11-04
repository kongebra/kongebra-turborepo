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

  const priceStr = $(".product-price").first()?.text()?.trim() || "";

  const price = parsePriceString(priceStr);

  const data = {
    title: $("h1.product-title-v1").text()?.trim() || "",
    description: $('meta[name="description"]').attr("content")?.trim() || "",
    imageUrl: $(".product_page_slider img").first().attr("src")?.trim() || "",
  };

  const product = await prisma.product.create({
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

  await findDiscQueue.add(product);
}
