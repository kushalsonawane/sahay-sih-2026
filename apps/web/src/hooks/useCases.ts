import { useState, useEffect } from 'react';
import type { Case, RiskLevel, CaseStage } from '@sahay/shared';
import { mockCases } from '../data/mockCases';

const CASES_STORAGE_KEY = 'sahay_cases_state';

export function useCases() {
  const [cases, setCases] = useState<Case[]>(() => {
    try {
      const saved = localStorage.getItem(CASES_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return mockCases;
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CASES_STORAGE_KEY, JSON.stringify(cases));
    } catch {
      // ignore
    }
  }, [cases]);

  const getCaseById = (id: string): Case | undefined => {
    return cases.find((c) => c.id === id || c.caseRef === id);
  };

  const updateCase = (id: string, updates: Partial<Case>) => {
    setCases((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c))
    );
  };

  const updateCaseRisk = (id: string, riskLevel: RiskLevel, distressScore?: number) => {
    setCases((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        return {
          ...c,
          riskLevel,
          distressScore: distressScore ?? c.distressScore,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  const updateCaseStage = (id: string, caseStage: CaseStage) => {
    setCases((prev) =>
      prev.map((c) => (c.id === id ? { ...c, caseStage, updatedAt: new Date().toISOString() } : c))
    );
  };

  const resetToDefault = () => {
    setCases(mockCases);
    try {
      localStorage.removeItem(CASES_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return {
    cases,
    loading,
    getCaseById,
    updateCase,
    updateCaseRisk,
    updateCaseStage,
    resetToDefault,
  };
}
