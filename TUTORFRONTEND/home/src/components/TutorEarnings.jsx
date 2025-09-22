import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./TutorEarnings.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TutorEarnings = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  // Get logged-in user
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser || null);
  }, []);

  // Fetch bookings and calculate earnings
  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/bookings/tutor/${user.id}`);
        const data = Array.isArray(res.data) ? res.data : [];

        // ✅ Filter accepted bookings
        const accepted = data.filter((b) => b.status === "accepted");

        setAcceptedCount(accepted.length);

        // ✅ Calculate total earnings based on tutor.hourly_rate
        const earnings = accepted.reduce((sum, b) => {
          return sum + (b.tutor?.hourly_rate || 0);
        }, 0);

        setTotalEarnings(earnings);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
        alert("Could not fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  // Chart data
  const chartData = {
    labels: ["Accepted Sessions", "Total Earnings"],
    datasets: [
      {
        label: "Tutor Stats",
        data: [acceptedCount, totalEarnings],
        backgroundColor: [
          "rgba(138, 43, 226, 0.7)", // BTS purple
          "rgba(255, 105, 180, 0.7)", // Pink
        ],
      },
    ],
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (!user) return <p className="login-msg">Please login first.</p>;

  return (
    <div className="earnings-container">
      <h2>Your Earnings</h2>
      <div className="total-earnings">
        Total Earnings: <span>₹{totalEarnings}</span>
      </div>
      <div className="chart-container">
        <Bar data={chartData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default TutorEarnings;