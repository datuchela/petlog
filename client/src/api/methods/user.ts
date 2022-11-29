import { z } from "zod";
import { axiosPrivate } from "../axios";
import { asyncMethodWrapper } from "../asyncMethodWrapper";

const UserRegistration = z
  .object({
    username: z.string(),
    email: z.string(),
    password: z.string(),
    repeatPassword: z.string(),
  })
  .superRefine(({ password, repeatPassword }, ctx) => {
    if (password !== repeatPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords did not match",
      });
    }
  });

export type UserRegistrationType = z.infer<typeof UserRegistration>;

// Add user / Register
export const addUser = asyncMethodWrapper(async (body: UserRegistrationType) => {
  const parsedBody = UserRegistration.parse(body);
  const response = await axiosPrivate.post("/api/users", JSON.stringify(parsedBody));
  console.log("addUser: ", response.data);
  return response.data;
});

// Get user
export const getUser = async () => {
  const response = await axiosPrivate.get("/api/users");
  console.log("getUser: ", response.data);
  return response.data;
};
