import { useState, useEffect, useCallback, useRef } from 'react';
import type { CheckIn, CheckInResponse } from '@sahay/shared';
import { mockCheckIns } from '../data/mockTimeline';
import { computeDistressScore } from '../lib/distressScore';
import api from '../lib/api';

const CHECKINS_STORAGE_KEY = 'sahay_checkins_state';

export function useCheckIns() {
  const [checkIns, setCheckIns] = useState<CheckIn[]>(() => {
    try {
      const saved = localStorage.getItem(CHECKINS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return mockCheckIns;
  });

  const [isLoading, setIsLoading] = useState(false);
  const isFetchingRef = useRef(false);

  // Sync to localStorage as offline cache
  useEffect(() => {
    try {
      localStorage.setItem(CHECKINS_STORAGE_KEY, JSON.stringify(checkIns));
    } catch {
      // ignore
    }
  }, [checkIns]);

  // Fetch check-ins from backend API
  const fetchCheckIns = useCallback(async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    try {
      const res = await api.get('/check-ins');
      if (res.data?.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
        setCheckIns(res.data.data);
      }
    } catch {
      // Keep local state on network error
    } finally {
      isFetchingRef.current = false;
      setIsLoading(false);
    }
  }, []);

  // Poll every 5 seconds for cross-device updates
  useEffect(() => {
    fetchCheckIns();
    const interval = setInterval(fetchCheckIns, 5000);

    const handleSync = () => fetchCheckIns();
    window.addEventListener('sahay:checkin-submitted', handleSync);
    window.addEventListener('storage', handleSync);

    return () => {
      clearInterval(interval);
      window.removeEventListener('sahay:checkin-submitted', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, [fetchCheckIns]);

  const submitCheckIn = (
    caseId: string,
    responses: CheckInResponse,
    channel: 'web' | 'app' = 'web'
  ): { checkIn: CheckIn; distressScore: number; riskLevel: any; isCritical: boolean } => {
    const { distressScore, riskLevel } = computeDistressScore(responses);
    const isCritical = riskLevel === 'critical' || riskLevel === 'high' || !!responses.intimidatedRecently;

    const newCheckIn: CheckIn = {
      id: `chk-${Date.now()}`,
      caseId,
      submittedAt: new Date().toISOString(),
      channel,
      completionStatus: 'complete',
      distressIndicator: distressScore,
      riskLevel,
      consentGiven: true,
      responses,
      humanReviewStatus: isCritical ? 'escalated' : 'pending',
      flaggedForEscalation: isCritical,
    };

    // Optimistically update local state immediately
    setCheckIns((prev) => [newCheckIn, ...prev.filter((c) => c.id !== newCheckIn.id)]);

    // Transmit to central backend API for cross-device sync
    api.post('/check-ins', {
      caseId,
      channel,
      completionStatus: 'complete',
      responses,
      consentGiven: true,
    })
      .then((res) => {
        if (res.data?.data?.checkIn) {
          const serverCheckIn = res.data.data.checkIn;
          setCheckIns((prev) => [serverCheckIn, ...prev.filter((c) => c.id !== newCheckIn.id && c.id !== serverCheckIn.id)]);
        }
        // Notify other hooks in this window to refresh immediately
        window.dispatchEvent(new CustomEvent('sahay:checkin-submitted', { detail: { caseId, distressScore, riskLevel } }));
      })
      .catch((err) => {
        console.warn('Check-in submitted in offline/local mode:', err?.message || err);
      });

    return { checkIn: newCheckIn, distressScore, riskLevel, isCritical };
  };

  const getCheckInsByCaseId = (caseId: string) => {
    return checkIns.filter((c) => c.caseId === caseId || c.caseId === 'case-001');
  };

  return {
    checkIns,
    isLoading,
    submitCheckIn,
    getCheckInsByCaseId,
    refreshCheckIns: fetchCheckIns,
  };
}

