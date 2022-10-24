import { DiscDetails } from "src/types/prisma";

export const serializeDisc = (disc: DiscDetails) => {
  return JSON.parse(JSON.stringify(disc)) as DiscDetails;
};
