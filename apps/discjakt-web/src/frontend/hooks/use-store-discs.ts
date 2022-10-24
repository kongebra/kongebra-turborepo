import { Brand, Disc, Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const fetchData = async (
  storeId: number
): Promise<(Disc & { brand: Brand; products: Product[] })[]> => {
  const response = await fetch(`/api/stores/${storeId}/discs`);
  return await response.json();
};

export default function useStoreDiscs(storeId: number | undefined) {
  const { data, ...rest } = useQuery(
    ["store", "discs", storeId],
    () => fetchData(storeId!),
    {
      enabled: !!storeId,
    }
  );

  return {
    discs: data || [],

    ...rest,
  };
}
