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
    console.time("frisbeebutikken");

    const store = await prisma.store.upsert({
      where: {
        slug: "frisbeebutikken",
      },
      create: {
        name: "Frisbeebutikken",
        slug: "frisbeebutikken",
        sitemapUrl: "https://frisbeebutikken.no/sitemap.xml",
        baseUrl: "https://frisbeebutikken.no/",
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

      findLoc: getStoreLoc("frisbeebutikken"),
      scrapeLoc: getStoreProduct("frisbeebutikken"),
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

    console.timeEnd("frisbeebutikken");

    res.status(200).json({
      result,
    });

    return;
  }
}

// import type { NextApiRequest, NextApiResponse } from "next";
// import { crawlHelper, fastCrawl, SitemapResponse } from "src/utils/crawl";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "GET") {
//     fastCrawl({
//       store: {
//         name: "Frisbeebutikken",
//         slug: "frisbeebutikken",
//         sitemapUrl: "https://frisbeebutikken.no/sitemap.xml",
//         baseUrl: "https://frisbeebutikken.no/",
//       },

//       debug: true,

//       crawlForProductLoc($) {
//         const result: { loc: string; lastmod: string }[] = [];

//         $("url").each((i, el) => {
//           const loc = $(el).find("loc").text().trim();
//           const lastmod = $(el).find("lastmod").text().trim();

//           if (loc.includes("/products/")) {
//             result.push({ loc, lastmod });
//           }
//         });

//         return result;
//       },

//       crawlPageForData($) {
//         const priceStr =
//           $(".product-price")?.text()?.trim().replace(",-", "") || "";

//         let price = Number(priceStr.replace(",", "."));
//         if (isNaN(price)) {
//           price = 0;
//         }

//         const data = {
//           title: $("h1").text()?.trim() || "",
//           description:
//             $('meta[name="description"]').attr("content")?.trim() || "",
//           imageUrl: $(".product_image_price_row img").attr("src")?.trim() || "",
//         };

//         return {
//           price,
//           ...data,
//         };
//       },
//     });

//     return res.status(200).json({ message: "crawl on crawl!" });
//   }

//   crawlHelper(
//     req,
//     res,
//     {
//       store: {
//         name: "Frisbeebutikken",
//         slug: "frisbeebutikken",
//         sitemapUrl: "https://frisbeebutikken.no/sitemap.xml",
//         baseUrl: "https://frisbeebutikken.no/",
//       },

//       debug: {
//         log: true,
//       },

//       handleSitemap($) {
//         const result: SitemapResponse[] = [];

//         $("url").each((i, el) => {
//           const loc = $(el).find("loc").text().trim();
//           const lastmod = $(el).find("lastmod").text().trim();

//           if (loc.includes("/products/")) {
//             result.push({ loc, lastmod });
//           }
//         });

//         return result;
//       },
//       handleProductPage($) {
//         const priceStr =
//           $(".product-price")?.text()?.trim().replace(",-", "") || "";

//         let price = Number(priceStr.replace(",", "."));
//         if (isNaN(price)) {
//           price = 0;
//         }

//         const data = {
//           title: $("h1").text()?.trim() || "",
//           description:
//             $('meta[name="description"]').attr("content")?.trim() || "",
//           imageUrl: $(".product_image_price_row img").attr("src")?.trim() || "",
//         };

//         return {
//           price,
//           ...data,
//         };
//       },
//     },
//     // disableDatabase
//     false
//   );
// }
