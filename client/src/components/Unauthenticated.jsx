import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useStore";

const Unauthenticated = () => {
  const { auth } = useAuth();
  const location = useLocation();
  return !auth?.user ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default Unauthenticated;
