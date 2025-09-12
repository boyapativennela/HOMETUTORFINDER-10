import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import { FaUserCircle } from "react-icons/fa";
import "./ProfileTutor.css";

const ProfileTutor = () => {
  const [formData, setFormData] = useState({
    subjects: "",
    experience: "",
    bio: "",
    hourlyRate: "",
    location: "",
    availability: "",
  });

  const [loading, setLoading] = useState(true);
  const [profileExists, setProfileExists] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });

  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const userId = loggedUser?.id;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/tutors/profile/${userId}`);
        const profile = res.data;
        if (profile) {
          setFormData({
            subjects: profile.subjects || "",
            experience: profile.experience || "",
            bio: profile.bio || "",
            hourlyRate: profile.hourlyRate || "",
            location: profile.location || "",
            availability: profile.availability || "",
          });
          setProfileExists(true);
        }
        setUser({
          name: loggedUser.name,
          email: loggedUser.email,
        });
      } catch (err) {
        console.log("No profile found yet");
        setProfileExists(false);
        setUser({
          name: loggedUser.name,
          email: loggedUser.email,
        });
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchProfile();
  }, [userId, loggedUser]);

  // FIXED: Only convert hourlyRate to number, everything else stays string
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "hourlyRate" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      availability: formData.availability || "Not specified",
    };

    try {
      const endpoint = `${API_BASE_URL}/tutors/profile/${userId}`;
      if (profileExists) {
        await axios.put(endpoint, payload);
        alert("Profile updated successfully!");
      } else {
        await axios.post(endpoint, payload);
        alert("Profile created successfully!");
        setProfileExists(true);
      }
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving profile:", err.response?.data || err.message);
      alert("Failed to save profile. Check backend logs!");
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="tutor-dashboard">
      <nav className="navbar">
        <h1 className="logo">TutorFinder</h1>
      </nav>

      <main className="content profile-content">
        <h2 className="page-title">My Tutor Profile</h2>

        {!isEditing && profileExists ? (
          <div className="profile-view">
            <div className="profile-header">
              <FaUserCircle className="profile-icon" />
              <div>
                <h3>{user.name}</h3>
                <p>{user.email}</p>
              </div>
            </div>
            <div className="profile-details">
              <p><strong>Subjects:</strong> {formData.subjects}</p>
              <p><strong>Experience:</strong> {formData.experience} years</p>
              <p><strong>Bio:</strong> {formData.bio}</p>
              <p><strong>Hourly Rate:</strong> ₹{formData.hourlyRate}</p>
              <p><strong>Location:</strong> {formData.location}</p>
              <p><strong>Availability:</strong> {formData.availability || "Not specified"}</p>
            </div>
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="profile-form">
            <label>Subjects:</label>
            <input
              type="text"
              name="subjects"
              value={formData.subjects}
              onChange={handleChange}
              required
            />

            <label>Experience:</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
            />

            <label>Bio:</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              required
            />

            <label>Hourly Rate (₹):</label>
            <input
              type="number"
              name="hourlyRate"
              value={formData.hourlyRate}
              onChange={handleChange}
              step="1"
              required
            />

            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />

            <label>Availability:</label>
            <input
              type="text"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
            />

            <button type="submit">{profileExists ? "Update Profile" : "Save Profile"}</button>
            <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </form>
        )}
      </main>
    </div>
  );
};

export default ProfileTutor;