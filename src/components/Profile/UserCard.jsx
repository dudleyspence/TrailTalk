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
import mountainWidget from "../../assets/mountain-widget.png";
import { useStats } from "../../hooks/useStats";

export default function UserCard() {
  const { userLoggedIn } = useAuth();
  const { totalPosts, totalVotes } = useStats();

  console.log(typeof totalPosts);

  return (
    <div className="my-10 p-5 items-start lg:items-center justify-center flex gap-10 lg:gap-20 lg:flex-row flex-col bg-cyan-50 rounded-lg">
      <div className="flex flex-row items-center gap-10">
        <Avatar
          variant="rounded"
          size="lg"
          className="w-20 h-20 rounded"
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

      <div className="flex flex-col sm:flex-row gap-10 justify-center items-center w-full ">
        <div className="bg-cyan-900 h-20 w-60 sm:w-44 rounded-lg flex flex-row justify-center items-center shadow-xl gap-4">
          <svg
            className="h-7 w-7 fill-white"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-labelledby="penToSquareTitle"
          >
            <title id="penToSquareTitle">Pen to Square</title>
            <path d="M7.263 19.051l-1.656 5.797c-0.030 0.102-0.048 0.22-0.048 0.342 0 0.691 0.559 1.251 1.25 1.252h0c0.126-0 0.248-0.019 0.363-0.053l-0.009 0.002 5.622-1.656c0.206-0.063 0.383-0.17 0.527-0.311l-0 0 17.568-17.394c0.229-0.227 0.371-0.541 0.371-0.889 0-0.345-0.14-0.657-0.365-0.883l-4.141-4.142c-0.227-0.226-0.539-0.366-0.885-0.366s-0.658 0.14-0.885 0.366v0l-17.394 17.394c-0.146 0.146-0.256 0.329-0.316 0.532l-0.002 0.009zM25.859 3.768l2.369 2.369-2.369 2.346-2.37-2.345zM9.578 20.049l12.144-12.144 2.361 2.336-12.307 12.184-3.141 0.924zM30 12.75c-0.69 0-1.25 0.56-1.25 1.25v14.75h-25.5v-25.5h14.75c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0h-16c-0.69 0-1.25 0.56-1.25 1.25v0 28c0 0.69 0.56 1.25 1.25 1.25h28c0.69-0.001 1.249-0.56 1.25-1.25v-16c-0-0.69-0.56-1.25-1.25-1.25h-0z"></path>
          </svg>
          <Typography variant="h5" color="white" className="text-center">
            <CountUp
              start={0}
              key={totalPosts}
              end={totalPosts}
              duration={2}
              isCounting
            />{" "}
            Posts
          </Typography>
        </div>

        <div className="relative bg-teal-800 text-white rounded-lg p-3 h-20 w-60 shadow-xl">
          <p className="text-xl font-bold">
            Altitude:{" "}
            <CountUp
              key={totalVotes}
              start={0}
              end={totalVotes}
              duration={3}
              isCounting
            />
            m
          </p>
          <img
            src={mountainWidget}
            alt="Mountain"
            className="absolute bottom-0 right-0 w-32 h-auto"
          />
        </div>
      </div>
    </div>
  );
}
