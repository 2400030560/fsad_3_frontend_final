// src/pages/student/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (trimmedEmail === "alex@student.com" && password === "pass123") {
      navigate("/dashboard");
    } else if (trimmedEmail === "meghana@gmail.com" && password === "123456") {
      navigate("/dashboard");
    } else if (trimmedEmail === "admin@careerapp.com" && password === "admin123") {
      navigate("/admin");
    } else {
      setError("Invalid email or password");
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
            Student: <strong>alex@student.com</strong> / <strong>pass123</strong><br />
            Student: <strong>meghana@gmail.com</strong> / <strong>123456</strong><br />
            Admin: <strong>admin@careerapp.com</strong> / <strong>admin123</strong>
          </p>

          <p>
            Don't have an account?{" "}
            <Link to="/register" className="alt-link">
              Create Account →
            </Link>
          </p>

          <Link to="/admin/login" className="alt-link">
            Admin Login →
          </Link>
        </div>
      </div>
    </div>
  );
}