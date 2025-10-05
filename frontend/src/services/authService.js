const API_URI = "/users/";

export async function fetchUsers(token) {
  const res = await fetch(API_URI, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to load users");
  return res.json();
}

export async function registerUser(userData) {
  const res = await fetch(API_URI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    throw new Error("Failed to register user");
  }

  const data = await res.json();

  // Save the new user in localStorage
  localStorage.setItem("user", JSON.stringify(data));

  return data;
}

const authService = {
  registerUser,
  fetchUsers,
};

export default authService;
