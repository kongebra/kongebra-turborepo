export type StoreSlug = "spinnvilldg" | "starframe" | "prodisc";

export type CommonJobItem = {
  store: {
    id: number;
    slug: string;
  };
  loc: string;
  lastmod: string;
};
