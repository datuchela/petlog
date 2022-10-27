import axios from "axios";
import { useAuth } from "./useStore";

const BASE_URL = import.meta.env.DEV
  ? "http://localhost:5050"
  : "http://192.168.1.16:5050";

const useRefreshToken = () => {
  const auth = useAuth();
  const refresh = async () => {
    const response = await axios.get("/api/auth/refresh", {
      baseURL: BASE_URL,
      withCredentials: true,
    });

    const data = {
      accessToken: response.data.accessToken,
      user: response.data.user,
    };

    return auth.setAuth(data);
  };

  return refresh;
};

export default useRefreshToken;
