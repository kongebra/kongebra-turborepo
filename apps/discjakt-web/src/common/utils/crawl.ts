import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "src/common/lib/prisma";
import { Product, ProductPrice, Store } from "@prisma/client";
import { CheerioAPI, load } from "cheerio";
import { StoreDetails, storeDetailsSelect } from "src/types/prisma";

async function getSitemapHTML(url: string): Promise<string> {
  const response = await fetch(url);
  const text = await response.text();

  return text;
}

type ProductDetails = Product & {
  prices: ProductPrice[];
};

type FastCrawlProps = {
  store: Pick<Store, "slug" | "name" | "baseUrl" | "sitemapUrl">;
  sitemaps?: string[];
  crawlForProductLoc: ($: CheerioAPI) => { loc: string; lastmod: string }[];
  crawlPageForData: ($: CheerioAPI) => {
    price: number;
    imageUrl: string;
    title: string;
    description: string;
  } | null;
  crawlForInternalSitemap?: ($: CheerioAPI) => string[];
  debug?: boolean;
  disableDatabase?: boolean;
};

export async function fastCrawl({
  store: inputStore,
  crawlForProductLoc,
  crawlPageForData,
  crawlForInternalSitemap,
  sitemaps: inputSitemaps,
  debug,
  disableDatabase,
}: FastCrawlProps) {
  if (debug) console.time(inputStore.slug);

  if (debug) console.time(`${inputStore.slug} - prisma.store.findFirst`);
  const store = await prisma.store.findFirst({
    where: {
      slug: inputStore.slug,
    },
    include: {
      products: {
        include: {
          prices: true,
        },
      },
    },
  });
  if (debug) console.timeEnd(`${inputStore.slug} - prisma.store.findFirst`);

  if (!store) {
    console.log("no store found with slug:", inputStore.slug);
    return;
  }

  if (debug) console.time("createMap");
  // fast lookup for loc to product
  const productMap = new Map(
    store.products.map((product) => [product.loc, product])
  );
  if (debug) console.timeEnd("createMap");

  let sitemaps = inputSitemaps ? inputSitemaps : [store.sitemapUrl];
  if (crawlForInternalSitemap) {
    if (debug) console.time("crawlForInternalSitemap");
    const resp = await fetch(store.sitemapUrl);
    const html = await resp.text();
    const $ = load(html);

    sitemaps = crawlForInternalSitemap($);
    if (debug) console.timeEnd("crawlForInternalSitemap");
    if (debug) console.log({ sitemaps });
  }

  if (debug) console.time("all sitemap crawls");
  for (const sitemapUrl of sitemaps) {
    await crawlSitemapFast({
      sitemapUrl,
      productMap,
      storeDetails: store,
      crawlForProductLoc,
      crawlPageForData,
      debug,
    });
  }
  // await Promise.all(
  // sitemaps.forEach(async (sitemapUrl) => {
  // });
  // );
  if (debug) console.timeEnd("all sitemap crawls");

  if (debug) console.timeEnd(inputStore.slug);

  await prisma.$disconnect();
}

type CrawlSitemapFastParams = Pick<
  FastCrawlProps,
  "crawlForProductLoc" | "crawlPageForData" | "debug" | "disableDatabase"
