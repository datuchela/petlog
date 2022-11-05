import { useQuery } from "react-query";
import { getPets } from "../../api/methods";

// UI Components
import PetButton from "../atoms/PetButton";

const PetList = () => {
  const { isLoading, isError, error, data } = useQuery("pets", getPets);

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>{error?.message?.response?.data}</div>;
  }

  return (
    <div>
      Pet List:
      {data?.pets?.map((pet) => {
        return <PetButton key={pet.id} pet={pet} />;
      })}
    </div>
  );
};

export default PetList;
