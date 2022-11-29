import { createContext, useState } from "react";
import { PetType } from "../api/methods/pet";

type TypePetsContext = {
  pets: PetType[] | null | undefined;
  setPets: React.Dispatch<React.SetStateAction<PetType[]>>;
};

const PetsContext = createContext<TypePetsContext>({
  pets: [],
  setPets: () => undefined,
});

type Props = {
  children: React.ReactNode;
};

export const PetsProvider: React.FC<Props> = ({ children }) => {
  const [pets, setPets] = useState<PetType[]>([]);
  return <PetsContext.Provider value={{ pets, setPets }}>{children}</PetsContext.Provider>;
};

export default PetsContext;
