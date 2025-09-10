import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../styles/AuthForm.css";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", formData);
      const { token, role } = res.data;

      login({ token, role });

      // role-based redirect
      role === "admin"
        ? navigate("/admin/dashboard")
        : navigate("/student/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-form-title">Login</h2>
      {error && <p className="auth-error-msg">{error}</p>}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-form-group">
          <label>Email</label>
          <input
            className="auth-form-input"
            type="email"
            name="email"
            value={formData.email}
            required
            onChange={handleChange}
          />
        </div>

        <div className="auth-form-group">
          <label>Password</label>
          <input
            className="auth-form-input"
            type="password"
            name="password"
            value={formData.password}
            required
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="auth-form-button">Login</button>
      </form>

      <p className="auth-form-footer">
        Don’t have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
};

export default LoginPage;
// Trigger rebuild for Vercel