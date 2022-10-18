import { Product } from "@prisma/client";
import { CommonJobItem, StoreSlug } from "../types";
import { prisma } from "../lib/prisma";
import { redisClient } from "../redis";
import Bull from "bull";
import { getQueues } from "../queue";

const redis = redisClient<Product>();

const { storeQueues } = getQueues();

const ONE_MINUTE = 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;

function checks({ lastmod }: CommonJobItem, product: Product) {
  // product has changed
  if (product.lastmod !== lastmod) {
    return false;
  }

  // check when the product last changed
  const now = new Date();
  const then = new Date(product.updatedAt);
  const isSameDay =
    now.getFullYear() === then.getFullYear() &&
    now.getMonth() === then.getMonth() &&
    now.getDate() === then.getDate();

  if (!isSameDay) {
    return false;
  }

  // optimisticlly trust that this product is ok
  // if not, we will check it again tomorrow
  return true;
}

export default async function common({ id, data }: Bull.Job<CommonJobItem>) {
  console.time(`common - ${id}`);

  // get product from cache
  const cachedProduct = await redis.get(data.loc);
  // check if in cache
  if (cachedProduct) {
    // do checks on product
    const ok = checks(data, cachedProduct);
    // checks is not ok
    if (!ok) {
      // add to queue for specific store
      await storeQueues[data.store.slug as StoreSlug].add(data);
    }

    console.timeEnd(`common - ${id}`);
    // product was found i cache, not ok or ok, we dont know
    return;
  }

  // product not i cache, fetch from database
  const product = await prisma.product.findFirst({
    where: {
      loc: data.loc,
    },
  });

  // check if in database
  if (!product) {
    // not in database, add to queue for specific store
    await storeQueues[data.store.slug as StoreSlug].add(data);

    console.timeEnd(`common - ${id}`);
    // stop here, let specific store-processor handle it
    return;
  }

  // save to cache
  await redis.set(data.loc, product, ONE_DAY);
  // do checks on product from database
  const ok = checks(data, product);
  if (!ok) {
    // add to queue for specific store
    await storeQueues[data.store.slug as StoreSlug].add(data);
  }

  console.timeEnd(`common - ${id}`);
}
