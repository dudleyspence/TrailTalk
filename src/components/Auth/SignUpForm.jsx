import React, { useState, useEffect } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Checkbox,
  Dialog,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { useAuth } from "../../context/AuthContext";
import { addUser } from "../../../api";
import { useNavigate } from "react-router-dom";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../firebase/auth";

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

  function GoogleUsername() {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);

    return (
      <>
        <Button onClick={handleOpen} variant="gradient">
          SignUp With Google
        </Button>
        <Dialog
          open={open}
          handler={handleOpen}
          className="flex flex-col items-center justify-center"
        >
          <DialogHeader>First pick a username: </DialogHeader>
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Usernane
          </Typography>
          <Input
            size="lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. TrailBlazer98"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 w-[80%] min-w-10"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={() => {
                setUsername("");
                handleOpen();
              }}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={(event) => {
                onGoogleSignUp(event);
                handleOpen();
              }}
            >
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  }

  function onGoogleSignUp(event) {
    event.preventDefault;
    if (!isRegistering) {
      setIsRegistering(true);
      doSignInWithGoogle()
        .then((result) => {
          const user = result.user;
          if (result._tokenResponse.isNewUser) {
            return addNewUser(
              user.uid,
              username,
              user.displayName,
              user.photoURL
            ).then(({ user }) => {
              return user.firebaseUID;
            });
          } else {
            console.log("existing user signed in");
            return user.uid;
          }
        })
        .then((firebaseUID) => {
          return getUserByFirebase(firebaseUID);
        })
        .then((populatedUser) => {
          setCurrentUser(populatedUser);
          if (populatedUser.user.role === "guardian") {
            setGuardianLoggedIn(true);
            setCarerLoggedIn(false);
          }
          if (populatedUser.user.role === "carer") {
            setGuardianLoggedIn(false);
            setCarerLoggedIn(true);
          }
          setIsRegistering(false);
          navigate(`/dashboard`);
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
      <GoogleUsername />
    </Card>
  );
}
