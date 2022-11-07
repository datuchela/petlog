import { useQueryClient, useMutation } from "react-query";
import useAuth from "./useAuth";

import { addUser } from "../api/methods";

const useRegister = () => {
  const queryClient = useQueryClient();
  const { setAuth } = useAuth();

  const mutation = useMutation(addUser, {
    onSuccess: (data) => {
      queryClient.setQueryData("auth", data);
      setAuth((prev) => ({ ...prev, ...data }));
    },
  });

  const register = async (body) => {
    return mutation.mutate(body);
  };

  return { register, mutation };
};

export default useRegister;
