import axios from "axios";
import { load } from "cheerio";
import { prisma } from "../../lib/prisma";
import { checkLastmodUnderAge } from "../../utils/lastmod";
import gurudiscgolf from "../new-product-page/gurudiscgolf";

export default async function handler() {
  // const now = new Date();
  // console.time(`gurudiscgolf - ${now.getTime()}`);

  const store = await prisma.store.upsert({
    where: {
      slug: "gurudiscgolf",
    },
    create: {
      slug: "gurudiscgolf",
      name: "Guru Disc Golf",
      baseUrl: "https://gurudiscgolf.no",
      sitemapUrl: "https://www.gurudiscgolf.no/sitemap.xml",
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

  const sitemapRes = await axios.get(store.sitemapUrl);
  const xml = await sitemapRes.data;
  const $$ = load(xml);

  let sitemaps: string[] = [];
  $$("sitemap").each((i, el) => {
    const loc = $$(el).find("loc").text().trim();

    if (loc.includes("/product-sitemap")) {
      sitemaps.push(loc.trim());
    }
  });

  for (const sitemap of sitemaps) {
    const response = await axios.get(sitemap);
    const html = await response.data;
    const $ = load(html);

    $("url").each((i, el) => {
      const loc = $(el).find("loc").text().trim();
      const lastmod = $(el).find("lastmod").text().trim();

      const isProduct = loc.includes("/produkt/");
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

      promises.push(gurudiscgolf({ loc, lastmod, store: { id: store.id } }));

      newProductsFound++;
    });
  }

  if (newProductsFound) {
    console.log("gurudiscgolf - new products found:", newProductsFound);
  }

  await Promise.all(promises);

  // console.timeEnd(`gurudiscgolf - ${now.getTime()}`);
}
