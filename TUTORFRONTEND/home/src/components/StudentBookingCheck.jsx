import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import "./StudentBookingCheck.css";

const StudentBookingCheck = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser || null);
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/bookings/student/${user.id}`);
        setBookings(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
        alert("Could not fetch bookings. Make sure backend is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please login first.</p>;

  return (
    <div className="student-bookings-container">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Tutor Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.tutorName}</td>
                <td>{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentBookingCheck;
