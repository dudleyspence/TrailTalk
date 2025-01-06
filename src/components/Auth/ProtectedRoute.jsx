import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { userLoggedIn } = useAuth();

  if (!userLoggedIn) {
    console.log("You are not logged in");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
