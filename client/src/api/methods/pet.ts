import { z } from "zod";
import { axiosPrivate } from "../axios";
import { asyncMethodWrapper } from "../asyncMethodWrapper";
import { ReminderType } from "./reminder";

const Pet = z.object({
  id: z.number(),
  name: z.string(),
  gender: z.string(),
  birthday: z.string(),
  ownerId: z.number(),
  speciesId: z.number(),
});

const AddPet = z.object({
  name: z.string(),
  gender: z.string(),
  birthday: z.string(),
  speciesId: z.number().or(z.string()),
});

export type PetType = z.infer<typeof Pet> & { reminders?: ReminderType[] };
export type AddPetType = z.infer<typeof AddPet>;

export const getPet = async (petId: number) => {
  const response = await axiosPrivate.get(`/api/pets/${petId}`);
  console.log("getPet: ", response.data);
  return response.data;
};

export const getPets = async () => {
  const response = await axiosPrivate.get("/api/pets");
  console.log("getPets: ", response.data);
  return response.data;
};

export const addPet = asyncMethodWrapper(async (body: AddPetType) => {
  const parsedBody = AddPet.parse(body);
  const response = await axiosPrivate.post("/api/pets", JSON.stringify(parsedBody));
  console.log("addPet: ", response.data);
  return response.data;
});

export const deletePet = async (petId: number) => {
  const response = await axiosPrivate.delete(`/api/pets/${petId}`);
  console.log("deletePet: ", response.data);
  return response.data;
};
