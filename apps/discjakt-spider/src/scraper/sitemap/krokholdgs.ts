import axios from "axios";
import { load } from "cheerio";
import { promises } from "dns";
import { prisma } from "../../lib/prisma";
import { checkLastmodUnderAge } from "../../utils/lastmod";
import krokholdgs from "../new-product-page/krokholdgs";

export default async function handler() {
  const now = new Date();
  console.time(`krokholdgs - ${now.getTime()}`);

  const store = await prisma.store.upsert({
    where: {
      slug: "krokholdgs",
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
    include: {
      products: true,
    },
  });

  const { products } = store;
  const productLookup = new Map(
    products.map((product) => [product.loc, product])
  );

  let newProductsFound = 0;

  const promises = new Array<Promise<any>>();

  let sitemaps: string[] = [store.sitemapUrl];

  for (const sitemap of sitemaps) {
    const response = await axios.get(sitemap);
    const html = await response.data;
    const $ = load(html);

    $("url").each((i, el) => {
      const loc = $(el).find("loc").text().trim();
      const lastmod = $(el).find("lastmod").text().trim();

      const isProduct = loc.includes("/products/");
      if (!isProduct) {
        return;
      }

      const underOneYearOld = checkLastmodUnderAge(lastmod, 365);
      if (!underOneYearOld) {
        // over 1 year since lastmod
        return;
      }

      const exists = productLookup.get(loc);
      if (exists) {
        // already exists
        return;
      }

      promises.push(krokholdgs({ loc, lastmod, store: { id: store.id } }));

      newProductsFound++;
    });
  }

  console.log("krokholdgs - new products found:", newProductsFound);

  await Promise.all(promises);

  console.timeEnd(`krokholdgs - ${now.getTime()}`);
}
