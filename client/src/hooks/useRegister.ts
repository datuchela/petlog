import { useQueryClient, useMutation } from "@tanstack/react-query";
import useAuth from "./useAuth";

import { addUser, UserRegistrationType } from "../api/methods/user";

const useRegister = () => {
  const queryClient = useQueryClient();
  const { setAuth } = useAuth();

  const mutation = useMutation(addUser, {
    onSuccess: (data) => {
      queryClient.setQueryData(["auth"], data);
      setAuth((prev) => ({ ...prev, ...data }));
    },
  });

  const register = async (body: UserRegistrationType) => {
    return mutation.mutate(body);
  };

  return { register, mutation };
};

export default useRegister;
