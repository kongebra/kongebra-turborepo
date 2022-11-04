import { Plastic } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchData = async () => {
  const resp = await fetch("/api/plastics");
  return (await resp.json()) as Plastic[];
};

const createPlasticRequest = async (record: Plastic) => {
  const resp = await fetch("/api/plastics", {
    method: "POST",
    body: JSON.stringify(record),
  });

  return (await resp.json()) as Plastic;
};

export default function usePlastics() {
  const queryClient = useQueryClient();

  const { data: plastics, ...rest } = useQuery(["plastics"], fetchData, {
    initialData: [],
  });

  const createPlastic = useMutation(createPlasticRequest, {
    onSuccess() {
      queryClient.invalidateQueries(["plastics"]);
    },
  });

  return {
    plastics,

    ...rest,

    mutations: {
      create: createPlastic,
    },
  };
}
