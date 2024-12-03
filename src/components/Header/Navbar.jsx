import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Collapse,
} from "@material-tailwind/react";
import { UserContext } from "../../context/UserContext";

export function StickyNavbar() {
  const { userLoggedIn, setUserLoggedIn } = useContext(UserContext);
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();

  function handleSignOutClick() {
    setUserLoggedIn("");
    setOpenNav(!openNav);
    navigate("/login");
  }

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Link to="/" className="flex items-center justify-center">
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-3 border-b-2
           font-normal"
        >
          Articles
        </Typography>
      </Link>
    </ul>
  );

  return (
    <Navbar className="sticky bg-TrailGreen top-0 z-10 h-[90px] lg:h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 border-none !shadow-none">
      <div className="flex h-full items-center justify-between text-blue-gray-900">
        <Link to="/">
          <Typography
            as="a"
            className="mr-4 text-LogoColor text-2xl lg:text-3xl cursor-pointer py-1.5 font-bold"
          >
            Trail Talk
          </Typography>
        </Link>
        {userLoggedIn && (
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            {userLoggedIn && (
              <Button
                onClick={handleSignOutClick}
                variant="text"
                size="sm"
                className="hidden lg:inline-block"
              >
                <span>Sign Out</span>
              </Button>
            )}
            <Link to="/profile">
              <Avatar
                variant="rounded"
                size="lg"
                alt="profile image"
                className="border border-gray-900 p-0.5"
                src={userLoggedIn.avatar_url}
              />
            </Link>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        )}
      </div>
      <Collapse
        className="absolute flex flex-col justify-center rounded-lg right-0 w-[200px] bg-TrailGreen shadow-md lg:hidden"
        open={openNav}
      >
        {navList}
        {userLoggedIn && (
          <Button
            className="p-4"
            onClick={handleSignOutClick}
            variant="text"
            size="md"
          >
            <span>Sign Out</span>
          </Button>
        )}
      </Collapse>
    </Navbar>
  );
}
