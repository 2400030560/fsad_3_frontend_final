// src/pages/student/CareerDetail.jsx
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import StudentNav from "../../components/student/StudentNav";
import { careers, assessments } from "../../data/mockData";

export default function CareerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const career = careers.find((c) => c.id === Number(id));

  if (!career) {
    return (
      <div className="page-wrapper">
        <StudentNav />
        <main className="main-content">
          <div className="empty-state">
            <div className="empty-icon">❌</div>
            <p>Career not found.</p>
            <Link to="/careers" className="btn-primary">Back to Library</Link>
          </div>
        </main>
      </div>
    );
  }

  const specificAssessment = assessments.find((a) => a.careerId === career.id);

  return (
    <div className="page-wrapper">
      <StudentNav />
      <main className="main-content">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="detail-hero">
          <div className="detail-icon">{career.icon}</div>
          <div className="detail-info">
            <span className="career-cat-tag">{career.category}</span>
            <h1>{career.title}</h1>
            <p>{career.description}</p>
          </div>
        </div>

        <div className="detail-grid">
          <div className="detail-card">
            <h3>💰 Salary Range</h3>
            <p className="detail-value">{career.salary}</p>
          </div>
          <div className="detail-card">
            <h3>📈 Job Outlook</h3>
            <p className={`detail-value outlook-${career.outlook.toLowerCase()}`}>
              {career.outlook}
            </p>
          </div>
          <div className="detail-card">
            <h3>🎯 Key Traits</h3>
            <div className="chip-list">
              {career.traits.map((t) => (
                <span key={t} className="chip chip-accent">{t}</span>
              ))}
            </div>
          </div>
          <div className="detail-card">
            <h3>⚡ Core Skills</h3>
            <div className="skill-list">
              {career.skills.map((s) => (
                <div key={s} className="skill-item">
                  <div className="skill-dot"></div>
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="cta-section">
          {specificAssessment ? (
            <div className="cta-card">
              <h3>🎯 Career-Specific Assessment Available!</h3>
              <p>
                Take the <strong>{specificAssessment.title}</strong> to see if this career
                is the right fit for you.
              </p>
              <Link to={`/assessments/${specificAssessment.id}`} className="btn-primary">
                Take Assessment →
              </Link>
            </div>
          ) : (
            <div className="cta-card">
              <h3>🧩 Discover Your Fit</h3>
              <p>
                Take our general personality and skills assessments to see how well you
                match with {career.title}.
              </p>
              <Link to="/assessments" className="btn-primary">
                View Assessments →
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
