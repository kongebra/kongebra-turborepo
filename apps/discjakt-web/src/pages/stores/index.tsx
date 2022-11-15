import { Prisma } from "discjakt-db";
import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Breadcrumbs,
  Container,
  Heading,
  Section,
} from "src/frontend/components";
import { prisma } from "src/common/lib/prisma";
import { NextSeo } from "next-seo";

const storeSelect = Prisma.validator<Prisma.StoreSelect>()({
  id: true,
  name: true,
  baseUrl: true,
  slug: true,
  _count: {
    select: {
      products: {
        where: {
          isDisc: true,
          latestPrice: {
            gt: 0,
          },
        },
      },
    },
  },
});

type StoreType = Prisma.StoreGetPayload<{ select: typeof storeSelect }>;

type Props = {
  stores: StoreType[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const stores = await prisma.store.findMany({
    select: storeSelect,
  });

  return {
    props: {
      stores: JSON.parse(JSON.stringify(stores)) || [],
    },
    revalidate: 60 * 10, // 10 minutter
  };
};

const StoreIndex: NextPage<Props> = ({ stores }) => {
  return (
    <>
      <NextSeo
        title={`Nettbutikker | Discjakt`}
        description={`Her får du en oversikt over alle nettbutikker som er på Discjakt.no`}
      />

      <Breadcrumbs
        items={[
          {
            label: "Forsiden",
            href: "/",
          },
          {
            label: "Nettbutikker",
          },
        ]}
      />

      <Section>
        <Container className="text-center">
          <Heading className="mb-8 font-bold">Nettbutikker</Heading>

          <p className="text-gray-500 mb-8">
            Her ser du en liste over nettbutikker som vi samler data fra, hvor
            du kan finne din favoritt disk til best mulig pris!
            <br />
            Eller bare sjekke om de har den disken du vil ha på lager!
          </p>
        </Container>
      </Section>

      <hr />

      <Section>
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stores.map((store) => {
              return (
                <Link
                  key={store.id}
                  href={`/stores/${store.slug}`}
                  className="group"
                  title={store.name}
                >
                  <div className="flex flex-col items-center">
                    <Image
                      src={"/placeholder.png"} //  TODO: Få inn bilde
                      alt={store.name}
                      width={512}
                      height={512}
                      className="max-w-full h-auto rounded-md border-4 mb-4 group-hover:ring-4 aspect-square object-contain"
                    />

                    <div className="flex flex-col items-center">
                      <span
                        className="font-light text-gray-500"
                        aria-label={store.baseUrl}
                      >
                        {store.baseUrl}
                      </span>
                      <span
                        className="font-semibold text-lg group-hover:underline"
                        aria-label={store.name}
                      >
                        {store.name}
                      </span>
                    </div>

                    <span>{`${store._count.products} disker på lager`}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
};

export default StoreIndex;
