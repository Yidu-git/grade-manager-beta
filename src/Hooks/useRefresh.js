import { api } from "../API/axios";
import Cookies from "universal-cookie";
import { useAuth } from "../Context/useAuth";

const useRefresh = () => {
  const { auth, setAuth } = useAuth();
  const refresh = async () => {
    const response = await api.get("/refresh", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        token: `${auth.refresh_token || ""}`,
      },
    });
    setAuth((prev) => {
      // console.log("Refreshed Token : " + response.data);
      // console.log("Refresh User : " + JSON.stringify(prev.token));
      return { ...prev, token: response.data }; // token = accessToken
    });

    return response.data.token;
  };

  return refresh;
};

export default useRefresh;
