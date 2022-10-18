import axios from "axios";
import Bull from "bull";
import { load } from "cheerio";
import config from "../config";
import { prisma } from "../lib/prisma";
import { queueOptions } from "../queue";
import { CommonJobItem } from "../types";

export default async function sitemap() {
  console.time("spinnvilldg");
  const store = await prisma.store.upsert({
    where: {
      slug: "spinnvilldg",
    },
    create: {
      slug: "spinnvilldg",
      name: "Spinnvill Disc Golf",
      baseUrl: "https://spinnvilldg.no",
      sitemapUrl: "https://www.spinnvilldg.no/sitemap.xml",
    },
    update: {
      updatedAt: new Date(),
    },
  });

  const queue = Bull("common", config.redisUrl, queueOptions);

  const promises = new Array<Promise<Bull.Job<CommonJobItem>>>();
  const response = await axios.get(
    "https://www.spinnvilldg.no/store-products-sitemap.xml"
  );
  const html = await response.data;
  const $ = load(html);

  $("url").each((i, el) => {
    const loc = $(el).find("loc").text().trim();
    const lastmod = $(el).find("lastmod").text().trim();

    if (loc.includes("/product-page/")) {
      promises.push(
        queue.add({ loc, lastmod, store: { id: store.id, slug: store.slug } })
      );
    }
  });

  await Promise.all(promises);

  console.timeEnd("spinnvilldg");
}
