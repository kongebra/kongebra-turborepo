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
import { StoreSlug } from "./types";

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

cron.schedule("* */1 * * *", async () => {
  // console.log("## CLEAN UP QUEUE SCHEDULE");
  // // common
  // await commonQueue.clean(0, "completed");
  // // stores
  // const keys = Object.keys(storeQueues) as StoreSlug[];
  // for (const key of keys) {
  //   await storeQueues[key].clean(1000 * 60 * 5, "completed");
  // }
});

cron.schedule("*/10 * * * *", async () => {
  // run every 10 minute
  // will do the store that was
  // await crawlLatestStoreSitemap();
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
