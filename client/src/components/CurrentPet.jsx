import { useEffect } from "react";
import { usePets, useCurrentPet } from "../hooks/useStore";

const CurrentPet = () => {
  const { pets } = usePets();
  const { currentPetId, setCurrentPetId } = useCurrentPet();

  const handleChange = (e) => {
    setCurrentPetId(e.target.value);
    localStorage.setItem("currentPetId", e.target.value);
  };

  useEffect(() => {
    if (!localStorage.getItem("currentPetId")) {
      pets[0] &&
        localStorage.setItem("currentPetId", pets[0]?.id) &&
        setCurrentPetId(pets[0]?.id);
    }
  }, [pets]); // this useEffect solves the undefined currentPetId issue

  return (
    <div className="rounded-lg overflow-hidden h-8 w-52 drop-shadow-lg">
      <select
        className="w-full h-full cursor-pointer outline-none px-2"
        onChange={handleChange}
        value={currentPetId}
        name="pets"
        id="pets"
      >
        {pets?.map((pet) => {
          return (
            <option key={pet.id} value={pet.id}>
              {pet.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CurrentPet;
