import create from "zustand";

const useStore = create((set) => ({
  auth: {
    accessToken: null,
    user: null,
  },
  setAuth: (data) =>
    set((state) => ({
      auth: { ...data },
    })),
  pets: [],
  setPets: (data) =>
    set((state) => ({
      pets: [...data],
    })),

  currentPet: {
    currentPetId: localStorage.getItem("currentPetId") || "",
    setCurrentPetId: (id) =>
      set((state) => ({
        currentPet: { ...state.currentPet, currentPetId: id },
      })),
  },
}));

export default useStore;

export const useAuth = () =>
  useStore((state) => ({
    auth: state.auth,
    setAuth: state.setAuth,
  }));

export const usePets = () =>
  useStore((state) => ({
    pets: state.pets,
    setPets: state.setPets,
  }));
export const useCurrentPet = () => useStore((state) => state.currentPet);
