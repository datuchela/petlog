import { useQueryClient, useMutation } from "@tanstack/react-query";
import useAuth from "./useAuth";

import { authenticate } from "../api/methods/auth";

const useAuthenticate = () => {
  const queryClient = useQueryClient();
  const { setAuth } = useAuth();

  const mutation = useMutation(authenticate, {
    onSuccess: (data) => {
      queryClient.setQueryData(["auth"], data);
      setAuth((prev) => ({ ...prev, ...data }));
    },
  });

  const logIn = async (body: { usernameOrEmail: String; password: String }) => {
    return mutation.mutate(body);
  };

  return { logIn, mutation };
};

export default useAuthenticate;
