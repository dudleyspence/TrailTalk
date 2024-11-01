import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { getUserByUsername } from "../../api";

export default function Login() {
  const [username, setUsername] = useState("hikeguru");
  const [isError, setIsError] = useState(false);
  const { setUserLoggedIn } = useContext(UserContext);
  let navigate = useNavigate();

  // function handleLoginChange(event) {
  //   const usernameInput = event.target.value.toLowerCase();
  //   setUsername(usernameInput);
  // }

  function handleLoginClick(event) {
    event.preventDefault();
    console.log(username);
    getUserByUsername(username)
      .then(({ data: { user } }) => {
        setUserLoggedIn(user);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
  }

  return (
    <section className="loginPage">
      <form onSubmit={handleLoginClick}>
        {/* <label htmlFor="username">Enter your username:</label>
        <p>(Demo username - hikeguru)</p>
        <input
          name="username"
          id="username"
          onChange={handleLoginChange}
          value={username}
          placeholder="username"
        ></input>
        {isError && (
          <div className="error-message">
            <p>Incorrect username</p>
            <p>please try again</p>
          </div>
        )}
        <button className="styled-button">Login</button> */}
        <button className="styled-button login-button">DEMO LOGIN</button>
      </form>
    </section>
  );
}
