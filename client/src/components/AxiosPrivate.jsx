import { Outlet } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const AxiosPrivate = () => {
  const axiosPrivate = useAxiosPrivate();

  return (
    <>
      <Outlet />
    </>
  );
};

export default AxiosPrivate;
