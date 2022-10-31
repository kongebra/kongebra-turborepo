import axios from "axios";
import { load } from "cheerio";
import { prisma } from "../../lib/prisma";
import { parsePriceString } from "../../utils/price";

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

  const soldOutText = $(".product_stock.stock_box").text();
  const inStock = !soldOutText.includes("**");

  const priceStr = $(".product-price").first()?.text()?.trim() || "";

  const price = inStock ? parsePriceString(priceStr) : 0;

  const data = {
    title: $("h1").first().text()?.trim() || "",
    description: $(".product-information .panel-body").text()?.trim() || "",
    imageUrl:
      $(".product_image_price_row img").first().attr("src")?.trim() || "",
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
}
