import axios from "axios";
import { load } from "cheerio";
import { prisma } from "../../lib/prisma";
import { checkLastmodUnderAge } from "../../utils/lastmod";

export default async function handler() {
  const now = new Date();
  console.time(`starframe - ${now.getTime()}`);

  const store = await prisma.store.upsert({
    where: {
      slug: "starframe",
    },
    create: {
      slug: "starframe",
      name: "Starframe Discgolf Shop AS",
      baseUrl: "https://starframe.no",
      sitemapUrl: "https://www.starframe.no/sitemap.xml",
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

      // TODO: Scrape site and create product
      newProductsFound++;
    });
  }

  console.log("starframe - new products found:", newProductsFound);

  console.timeEnd(`starframe - ${now.getTime()}`);
}
