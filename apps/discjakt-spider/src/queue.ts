import config from "./config";
import Q from "bull";
import { CommonJobItem } from "./types";
import { Product } from "@prisma/client";

export const queueOptions: Q.QueueOptions = {
  defaultJobOptions: {
    removeOnComplete: 10,
  },
};

let commonQueue: Q.Queue<CommonJobItem>;
let findDiscQueue: Q.Queue<Product>;

export function getQueues() {
  if (!commonQueue) {
    commonQueue = new Q<CommonJobItem>("common", config.redisUrl, queueOptions);
  }

  if (!findDiscQueue) {
    findDiscQueue = new Q<Product>("find-disc", config.redisUrl, queueOptions);
  }

  return {
    commonQueue,
    findDiscQueue,
  };
}
