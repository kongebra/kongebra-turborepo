import React, { useState } from "react";
import { Brand, Disc, Product } from "discjakt-db";

import { createColumnHelper } from "@tanstack/react-table";

import Button from "src/frontend/components/Button";
import Drawer from "src/frontend/components/Drawer";
import Table from "src/frontend/components/Table";

import EditDiscDrawer from "src/features/dashboard/drawers/EditDiscDrawer";

import useDiscs from "src/frontend/hooks/use-discs";

import DashboardLayout from "src/frontend/layout/DashboardLayout";

import { DiscDetails } from "src/types/prisma";
import Badge from "src/frontend/components/Badge";
import EditDiscImageDrawer from "src/features/dashboard/drawers/EditDiscImageDrawer";

const columnHelper = createColumnHelper<DiscDetails>();

type DefaultColumnsProps = {
  onEdit: (item: DiscDetails) => void;
  onDelete: (item: DiscDetails) => void;
  onSelectImage: (item: DiscDetails) => void;
};

const defaultColumns = ({
  onEdit,
  onDelete,
  onSelectImage,
}: DefaultColumnsProps) => {
  const columns = [
    columnHelper.accessor("name", {
      header: () => "Navn",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("slug", {
      header: () => "Slug",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("brand.name", {
      header: () => "Merke",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("type", {
      header: () => "Type",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("speed", {
      header: () => "Speed",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("glide", {
      header: () => "Glide",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("turn", {
      header: () => "Turn",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("fade", {
      header: () => "Fade",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("products", {
      header: () => "Produkter",
      cell: (info) => info.getValue()?.length || 0,
    }),
    columnHelper.accessor("products", {
      id: "price",
      header: () => "Minste pris",
      cell: (info) => {
        const value = info.getValue();

        if (value) {
          const products = [...value];
          const prices = products
            ?.map((product) => product.latestPrice)
            .filter((price) => price > 0);

          const lowest = Math.min(...prices);

          if (lowest === Infinity) {
            return "Ikke på lager";
          }

          return `${lowest} NOK`;
        }

        return "Ingen produkter";
      },
      sortingFn: (a, b) => {
        const aP = a.original.products
          ?.map((product) => product.latestPrice)
          .filter((price) => price > 0);
        const bP = b.original.products
          ?.map((product) => product.latestPrice)
          .filter((price) => price > 0);

        const A = Math.min(...(aP || [Infinity]));
        const B = Math.min(...(bP || [Infinity]));

        if (A === Infinity && B === Infinity) {
          return 0;
        }

        if (A === Infinity) {
          return -1;
        }

        if (B === Infinity) {
          return 1;
        }

        return A - B;
      },
    }),
    columnHelper.accessor("outOfProduction", {
      header: () => "I produksjon",
      enableSorting: true,
      cell: (info) => {
        const value = info.getValue();
        if (value) {
          return <Badge color="red">Nei</Badge>;
        }

        return <Badge color="emerald">Ja</Badge>;
      },
    }),
    columnHelper.accessor("id", {
      header: () => "Action",
      enableSorting: false,
      cell: (info) => (
        <div className="flex gap-3 items-center">
          <Button
            color="primary"
            size="sm"
            onClick={() => onEdit(info.row.original)}
          >
            Edit
          </Button>
          <Button
            color="primary"
            size="sm"
            onClick={() => onSelectImage(info.row.original)}
          >
            Velg bilde
          </Button>
          <Button
            color="danger"
            size="sm"
            onClick={() => onDelete(info.row.original)}
          >
            Delete
          </Button>
        </div>
      ),
    }),
  ];

  return columns;
};

const DashboardDiscsPage = () => {
  const { discs, mutations } = useDiscs();

  const [selectedDisc, setSelectedDisc] = useState<DiscDetails | undefined>();
  const [deleteDisc, setDeleteDisc] = useState<DiscDetails | undefined>();
  const [selectedImageDisc, setSelectedImageDisc] = useState<
    DiscDetails | undefined
  >();

  const onEdit = (item: DiscDetails) => {
    setSelectedDisc(item);
  };
  const onDelete = (item: DiscDetails) => {
    setDeleteDisc(item);
  };

  const onSelectImage = (item: DiscDetails) => {
    setSelectedImageDisc(item);
  };

  const columns = defaultColumns({ onEdit, onDelete, onSelectImage });

  return (
    <>
      <DashboardLayout className="bg-gray-100">
        <div>
          <Table title="Disker" data={discs} columns={columns} />
        </div>
      </DashboardLayout>

      <EditDiscDrawer
        show={selectedDisc !== undefined}
        onClose={() => setSelectedDisc(undefined)}
        defaultValues={selectedDisc}
      />

      <Drawer
        title="Delete disc"
        show={deleteDisc !== undefined}
        onClose={() => setDeleteDisc(undefined)}
      >
        <Button
          type="button"
          color="danger"
          onClick={async () => {
            if (deleteDisc) {
              await mutations.delete.mutateAsync(deleteDisc.slug);
              setDeleteDisc(undefined);
            }
          }}
          isLoading={mutations.delete.isLoading}
        >
          Slett
        </Button>
      </Drawer>

      <EditDiscImageDrawer
        show={selectedImageDisc !== undefined}
        onClose={() => setSelectedImageDisc(undefined)}
        defaultValues={selectedImageDisc}
      />
    </>
  );
};

export default DashboardDiscsPage;
