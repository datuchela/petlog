import useAuth from "../hooks/useAuth";

// UI Components
import Link from "../components/atoms/Link";

const HomePage = () => {
  const { auth } = useAuth();
  return (
    <>
      <div>hello, {auth.user.username}</div>
      <div>
        <h2>Your pets:</h2>
        <ul>
          {auth.pets?.map((pet) => {
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
