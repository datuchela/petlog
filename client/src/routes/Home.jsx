import { useEffect } from "react";
import { useQuery } from "react-query";
import { getPets } from "../api/methods";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Home = () => {
  const axiosPrivate = useAxiosPrivate();

  const { isLoading, isError, error, data } = useQuery("pets", getPets);

  // useEffect(() => {
  //   let isMount = true;
  //   const controller = new AbortController();
  //   async function getPets() {
  //     try {
  //       const response = await axiosPrivate.get("/api/pets");
  //       console.log(response.data);
  //     } catch (error) {
  //       console.log(error);
  //       controller.abort();
  //     }
  //   }

  //   isMount && getPets();

  //   return () => {
  //     isMount = false;
  //     controller.abort();
  //   };
  // }, []);

  return (
    <>
      <div>hello</div>
    </>
  );
};

export default Home;
