import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import NewArticlePage from "./pages/NewArticlePage/NewArticlePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ArticlePage from "./pages/ArticlePage/ArticlePage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/topic/:topic_id" element={<MainPage />} />
      <Route path="/addarticle" element={<NewArticlePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/article/:article_id" element={<ArticlePage />} />
      <Route path="*" element={"/"} />
    </Routes>
  );
}
