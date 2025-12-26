import { Routes, Route } from "react-router-dom";
import { useState, useContext } from "react";
import { LoginPage } from "./Pages/Login/Login";
import { SignupPage } from "./Pages/Signup/Signup";
import { Home } from "./Pages/Home/Home";
import { AuthContext } from "./Hooks/Context/useAuth.jsx";
import { UsersPage } from "./Pages/Users/Users.jsx";
import { NotesPage } from "./Pages/Notes/Notes.jsx";

function App() {
  // const [auth, setAuth] = useContext(AuthContext);
  return (
    // <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/notes" element={<NotesPage />} />
    </Routes>
    // </Router>
  );
}

export default App;
