import { Prisma, Store } from "@prisma/client";

export type StoreDefault = Store;

export const storeWithCountSelect = Prisma.validator<Prisma.StoreSelect>()({
  id: true,
  name: true,
  description: true,
  imageUrl: true,
  baseUrl: true,
  sitemapUrl: true,
  createdAt: true,
  updatedAt: true,
  slug: true,

  _count: true,
});

export type StoreWithCount = Prisma.StoreGetPayload<{
  select: typeof storeWithCountSelect;
}>;
