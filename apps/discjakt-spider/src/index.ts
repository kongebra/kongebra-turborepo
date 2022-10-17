import dotenv from "dotenv";
dotenv.config();

import express from "express";

import Queue, { Job } from "bull";
import config from "./config";

import { prisma } from "@kongebra/discjakt-database";
import { JobItem } from "./types";

const app = express();

const opts: Queue.QueueOptions = {
  redis: config.redisUrl,
};

const queue = new Queue<JobItem>("spinnvill", config.redisUrl, {
  defaultJobOptions: { removeOnComplete: true },
});

queue.process(async (job) => {
  const { id, data } = job;

  // console.log({ id, data });

  // const product = await prisma.product.findFirst({
  //   where: {
  //     loc: data.loc,
  //   },
  // });

  // if (!product || product.lastmod !== data.lastmod) {
  //   // no product, or it has changed
  //   console.log("queue up new job");
  // }
});

app.listen(5000, () => console.log("discjakt-spider is running!"));
