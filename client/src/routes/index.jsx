import useAuth from "../hooks/useAuth";
import usePets from "../hooks/usePets";

// UI Components
import Link from "../components/atoms/Link";

const HomePage = () => {
  const { auth } = useAuth();
  const { isLoading, pets } = usePets();

  return (
    <>
      <div>hello, {auth?.user?.username}</div>
      <div>
        <h2>Your pets:</h2>
        {isLoading ? (
          "loading..."
        ) : (
          <ul>
            {pets?.map((pet) => {
              return (
                <li key={pet.id}>
                  <Link to={`/pet/${pet.id}`}>{pet.name}</Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default HomePage;
