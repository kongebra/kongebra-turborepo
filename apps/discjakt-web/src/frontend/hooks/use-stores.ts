import { Store } from "discjakt-db";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import config from "src/common/config";

const BASE_URL = `/api/stores`;

const fetchStores = async () => {
  const resp = await axios.get<Store[]>(`${BASE_URL}`);

  return resp.data;
};

export default function useStores() {
  const { data, ...rest } = useQuery(["stores"], fetchStores);

  return {
    stores: data || [],

    ...rest,
  };
}
