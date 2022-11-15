import { Disc, Product } from "discjakt-db";
import { findDiscMatch } from "discjakt-utils";
import express from "express";
import cron from "node-cron";

import dailyPriceJob from "./cron/daily-price-job";
import lookForNewProducts from "./cron/look-for-new-products";
import { prisma } from "./lib/prisma";
import { getQueues } from "./queue";

/**
 * QUEUE WORKERS
 */
const { findDiscQueue } = getQueues();

findDiscQueue.process(async (job) => {
  const { data } = job;

  const matches = await findDiscMatch(
    data.title,
    async (haystack: string[]) => {
      return await prisma.disc.findMany({
        where: {
          OR: [
            {
              name: {
                in: haystack,
                mode: "insensitive",
              },
            },
            {
              slug: {
                in: haystack,
                mode: "insensitive",
              },
            },
          ],
        },
      });
    }
  );

  if (matches.length === 1) {
    console.log("Auto matched product to disc", {
      productName: data.title,
      discName: matches[0]!.name,
    });

    await prisma.product.update({
      where: {
        id: data.id,
      },
      data: {
        discId: matches[0]!.id,
      },
    });
  }
});

/**
 * CRON JOBS
 */

cron.schedule("0 3 * * *", async () => {
  // every night 3'o clock

  await dailyPriceJob();
});

cron.schedule("*/5 * * * *", async () => {
  // every 5th minute

  if (process.env.NODE_ENV === "production") {
    await lookForNewProducts();
  }
});

/**
 * WEB API
 */

const port = process.env.PORT || "5000";
const app = express();

app.get("/health", (req, res) => {
  res.status(200).send("ok");
});

// app.get("/foo", async (req, res) => {
//   await dailyPriceJob();

//   res.status(200).json({ messge: "crawl began" });
// });

app.listen(port, () => {
  console.log("discjakt-spider is running!");
});
