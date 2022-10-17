export type StoreSlug = "spinnvilldg" | "starframe";

export type CommonJobItem = {
  store: {
    id: number;
    slug: string;
  };
  loc: string;
  lastmod: string;
};
