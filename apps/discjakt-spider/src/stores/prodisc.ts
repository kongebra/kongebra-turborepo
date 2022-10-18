import axios from "axios";
import Bull from "bull";
import { load } from "cheerio";
import config from "../config";
import { prisma } from "../lib/prisma";
import { queueOptions } from "../queue";
import { CommonJobItem } from "../types";

export default async function sitemap() {
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

  const sitemapRes = await axios.get(store.sitemapUrl);
  const xml = await sitemapRes.data;
  const $$ = load(xml);

  let sitemaps: string[] = [];
  $$("sitemap").each((i, el) => {
    const loc = $$(el).find("loc").text().trim();

    if (loc.includes("/sitemap_products_")) {
      sitemaps.push(loc);
    }
  });

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

  console.timeEnd("prodisc");
}
