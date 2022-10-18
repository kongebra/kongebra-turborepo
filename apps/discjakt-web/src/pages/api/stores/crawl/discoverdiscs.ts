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
    console.time("discoverdiscs");

    const store = await prisma.store.upsert({
      where: {
        slug: "discoverdiscs",
      },
      create: {
        name: "Discover Discs",
        slug: "discoverdiscs",
        baseUrl: "https://www.discoverdiscs.no",
        sitemapUrl: "https://www.discoverdiscs.no/sitemap.xml",
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
      findLoc: getStoreLoc("discoverdiscs"),
      scrapeLoc: getStoreProduct("discoverdiscs"),
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

    console.timeEnd("discoverdiscs");

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
//         name: "Discover Discs",
//         slug: "discoverdiscs",
//         baseUrl: "https://www.discoverdiscs.no",
//         sitemapUrl: "https://www.discoverdiscs.no/sitemap.xml",
//       },

//       debug: true,

//       crawlForInternalSitemap($) {
//         const result: string[] = [];

//         $("sitemap").each((i, el) => {
//           const loc = $(el).find("loc").text().trim();

//           if (loc.includes("_products_")) {
//             result.push(loc.trim());
//           }
//         });

//         return result;
//       },

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
//           $('meta[property="og:price:amount"]')
//             .attr("content")
//             ?.trim()
//             .replace(",-", "") || "";

//         let price = Number(priceStr.replace(",", "."));
//         if (isNaN(price)) {
//           price = 0;
//         }

//         const data = {
//           title: $('meta[property="og:title"]').attr("content")?.trim() || "",
//           description:
//             $('meta[name="description"]').attr("content")?.trim() || "",
//           imageUrl:
//             $('meta[property="og:image"]').attr("content")?.trim() || "",
//         };

//         return {
//           price,
//           ...data,
//         };
//       },
//     });

//     return res.status(200).json({ message: "spider disc!" });
//   }

//   crawlHelper(
//     req,
//     res,
//     {
//       store: {
//         name: "Discover Discs",
//         slug: "discoverdiscs",
//         baseUrl: "https://www.discoverdiscs.no",
//         sitemapUrl: "https://www.discoverdiscs.no/sitemap.xml",
//       },

//       debug: {
//         log: true,
//       },

//       findSitemapInternal($) {
//         let sitemap = "";

//         $("sitemap").each((i, el) => {
//           const loc = $(el).find("loc").text().trim();

//           if (loc.includes("sitemap_products_1.xml")) {
//             sitemap = loc;
//           }
//         });

//         return sitemap;
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
//           $('meta[property="og:price:amount"]')
//             .attr("content")
//             ?.trim()
//             .replace(",-", "") || "";

//         let price = Number(priceStr.replace(",", "."));
//         if (isNaN(price)) {
//           price = 0;
//         }

//         const data = {
//           title: $('meta[property="og:title"]').attr("content")?.trim() || "",
//           description:
//             $('meta[name="description"]').attr("content")?.trim() || "",
//           imageUrl:
//             $('meta[property="og:image"]').attr("content")?.trim() || "",
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
