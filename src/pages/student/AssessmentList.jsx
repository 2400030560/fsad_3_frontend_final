// src/pages/student/AssessmentList.jsx
import React, { useEffect, useState } from "react";
import StudentNav from "../../components/student/StudentNav";
import { useAssessment } from "../../context/AssessmentContext";

export default function AssessmentList() {
  const { results } = useAssessment();
  const [assessments, setAssessments] = useState([]);

  // ✅ FETCH assessments
  useEffect(() => {
    fetch("https://fsad30project-production.up.railway.app/api/assessments")
      .then((res) => res.json())
      .then((data) => setAssessments(data))
      .catch((err) => console.error(err));
  }, []);

  // 🔥 NEW FUNCTION (REAL FLOW)
  const handleStart = async (assessmentId) => {
    try {
      await fetch("https://fsad30project-production.up.railway.app/api/results/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          totalScore: Math.floor(Math.random() * 100) + 1
        })
      });

      // 👉 go to results page
      window.location.href = "/results";
    } catch (err) {
      console.error("Error submitting assessment:", err);
    }
  };

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
                <div className="assessment-icon">📋</div>

                {done && <div className="done-badge">✓ Completed</div>}

                <h3>{a.title}</h3>
                <p>{a.description}</p>

                <div className="assessment-meta">
                  <span>⏱ 10 mins</span>
                  <span>❓ Questions</span>
                </div>

                <div className="assessment-actions">
                  
                  {/* 🔥 CHANGED BUTTON */}
                  <button
                    className="btn-primary"
                    onClick={() => handleStart(a.id)}
                  >
                    {done ? "Retake" : "Start Assessment"}
                  </button>

                  {done && (
                    <button
                      className="btn-secondary"
                      onClick={() => (window.location.href = "/results")}
                    >
                      View Results
                    </button>
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