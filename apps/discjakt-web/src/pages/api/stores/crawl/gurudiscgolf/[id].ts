import type { NextApiRequest, NextApiResponse } from "next";
import config from "src/config";
import { prisma } from "src/lib/prisma";
import { getQueryStringValue } from "src/utils/query";
import { scaper } from "src/utils/scraper";
import { getStoreLoc } from "src/utils/store-loc";
import { getStoreProduct } from "src/utils/store-scrape";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = getQueryStringValue("id", req);

  if (!id) {
    return res.status(400).json({ message: "mangler id" });
  }

  if (req.method === "GET") {
    console.time(`gurudiscgolf-${id}`);

    const store = await prisma.store.upsert({
      where: {
        slug: "gurudiscgolf",
      },
      create: {
        name: "Guru Disc Golf",
        slug: "gurudiscgolf",
        baseUrl: "https://www.gurudiscgolf.no",
        sitemapUrl: "https://www.gurudiscgolf.no/sitemap.xml",
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
      sitemap: `https://gurudiscgolf.no/product-sitemap${id}.xml`,

      debug: true,

      findLoc: getStoreLoc("gurudiscgolf"),
      scrapeLoc: getStoreProduct("gurudiscgolf"),
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

    console.timeEnd(`gurudiscgolf-${id}`);

    res.status(200).json({
      result,
    });

    return;
  }
}
