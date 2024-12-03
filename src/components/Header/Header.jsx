import MobileNav from "./MobileNav";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { userLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  function handleTitleClick() {
    navigate("/");
  }

  function handleProfileClick() {
    navigate("/profile");
  }

  return userLoggedIn ? (
    <header className="bg-TrailGreen">
      <div className="leftHeader">
        <MobileNav />
        <h1 onClick={handleTitleClick}>Trail Talk</h1>
      </div>
      <div className="rightHeader">
        <img
          src={userLoggedIn.avatar_url}
          alt="user avatar"
          onClick={handleProfileClick}
        />
        <p onClick={handleProfileClick}>{userLoggedIn.name}</p>
      </div>
    </header>
  ) : (
    <header>
      <div className="loginPageHeader">
        <h1>Trail Talk</h1>
      </div>
    </header>
  );
}
