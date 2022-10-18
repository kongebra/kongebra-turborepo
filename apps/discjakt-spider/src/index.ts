import express from "express";
import cron from "node-cron";

import { getQueues } from "./queue";
import crawlLatestStoreSitemap from "./sitemap-scrapers";

import common from "./processors/common.processor";

import aceshop from "./processors/aceshop.processor";
import dgshop from "./processors/dgshop.processor";
import discoverdiscs from "./processors/discoverdiscs.processor";
import frisbeebutikken from "./processors/frisbeebutikken.processor";
import frisbeefeber from "./processors/frisbeefeber.processor";
import frisbeesor from "./processors/frisbeesor.processor";
import gurudiscgolf from "./processors/gurudiscgolf.processor";
import krokholdgs from "./processors/krokholdgs.processor";
import prodisc from "./processors/prodisc.processor";
import spinnvilldg from "./processors/spinnvilldg.processor";
import starframe from "./processors/starframe.processor";

/**
 * QUEUES
 */

const { commonQueue, storeQueues } = getQueues();

// common
commonQueue.process(common);

// stores
storeQueues.aceshop.process(aceshop);
storeQueues.dgshop.process(dgshop);
storeQueues.discoverdiscs.process(discoverdiscs);
storeQueues.frisbeebutikken.process(frisbeebutikken);
storeQueues.frisbeefeber.process(frisbeefeber);
storeQueues.frisbeesor.process(frisbeesor);
storeQueues.gurudiscgolf.process(gurudiscgolf);
storeQueues.krokholdgs.process(krokholdgs);
storeQueues.prodisc.process(prodisc);
storeQueues.spinnvilldg.process(spinnvilldg);
storeQueues.starframe.process(starframe);

/**
 * CRON JOBS
 */

cron.schedule("*/30 * * * *", async () => {
  console.log("Cleaning up queue");

  // common
  await commonQueue.clean(10, "completed");

  // stores
  await storeQueues.aceshop.clean(10, "completed");
  await storeQueues.dgshop.clean(10, "completed");
  await storeQueues.discoverdiscs.clean(10, "completed");
  await storeQueues.frisbeebutikken.clean(10, "completed");
  await storeQueues.frisbeefeber.clean(10, "completed");
  await storeQueues.frisbeesor.clean(10, "completed");
  await storeQueues.gurudiscgolf.clean(10, "completed");
  await storeQueues.krokholdgs.clean(10, "completed");
  await storeQueues.prodisc.clean(10, "completed");
  await storeQueues.spinnvilldg.clean(10, "completed");
  await storeQueues.starframe.clean(10, "completed");
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

  res.status(200).json({ messge: "crawl began" });
});

app.listen(port, () => {
  console.log("discjakt-spider is running!");
});
