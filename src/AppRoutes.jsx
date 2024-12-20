import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import NewArticlePage from "./pages/NewArticlePage/NewArticlePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ArticlePage from "./pages/ArticlePage/ArticlePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import EditProfile from "./pages/EditProfile/EditProfile";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/topics/:topic" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/article/:article_id" element={<ArticlePage />} />

      {/* Protected Routes */}
      <Route
        path="/addarticle"
        element={
          <ProtectedRoute>
            <NewArticlePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-profile"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<MainPage />} />
    </Routes>
  );
}
