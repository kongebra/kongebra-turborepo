import { default as Redis } from "ioredis";
import config from "./config";

let redis: Redis;

export function getRedisClient() {
  if (!redis) {
    redis = new Redis(config.redisUrl);
  }

  return redis;
}

export function redisClient<T>() {
  const redis = getRedisClient();

  const set = async (key: string, item: T, ttl?: number) => {
    if (ttl) {
      await redis.set(key, JSON.stringify(item), "EX", ttl);
    } else {
      await redis.set(key, JSON.stringify(item));
    }
  };

  const get = async (key: string): Promise<T | undefined> => {
    const json = await redis.get(key);
    if (json) {
      return JSON.parse(json) as T;
    }

    return undefined;
  };

  return {
    set,
    get,
  };
}
