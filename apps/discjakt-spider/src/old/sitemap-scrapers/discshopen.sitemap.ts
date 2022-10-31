import axios from "axios";
import { load } from "cheerio";
import path from "path";
import { prisma } from "../lib/prisma";
import { getQueues } from "../queue";
import { checkLastmodUnderAge } from "../utils/lastmod";

const { commonQueue, storeQueues } = getQueues();

export default async function sitemap() {
  const now = new Date();
  console.time(`discshopen - ${now.getTime()}`);

  const store = await prisma.store.upsert({
    where: {
      slug: "discshopen",
    },
    create: {
      slug: "discshopen",
      name: "DiscShopen",
      baseUrl: "https://discshopen.no",
      sitemapUrl: "https://www.discshopen.no/sitemap.xml",
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

    if (loc.includes("product-sitemap")) {
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
          storeQueues.discshopen.add({
            loc,
            lastmod,
            store: { id: store.id },
          })
        );
      }
    });
  }

  await Promise.all(promises);

  console.timeEnd(`discshopen - ${now.getTime()}`);
}
