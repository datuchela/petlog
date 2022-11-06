import axios from "axios";
import useAuth from "./useAuth";
import useLogOut from "./useLogOut";

const BASE_URL = import.meta.env.DEV
  ? "http://localhost:5050"
  : "http://192.168.1.16:5050";

const useRefreshToken = () => {
  const logOut = useLogOut();
  const { auth, setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get("/api/auth/refresh", {
      baseURL: BASE_URL,
      withCredentials: true,
    });

    if (response.status !== 200) {
      return null;
    }
    setAuth({
      ...auth,
      accessToken: response.data.accessToken,
      user: response.data.user,
    });
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
