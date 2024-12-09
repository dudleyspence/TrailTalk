import React, { useState, useEffect } from "react";
import { addUser, fetchUserByFirebaseUID } from "../../../api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { doSignInWithGoogle } from "../../firebase/auth";
import {
  Input,
  Button,
  Typography,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";

export function UseGoogle() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [username, setUsername] = useState("");
  const [firebaseUID, setFirebaseUID] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const { userLoggedIn, setUserLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/");
    }
  }, [userLoggedIn, navigate]);

  function addNewUser() {
    addUser(firebaseUID, username, name, avatar)
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
        setIsRegistering(false);
      });
  }

  function onGoogleSignUp(event) {
    event.preventDefault;
    if (!isRegistering) {
      setIsRegistering(true);
      doSignInWithGoogle()
        .then((result) => {
          const user = result.user;
          if (result._tokenResponse.isNewUser) {
            setName(user.displayName);
            setFirebaseUID(user.uid);
            setAvatar(user.photoURL);
            handleOpen();
            return;
          } else {
            console.log("User already exists:", user);
            return fetchUserByFirebaseUID(user.uid);
          }
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
          setIsRegistering(false);
        });
    } else {
      return;
    }
  }

  return (
    <>
      <Button
        onClick={(event) => {
          onGoogleSignUp(event);
        }}
        size="sm"
        variant="outlined"
        color="blue-gray"
        className="flex items-center gap-3 mt-5"
        fullWidth
      >
        <img
          src="https://docs.material-tailwind.com/icons/google.svg"
          alt="metamask"
          className="h-6 w-6"
        />
        Continue with Google
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        size="xxl"
        className="flex flex-col items-center justify-center"
      >
        <DialogHeader>Pick a username: </DialogHeader>
        <DialogBody>
          <Input
            label="Username"
            size="lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. TrailBlazer98"
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              handleOpen();
              addNewUser();
            }}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
