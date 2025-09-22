import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
//this is the final project.

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <ul>
          <li onClick={() => navigate("/view-students")}>👨‍🎓 View Students</li>
          <li onClick={() => navigate("/view-tutors")}>👩‍🏫 View Tutors</li>
          <li onClick={() => navigate("/manage-users")}>⚙️ Manage Users</li>
        </ul>
      </div>

      {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      {/* Top Navbar */}
      <nav className="top-nav">
        <div className="logo">TutorFinder Admin</div>
        <span className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </span>
      </nav>

      {/* Main Content */}
      <div className={`main-content ${sidebarOpen ? "shifted" : ""}`}>
        <section className="hero-section">
          <h1>Welcome, Admin!</h1>
          <p>Manage students, tutors, and oversee platform activities.</p>
        </section>

        <section className="dashboard-cards">
          <div className="card">
            <h3>Students</h3>
            <p>View and manage registered students.</p>
            <button className="hero-btn" onClick={() => navigate("/view-students")}>
              View Students
            </button>
          </div>
          <div className="card">
            <h3>Tutors</h3>
            <p>View and manage tutor profiles.</p>
            <button className="hero-btn" onClick={() => navigate("/view-tutors")}>
              View Tutors
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;