// src/components/student/StudentNav.jsx
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function StudentNav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/careers", label: "Career Library" },
    { to: "/assessments", label: "Assessments" },
    { to: "/results", label: "My Results" },
  ];

  return (
    <nav className="student-nav">
      <div className="nav-brand">
        <span className="brand-icon">🧭</span>
        <span className="brand-name">CareerCompass</span>
      </div>
      <div className="nav-links">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className={`nav-link ${location.pathname === l.to ? "active" : ""}`}
          >
            {l.label}
          </Link>
        ))}
      </div>
      <div className="nav-user">
        <span className="user-greeting">Hi, {user?.name?.split(" ")[0]}</span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
