import React from "react";
import "./FirstPage.css";
import { Link } from "react-router-dom";

function FirstPage() {
  return (
    <div className="firstpage">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">TutorFinder</h1>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li> 
                <li><Link to="/about">About</Link></li>
            </ul>
      </nav>

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

      {/* Reviews Section */}
      <section className="reviews">
        <h3>What Students Say</h3>
        <div className="review-boxes">
          <div className="review">
            <p>"I found the perfect Math tutor in minutes!"</p>
            <span>- Ananya</span>
          </div>
          <div className="review">
            <p>"The scheduling feature is super convenient."</p>
            <span>- Rahul</span>
          </div>
          <div className="review">
            <p>"High-quality tutors and very affordable."</p>
            <span>- Sneha</span>
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
