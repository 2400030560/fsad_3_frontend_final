// src/pages/admin/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔥 Call backend
      const response = await fetch("https://30backend-production.up.railway.app/api/users");

      const users = await response.json();

      // Find admin user
      const admin = users.find(
        (u) =>
          u.email === email &&
          u.role === "ADMIN"
      );

      if (admin && password === "admin123") {
        loginAdmin(email, password); // keep your existing context logic
        navigate("/admin/dashboard");
      } else {
        setError("Invalid credentials. Use admin@careerapp.com / admin123");
      }
    } catch (err) {
      setError("Server error. Make sure backend is running.");
    }
  };

  return (
    <div className="auth-page auth-page-admin">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">⚙️</div>
          <h1>Admin Portal</h1>
          <p>CareerCompass management dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@careerapp.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          {error && <div className="error-msg">{error}</div>}
          <button type="submit" className="btn-primary btn-full">
            Admin Sign In
          </button>
        </form>
        <div className="auth-footer">
          <p className="demo-hint">
            Demo: <strong>admin@careerapp.com</strong> / <strong>admin123</strong>
          </p>
          <Link to="/login" className="alt-link">
            ← Student Login
          </Link>
        </div>
      </div>
    </div>
  );
}