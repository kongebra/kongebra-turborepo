import { prisma } from "../lib/prisma";
import { StoreSlug } from "../types";

import aceshop from "./aceshop.sitemap";
import prodisc from "./prodisc.sitemap";
import starframe from "./starframe.sitemap";
import krokholdgs from "./krokholdgs.sitemap";
import spinnvilldg from "./spinnvilldg.sitemap";
import discoverdiscs from "./discoverdiscs.sitemap";
import frisbeebutikken from "./frisbeebutikken.sitemap";

type Fn = () => Promise<void>;

const stores: Record<StoreSlug, Fn> = {
  frisbeebutikken: frisbeebutikken,
  discoverdiscs: discoverdiscs,
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
