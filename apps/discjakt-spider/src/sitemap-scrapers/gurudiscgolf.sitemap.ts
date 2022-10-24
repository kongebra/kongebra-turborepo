import axios from "axios";
import { load } from "cheerio";

import { getQueues } from "../queue";
import { prisma } from "../lib/prisma";
import { checkLastmodUnderAge } from "../utils/lastmod";

const { commonQueue, storeQueues } = getQueues();

export default async function sitemap() {
  const now = new Date();
  console.time(`gurudiscgolf - ${now.getTime()}`);

  const store = await prisma.store.upsert({
    where: {
      slug: "gurudiscgolf",
    },
    create: {
      slug: "gurudiscgolf",
      name: "Guru Disc Golf",
      baseUrl: "https://gurudiscgolf.no",
      sitemapUrl: "https://www.gurudiscgolf.no/sitemap.xml",
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
          // commonQueue.add({
          //   loc,
          //   lastmod,
          //   store: { id: store.id, slug: store.slug },
          // })

          storeQueues.gurudiscgolf.add({
            loc,
            lastmod,
            store: { id: store.id },
          })
        );
      }
    });
  }

  await Promise.all(promises);

  console.timeEnd(`gurudiscgolf - ${now.getTime()}`);
}
