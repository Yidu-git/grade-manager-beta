import { useContext, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { useRefresh } from "../../Hooks/Context/useRefresh";
import { useAuth } from "../../Hooks/Context/useAuth";

export const Home = () => {
  const { refreshToken, setRefreshToken } = useRefresh();
  const { auth } = useAuth();
  // const refreshToken = "";
  console.log("Home : " + auth);
  return (
    <>
      <div>
        <h1>Welcome{auth.user ? " " + auth.user?.displayname : ""}!</h1>
        <Link to="/login">Login</Link>
        <br />
        <Link to="/users">Other users</Link>
        <br />
        <Link to="/notes">notes</Link>
      </div>
    </>
  );
};
