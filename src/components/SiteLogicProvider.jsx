import { useState, useContext, useEffect } from "react";
import Login from "./Login";
import ArticlesList from "./ArticlesList";
import { Routes, Route } from "react-router-dom";
import SingleArticle from "./SingleArticle";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import AddArticle from "./AddArticle";

export default function SiteLogicProvider() {
  const { userLoggedIn, setUserLoggedIn } = useContext(UserContext);
  const [isNotLoading, setIsNotLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("userLoggedIn");
    if (storedUser) {
      setUserLoggedIn(JSON.parse(storedUser));
    }
    setIsNotLoading(true);
  }, []);

  useEffect(() => {
    if (userLoggedIn) {
      localStorage.setItem("userLoggedIn", JSON.stringify(userLoggedIn));
    } else {
      localStorage.removeItem("userLoggedIn");
    }
  }, [userLoggedIn]);

  return isNotLoading ? (
    <Routes>
      {/* login in page */}
      <Route
        path="/login"
        element={userLoggedIn ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/"
        element={userLoggedIn ? <ArticlesList /> : <Navigate to="/login" />}
      />

      <Route
        path="/addarticle"
        element={userLoggedIn ? <AddArticle /> : <Navigate to="/login" />}
      />
      <Route
        path="/profile"
        element={userLoggedIn ? <ProfilePage /> : <Navigate to="/login" />}
      />

      <Route
        path="/topics/:topic"
        element={userLoggedIn ? <ArticlesList /> : <Navigate to="/login" />}
      />
      <Route
        path="/article/:article_id"
        element={userLoggedIn ? <SingleArticle /> : <Navigate to="/login" />}
      />
      <Route
        path="*"
        element={<Navigate to={userLoggedIn ? "/" : "/login"} />}
      />
    </Routes>
  ) : (
    <div>Page Loading...</div>
  );
}
