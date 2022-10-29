import { useEffect } from "react";
import { useAuth } from "../hooks/useStore";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

// UI Components
import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function Pets() {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  //   useEffect(() => {
  //     let isMounted = true;
  //     const controller = new AbortController();

  //     const getUser = async () => {
  //       try {
  //         const response = await axiosPrivate.get("/api/users");
  //         console.log(response.data);
  //         if (response.data.status === 200) {
  //           setAuth((prev) => {
  //             return { ...prev, user: response?.data?.user };
  //           });
  //         }
  //       } catch (err) {
  //         console.error(err);
  //       }
  //     };

  //     isMounted && getUser();

  //     return () => {
  //       isMounted = false;
  //       controller.abort();
  //     };
  //   }, []);

  return <>Pets</>;
}
