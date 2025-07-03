import { createContext, useEffect, useState } from "react"; //allows data to be shared across multiple components
import props from "prop-types";
// import axios from "axios"
// import { toast } from "react-toastify";
const MainContext = createContext();
export { MainContext };

const MainContextProvider = (props) => {
  const backendurl = import.meta.env.VITE_backendurl;
  // console.log(backendurl);

  const [token, setToken] = useState(
    () => sessionStorage.getItem("token") || ""
  );
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  });
 useEffect(() => {
          if (token) {
            sessionStorage.setItem("token", token);
          } else {
            sessionStorage.removeItem("token");
          }
        }, [token]);
        useEffect(() => {
          if (user) {
            sessionStorage.setItem("user", JSON.stringify(user));
          } else {
            sessionStorage.removeItem("user");
          }
        }, [user]);
  const value = {
    token,
    setToken,
    backendurl,
    user,
    setUser,
  };
    console.log(user, token);

  return (
    <MainContext.Provider value={value}>{props.children}</MainContext.Provider>
  );
};

export default MainContextProvider;
MainContextProvider.propTypes = {
  children: props.node.isRequired,
};
