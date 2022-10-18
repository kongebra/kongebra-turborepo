import config from "./config";
import Q from "bull";
import { CommonJobItem, StoreSlug } from "./types";

export const queueOptions: Q.QueueOptions = {
  defaultJobOptions: {
    removeOnComplete: {
      age: 60,
    },
  },
};

let commonQueue: Q.Queue;
let storeQueues: Record<StoreSlug, Q.Queue>;

export function getQueues() {
  if (!commonQueue) {
    commonQueue = new Q<CommonJobItem>("common", config.redisUrl, queueOptions);
  }

  if (!storeQueues) {
    storeQueues = {
      frisbeebutikken: new Q("frisbeebutikken", config.redisUrl, queueOptions),
      discoverdiscs: new Q("discoverdiscs", config.redisUrl, queueOptions),
      frisbeefeber: new Q("frisbeefeber", config.redisUrl, queueOptions),
      gurudiscgolf: new Q("gurudiscgolf", config.redisUrl, queueOptions),
      spinnvilldg: new Q("spinnvilldg", config.redisUrl, queueOptions),
      krokholdgs: new Q("krokholdgs", config.redisUrl, queueOptions),
      frisbeesor: new Q("frisbeesor", config.redisUrl, queueOptions),
      starframe: new Q("starframe", config.redisUrl, queueOptions),
      prodisc: new Q("prodisc", config.redisUrl, queueOptions),
      aceshop: new Q("aceshop", config.redisUrl, queueOptions),
      dgshop: new Q("dgshop", config.redisUrl, queueOptions),
    };
  }

  return {
    commonQueue,
    storeQueues,
  };
}
