import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { BackendURLs } from "../utitlity/backendURLs";
export const AuthContext = createContext();


export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );


  axios.defaults.withCredentials = true

  const login = async (inputs) => {
    const res = await axios.post(BackendURLs.LOGIN_URL, inputs);
    console.log(res.data.token)
    const res2= await axios.get(BackendURLs.PROFILE_INFO, {
        headers: {
          'token': res.data.token
        }
      })
    console.log(res2.data)
    setCurrentUser(res2.data);
  };

  const logout = async (inputs) => {
    await axios.get(BackendURLs.LOGOUT_URL);
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
