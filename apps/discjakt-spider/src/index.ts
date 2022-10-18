import express from "express";
import cron from "node-cron";

import { getQueues } from "./queue";
import crawlLatestStoreSitemap from "./sitemap-scrapers";

import common from "./processors/common";
import prodisc from "./processors/prodisc";
import aceshop from "./processors/aceshop";
import starframe from "./processors/starframe";
import krokholdgs from "./processors/krokholdgs";
import spinnvilldg from "./processors/spinnvilldg";

/**
 * QUEUES
 */

const { commonQueue, storeQueues } = getQueues();

// common
commonQueue.process(common(storeQueues));

// stores
storeQueues.spinnvilldg.process(spinnvilldg);
storeQueues.krokholdgs.process(krokholdgs);
storeQueues.starframe.process(starframe);
storeQueues.prodisc.process(prodisc);
storeQueues.aceshop.process(aceshop);

/**
 * CRON JOBS
 */

cron.schedule("*/30 * * * *", async () => {
  console.log("Cleaning up queue");

  // common
  await commonQueue.clean(10, "completed");

  // stores
  await storeQueues.spinnvilldg.clean(10, "completed");
  await storeQueues.starframe.clean(10, "completed");
  await storeQueues.prodisc.clean(10, "completed");
  await storeQueues.aceshop.clean(10, "completed");
});

cron.schedule("*/10 * * * *", async () => {
  // run every 10 minute

  // will do the store that was
  await crawlLatestStoreSitemap();
});

/**
 * WEB API
 */

const port = process.env.PORT || "5000";
const app = express();

app.get("/health", (req, res) => {
  res.status(200).send("ok");
});

app.post("/crawlStoreSitemaps", async (req, res) => {
  await crawlLatestStoreSitemap();
});

app.listen(port, () => {
  console.log("discjakt-spider is running!");
});
