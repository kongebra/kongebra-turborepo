import express from "express";

import Queue from "bull";
import config from "./config";

import cron from "node-cron";

import { CommonJobItem, StoreSlug } from "./types";

import type { Product } from "@prisma/client";

import { prisma } from "./lib/prisma";

import spinnvilldg from "./processors/spinnvilldg";
import starframe from "./processors/starframe";

const app = express();

const opts: Queue.QueueOptions = {
  defaultJobOptions: {
    removeOnComplete: {
      age: 60,
    },
  },
};

const queues: Record<StoreSlug, Queue.Queue> = {
  spinnvilldg: new Queue("spinnvilldg", config.redisUrl, opts),
  starframe: new Queue("starframe", config.redisUrl, opts),
};

const commonQueue = new Queue<CommonJobItem>("common", config.redisUrl, opts);

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

commonQueue.process(async (job) => {
  console.time(`common - ${job.id}`);
  const { data } = job;

  const cached = productCache.get(data.loc);
  if (cached) {
    console.log("cached", cached[0]);
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
});

queues.spinnvilldg.process(spinnvilldg);
queues.starframe.process(starframe);

cron.schedule("* * * * *", async () => {
  console.log("Cleaning up queue");

  // common
  await commonQueue.clean(0, "completed");

  // stores
  await queues.spinnvilldg.clean(0, "completed");
  await queues.starframe.clean(0, "completed");
});

app.get("/health", (req, res) => {
  res.status(200).send("Ok");
});

app.listen(5000, () => {
  console.log("discjakt-spider is running!");
});
