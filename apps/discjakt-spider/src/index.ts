import express from "express";
import cron from "node-cron";

import crawlStoreSitemaps from "./stores";

import { createQueues } from "./queue";

import spinnvilldg from "./processors/spinnvilldg";
import starframe from "./processors/starframe";
import prodisc from "./processors/prodisc";
import common from "./processors/common";

/**
 * QUEUES
 */

const { commonQueue, storeQueues } = createQueues();

// common
commonQueue.process(common(storeQueues));

// stores
storeQueues.spinnvilldg.process(spinnvilldg);
storeQueues.starframe.process(starframe);
storeQueues.prodisc.process(prodisc);

/**
 * CRON JOBS
 */

cron.schedule("*/30 * * * *", async () => {
  console.log("Cleaning up queue");

  // common
  await commonQueue.clean(0, "completed");

  // stores
  await storeQueues.spinnvilldg.clean(0, "completed");
  await storeQueues.starframe.clean(0, "completed");
  await storeQueues.prodisc.clean(0, "completed");
});

cron.schedule("* */1 * * *", async () => {
  await crawlStoreSitemaps();
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
  await crawlStoreSitemaps();
});

app.listen(port, () => {
  console.log("discjakt-spider is running!");
});
