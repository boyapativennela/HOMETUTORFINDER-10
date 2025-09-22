import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewStudentsAdmin.css";

const ViewStudentsAdmin = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:8082/api/auth/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student.id);
    setFormData({
      name: student.name,
      email: student.email,
      role: student.role,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:8082/api/auth/update/${id}`, formData);
      setEditingStudent(null);
      fetchStudents();
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`http://localhost:8082/api/auth/delete/${id}`);
        fetchStudents();
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  return (
    <div className="students-container">
      <h2>💜Student Management 💜</h2>
      <table className="students-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>
                {editingStudent === student.id ? (
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                ) : (
                  student.email
                )}
              </td>
              <td>
                {editingStudent === student.id ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                ) : (
                  student.name
                )}
              </td>
              <td>
                {editingStudent === student.id ? (
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  student.role
                )}
              </td>
              <td>
                {editingStudent === student.id ? (
                  <>
                    <button
                      className="save-btn"
                      onClick={() => handleUpdate(student.id)}
                    >
                      Save
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => setEditingStudent(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(student)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewStudentsAdmin;