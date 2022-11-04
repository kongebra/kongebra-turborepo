import { Disc, Product } from "@prisma/client";
import React, { useCallback, useMemo } from "react";
import Button from "src/frontend/components/Button";
import Image from "next/future/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useProducts from "src/frontend/hooks/use-products";
import useDiscs from "src/frontend/hooks/use-discs";
import { DiscDetails } from "src/types/prisma";
import { findMatch, findMatchV2 } from "../utils/find-match";
import clsx from "clsx";

const fetchMatchData = async (title: string): Promise<Disc[]> => {
  const resp = await fetch(`/api/products/find-disc?title=${title}`);
  return await resp.json();
};

type SearchResult = {
  hits: {
    id: string;
    discId: number;
    name: string;
    brandId: number;
    brand: string;
  }[];
  count: number;
};

type Props = {
  product: Product;

  onClickCreateDisc: (product: Product) => void;
  onClickSelectDisc: (product: Product) => void;

  globalLoading: boolean;
};

const DataCleaningProduct: React.FC<Props> = ({
  product,
  onClickCreateDisc,
  onClickSelectDisc,
  globalLoading,
}) => {
  // const { discs } = useDiscs();
  const {
    mutations: { update: updateProduct },
  } = useProducts({ enabled: false });

  // const findMatches = useCallback(
  //   (product: Product) => {
  //     return findMatch(product, discs);
  //   },
  //   [discs]
  // );

  const onMatchClicked = async (product: Product, discId: number) => {
    const copy = {
      ...product,
      discId,
      isDisc: true,
    };

    await updateProduct.mutateAsync({ record: copy });
  };

  const onNoDiscClicked = async (product: Product) => {
    const copy = {
      ...product,
      isDisc: false,
    };

    await updateProduct.mutateAsync({ record: copy });
  };

  const { data: discMatches, isLoading } = useQuery(
    ["data-cleaning", { title: product.title }],
    () => findMatchV2(product),
    {}
  );

  if (isLoading) {
    return null;
  }

  if (!discMatches) {
    return (
      <div>
        <p>error</p>
      </div>
    );
  }

  // const discMatches = findMatches(product);
  return (
    <div
      key={product.id}
      className={clsx(
        "flex justify-between items-center gap-4 p-2 bg-white rounded-lg shadow",
        {
          "bg-red-100": discMatches?.length === 0,
          "bg-green-100": discMatches?.length === 1,
          "bg-amber-100": discMatches?.length > 1,
        }
      )}
    >
      <div className="flex gap-4">
        <Image
          className="max-w-full h-auto rounded-lg mb-2 aspect-square"
          src={product.imageUrl}
          alt={product.title}
          width={64}
          height={64}
        />

        <div className="flex flex-col justify-between">
          <h3 className="font-xl font-bold">{product.title}</h3>

          <div className="flex gap-1">
            <Button
              size="xs"
              color="success"
              onClick={() => onClickCreateDisc(product)}
              isLoading={updateProduct.isLoading || globalLoading}
            >
              Lag disc
            </Button>

            <Button
              size="xs"
              color="primary"
              onClick={() => onClickSelectDisc(product)}
              isLoading={updateProduct.isLoading || globalLoading}
            >
              Velg disc
            </Button>

            <Button
              size="xs"
              color="danger"
              onClick={async () => {
                await onNoDiscClicked(product);
              }}
              isLoading={updateProduct.isLoading || globalLoading}
            >
              Ikke disc
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-1">
        {discMatches?.map((disc) => (
          <Button
            key={disc.id}
            size="xs"
            onClick={async () => {
              await onMatchClicked(product, disc.id);
            }}
            isLoading={updateProduct.isLoading || globalLoading}
          >
            {disc.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DataCleaningProduct;
