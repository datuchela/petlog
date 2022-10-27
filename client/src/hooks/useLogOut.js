import { axiosPrivate } from "../configs/axios";
import { useAuth } from "./useStore";

const useLogOut = () => {
  const auth = useAuth();

  const logOut = async () => {
    auth.setAuth({ user: null, accessToken: null });
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
