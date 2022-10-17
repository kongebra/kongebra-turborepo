/* eslint-disable turbo/no-undeclared-env-vars */

import Queue from "bull";

const redisUrl = process.env.REDIS_URL || "";

export function createQueueClient<T>(name: string) {
  return new Queue<T>(name, redisUrl);
}
