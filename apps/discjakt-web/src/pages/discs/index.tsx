import Container from "src/frontend/components/Container";
import React, { useMemo, useState } from "react";
import DataView from "src/frontend/components/DataView";
import { Disc } from "@prisma/client";
import { NextPage } from "next";
import { SimpleProduct } from "src/frontend/components";
import { prisma } from "src/common/lib/prisma";
import { useSortDiscs } from "src/frontend/hooks";
import DiscMultiFilter, {
  DiscMultiFilterValue,
} from "src/frontend/components/DiscMultiFilter";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchData = async (
  value?: DiscMultiFilterValue & {
    pageIndex: number;
    sortBy: string;
    desc: string;
  }
) => {
  const response = await axios.get("/api/discs/mega-filter", {
    params: { ...value, pageSize: 20 },
  });

  return response.data;
};

const DiscsPage: NextPage = () => {
  const { sort, setSort, selectOptions } = useSortDiscs("updatedAt");

  const [multiFilter, setMultiFilter] = useState<DiscMultiFilterValue>();

  const { data, isLoading } = useQuery(
    ["disc", multiFilter],
    () => fetchData({ ...(multiFilter as any), sortBy: sort }),
    {
      keepPreviousData: true,
    }
  );

  return (
    <Container>
      <div className="grid grid-cols-5">
        <div className="">
          <DiscMultiFilter onChange={setMultiFilter} />
        </div>

        <div className="col-span-4">
          <DataView
            items={data?.items || []}
            // TODO: Lag en list item komponent
            renderItem={(item, layout) =>
              layout === "grid" ? (
                <SimpleProduct disc={item as any} />
              ) : (
                <div></div>
              )
            }
            sort={{
              options: selectOptions,
              value: sort,
              setValue: setSort,
            }}
            itemKey={(item) => (item as any).id}
          />
        </div>
      </div>
    </Container>
  );
};

export default DiscsPage;
