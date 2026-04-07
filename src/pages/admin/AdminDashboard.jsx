// src/pages/admin/AdminDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import AdminNav from "../../components/admin/AdminNav";
import { careers, assessments, studentCredentials } from "../../data/mockData";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Careers", value: careers.length, icon: "🗂️", color: "blue" },
    { label: "Total Assessments", value: assessments.length, icon: "🧩", color: "green" },
    { label: "Registered Students", value: studentCredentials.length, icon: "🎓", color: "purple" },
    { label: "Career Categories", value: new Set(careers.map((c) => c.category)).size, icon: "📊", color: "orange" },
  ];

  return (
    <div className="page-wrapper">
      <AdminNav />
      <main className="main-content">
        <div className="page-header">
          <h1>Admin Dashboard</h1>
          <p>Overview and quick management actions</p>
        </div>

        <div className="stats-grid">
          {stats.map((s) => (
            <div key={s.label} className={`stat-block stat-${s.color}`}>
              <div className="stat-block-icon">{s.icon}</div>
              <div className="stat-block-num">{s.value}</div>
              <div className="stat-block-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="admin-panels">
          <div className="admin-panel">
            <div className="panel-header">
              <h2>Recent Careers</h2>
              <Link to="/admin/careers" className="btn-secondary btn-sm">
                Manage All
              </Link>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Career</th>
                  <th>Category</th>
                  <th>Outlook</th>
                </tr>
              </thead>
              <tbody>
                {careers.slice(0, 4).map((c) => (
                  <tr key={c.id}>
                    <td>
                      {c.icon} {c.title}
                    </td>
                    <td>{c.category}</td>
                    <td>
                      <span className={`badge badge-${c.outlook.toLowerCase()}`}>
                        {c.outlook}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="admin-panel">
            <div className="panel-header">
              <h2>Assessment Tools</h2>
              <Link to="/admin/assessments" className="btn-secondary btn-sm">
                Manage All
              </Link>
            </div>
            {assessments.map((a) => (
              <div key={a.id} className="assess-row">
                <span className="assess-icon">{a.icon}</span>
                <div>
                  <strong>{a.title}</strong>
                  <span className="assess-meta">
                    {a.questions.length} questions · {a.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
