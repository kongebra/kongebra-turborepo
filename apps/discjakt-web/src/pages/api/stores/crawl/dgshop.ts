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
    console.time("dgshop");

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
      include: {
        products: true,
      },
    });

    const result = await scaper({
      store,

      findLoc: getStoreLoc("dgshop"),
      scrapeLoc: getStoreProduct("dgshop"),
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

    console.timeEnd("dgshop");

    res.status(200).json({
      result,
    });

    return;
  }
}
