import Button from "src/frontend/components/Button";
import Container from "src/frontend/components/Container";
import Heading from "src/frontend/components/Heading";

import useStores from "src/frontend/hooks/use-stores";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import React, { useCallback, useMemo, useState } from "react";
import { discTypeToString } from "src/common/utils/discType";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { prisma } from "src/common/lib/prisma";
import { FaHeart } from "react-icons/fa";
import { DiscDetails, discDetailsSelect } from "src/types/prisma";
import Breadcrumbs from "src/frontend/components/Breadcrumbs";
import { serializeDisc } from "src/common/utils/disc";
import { FormLabel, LoadingPage, Section } from "src/frontend/components";
import clsx from "clsx";
import { useUser } from "src/frontend/hooks";
import config from "src/common/config";
import { useQueryClient } from "@tanstack/react-query";
import Toggle from "src/frontend/components/Toggle";
import { NextSeo } from "next-seo";

type Props = {
  disc: DiscDetails;
};

const DiscDetailPage: NextPage<Props> = ({ disc }) => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const {
    query: { slug },
  } = useRouter();

  const { stores, isLoading } = useStores();

  const [showOnlyInStock, setShowOnlyInStock] = useState(true);

  const filteredProducts = useMemo(() => {
    if (showOnlyInStock) {
      return disc.products.filter((disc) => disc.latestPrice > 0);
    }

    return disc.products;
  }, [showOnlyInStock, disc.products]);

  const getStoreName = useCallback(
    (id: number) => {
      return stores.find((x) => x.id === id)?.name || "";
    },
    [stores]
  );

  const getStore = useCallback(
    (id: number) => {
      return stores.find((x) => x.id === id);
    },
    [stores]
  );

  const allProducts = useMemo(() => {
    return filteredProducts
      .map((product) => ({
        ...product,
      }))
      .sort((a, b) => {
        if (a.latestPrice && b.latestPrice) {
          if (a.latestPrice === 0) {
            return 1;
          }

          if (b.latestPrice === 0) {
            return -1;
          }

          return a.latestPrice - b.latestPrice;
        }

        if (a.latestPrice && !b.latestPrice) {
          return -1;
        }

        if (!a.latestPrice && b.latestPrice) {
          return 1;
        }

        return 0;
      });
  }, [filteredProducts]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!disc) {
    return (
      <Container className="flex flex-1 min-h-full items-center justify-center">
        <Heading>Disc not found</Heading>
        <Image
          src="/illustrations/page_not_found.svg"
          alt="Disc ikke funnet"
          width={512}
          height={512}
          className="max-w-full h-auto"
          priority
        />
      </Container>
    );
  }

  return (
    <>
      <NextSeo
        title={`${disc.name} | ${disc.brand.name} | Discjakt`}
        description={`Her ser alle tilgjengelige produkter for ${disc.name} fra ${disc.brand.name} via Discjakt.no`}
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
            href: `/brands/${disc.brand.slug}`,
            label: disc.brand.name,
          },
          {
            href: `/brands/${disc.brand.slug}/${disc.type.toLowerCase()}`,
            label: discTypeToString(disc.type),
          },
          {
            label: disc.name,
          },
        ]}
      />

      <Section>
        <Container className="flex flex-col items-center gap-4">
          <div className="text-center">
            <Heading as="h1" className="font-black">
              {disc.name}
            </Heading>
            <Heading as="h2">{disc.brand.name}</Heading>
          </div>

          <div className="p-4">
            <Image
              src={disc.imageUrl}
              alt={disc.name}
              width={512}
              height={512}
              className="max-w-full h-auto rounded"
            />
          </div>
        </Container>
      </Section>

      <hr />

      <Section>
        <Container>
          <div className="text-center mb-8">
            <Heading as="h2" className="text-center">
              Priser
            </Heading>

            <p className="text-gray-500 mb-4">
              Her ser du en oversikt p?? priser til {disc.name}
            </p>

            <div className="flex flex-row-reverse  justify-center gap-2">
              <FormLabel>Vis kun p?? lager</FormLabel>
              <Toggle
                defaultValue={showOnlyInStock}
                onChange={setShowOnlyInStock}
              />
            </div>
          </div>

          <div></div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {allProducts
              .filter((product) => !product.disabled || user?.role === "admin")
              .map((product) => {
                const price = product.latestPrice;
                const storeName = getStoreName(product.storeId);
                const inStock = price && price !== 0;

                return (
                  <div key={product.id}>
                    <a
                      href={product.loc}
                      target="_blank"
                      rel="noreferrer"
                      className="group"
                      title={product.title}
                    >
                      <div className="grid grid-cols-5 lg:grid-cols-1 gap-4">
                        <div
                          className={clsx(
                            "col-span-2 relative bg-white rounded-md border-4 mb-4 group-hover:ring-4 transition p-2",
                            {
                              "border-red-500/75 ring-red-500": !inStock,
                            }
                          )}
                        >
                          <Image
                            unoptimized
                            src={
                              product.imageUrl
                                ? product.imageUrl
                                : "/placeholder.png"
                            }
                            alt={product.title}
                            width={512}
                            height={512}
                            className={clsx(
                              "max-w-full h-auto rounded group-hover:opacity-100 transition aspect-square object-contain",
                              {
                                "opacity-50": !inStock,
                              }
                            )}
                          />
                        </div>

                        <div className="col-span-3 flex flex-col lg:items-center">
                          <span
                            className="font-light text-gray-500"
                            aria-label={storeName}
                            title={storeName}
                          >
                            {storeName}
                          </span>
                          <span
                            className="font-semibold text-lg group-hover:underline transition"
                            aria-label={product.title}
                            title={product.title}
                          >
                            {product.title}
                          </span>

                          <span
                            title={inStock ? `${price} kr` : "Ikke p?? lager"}
                            className={clsx({
                              "text-red-700 font-semibold": !inStock,
                            })}
                          >
                            {inStock ? `${price} kr` : "Ikke p?? lager"}
                          </span>
                        </div>
                      </div>
                    </a>
                  </div>
                );
              })}
          </div>
        </Container>
      </Section>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const discs = await prisma.disc.findMany({
    select: {
      slug: true,
    },
  });

  const paths = discs.map((disc) => ({ params: { slug: disc.slug } }));

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

  const data = await prisma.disc.update({
    where: {
      slug,
    },
    data: {
      views: {
        increment: 1,
      },
    },
    select: discDetailsSelect,
  });

  const disc = serializeDisc(data);

  return {
    props: {
      disc,
    },
    revalidate: 60 * 5, // 5 minutt
  };
};

export default DiscDetailPage;
