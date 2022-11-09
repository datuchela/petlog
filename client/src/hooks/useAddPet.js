import { useQueryClient, useMutation } from "react-query";

import { addPet } from "../api/methods";

const useAddPet = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(addPet, {
    onSuccess: (data) => {
      console.log("onSuccess");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      console.log("done");
    },
  });

  const add = async (body) => {
    return mutation.mutate(body);
  };

  return { add, mutation };
};

export default useAddPet;
