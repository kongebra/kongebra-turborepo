import { Product } from "@prisma/client";
import { CommonJobItem, StoreSlug } from "../types";
import Queue from "bull";
import { prisma } from "../lib/prisma";

let productCache = new Map<string, [Product, Date]>();
const cacheLimitInHours = 3;

function checks({ lastmod }: CommonJobItem, product: Product) {
  // product has changed
  if (product.lastmod !== lastmod) {
    return false;
  }

  // check when the product last changed
  const now = new Date();
  const then = product.updatedAt;
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

export default function common(
  queues: Record<StoreSlug, Queue.Queue>
): Queue.ProcessCallbackFunction<CommonJobItem> {
  return async (job) => {
    console.time(`common - ${job.id}`);
    const { data } = job;

    const cached = productCache.get(data.loc);
    if (cached) {
      const [product, cacheTime] = cached;

      const now = new Date();
      const diff = now.getTime() - cacheTime.getTime();
      const hours = diff / 1000 / 60 / 60;

      if (hours < cacheLimitInHours) {
        const ok = checks(data, product);
        if (!ok) {
          // let storehandler handle this
          await queues[data.store.slug as StoreSlug].add(data);
          console.timeEnd(`common - ${job.id}`);
          return;
        }
      } else {
        productCache.delete(data.loc);
      }
    }

    const product = await prisma.product.findFirst({
      where: {
        loc: data.loc,
      },
    });

    if (!product) {
      // let storehandler handle this
      await queues[data.store.slug as StoreSlug].add(data);
      console.timeEnd(`common - ${job.id}`);
      return;
    }

    // save to cache
    productCache.set(data.loc, [product, new Date()]);

    const ok = checks(data, product);
    if (!ok) {
      // let storehandler handle this
      await queues[data.store.slug as StoreSlug].add(data);
      console.timeEnd(`common - ${job.id}`);
      return;
    }

    console.timeEnd(`common - ${job.id}`);
  };
}
