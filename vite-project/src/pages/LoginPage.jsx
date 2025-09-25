import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {

    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:5000/login", {
      email: formData.email,
      password: formData.password,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token); // ✅ Save token
      navigate("/"); // redirect to homepage
    } else {
      alert("Login failed. Please check your credentials.");
    }
  } catch (error) {
    console.error("Login failed", error);

    if (error.response && error.response.status === 401) {
      alert("Invalid email or password. Please try again.");
    } else {
      alert("Something went wrong. Please try again later.");
    }
  }
};


  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">Login</h3>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        {/* Redirect to Registration */}
        <p className="text-center mt-3 mb-0 text-muted">
          New user?{" "}
          <Link to="/register" className="btn btn-link p-0 align-baseline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
