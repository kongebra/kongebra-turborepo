import { Product, ProductPrice } from "discjakt-db";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import config from "src/common/config";

const BASE_URL = `/api/products`;

export type ProductDetails = Product & {
  prices: ProductPrice[];
};

const fetchProducts = async () => {
  const resp = await axios.get<ProductDetails[]>(BASE_URL);
  return resp.data;
};

const updateProduct = async ({
  record,
  mass,
}: {
  record: Product;
  mass?: boolean;
}) => {
  const resp = await axios.put<Product>(`${BASE_URL}/${record.id}`, record);
  return resp.data;
};

type UseProductsProps = {
  enabled?: boolean;
};

export default function useProducts(
  { enabled }: UseProductsProps = { enabled: true }
) {
  const queryClient = useQueryClient();

  const { data, ...rest } = useQuery<ProductDetails[]>(
    ["products"],
    fetchProducts,
    { enabled: enabled }
  );

  const updateMutation = useMutation(updateProduct, {
    onSuccess(resp, args) {
      queryClient.invalidateQueries(["products"]);

      if (
        (resp && resp.discId) ||
        (resp.isDisc === false && args.mass !== true)
      ) {
        queryClient.invalidateQueries(["data-cleaning"]);
      }
    },
  });

  return {
    products: data || [],

    ...rest,

    mutations: {
      update: updateMutation,
    },
  };
}
