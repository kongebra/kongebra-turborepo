import type { NextApiRequest, NextApiResponse } from "next";
import config from "src/config";
import { prisma } from "src/lib/prisma";
import { scaper } from "src/utils/scraper";
import { getStoreLoc } from "src/utils/store-loc";
import { getStoreProduct } from "src/utils/store-scrape";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    console.time("discgolfdynasty");

    const store = await prisma.store.upsert({
      where: {
        slug: "discgolfdynasty",
      },
      create: {
        name: "Disc Golf Dynasty",
        slug: "discgolfdynasty",
        sitemapUrl: "https://discgolfdynasty.no/sitemap.xml",
        baseUrl: "https://discgolfdynasty.no/",
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
          if (loc.includes("_products_")) {
            result.push(loc.trim());
          }
        });
        return result;
      },
      findLoc: getStoreLoc("discgolfdynasty"),
      scrapeLoc: getStoreProduct("discgolfdynasty"),
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

    console.timeEnd("discgolfdynasty");

    res.status(200).json({
      result,
    });

    return;
  }
}
