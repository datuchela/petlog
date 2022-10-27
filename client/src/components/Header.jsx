import { useAuth, usePets } from "../hooks/useStore";

import { Link } from "react-router-dom";
import CurrentPet from "./CurrentPet";
import imgUrl from "../assets/logo.svg";
import UserPanel from "./UserPanel";
import NavLinks from "./NavLinks";

const Header = () => {
  const auth = useAuth();
  // const pets = usePets();

  return (
    <header className="flex items-center justify-between w-full px-14 py-6 shadow sticky top-0">
      <Link to="/" className="p-2">
        <img className="h-8" src={imgUrl} />
      </Link>
      <NavLinks auth={auth} />
      {auth?.user && (
        <div className="flex items-center gap-8">
          {auth?.user?.pets[0] && <CurrentPet />}
          <UserPanel auth={auth} />
        </div>
      )}
    </header>
  );
};

export default Header;
