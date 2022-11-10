import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getPet as getPetMethod,
  addPet as addPetMethod,
  deletePet as deletePetMethod,
} from "../api/methods";

const usePet = () => {
  const getPet = (petId) => {
    const query = useQuery(["pet", petId], () => getPetMethod(petId));
    return query;
  };
  const addPet = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation(addPetMethod, {
      onSuccess: (data) => {
        queryClient.invalidateQueries("pets");
        return data;
      },
    });

    return mutation;
  };

  const deletePet = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation(deletePetMethod, {
      onSuccess: (data) => {
        queryClient.invalidateQueries("pets");
        console.log(data);
        return data;
      },
    });

    return mutation;
  };

  return { getPet, addPet, deletePet };
};

export default usePet;
