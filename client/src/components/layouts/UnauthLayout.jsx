import { Outlet } from "react-router-dom";

// UI Components
import Header from "../organisms/Header";
// import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="flex w-full h-full">
        {/* <Sidebar /> */}
        <main className="w-full h-full bg-[#FDFDFD]">
          <div className="w-full h-full mt-20 flex flex-col items-center gap-8">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default Layout;
