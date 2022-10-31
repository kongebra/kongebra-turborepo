import axios from "axios";
import { load } from "cheerio";

import { getQueues } from "../queue";
import { prisma } from "../lib/prisma";
import { checkLastmodUnderAge } from "../utils/lastmod";

const { commonQueue } = getQueues();

export default async function sitemap() {
  const now = new Date();
  console.time(`frisbeesor - ${now.getTime()}`);

  const store = await prisma.store.upsert({
    where: {
      slug: "frisbeesor",
    },
    create: {
      name: "Frisbee Sør",
      slug: "frisbeesor",
      baseUrl: "https://www.frisbeesor.no",
      sitemapUrl: "https://www.frisbeesor.no/sitemap.xml",
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

    if (loc.includes("/product-sitemap")) {
      sitemaps.push(loc.trim());
    }
  });

  const promises = new Array<any>();

  for (const sitemap of sitemaps) {
    const response = await axios.get(sitemap);
    const html = await response.data;
    const $ = load(html);

    $("url").each((i, el) => {
      const loc = $(el).find("loc").text().trim();
      const lastmod = $(el).find("lastmod").text().trim();

      if (checkLastmodUnderAge(lastmod, 365) && loc.includes("/produkt/")) {
        promises.push(
          commonQueue.add({
            loc,
            lastmod,
            store: { id: store.id, slug: store.slug },
          })
        );
      }
    });
  }

  await Promise.all(promises);

  console.timeEnd(`frisbeesor - ${now.getTime()}`);
}
