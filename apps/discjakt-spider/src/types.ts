export type StoreSlug =
  | "spinnvilldg"
  | "starframe"
  | "prodisc"
  | "aceshop"
  | "krokholdgs"
  | "frisbeebutikken";

export type CommonJobItem = {
  store: {
    id: number;
    slug: string;
  };
  loc: string;
  lastmod: string;
};
