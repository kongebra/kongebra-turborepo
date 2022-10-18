import type { NextApiRequest, NextApiResponse } from "next";
import config from "src/config";
import { prisma } from "src/lib/prisma";

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
  const stores = await prisma.store.findMany({
    take: 1,
    orderBy: {
      updatedAt: "asc",
    },
  });

  const store = [...stores].pop();
  if (store) {
    if (store.slug === "gurudiscgolf") {
      await fetch(`${config.baseUrl}/api/stores/crawl/${store.slug}/1`);
      await fetch(`${config.baseUrl}/api/stores/crawl/${store.slug}/2`);
      await fetch(`${config.baseUrl}/api/stores/crawl/${store.slug}/3`);
      await fetch(`${config.baseUrl}/api/stores/crawl/${store.slug}/4`);
    } else {
      await fetch(`${config.baseUrl}/api/stores/crawl/${store.slug}`);
    }

    res.status(200).json({ message: "scrape started", store: store.slug });

    return;
  }

  res.status(500).json({ message: "could not start scraping" });
}
