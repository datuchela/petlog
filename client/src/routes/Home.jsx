import { useQuery, useMutation, useQueryClient } from "react-query";
import { getUser } from "../api/methods";

// UI Components
import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function Home() {
  const queryClient = useQueryClient();
  const { isLoading, isError, error, data: user } = useQuery("user", getUser);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <div>{isError ? error.message : JSON.stringify(user)}</div>
    </>
  );
}
