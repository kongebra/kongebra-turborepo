import { Job } from "bull";
import { JobItem } from "../types";
import { prisma } from "@kongebra/discjakt-database";

export default async function processor(job: Job<JobItem>) {
  const { data } = job;

  console.log(data);

  const product = await prisma.product.findFirst({
    where: {
      loc: data.loc,
    },
  });

  if (!product) {
    // TODO: do something
  }
}
