import "./Signup.css";
import { useState } from "react";
import { api } from "../../API/axios";
import { useNavigate } from "react-router-dom";

export const SignupPage = () => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    displayname: "",
    username: "",
    email: "",
    password: "",
    password_confirm: "",
  });

  const nav = useNavigate();

  const registerUser = async () => {
    const status = await api
      .post("/register", {
        displayname: user.displayname,
        username: user.username,
        email: user.email,
        password: user.password,
        first_name: user.first_name,
        last_name: user.last_name,
      })
      .then((r) => {
        console.log(r.data);
        return r.status;
      });
    console.log("Signup : " + status);
  };

  const submit = async () => {
    if (user.password !== user.password_confirm) {
      alert("Passwords do not match");
      return;
    }
    try {
      await registerUser();
      // alert("Registration successful! Please log in.");
      nav("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      // alert("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <div id="form">
        <div>
          <input
            type="text"
            onChange={(e) =>
              setUser((prev) => ({ ...prev, first_name: e.target.value }))
            }
            placeholder="First name"
          />
          <input
            type="text"
            onChange={(e) =>
              setUser((prev) => ({ ...prev, last_name: e.target.value }))
            }
            placeholder="Last name"
          />
        </div>
        <input
          type="text"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, displayname: e.target.value }))
          }
          placeholder="Displayname"
        />
        <input
          type="text"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, username: e.target.value }))
          }
          placeholder="Username"
        />
        <input
          type="text"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder="Email"
        />
        <input
          type="text"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, password: e.target.value }))
          }
          placeholder="Password"
        />
        <input
          type="text"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, password_confirm: e.target.value }))
          }
          placeholder="Repeat password"
        />
        <button onClick={submit}>Sign up</button>
        <a href="/login">Login</a>
      </div>
    </>
  );
};
