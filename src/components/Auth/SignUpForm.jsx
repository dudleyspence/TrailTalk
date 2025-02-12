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

  // validation states
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const { userLoggedIn, setUserLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/");
    }
  }, [userLoggedIn, navigate]);

  function validateForm() {
    const errors = {};
    if (!email) errors.email = true;
    if (!username) errors.username = true;
    if (!password) errors.password = true;
    if (!name) errors.name = true;
    if (!confirmPassword) errors.confirmPassword = true;
    if (password !== confirmPassword) errors.passwordMatch = true;

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function onSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      setError("Please fill all required fields correctly.");
      return;
    }

    if (!isSigningUp) {
      setSigningUp(true);
      setError("");

      doCreateUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const firebaseUser = userCredential.user;

          return addUser(firebaseUser.uid, username, name);
        })
        .then((userData) => {
          if (!userData) {
            throw { code: "user-not-found" };
          }
          setUserLoggedIn(userData.data.user);
        })
        .catch((error) => {
          console.log(error);
          setError("An unexpected error occurred. Please try again.");
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
        autoComplete="on"
      >
        <UseGoogle />

        <div className="flex items-center my-6">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Name
          </Typography>
          <Input
            size="lg"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Joe Bloggs"
            className={
              fieldErrors.name
                ? "!border-red-500 !border-t-red-500 focus:!border-t-red-500 bg-red-50"
                : "border-t-blue-gray-200 focus:!border-t-gray-900"
            }
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Username
          </Typography>
          <Input
            size="lg"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. TrailBlazer98"
            className={
              fieldErrors.username
                ? "!border-red-500 !border-t-red-500 focus:!border-t-red-500 bg-red-50"
                : "border-t-blue-gray-200 focus:!border-t-gray-900"
            }
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Email
          </Typography>
          <Input
            size="lg"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@mail.com"
            className={
              fieldErrors.email
                ? "!border-red-500 !border-t-red-500 focus:!border-t-red-500 bg-red-50"
                : "border-t-blue-gray-200 focus:!border-t-gray-900"
            }
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            value={password}
            name="new-password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            size="lg"
            placeholder="********"
            className={
              fieldErrors.password
                ? "!border-red-500 !border-t-red-500 focus:!border-t-red-500 bg-red-50"
                : "border-t-blue-gray-200 focus:!border-t-gray-900"
            }
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Confirm Password
          </Typography>
          <Input
            value={confirmPassword}
            name="confirm-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            size="lg"
            placeholder="********"
            className={
              fieldErrors.confirmPassword | fieldErrors.passwordMatch
                ? "!border-red-500 !border-t-red-500 focus:!border-t-red-500 bg-red-50"
                : "border-t-blue-gray-200 focus:!border-t-gray-900"
            }
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          {!fieldErrors.password &&
            !fieldErrors.confirmPassword &&
            fieldErrors.passwordMatch && <p>Passwords do not match</p>}
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
        {error && (
          <Typography color="red" className="mt-2 text-center">
            {error}
          </Typography>
        )}

        <Button type="submit" className="mt-6" fullWidth disabled={isSigningUp}>
          {isSigningUp ? "Signing up..." : "Sign up"}
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
