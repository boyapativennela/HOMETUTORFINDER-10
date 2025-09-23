import React, { useEffect, useState } from "react";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
import "./ManageScheduleTutor.css";

const ManageScheduleTutor = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Get logged-in user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser || null);
  }, []);

  // Fetch bookings when user exists
  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/bookings/tutor/${user.id}`);
        setBookings(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
        alert("Could not fetch bookings. Make sure backend is running and CORS is enabled.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  // Handle Accept / Decline
  const handleStatusChange = async (bookingId, status) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/bookings/${bookingId}`, { status });
      if (res.data) {
        setBookings((prev) =>
          prev.map((b) => (b.id === bookingId ? res.data : b))
        );
      }
    } catch (err) {
      console.error("Failed to update booking", err);
      alert("Could not update booking status.");
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (!user) return <p className="login-msg">Please login first.</p>;

  return (
    <div className="schedule-container">
      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Student Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.studentName}</td>
                <td>{b.studentEmail}</td>
                <td>{b.studentPhone}</td>
                <td>{b.status}</td>
                <td>
                  {b.status === "pending" ? (
                    <>
                      <button
                        className="accept-btn"
                        onClick={() => handleStatusChange(b.id, "accepted")}
                      >
                        Accept
                      </button>
                      <button
                        className="decline-btn"
                        onClick={() => handleStatusChange(b.id, "declined")}
                      >
                        Decline
                      </button>
                    </>
                  ) : (
                    <span>{b.status}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageScheduleTutor;