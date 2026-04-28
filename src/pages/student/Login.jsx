// src/pages/student/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const { loginStudent } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://30backend-production.up.railway.app/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Users:", users);
    console.log("Entered:", email, password);

    const student = users.find(
      (u) => u.email.trim() === email.trim() && u.password === password
    );

    if (student) {
      loginStudent(email, password);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
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