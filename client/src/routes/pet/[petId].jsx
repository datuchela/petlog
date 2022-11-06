import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getPet } from "../../api/methods";

//UI Components
import Link from "../../components/atoms/Link";

const PetPage = () => {
  const { petId } = useParams();
  const { isLoading, isError, error, data } = useQuery(["pets", petId], () =>
    getPet(petId)
  );

  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>{error?.message}</div>
      ) : (
        <div>{JSON.stringify(data)}</div>
      )}
    </div>
  );
};

export default PetPage;
