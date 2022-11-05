import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getPet } from "../api/methods";

//UI Components
import Link from "../components/atoms/Link";

const Pet = () => {
  const { petId } = useParams();
  const { isLoading, isError, error, data } = useQuery(["pets", petId], () =>
    getPet(petId)
  );

  return (
    <div className="flex flex-col gap-4">
      <div>{data ? JSON.stringify(data) : "no data"}</div>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Pet;
