import { Brand } from "@prisma/client";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import config from "src/common/config";

const BASE_URL = `/api/brands`;

const fetchBrands = async () => {
  const resp = await axios.get<(Brand & { _count: { discs: number } })[]>(
    `${BASE_URL}`
  );

  return await resp.data;
};

const createBrand = async (record: Brand) => {
  const resp = await axios.post<Brand>(`${BASE_URL}`, record);

  return await resp.data;
};

const updateBrand = async ({
  record,
}: {
  record: Partial<Omit<Brand, "slug">> & { slug: string };
}) => {
  const resp = await axios.put<Brand>(`${BASE_URL}/${record.slug}`, record);

  return await resp.data;
};

export default function useBrands() {
  const queryClient = useQueryClient();

  const { data, ...rest } = useQuery(["brands"], fetchBrands);

  const createMutation = useMutation(createBrand, {
    onSuccess() {
      queryClient.invalidateQueries(["brands"]);
    },
  });

  const updateMutation = useMutation(updateBrand, {
    onSuccess() {
      queryClient.invalidateQueries(["brands"]);
    },
  });

  return {
    brands: data || [],

    ...rest,

    mutations: {
      create: createMutation,
      update: updateMutation,
    },
  };
}
