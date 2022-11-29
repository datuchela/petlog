import { z } from "zod";
import axios, { axiosPrivate } from "../axios";
import { asyncMethodWrapper } from "../asyncMethodWrapper";

const UserAuthentication = z.object({
  usernameOrEmail: z.union([z.string().email(), z.string()]),
  password: z.string(),
});

export type UserAuthenticationType = z.infer<typeof UserAuthentication>;

export const refreshToken = async () => {
  const response = await axios.get("/api/auth/refresh", {
    withCredentials: true,
  });
  return response.data;
};

// Log in / Authenticate
export const authenticate = asyncMethodWrapper(async (body: UserAuthenticationType) => {
  const parsedBody = UserAuthentication.parse(body);
  const response = await axiosPrivate.post("/api/auth", JSON.stringify(parsedBody));
  console.log("authenticate: ", response.data);
  return response.data;
});

// Log out
export const logout = async () => {
  const response = await axiosPrivate.get("/api/auth/logout");
  console.log("logout: ", response.data);
  return response.data;
};
