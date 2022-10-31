import { Product, Store } from "@prisma/client";
import { prisma } from "../../lib/prisma";

import aceshop from "../../scraper/update-product-price/aceshop";
import dgshop from "../../scraper/update-product-price/dgshop";
import discoverdiscs from "../../scraper/update-product-price/discoverdiscs";
import discshopen from "../../scraper/update-product-price/discshopen";
import frisbeebutikken from "../../scraper/update-product-price/frisbeebutikken";
import frisbeefeber from "../../scraper/update-product-price/frisbeefeber";
import frisbeesor from "../../scraper/update-product-price/frisbeesor";
import gurudiscgolf from "../../scraper/update-product-price/gurudiscgolf";
import krokholdgs from "../../scraper/update-product-price/krokholdgs";
import prodisc from "../../scraper/update-product-price/prodisc";
import spinnvilldg from "../../scraper/update-product-price/spinnvilldg";
import starframe from "../../scraper/update-product-price/starframe";

import Bull from "bull";
import config from "../../config";

const queue = new Bull<Product & { store: Store }>("daily", config.redisUrl, {
  defaultJobOptions: {
    removeOnComplete: 10,
  },
});

queue.process(async ({ data, id }) => {
  return await scrapeProductPage(data);
});

export default async function handler() {
  console.time("fetch all products");
  const products = await prisma.product.findMany({
    include: {
      store: true,
    },
  });
  console.timeEnd("fetch all products");

  console.time("queue.addBulk");
  queue.addBulk(products.map((product) => ({ data: product })));
  console.timeEnd("queue.addBulk");
}

async function scrapeProductPage(product: Product & { store: Store }) {
  switch (product.store.slug) {
    case "aceshop":
      await aceshop(product);
      break;

    case "dgshop":
      await dgshop(product);
      break;

    case "discoverdiscs":
      await discoverdiscs(product);
      break;

    case "discshopen":
      await discshopen(product);
      break;

    case "frisbeebutikken":
      await frisbeebutikken(product);
      break;

    case "frisbeefeber":
      await frisbeefeber(product);
      break;

    case "frisbeesor":
      await frisbeesor(product);
      break;

    case "gurudiscgolf":
      await gurudiscgolf(product);
      break;

    case "krokholdgs":
      await krokholdgs(product);
      break;

    case "prodisc":
      await prodisc(product);
      break;

    case "spinnvilldg":
      await spinnvilldg(product);
      break;

    case "starframe":
      await starframe(product);
      break;

    default:
      console.error(
        `product scrape: store not implemented: ${product.store.slug}`
      );
      break;
  }
}
