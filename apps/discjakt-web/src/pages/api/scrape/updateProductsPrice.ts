import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "src/lib/prisma";

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
    console.time(`updateProductsPrice - ${now}`);

    const input = JSON.parse(req.body) as { lastmod: string; id: number }[];

    const ids = input.map(({ id }) => id);
    const lookupTable = new Map(input.map(({ id, lastmod }) => [id, lastmod]));

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        prices: {
          take: 1,
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    res.status(200).json({
      message: "updating product prices",
      count: products.length,
    });

    await Promise.all(
      products.map(async (product) => {
        const price = [...product.prices].pop();

        if (price) {
          await prisma.product.update({
            where: {
              id: product.id,
            },
            data: {
              latestPrice: price.amount,
              lastmod: lookupTable.get(product.id),

              prices: {
                create: {
                  amount: price.amount,
                  currency: "NOK",
                },
              },
            },
          });
        } else {
          await prisma.product.update({
            where: {
              id: product.id,
            },
            data: {
              latestPrice: 0,
              lastmod: lookupTable.get(product.id),

              prices: {
                create: {
                  amount: 0,
                  currency: "NOK",
                },
              },
            },
          });
        }
      })
    );

    console.timeEnd(`updateProductsPrice - ${now}`);
  } catch (error) {
    console.error(`could not fetch products`);
    console.error(error);
  }
}
