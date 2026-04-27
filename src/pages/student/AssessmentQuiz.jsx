// src/pages/student/AssessmentQuiz.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StudentNav from "../../components/student/StudentNav";

export default function AssessmentQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState(null);

  useEffect(() => {
    fetch("https://30backend-production.up.railway.app/api/assessments")
      .then(res => res.json())
      .then(data => {
        const found = data.find(a => a.id === parseInt(id));
        setAssessment(found);
      });
  }, [id]);

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  if (!assessment) {
    return (
      <div className="page-wrapper">
        <StudentNav />
        <main className="main-content">
          <div className="empty-state">
            <div className="empty-icon">❌</div>
            <p>Assessment not found.</p>
          </div>
        </main>
      </div>
    );
  }

  // ✅ Temporary questions
  const questions = [
    {
      text: "Do you enjoy problem solving?",
      options: [
        { label: "Yes", score: 20 },
        { label: "Sometimes", score: 10 },
        { label: "No", score: 5 }
      ]
    },
    {
      text: "Do you like creativity?",
      options: [
        { label: "Yes", score: 20 },
        { label: "Sometimes", score: 10 },
        { label: "No", score: 5 }
      ]
    }
  ];

  const question = questions[current];
  const progress = (current / questions.length) * 100;

  const handleNext = async () => {
    if (selected === null) return;

    const newAnswers = [...answers, selected];

    if (current < questions.length - 1) {
      setAnswers(newAnswers);
      setCurrent(current + 1);
      setSelected(null);
    } else {
      const totalScore = newAnswers.reduce((sum, val) => sum + val, 0);

      try {
        await fetch("https://30backend-production.up.railway.app/api/results/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            totalScore: totalScore,
            assessment: {
              id: parseInt(id)
            },
            user: {
              id: 1
            }
          })
        });

        setSubmitted(true);

      } catch (err) {
        console.error("Error submitting result:", err);
      }
    }
  };

  if (submitted) {
    return (
      <div className="page-wrapper">
        <StudentNav />
        <main className="main-content">
          <div className="quiz-complete">
            <div className="complete-icon">🎉</div>
            <h2>Assessment Complete!</h2>
            <p>Your results have been saved.</p>
            <div className="complete-actions">
              <button className="btn-primary" onClick={() => navigate("/results")}>
                View My Results →
              </button>
              <button className="btn-secondary" onClick={() => navigate("/assessments")}>
                Back to Assessments
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <StudentNav />
      <main className="main-content">
        <div className="quiz-container">
          <div className="quiz-header">
            <h2>{assessment.title}</h2>
            <span className="question-count">
              Question {current + 1} of {questions.length}
            </span>
          </div>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>

          <div className="quiz-card">
            <h3 className="question-text">{question.text}</h3>

            <div className="options-list">
              {question.options.map((opt, idx) => (
                <button
                  key={idx}
                  className={`option-btn ${selected === opt.score ? "selected" : ""}`}
                  onClick={() => setSelected(opt.score)}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {opt.label}
                </button>
              ))}
            </div>

            <button
              className={`btn-primary btn-full next-btn ${selected === null ? "disabled" : ""}`}
              onClick={handleNext}
              disabled={selected === null}
            >
              {current === questions.length - 1
                ? "Submit Assessment ✓"
                : "Next Question →"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}