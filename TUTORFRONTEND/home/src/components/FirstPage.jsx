import React from "react";
import "./FirstPage.css";
import { Link } from "react-router-dom";

function FirstPage() {
  return (
    <div className="firstpage">
      {/* Navbar */}

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h2>Find Your Perfect Tutor</h2>
          <p>Learn smarter, faster, and fun! Connect with top tutors near you.</p>
          <button className="cta-btn">Get Started</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h3>Why Choose Us?</h3>
        <div className="feature-boxes">
          <div className="feature">
            <h4>Personalized Learning</h4>
            <p>Connect with tutors who match your learning style.</p>
          </div>
          <div className="feature">
            <h4>Flexible Scheduling</h4>
            <p>Book classes when it suits you best.</p>
          </div>
          <div className="feature">
            <h4>Verified Tutors</h4>
            <p>All tutors are verified for quality teaching.</p>
          </div>
        </div>
      </section>

      {/* Top Tutors Section */}
      <section className="top-tutors">
        <h3>Meet Our Top Tutors</h3>
        <div className="tutor-cards">
          <div className="tutor-card">
            <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Tutor" />
            <h4>Ms. Ananya Sharma</h4>
            <p>Math Specialist</p>
            <button className="view-profile-btn">View Profile</button>
          </div>
          <div className="tutor-card">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Tutor" />
            <h4>Mr. Rahul Verma</h4>
            <p>Physics Expert</p>
            <button className="view-profile-btn">View Profile</button>
          </div>
          <div className="tutor-card">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Tutor" />
            <h4>Ms. Sneha Kapoor</h4>
            <p>Chemistry Tutor</p>
            <button className="view-profile-btn">View Profile</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 TutorFinder. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default FirstPage;