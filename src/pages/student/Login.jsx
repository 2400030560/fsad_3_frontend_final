// src/pages/student/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginStudent } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔥 fetch users from backend (FIXED URL)
      const response = await fetch("https://fsad30project-production.up.railway.app/api/users");
      const users = await response.json();

      const student = users.find(
        (u) => u.email === email && u.role === "STUDENT"
      );

      if (student && password === "pass123") {
        loginStudent(email, password);
        navigate("/dashboard");
      } else {
        setError("Invalid email or password. Try alex@student.com / pass123");
      }
    } catch (err) {
      setError("Server error. Make sure backend is running.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">🧭</div>
          <h1>Career Assessment</h1>
          <p>Discover your perfect career path</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@email.com"
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
            Sign In
          </button>
        </form>

        <div className="auth-footer">
          <p className="demo-hint">
            Demo: <strong>alex@student.com</strong> / <strong>pass123</strong>
          </p>

          <Link to="/admin/login" className="alt-link">
            Admin Login →
          </Link>
        </div>
      </div>
    </div>
  );
}