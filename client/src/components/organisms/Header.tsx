import useAuth from "../../hooks/useAuth";

import { Link } from "react-router-dom";
import imgUrl from "../../assets/logo.svg";
import UserPanel from "../molecules/UserPanel";
import NavLinks from "../molecules/NavLinks";

const Header = () => {
  const { auth } = useAuth();

  return (
    <header className="flex items-center justify-between w-full max-h-16 min-h-16 px-14 py-4 shadow-sm sticky top-0 z-20 bg-white">
      <Link to="/" className="p-2">
        <img className="h-8" src={imgUrl} />
      </Link>
      <NavLinks />
      {auth?.user && <UserPanel />}
    </header>
  );
};

export default Header;
