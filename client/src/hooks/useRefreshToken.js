import axios from "axios";
import { useAuth, usePets } from "./useStore";

const BASE_URL = import.meta.env.DEV
  ? "http://localhost:5050"
  : "http://192.168.1.16:5050";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();
  const { setPets } = usePets();
  const refresh = async () => {
    const response = await axios.get("/api/auth/refresh", {
      baseURL: BASE_URL,
      withCredentials: true,
    });
    setAuth({
      ...auth,
      accessToken: response.data.accessToken,
      user: response.data.user,
    });
    setPets([...response.data.pets]);
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
