import { Plastic } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "src/common/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await GET(req, res);
    case "POST":
      return await POST(req, res);
    default:
      return res.status(405).end("method not allowed");
  }
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
  const plastics = await prisma.plastic.findMany();

  res.status(200).json(plastics);
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  const record = req.body as Plastic;

  const plastic = await prisma.plastic.create({
    data: {
      ...record,
    },
  });

  res.status(200).json(plastic);
}
