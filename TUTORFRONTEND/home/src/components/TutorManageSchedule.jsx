import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const TutorManageSchedule = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get tutorProfile from localStorage
  const tutorProfile = JSON.parse(localStorage.getItem("tutorProfile"));
  const tutorProfileId = tutorProfile.id; // Use tutor profile id

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/bookings/tutor/${tutorProfileId}`);
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, status) => {
    try {
      await axios.put(`${API_BASE_URL}/bookings/${bookingId}`, { status });
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
      );
    } catch (err) {
      console.error("Failed to update booking", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div>
      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Student ID</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.studentId}</td>
                <td>{b.status}</td>
                <td>
                  {b.status === "pending" && (
                    <>
                      <button onClick={() => handleStatusChange(b.id, "accepted")}>
                        Accept
                      </button>
                      <button onClick={() => handleStatusChange(b.id, "declined")}>
                        Decline
                      </button>
                    </>
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

export default TutorManageSchedule;