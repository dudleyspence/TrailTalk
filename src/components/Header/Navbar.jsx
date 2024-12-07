import React, { useContext, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Collapse,
  IconButton,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  LifebuoyIcon,
  PowerIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    action: "profile",
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
    action: "editProfile",
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
    action: "help",
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
    action: "signOut",
  },
];

function ProfileMenu({ user }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { signOutUser } = useAuth();

  const closeMenu = () => setIsMenuOpen(false);

  const handleMenuItemClick = (action) => {
    closeMenu();
    switch (action) {
      case "profile":
        navigate("/profile");
        break;
      case "editProfile":
        navigate("/edit-profile");
        break;
      case "help":
        navigate("/help");
        break;
      case "signOut":
        handleSignOut();
        break;
      default:
        break;
    }
  };

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
        alert("Failed to sign out. Please try again.");
      });
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-md py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="rounded"
            size="md"
            alt={user.name}
            className="border border-gray-900 p-0.5"
            src={user.avatar_url}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, action }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => handleMenuItemClick(action)}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export default ProfileMenu;

export function DynamicNavbar() {
  const { userLoggedIn } = useAuth();
  console.log(userLoggedIn);

  return (
    <Navbar className="sticky top-0 z-10 h-[90px] min-w-full bg-green-200 rounded-none px-4 lg:px-8 lg:py-4 flex items-center justify-between text-blue-gray-900">
      <Typography
        as="a"
        href="/"
        className="mr-4 cursor-pointer py-1.5 font-Bold"
      >
        Trail Talk
      </Typography>
      <div className="flex flex-row gap-3 justify-center items-center">
        <Link className="mr-4" to="/">
          <Button variant="gradient" size="sm">
            <span>News Feed</span>
          </Button>
        </Link>
        {userLoggedIn ? (
          <ProfileMenu user={userLoggedIn} />
        ) : (
          <Link className="mr-4" to="/login">
            <Button className="bg-deep-orange-600" size="sm">
              <span>Login / Sign Up</span>
            </Button>
          </Link>
        )}
      </div>
    </Navbar>
  );
}
