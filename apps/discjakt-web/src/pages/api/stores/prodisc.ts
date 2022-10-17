// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Bull from "bull";
import { load } from "cheerio";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { createQueueClient } from "../../../lib/queue";

type Job = {
  loc: string;
  lastmod: string;
  store: {
    id: number;
    slug: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.time("prodisc");
  const store = await prisma.store.upsert({
    where: {
      slug: "prodisc",
    },
    create: {
      slug: "prodisc",
      name: "Prodisc",
      baseUrl: "https://prodisc.no",
      sitemapUrl: "https://www.prodisc.no/sitemap.xml",
    },
    update: {
      updatedAt: new Date(),
    },
  });

  if (!store) {
    return res.status(404).json({ message: "could not find store" });
  }

  const sitemapRes = await fetch(store.sitemapUrl);
  const xml = await sitemapRes.text();
  const $$ = load(xml);

  let sitemaps: string[] = [];
  $$("sitemap").each((i, el) => {
    const loc = $$(el).find("loc").text().trim();

    if (loc.includes("/sitemap_products_")) {
      sitemaps.push(loc);
    }
  });

  const queue = createQueueClient<Job>("common");
  const promises = new Array<Promise<Bull.Job<Job>>>();

  for (const sitemap of sitemaps) {
    const response = await fetch(sitemap);
    const html = await response.text();
    const $ = load(html);

    $("url").each((i, el) => {
      const loc = $(el).find("loc").text().trim();
      const lastmod = $(el).find("lastmod").text().trim();

      if (loc.includes("/products/")) {
        promises.push(
          queue.add({ loc, lastmod, store: { id: store.id, slug: store.slug } })
        );
      }
    });
  }

  const result = await Promise.all(promises);
  const data = result.map((job) => job.data);

  res.status(200).json({
    message: "jobs created",
    count: data.length,
    data,
  });

  console.timeEnd("prodisc");
}
