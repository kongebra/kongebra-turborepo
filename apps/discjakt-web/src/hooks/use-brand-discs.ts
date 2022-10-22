import { useQuery } from "@tanstack/react-query";
import config from "src/config";
import { DiscDetails } from "src/types/prisma";

const fetchData = (slug: string, type?: string) => async () => {
  const response = await fetch(
    `/api/brands/${slug}/discs${type ? `?type=${type}` : ""}`
  );
  const data = (await response.json()) as DiscDetails[];

  return data;
};

type UseBrandDiscsProps = {
  slug?: string;
  type?: string;
};

export default function useBrandDiscs({ slug, type }: UseBrandDiscsProps) {
  const { data, ...rest } = useQuery(
    ["brand", "discs", { slug, type }],
    fetchData(slug!, type),
    {
      enabled: !!slug,
    }
  );

  return {
    discs: data || [],

    ...rest,
  };
}
