import config from "./config";
import Bull from "bull";
import { CommonJobItem, StoreSlug } from "./types";

export const queueOptions: Bull.QueueOptions = {
  defaultJobOptions: {
    removeOnComplete: {
      age: 60,
    },
  },
};

let commonQueue: Bull.Queue;
let storeQueues: Record<StoreSlug, Bull.Queue>;

export function getQueues() {
  if (!commonQueue) {
    commonQueue = new Bull<CommonJobItem>(
      "common",
      config.redisUrl,
      queueOptions
    );
  }

  if (!storeQueues["prodisc"]) {
    storeQueues = {
      frisbeebutikken: new Bull(
        "frisbeebutikken",
        config.redisUrl,
        queueOptions
      ),
      spinnvilldg: new Bull("spinnvilldg", config.redisUrl, queueOptions),
      krokholdgs: new Bull("krokholdgs", config.redisUrl, queueOptions),
      starframe: new Bull("starframe", config.redisUrl, queueOptions),
      prodisc: new Bull("prodisc", config.redisUrl, queueOptions),
      aceshop: new Bull("aceshop", config.redisUrl, queueOptions),
    };
  }

  return {
    commonQueue,
    storeQueues,
  };
}
