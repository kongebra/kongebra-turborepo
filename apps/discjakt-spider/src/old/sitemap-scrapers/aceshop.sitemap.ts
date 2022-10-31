import axios from "axios";
import { load } from "cheerio";
import path from "path";
import { prisma } from "../lib/prisma";
import { getQueues } from "../queue";
import { checkLastmodUnderAge } from "../utils/lastmod";

const { commonQueue } = getQueues();

export default async function sitemap() {
  const now = new Date();

  console.time(`aceshop - ${now.getTime()}`);
  const store = await prisma.store.upsert({
    where: {
      slug: "aceshop",
    },
    create: {
      name: "Aceshop",
      slug: "aceshop",
      baseUrl: "https://www.aceshop.no",
      sitemapUrl: "https://www.aceshop.no/sitemap.xml",
    },
    update: {
      updatedAt: new Date(),
    },
  });

  let sitemaps: string[] = [store.sitemapUrl];

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

  console.timeEnd(`aceshop - ${now.getTime()}`);
}
