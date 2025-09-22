import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";
import "./TutorProfile.css";

const TutorProfile = () => {
  const navigate = useNavigate();
  const [tutor, setTutor] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    availability: "",
    bio: "",
    experience: "",
    hourlyRate: "",
    location: "",
    subjects: ""
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || !storedUser.id) {
      alert("User not found. Please log in again.");
      navigate("/");
      return;
    }
    setTutor(storedUser);

    // Fetch existing profile
    axios.get(`${API_BASE_URL}/tutors/profile/${storedUser.id}`)
      .then(res => {
        const profile = res.data;
        setFormData({
          name: profile.name || storedUser.name || "",
          email: profile.email || storedUser.email || "",
          phone: storedUser.phone || "",
          role: storedUser.role || "",
          availability: profile.availability || "",
          bio: profile.bio || "",
          experience: profile.experience || "",
          hourlyRate: profile.hourlyRate || "",
          location: profile.location || "",
          subjects: profile.subjects || ""
        });
      })
      .catch(err => console.log("No profile yet", err));
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const url = `${API_BASE_URL}/tutors/profile/${tutor.id}`;
      await axios.post(url, formData); // POST handles create/update
      alert("Profile saved successfully!");
      navigate("/tutor-dashboard");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Error saving profile");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await axios.delete(`${API_BASE_URL}/auth/delete/${tutor.id}`);
        alert("Account deleted successfully!");
        localStorage.removeItem("user");
        navigate("/");
      } catch (err) {
        console.error(err);
        alert("Error deleting account");
      }
    }
  };

  if (!tutor) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h2>My Tutor Profile</h2>
      <div className="profile-form">
        {["name", "email", "phone", "role", "availability", "bio", "experience", "hourlyRate", "location", "subjects"].map(field => (
          <label key={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}:
            {field === "bio" ? (
              <textarea name={field} value={formData[field]} onChange={handleChange} />
            ) : (
              <input
                type={["experience", "hourlyRate"].includes(field) ? "number" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
              />
            )}
          </label>
        ))}
        <div className="profile-actions">
          <button className="update-btn" onClick={handleSave}>
            Save / Update
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;