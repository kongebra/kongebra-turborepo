import axios from "axios";
import Bull from "bull";
import { load } from "cheerio";
import config from "../config";
import { prisma } from "../lib/prisma";
import { queueOptions } from "../queue";
import { CommonJobItem } from "../types";

export default async function sitemap() {
  console.time("starframe");
  const store = await prisma.store.upsert({
    where: {
      slug: "starframe",
    },
    create: {
      slug: "starframe",
      name: "Starframe Discgolf Shop AS",
      baseUrl: "https://starframe.no",
      sitemapUrl: "https://www.starframe.no/sitemap.xml",
    },
    update: {
      updatedAt: new Date(),
    },
  });

  let sitemaps: string[] = [store.sitemapUrl];

  const queue = Bull("common", config.redisUrl, queueOptions);
  const promises = new Array<Promise<Bull.Job<CommonJobItem>>>();

  for (const sitemap of sitemaps) {
    const response = await axios.get(sitemap);
    const html = await response.data;
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

  await Promise.all(promises);

  console.timeEnd("starframe");
}
