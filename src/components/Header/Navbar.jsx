import React, { useContext, useState } from "react";
import logo from "../../assets/Brand/Logo/TrailLogo.png";
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
import { doSignOut } from "../../firebase/auth";
import { useHelpModal } from "../../context/HelpModelContext";

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

  const { openHelpModal } = useHelpModal();

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
        openHelpModal();
        break;
      case "signOut":
        handleSignOut();
        break;
      default:
        break;
    }
  };

  const handleSignOut = () => {
    doSignOut()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
        alert("Failed to sign out. Please try again.");
      });
  };

  console.log(user.avatar_url);
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
      <Link to="/">
        <img className="h-[40px] md:h-[60px]" src={logo} alt="logo" />
      </Link>
      <div className="flex flex-row md:gap-3 justify-center items-center">
        <Link className="mr-2 lg:mr-4" to="/">
          <Button
            className="text-[9px] md:text-[12px] px-2 md:px-3 py-2 "
            variant="gradient"
            size="sm"
          >
            <span>News Feed</span>
          </Button>
        </Link>
        {userLoggedIn ? (
          <div className="flex flex-row justify-center items-center">
            <Link className="mr-2 lg:mr-4" to="/addarticle">
              <Button className="bg-teal-800 text-[9px] md:text-[12px] px-2 md:px-3 py-2 text-white">
                <span>Post Article</span>
              </Button>
            </Link>
            <ProfileMenu user={userLoggedIn} />
          </div>
        ) : (
          <Link className="mr-2 lg:mr-4" to="/login">
            <Button className="bg-deep-orange-600 text-[9px] md:text-[12px] px-2 md:px-3  py-2 ">
              <span>Login / Sign Up</span>
            </Button>
          </Link>
        )}
      </div>
    </Navbar>
  );
}
