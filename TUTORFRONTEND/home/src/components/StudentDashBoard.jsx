import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <ul>
          <li onClick={() => navigate("/my-profile")}>👤 My Profile</li>
          <li onClick={() => navigate("/find-tutors")}>🔎 Find Tutors</li>
          <li onClick={() => navigate("/my-bookings")}>📅 My Bookings</li>
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
          <h1>Welcome Back!</h1>
          <p>Find the perfect tutor, book your sessions, and track your learning progress.</p>
          <button className="hero-btn" onClick={() => navigate("/find-tutors")}>
            Find Tutors Now
          </button>
        </section>

        <section className="dashboard-cards">
          <div className="card">
            <h3>My Tutors</h3>
            <p>View your favorite tutors and profiles.</p>
          </div>
          <div className="card">
            <h3>My Bookings</h3>
            <p>See all your scheduled sessions at a glance.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;