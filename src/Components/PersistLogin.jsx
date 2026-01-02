import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefresh from "../Hooks/useRefresh";
import { useAuth } from "../Context/useAuth";
import Cookies from "universal-cookie";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefresh();
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        setAuth(JSON.parse(cookies.get(auth)));
        await refresh();
      } catch (error) {
        console.error("PersistLogin: Error verifying refresh token", error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.token ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  useEffect(() => {
    console.log(`Is loading? ${isLoading}`);
    console.log(`Is loading? ${JSON.stringify(auth?.token)}`);
  }, [isLoading]);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
