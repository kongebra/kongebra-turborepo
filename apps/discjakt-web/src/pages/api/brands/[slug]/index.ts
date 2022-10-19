import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "src/lib/prisma";
import { getQueryStringValue } from "src/utils/query";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const slug = getQueryStringValue("slug", req);
  if (!slug) {
    return res.status(400).json({ message: "missing slug" });
  }

  switch (req.method) {
    case "GET":
      return await GET(req, res, slug);
    case "POST":
      return await POST(req, res);
    case "PUT":
      return await PUT(req, res);
    case "DELETE":
      return await DELETE(req, res);
    default:
      return res.status(405).end("method not allowed");
  }
}

async function GET(req: NextApiRequest, res: NextApiResponse, slug: string) {
  const brand = await prisma.brand.findFirst({
    where: {
      slug,
    },
  });

  if (!brand) {
    return res.status(404).json({ message: "brand not found" });
  }

  res.status(200).json(brand);
}

async function POST(req: NextApiRequest, res: NextApiResponse) {}

async function PUT(req: NextApiRequest, res: NextApiResponse) {}

async function DELETE(req: NextApiRequest, res: NextApiResponse) {}
