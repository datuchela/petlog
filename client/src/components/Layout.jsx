import { Outlet } from "react-router-dom";

// UI Components
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center w-full h-full">
        <div className="mt-20 flex flex-col items-center gap-8">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
