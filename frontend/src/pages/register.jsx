import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;
  const navigate = useNavigate();

  // No useEffect for validation. The toasts will be triggered only on submit.

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // 1. Perform validation checks
    if (!name) {
      return toast.error("Name is required");
    }
    if (!email) {
      return toast.error("Email is required");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    // 2. If validation passes, proceed with the submission logic
    const userData = { name, email, password };
    console.log(userData);

    try {
      // Here you would typically send userData to your backend API
      const response = await fetch("/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return toast.error(errorData.message || "Registration failed");
      }

      // 1. Read the JSON body from the response
      const data = await response.json();

      // 2. Check if the response contains a token
      if (data.token) {
        // 3. Save the user object, including the token, to local storage
        localStorage.setItem("user", JSON.stringify(data));
        toast.success("Registration successful");

        // 4. Navigate to the desired page
        navigate("/movie-app");
      } else {
        toast.error("Registration successful, but no token received.");
        navigate("/movie-app/login");
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Registration failed");
    }
  };

  // Optional: Handle pre-existing user login state in a separate useEffect
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/movie-app");
    }
  }, [navigate]);

  return (
    <>
      <section className="heading">
        <FaUser /> Register
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <input
              type="email" // Use type="email" for better validation
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <input
              type="password" // Use type="password" to hide input
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
            />
          </div>
          <div className="form-group">
            <input
              type="password" // Use type="password" to hide input
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              placeholder="Confirm your password"
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

export default Register;
