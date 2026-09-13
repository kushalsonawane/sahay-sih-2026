import { useState, useEffect, useCallback, useRef } from 'react';
import type { Alert, AlertStatus } from '@sahay/shared';
import { mockAlerts } from '../data/mockAlerts';
import api from '../lib/api';

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

  const [isLoading, setIsLoading] = useState(false);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    try {
      localStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(alerts));
    } catch {
      // ignore
    }
  }, [alerts]);

  const fetchAlerts = useCallback(async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    try {
      const res = await api.get('/alerts');
      if (res.data?.success && Array.isArray(res.data.data?.items) && res.data.data.items.length > 0) {
        setAlerts(res.data.data.items);
      }
    } catch {
      // Keep local state on network error
    } finally {
      isFetchingRef.current = false;
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000);

    const handleSync = () => fetchAlerts();
    window.addEventListener('sahay:checkin-submitted', handleSync);
    window.addEventListener('storage', handleSync);

    return () => {
      clearInterval(interval);
      window.removeEventListener('sahay:checkin-submitted', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, [fetchAlerts]);

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

    api.patch(`/alerts/${id}`, { status, resolutionNote }).catch(() => {
      // ignore in local mode
    });
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

    setAlerts((prev) => [alert, ...prev.filter((a) => a.id !== alert.id)]);

    api.post('/alerts', newAlert)
      .then((res) => {
        if (res.data?.data) {
          const serverAlert = res.data.data;
          setAlerts((prev) => [serverAlert, ...prev.filter((a) => a.id !== alert.id && a.id !== serverAlert.id)]);
        }
      })
      .catch(() => {
        // ignore in local mode
      });

    return alert;
  };

  const getAlertsByCaseId = (caseId: string) => {
    return alerts.filter((a) => a.caseId === caseId);
  };

  return {
    alerts,
    isLoading,
    updateAlertStatus,
    acknowledgeAlert,
    escalateAlert,
    resolveAlert,
    addAlert,
    getAlertsByCaseId,
    refreshAlerts: fetchAlerts,
  };
}

