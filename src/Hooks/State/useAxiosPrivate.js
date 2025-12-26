import { apiPrivate } from "../../API/axios";
import { useEffect } from "react";
import useRefresh from "./useRefresh";
import { useAuth } from "../Context/useAuth";

const useAxiosPrivate = () => {
  const refresh = useRefresh();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = apiPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = apiPrivate.interceptors.request.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error.response.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return apiPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      apiPrivate.interceptors.request.eject(requestIntercept);
      apiPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return apiPrivate;
};

export default useAxiosPrivate;
