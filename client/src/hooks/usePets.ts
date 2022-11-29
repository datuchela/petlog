import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPets } from "../api/methods/pet";
import PetsContext from "../context/PetsProvider";

const usePets = () => {
  const { pets, setPets } = useContext(PetsContext);
  const query = useQuery(["pets"], getPets, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setPets([...data.pets]);
    },
  });
  return { pets, setPets, ...query };
};

export default usePets;
