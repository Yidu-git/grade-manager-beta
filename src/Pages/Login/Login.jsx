import "./Login.css";
import { useState } from "react";
import { useAuth } from "../../Context/useAuth";
import useLogin from "../../Hooks/useLogin";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { auth } = useAuth();
  const login = useLogin();
  const [user, setUser] = useState({
    identifier: "",
    username: "",
    email: "",
    password: "",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();

  const handleSubmit = () => {
    setIsLoading(true);
    try {
      const res = login(user);
      nav("/");
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="input">
        <label>Username or email</label>
        <input
          type="text"
          placeholder="Username/email"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, identifier: e.target.value }))
          }
          required
        />
      </div>
      <div className="input">
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, password: e.target.value }))
          }
          required
        />
      </div>
      <div className="switch-container switch-small">
        <input
          type="checkbox"
          id="remmember"
          onChange={(e) => console.log("switch" + e.target.checked)}
        />
        <label htmlFor="remmember" className="switch"></label>
        <p>Remember this device</p>
      </div>
      <div>
        <button onClick={handleSubmit}>
          {isLoading ? "Loging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
