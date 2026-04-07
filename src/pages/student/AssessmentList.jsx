// src/pages/student/AssessmentList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StudentNav from "../../components/student/StudentNav";
// ❌ REMOVE mockData import
// import { assessments } from "../../data/mockData";
import { useAssessment } from "../../context/AssessmentContext";

export default function AssessmentList() {
  const { results } = useAssessment();

  // ✅ ADD state
  const [assessments, setAssessments] = useState([]);

  // ✅ FETCH from backend
  useEffect(() => {
    fetch("https://fsad30project-production.up.railway.app/api/assessments")
      .then((res) => res.json())
      .then((data) => setAssessments(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="page-wrapper">
      <StudentNav />
      <main className="main-content">
        <div className="page-header">
          <h1>Assessments</h1>
          <p>Complete assessments to get personalized career recommendations</p>
        </div>

        <div className="assessment-grid">
          {assessments.map((a) => {
            const done = results.find((r) => r.assessmentId === a.id);
            return (
              <div key={a.id} className={`assessment-card ${done ? "done" : ""}`}>
                {/* ⚠️ icon might not exist from backend */}
                <div className="assessment-icon">📋</div>

                {done && <div className="done-badge">✓ Completed</div>}

                <h3>{a.title}</h3>
                <p>{a.description}</p>

                <div className="assessment-meta">
                  <span>⏱ 10 mins</span>
                  <span>❓ Questions</span>
                </div>

                <div className="assessment-actions">
                  <Link
                    to={`/assessments/${a.id}`}
                    className="btn-primary"
                  >
                    {done ? "Retake" : "Start Assessment"}
                  </Link>

                  {done && (
                    <Link to="/results" className="btn-secondary">
                      View Results
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}