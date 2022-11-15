import { Plastic } from "discjakt-db";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import { Heading, Table } from "src/frontend/components";
import { useBrands } from "src/frontend/hooks";
import usePlastics from "src/frontend/hooks/use-plastics";
import DashboardLayout from "src/frontend/layout/DashboardLayout";

const columnHelper = createColumnHelper<Plastic>();

const defaultColumns = () => {
  return [
    columnHelper.accessor("name", {
      header: () => "Navn",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("slug", {
      header: () => "Slug",
      cell: (info) => info.getValue(),
    }),
    // columnHelper.accessor(""),
  ];
};

const DashboardPlasticsPage = () => {
  const { plastics } = usePlastics();
  const { brands } = useBrands();

  const columns = defaultColumns();

  return (
    <DashboardLayout className="bg-gray-100">
      <Table data={plastics} columns={columns} title={"Plastics"} />
    </DashboardLayout>
  );
};

export default DashboardPlasticsPage;
