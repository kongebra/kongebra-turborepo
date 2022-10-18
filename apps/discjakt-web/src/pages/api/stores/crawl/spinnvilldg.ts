import type { NextApiRequest, NextApiResponse } from "next";
import config from "src/config";
import { prisma } from "src/lib/prisma";
import { crawlHelper, fastCrawl, SitemapResponse } from "src/utils/crawl";
import { parsePriceString } from "src/utils/number";
import { scaper } from "src/utils/scraper";
import { getStoreLoc } from "src/utils/store-loc";
import { getStoreProduct } from "src/utils/store-scrape";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    console.time("spinnvilldg");

    const store = await prisma.store.upsert({
      where: {
        slug: "spinnvilldg",
      },
      create: {
        name: "Spinnvill Disc Golf",
        slug: "spinnvilldg",
        sitemapUrl: "https://spinnvilldg.no/sitemap.xml",
        baseUrl: "https://spinnvilldg.no/",
      },
      update: {
        updatedAt: new Date(),
      },
      include: {
        products: true,
      },
    });

    const result = await scaper({
      store,
      findSitemaps($) {
        const result: string[] = [];

        $("sitemap").each((i, el) => {
          const loc = $(el).find("loc").text().trim();

          if (loc.includes("store-products-sitemap")) {
            result.push(loc.trim());
          }
        });

        return result;
      },

      findLoc: getStoreLoc("spinnvilldg"),
      scrapeLoc: getStoreProduct("spinnvilldg"),
    });

    if (result.create.length) {
      await fetch(`${config.baseUrl}/api/scrape/createProducts`, {
        method: "POST",
        body: JSON.stringify(result.create),
      });
    }

    if (result.changed.length) {
      await fetch(`${config.baseUrl}/api/scrape/productsChanged`, {
        method: "PUT",
        body: JSON.stringify(result.changed),
      });
    }

    if (result.updatePrice.length) {
      await fetch(`${config.baseUrl}/api/scrape/updateProductsPrice`, {
        method: "PUT",
        body: JSON.stringify(result.updatePrice),
      });
    }

    console.timeEnd("spinnvilldg");

    res.status(200).json({
      result,
    });

    return;
  }
}
