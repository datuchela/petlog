import { Outlet } from "react-router-dom";

// UI Components
import Header from "../organisms/Header";
import Sidebar from "../organisms/Sidebar";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="flex items-start h-full">
        <Sidebar />
        <main className="flex-[8] flex flex-col w-full h-full bg-[#ffffff]">
          <div className="mt-20 flex flex-col items-center gap-8">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default Layout;