> & {
  sitemapUrl: string;
  productMap: Map<string, ProductDetails>;
  storeDetails: Store & { products: ProductDetails[] };
};
async function crawlSitemapFast({
  sitemapUrl,
  productMap,
  storeDetails,
  crawlForProductLoc,
  crawlPageForData,
  debug,
  disableDatabase,
}: CrawlSitemapFastParams) {
  if (debug) console.time(`getSitemapHTML - ${sitemapUrl}`);
  const html = await getSitemapHTML(sitemapUrl);
  const $ = load(html);
  if (debug) console.timeEnd(`getSitemapHTML - ${sitemapUrl}`);

  if (debug) console.time(`crawlForProductLoc - ${sitemapUrl}`);
  const locs = crawlForProductLoc($);
  if (debug) console.timeEnd(`crawlForProductLoc - ${sitemapUrl}`);

  if (debug) console.log(`locs: ${locs.length} - ${sitemapUrl}`);

  if (debug) console.time(`big promise - ${sitemapUrl}`);
  const filtered = locs.filter(({ loc, lastmod }) => {
    const now = new Date();
    const then = new Date(lastmod);

    const diff = now.getTime() - then.getTime();
    const ms = diff / 1000;
    const s = ms / 60;
    const m = s / 60;
    const h = m / 60;
    const d = h / 24;

    if (d < 365) {
      return true;
    }

    console.log({ diff, loc, lastmod });
    return false;
  });
  for (const { loc, lastmod } of filtered) {
    const prev = productMap.get(loc);
    if (prev) {
      // product exists
      if (prev.lastmod === lastmod) {
        // same
        const latestPrice = [...prev.prices].pop(); // get latest price
        if (latestPrice) {
          const now = new Date();
          const last = latestPrice.createdAt;

          const isDifferentDate =
            now.getFullYear() !== last.getFullYear() &&
            now.getMonth() !== last.getMonth() &&
            now.getDate() !== last.getDate();

          // check if over 24 hours since last price from this lastmod
          if (isDifferentDate || disableDatabase !== true) {
            try {
              // has price from before
              await prisma.productPrice.create({
                data: {
                  amount: latestPrice.amount,
                  currency: latestPrice.currency,
                  productId: prev.id,
                },
              });
            } catch (error) {
              console.error("could not update todays price");
              console.error(error);
            }
          }
        } else {
          // has no price from before
          if (debug) console.time(`createProductPrice(${loc})`);
          await createProductPrice(
            loc,
            crawlPageForData,
            prev,
            disableDatabase
          );
          if (debug) console.timeEnd(`createProductPrice(${loc})`);
        }
      } else {
        // changed
      }
    } else {
      // product does not exist
      if (debug) console.time(`createProduct(${loc})`);
      await createProduct(
        loc,
        crawlPageForData,
        lastmod,
        storeDetails,
        disableDatabase
      );
      if (debug) console.timeEnd(`createProduct(${loc})`);
    }
  }

  // await Promise.all(
  // locs
  //   .filter(({ loc, lastmod }) => {
  //     const now = new Date();
  //     const then = new Date(lastmod);

  //     const diff = now.getTime() - then.getTime();
  //     const ms = diff / 1000;
  //     const s = ms / 60;
  //     const m = s / 60;
  //     const h = m / 60;
  //     const d = h / 24;

  //     if (d < 365) {
  //       return true;
  //     }

  //     console.log({ diff, loc, lastmod });
  //     return false;
  //   })
  //   .forEach(async ({ loc, lastmod }) => {
  //     const prev = productMap.get(loc);
  //     if (prev) {
  //       // product exists
  //       if (prev.lastmod === lastmod) {
  //         // same
  //         const latestPrice = [...prev.prices].pop(); // get latest price
  //         if (latestPrice) {
  //           const now = new Date();
  //           const last = latestPrice.createdAt;

  //           const isDifferentDate =
  //             now.getFullYear() !== last.getFullYear() &&
  //             now.getMonth() !== last.getMonth() &&
  //             now.getDate() !== last.getDate();

  //           // check if over 24 hours since last price from this lastmod
  //           if (isDifferentDate || disableDatabase !== true) {
  //             try {
  //               // has price from before
  //               await prisma.productPrice.create({
  //                 data: {
  //                   amount: latestPrice.amount,
  //                   currency: latestPrice.currency,
  //                   productId: prev.id,
  //                 },
  //               });
  //             } catch (error) {
  //               console.error("could not update todays price");
  //               console.error(error);
  //             }
  //           }
  //         } else {
  //           // has no price from before
  //           if (debug) console.time(`createProductPrice(${loc})`);
  //           await createProductPrice(
  //             loc,
  //             crawlPageForData,
  //             prev,
  //             disableDatabase
  //           );
  //           if (debug) console.timeEnd(`createProductPrice(${loc})`);
  //         }
  //       } else {
  //         // changed
  //       }
  //     } else {
  //       // product does not exist
  //       if (debug) console.time(`createProduct(${loc})`);
  //       await createProduct(
  //         loc,
  //         crawlPageForData,
  //         lastmod,
  //         storeDetails,
  //         disableDatabase
  //       );
  //       if (debug) console.timeEnd(`createProduct(${loc})`);
  //     }
  //   });
  // );

  if (debug) console.timeEnd(`big promise - ${sitemapUrl}`);
}

