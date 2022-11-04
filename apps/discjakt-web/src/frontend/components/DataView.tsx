import clsx from "clsx";
import React, { useState } from "react";
import { FaBars, FaGripHorizontal } from "react-icons/fa";
import Button from "./Button";
import Select, { SelectOption } from "./Select";

export type DataViewLayout = "grid" | "list";

export type DataViewProps<T extends object> = {
  items: T[];

  layout?: DataViewLayout;

  renderItem: (item: T, layout?: DataViewLayout) => React.ReactNode;

  sort?: {
    options: SelectOption[];
    value: string;
    setValue: (value: string) => void;
  };

  itemKey?: (item: T) => string | number;
};

const DataView = <T extends object>({
  items,
  layout: initialLayout = "grid",
  renderItem,

  sort,

  itemKey,
}: DataViewProps<T>) => {
  const [layout, setLayout] = useState(initialLayout);

  return (
    <div>
      <div
        className="flex items-center justify-between
       p-4"
      >
        <div>
          {sort ? (
            <Select
              options={sort.options}
              value={sort.value}
              onChange={(e) => sort.setValue(e.currentTarget.value)}
            />
          ) : null}
        </div>

        <div>
          <Button
            className="rounded-r-none"
            color={layout === "list" ? "primary" : "secondary"}
            onClick={() => setLayout("list")}
          >
            <FaBars />
          </Button>
          <Button
            className="rounded-l-none"
            color={layout === "grid" ? "primary" : "secondary"}
            onClick={() => setLayout("grid")}
          >
            <FaGripHorizontal />
          </Button>
        </div>
      </div>

      <div
        className={clsx("grid gap-4 p-4", {
          "grid-cols-4": layout === "grid",
          "grid-cols-1": layout === "list",
        })}
      >
        {items.map((item, index) => (
          <React.Fragment key={itemKey ? itemKey(item) : index}>
            {renderItem(item, layout)}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default DataView;
