import { Brand } from "@prisma/client";
import Button from "src/frontend/components/Button";
import FormInput from "src/frontend/components/FormInput";
import FormTextarea from "src/frontend/components/FormTextarea";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import FormError from "src/frontend/components/FormError";
import FormLabel from "src/frontend/components/FormLabel";
import Input from "src/frontend/components/Input";

type Props = {
  defaultValues?: Brand;

  onSubmit: (data: Brand) => void;
  onCancel: () => void;
};

const EditBrandForm: React.FC<Props> = ({
  defaultValues,
  onCancel,
  onSubmit,
}) => {
  const form = useForm<Brand>({ defaultValues });

  const generateSlug = () => {
    const name = form
      .getValues("name")
      .toLowerCase()
      .split(" ")
      .join("-")
      .replace("'", "");

    form.setValue("slug", name);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormInput
        label="Navn"
        {...form.register("name", {
          required: "Feltet er påkrevd",
        })}
      />

      <div className="flex flex-col mb-3">
        <FormLabel>Slug</FormLabel>

        <div className="flex">
          <Input
            {...form.register("slug", { required: "Feltet er påkrevd" })}
            className={clsx("rounded-r-none", {
              "ring-2 ring-red-600":
                form.formState.errors.slug?.message !== undefined,
            })}
          />

          <Button className="rounded-l-none" onClick={generateSlug}>
            Generate
          </Button>
        </div>

        <FormError>{form.formState.errors.slug?.message}</FormError>
      </div>

      <FormTextarea
        label="Beskrivelse"
        {...form.register("description")}
        rows={3}
      />

      <FormInput label="Bilde" {...form.register("imageUrl")} />

      <FormInput label="Hjemmeside" {...form.register("url")} />

      <div className="flex justify-between pt-3">
        <Button
          type="button"
          variant="outline"
          color="secondary"
          onClick={onCancel}
        >
          Avbryt
        </Button>

        <Button type="submit">Lagre</Button>
      </div>
    </form>
  );
};

export default EditBrandForm;
