import { useAuth } from "../Context/useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const useLogout = () => {
  const { setAuth } = useAuth();
  const api = useAxiosPrivate();

  const logout = async () => {
    setAuth({});
    try {
      api.delete("/logout");
    } catch (error) {
      console.error(error);
    }
  };

  return logout;
};

export default useLogout;
