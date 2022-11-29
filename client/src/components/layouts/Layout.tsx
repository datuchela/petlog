import { Outlet } from "react-router-dom";

// UI Components
import Header from "../organisms/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="flex flex-col w-full h-full bg-[#ffffff]">
        <div className="mt-20 flex flex-col items-center gap-8">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
