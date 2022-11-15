import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import { DiscDetails } from "src/types/prisma";

type SimplifiedDisc = Pick<
  DiscDetails,
  | "products"
  | "slug"
  | "name"
  | "imageUrl"
  | "id"
  | "speed"
  | "glide"
  | "turn"
  | "fade"
  | "type"
  | "brand"
>;

type Props = {
  disc: SimplifiedDisc;
  featured?: boolean;

  unoptimized?: boolean;
};

const SimpleProduct: React.FC<Props> = ({ disc, featured, unoptimized }) => {
  const lowestPrice = useMemo(() => {
    const prices = disc.products
      .map((product) => product.latestPrice)
      .filter((price) => price);

    const lowest = Math.min(...prices);

    if (lowest === Infinity) {
      return 0;
    }

    return lowest;
  }, [disc.products]);

  return (
    <Link href={`/discs/${disc.slug}`} className="group" title={disc.name}>
      <div className="flex flex-col items-center">
        <div
          className={clsx(
            "relative bg-white rounded-md border-4 mb-4 group-hover:ring-4 transition p-2",
            {
              "border-red-500": lowestPrice === 0,
            }
          )}
        >
          <Image
            src={disc.imageUrl ? disc.imageUrl : "/placeholder.png"}
            alt={disc.name}
            width={350}
            height={350}
            className="max-w-full h-auto aspect-square object-contain rounded group-hover:opacity-75 transition"
            priority={featured}
            unoptimized={unoptimized}
          />

          <div
            className={clsx(
              "absolute inset-x-0 bottom-0 font-black  grid grid-cols-4",
              {
                "text-xl lg:text-4xl": featured,
                "text-lg lg:text-xl": !featured,
              }
            )}
          >
            <div
              className="flex items-center justify-center bg-green-200 aspect-square"
              title="Speed"
            >
              <span>{disc.speed}</span>
            </div>
            <div
              className="flex items-center justify-center bg-orange-200 aspect-square"
              title="Glide"
            >
              <span>{disc.glide}</span>
            </div>
            <div
              className="flex items-center justify-center bg-sky-200 aspect-square"
              title="Turn"
            >
              <span>{disc.turn}</span>
            </div>
            <div
              className="flex items-center justify-center bg-yellow-200 aspect-square"
              title="Fade"
            >
              <span>{disc.fade}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <span
            className="font-light text-gray-500"
            aria-label={disc.brand.name}
            title={disc.brand.name}
          >
            {disc.brand.name}
          </span>
          <span
            className="font-semibold text-lg group-hover:underline transition"
            aria-label={disc.name}
            title={disc.name}
          >
            {disc.name}
          </span>
        </div>

        <span
          className={clsx({
            "text-red-500 font-semibold": lowestPrice === 0,
          })}
          title={
            lowestPrice === 0
              ? "Ikke på lager"
              : `Laveste pris: ${lowestPrice} kr`
          }
        >
          {lowestPrice === 0 ? "Ikke på lager" : `${lowestPrice} kr`}
        </span>
      </div>
    </Link>
  );
};

export default SimpleProduct;
