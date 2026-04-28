// src/pages/student/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    console.log("Sending:", trimmedEmail, password);

    try {
      const response = await fetch("https://30backend-production.up.railway.app/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: trimmedEmail,
          password
        })
      });

      console.log("Response:", response.status);

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error(err);
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
            Demo: <strong>alex@student.com</strong> / <strong>pass123</strong>
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