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
      slug: "dgshop",
    },
    create: {
      name: "DGShop",
      slug: "dgshop",
      baseUrl: "https://www.dgshop.no",
      sitemapUrl: "https://www.dgshop.no/sitemap.xml",
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
      const priority = $(el).find("priority").text().trim();

      if (
        lastmod &&
        checkLastmodUnderAge(lastmod, 365) &&
        priority == "1.0" &&
        loc !== "https://www.dgshop.no/"
      ) {
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
