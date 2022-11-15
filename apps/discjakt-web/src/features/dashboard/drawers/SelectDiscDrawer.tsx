import { Product } from "discjakt-db";
import Autocomplete from "src/frontend/components/Autocomplete";
import Button from "src/frontend/components/Button";
import Drawer from "src/frontend/components/Drawer";
import useDiscs from "src/frontend/hooks/use-discs";
import useProducts from "src/frontend/hooks/use-products";
import React, { useMemo, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { DiscDetails } from "src/types/prisma";

type Props = {
  show: boolean;
  onClose: () => void;

  defaultValues?: Product;
};

const SelectDiscDrawer: React.FC<Props> = ({
  show,
  onClose,
  defaultValues,
}) => {
  const { discs } = useDiscs();
  const {
    mutations: { update: updateProduct },
  } = useProducts({ enabled: false });

  const [selectedDisc, setSelectedDisc] = useState<DiscDetails | undefined>();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce(value, 200);

  const filteredDiscs = useMemo(() => {
    if (value) {
      return discs.filter(
        (x) =>
          x.name.toLowerCase().includes(value.toLowerCase()) ||
          x.brand.name.toLowerCase().includes(value.toLowerCase())
      );
    }

    return discs;
  }, [discs, value]);

  const onSubmit = async () => {
    if (defaultValues && selectedDisc) {
      await updateProduct.mutateAsync({
        record: {
          ...defaultValues,
          discId: selectedDisc.id,
        },
      });

      onClose();
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return (
    <Drawer
      title="Velg en disc"
      show={show}
      onClose={onClose}
      size="sm"
      className="flex flex-col justify-between"
    >
      <Autocomplete<DiscDetails>
        items={filteredDiscs}
        onChange={handleOnChange}
        getItemKey={(item) => item.id}
        getDisplayValue={(item?) => {
          if (item) {
            return `${item?.name} (${item?.brand?.name})`;
          }

          return "";
        }}
        onItemSelected={setSelectedDisc}
        autoFocus={true}
      />

      <div>
        <Button onClick={onSubmit}>Lagre</Button>
      </div>
    </Drawer>
  );
};

export default SelectDiscDrawer;
