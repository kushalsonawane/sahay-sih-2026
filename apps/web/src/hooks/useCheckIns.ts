import { useState, useEffect } from 'react';
import type { CheckIn, CheckInResponse } from '@sahay/shared';
import { mockCheckIns } from '../data/mockTimeline';
import { computeDistressScore } from '../lib/distressScore';

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

  useEffect(() => {
    try {
      localStorage.setItem(CHECKINS_STORAGE_KEY, JSON.stringify(checkIns));
    } catch {
      // ignore
    }
  }, [checkIns]);

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

    setCheckIns((prev) => [newCheckIn, ...prev]);

    return { checkIn: newCheckIn, distressScore, riskLevel, isCritical };
  };

  const getCheckInsByCaseId = (caseId: string) => {
    return checkIns.filter((c) => c.caseId === caseId);
  };

  return {
    checkIns,
    submitCheckIn,
    getCheckInsByCaseId,
  };
}
