import { load } from "cheerio";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "src/lib/prisma";
import { StoreSlugs } from "src/types/store-slugs";
import { getStoreProduct } from "src/utils/store-scrape";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "PUT":
      return await PUT(req, res);
    default:
      return res.status(405).end("method not allowed");
  }
}

async function PUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    const now = new Date().getTime();
    console.time(`productsChanged - ${now}`);

    const input = JSON.parse(req.body) as { id: number; lastmod: string }[];

    const ids = input.map(({ id }) => id);
    const lookupTable = new Map(input.map(({ id, lastmod }) => [id, lastmod]));

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      select: {
        loc: true,
        description: true,
        imageUrl: true,
        title: true,
        latestPrice: true,
        id: true,
        lastmod: true,
        store: {
          select: {
            slug: true,
          },
        },
      },
    });

    res
      .status(200)
      .json({ message: "products checking changes", count: input.length });

    await Promise.all(
      products.map(async (product) => {
        // fetch html
        const response = await fetch(product.loc);
        const html = await response.text();
        const $ = load(html);

        // scrape data
        const data = getStoreProduct(product.store.slug as StoreSlugs)($);
        const lastmod = lookupTable.get(product.id);
        // check if any changes
        if (
          data.description !== product.description ||
          data.imageUrl !== product.imageUrl ||
          data.price !== product.latestPrice ||
          data.title !== product.title ||
          lastmod !== product.lastmod
        ) {
          try {
            const { price, ...rest } = data;
            // update data
            await prisma.product.update({
              where: {
                id: product.id,
              },
              data: {
                ...rest,

                lastmod: lookupTable.get(product.id),
                latestPrice: price,
              },
            });
          } catch (error) {
            console.error(`could not update product ${product.id}`);
            console.error(error);
          }
        }
      })
    );

    console.timeEnd(`productsChanged - ${now}`);
  } catch (error) {
    console.error(`could not fetch products`);
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
}
