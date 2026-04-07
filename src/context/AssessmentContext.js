// src/context/AssessmentContext.js
import React, { createContext, useContext, useState } from "react";
import { careers } from "../data/mockData";

const AssessmentContext = createContext(null);

export function AssessmentProvider({ children }) {
  const [results, setResults] = useState([]); // { assessmentId, traits, date }

  const submitResult = (assessmentId, traitCounts) => {
    const topTraits = Object.entries(traitCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([t]) => t);

    const matched = careers.filter((c) =>
      c.traits.some((t) => topTraits.includes(t))
    );

    const newResult = {
      assessmentId,
      traits: topTraits,
      traitCounts,
      recommendedCareers: matched,
      date: new Date().toLocaleDateString(),
    };

    setResults((prev) => {
      const filtered = prev.filter((r) => r.assessmentId !== assessmentId);
      return [...filtered, newResult];
    });
    return newResult;
  };

  const getResult = (assessmentId) =>
    results.find((r) => r.assessmentId === assessmentId);

  return (
    <AssessmentContext.Provider value={{ results, submitResult, getResult }}>
      {children}
    </AssessmentContext.Provider>
  );
}

export const useAssessment = () => useContext(AssessmentContext);
