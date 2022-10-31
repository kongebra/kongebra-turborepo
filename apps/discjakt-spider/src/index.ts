import express from "express";
import cron from "node-cron";

import { ml } from "./ml";

import dailyPriceJob from "./cron/daily-price-job";
import lookForNewProducts from "./cron/look-for-new-products";

/**
 * CRON JOBS
 */

cron.schedule("0 3 * * *", async () => {
  // every night 3'o clock

  await dailyPriceJob();
});

cron.schedule("*/5 * * * *", async () => {
  // every 5th minute
  // await lookForNewProducts();
});

/**
 * WEB API
 */

const port = process.env.PORT || "5000";
const app = express();

app.get("/health", (req, res) => {
  res.status(200).send("ok");
});

app.get("/foo", async (req, res) => {
  await dailyPriceJob();

  res.status(200).json({ messge: "crawl began" });
});

// app.get("/ml", async (req, res) => {
//   const data = await ml();

//   res.status(200).json(data);
// });

app.listen(port, () => {
  console.log("discjakt-spider is running!");
});
