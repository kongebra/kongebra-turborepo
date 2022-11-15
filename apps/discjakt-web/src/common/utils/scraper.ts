import { Product, Store } from "discjakt-db";
import { CheerioAPI, load } from "cheerio";

export type ScraperArgs = {
  store: Store & { products: Product[] };
  sitemap?: string;

  debug?: boolean;

  findLoc: ($: CheerioAPI) => { loc: string; lastmod: string }[];
  findSitemaps?: ($: CheerioAPI) => string[];
  scrapeLoc: ($: CheerioAPI) => {
    price: number;
    title: string;
    description: string;
    imageUrl: string;
  };
};

export async function scaper({
  store,
  sitemap,

  debug,

  findLoc,
  findSitemaps,
  scrapeLoc,
}: ScraperArgs) {
  const lookupMap = new Map(
    store.products.map((product) => [product.loc, product])
  );

  let sitemaps = [sitemap || store.sitemapUrl];
  if (findSitemaps !== undefined) {
    const html = await fetchText(sitemap || store.sitemapUrl);
    const $ = load(html);

    sitemaps = findSitemaps($);
  }

  const productsToCreate: {
    loc: string;
    lastmod: string;
    price: number;
    title: string;
    description: string;
    imageUrl: string;
    storeId: number;
  }[] = [];

  const productsToUpdateSamePrice: { lastmod: string; id: number }[] = [];

  const productsHasChanged: { lastmod: string; id: number }[] = [];

  await Promise.all(
    sitemaps.map(async (sitemap) => {
      const locs = await scrapeSitemap({ sitemap, findLoc });

      return locs.map(async ({ loc, lastmod }) => {
        const found = lookupMap.get(loc);
        if (!found) {
          // Product not found, lets scrape and create
          const html = await fetchText(loc);
          const $ = load(html);
          const data = scrapeLoc($);

          if (debug !== true) {
            productsToCreate.push({
              ...data,
              loc,
              lastmod,
              storeId: store.id,
            });
          }
        } else {
          // product found
          if (found.lastmod === lastmod) {
            // has same lastmod
            // check if we have added a price today
            const today = new Date();
            const then = found.updatedAt;
            const isSameDay =
              today.getFullYear() === then.getFullYear() &&
              today.getMonth() === then.getMonth() &&
              today.getDate() === then.getDate();

            if (!isSameDay) {
              // not the same day
              if (debug !== true) {
                productsToUpdateSamePrice.push({ lastmod, id: found.id });
              }
            }
          } else {
            // lastmod has changed
            // let someone else scrape this, we have better things todo (⚡speed!)
            if (debug !== true) {
              productsHasChanged.push({ lastmod, id: found.id });
            }
          }
        }
      });
    })
  );

  return {
    create: productsToCreate,
    changed: productsHasChanged,
    updatePrice: productsToUpdateSamePrice,
  };
}

type ScrapeSitemapArgs = Pick<ScraperArgs, "findLoc"> & {
  sitemap: string;
};

async function scrapeSitemap({ sitemap, findLoc }: ScrapeSitemapArgs) {
  const html = await fetchText(sitemap);
  const $ = load(html);

  const data = findLoc($);

  return data;
}

async function fetchText(url: string) {
  const response = await fetch(url);
  const text = await response.text();

  return text;
}
