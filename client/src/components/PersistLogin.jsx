import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import { useAuth } from "../hooks/useStore";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import imgUrl from "../assets/logo.svg";

const LoadingPage = () => {
  return (
    <main className="flex items-center justify-center w-full h-[80vh]">
      <img className="h-32 animate-pulse" src={imgUrl} alt="logo" />
    </main>
  );
};

const PersistLogin = () => {
  const [loading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const axiosPrivate = useAxiosPrivate();
  const auth = useAuth();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  // useEffect(() => {
  //   let isMounted = true;
  //   const controller = new AbortController();

  //   const getUser = async () => {
  //     try {
  //       const response = await axiosPrivate.get("/api/users");
  //       console.log(response.data);
  //       if (response.data.status === 200) {
  //         auth.setAuth({ user: response?.data?.user });
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   isMounted && auth?.user && getUser();

  //   return () => {
  //     isMounted = false;
  //     controller.abort();
  //   };
  // }, []);

  return <>{loading ? <LoadingPage /> : <Outlet />}</>;
};

export default PersistLogin;
