import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const linkStyle = "font-medium text-gray-600 hover:text-gray-900 px-2 py-4";

const NavLinks = () => {
  const { auth } = useAuth();
  if (!auth?.user) {
    return (
      <div className="flex items-center gap-6">
        <Link to="/login" className={linkStyle}>
          Login
        </Link>
        <Link to="/register" className={linkStyle}>
          Register
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6">
      <Link to="/add/pet" className={linkStyle}>
        🐰 Add Pet
      </Link>
      {/* <Link to="/search" className={linkStyle}>
        Search Pet
      </Link> */}
      <Link to="/add/reminder" className={linkStyle}>
        📅 Add Reminder
      </Link>
    </div>
  );
};

export default NavLinks;
