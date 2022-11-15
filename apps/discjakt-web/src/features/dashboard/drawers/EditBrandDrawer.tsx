import { Brand, Disc, Product } from "discjakt-db";
import Drawer from "src/frontend/components/Drawer";
import useBrands from "src/frontend/hooks/use-brands";
import useDiscs from "src/frontend/hooks/use-discs";
import useProducts from "src/frontend/hooks/use-products";
import React from "react";
import CreateDiscForm from "../forms/CreateDiscForm";
import EditDiscForm from "../forms/EditDiscForm";
import { DiscDetails } from "src/types/prisma";
import EditBrandForm from "../forms/EditBrandForm";

type Props = {
  show: boolean;
  onClose: () => void;

  defaultValues?: Brand;
};

const EditBrandDrawer: React.FC<Props> = ({ show, onClose, defaultValues }) => {
  const { mutations } = useBrands();

  const onSubmit = async (data: Brand) => {
    if (!defaultValues) {
      return;
    }

    const record = {
      ...data,
      name: data.name.trim(),
      description: data.description.trim(),

      slug: defaultValues.slug,
    };

    delete (record as any)._count;

    await mutations.update.mutateAsync({ record });

    onClose();
  };

  return (
    <Drawer
      title="Editer merke"
      show={show}
      onClose={onClose}
      size="xl"
      className="flex flex-col"
    >
      <EditBrandForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </Drawer>
  );
};

export default EditBrandDrawer;
