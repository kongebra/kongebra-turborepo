import React, { useMemo, useState } from "react";

import Link from "next/link";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { Brand } from "discjakt-db";

import {
  Breadcrumbs,
  Container,
  FormLabel,
  Heading,
  LoadingPage,
  Section,
  SelectDiscSort,
  SimpleProduct,
} from "src/frontend/components";

import { prisma } from "src/common/lib/prisma";
import { useDiscs, useSortDiscs } from "src/frontend/hooks";
import { discTypeToString } from "src/common/utils/discType";
import useBrandDiscs from "src/frontend/hooks/use-brand-discs";
import Toggle from "src/frontend/components/Toggle";
import { NextSeo } from "next-seo";

type Props = {
  brand: Brand;
};

const BrandDetailsPage: NextPage<Props> = ({ brand }) => {
  const { sort, setSort, sortFn } = useSortDiscs();

  const { discs, isLoading } = useBrandDiscs({ slug: brand.slug });

  const [showOnlyInProduction, setShowOnlyInProduction] = useState(true);

  const filteredDiscs = useMemo(() => {
    if (showOnlyInProduction) {
      return discs.filter((disc) => disc.outOfProduction === false);
    }

    return discs;
  }, [showOnlyInProduction, discs]);

  return (
    <>
      <NextSeo
        title={`${brand.name} | Discjakt`}
        description={`Her får du en oversikt over ${brand.name} sine discer som er i salg i norske nettbutikker`}
      />

      <Breadcrumbs
        items={[
          {
            label: "Forsiden",
            href: "/",
          },
          {
            label: "Merker",
            href: "/brands",
          },
          {
            label: brand.name,
          },
        ]}
      />

      <Section>
        <Container className="flex flex-col lg:flex-row justify-between lg:items-center mb-4 lg:mb-16">
          <Heading className="mb-2 lg:mb-0">{brand.name}</Heading>
          <div className="flex flex-col">
            <SelectDiscSort value={sort} onChange={setSort} />

            <div className="flex flex-row-reverse lg:flex-col justify-end gap-2">
              <FormLabel>Vis kun disker i produksjon</FormLabel>
              <Toggle
                defaultValue={showOnlyInProduction}
                onChange={setShowOnlyInProduction}
              />
            </div>
          </div>
        </Container>

        <Container className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {["putter", "midrage", "fairway", "distance"].map((type) => (
            <Link key={type} href={`/brands/${brand.slug}/${type}`} passHref>
              <a className="border hover:ring-4 text-center flex items-center justify-center rounded-md text-lg lg:text-2xl font-semibold py-4 lg:py-8">
                {discTypeToString(type)}
              </a>
            </Link>
          ))}
        </Container>
      </Section>

      <hr />

      <Section>
        {isLoading ? (
          <LoadingPage />
        ) : (
          <Container>
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              {filteredDiscs.sort(sortFn).map((disc) => (
                <SimpleProduct key={disc.id} disc={disc} />
              ))}
            </div>
          </Container>
        )}
      </Section>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const brands = await prisma.brand.findMany({
    select: {
      slug: true,
    },
  });

  const paths = brands.map((brand) => ({ params: { slug: brand.slug } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string | undefined;
  if (!slug) {
    return {
      notFound: true,
    };
  }

  const brand = await prisma.brand.findFirst({
    where: {
      slug,
    },
  });

  if (!brand) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      brand: JSON.parse(JSON.stringify(brand)),
    },
    revalidate: 60 * 5, // 5 minutt
  };
};

export default BrandDetailsPage;
