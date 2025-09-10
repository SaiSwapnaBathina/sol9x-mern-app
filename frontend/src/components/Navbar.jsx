import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">SOL9X</Link>

      {user && (
        <div className="nav-links">
          {user.role === "admin" && <Link to="/admin/dashboard">Admin</Link>}
          {user.role === "student" && <Link to="/student/dashboard">Student</Link>}
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
