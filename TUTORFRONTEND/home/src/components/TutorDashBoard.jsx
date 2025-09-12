import React, { useState } from "react";
import "./TutorDashboard.css";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaUserGraduate,
  FaMoneyBill,
} from "react-icons/fa";

const TutorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="tutor-dashboard">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">TutorFinder</h1>
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FaBars />
        </button>
      </nav>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/tutor-profile">
              <FaChalkboardTeacher /> Profile
            </Link>
          </li>
          <li>
            <Link to="/manage-schedule">
              <FaCalendarAlt /> Manage Schedule
            </Link>
          </li>
          <li>
            <Link to="/my-students">
              <FaUserGraduate /> My Students
            </Link>
          </li>
          <li>
            <Link to="/earnings">
              <FaMoneyBill /> Earnings
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="content">
        <section className="hero">
          <h2>Welcome, Tutor!</h2>
          <p>Manage your profile, schedule, and students all in one place.</p>
        </section>

        <section className="cards">
          <div className="card">
            <h3>Profile</h3>
            <p>Update your bio, subjects, qualifications, and fees.</p>
          </div>
          <div className="card">
            <h3>Schedule</h3>
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
      </main>
    </div>
  );
};

export default TutorDashboard;