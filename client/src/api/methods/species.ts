import { z } from "zod";
import { axiosPrivate } from "../axios";

const Species = z.object({
  id: z.union([z.number(), z.string()]),
  name: z.string(),
  emoji: z.string(),
});

export type SpeciesType = z.infer<typeof Species>;

export const getSpecies = async () => {
  const response = await axiosPrivate.get("/api/species");
  console.log("getSpecies: ", response.data);
  return response.data;
};
