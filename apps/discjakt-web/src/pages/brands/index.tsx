import React from "react";

import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { prisma } from "src/common/lib/prisma";
import {
  Breadcrumbs,
  Container,
  Heading,
  Section,
} from "src/frontend/components";
import { type BrandDetails, brandDetailsSelect } from "src/types/prisma";
import { Brand } from "discjakt-db";
import { NextSeo } from "next-seo";

type Props = {
  brands: (Brand & {
    _count: {
      discs: number;
    };
  })[];
};

const BrandsPage: NextPage<Props> = ({ brands }) => {
  return (
    <>
      <NextSeo
        title="Merker | Discjakt"
        description="Her får du en full oversikt over alle merker som er tilgjengelig i norske nettbutikker"
      />

      <Breadcrumbs
        items={[
          {
            label: "Forsiden",
            href: "/",
          },
          {
            label: "Merker",
          },
        ]}
      />

      <Section>
        <Container className="text-center">
          <Heading className="mb-8 font-bold">Merker</Heading>
          <p className="text-gray-500">
            Her er en oversikt over alle merkene som det finnes disker
            tilgjengelig på markedet.
          </p>
        </Container>
      </Section>

      <hr />

      <Section>
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {brands
              .filter((brand) => brand._count.discs)
              .sort((a, b) => b._count.discs - a._count.discs)
              .map((brand) => (
                <Link
                  key={brand.id}
                  href={`/brands/${brand.slug}`}
                  className="group"
                  title={brand.name}
                >
                  <div className="flex flex-col items-center">
                    <Image
                      src={brand.imageUrl ? brand.imageUrl : "/placeholder.png"}
                      alt={brand.name}
                      width={512}
                      height={512}
                      className="max-w-full h-auto rounded-md border-4 mb-4 group-hover:ring-4 aspect-square object-contain"
                    />

                    <div className="flex flex-col items-center">
                      {/* <span
                          className="font-light text-gray-500"
                          aria-label={brand.brand.name}
                        >
                          {brand.brand.name}
                        </span> */}
                      <span
                        className="font-semibold text-lg group-hover:underline"
                        aria-label={brand.name}
                      >
                        {brand.name}
                      </span>
                    </div>

                    <span>{`${brand._count.discs} disker`}</span>
                  </div>
                </Link>
              ))}
          </div>
        </Container>
      </Section>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const brands = await prisma.brand.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      url: true,
      imageUrl: true,
      slug: true,

      _count: {
        select: {
          discs: true,
        },
      },
    },
  });

  return {
    props: {
      brands,
    },
    revalidate: 60 * 10, // 10 minutt
  };
};

export default BrandsPage;
