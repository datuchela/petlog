import { useContext } from "react";
import { useQuery } from "react-query";
import { getPets } from "../api/methods";
import PetsContext from "../context/PetsProvider";

const usePets = () => {
  const { pets, setPets } = useContext(PetsContext);
  const query = useQuery("pets", getPets, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setPets([...data.pets]);
    },
  });
  return { pets, setPets, ...query };
};

export default usePets;
