import React, { useState } from "react";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
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
      const user = response.data;

      if (!user.id) {
        alert("Login failed: No user ID returned from backend!");
        console.error("Invalid login response:", user);
        return;
      }

      alert("Login successful!");
      console.log("Logged in user:", user);

      // ✅ Save complete user object in localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Redirect to role-specific dashboard
      if (user.role === "student") navigate("/student-dashboard");
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
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;