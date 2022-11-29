import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Unauthenticated = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  return !auth?.user ? (
    <Outlet />
  ) : (
    <Navigate to={from} state={{ from: location }} replace />
  );
};

export default Unauthenticated;
