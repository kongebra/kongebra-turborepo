import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "src/common/lib/prisma";
import {
  getQueryNumberValue,
  getQueryStringValue,
} from "src/common/utils/query";

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
  const minPrice = getQueryNumberValue("minPrice", req);
  const maxPrice = getQueryNumberValue("maxPrice", req);

  const discType = getQueryStringValue("discType", req);

  const brandId = getQueryNumberValue("brandId", req);

  const minSpeed = getQueryNumberValue("minSpeed", req);
  const maxSpeed = getQueryNumberValue("maxSpeed", req);

  const minGlide = getQueryNumberValue("minGlide", req);
  const maxGlide = getQueryNumberValue("maxGlide", req);

  const minTurn = getQueryNumberValue("minTurn", req);
  const maxTurn = getQueryNumberValue("maxTurn", req);

  const minFade = getQueryNumberValue("minFade", req);
  const maxFade = getQueryNumberValue("maxFade", req);

  const sortBy = getQueryStringValue("sortBy", req) || "updatedAt";
  const desc = sortBy?.startsWith("!") || false;

  const pageIndex = getQueryNumberValue("pageIndex", req) || 0;
  const pageSize = getQueryNumberValue("pageSize", req) || 10;

  const take = pageSize;
  const skip = pageIndex * take;

  const where: Prisma.DiscWhereInput = {
    speed: {
      gte: minSpeed,
      lte: maxSpeed,
    },

    glide: {
      gte: minGlide,
      lte: maxGlide,
    },

    turn: {
      gte: minTurn,
      lte: maxTurn,
    },

    fade: {
      gte: minFade,
      lte: maxFade,
    },

    type: discType
      ? {
          equals: discType,
        }
      : undefined,

    brandId: brandId ? { equals: brandId } : undefined,

    products: {
      every: {
        disabled: false,
      },
    },

    outOfProduction: false,
  };

  const orderBy: Prisma.DiscOrderByWithRelationInput = {
    [sortBy]: desc ? "desc" : "asc",
  };

  const totalCount = await prisma.disc.count({
    where,
  });

  const items = await prisma.disc.findMany({
    where,

    orderBy,

    include: {
      brand: true,
      products: true,
    },

    take,
    skip,
  });

  return res.status(200).json({ totalCount, items });
}
