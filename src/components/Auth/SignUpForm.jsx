import React, { useState, useEffect } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Checkbox,
} from "@material-tailwind/react";
import { useAuth } from "../../context/AuthContext";
import { addUser } from "../../../api";
import { useNavigate } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";
import { UseGoogle } from "./UseGoogle";

export function SignUpForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setSigningUp] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { userLoggedIn, setUserLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/");
    }
  }, [userLoggedIn, navigate]);

  function onSubmit(event) {
    event.preventDefault();

    if (!email || !password || !name || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!isSigningUp) {
      setSigningUp(true);
      setError("");

      doCreateUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const firebaseUser = userCredential.user;
          console.log(firebaseUser);

          return addUser(firebaseUser.uid, username, name);
        })
        .then((userData) => {
          if (!userData) {
            throw { code: "auth/user-not-found" };
          }
          console.log(userData);
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
          setSigningUp(false);
        });
    }
  }

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to register.
      </Typography>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={onSubmit}
      >
        <UseGoogle />

        <div class="flex items-center my-6">
          <hr class="flex-grow border-t border-gray-300" />
          <span class="mx-4 text-gray-500 text-sm">or</span>
          <hr class="flex-grow border-t border-gray-300" />
        </div>
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Full Name
          </Typography>
          <Input
            size="lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Joe Bloggs"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Usernane
          </Typography>
          <Input
            size="lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. TrailBlazer98"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
            size="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Confirm Password
          </Typography>
          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              I agree the
              <a
                href="#"
                className="font-medium transition-colors hover:text-gray-900"
              >
                &nbsp;Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />
        <Button type="submit" className="mt-6" fullWidth disabled={isSigningUp}>
          {isSigningUp ? "Logging in..." : "Login"}
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <a href="/login" className="font-medium text-gray-900">
            Sign In
          </a>
        </Typography>
      </form>
    </Card>
  );
}
