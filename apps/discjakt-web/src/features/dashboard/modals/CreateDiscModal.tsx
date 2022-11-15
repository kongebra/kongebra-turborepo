import { Disc, Product } from "discjakt-db";
import Modal from "src/frontend/components/Modal";
import useBrands from "src/frontend/hooks/use-brands";
import useDiscs from "src/frontend/hooks/use-discs";
import useProducts from "src/frontend/hooks/use-products";
import React from "react";
import CreateDiscForm from "../forms/CreateDiscForm";

type Props = {
  show: boolean;
  onClose: () => void;

  defaultValues?: Product;
};

const CreateDiscModal: React.FC<Props> = ({ show, onClose, defaultValues }) => {
  const { brands } = useBrands();
  const {
    mutations: { create: createDisc },
  } = useDiscs();
  const {
    mutations: { update: updateProduct },
  } = useProducts({ enabled: false });

  const onSubmit = async (data: Disc) => {
    const disc = await createDisc.mutateAsync(data);

    if (defaultValues && disc) {
      await updateProduct.mutateAsync({
        record: {
          ...defaultValues,
          discId: disc.id,
        },
      });
    }

    onClose();
  };

  return (
    <Modal title="Lag ny disc" show={show} onClose={onClose} size="3xl">
      <CreateDiscForm
        brands={brands}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
};

export default CreateDiscModal;
