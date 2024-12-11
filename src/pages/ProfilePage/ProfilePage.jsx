import React from "react";
import UserCard from "../../components/Profile/UserCard";
import ArticleList from "../../components/ArticleList/ArticleList";
import { useAuth } from "../../context/AuthContext";

export default function ProfilePage() {
  const { userLoggedIn } = useAuth();

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <UserCard />
      <ArticleList firebaseUID={userLoggedIn.firebase_uid} />
    </div>
  );
}
