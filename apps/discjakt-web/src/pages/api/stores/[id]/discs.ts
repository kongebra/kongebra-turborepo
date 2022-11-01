import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "src/common/lib/prisma";
import { getQueryNumberValue } from "src/common/utils/query";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = getQueryNumberValue("id", req);

  if (!id) {
    return res.status(403).end("bad request");
  }

  switch (req.method) {
    case "GET":
      return await GET(req, res, id);
    default:
      return res.status(405).end("method not allowed");
  }
}

async function GET(req: NextApiRequest, res: NextApiResponse, id: number) {
  const discs = await prisma.disc.findMany({
    where: {
      products: {
        some: {
          storeId: id,
        },
      },
    },

    include: {
      brand: true,
      products: true,
    },
  });

  res.status(200).json(discs);
}

async function POST(req: NextApiRequest, res: NextApiResponse) {}

async function PUT(req: NextApiRequest, res: NextApiResponse) {}

async function DELETE(req: NextApiRequest, res: NextApiResponse) {}
