import { useQuery } from "react-query";
import { Outlet } from "react-router-dom";
import { getUser } from "../../api/methods";
import Loading from "../Loading";
import useAuth from "../../hooks/useAuth";

// UI Components
import Header from "../organisms/Header";
import { useEffect } from "react";
import StatusBar from "../organisms/StatusBar";

const Layout = () => {
  const { auth, setAuth } = useAuth();
  const { isLoading, isRefetching, isError, error, data } = useQuery(
    "user",
    getUser
  );

  useEffect(() => {
    setAuth({ ...auth, ...data });
  }, [data]);
  useEffect(() => {
    console.log("auth:", auth);
  }, [auth]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <div>{error.message}</div>
      ) : (
        <>
          <Header />
          <main className="flex flex-col w-full h-full bg-[#ffffff]">
            <div className="mt-20 flex flex-col items-center gap-8">
              <Outlet />
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default Layout;
