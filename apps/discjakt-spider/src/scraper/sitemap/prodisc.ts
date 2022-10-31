import axios from "axios";
import { load } from "cheerio";
import { prisma } from "../../lib/prisma";
import { checkLastmodUnderAge } from "../../utils/lastmod";

export default async function handler() {
  const now = new Date();
  console.time(`prodisc - ${now.getTime()}`);

  const store = await prisma.store.upsert({
    where: {
      slug: "prodisc",
    },
    create: {
      slug: "prodisc",
      name: "Prodisc",
      baseUrl: "https://prodisc.no",
      sitemapUrl: "https://www.prodisc.no/sitemap.xml",
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

  const sitemapRes = await axios.get(store.sitemapUrl);
  const xml = await sitemapRes.data;
  const $$ = load(xml);

  let sitemaps: string[] = [];
  $$("sitemap").each((i, el) => {
    const loc = $$(el).find("loc").text().trim();

    if (loc.includes("/sitemap_products_")) {
      sitemaps.push(loc);
    }
  });

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

  console.log("prodisc - new products found:", newProductsFound);

  console.timeEnd(`prodisc - ${now.getTime()}`);
}
