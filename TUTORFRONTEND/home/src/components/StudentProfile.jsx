import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";
import "./StudentProfile.css";

const StudentProfile = () => {
  const navigate = useNavigate(); // <-- Added for redirect
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  // Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.id) {
      setUser(storedUser);
      setFormData({
        name: storedUser.name || "",
        email: storedUser.email || "",
        phone: storedUser.phone || "",
      });
    } else {
      alert("User ID missing. Please log in again.");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`${API_BASE_URL}/auth/update/${user.id}`, formData);
      alert("Profile updated successfully!");
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/student-dashboard"); // <-- Redirect after update
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await axios.delete(`${API_BASE_URL}/auth/delete/${user.id}`);
        alert("Account deleted successfully!");
        localStorage.removeItem("user");
        navigate("/"); // <-- Redirect to homepage after deletion
      } catch (err) {
        console.error(err);
        alert("Error deleting account");
      }
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-form">
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Phone:
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </label>
        <div className="profile-actions">
          <button className="update-btn" onClick={handleUpdate}>Update</button>
          <button className="delete-btn" onClick={handleDelete}>Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;