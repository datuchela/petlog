import { useState, createContext, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import create from "zustand";

const PetsContext = createContext({});

export const PetsProvider = ({ children }) => {
  const { auth } = useAuth();
  const [pets, setPets] = useState([]);
  const [currentPetId, setCurrentPetId] = useState(
    localStorage.getItem("currentPetId") || auth?.user?.pets[0]?.id
  );

  const useStore = create((set) => ({
    pets: [],
    currentPetId: localStorage.getItem("currentPetId"),
    setPets: () => set((state) => ({ count: state.count + 1 })),
  }));

  useEffect(() => {
    if (!currentPetId || currentPetId === "undefined") {
      localStorage.setItem("currentPetId", auth?.user?.pets[0]?.id);
      setCurrentPetId(localStorage.getItem("currentPetId"));
    }
  }, [auth]);

  return (
    <PetsContext.Provider
      value={{ get: { pets, currentPetId }, set: { pets, currentPetId } }}
    >
      {children}
    </PetsContext.Provider>
  );
};

export default PetsContext;
