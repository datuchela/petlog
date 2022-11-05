import useAuth from "../hooks/useAuth";

const Home = () => {
  const { auth } = useAuth();
  return (
    <>
      <div>hello, {auth.user.username}</div>
      <div>
        <h2>Your pets:</h2>
        <ul>
          {auth.pets?.map((pet) => {
            return <li key={pet.id}>{pet.name}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default Home;
