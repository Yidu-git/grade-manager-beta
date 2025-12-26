import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { api } from "../../API/axios.js";
import Cookies from "universal-cookie";
import { useRefresh } from "../../Hooks/Context/useRefresh.jsx";

import "../Signup/Signup.css";
import "./Login.css";
import { useAuth } from "../../Hooks/Context/useAuth.jsx";

export const LoginPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();

  const { refreshToken, setRefreshToken } = useRefresh();
  const { auth, setAuth } = useAuth();

  const submit = async () => {
    const status = await api
      .post("/login", {
        identifier: identifier,
        password: password,
      })
      .then((r) => {
        setRefreshToken(r.data.refresh_token);
        setRefreshToken(r.data.refresh_token);
        setAuth((prev) => {
          return { user: r.data.user, token: r.data.token };
        });
        setAuth({
          user: r.data.user,
          token: r.data.token,
          refresh_token: r.data.refresh_token,
        });
        // setRefreshToken("s");
        console.log(r.data);
        return r.status;
      });
    console.log("Login : " + status);
    nav("/");
  };

  return (
    <>
      <div id="form">
        <input
          type="text"
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="Username"
        />
        <input
          type="text"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit" onClick={submit}>
          Login
        </button>
        <Link to="/"></Link>
        <Link to="/signup">Signup</Link>
      </div>
    </>
  );
};
