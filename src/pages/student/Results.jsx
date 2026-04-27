// src/pages/student/Results.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StudentNav from "../../components/student/StudentNav";

const API_BASE = "https://30backend-production.up.railway.app"; // 😏 your local backend

export default function Results() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  // 💋 Fetch from backend
  useEffect(() => {
    fetch(`${API_BASE}/api/results`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch results");
        return res.json();
      })
      .then((data) => {
        setResults(data);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load results. Check backend.");
        setResults([]);
      });
  }, []);

  // 😏 Error state
  if (error) {
    return (
      <div className="page-wrapper">
        <StudentNav />
        <main className="main-content">
          <div className="page-header">
            <h1>My Results</h1>
          </div>
          <div className="empty-state">
            <h3>{error}</h3>
          </div>
        </main>
      </div>
    );
  }

  // 😌 No results state
  if (results.length === 0) {
    return (
      <div className="page-wrapper">
        <StudentNav />
        <main className="main-content">
          <div className="page-header">
            <h1>My Results</h1>
          </div>
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No Results Yet</h3>
            <p>
              Complete an assessment to see your personalized career
              recommendations.
            </p>
            <Link to="/assessments" className="btn-primary">
              Take an Assessment
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // 💋 Results display
  return (
    <div className="page-wrapper">
      <StudentNav />
      <main className="main-content">
        <div className="page-header">
          <h1>My Results</h1>
          <p>Your personalized career recommendations</p>
        </div>

        {results.map((result) => (
          <div key={result.id} className="result-block">
            <div className="result-header">
              <span className="result-icon">📊</span>
              <div>
                <h2>
                  Assessment:{" "}
                  {result.assessment?.title || "Unknown Assessment"}
                </h2>

                <span className="result-date">
                  Score: {result.totalScore ?? "N/A"}
                </span>
              </div>
            </div>

            <div className="recommendations-section">
              <h3>Recommendation</h3>
              <p>
                {result.recommendation
                  ? result.recommendation
                  : "No recommendation available"}
              </p>
            </div>
          </div>
        ))}

        <div className="results-cta">
          <Link to="/careers" className="btn-secondary">
            Explore Career Library
          </Link>
          <Link to="/assessments" className="btn-primary">
            Take More Assessments
          </Link>
        </div>
      </main>
    </div>
  );
}