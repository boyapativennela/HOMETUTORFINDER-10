import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import "./Login.css";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, formData);
      alert("Login successful!");
      console.log("Logged in user:", response.data);
      const user = response.data;
      // save user in localStorage
      localStorage.setItem("user", JSON.stringify(user));

      //after login redirect to respective dashboard.
      if(user.role==="student") navigate("/student-dashboard");
      else if (user.role === "tutor") navigate("/tutor-dashboard");
      else if (user.role === "admin") navigate("/admin-dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;