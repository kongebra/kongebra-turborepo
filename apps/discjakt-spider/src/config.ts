import dotenv from "dotenv";
dotenv.config();

const config = {
  redisUrl: process.env.REDIS_URL || "",
};

export default config;
