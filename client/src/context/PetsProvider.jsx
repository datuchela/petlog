import { createContext, useState } from "react";

const PetsContext = createContext({});

export const PetsProvider = ({ children }) => {
  const [pets, setPets] = useState({});
  return (
    <PetsContext.Provider value={{ pets, setPets }}>
      {children}
    </PetsContext.Provider>
  );
};

export default PetsContext;
