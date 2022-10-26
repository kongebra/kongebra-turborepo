import { Disc, Product } from "@prisma/client";
import Drawer from "src/frontend/components/Drawer";
import useBrands from "src/frontend/hooks/use-brands";
import useDiscs from "src/frontend/hooks/use-discs";
import useProducts from "src/frontend/hooks/use-products";
import React from "react";
import CreateDiscForm from "../forms/CreateDiscForm";
import EditDiscForm from "../forms/EditDiscForm";
import { DiscDetails } from "src/types/prisma";

type Props = {
  show: boolean;
  onClose: () => void;

  defaultValues?: DiscDetails;
};

const EditDiscDrawer: React.FC<Props> = ({ show, onClose, defaultValues }) => {
  const { brands } = useBrands();
  const { mutations } = useDiscs();

  const onSubmit = async (data: Disc) => {
    if (!defaultValues) {
      return;
    }

    const record = {
      ...data,
      name: data.name.trim(),
      description: data.description.trim(),
      
      speed: Number(data.speed),
      glide: Number(data.glide),
      turn: Number(data.turn),
      fade: Number(data.fade),

      brandId: Number(data.brandId),
    };

    delete (record as any).products;
    delete (record as any).brand;
    delete (record as any).lowestPrice;

    await mutations.update.mutateAsync({ slug: defaultValues?.slug, record });

    onClose();
  };

  return (
    <Drawer
      title="Editer  disc"
      show={show}
      onClose={onClose}
      size="lg"
      className="flex flex-col"
    >
      <EditDiscForm
        brands={brands}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
      />
    </Drawer>
  );
};

export default EditDiscDrawer;
