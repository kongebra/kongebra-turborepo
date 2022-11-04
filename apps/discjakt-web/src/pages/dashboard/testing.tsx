import { Disc, Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { NextPage } from "next";
import React, { useMemo, useState } from "react";
import { prisma } from "src/common/lib/prisma";
import { findMatchV2 } from "src/features/dashboard/utils/find-match";
import { Heading, Section } from "src/frontend/components";
import DashboardLayout from "src/frontend/layout/DashboardLayout";

export const getServerSideProps = async () => {
  const products = await prisma.product.findMany({
    where: {
      isDisc: true,
    },
    include: {
      disc: true,
    },
    take: 500,
    skip: 500 * 12,
  });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};

type Props = {
  products: (Product & { disc?: Disc })[];
};

const ProductSuggestion = ({
  product,
  correct,
  onGuess,
}: {
  product: Product;
  correct?: string;
  onGuess: (correct: boolean) => void;
}) => {
  const { data, isInitialLoading } = useQuery(
    ["dashboard", "testing", product.id],
    () => findMatchV2(product),
    {
      onSuccess(data) {
        const g = data?.map((item) => item.name).join(", ");
        if (!correct && !g) {
          return onGuess(true);
        }

        if (correct) {
          return onGuess(g === correct);
        } else {
          if (g) {
            return onGuess(false);
          }
        }

        console.log("we should not be here!", { g, correct });
      },
    }
  );

  const guess = data?.map((item) => item.name).join(", ");
  const correctGuess = guess === correct;

  if (isInitialLoading) {
    return <span className="text-sky-600">Loading...</span>;
  }

  if (!data) {
    return <span className="text-red-600">Error: {product.id}</span>;
  }

  if (data.length === 0) {
    return (
      <span
        className={clsx({
          "font-bold text-green-600": !correct,
        })}
      >
        Ingen treff
      </span>
    );
  }

  return (
    <span
      className={clsx({
        "font-bold text-green-600": correctGuess,
      })}
    >
      {data.map((item) => item.name).join(", ")}
    </span>
  );
};

const DashboardTesting: NextPage<Props> = ({ products }) => {
  const [errorCount, setErrorCount] = useState<[number, number]>([0, 0]);

  return (
    <DashboardLayout className="bg-gray-100">
      <Section>
        <p>
          Errors: {[errorCount[0]]}/{errorCount[1]}
        </p>

        <table className="w-full">
          <thead className="text-left bg-teal-100">
            <tr className="border-b">
              <th>ID</th>
              <th className="border-r">Product Name</th>
              <th>Disc suggestions</th>
              <th>Correct disc</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td>{product.id}</td>
                <td className="border-r">{product.title}</td>
                <td>
                  <ProductSuggestion
                    product={product}
                    correct={product?.disc?.name}
                    onGuess={(correct) => {
                      setErrorCount((prev) => [
                        prev[0] + (correct ? 0 : 1),
                        prev[1] + 1,
                      ]);
                    }}
                  />
                </td>
                <td>{product?.disc ? product?.disc?.name : "Ikke disc"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </DashboardLayout>
  );
};

export default DashboardTesting;
