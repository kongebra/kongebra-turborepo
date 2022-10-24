import React, { useMemo, useState } from "react";

import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import {
  Breadcrumbs,
  Container,
  Heading,
  Section,
  SelectDiscSort,
  SimpleProduct,
} from "src/frontend/components";

import { useDiscs, useSortDiscs } from "src/frontend/hooks";
import { prisma } from "src/common/lib/prisma";
import {
  BrandDetails,
  brandDetailsSelect,
  DiscDetails,
  discDetailsSelect,
} from "src/types/prisma";
import { serializeDisc } from "src/common/utils/disc";
import { discTypeToString } from "src/common/utils/discType";
import { Brand } from "@prisma/client";
import useBrandDiscs from "src/frontend/hooks/use-brand-discs";

type Props = {
  brand: Brand;
  type: string;
};

const BrandTypesPage: NextPage<Props> = ({ brand, type }) => {
  const { sort, setSort, sortFn } = useSortDiscs();

  const { discs, isLoading } = useBrandDiscs({ slug: brand.slug, type });

  return (
    <>
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
            href: `/brands/${brand.slug}`,
            label: brand.name,
          },
          {
            label: discTypeToString(type),
          },
        ]}
      />

      <Section>
        <Container className="flex flex-col lg:flex-row justify-between lg:items-center">
          <Heading className="mb-4 lg:mb-0">
            {brand.name} ({discTypeToString(type)})
          </Heading>
          <div>
            <SelectDiscSort value={sort} onChange={setSort} />
          </div>
        </Container>
      </Section>

      <hr />

      {/* // TODO: Loading state */}

      <Section>
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
            {discs.sort(sortFn).map((disc) => (
              <SimpleProduct key={disc.id} disc={disc} />
            ))}
          </div>
        </Container>
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

  const types = ["putter", "midrage", "fairway", "distance"];
  const paths = types
    .map((type) =>
      brands.map((brand) => ({ params: { slug: brand.slug, type: type } }))
    )
    .flat();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string | undefined;
  const type = params?.type as string | undefined;

  if (!slug || !type) {
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

  const data = JSON.parse(JSON.stringify(brand));

  return {
    props: {
      brand: data,
      type,
    },
    revalidate: 60 * 5,
  };
};

export default BrandTypesPage;
