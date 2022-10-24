import clsx from "clsx";
import React from "react";

type BadgeColor =
  | "teal"
  | "red"
  | "sky"
  | "lime"
  | "amber"
  | "green"
  | "emerald";

type Props = React.PropsWithChildren<{
  color?: BadgeColor;
}>;

type BadgeColorClasses = Record<BadgeColor, string>;
const badgeColorClasses: BadgeColorClasses = {
  teal: "bg-teal-500 text-white",
  red: "bg-red-500 text-white",
  sky: "bg-sky-500 text-white",
  lime: "bg-lime-500 text-white",
  amber: "bg-amber-500 text-white",
  green: "bg-green-500 text-white",
  emerald: "bg-emerald-500 text-white",
};

const Badge: React.FC<Props> = ({ color = "teal", children }) => {
  return (
    <span
      className={clsx(
        "inline-block whitespace-nowrap align-middle px-1 uppercase text-xs rounded-sm font-bold",
        badgeColorClasses[color]
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
