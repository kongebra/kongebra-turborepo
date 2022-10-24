import { prisma } from "src/common/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await GET(req, res);
    default:
      return res.status(405).end("method not allowed");
  }
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
  const items = await prisma.product.findMany({
    where: {
      discId: null,
      isDisc: null,
    },
    take: 100,
    orderBy: {
      title: "asc",
    },
  });

  res.status(200).json(items);
}
