import axios from "axios";
import { load } from "cheerio";
import path from "path";
import { prisma } from "../lib/prisma";
import { getQueues } from "../queue";
import { checkLastmodUnderAge } from "../utils/lastmod";

const { commonQueue } = getQueues();

export default async function sitemap() {
  const now = new Date();
  console.time(`${path.basename(__filename, ".ts")} - ${now.getTime()}`);

  const store = await prisma.store.upsert({
    where: {
      slug: "starframe",
    },
    create: {
      name: "Krokhold Disc Golf Shop",
      slug: "krokholdgs",
      sitemapUrl: "https://krokholdgs.no/sitemap.xml",
      baseUrl: "https://krokholdgs.no/",
    },
    update: {
      updatedAt: new Date(),
    },
  });

  // const sitemapRes = await axios.get(store.sitemapUrl);
  // const xml = await sitemapRes.data;
  // const $$ = load(xml);

  let sitemaps: string[] = [store.sitemapUrl];
  // $$("sitemap").each((i, el) => {
  //   const loc = $$(el).find("loc").text().trim();

  //   if (loc.includes("store-products-sitemap")) {
  //     sitemaps.push(loc.trim());
  //   }
  // });

  const promises = new Array<any>();

  for (const sitemap of sitemaps) {
    const response = await axios.get(sitemap);
    const html = await response.data;
    const $ = load(html);

    $("url").each((i, el) => {
      const loc = $(el).find("loc").text().trim();
      const lastmod = $(el).find("lastmod").text().trim();

      if (checkLastmodUnderAge(lastmod, 365) && loc.includes("/products/")) {
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

  console.timeEnd(`${path.basename(__filename, ".ts")} - ${now.getTime()}`);
}
