import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import NewArticlePage from "./pages/NewArticlePage/NewArticlePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ArticlePage from "./pages/ArticlePage/ArticlePage";
import LoginPage from "./pages/LoginPage/LoginPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/topics/:topic" element={<MainPage />} />
      <Route path="/addarticle" element={<NewArticlePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/article/:article_id" element={<ArticlePage />} />
      <Route path="*" element={"/"} />
    </Routes>
  );
}
