import React, { useState } from "react";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="dashboard-container">
      {/* Top Navbar */}
      <nav className="top-nav">
        <div className="logo">TutorFinder</div>
        <div className="nav-icons">
          <span className="sidebar-toggle" onClick={toggleSidebar}>☰</span>
          <span>🔔</span>
          <span>👤</span>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <ul>
          <li>🏠 Dashboard</li>
          <li>🔎 Find Tutors</li>
          <li>⭐ My Tutors</li>
          <li>📅 My Bookings</li>
          <li>💬 Messages</li>
          <li>⚙️ Settings</li>
        </ul>
      </div>

      {/* Overlay */}
      {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      {/* Main content */}
      <div className={`main-content ${sidebarOpen ? "shifted" : ""}`}>
        {/* Hero Section */}
        <section className="hero-section">
          <h1>Welcome Back, Student!</h1>
          <p>Find the perfect tutor, book your sessions, and track your learning progress.</p>
          <button className="hero-btn">Find Tutors Now</button>
        </section>

        {/* Dashboard quick links / cards */}
        <section className="dashboard-cards">
          <div className="card">
            <h3>My Tutors</h3>
            <p>View your favorite tutors and profiles.</p>
          </div>
          <div className="card">
            <h3>My Bookings</h3>
            <p>See all your scheduled sessions at a glance.</p>
          </div>
          <div className="card">
            <h3>Messages</h3>
            <p>Communicate with your tutors easily.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;