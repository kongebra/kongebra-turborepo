import { CheerioAPI } from "cheerio";
import { StoreSlugs } from "src/types/store-slugs";
import { parsePriceString } from "./number";

type StoreProductFn = ($: CheerioAPI) => {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
};

export function getStoreProduct(slug: StoreSlugs): StoreProductFn {
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
      throw new Error(`getStoreProduct(${slug}) not implemented`);
  }
}

function spinnvilldg($: CheerioAPI) {
  const priceStr =
    $('meta[property="product:price:amount"]').attr("content")?.trim() || "";

  const price = parsePriceString(priceStr);

  const data = {
    title: $('meta[property="og:title"]').attr("content")?.trim() || "",
    description:
      $('meta[property="og:description"]').attr("content")?.trim() || "",
    imageUrl: $('meta[property="og:image"]').attr("content")?.trim() || "",
  };

  return {
    price,
    ...data,
  };
}

function starframe($: CheerioAPI) {
  const priceStr = $(".product-price").first()?.text()?.trim() || "";

  const price = parsePriceString(priceStr);

  const data = {
    title: $("h1.product-title-v1").text()?.trim() || "",
    description: $('meta[name="description"]').attr("content")?.trim() || "",
    imageUrl: $(".product_page_slider img").first().attr("src")?.trim() || "",
  };

  return {
    price,
    ...data,
  };
}

function prodisc($: CheerioAPI) {
  const priceStr =
    $('meta[property="og:price:amount"]').attr("content")?.trim() || "";

  const price = parsePriceString(priceStr);

  const data = {
    title: $('meta[property="og:title"]').attr("content")?.trim() || "",
    description:
      $('meta[property="og:description"]').attr("content")?.trim() || "",
    imageUrl: $('meta[property="og:image"]').attr("content")?.trim() || "",
  };

  return {
    price,
    ...data,
  };
}

function krokholdgs($: CheerioAPI) {
  const priceStr = $("span.product-price")?.text()?.trim() || "";

  const price = parsePriceString(priceStr);

  const data = {
    title: $('meta[property="og:title"]').attr("content")?.trim() || "",
    description:
      $('meta[property="og:description"]').attr("content")?.trim() || "",
    imageUrl: $('meta[property="og:image"]').attr("content")?.trim() || "",
  };

  return {
    price,
    ...data,
  };
}

function frisbeesor($: CheerioAPI) {
  const priceStr = $(".product-page-price .amount").text().slice(3) || "";

  const price = parsePriceString(priceStr);

  const data = {
    title: $('meta[property="og:title"]').attr("content")?.trim() || "",
    description:
      $('meta[property="og:description"]').attr("content")?.trim() || "",
    imageUrl: $('meta[property="og:image"]').attr("content")?.trim() || "",
  };

  return {
    price,
    ...data,
  };
}

function frisbeebutikken($: CheerioAPI) {
  const priceStr = $(".product-price")?.text()?.trim() || "";

  const price = parsePriceString(priceStr);

  const data = {
    title: $("h1").text()?.trim() || "",
    description: $('meta[name="description"]').attr("content")?.trim() || "",
    imageUrl: $(".product_image_price_row img").attr("src")?.trim() || "",
  };

  return {
    price,
    ...data,
  };
}

function discoverdiscs($: CheerioAPI) {
  const priceStr =
    $('meta[property="og:price:amount"]').attr("content")?.trim() || "";

  const price = parsePriceString(priceStr);

  const data = {
    title: $('meta[property="og:title"]').attr("content")?.trim() || "",
    description: $('meta[name="description"]').attr("content")?.trim() || "",
    imageUrl: $('meta[property="og:image"]').attr("content")?.trim() || "",
  };

  return {
    price,
    ...data,
  };
}

function discgolfdynasty($: CheerioAPI) {
  const priceStr =
    $('meta[property="og:price:amount"]').attr("content")?.trim() || "";

  const price = parsePriceString(priceStr);

  const data = {
    title: $('meta[property="og:title"]').attr("content")?.trim() || "",
    description: $('meta[name="description"]').attr("content")?.trim() || "",
    imageUrl: $('meta[property="og:image"]').attr("content")?.trim() || "",
  };

  return {
    price,
    ...data,
  };
}

function dgshop($: CheerioAPI) {
  const priceStr =
    $('meta[property="product:price:amount"]').attr("content")?.trim() || "";

  const price = parsePriceString(priceStr);

  const data = {
    title: $('meta[property="og:title"]').attr("content")?.trim() || "",
    description:
      $('meta[property="og:description"]').attr("content")?.trim() || "",
    imageUrl: $('meta[property="og:image"]').attr("content")?.trim() || "",
  };

  if (!data.title && !data.imageUrl && !data.description && !priceStr) {
    console.log("dgshop edgecase", { data, priceStr });
  }

  return {
    price,
    ...data,
  };
}

function aceshop($: CheerioAPI) {
  const priceStr = $(".product-price")?.text()?.trim() || "";

  const price = parsePriceString(priceStr);

  const data = {
    title: $('meta[property="og:title"]').attr("content")?.trim() || "",
    description: $('meta[name="description"]').attr("content")?.trim() || "",
    imageUrl: $('meta[property="og:image"]').attr("content")?.trim() || "",
  };

  return {
    price,
    ...data,
  };
}

function gurudiscgolf($: CheerioAPI) {
  const priceStr =
    $(".woocommerce-Price-amount.amount").first().text().trim() || "";

  const price = parsePriceString(priceStr.replace("kr", ""));

  const data = {
    title: $('meta[property="og:title"]').attr("content")?.trim() || "",
    description:
      $('meta[property="og:description"]').attr("content")?.trim() || "",
    imageUrl:
      $(".woocommerce-product-gallery__wrapper img")
        .first()
        .attr("src")
        ?.trim() || "",
  };

  console.log({ data, priceStr });

  return {
    price,
    ...data,
  };
}
