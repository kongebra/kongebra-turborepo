import { Brand } from "@prisma/client";
import Button from "src/frontend/components/Button";
import CreateBrandModal from "src/features/dashboard/modals/CreateBrandModal";
import useBrands from "src/frontend/hooks/use-brands";
import DashboardLayout from "src/frontend/layout/DashboardLayout";
import { useSession } from "next-auth/react";
import Image from "next/future/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useBoolean } from "usehooks-ts";
import EditBrandDrawer from "src/features/dashboard/drawers/EditBrandDrawer";

const DashboardBrandsPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  const { brands, isLoading } = useBrands();

  const createModal = useBoolean();
  const editModal = useBoolean();

  const [selectedBrand, setSelectedBrand] = useState<Brand | undefined>();

  const render = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    const sortBrand = (a: Brand, b: Brand) => {
      if (a.name > b.name) {
        return 1;
      }

      if (a.name < b.name) {
        return -1;
      }

      return 0;
    };

    return (
      <div>
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-4xl font-bold mb-3">Brands</h1>

          <Button onClick={createModal.setTrue}>Lag nytt brand</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          {brands
            .sort((a, b) => b._count.discs - a._count.discs)
            .map((brand) => (
              <div key={brand.id} className="bg-slate-100 p-3 rounded">
                <div className="flex gap-3">
                  <div>
                    <Image
                      className="rounded max-w-full h-auto"
                      src={brand.imageUrl ? brand.imageUrl : "/placeholder.png"}
                      alt={brand.name}
                      width={128}
                      height={128}
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">{brand.name}</h2>
                      <p>Discs: {(brand as any)._count.discs}</p>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedBrand(brand);
                          editModal.setTrue();
                        }}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  };

  if (status === "loading") {
    return <div>loading...</div>;
  }

  if (session?.user.role?.toLowerCase() !== "admin") {
    return (
      <div>
        <p>no authorized</p>
      </div>
    );
  }

  return (
    <>
      <DashboardLayout>{render()}</DashboardLayout>

      <CreateBrandModal
        show={createModal.value}
        onClose={createModal.setFalse}
      />

      <EditBrandDrawer
        defaultValues={selectedBrand}
        show={editModal.value}
        onClose={() => {
          editModal.setFalse();
          setSelectedBrand(undefined);
        }}
      />
    </>
  );
};

export default DashboardBrandsPage;
