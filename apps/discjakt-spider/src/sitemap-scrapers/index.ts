import { prisma } from "../lib/prisma";
import { StoreSlug } from "../types";

import aceshop from "./aceshop.sitemap";
import prodisc from "./prodisc.sitemap";
import starframe from "./starframe.sitemap";
import krokholdgs from "./krokholdgs.sitemap";
import spinnvilldg from "./spinnvilldg.sitemap";
import discoverdiscs from "./discoverdiscs.sitemap";
import frisbeebutikken from "./frisbeebutikken.sitemap";
import dgshopSitemap from "./dgshop.sitemap";
import frisbeefeberSitemap from "./frisbeefeber.sitemap";
import frisbeesorSitemap from "./frisbeesor.sitemap";
import gurudiscgolfSitemap from "./gurudiscgolf.sitemap";

type Fn = () => Promise<void>;

const stores: Record<StoreSlug, Fn> = {
  frisbeebutikken: frisbeebutikken,
  discoverdiscs: discoverdiscs,
  spinnvilldg: spinnvilldg,
  krokholdgs: krokholdgs,
  starframe: starframe,
  prodisc: prodisc,
  aceshop: aceshop,
  dgshop: dgshopSitemap,
  frisbeefeber: frisbeefeberSitemap,
  frisbeesor: frisbeesorSitemap,
  gurudiscgolf: gurudiscgolfSitemap,
};

let index = 0;
const keys = Object.keys(stores) as StoreSlug[];

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