async function createProductPrice(
  loc: string,
  crawlPageForData: FastCrawlProps["crawlPageForData"],
  prev: ProductDetails,
  disableDatabase?: boolean
) {
  const resp = await fetch(loc);
  const html = await resp.text();
  const $ = load(html);

  // we need to crawl
  const data = crawlPageForData($);
  if (data && disableDatabase !== true) {
    await prisma.productPrice.create({
      data: {
        productId: prev.id,
        amount: data.price,
        currency: "NOK",
      },
    });
  } else {
    // no valid data on page ...
    // TODO: handle this? logging?
  }
}

async function createProduct(
  loc: string,
  crawlPageForData: FastCrawlProps["crawlPageForData"],
  lastmod: string,
  store: Store & { products: ProductDetails[] },
  disableDatabase?: boolean
) {
  const resp = await fetch(loc);
  const html = await resp.text();
  const $ = load(html);

  // we need to crawl
  const data = crawlPageForData($);
  if (data && disableDatabase !== true) {
    try {
      await prisma.product.create({
        data: {
          loc,
          lastmod,
          description: data.description,
          imageUrl: data.imageUrl,
          title: data.title,
          storeId: store.id,
        },
      });
    } catch (error) {
      console.error("error - createProduct", {
        data,
        loc,
        lastmod,
        len: loc.length,
      });
      console.error(error);
    }
  } else {
    // no valid data on page
    // TODO: handle this? logging?
  }
}

export type SitemapResponse = {
  loc: string;
  lastmod: string;
};

type SitemapHandler = ($: CheerioAPI) => SitemapResponse[];
type ProductPageHandler = ($: CheerioAPI) => {
  price: number;
  title: string;
  description: string;
  imageUrl: string;
} | null;
type FindSitemapInternalFn = ($: CheerioAPI) => string;

export type CrawlParams = {
  debug?: {
    log?: boolean;
    maxCount?: number;
  };

  store: Pick<Store, "name" | "baseUrl" | "sitemapUrl" | "slug">;

  sitemaps?: string[];

  handleSitemap: SitemapHandler;
  handleProductPage: ProductPageHandler;
  findSitemapInternal?: FindSitemapInternalFn;
};

export async function crawlHelper(
  req: NextApiRequest,
  res: NextApiResponse,
  params: CrawlParams,
  disableDatabase: boolean = false
) {
  switch (req.method) {
    case "POST":
      return await POST(req, res, params, disableDatabase);
    default:
      return res.status(405).end("method not allowed");
  }
}

async function POST(
  req: NextApiRequest,
  res: NextApiResponse,
  {
    debug,
    store: storeParam,
    handleSitemap,
    handleProductPage,
    findSitemapInternal,
    sitemaps,
  }: CrawlParams,
  disableDatabase: boolean
) {
  if (debug?.log) {
    console.time(storeParam.slug!);
  }

  if (findSitemapInternal !== undefined) {
    const response = await fetch(storeParam.sitemapUrl);
    if (response.status !== 200) {
      return [];
    }

    const html = await response.text();
    const $ = load(html);

    storeParam.sitemapUrl = findSitemapInternal($);
  }

  if (!storeParam.sitemapUrl) {
    return res.status(500).json({ message: "no sitemap found" });
  }

  const store = (await prisma.store.upsert({
    where: {
      slug: storeParam.slug!,
    },
    create: {
      ...storeParam,
    },
    update: {
      ...storeParam,
    },
    select: storeDetailsSelect,
  })) as StoreDetails;

  const { products, ...rest } = store;

  // Fire and forget request
  res.status(200).json(rest);

  const promises = new Array<Promise<any>>();

  if (sitemaps) {
    let sitemapCount = 1;
    for (const sitemapUrl of sitemaps) {
      promises.push(
        scrapeSingleSitemap(
          { ...store, sitemapUrl },
          handleSitemap,
          handleProductPage,
          disableDatabase,
          { ...debug, sitemapCount, sitemapMaxCount: sitemaps.length }
        )
      );

      sitemapCount++;
    }
  } else {
    promises.push(
      scrapeSingleSitemap(
        store,
        handleSitemap,
        handleProductPage,
        disableDatabase,
        debug
      )
    );
  }

  await Promise.all(promises);

  if (debug?.log) {
    console.timeEnd(storeParam.slug!);
  }
}

