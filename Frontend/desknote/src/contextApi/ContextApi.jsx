import { createContext, useState } from "react";
import Cookies from "js-cookie";

export const ContextApiCreate = createContext(null);

export const ProviderFun = (props) => {
  const [userDetails, setUserDetails] = useState({
    email: Cookies.get("myUniqueEmail"),
    tags: [
      "#notes",
      "#Work",
      "#Ideas",
      "#Important",
      "#Meeting",
      "#Study",
      "#Finance",
      "#Health",
      "#Shopping",
      "#Travel",
      "#Recipes",
      "#Project",
      "#Journal",
      "#Books",
      "#Contacts",
      "#Events",
      "#Goals",
      "#Research",
    ],
  });

  return (
    <ContextApiCreate.Provider value={{ userDetails, setUserDetails }}>
      {props.children}
    </ContextApiCreate.Provider>
  );
};
