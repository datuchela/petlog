import { useQueryClient, useMutation } from "react-query";
import useAuth from "./useAuth";

import { authenticate } from "../api/methods";

const useAuthenticate = () => {
  const queryClient = useQueryClient();
  const { setAuth } = useAuth();

  const mutation = useMutation(authenticate, {
    onSuccess: (data) => {
      queryClient.setQueryData("auth", data);
      setAuth((prev) => ({ ...prev, ...data }));
    },
  });

  const logIn = async (body) => {
    return mutation.mutate(body);
  };

  return { logIn, mutation };
};

export default useAuthenticate;
