import { Router } from 'express';
import { prisma } from '../../config/database.js';
import { authenticate } from '../../middleware/auth.js';
const router = Router();
router.use(authenticate);
// POST /api/check-ins — submit a check-in
router.post('/', async (req, res) => {
    const { caseId, channel, completionStatus, responses, consentGiven } = req.body;
    if (!caseId || !responses || consentGiven === undefined) {
        res.status(400).json({ success: false, message: 'caseId, responses, and consentGiven are required' });
        return;
    }
    // Compute distress indicator
    // INTEGRATION NOTE: Replace this deterministic function with a validated
    // clinical decision-support API call in production. All outputs require human review.
    const distressIndicator = computeDistressIndicator(responses);
    const riskLevel = distressToRisk(distressIndicator);
    const checkIn = await prisma.checkIn.create({
        data: {
            caseId,
            submittedAt: new Date(),
            channel: channel ?? 'web',
            completionStatus: completionStatus ?? 'complete',
            distressIndicator,
            riskLevel,
            consentGiven: Boolean(consentGiven),
            responses: JSON.stringify(responses),
            flaggedForEscalation: distressIndicator >= 70 || responses.feelingUnsafe === true,
        },
    });
    // Update case distress score and last check-in
    await prisma.case.update({
        where: { id: caseId },
        data: {
            distressScore: distressIndicator,
            riskLevel,
            lastCheckIn: new Date(),
            lastContact: new Date(),
            dataFreshnessHours: 0,
        },
    });
    // Auto-create alert if critical
    if (distressIndicator >= 70 || responses.feelingUnsafe) {
        const caseData = await prisma.case.findUnique({ where: { id: caseId } });
        if (caseData) {
            const alertType = responses.feelingUnsafe ? 'intimidation_reported' : 'distress_increase';
            const slaHours = responses.feelingUnsafe ? 4 : 24;
            await prisma.alert.create({
                data: {
                    caseId,
                    alertType,
                    severity: distressIndicator >= 85 ? 'critical' : 'high',
                    triggerDescription: responses.feelingUnsafe
                        ? 'Person reported feeling unsafe in latest check-in'
                        : `Distress indicator reached ${Math.round(distressIndicator)} in latest check-in`,
                    detectedAt: new Date(),
                    recommendedAction: responses.feelingUnsafe
                        ? 'Immediately contact assigned protection officer and counsellor'
                        : 'Schedule counselling session and review support plan',
                    slaDue: new Date(Date.now() + slaHours * 60 * 60 * 1000),
                    status: 'new',
                },
            });
        }
    }
    res.status(201).json({
        success: true,
        data: {
            checkIn: { ...checkIn, responses },
            distressIndicator,
            riskLevel,
            flaggedForEscalation: checkIn.flaggedForEscalation,
            nextFollowUp: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            message: 'Your responses have been recorded and will be reviewed by authorized personnel.',
        },
    });
});
// GET /api/check-ins?caseId= — check-in history for a case
router.get('/', async (req, res) => {
    const { caseId } = req.query;
    if (!caseId) {
        res.status(400).json({ success: false, message: 'caseId is required' });
        return;
    }
    const checkIns = await prisma.checkIn.findMany({
        where: { caseId: String(caseId) },
        orderBy: { submittedAt: 'desc' },
        take: 20,
    });
    res.json({ success: true, data: checkIns });
});
// PATCH /api/check-ins/:id/review — mark as reviewed
router.patch('/:id/review', async (req, res) => {
    const { humanReviewStatus, reviewNote } = req.body;
    const updated = await prisma.checkIn.update({
        where: { id: req.params.id },
        data: {
            humanReviewStatus: humanReviewStatus ?? 'reviewed',
            reviewerId: req.user?.id,
            reviewedAt: new Date(),
        },
    });
    res.json({ success: true, data: updated });
});
/**
 * DISTRESS INDICATOR COMPUTATION
 *
 * Simplified rubric adapted from:
 * - PHQ-9 (Patient Health Questionnaire) — Public Domain
 * - ISQ (Indicators of Safety) — adapted wellness indicators
 *
 * INTEGRATION NOTE: In production, this function should call a validated
 * clinical decision-support API. The output is a monitoring indicator only —
 * NOT a mental health diagnosis. Human review is mandatory before action.
 *
 * Scale: 0 (no distress indicators) → 100 (severe distress indicators)
 */
function computeDistressIndicator(responses) {
    let score = 0;
    // Safety concern — highest weight (max 35 points)
    if (responses.feelingUnsafe === true)
        score += 35;
    if (responses.intimidatedRecently === true)
        score += 20;
    // Emotional state (max 25 points)
    const feeling = Number(responses.feelingRating ?? 3);
    score += (5 - feeling) * 5; // 1=very bad (20pts), 5=very good (0pts)
    // Sleep quality (max 10 points)
    const sleep = Number(responses.sleepQuality ?? 3);
    score += (5 - sleep) * 2;
    // Appetite (max 10 points)
    const appetite = Number(responses.appetite ?? 3);
    score += (5 - appetite) * 2;
    // Functional impairment (max 10 points)
    if (responses.ableToAttendWork === false)
        score += 5;
    if (responses.ableToAttendAppointments === false)
        score += 5;
    // Support needs complexity (max 10 points)
    const needs = Array.isArray(responses.supportNeeds) ? responses.supportNeeds.length : 0;
    score += Math.min(needs * 2, 10);
    return Math.min(Math.max(Math.round(score), 0), 100);
}
function distressToRisk(score) {
    if (score >= 75)
        return 'critical';
    if (score >= 55)
        return 'high';
    if (score >= 35)
        return 'moderate';
    return 'low';
}
export default router;
//# sourceMappingURL=checkIns.router.js.map