import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import ArticlesList from "./ArticlesList";

export default function ProfilePage() {
  const { userLoggedIn } = useContext(UserContext);
  return (
    <div className="profile">
      <div className="profile-content">
        <figure>
          <img src={userLoggedIn.avatar_url} alt="user avatar" />
          <p>{userLoggedIn.name}</p>
        </figure>
        <p>Username: {userLoggedIn.username}</p>
      </div>
      <h3 className="profileArticlesHeader">Your Articles:</h3>
      <ArticlesList username={userLoggedIn.username} notProfilePage={false} />
    </div>
  );
}
