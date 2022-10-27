import { useAuth, useCurrentPet } from "../hooks/useStore";

const CurrentPet = () => {
  const auth = useAuth();
  const { currentPetId, setCurrentPetId } = useCurrentPet();

  const handleChange = (e) => {
    setCurrentPetId(e.target.value);
    localStorage.setItem("currentPetId", e.target.value);
  };

  return (
    <div className="rounded-lg overflow-hidden h-8 w-52 drop-shadow-lg">
      <select
        className="w-full h-full cursor-pointer outline-none px-2"
        onChange={handleChange}
        value={currentPetId}
        name="pets"
        id="pets"
      >
        {auth?.user.pets?.map((pet) => {
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
