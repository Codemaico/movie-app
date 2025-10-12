import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Add your login logic here, such as making an API call to authenticate the user
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const userData = { email, password };
    console.log(userData);

    try {
      const response = await fetch("/users",{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if(!response) {
        const errorData = await response.json();
        return toast.error(errorData.message || "Login failed");
      }
    } catch (error) {
      console.error("Network error:",  error)
    }
  };

  useEffect(() => {

  }, []);

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
              type="text"
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
              type="text"
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
