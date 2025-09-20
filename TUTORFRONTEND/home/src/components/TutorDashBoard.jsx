import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css"; // Use the same CSS as StudentDashboard

const TutorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <ul>
          <li onClick={() => navigate("/tutor-profile")}>👤 My Profile</li>
          <li onClick={() => navigate("/manage-schedule")}>📅 Manage Schedule</li>
          <li onClick={() => navigate("/earnings")}>💰 Earnings</li>
        </ul>
      </div>

      {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      {/* Top Navbar */}
      <nav className="top-nav">
        <div className="logo">TutorFinder</div>
        <span className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </span>
      </nav>

      {/* Main Content */}
      <div className={`main-content ${sidebarOpen ? "shifted" : ""}`}>
        <section className="hero-section">
          <h1>Welcome Back, Tutor!</h1>
          <p>Manage your profile, schedule, students, and earnings all in one place.</p>
        </section>

        <section className="dashboard-cards">
          <div className="card">
            <h3>My Profile</h3>
            <p>Update your bio, subjects, qualifications, and fees.</p>
          </div>
          <div className="card">
            <h3>Manage Schedule</h3>
            <p>Set your available time slots for students.</p>
          </div>
          <div className="card">
            <h3>My Students</h3>
            <p>View students who booked your sessions.</p>
          </div>
          <div className="card">
            <h3>Earnings</h3>
            <p>Track your total income from bookings.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TutorDashboard;