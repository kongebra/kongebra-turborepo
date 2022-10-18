import { Product } from "@prisma/client";
import { DiscDetails } from "src/types/prisma";

export const findMatch = (product: Product, discs: DiscDetails[]) => {
  const titleWords = product.title.toLowerCase().split(" ");

  const extraCheck = (value: string) => {
    if (
      product.title.toLowerCase().includes(value.toLowerCase()) &&
      !titleWords.includes(value)
    ) {
      titleWords.push(value);
    }
  };

  if (
    (titleWords.includes("kc") || titleWords.includes("yeti")) &&
    titleWords.includes("pro")
  ) {
    const index = titleWords.findIndex((word) => word === "pro");
    if (index !== -1) {
      titleWords.splice(index, 1);
    }
  }

  if (titleWords.includes("air") && titleWords.includes("force")) {
    const index = titleWords.findIndex((word) => word === "force");
    if (index !== -1) {
      titleWords.splice(index, 1);
    }
  }

  if (titleWords.includes("cloudbreaker")) {
    const index = titleWords.findIndex((word) => word === "cloudbreaker");
    if (index !== -1) {
      titleWords.splice(index, 1);
    }

    titleWords.push(...["cloud", "breaker"]);
  }

  extraCheck("v2");
  extraCheck("swan");
  extraCheck("banger");
  extraCheck("ringer");
  extraCheck("pa");

  return discs
    .filter((disc) => {
      const discNameWords = disc.name.toLowerCase().split(" ");

      const customRules = [
        "ss",
        "z",
        "os",
        "us",
        "gt",
        "sockibomb",
        "model",
        "d",
        "p",
        "m",
        "x",
      ];
      for (const customRule of customRules) {
        if (
          titleWords.includes(customRule) &&
          discNameWords.includes(customRule)
        ) {
          // ['challenger', 'ss'] && [['avenger', 'ss'], ['nuke', 'ss']]
          return titleWords
            .filter((word) => word !== customRule)
            .some((word) =>
              discNameWords
                .filter((discNameWord) => discNameWord !== customRule)
                .includes(word)
            );
        }
      }

      const buzzzLikeRules = [
        "buzzz",
        "reko",
        "grym",
        "raptor",
        "kaxe",
        "rhyno",
        "challenger",
        "soft",
        "nuke",
        "surge",
        "crank",
      ];
      for (const rule of buzzzLikeRules) {
        if (titleWords.includes(rule) && discNameWords.includes(rule)) {
          const buzzzVersion = discNameWords.filter((x) => x !== rule);
          if (buzzzVersion.length) {
            if (titleWords.some((word) => buzzzVersion.includes(word))) {
              return true;
            } else {
              return false;
            }
          }
        }
      }

      // Example: "saint pro" vs "saint"
      if (discNameWords.includes("pro") && !titleWords.includes("pro")) {
        return false;
      }

      // buzzz ss
      if (titleWords.includes("ss") && !discNameWords.includes("ss")) {
        return false;
      }

      // buzzz os
      if (titleWords.includes("os") && !discNameWords.includes("os")) {
        return false;
      }

      return titleWords.some((word) => discNameWords.includes(word));
    })
    .sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }

      if (a.name < b.name) {
        return -1;
      }

      return 0;
    });
};
