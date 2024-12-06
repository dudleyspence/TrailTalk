import { useEffect, useState, createContext, useContext } from "react";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [userLoggedIn, setUserLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        setUserLoggedIn(false);
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  }

  const value = {
    userLoggedIn,
    setUserLoggedIn,
    handleSignOut,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
