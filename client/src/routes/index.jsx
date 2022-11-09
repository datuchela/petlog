import { useQuery } from "react-query";
import { getUser } from "../api/methods";

// UI Components
import Link from "../components/atoms/Link";

const HomePage = () => {
  const { isLoading, isError, error, data } = useQuery("user", getUser);

  if (isLoading) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }

  return (
    <>
      <div>hello, {data?.user?.username}</div>
      <div>
        <h2>Your pets:</h2>
        <ul>
          {data?.pets?.map((pet) => {
            return (
              <li key={pet.id}>
                <Link to={`/pet/${pet.id}`}>{pet.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default HomePage;
