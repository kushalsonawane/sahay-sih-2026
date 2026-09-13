import type { RiskLevel, DataConfidence } from '@sahay/shared';

/**
 * Distress Indicator Computation (Frontend mirror)
 *
 * INTEGRATION NOTE: In production, this function should call a validated
 * clinical decision-support API. The output is a monitoring indicator only —
 * NOT a mental health diagnosis. Human review is mandatory before action.
 *
 * Scoring adapted from:
 * - PHQ-9 (Patient Health Questionnaire) — Public Domain
 * - ISQ (Indicators of Safety) — adapted wellness indicators
 *
 * Scale: 0 (no distress indicators) → 100 (severe distress indicators)
 */
export function computeDistressIndicator(responses: {
  feelingRating?: number;
  feelingUnsafe?: boolean | null;
  intimidatedRecently?: boolean | null;
  sleepQuality?: number;
  appetite?: number;
  ableToAttendWork?: boolean | null;
  ableToAttendAppointments?: boolean | null;
  supportNeeds?: string[];
}): number {
  let score = 0;

  if (responses.feelingUnsafe === true) score += 35;
  if (responses.intimidatedRecently === true) score += 20;

  const feeling = responses.feelingRating ?? 3;
  score += (5 - feeling) * 5;

  const sleep = responses.sleepQuality ?? 3;
  score += (5 - sleep) * 2;

  const appetite = responses.appetite ?? 3;
  score += (5 - appetite) * 2;

  if (responses.ableToAttendWork === false) score += 5;
  if (responses.ableToAttendAppointments === false) score += 5;

  const needs = responses.supportNeeds?.length ?? 0;
  score += Math.min(needs * 2, 10);

  return Math.min(Math.max(Math.round(score), 0), 100);
}

export function distressToRisk(score: number): RiskLevel {
  if (score >= 75) return 'critical';
  if (score >= 55) return 'high';
  if (score >= 35) return 'moderate';
  return 'low';
}

export function computeDistressScore(responses: Parameters<typeof computeDistressIndicator>[0]) {
  const distressScore = computeDistressIndicator(responses);
  const riskLevel = distressToRisk(distressScore);
  return { distressScore, riskLevel };
}

export function riskToLabel(risk: RiskLevel): string {
  const labels: Record<RiskLevel, string> = {
    low: 'Low',
    moderate: 'Moderate',
    high: 'High',
    critical: 'Critical',
  };
  return labels[risk];
}

export function riskToColor(risk: RiskLevel): string {
  const colors: Record<RiskLevel, string> = {
    low: '#0D7A5B',
    moderate: '#B45309',
    high: '#C2410C',
    critical: '#991B1B',
  };
  return colors[risk];
}

export function riskToIcon(risk: RiskLevel): string {
  const icons: Record<RiskLevel, string> = {
    low: '▼',
    moderate: '◆',
    high: '▲',
    critical: '⚠',
  };
  return icons[risk];
}

export function confidenceToLabel(confidence: DataConfidence): string {
  const labels: Record<DataConfidence, string> = {
    high: 'High confidence',
    medium: 'Medium confidence',
    limited: 'Limited data',
  };
  return labels[confidence];
}

export function distressToSupportiveMessage(score: number): string {
  if (score >= 75) {
    return 'Your recent responses suggest you may benefit from additional support. A counsellor may contact you soon.';
  }
  if (score >= 55) {
    return 'Your responses indicate some challenges. We encourage you to reach out to your counsellor.';
  }
  if (score >= 35) {
    return 'You are doing reasonably well. Continue with your scheduled check-ins and support sessions.';
  }
  return 'Your responses suggest you are coping well. Keep attending your scheduled sessions.';
}
