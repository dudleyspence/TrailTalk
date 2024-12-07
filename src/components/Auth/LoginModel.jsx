// src/components/LoginModal.js
import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Typography,
  MenuItem,
} from "@material-tailwind/react";
import { useLoginModal } from "../../context/LoginModelContext";
import { Link } from "react-router-dom";
import logo from "../../assets/Brand/Logo/TrailLogo.png";

export function LoginModal() {
  const { isOpen, closeLoginModal } = useLoginModal();

  return (
    <Dialog
      size="xs"
      className="bg-green-100"
      open={isOpen}
      handler={closeLoginModal}
    >
      <DialogHeader className="justify-between">
        <div className="flex flex-row justify-center items-center">
          <img className="h-9" src={logo} alt="logo" />
          <Typography variant="h5" color="blue-gray">
            Welcome to the trail...
          </Typography>
        </div>

        <IconButton
          color="blue-gray"
          size="sm"
          variant="text"
          onClick={closeLoginModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </DialogHeader>
      <DialogBody className="overflow-y-scroll !px-5">
        <div className="mb-6">
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="py-3 font-semibold uppercase opacity-70"
          >
            Options
          </Typography>
          <ul className="mt-3 -ml-2 flex flex-col gap-1">
            <MenuItem
              component={Link}
              to="/login"
              className="mb-4 flex items-center justify-center gap-3 !py-4 shadow-md bg-white"
              onClick={closeLoginModal}
            >
              <Typography className="uppercase" color="blue-gray" variant="h6">
                Login
              </Typography>
            </MenuItem>
            <MenuItem
              component={Link}
              to="/signup"
              className="mb-1 flex items-center justify-center gap-3 !py-4 shadow-md bg-white"
              onClick={closeLoginModal}
            >
              <Typography className="uppercase" color="blue-gray" variant="h6">
                Sign Up
              </Typography>
            </MenuItem>
          </ul>
        </div>
      </DialogBody>
      <DialogFooter className="justify-between gap-2">
        <Button variant="outlined" size="sm" onClick={closeLoginModal}>
          Learn More
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default LoginModal;
