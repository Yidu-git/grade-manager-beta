import { useContext, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { useRefresh } from "../../Context/useRefresh";
import { useAuth } from "../../Context/useAuth";
import useLogout from "../../Hooks/useLogout";

export const Home = () => {
  const { refreshToken, setRefreshToken } = useRefresh();
  const { auth } = useAuth();
  const logout = useLogout();
  // const refreshToken = "";

  if (!auth.user) {
    return (
      <>
        <div>
          <h1>Welcome!</h1>
          <p>Please log in or signup to continue</p>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <h2>Welcome {auth.user?.displayname}!</h2>
        <br />
        <Link to="/users">Other users</Link>
        <br />
        <Link to="/notes">notes</Link>
        <br />
        <Link to="/login">
          logout
          <button onClick={logout}>Logout</button>
        </Link>
      </div>
    </>
  );
};
