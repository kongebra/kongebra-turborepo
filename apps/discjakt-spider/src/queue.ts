import config from "./config";
import Queue from "bull";
import { CommonJobItem, StoreSlug } from "./types";

export const queueOptions: Queue.QueueOptions = {
  defaultJobOptions: {
    removeOnComplete: {
      age: 60,
    },
  },
};

export function createQueues() {
  const commonQueue = new Queue<CommonJobItem>(
    "common",
    config.redisUrl,
    queueOptions
  );

  const queues: Record<StoreSlug, Queue.Queue> = {
    spinnvilldg: new Queue("spinnvilldg", config.redisUrl, queueOptions),
    starframe: new Queue("starframe", config.redisUrl, queueOptions),
    prodisc: new Queue("prodisc", config.redisUrl, queueOptions),
  };

  return {
    commonQueue,
    storeQueues: queues,
  };
}
