import { axiosPrivate } from "../api/methods";
import useAuth from "./useAuth";

const useLogOut = () => {
  const { auth, setAuth } = useAuth();

  const logOut = async () => {
    setAuth({ user: null, accessToken: null });
    try {
      const response = await axiosPrivate.get("/api/auth/logout");
      console.log(response.data); // LOGGING PURPOSES
    } catch (err) {
      console.error(err);
    }
  };

  return logOut;
};

export default useLogOut;
