import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "src/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      return await POST(req, res);
    default:
      return res.status(405).end("method not allowed");
  }
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  const now = new Date().getTime();
  console.time(`createProducts - ${now}`);

  const input = JSON.parse(req.body) as {
    loc: string;
    lastmod: string;
    price: number;
    title: string;
    description: string;
    imageUrl: string;
    storeId: number;
  }[];

  res
    .status(200)
    .json({ message: "products being created", count: input.length });

  const data = input.map(({ price, ...rest }) => {
    return {
      ...rest,
      latestPrice: price,

      prices: {
        create: {
          amount: price,
          currency: "NOK",
        },
      },
    };
  });

  try {
    await prisma.product.createMany({
      data,
    });
  } catch (error) {
    console.error(`could not create many products`);
    console.error(error);
  }

  console.timeEnd(`createProducts - ${now}`);
}
