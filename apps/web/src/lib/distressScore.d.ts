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
export declare function computeDistressIndicator(responses: {
    feelingRating?: number;
    feelingUnsafe?: boolean | null;
    intimidatedRecently?: boolean | null;
    sleepQuality?: number;
    appetite?: number;
    ableToAttendWork?: boolean | null;
    ableToAttendAppointments?: boolean | null;
    supportNeeds?: string[];
}): number;
export declare function distressToRisk(score: number): RiskLevel;
export declare function computeDistressScore(responses: Parameters<typeof computeDistressIndicator>[0]): {
    distressScore: number;
    riskLevel: RiskLevel;
};
export declare function riskToLabel(risk: RiskLevel): string;
export declare function riskToColor(risk: RiskLevel): string;
export declare function riskToIcon(risk: RiskLevel): string;
export declare function confidenceToLabel(confidence: DataConfidence): string;
export declare function distressToSupportiveMessage(score: number): string;
//# sourceMappingURL=distressScore.d.ts.map