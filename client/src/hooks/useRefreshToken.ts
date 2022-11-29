import { refreshToken } from "../api/methods/auth";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const { refetch, data, isLoading, isError, error } = useQuery(["auth"], refreshToken, {
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
    onSuccess: (data) => setAuth((prev) => ({ ...prev, ...data })),
  });

  const refresh = async () => {
    console.log("refreshing token...");
    await refetch();
    return {
      newAccessToken: data?.accessToken,
      isLoading: isLoading,
      isError: isError,
      error: error,
    };
  };

  return refresh;
};

export default useRefreshToken;
