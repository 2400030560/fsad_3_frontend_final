// src/pages/admin/ManageAssessments.jsx
import React, { useState } from "react";
import AdminNav from "../../components/admin/AdminNav";
import { assessments as initialAssessments } from "../../data/mockData";

export default function ManageAssessments() {
  const [assessments, setAssessments] = useState(initialAssessments);
  const [expanded, setExpanded] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [questionForm, setQuestionForm] = useState({ text: "", options: [] });

  const toggleExpand = (id) => setExpanded(expanded === id ? null : id);

  const saveQuestion = (assessmentId) => {
    setAssessments((prev) =>
      prev.map((a) => {
        if (a.id !== assessmentId) return a;
        const questions = editingQuestion.isNew
          ? [...a.questions, { ...questionForm, id: a.questions.length + 1 }]
          : a.questions.map((q) =>
              q.id === editingQuestion.id ? { ...q, ...questionForm } : q
            );
        return { ...a, questions };
      })
    );
    setEditingQuestion(null);
  };

  const deleteQuestion = (assessmentId, questionId) => {
    setAssessments((prev) =>
      prev.map((a) =>
        a.id === assessmentId
          ? { ...a, questions: a.questions.filter((q) => q.id !== questionId) }
          : a
      )
    );
  };

  const startEditQuestion = (q) => {
    setQuestionForm({ text: q.text, options: [...q.options] });
    setEditingQuestion({ id: q.id, isNew: false });
  };

  const startAddQuestion = (assessmentId) => {
    setQuestionForm({
      text: "",
      options: [
        { label: "", trait: "" },
        { label: "", trait: "" },
        { label: "", trait: "" },
        { label: "", trait: "" },
      ],
    });
    setEditingQuestion({ assessmentId, isNew: true });
  };

  return (
    <div className="page-wrapper">
      <AdminNav />
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1>Manage Assessments</h1>
            <p>View and edit assessment questions</p>
          </div>
        </div>

        {assessments.map((a) => (
          <div key={a.id} className="accordion-block">
            <div
              className="accordion-header"
              onClick={() => toggleExpand(a.id)}
            >
              <div className="accordion-title">
                <span>{a.icon}</span>
                <div>
                  <strong>{a.title}</strong>
                  <span className="assess-meta">
                    {a.questions.length} questions · {a.duration}
                  </span>
                </div>
              </div>
              <span className="accordion-arrow">{expanded === a.id ? "▲" : "▼"}</span>
            </div>

            {expanded === a.id && (
              <div className="accordion-body">
                <p className="assess-desc">{a.description}</p>

                {a.questions.map((q) => (
                  <div key={q.id} className="question-block">
                    <div className="question-row">
                      <div className="question-text">
                        <span className="q-num">Q{q.id}</span>
                        {q.text}
                      </div>
                      <div className="question-actions">
                        <button
                          className="btn-secondary btn-sm"
                          onClick={() => {
                            startEditQuestion(q);
                            setEditingQuestion({ id: q.id, assessmentId: a.id, isNew: false });
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-danger btn-sm"
                          onClick={() => deleteQuestion(a.id, q.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="options-preview">
                      {q.options.map((opt, i) => (
                        <span key={i} className="chip">
                          {opt.label} <em>({opt.trait})</em>
                        </span>
                      ))}
                    </div>

                    {editingQuestion?.id === q.id && editingQuestion?.assessmentId === a.id && (
                      <div className="inline-edit">
                        <div className="form-group">
                          <label>Question Text</label>
                          <input
                            value={questionForm.text}
                            onChange={(e) =>
                              setQuestionForm((p) => ({ ...p, text: e.target.value }))
                            }
                          />
                        </div>
                        {questionForm.options.map((opt, idx) => (
                          <div className="option-edit-row" key={idx}>
                            <input
                              placeholder="Option label"
                              value={opt.label}
                              onChange={(e) => {
                                const opts = [...questionForm.options];
                                opts[idx] = { ...opts[idx], label: e.target.value };
                                setQuestionForm((p) => ({ ...p, options: opts }));
                              }}
                            />
                            <input
                              placeholder="Trait"
                              value={opt.trait}
                              onChange={(e) => {
                                const opts = [...questionForm.options];
                                opts[idx] = { ...opts[idx], trait: e.target.value };
                                setQuestionForm((p) => ({ ...p, options: opts }));
                              }}
                            />
                          </div>
                        ))}
                        <div className="edit-actions">
                          <button
                            className="btn-secondary btn-sm"
                            onClick={() => setEditingQuestion(null)}
                          >
                            Cancel
                          </button>
                          <button
                            className="btn-primary btn-sm"
                            onClick={() => saveQuestion(a.id)}
                          >
                            Save Question
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                <button
                  className="btn-primary btn-sm add-question-btn"
                  onClick={() => startAddQuestion(a.id)}
                >
                  + Add Question
                </button>

                {editingQuestion?.isNew && editingQuestion?.assessmentId === a.id && (
                  <div className="inline-edit">
                    <div className="form-group">
                      <label>New Question Text</label>
                      <input
                        value={questionForm.text}
                        onChange={(e) =>
                          setQuestionForm((p) => ({ ...p, text: e.target.value }))
                        }
                      />
                    </div>
                    {questionForm.options.map((opt, idx) => (
                      <div className="option-edit-row" key={idx}>
                        <input
                          placeholder={`Option ${idx + 1} label`}
                          value={opt.label}
                          onChange={(e) => {
                            const opts = [...questionForm.options];
                            opts[idx] = { ...opts[idx], label: e.target.value };
                            setQuestionForm((p) => ({ ...p, options: opts }));
                          }}
                        />
                        <input
                          placeholder="Trait"
                          value={opt.trait}
                          onChange={(e) => {
                            const opts = [...questionForm.options];
                            opts[idx] = { ...opts[idx], trait: e.target.value };
                            setQuestionForm((p) => ({ ...p, options: opts }));
                          }}
                        />
                      </div>
                    ))}
                    <div className="edit-actions">
                      <button
                        className="btn-secondary btn-sm"
                        onClick={() => setEditingQuestion(null)}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn-primary btn-sm"
                        onClick={() => saveQuestion(a.id)}
                      >
                        Add Question
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}
