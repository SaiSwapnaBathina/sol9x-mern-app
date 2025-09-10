// import React, { useEffect, useState } from "react";
// import api from "../services/api";
// import useAuth from "../hooks/useAuth";
// import "../styles/StudentDashboard.css";

// const StudentDashboard = () => {
//   const { user, logout } = useAuth();
//   const [profile, setProfile] = useState(null);
//   const [form, setForm] = useState({ name: "", email: "", course: "" });
//   const [editing, setEditing] = useState(false);
//   const [message, setMessage] = useState("");

//   const fetchProfile = async () => {
//     try {
//       const res = await api.get("/students/me/profile");
//       setProfile(res.data);
//       setForm({
//         name: res.data.name || "",
//         email: res.data.email || "",
//         course: res.data.course || "",
//       });
//     } catch (err) {
//       setMessage("❌ Failed to load profile");
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await api.put("/students/me/profile", form);
//       setMessage("✅ Profile updated successfully");
//       setEditing(false);
//       fetchProfile(); // refresh data
//     } catch {
//       setMessage("❌ Profile update failed");
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   return (
//     <div className="student-dashboard">
//       <div className="student-header">
//         <h2>Student Dashboard</h2>
//         <button className="logout-btn" onClick={logout}>Logout</button>
//       </div>

//       {profile ? (
//         <div className="student-card">
//           <h3>Welcome, {profile.name || "Student"} 👋</h3>
//           <p><strong>Email:</strong> {profile.email || "N/A"}</p>
//           <p><strong>Course:</strong> {profile.course || "Mern FullStack"}</p>
//           <p><strong>Enrolled On:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>

//           <button className="edit-btn" onClick={() => setEditing(true)}>Edit Profile</button>
//         </div>
//       ) : (
//         <p>Loading profile...</p>
//       )}

//       {editing && (
//         <form className="student-form" onSubmit={handleUpdate}>
//           <h3>Edit Profile</h3>

//           <label htmlFor="name">Name</label>
//           <input
//             id="name"
//             name="name"
//             type="text"
//             value={form.name}
//             onChange={handleChange}
//             required
//           />

//           <label htmlFor="email">Email</label>
//           <input
//             id="email"
//             name="email"
//             type="email"
//             value={form.email}
//             onChange={handleChange}
//             required
//           />

//           <label htmlFor="course">Course</label>
//           <input
//             id="course"
//             name="course"
//             type="text"
//             value={form.course}
//             onChange={handleChange}
//             required
//           />

//           <button type="submit">Save Changes</button>
//         </form>
//       )}

//       {message && <p className="status-msg">{message}</p>}
//     </div>
//   );
// };

// export default StudentDashboard;
import React, { useEffect, useState } from "react";
import api from "../services/api";
import useAuth from "../hooks/useAuth";
import "../styles/StudentDashboard.css";

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", course: "" });
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch student profile from backend
  const fetchProfile = async () => {
    try {
      const res = await api.get("/students/me/profile");
      setProfile(res.data);
      setForm({
        name: res.data.name || "",
        email: res.data.email || "",
        course: res.data.course || "",
      });
    } catch (err) {
      setMessage("❌ Failed to load profile");
    }
  };

  // Handle input changes in edit form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Update profile including course
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put("/students/me/profile", form); // send updated form including course
      setMessage("✅ Profile updated successfully");
      setEditing(false);
      setProfile({ ...profile, ...form }); // update UI immediately without refetch
    } catch (err) {
      console.error(err);
      setMessage("❌ Profile update failed");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="student-dashboard">
      <div className="student-header">
        <h2>Student Dashboard</h2>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>

      {profile ? (
        <div className="student-card">
          <h3>Welcome, {profile.name || "Student"} 👋</h3>
          <p><strong>Email:</strong> {profile.email || "N/A"}</p>
          <p><strong>Course:</strong> {profile.course || "MERN Bootcamp"}</p>
          <p><strong>Enrolled On:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>

          <button className="edit-btn" onClick={() => setEditing(true)}>Edit Profile</button>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}

      {editing && (
        <form className="student-form" onSubmit={handleUpdate}>
          <h3>Edit Profile</h3>

          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="course">Course</label>
          <input
            id="course"
            name="course"
            type="text"
            value={form.course}
            onChange={handleChange}
            required
          />

          <button type="submit">Save Changes</button>
        </form>
      )}

      {message && <p className="status-msg">{message}</p>}
    </div>
  );
};

export default StudentDashboard;
