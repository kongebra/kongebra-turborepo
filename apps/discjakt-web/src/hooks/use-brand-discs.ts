import { useQuery } from "@tanstack/react-query";
import config from "src/config";
import { DiscDetails } from "src/types/prisma";

const fetchData = (slug: string) => async () => {
  const response = await fetch(`${config.baseUrl}/api/brands/${slug}/discs`);
  const data = (await response.json()) as DiscDetails[];

  return data;
};

export default function useBrandDiscs(slug: string | undefined) {
  const { data, ...rest } = useQuery(
    ["brand", "discs", slug],
    fetchData(slug!),
    {
      enabled: !!slug,
    }
  );

  return {
    discs: data || [],

    ...rest,
  };
}
