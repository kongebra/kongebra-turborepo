import { Product } from "@prisma/client";
import { prisma } from "src/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getQueryNumberValue } from "src/utils/query";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = getQueryNumberValue("id", req);

  if (!id) {
    return res.status(403).end("bad request");
  }

  switch (req.method) {
    case "PUT":
      return await PUT(req, res, id);
    default:
      return res.status(405).end("method not allowed");
  }
}

async function PUT(req: NextApiRequest, res: NextApiResponse, id: number) {
  const data = JSON.parse(req.body) as { disabled: boolean };

  const product = await prisma.product.update({
    where: {
      id,
    },
    data,
  });

  res.status(200).json(product);
}
