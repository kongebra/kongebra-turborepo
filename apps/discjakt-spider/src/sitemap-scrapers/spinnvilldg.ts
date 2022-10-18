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

  const promises = new Array<any>();

  const response = await axios.get(
    "https://www.spinnvilldg.no/store-products-sitemap.xml"
  );
  const html = await response.data;
  const $ = load(html);

  $("url").each((i, el) => {
    const loc = $(el).find("loc").text().trim();
    const lastmod = $(el).find("lastmod").text().trim();

    if (checkLastmodUnderAge(lastmod, 365) && loc.includes("/product-page/")) {
      promises.push(
        commonQueue.add({
          loc,
          lastmod,
          store: { id: store.id, slug: store.slug },
        })
      );
    }
  });

  await Promise.all(promises);

  console.timeEnd(`${path.basename(__filename, ".ts")} - ${now.getTime()}`);
}
