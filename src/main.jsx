import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { RefreshTokenProvider } from "./Hooks/Context/useRefresh.jsx";
import { AuthProvider } from "./Hooks/Context/useAuth.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RefreshTokenProvider>
          <App />
        </RefreshTokenProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
