import { prisma } from "../lib/prisma";
import { StoreSlug } from "../types";

import aceshop from "./aceshop";
import prodisc from "./prodisc";
import starframe from "./starframe";
import krokholdgs from "./krokholdgs";
import spinnvilldg from "./spinnvilldg";
import frisbeebutikken from "./frisbeebutikken";

type Fn = () => Promise<void>;

const stores: Record<StoreSlug, Fn> = {
  frisbeebutikken: frisbeebutikken,
  spinnvilldg: spinnvilldg,
  krokholdgs: krokholdgs,
  starframe: starframe,
  prodisc: prodisc,
  aceshop: aceshop,
};

export default async function handler() {
  console.time("store sitemap crawl");

  // Pick store that latest updated
  const store = await prisma.store.findFirst({
    take: 1,
    orderBy: {
      updatedAt: "asc",
    },
  });

  if (store) {
    const func = stores[store.slug as StoreSlug];
    if (func) {
      // run stores function
      await func();
    }
  }

  console.timeEnd("store sitemap crawl");
}
