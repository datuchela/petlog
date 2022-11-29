import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    // console.log("mounting interceptors..."); // MOUNTED LOG
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (request) => {
        console.log("sending request with interceptors");
        if (request.headers && !request.headers["Authorization"]) {
          request.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return request;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => {
        console.log("received response with interceptors");
        return response;
      },
      async (error) => {
        console.log("error: ", error.response);
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          const { newAccessToken, isError, error: refreshTokenError } = await refresh();
          if (isError) {
            if (error?.response?.data?.logOut) window.location.reload();
          }
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          prevRequest.sent = true;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      // console.log("unmounting interceptors..."); // UNMOUNTED LOG
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  useEffect(() => {
    console.count("useAxiosPrivate rerenders");
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
