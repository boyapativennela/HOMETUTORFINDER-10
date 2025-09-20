import React, { useEffect, useState } from "react";
import "./ViewTutorAdmin.css"; // ✅ reuse CSS

const ViewTutorAdmin = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch tutors
  const fetchTutors = () => {
    fetch("http://localhost:8082/api/tutors/profile/all")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch tutors");
        return res.json();
      })
      .then((data) => {
        setTutors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tutors:", err);
        setError("❌ Could not load tutors.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  // ✅ Delete Tutor
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tutor?")) return;

    try {
      const res = await fetch(`http://localhost:8082/api/tutors/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTutors(tutors.filter((t) => t.id !== id));
        alert("Tutor deleted successfully ✅");
      } else {
        alert("❌ Failed to delete tutor");
      }
    } catch (error) {
      console.error("Error deleting tutor:", error);
      alert("Server error ❌");
    }
  };

  // ✅ Edit Tutor
  const handleEdit = (id) => {
    window.location.href = `/admin/edit-tutor/${id}`;
  };

  return (
    <div className="tutors-container">
      <h2 className="title">📚 All Tutors</h2>

      {loading ? (
        <p className="loading">⏳ Loading tutors...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="table-wrapper">
          <table className="tutors-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Qualification</th>
                <th>Subjects</th>
                <th>Experience</th>
                <th>Hourly Rate</th>
                <th>Location</th>
                <th>Availability</th>
                <th>Actions</th> {/* ✅ Ensure visible */}
              </tr>
            </thead>
            <tbody>
              {tutors.length > 0 ? (
                tutors.map((tutor) => (
                  <tr key={tutor.id}>
                    <td>{tutor.id}</td>
                    <td>{tutor.name}</td>
                    <td>{tutor.email}</td>
                    <td>{tutor.phone || "-"}</td>
                    <td>{tutor.qualification || "-"}</td>
                    <td>{tutor.subjects || "-"}</td>
                    <td>{tutor.experience || "-"}</td>
                    <td>
                      {tutor.hourly_rate ? `₹${tutor.hourly_rate}` : "-"}
                    </td>
                    <td>{tutor.location || "-"}</td>
                    <td>{tutor.availability || "-"}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(tutor.id)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(tutor.id)}
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" style={{ textAlign: "center", padding: "20px" }}>
                    ❌ No tutors found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewTutorAdmin;