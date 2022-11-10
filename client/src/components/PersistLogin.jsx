import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

// custom hooks
// import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

// UI Components
import Loading from "./Loading";

const PersistLogin = () => {
  // const axiosPrivate = useAxiosPrivate(); // calling this here, so it can wrap around all the routes, so they have access to it.

  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();
  const refresh = useRefreshToken();

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

  return <>{loading ? <Loading /> : <Outlet />}</>;
};

export default PersistLogin;
