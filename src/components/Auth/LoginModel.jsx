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

export function LoginModal() {
  const { isOpen, closeLoginModal } = useLoginModal();

  return (
    <Dialog size="xs" open={isOpen} handler={closeLoginModal}>
      <DialogHeader className="justify-between">
        <Typography variant="h5" color="blue-gray">
          Login to make your contribution
        </Typography>
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
              className="mb-4 flex items-center justify-center gap-3 !py-4 shadow-md"
              onClick={closeLoginModal}
            >
              <Typography className="uppercase" color="blue-gray" variant="h6">
                Login
              </Typography>
            </MenuItem>
            <MenuItem
              component={Link}
              to="/signup"
              className="mb-1 flex items-center justify-center gap-3 !py-4 shadow-md"
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
