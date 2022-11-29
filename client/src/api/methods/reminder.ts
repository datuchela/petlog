import { z } from "zod";
import { axiosPrivate } from "../axios";
import { asyncMethodWrapper } from "../asyncMethodWrapper";
import { PetType } from "./pet";

const Reminder = z.object({
  id: z.number(),
  name: z.string(),
  upcoming: z.string(),
  intervalValue: z.number(),
  intervalType: z.number(),
  petId: z.number(),
  userId: z.number(),
});

const AddReminder = z.object({
  name: z.string(),
  upcoming: z.string(),
  intervalValue: z.number(),
  intervalType: z.number(),
  petId: z.number(),
});

export type ReminderType = z.infer<typeof Reminder> & { pets?: PetType[] };
export type AddReminderType = z.infer<typeof AddReminder>;

export const getReminders = async () => {
  const response = await axiosPrivate.get("/api/reminders");
  console.log("getReminders: ", response.data);
  return response.data;
};

export const getReminder = async (reminderId: number) => {
  const response = await axiosPrivate.get(`/api/reminders/${reminderId}`);
  console.log("getReminder: ", response.data);
  return response.data;
};

export const addReminder = asyncMethodWrapper(async (body: AddReminderType) => {
  const response = await axiosPrivate.post("/api/reminders", JSON.stringify(body));
  console.log("addReminder: ", response.data);
  return response.data;
});

export const deleteReminder = async (reminderId: number) => {
  const response = await axiosPrivate.delete(`/api/reminders/${reminderId}`);
  console.log("deleteReminder: ", response.data);
  return response.data;
};
