import { useQuery } from "react-query";
import { Outlet } from "react-router-dom";
import { getUser } from "../../api/methods";
import Loading from "../Loading";

// UI Components
import Header from "../organisms/Header";
import Sidebar from "../organisms/Sidebar";

const Layout = () => {
  const {
    isLoading,
    isError,
    error,
    data: userData,
  } = useQuery("user", getUser);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <div>Something went wrong...</div>
      ) : (
        <>
          <Header />
          <main className="flex flex-col w-full h-full bg-[#ffffff]">
            <div className="mt-20 flex flex-col items-center gap-8">
              <div>{JSON.stringify(userData)}</div>
              <Outlet />
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default Layout;
