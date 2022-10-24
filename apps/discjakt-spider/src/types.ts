export type StoreSlug =
  | "aceshop"
  | "dgshop"
  | "discoverdiscs"
  | "frisbeebutikken"
  | "frisbeefeber"
  | "frisbeesor"
  | "gurudiscgolf"
  | "krokholdgs"
  | "prodisc"
  | "spinnvilldg"
  | "starframe"
  | "discshopen";

export type CommonJobItem = {
  store: {
    id: number;
    slug: string;
  };
  loc: string;
  lastmod: string;
};
