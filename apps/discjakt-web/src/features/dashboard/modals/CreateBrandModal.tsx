import { Brand, Disc, Product } from "discjakt-db";
import Modal from "src/frontend/components/Modal";
import useBrands from "src/frontend/hooks/use-brands";
import React from "react";
import CreateBrandForm from "../forms/CreateBrandForm";

type Props = {
  show: boolean;
  onClose: () => void;

  defaultValues?: Brand;
};

const CreateBrandModal: React.FC<Props> = ({
  show,
  onClose,
  defaultValues,
}) => {
  const { brands, mutations } = useBrands();

  const onSubmit = async (data: Brand) => {
    await mutations.create.mutateAsync(data);

    onClose();
  };

  return (
    <Modal title="Lag nytt merke" show={show} onClose={onClose} size="3xl">
      <CreateBrandForm
        brands={brands}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
};

export default CreateBrandModal;
