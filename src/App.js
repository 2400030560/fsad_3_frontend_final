// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AssessmentProvider } from "./context/AssessmentContext";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Student Pages
import Login from "./pages/student/Login";
import Signup from "./pages/student/Signup";
import Dashboard from "./pages/student/Dashboard";
import CareerLibrary from "./pages/student/CareerLibrary";
import CareerDetail from "./pages/student/CareerDetail";
import AssessmentList from "./pages/student/AssessmentList";
import AssessmentQuiz from "./pages/student/AssessmentQuiz";
import Results from "./pages/student/Results";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageCareers from "./pages/admin/ManageCareers";
import ManageAssessments from "./pages/admin/ManageAssessments";

import "./styles.css";

function App() {
  return (
    <AuthProvider>
      <AssessmentProvider>
        <BrowserRouter>
          <Routes>

            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Student Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute role="student">
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/careers"
              element={
                <ProtectedRoute role="student">
                  <CareerLibrary />
                </ProtectedRoute>
              }
            />

            <Route
              path="/careers/:id"
              element={
                <ProtectedRoute role="student">
                  <CareerDetail />
                </ProtectedRoute>
              }
            />

            <Route
              path="/assessments"
              element={
                <ProtectedRoute role="student">
                  <AssessmentList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/assessments/:id"
              element={
                <ProtectedRoute role="student">
                  <AssessmentQuiz />
                </ProtectedRoute>
              }
            />

            <Route
              path="/results"
              element={
                <ProtectedRoute role="student">
                  <Results />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/careers"
              element={
                <ProtectedRoute role="admin">
                  <ManageCareers />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/assessments"
              element={
                <ProtectedRoute role="admin">
                  <ManageAssessments />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/login" replace />} />

          </Routes>
        </BrowserRouter>
      </AssessmentProvider>
    </AuthProvider>
  );
}

export default App;