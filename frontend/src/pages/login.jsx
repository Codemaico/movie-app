import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // 1. Validation checks
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    // Your backend handles password length validation, so you can remove this client-side check if you want.
    // if (password.length < 6) {
    //   toast.error("Password must be at least 6 characters");
    //   return;
    // }

    const userData = { email, password };

    try {
      // 2. Correct fetch call for login endpoint
      const response = await fetch("/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // 3. Send the user credentials in the body
        body: JSON.stringify(userData),
      });

      // 4. Handle failed login attempts first
      if (!response.ok) {
        const errorData = await response.json();
        return toast.error(errorData.message || "Invalid credentials");
      }
      
      // 5. Read the successful response
      const data = await response.json();
      
      // 6. Check for a token and save user to local storage
      if (data.token) {
        localStorage.setItem("user", JSON.stringify(data));
        toast.success("Login successful");
        navigate("/movie-app");
      } else {
        toast.error("Login successful, but no token received.");
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Network error. Please try again.");
    }
  };

  // Optional: Redirect if user is already logged in
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/movie-app");
    }
  }, [navigate]);

  return (
    <>
      <section className="heading">
        <FaSignInAlt /> Login
        <p>Please enter your credentials</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email" // Use email type for better validation
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Please enter your email"
            />
          </div>
          <div className="form-group">
            <input
              type="password" // Use password type to hide input
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Please enter your password"
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
