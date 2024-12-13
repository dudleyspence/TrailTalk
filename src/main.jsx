import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { LoginModalProvider } from "./context/LoginModelContext.jsx";
import { HelpModalProvider } from "./context/HelpModelContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <HelpModalProvider>
      <AuthProvider>
        <LoginModalProvider>
          <App />
        </LoginModalProvider>
      </AuthProvider>
    </HelpModalProvider>
  </BrowserRouter>
);
