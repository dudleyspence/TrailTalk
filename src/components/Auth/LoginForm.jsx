import React, { useState, useEffect } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useAuth } from "../../context/AuthContext";
import { fetchUserByFirebaseUID } from "../../../api";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setSigningIn] = useState(false);
  const [error, setError] = useState("");

  const { userLoggedIn, setUserLoggedIn } = useAuth();
  const navigate = useNavigate();

  function handleDemoLogin() {
    setEmail("example@gmail.com");
    setPassword("password");
  }

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/");
    }
  }, [userLoggedIn, navigate]);

  function onSubmit(event) {
    event.preventDefault();

    if (!isSigningIn) {
      setSigningIn(true);
      setError("");

      signInWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
          const firebaseUID = user.uid;
          console.log(user);
          return fetchUserByFirebaseUID(firebaseUID);
        })
        .then((userData) => {
          if (!userData) {
            throw { code: "auth/user-not-found" };
          }
          setUserLoggedIn(userData.data.user);
        })
        .catch((error) => {
          if (error.code === "auth/wrong-password") {
            setError("Incorrect password. Please try again.");
          } else if (error.code === "auth/user-not-found") {
            setError("User not found. Please sign up first.");
          } else if (error.code === "auth/invalid-email") {
            setError("Invalid email format. Please try again.");
          } else {
            setError("An unexpected error occurred. Please try again.");
          }
        })
        .finally(() => {
          setSigningIn(false);
        });
    }
  }

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Welcome Back!
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Login below and get back on the trail...
      </Typography>
      {error && (
        <Typography color="red" className="mt-2 text-center">
          {error}
        </Typography>
      )}
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={onSubmit}
      >
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
            type="email"
            size="lg"
            placeholder="name@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            required
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            type="password"
            size="lg"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            required
          />
        </div>

        <Button type="submit" className="mt-6" fullWidth disabled={isSigningIn}>
          {isSigningIn ? "Logging in..." : "Login"}
        </Button>
        <Button
          onClick={handleDemoLogin}
          className="mt-6"
          fullWidth
          disabled={isSigningIn}
        >
          Demo Login Details
        </Button>

        <Typography color="gray" className="mt-4 text-center font-normal">
          Don't have an account?
          <a href="/signup" className="font-medium text-gray-900">
            {" "}
            Sign Up
          </a>
        </Typography>
      </form>
    </Card>
  );
}
