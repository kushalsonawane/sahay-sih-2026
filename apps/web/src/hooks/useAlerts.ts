import { useState, useEffect } from 'react';
import type { Alert, AlertStatus } from '@sahay/shared';
import { mockAlerts } from '../data/mockAlerts';

const ALERTS_STORAGE_KEY = 'sahay_alerts_state';

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>(() => {
    try {
      const saved = localStorage.getItem(ALERTS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return mockAlerts;
  });

  useEffect(() => {
    try {
      localStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(alerts));
    } catch {
      // ignore
    }
  }, [alerts]);

  const updateAlertStatus = (id: string, status: AlertStatus, resolutionNote?: string) => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status,
              resolvedAt: status === 'resolved' ? new Date().toISOString() : a.resolvedAt,
              resolutionNote: resolutionNote ?? a.resolutionNote,
            }
          : a
      )
    );
  };

  const acknowledgeAlert = (id: string) => updateAlertStatus(id, 'acknowledged');
  const escalateAlert = (id: string) => updateAlertStatus(id, 'escalated');
  const resolveAlert = (id: string, note?: string) => updateAlertStatus(id, 'resolved', note);

  const addAlert = (newAlert: Omit<Alert, 'id' | 'detectedAt'>) => {
    const alert: Alert = {
      ...newAlert,
      id: `alt-${Date.now()}`,
      detectedAt: new Date().toISOString(),
    };
    setAlerts((prev) => [alert, ...prev]);
    return alert;
  };

  const getAlertsByCaseId = (caseId: string) => {
    return alerts.filter((a) => a.caseId === caseId);
  };

  return {
    alerts,
    updateAlertStatus,
    acknowledgeAlert,
    escalateAlert,
    resolveAlert,
    addAlert,
    getAlertsByCaseId,
  };
}
