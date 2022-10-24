import type { NextApiRequest, NextApiResponse } from "next";
import { getQueryStringValue } from "src/common/utils/query";
import { prisma } from "src/common/lib/prisma";
import { productDetailsSelect } from "src/types/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const q = getQueryStringValue("q", req);

  switch (req.method) {
    case "GET":
      return await GET(req, res, q);
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

async function GET(
  req: NextApiRequest,
  res: NextApiResponse,
  query: string | undefined
) {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        {
          title: {
            contains: query,
          },
        },
        {
          store: {
            name: {
              contains: query,
            },
          },
        },
      ],
    },
    select: productDetailsSelect,
  });

  res.status(200).json(products);
}

async function POST(req: NextApiRequest, res: NextApiResponse) {}

async function PUT(req: NextApiRequest, res: NextApiResponse) {}

async function DELETE(req: NextApiRequest, res: NextApiResponse) {}