async function scrapeSingleSitemap(
  store: StoreDetails,
  handleSitemap: SitemapHandler,
  handleProductPage: ProductPageHandler,
  disableDatabase: boolean,
  debug?: {
    log?: boolean | undefined;
    maxCount?: number | undefined;
    sitemapCount?: number;
    sitemapMaxCount?: number;
  }
) {
  const urls = await crawlSitemap(store, handleSitemap);

  const promises = new Array<Promise<any>>();
  let count = 0;
  for (const url of urls) {
    const result = await crawlProductPage(
      url,
      store,
      handleProductPage,
      disableDatabase
    );

    if (result !== null) {
      const { product, price } = result;

      if (disableDatabase === false) {
        if (product) {
          await prisma.productPrice.create({
            data: {
              amount: price,
              currency: "NOK",
              productId: product.id,
            },
          });
        }
      }
    }

    if (debug?.log) {
      if (debug.sitemapMaxCount && debug.sitemapCount) {
        console.log(
          `${store.slug} ${++count}/${urls.length} (Sitemap: ${
            debug.sitemapCount
          }/${debug.sitemapMaxCount})`
        );
      } else {
        console.log(`${store.slug} ${++count}/${urls.length}`);
      }
    }

    if (debug?.maxCount && count >= debug.maxCount) {
      break;
    }
  }
}

async function crawlSitemap(
  store: StoreDetails,
  handleSitemap: SitemapHandler
) {
  const response = await fetch(store.sitemapUrl);
  if (response.status !== 200) {
    return [];
  }

  const html = await response.text();
  const $ = load(html);

  return handleSitemap($);
}

async function crawlProductPage(
  { loc, lastmod }: { loc: string; lastmod: string },
  store: StoreDetails,
  handleProductPage: ProductPageHandler,
  disableDatabase: boolean
) {
  const found = store.products.find((product) => product.loc === loc);
  // already a product
  if (found) {
    // no changes
    if (found.lastmod === lastmod) {
      // check if we have any prices
      if (found.prices.length) {
        // take latest price
        const latestPrice = found.prices[found.prices.length - 1]!.amount;

        // return it
        return { product: found, price: latestPrice };
      }

      // no prices found, then we crawl for price and stuff
    }
  }

  const data = await crawlPageDetails(loc, handleProductPage);
  if (!data) {
    return null;
  }

  const { price, ...rest } = data;

  if (disableDatabase === true) {
    return { product: null, price };
  }

  try {
    const product = await prisma.product.upsert({
      where: {
        loc: loc,
      },
      create: {
        loc: loc,
        lastmod: lastmod,
        storeId: store.id,
        ...rest,
      },
      update: {
        lastmod: lastmod,
        ...rest,
      },
    });

    return { product, price };
  } catch (error) {
    console.log("ERROR", { loc, price, data });
    console.error(error);

    return { product: null, price };
  }
}

async function crawlPageDetails(
  loc: string,
  handleProductPage: ProductPageHandler
) {
  const response = await fetch(loc);
  if (response.status !== 200) {
    return null;
  }

  const html = await response.text();
  const $ = load(html);

  return handleProductPage($);
}
