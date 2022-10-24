import { CheerioAPI } from "cheerio";
import { StoreSlugs } from "src/types/store-slugs";

type StoreLocFn = ($: CheerioAPI) => {
  loc: string;
  lastmod: string;
}[];

export function getStoreLoc(slug: StoreSlugs): StoreLocFn {
  switch (slug) {
    case "spinnvilldg":
      return spinnvilldg;
    case "starframe":
      return starframe;
    case "prodisc":
      return prodisc;
    case "krokholdgs":
      return krokholdgs;
    case "frisbeesor":
      return frisbeesor;
    case "frisbeebutikken":
      return frisbeebutikken;
    case "discoverdiscs":
      return discoverdiscs;
    case "discgolfdynasty":
      return discgolfdynasty;
    case "dgshop":
      return dgshop;
    case "aceshop":
      return aceshop;
    case "gurudiscgolf":
      return gurudiscgolf;
    default:
      throw new Error(`getStoreLoc(${slug}) not implemented`);
  }
}

function spinnvilldg($: CheerioAPI) {
  const result: { loc: string; lastmod: string }[] = [];

  $("url").each((i, el) => {
    const loc = $(el).find("loc").text().trim();
    const lastmod = $(el).find("lastmod").text().trim();

    if (loc.includes("/product-page/")) {
      result.push({ loc, lastmod });
    }
  });

  return result;
}

function starframe($: CheerioAPI) {
  const result: { loc: string; lastmod: string }[] = [];

  $("url").each((i, el) => {
    const loc = $(el).find("loc").text().trim();
    const lastmod = $(el).find("lastmod").text().trim();

    if (loc.includes("/products/")) {
      result.push({ loc, lastmod });
    }
  });

  return result;
}

function prodisc($: CheerioAPI) {
  const result: { loc: string; lastmod: string }[] = [];

  $("url").each((i, el) => {
    const loc = $(el).find("loc").text().trim();
    const lastmod = $(el).find("lastmod").text().trim();

    if (loc.includes("/products/")) {
      result.push({ loc, lastmod });
    }
  });

  return result;
}

function krokholdgs($: CheerioAPI) {
  const result: { loc: string; lastmod: string }[] = [];

  $("url").each((i, el) => {
    const loc = $(el).find("loc").text().trim();
    const lastmod = $(el).find("lastmod").text().trim();

    if (loc.includes("/products/")) {
      result.push({ loc, lastmod });
    }
  });

  return result;
}

function frisbeesor($: CheerioAPI) {
  const result: { loc: string; lastmod: string }[] = [];

  $("url").each((i, el) => {
    const loc = $(el).find("loc").text().trim();
    const lastmod = $(el).find("lastmod").text().trim();

    if (loc.includes("/produkt/")) {
      result.push({ loc, lastmod });
    }
  });

  return result;
}

function frisbeebutikken($: CheerioAPI) {
  const result: { loc: string; lastmod: string }[] = [];

  $("url").each((i, el) => {
    const loc = $(el).find("loc").text().trim();
    const lastmod = $(el).find("lastmod").text().trim();

    if (loc.includes("/products/")) {
      result.push({ loc, lastmod });
    }
  });

  return result;
}

function discoverdiscs($: CheerioAPI) {
  const result: { loc: string; lastmod: string }[] = [];

  $("url").each((i, el) => {
    const loc = $(el).find("loc").text().trim();
    const lastmod = $(el).find("lastmod").text().trim();

    if (loc.includes("/products/")) {
      result.push({ loc, lastmod });
    }
  });

  return result;
}

function discgolfdynasty($: CheerioAPI) {
  const result: { loc: string; lastmod: string }[] = [];

  $("url").each((i, el) => {
    const loc = $(el).find("loc").text().trim();
    const lastmod = $(el).find("lastmod").text().trim();

    if (loc.includes("/products/")) {
      result.push({ loc, lastmod });
    }
  });

  return result;
}

function dgshop($: CheerioAPI) {
  const result: { loc: string; lastmod: string }[] = [];

  $("url").each((i, el) => {
    const loc = $(el).find("loc").text().trim();
    const lastmod = $(el).find("lastmod").text().trim();
    const priority = $(el).find("priority").text().trim();

    if (priority == "1.0" && loc !== "https://www.dgshop.no/") {
      result.push({ loc, lastmod });
    }
  });

  return result;
}

function aceshop($: CheerioAPI) {
  const result: { loc: string; lastmod: string }[] = [];

  $("url").each((i, el) => {
    const loc = $(el).find("loc").text().trim();
    const lastmod = $(el).find("lastmod").text().trim();

    if (loc.includes("/products/")) {
      result.push({ loc, lastmod });
    }
  });

  return result;
}

function gurudiscgolf($: CheerioAPI) {
  const result: { loc: string; lastmod: string }[] = [];

  $("url").each((i, el) => {
    const loc = $(el).find("loc").text().trim();
    const lastmod = $(el).find("lastmod").text().trim();

    if (loc.includes("/produkt/")) {
      result.push({ loc, lastmod });
    }
  });

  return result;
}
