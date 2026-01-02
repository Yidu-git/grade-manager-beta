import { useAuth } from "../Context/useAuth";
import useAxios from "./useAxios";

const useLogin = () => {
  const { auth, setAuth } = useAuth();
  const api = useAxios();

  const login = async (user) => {
    try {
      console.log(user);
      const response = await api.post("/login", {
        identifier: user.identifier,
        password: user.password,
      });
      await setAuth({
        token: response.data.token,
        refresh_token: response.data.refresh_token,
        user: response.data.user,
      });
      console.log(response);
      console.log(auth);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return login;
};

export default useLogin;
