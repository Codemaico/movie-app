import { createContext, useState, useEffect } from "react";
import { registerUser, fetchUsers } from "../services/authService";

// eslint-disable-next-line react-refresh/only-export-components
export const userContext = createContext();

export const UserProvider = ({children}) => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return; // skip if not logged in
    fetchUsers(token)
      .then(setUsers)
      .catch((err) => console.error("Failed to load users:", err));
  }, [token]);

  // add user to DB

  const addUsers = async (userData) => {
    if (!token) return;
    const newUser = await registerUser(userData, token);
    setUsers((prev) => [...prev, newUser]);
  };



  const providerValue = {
    users,
    addUsers,
  };

  return (
    <userContext.Provider value={providerValue}>
      {children}
    </userContext.Provider  >    

  );
};
