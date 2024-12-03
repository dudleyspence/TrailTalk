import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [userLoggedIn, setUserLoggedIn] = useState("");

  return (
    <UserContext.Provider value={{ userLoggedIn, setUserLoggedIn }}>
      {props.children}
    </UserContext.Provider>
  );
};
