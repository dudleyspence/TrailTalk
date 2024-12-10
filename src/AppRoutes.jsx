import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/mainPage/MainPage";
import NewArticlePage from "./pages/newArticlePage/NewArticlePage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import ArticlePage from "./pages/articlePage/ArticlePage";
import LoginPage from "./pages/loginPage/LoginPage";
import SignUpPage from "./pages/signUpPage/SignUpPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/topics/:topic" element={<MainPage />} />
      <Route path="/addarticle" element={<NewArticlePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/article/:article_id" element={<ArticlePage />} />
      <Route path="*" element={"/"} />
    </Routes>
  );
}
