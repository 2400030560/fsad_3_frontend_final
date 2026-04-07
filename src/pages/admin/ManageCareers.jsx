// src/pages/admin/ManageCareers.jsx
import React, { useState } from "react";
import AdminNav from "../../components/admin/AdminNav";
import { careers as initialCareers } from "../../data/mockData";

const emptyCareer = {
  title: "",
  category: "",
  description: "",
  salary: "",
  skills: "",
  outlook: "Good",
  icon: "💼",
  traits: "",
};

export default function ManageCareers() {
  const [careers, setCareers] = useState(initialCareers);
  const [showModal, setShowModal] = useState(false);
  const [editCareer, setEditCareer] = useState(null);
  const [form, setForm] = useState(emptyCareer);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const openAdd = () => {
    setForm(emptyCareer);
    setEditCareer(null);
    setShowModal(true);
  };

  const openEdit = (career) => {
    setForm({
      ...career,
      skills: career.skills.join(", "),
      traits: career.traits.join(", "),
    });
    setEditCareer(career.id);
    setShowModal(true);
  };

  const handleSave = () => {
    const parsed = {
      ...form,
      skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
      traits: form.traits.split(",").map((t) => t.trim()).filter(Boolean),
    };
    if (editCareer) {
      setCareers((prev) =>
        prev.map((c) => (c.id === editCareer ? { ...parsed, id: editCareer } : c))
      );
    } else {
      const newId = Math.max(...careers.map((c) => c.id)) + 1;
      setCareers((prev) => [...prev, { ...parsed, id: newId }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setCareers((prev) => prev.filter((c) => c.id !== id));
    setConfirmDelete(null);
  };

  return (
    <div className="page-wrapper">
      <AdminNav />
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1>Manage Careers</h1>
            <p>Add, edit, or remove career entries</p>
          </div>
          <button className="btn-primary" onClick={openAdd}>
            + Add Career
          </button>
        </div>

        <div className="admin-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Icon</th>
                <th>Title</th>
                <th>Category</th>
                <th>Salary</th>
                <th>Outlook</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {careers.map((c) => (
                <tr key={c.id}>
                  <td>{c.icon}</td>
                  <td>{c.title}</td>
                  <td>{c.category}</td>
                  <td>{c.salary}</td>
                  <td>
                    <span className={`badge badge-${c.outlook.toLowerCase()}`}>
                      {c.outlook}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-secondary btn-sm"
                      onClick={() => openEdit(c)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-danger btn-sm"
                      onClick={() => setConfirmDelete(c.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editCareer ? "Edit Career" : "Add New Career"}</h2>
                <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
              </div>
              <div className="modal-body">
                {[
                  { key: "icon", label: "Icon (emoji)" },
                  { key: "title", label: "Title" },
                  { key: "category", label: "Category" },
                  { key: "description", label: "Description" },
                  { key: "salary", label: "Salary Range" },
                  { key: "skills", label: "Skills (comma separated)" },
                  { key: "traits", label: "Traits (comma separated)" },
                ].map(({ key, label }) => (
                  <div className="form-group" key={key}>
                    <label>{label}</label>
                    <input
                      value={form[key]}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, [key]: e.target.value }))
                      }
                    />
                  </div>
                ))}
                <div className="form-group">
                  <label>Outlook</label>
                  <select
                    value={form.outlook}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, outlook: e.target.value }))
                    }
                  >
                    {["Excellent", "Good", "Moderate", "Limited"].map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn-primary" onClick={handleSave}>
                  {editCareer ? "Save Changes" : "Add Career"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirm Delete */}
        {confirmDelete && (
          <div className="modal-overlay">
            <div className="modal modal-sm">
              <div className="modal-header">
                <h2>Confirm Delete</h2>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this career? This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setConfirmDelete(null)}>
                  Cancel
                </button>
                <button className="btn-danger" onClick={() => handleDelete(confirmDelete)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
