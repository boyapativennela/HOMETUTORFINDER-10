import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
//frontend code 

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Register = () => {
  console.log("API_BASE_URL (in browser):", import.meta.env.VITE_BACKEND_URL);
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    qualification: "", // only for tutor
    adminCode: ""      // only for admin
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setFormData({ ...formData, qualification: "", adminCode: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill all required fields!");
      return;
    }

    const payload = { ...formData, role };
    console.log("Register Payload:", payload);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, payload);
      alert("Registered successfully");
      console.log("Registered User: ", response.data);
    } catch (err) {
      console.error("Error during registration:", err);
      if (err.response && err.response.data) {
        alert(`Registration failed: ${err.response.data}`);
      } else {
        alert("Registration failed!");
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <label>
          Role:
          <select value={role} onChange={handleRoleChange}>
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>

        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>

        <label>
          Phone:
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </label>

        {role === "tutor" && (
          <label>
            Qualification:
            <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} />
          </label>
        )}

        {role === "admin" && (
          <label>
            Admin Code:
            <input type="text" name="adminCode" value={formData.adminCode} onChange={handleChange} />
          </label>
        )}

        <button type="submit" className="register-btn">Register</button>
      </form>
    </div>
  );
};

export default Register;
