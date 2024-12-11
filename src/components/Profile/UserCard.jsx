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
import { CountUp } from "use-count-up";

export default function UserCard() {
  const { userLoggedIn } = useAuth();
  console.log(userLoggedIn);

  return (
    <div className="my-10 p-10 items-start justify-center flex gap-10 lg:flex-row flex-col bg-cyan-50 rounded-lg shadow-xl">
      <div className="flex flex-row gap-10">
        <Avatar
          variant="rounded"
          size="xxl"
          className="w-26 h-26 rounded"
          src={userLoggedIn.avatar_url}
          alt=""
        />
        <div className="flex flex-col">
          <Typography variant="h6" color="gray" className="mb-4 uppercase">
            {userLoggedIn.username}
          </Typography>
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {userLoggedIn.name}
          </Typography>
        </div>
      </div>

      <div className="flex flex-row gap-10">
        <div className="bg-purple-100 h-20 w-40 rounded-lg flex justify-center items-center shadow-xl">
          <Typography variant="h5" color="gray" className="text-center">
            <CountUp start={0} end={5} duration={3} isCounting /> Posts
          </Typography>
        </div>
        <div className="bg-blue-100 h-20 w-60 rounded-lg flex justify-center items-center shadow-xl">
          <Typography variant="h5" color="gray" className="text-center">
            Altitude: <CountUp start={0} end={20} duration={3} isCounting />{" "}
            Metres
          </Typography>
        </div>
      </div>
    </div>
  );
}
