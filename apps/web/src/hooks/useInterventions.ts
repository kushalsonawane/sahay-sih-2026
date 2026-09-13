import { useState, useEffect } from 'react';
import type { Intervention, InterventionStatus, ApprovalStatus } from '@sahay/shared';
import { mockInterventions } from '../data/mockInterventions';

const INTERVENTIONS_STORAGE_KEY = 'sahay_interventions_state';

export function useInterventions() {
  const [interventions, setInterventions] = useState<Intervention[]>(() => {
    try {
      const saved = localStorage.getItem(INTERVENTIONS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return mockInterventions;
  });

  useEffect(() => {
    try {
      localStorage.setItem(INTERVENTIONS_STORAGE_KEY, JSON.stringify(interventions));
    } catch {
      // ignore
    }
  }, [interventions]);

  const updateInterventionStatus = (id: string, status: InterventionStatus) => {
    setInterventions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status, updatedAt: new Date().toISOString() } : item
      )
    );
  };

  const approveIntervention = (id: string, approverId: string) => {
    setInterventions((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              approvalStatus: 'approved' as ApprovalStatus,
              approvedById: approverId,
              status: 'in_progress',
              updatedAt: new Date().toISOString(),
            }
          : item
      )
    );
  };

  const addIntervention = (newIntervention: Omit<Intervention, 'id' | 'createdAt' | 'updatedAt'>) => {
    const intervention: Intervention = {
      ...newIntervention,
      id: `int-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setInterventions((prev) => [intervention, ...prev]);
    return intervention;
  };

  const getInterventionsByCaseId = (caseId: string) => {
    return interventions.filter((i) => i.caseId === caseId);
  };

  return {
    interventions,
    updateInterventionStatus,
    approveIntervention,
    addIntervention,
    getInterventionsByCaseId,
  };
}
