import config from "./config";
import Bull from "bull";
import { CommonJobItem } from "./types";
import { Product } from "discjakt-db";

export const queueOptions: Bull.QueueOptions = {
  defaultJobOptions: {
    removeOnComplete: 10,
  },
};

let commonQueue: Bull.Queue<CommonJobItem>;
let findDiscQueue: Bull.Queue<Product>;

export function getQueues() {
  if (!commonQueue) {
    commonQueue = new Bull<CommonJobItem>(
      "common",
      config.redisUrl,
      queueOptions
    );
  }

  if (!findDiscQueue) {
    findDiscQueue = new Bull<Product>(
      "find-disc",
      config.redisUrl,
      queueOptions
    );
  }

  return {
    commonQueue,
    findDiscQueue,
  };
}
