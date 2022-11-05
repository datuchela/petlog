import useAuth from "../../hooks/useAuth";

import { Link } from "react-router-dom";
import imgUrl from "../../assets/logo.svg";
import UserPanel from "../UserPanel";
import NavLinks from "../molecules/NavLinks";

const Header = () => {
  const { auth } = useAuth();
  console.log(auth.user);

  return (
    <header className="flex items-center justify-between w-full max-h-16 min-h-16 px-14 py-4 shadow-sm sticky top-0 z-20 bg-white">
      <Link to="/" className="p-2">
        <img className="h-8" src={imgUrl} />
      </Link>
      <NavLinks />
      {auth?.user && (
        // <div className="flex items-center gap-8">
        <UserPanel />
        // </div>
      )}
    </header>
  );
};

export default Header;
