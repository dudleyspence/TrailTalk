import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { LoginModalProvider } from "./context/LoginModelContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <LoginModalProvider>
        <App />
      </LoginModalProvider>
    </AuthProvider>
  </BrowserRouter>
);
