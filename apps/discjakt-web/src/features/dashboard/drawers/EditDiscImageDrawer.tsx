import { Disc } from "discjakt-db";
import clsx from "clsx";
import React from "react";
import { Drawer, LoadingPage } from "src/frontend/components";
import { useDiscs } from "src/frontend/hooks";
import { DiscDetails, productDetailsSelect } from "src/types/prisma";
import Image from "next/image";

type Props = {
  show: boolean;
  onClose: () => void;

  defaultValues?: DiscDetails;
};

const EditDiscImageDrawer: React.FC<Props> = ({
  show,
  onClose,
  defaultValues,
}) => {
  const { mutations } = useDiscs();

  console.log({ defaultValues });

  const onSubmit = async (data: Disc) => {
    if (!defaultValues) {
      return;
    }

    const record = {
      ...data,
      name: data.name.trim(),
      description: data.description.trim(),
    };

    delete (record as any).products;
    delete (record as any).brand;
    delete (record as any).lowestPrice;

    await mutations.update.mutateAsync({ slug: defaultValues?.slug, record });

    onClose();
  };

  const onSelectImage = async (imageUrl: string) => {
    await mutations.update.mutateAsync({
      slug: defaultValues?.slug!,
      record: {
        imageUrl,
      },
    });

    onClose();
  };

  return (
    <Drawer
      title="Velg disc bilde"
      show={show}
      onClose={onClose}
      size="full"
      className="flex flex-col"
    >
      {mutations.update.isLoading ? (
        <LoadingPage />
      ) : (
        <div className="grid grid-cols-6 gap-8">
          {defaultValues?.products.map((product) => (
            <button
              key={product.id}
              className={clsx(
                "relative bg-white rounded-md border-4 mb-4 transition p-2 cursor-pointer",
                "hover:ring-4",
                {
                  "border-green-500":
                    defaultValues.imageUrl === product.imageUrl,
                }
              )}
              onClick={() => {
                if (!mutations.update.isLoading) {
                  onSelectImage(product.imageUrl);
                }
              }}
            >
              <Image
                unoptimized
                src={product.imageUrl}
                alt={product.title}
                className={clsx(
                  "max-w-full h-auto aspect-square object-contain rounded",
                  {
                    "opacity-5": mutations.update.isLoading,
                  }
                )}
              />
            </button>
          ))}
        </div>
      )}
    </Drawer>
  );
};

export default EditDiscImageDrawer;
