// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Bull from "bull";
import { load } from "cheerio";
import type { NextApiRequest, NextApiResponse } from "next";
import { createQueueClient } from "lib/queue";
import configuration from "configuration";

type Job = {
  loc: string;
  lastmod: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.time("test");
  const queue = createQueueClient<Job>("spinnvill");

  const promises = new Array<Promise<Bull.Job<Job>>>();
  const response = await fetch(
    "https://www.spinnvilldg.no/store-products-sitemap.xml"
  );
  const html = await response.text();
  const $ = load(html);

  $("url").each((i, el) => {
    const loc = $(el).find("loc").text().trim();
    const lastmod = $(el).find("lastmod").text().trim();

    if (loc.includes("/product-page/")) {
      promises.push(queue.add({ loc, lastmod }));
    }
  });

  const result = await Promise.all(promises);
  const data = result.map((job) => job.data);

  res.status(200).json({ message: "jobs created", count: data.length, data });
  console.timeEnd("test");
}
