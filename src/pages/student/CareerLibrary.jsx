// src/pages/student/CareerLibrary.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import StudentNav from "../../components/student/StudentNav";
import { careers } from "../../data/mockData";

const categories = ["All", ...new Set(careers.map((c) => c.category))];

export default function CareerLibrary() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = careers.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || c.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="page-wrapper">
      <StudentNav />
      <main className="main-content">
        <div className="page-header">
          <h1>Career Library</h1>
          <p>Explore {careers.length} career paths across various fields</p>
        </div>

        <div className="filter-bar">
          <input
            className="search-input"
            type="text"
            placeholder="🔍 Search careers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="category-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`cat-tab ${category === cat ? "active" : ""}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="career-grid">
          {filtered.map((career) => (
            <Link
              key={career.id}
              to={`/careers/${career.id}`}
              className="career-card"
            >
              <div className="career-icon">{career.icon}</div>
              <div className="career-cat-tag">{career.category}</div>
              <h3 className="career-title">{career.title}</h3>
              <p className="career-desc">{career.description}</p>
              <div className="career-meta">
                <span className="salary-tag">💰 {career.salary}</span>
                <span className={`outlook-tag outlook-${career.outlook.toLowerCase()}`}>
                  {career.outlook} Outlook
                </span>
              </div>
              <div className="skill-chips">
                {career.skills.slice(0, 3).map((s) => (
                  <span key={s} className="chip">{s}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <p>No careers found matching your search.</p>
          </div>
        )}
      </main>
    </div>
  );
}
