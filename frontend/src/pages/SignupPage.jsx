// import React, { useState } from "react";
// import api from "../services/api";
// import { useNavigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
// import "../styles/AuthForm.css";

// const SignupPage = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "student"
//   });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await api.post("/auth/signup", formData);
//       const { token, role } = res.data;

//       login({ token, role });
//       navigate(`/${role}/dashboard`);
//     } catch (err) {
//       setError(err.response?.data?.message || "Signup failed");
//     }
//   };

//   return (
//     <div className="auth-form-container">
//       <h2>Sign Up</h2>
//       {error && <p className="error-msg">{error}</p>}

//       <form onSubmit={handleSubmit} className="auth-form">
//         <label>Name</label>
//         <input type="text" name="name" required value={formData.name} onChange={handleChange} />

//         <label>Email</label>
//         <input type="email" name="email" required value={formData.email} onChange={handleChange} />

//         <label>Password</label>
//         <input type="password" name="password" required value={formData.password} onChange={handleChange} />

//         <label>Role</label>
//         <select name="role" value={formData.role} onChange={handleChange}>
//           <option value="student">Student</option>
//           <option value="admin">Admin</option>
//         </select>

//         <button type="submit">Sign Up</button>
//       </form>

//       <p>Already have an account? <a href="/login">Login</a></p>
//     </div>
//   );
// };

// export default SignupPage;


import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../styles/AuthForm.css";

const SignupPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    course: "" // default course
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/signup", formData);
      const { token, role } = res.data;

      login({ token, role });
      navigate(`/${role}/dashboard`);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Sign Up</h2>
      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleSubmit} className="auth-form">
        <label>Name</label>
        <input type="text" name="name" required value={formData.name} onChange={handleChange} />

        <label>Email</label>
        <input type="email" name="email" required value={formData.email} onChange={handleChange} />

        <label>Password</label>
        <input type="password" name="password" required value={formData.password} onChange={handleChange} />

        <label>Role</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        {/* New Course Field */}
        {formData.role === "student" && (
          <>
            <label>Course</label>
            <input
              type="text"
              name="course"
              required
              value={formData.course}
              onChange={handleChange}
            />
          </>
        )}

        <button type="submit">Sign Up</button>
      </form>

      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default SignupPage;

