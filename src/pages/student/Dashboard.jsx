// src/pages/student/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useAssessment } from "../../context/AssessmentContext";
import StudentNav from "../../components/student/StudentNav";
import { assessments, careers } from "../../data/mockData";

export default function Dashboard() {
  const { user } = useAuth();
  const { results } = useAssessment();

  const completedCount = results.length;
  const totalAssessments = assessments.length;

  return (
    <div className="page-wrapper">
      <StudentNav />
      <main className="main-content">
        <div className="dashboard-hero">
          <div className="hero-text">
            <h1>Welcome back, <span className="accent">{user?.name?.split(" ")[0]}</span> 👋</h1>
            <p>Continue your journey to finding the perfect career path.</p>
          </div>
          <div className="hero-stats">
            <div className="stat-card">
              <div className="stat-num">{completedCount}</div>
              <div className="stat-label">Assessments Done</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">{totalAssessments - completedCount}</div>
              <div className="stat-label">Remaining</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">{careers.length}</div>
              <div className="stat-label">Careers Available</div>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dash-section">
            <h2>Quick Actions</h2>
            <div className="action-cards">
              <Link to="/assessments" className="action-card action-blue">
                <div className="action-icon">🧩</div>
                <h3>Take Assessment</h3>
                <p>Evaluate your personality and skills</p>
              </Link>
              <Link to="/careers" className="action-card action-green">
                <div className="action-icon">🗂️</div>
                <h3>Explore Careers</h3>
                <p>Browse {careers.length} career paths</p>
              </Link>
              <Link to="/results" className="action-card action-purple">
                <div className="action-icon">📈</div>
                <h3>View Results</h3>
                <p>See your recommendations</p>
              </Link>
            </div>
          </div>

          <div className="dash-section">
            <h2>Assessment Progress</h2>
            <div className="progress-list">
              {assessments.map((a) => {
                const done = results.find((r) => r.assessmentId === a.id);
                return (
                  <div key={a.id} className="progress-item">
                    <span className="prog-icon">{a.icon}</span>
                    <div className="prog-info">
                      <strong>{a.title}</strong>
                      <span className={`prog-badge ${done ? "done" : "pending"}`}>
                        {done ? "Completed ✓" : "Pending"}
                      </span>
                    </div>
                    <Link
                      to={`/assessments/${a.id}`}
                      className={`prog-btn ${done ? "btn-secondary" : "btn-primary"}`}
                    >
                      {done ? "Retake" : "Start"}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
