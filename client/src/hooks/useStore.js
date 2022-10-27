import create from "zustand";

const useStore = create((set) => ({
  auth: {
    accessToken: null,
    user: null,
    setAuth: (data) =>
      set((state) => ({
        auth: { ...state.auth, ...data },
      })),
  },
  currentPet: {
    currentPetId:
      localStorage.getItem("currentPetId") || auth.user?.pets[0]?.id,
    setCurrentPetId: (id) =>
      set((state) => ({
        currentPet: { ...state.currentPet, currentPetId: id },
      })),
  },
}));

export default useStore;

export const useAuth = () => useStore((state) => state.auth);
export const usePets = () => useStore((state) => state.pets);
export const useCurrentPet = () => useStore((state) => state.currentPet);
