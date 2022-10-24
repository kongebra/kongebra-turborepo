import { Store } from "@prisma/client";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";
import { prisma } from "src/common/lib/prisma";

import {
  Container,
  Heading,
  LoadingPage,
  Section,
  SelectDiscSort,
  SimpleProduct,
} from "src/frontend/components";
import { useSortDiscs } from "src/frontend/hooks";
import useStoreDiscs from "src/frontend/hooks/use-store-discs";

export const getStaticPaths: GetStaticPaths = async () => {
  const stores = await prisma.store.findMany({
    select: {
      slug: true,
    },
  });

  const paths = stores.map((store) => ({ params: { slug: store.slug } }));

  return {
    paths,
    fallback: false,
  };
};

type Props = {
  store: Store;
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  if (!slug) {
    return {
      notFound: true,
    };
  }

  const store = await prisma.store.findFirst({
    where: {
      slug,
    },
  });

  if (!store) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      store: JSON.parse(JSON.stringify(store)),
    },
  };
};

const StoreBySlugPage: NextPage<Props> = ({ store }) => {
  const { sort, setSort, sortFn } = useSortDiscs();

  const { discs, isInitialLoading } = useStoreDiscs(store.id);

  return (
    <>
      <Section>
        <Container className="flex flex-col lg:flex-row justify-between lg:items-center mb-4 lg:mb-16">
          <Heading className="mb-2 lg:mb-0">{store.name}</Heading>
          <div>
            <SelectDiscSort value={sort} onChange={setSort} />
          </div>
        </Container>
      </Section>

      <Section>
        {isInitialLoading ? (
          <LoadingPage />
        ) : (
          <Container>
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              {discs.sort(sortFn).map((disc) => (
                <SimpleProduct key={disc.id} disc={disc as any} />
              ))}
            </div>
          </Container>
        )}
      </Section>
    </>
  );
};

export default StoreBySlugPage;
