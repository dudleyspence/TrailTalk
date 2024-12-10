import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Avatar,
} from "@material-tailwind/react";
import { useAuth } from "../../context/AuthContext";

export default function UserCard() {
  const { userLoggedIn } = useAuth();
  console.log(userLoggedIn);

  return (
    <div className="w-full py-10 flex gap-10 flex-row">
      <Avatar
        variant="rounded"
        size="xxl"
        className="w-26 h-26 rounded"
        src={userLoggedIn.avatar_url}
        alt=""
      />
      <div className="flex flex-col">
        <h1>{userLoggedIn.name}</h1>
        <h2>{userLoggedIn.username}</h2>
      </div>
    </div>
  );
}
