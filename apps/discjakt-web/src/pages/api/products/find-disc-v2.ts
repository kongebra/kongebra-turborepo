import { findDiscMatch } from "discjakt-utils";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "src/common/lib/prisma";
import { getQueryStringValue } from "src/common/utils/query";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const title = getQueryStringValue("title", req);

  if (!title) {
    return res.status(400).json({ message: "bad request" });
  }

  switch (req.method) {
    case "GET":
      return await GET(req, res, title);
    default:
      return res.status(405).end("method not allowed");
  }
}

async function GET(req: NextApiRequest, res: NextApiResponse, title: string) {
  const matches = await findDiscMatch(title, async (haystack: string[]) => {
    return await prisma.disc.findMany({
      where: {
        OR: [
          {
            name: {
              in: haystack,
              mode: "insensitive",
            },
          },
          {
            slug: {
              in: haystack,
              mode: "insensitive",
            },
          },
        ],
      },
    });
  });

  res.status(200).json(matches);
}

async function POST(req: NextApiRequest, res: NextApiResponse) {}

async function PUT(req: NextApiRequest, res: NextApiResponse) {}

async function DELETE(req: NextApiRequest, res: NextApiResponse) {}
