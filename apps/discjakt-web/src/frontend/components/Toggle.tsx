import { Switch } from "@headlessui/react";
import clsx from "clsx";
import React, { useState } from "react";

type ToggleSize = "sm" | "md" | "lg";

type Props = {
  defaultValue?: boolean;

  onChange?: (value: boolean) => void;

  size?: ToggleSize;
};

type ToggleSizeClasses = Record<ToggleSize, string>;
const toggleSizeClasses: ToggleSizeClasses = {
  sm: "w-6 h-3",
  md: "w-10 h-5",
  lg: "w-16 h-8",
};

const ballSizeClasses: ToggleSizeClasses = {
  sm: "w-3 h-3",
  md: "w-5 h-5",
  lg: "w-8 h-8",
};
const ballTransitionClasses: ToggleSizeClasses = {
  sm: "translate-x-3",
  md: "translate-x-5",
  lg: "translate-x-8",
};

const Toggle = ({ defaultValue = false, onChange, size = "md" }: Props) => {
  const [enabled, setEnabled] = useState(defaultValue);

  return (
    <Switch
      checked={enabled}
      onChange={(value: boolean) => {
        onChange?.(value);
        setEnabled(value);
      }}
      className={clsx(
        "inline-flex shrink-0 justify-start box-content cursor-pointer rounded-full p-1 transition-color",
        toggleSizeClasses[size],
        {
          "bg-teal-500": enabled,
          "bg-gray-300": !enabled,
        }
      )}
    >
      <span className="sr-only">Use setting</span>

      <span
        aria-hidden="true"
        className={clsx(
          "bg-white rounded-full transition-transform",
          ballSizeClasses[size],
          enabled && ballTransitionClasses[size]
        )}
      />
    </Switch>
  );
};

export default Toggle;
