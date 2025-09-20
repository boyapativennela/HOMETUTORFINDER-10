import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import "./FindTutor.css";

const FindTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [bookingIds, setBookingIds] = useState([]);

  const student = JSON.parse(localStorage.getItem("user"));
  const studentId = student?.id;

  // Fetch all tutors
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/tutors/profile/all`);
        setTutors(res.data);
      } catch (err) {
        console.error("Failed to fetch tutors:", err);
        alert("Error fetching tutors!");
      } finally {
        setLoading(false);
      }
    };
    fetchTutors();
  }, []);

  // Book session
  const bookSession = async (tutor) => {
    if (bookingIds.includes(tutor.id)) return; // prevent double click
    if (tutor.userId === studentId) {
      alert("You cannot book yourself!");
      return;
    }

    setBookingIds([...bookingIds, tutor.id]);

    try {
      await axios.post(`${API_BASE_URL}/bookings/book`, {
        studentId,
        tutorId: tutor.id,
        status: "pending",
      });
      alert(`Booking request sent to ${tutor.name}`);
      // Stay on same page
    } catch (err) {
      console.error(err);
      alert("Failed to book session!");
    } finally {
      setBookingIds((prev) => prev.filter((id) => id !== tutor.id));
    }
  };

  // Filter tutors dynamically
  const filteredTutors = tutors.filter((tutor) => {
    const f = filter.toLowerCase();
    return (
      (tutor.name && tutor.name.toLowerCase().includes(f)) ||
      (tutor.email && tutor.email.toLowerCase().includes(f)) ||
      (tutor.subjects && tutor.subjects.toLowerCase().includes(f)) ||
      (tutor.experience && tutor.experience.toString().includes(f)) ||
      (tutor.location && tutor.location.toLowerCase().includes(f)) ||
      (tutor.hourlyRate && tutor.hourlyRate.toString().includes(f)) ||
      (tutor.availability && tutor.availability.toLowerCase().includes(f))
    );
  });

  if (loading) return <p>Loading tutors...</p>;

  return (
    <div className="find-tutors-page">
      <h2>Available Tutors</h2>

      <input
        type="text"
        placeholder="Search by name, email, subject, experience, location, rate, or availability..."
        className="filter-input"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <div className="tutor-list">
        {filteredTutors.length === 0 && <p>No tutors found.</p>}

        {filteredTutors.map((tutor) => (
          <div key={tutor.id} className="tutor-card">
            <h3>{tutor.name}</h3>
            <p>{tutor.email}</p>
            <p>
              <strong>Subjects:</strong> {tutor.subjects}
            </p>
            <p>
              <strong>Bio:</strong>{" "}
              {tutor.bio?.length > 100 ? `${tutor.bio.slice(0, 100)}...` : tutor.bio}
            </p>
            <p>
              <strong>Experience:</strong> {tutor.experience} years
            </p>
            <p>
              <strong>Location:</strong> {tutor.location}
            </p>
            <p>
            <strong>Rate:</strong> ₹{tutor.hourly_rate}
            </p>

            <p>
              <strong>Availability:</strong> {tutor.availability}
            </p>
            <button
              onClick={() => bookSession(tutor)}
              disabled={tutor.userId === studentId || bookingIds.includes(tutor.id)}
            >
              {tutor.userId === studentId
                ? "Cannot book yourself"
                : bookingIds.includes(tutor.id)
                ? "Booking..."
                : "Book Session"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindTutors;