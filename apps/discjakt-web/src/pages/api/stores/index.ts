import type { NextApiRequest, NextApiResponse } from "next";
import config from "src/common/config";
import { prisma } from "src/common/lib/prisma";

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
  const stores = await prisma.store.findMany();

  res.status(200).json(stores);
}
