import { useMemo, useState } from "react";
import { DiscDetails } from "src/types/prisma";
import { SelectOption } from "../components/Select";

type SortValue =
  | "name"
  | "speed"
  | "!speed"
  | "glide"
  | "!glide"
  | "turn"
  | "!turn"
  | "fade"
  | "!fade"
  | string;

type SimplifiedDiscType = Pick<
  DiscDetails,
  "speed" | "glide" | "turn" | "fade" | "name"
>;

export default function useSortDiscs(defaultValue: string = "name") {
  const [sort, setSort] = useState<SortValue>(defaultValue);

  const selectOptions: SelectOption[] = [
    {
      value: "updatedAt",
      label: "Sist oppdatert",
    },
    {
      value: "name",
      label: "Navn - stigende",
    },
    {
      value: "!name",
      label: "Navn - synkende",
    },
    {
      value: "speed",
      label: "Speed lav-høy",
    },
    {
      value: "!speed",
      label: "Speed høy-lav",
    },
    {
      value: "glide",
      label: "Glide lav-høy",
    },
    {
      value: "!glide",
      label: "Glide høy-lav",
    },
    {
      value: "turn",
      label: "Turn lav-høy",
    },
    {
      value: "!turn",
      label: "Turn høy-lav",
    },
    {
      value: "fade",
      label: "Fade lav-høy",
    },
    {
      value: "!fade",
      label: "Fade høy-lav",
    },
  ];

  const sortFn = useMemo<
    (a: SimplifiedDiscType, b: SimplifiedDiscType) => number
  >(() => {
    switch (sort) {
      case "speed":
        return (a, b) => a.speed - b.speed;
      case "!speed":
        return (a, b) => b.speed - a.speed;

      case "glide":
        return (a, b) => a.glide - b.glide;
      case "!glide":
        return (a, b) => b.glide - a.glide;

      case "turn":
        return (a, b) => a.turn - b.turn;
      case "!turn":
        return (a, b) => b.turn - a.turn;

      case "fade":
        return (a, b) => a.fade - b.fade;
      case "!fade":
        return (a, b) => b.fade - a.fade;

      case "!name":
        return (a, b) => b.name.localeCompare(a.name);
      case "name":
      default:
        return (a, b) => a.name.localeCompare(b.name);
    }
  }, [sort]);

  return { sort, setSort, sortFn, selectOptions };
}
