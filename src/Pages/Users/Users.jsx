import "./Users.css";
import { useState, useEffect } from "react";
import { useAuth } from "../../Hooks/Context/useAuth.jsx";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../Hooks/State/useAxiosPrivate";

export const UsersPage = () => {
  const { auth } = useAuth();
  const [users, setUsers] = useState([]);
  const [refreshState, setRefreshState] = useState(false);
  const api = useAxiosPrivate();

  if (!auth.user) {
    return (
      <div>
        <h1>Users Page</h1>
        <p>You must be logged in to view this page.</p>
        <Link to="/login">Login</Link>
      </div>
    );
  }

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await api
          .get("/users/all/10", {
            signal: controller.signal,
          })
          .then((res) => {
            return res;
          });
        setUsers(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error while fetching users:", error);
      }
    };

    getUsers();

    // return () => {
    //   isMounted = false;
    //   controller.abort();
    // };
  }, [refreshState]);

  return (
    <div>
      <h1>Users Page</h1>
      <h2>Welcome{auth?.user ? " " + auth?.user?.displayname : ""}!</h2>
      <p>Looking for other users?</p>
      <Link to="/">Home</Link>
      <div className="users-container">
        {users?.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="user-card">
              <img
                src={`https://testingbot.com/free-online-tools/random-avatar/200?img=${Math.floor(
                  Math.random() * 10
                )}`}
                alt=""
              />
              <div>
                <h3>{user.displayname}</h3>
                <div>
                  <p>{user.username}</p>
                  <p>{user.email}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No users to display yet!</p>
        )}
      </div>
      <button
        onClick={() => {
          setRefreshState((prev) => !prev);
        }}
      >
        Refresh
      </button>
    </div>
  );
};
