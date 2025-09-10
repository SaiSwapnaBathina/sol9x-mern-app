import React, { useEffect, useState } from "react";
import api from "../services/api";

import useAuth from "../hooks/useAuth";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", course: "" });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const token = user?.token;

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res.data);
    } catch (err) {
      setError("Failed to fetch students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.course) return;

    try {
      if (editingId) {
        await api.put(`/students/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await api.post("/students", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setForm({ name: "", email: "", course: "" });
      setEditingId(null);
      fetchStudents();
    } catch (err) {
      setError("Failed to save student");
    }
  };

  const handleEdit = (student) => {
    setForm({
      name: student.name,
      email: student.email,
      course: student.course,
    });
    setEditingId(student._id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchStudents();
    } catch {
      setError("Delete failed");
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        <h3>{editingId ? "Edit Student" : "Add Student"}</h3>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="text" name="course" placeholder="Course" value={form.course} onChange={handleChange} required />
        <button type="submit">{editingId ? "Update" : "Add"}</button>
      </form>

      {error && <p className="error-msg">{error}</p>}

      <table className="students-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Enrollment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.course}</td>
              <td>{new Date(s.enrollmentDate).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEdit(s)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(s._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
