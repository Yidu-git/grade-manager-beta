import { Routes, Route } from "react-router-dom";
import { useState, useContext } from "react";
import LoginPage from "./Pages/Login/Login";
import SignupPage from "./Pages/Signup/Signup";
import { Home } from "./Pages/Home/Home";
import { AuthContext } from "./Context/useAuth.jsx";
import UsersPage from "./Pages/Users/Users.jsx";
import NotesPage from "./Pages/Notes/Notes.jsx";
import PersistLogin from "./Components/PersistLogin.jsx";

function App() {
  // const [auth, setAuth] = useContext(AuthContext);
  return (
    // <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* <Route element={<PersistLogin />}> */}
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/notes" element={<NotesPage />} />
      {/* </Route> */}
      {/* Catch all */}
      <Route path="*" element={<h1> 404 Not found</h1>} />
    </Routes>
    // </Router>
  );
}

export default App;
