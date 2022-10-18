import type { NextApiRequest, NextApiResponse } from "next";

import ScraperQueue from "src/pages/api/queues/scraper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await GET(req, res);
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

async function GET(req: NextApiRequest, res: NextApiResponse) {
  const job = {
    loc: "https://aceshop.no/products/magic-diamond",
    lastmod: "2022-08-28",
    store: {
      slug: "aceshop",
      id: 2,
    },
  };

  await ScraperQueue.enqueue(job, { delay: 1000 * 10 });

  res.status(200).json({ message: "job enqueued" });
}

async function POST(req: NextApiRequest, res: NextApiResponse) {}

async function PUT(req: NextApiRequest, res: NextApiResponse) {}

async function DELETE(req: NextApiRequest, res: NextApiResponse) {}
