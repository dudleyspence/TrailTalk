import { useEffect, useState, createContext, useContext } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { fetchUserByFirebaseUID } from "../../api";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [userLoggedIn, setUserLoggedIn] = useState(() => {
    const storedUser = localStorage.getItem("userLoggedIn");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const firebaseUID = firebaseUser.uid;

        fetchUserByFirebaseUID(firebaseUID)
          .then((userData) => {
            if (userData && userData.data.user) {
              setUserLoggedIn(userData.data.user);
            } else {
              setUserLoggedIn(null);
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
            setUserLoggedIn(null);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setUserLoggedIn(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  function signOutUser() {
    signOut(auth)
      .then(() => {
        setUserLoggedIn(null);
        localStorage.removeItem("userLoggedIn");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  }

  const value = {
    userLoggedIn,
    setUserLoggedIn,
    signOutUser,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
