import { Disc, Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { NextPage } from "next";
import React, { useMemo } from "react";
import { prisma } from "src/common/lib/prisma";
import { findMatchV2 } from "src/features/dashboard/utils/find-match";
import { Heading, Section } from "src/frontend/components";
import DashboardLayout from "src/frontend/layout/DashboardLayout";

export const getServerSideProps = async () => {
  const products = await prisma.product.findMany({
    where: {
      disc: {
        brandId: 34,
      },
    },
    include: {
      disc: true,
    },
    orderBy: {
      disc: {
        slug: "asc",
      },
    },
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
}: {
  product: Product;
  correct?: string;
}) => {
  const { data, isInitialLoading } = useQuery(
    ["dashboard", "testing", product.id],
    () => findMatchV2(product)
  );

  const guess = data?.map((item) => item.name).join(", ");
  const correctGuess = guess === correct;

  if (isInitialLoading) {
    return <span className="text-sky-600">Loading...</span>;
  }

  if (!data) {
    return <span className="text-red-600">Error: {product.id}</span>;
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
  return (
    <DashboardLayout className="bg-gray-100">
      <Section>
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
                  />
                </td>
                <td>{product?.disc?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </DashboardLayout>
  );
};

export default DashboardTesting;
