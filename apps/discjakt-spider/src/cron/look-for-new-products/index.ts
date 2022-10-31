import { prisma } from "../../lib/prisma";

import aceshop from "../../scraper/sitemap/aceshop";
import dgshop from "../../scraper/sitemap/dgshop";
import discoverdiscs from "../../scraper/sitemap/discoverdiscs";
import discshopen from "../../scraper/sitemap/discshopen";
import frisbeebutikken from "../../scraper/sitemap/frisbeebutikken";
import frisbeefeber from "../../scraper/sitemap/frisbeefeber";
import frisbeesor from "../../scraper/sitemap/frisbeesor";
import gurudiscgolf from "../../scraper/sitemap/gurudiscgolf";
import krokholdgs from "../../scraper/sitemap/krokholdgs";
import prodisc from "../../scraper/sitemap/prodisc";
import spinnvilldg from "../../scraper/sitemap/spinnvilldg";
import starframe from "../../scraper/sitemap/starframe";

export default async function handler() {
  console.time("look for new products");

  const stores = await prisma.store.findMany();

  for (const store of stores) {
    await lookForNewProducts(store.slug);
  }
  console.timeEnd("look for new products");
}

async function lookForNewProducts(slug: string) {
  switch (slug) {
    case "aceshop":
      await aceshop();
      break;

    case "dgshop":
      await dgshop();
      break;

    case "discoverdiscs":
      await discoverdiscs();
      break;

    case "discshopen":
      await discshopen();
      break;

    case "frisbeebutikken":
      await frisbeebutikken();
      break;

    case "frisbeefeber":
      await frisbeefeber();
      break;

    case "frisbeesor":
      await frisbeesor();
      break;

    case "gurudiscgolf":
      await gurudiscgolf();
      break;

    case "krokholdgs":
      await krokholdgs();
      break;

    case "prodisc":
      await prodisc();
      break;

    case "spinnvilldg":
      await spinnvilldg();
      break;

    case "starframe":
      await starframe();
      break;

    default:
      console.error(`new store not implemented: ${slug}`);
      break;
  }
}
