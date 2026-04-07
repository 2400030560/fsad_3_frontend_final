// src/components/admin/AdminNav.jsx
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminNav() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const links = [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/careers", label: "Manage Careers" },
    { to: "/admin/assessments", label: "Manage Assessments" },
  ];

  return (
    <nav className="admin-nav">
      <div className="nav-brand">
        <span className="brand-icon">⚙️</span>
        <span className="brand-name">Admin Panel</span>
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
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}
