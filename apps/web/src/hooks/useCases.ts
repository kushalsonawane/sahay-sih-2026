import { useState, useEffect, useCallback, useRef } from 'react';
import type { Case, RiskLevel, CaseStage } from '@sahay/shared';
import { mockCases } from '../data/mockCases';
import api from '../lib/api';

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
  const isFetchingRef = useRef(false);

  useEffect(() => {
    try {
      localStorage.setItem(CASES_STORAGE_KEY, JSON.stringify(cases));
    } catch {
      // ignore
    }
  }, [cases]);

  const fetchCases = useCallback(async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    try {
      const res = await api.get('/cases');
      if (res.data?.success && Array.isArray(res.data.data?.items) && res.data.data.items.length > 0) {
        setCases(res.data.data.items);
      }
    } catch {
      // Keep local state on network error
    } finally {
      isFetchingRef.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCases();
    const interval = setInterval(fetchCases, 6000);

    const handleSync = () => fetchCases();
    window.addEventListener('sahay:checkin-submitted', handleSync);
    window.addEventListener('storage', handleSync);

    return () => {
      clearInterval(interval);
      window.removeEventListener('sahay:checkin-submitted', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, [fetchCases]);

  const getCaseById = (id: string): Case | undefined => {
    return cases.find((c) => c.id === id || c.caseRef === id);
  };

  const updateCase = (id: string, updates: Partial<Case>) => {
    setCases((prev) =>
      prev.map((c) => (c.id === id || c.caseRef === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c))
    );
    api.patch(`/cases/${id}`, updates).catch(() => {});
  };

  const updateCaseRisk = (id: string, riskLevel: RiskLevel, distressScore?: number) => {
    setCases((prev) =>
      prev.map((c) => {
        if (c.id !== id && c.caseRef !== id) return c;
        return {
          ...c,
          riskLevel,
          distressScore: distressScore ?? c.distressScore,
          updatedAt: new Date().toISOString(),
        };
      })
    );
    api.patch(`/cases/${id}`, { riskLevel, distressScore }).catch(() => {});
  };

  const updateCaseStage = (id: string, caseStage: CaseStage) => {
    setCases((prev) =>
      prev.map((c) => (c.id === id || c.caseRef === id ? { ...c, caseStage, updatedAt: new Date().toISOString() } : c))
    );
    api.patch(`/cases/${id}`, { caseStage }).catch(() => {});
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
    refreshCases: fetchCases,
  };
}

