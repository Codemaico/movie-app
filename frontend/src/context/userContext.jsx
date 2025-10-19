import { createContext, useState, useEffect } from "react";
import { registerUser, fetchUsers, logOut } from "../services/authService"; // Import logOut

// Use a descriptive name for your context
// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // Add state for the logged-in user

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Set the user based on the token
      setCurrentUser({ token });
      fetchUsers(token)
        .then(setUsers)
        .catch((err) => console.error("Failed to load users:", err));
    }
  }, []);

  const loginUser = (token) => {
    localStorage.setItem("token", token);
    setCurrentUser({ token });
  };

  const logoutUser = () => {
    logOut();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  const addUsers = async (userData) => {
    // Check if token exists before proceeding
    if (!currentUser) return;
    const newUser = await registerUser(userData, currentUser.token);
    setUsers((prev) => [...prev, newUser]);
  };

  const providerValue = {
    users,
    addUsers,
    currentUser, // Expose the current user status
    loginUser, // Expose the login function
    logoutUser, // Expose the logout function
  };

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};
