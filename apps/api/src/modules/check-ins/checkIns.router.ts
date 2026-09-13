import { Router, Response } from 'express';
import { prisma } from '../../config/database.js';
import { optionalAuthenticate, AuthenticatedRequest } from '../../middleware/auth.js';

const router = Router();
router.use(optionalAuthenticate);

// POST /api/check-ins — submit a check-in
router.post('/', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { caseId, channel, completionStatus, responses, consentGiven } = req.body;

  if (!responses || consentGiven === undefined) {
    res.status(400).json({ success: false, message: 'responses and consentGiven are required' });
    return;
  }

  // Flexible case lookup: resolve case by id, caseRef, or default to first case
  let targetCase = null;
  if (caseId) {
    targetCase = await prisma.case.findFirst({
      where: {
        OR: [
          { id: String(caseId) },
          { caseRef: String(caseId) },
        ],
      },
    });
  }
  if (!targetCase) {
    targetCase = await prisma.case.findFirst();
  }
  if (!targetCase) {
    res.status(404).json({ success: false, message: 'No registered case found to link check-in' });
    return;
  }

  // Compute distress indicator
  const distressIndicator = computeDistressIndicator(responses);
  const riskLevel = distressToRisk(distressIndicator);
  const isCritical = riskLevel === 'critical' || distressIndicator >= 70 || Boolean(responses.intimidatedRecently);

  const checkIn = await prisma.checkIn.create({
    data: {
      caseId: targetCase.id,
      submittedAt: new Date(),
      channel: channel ?? 'web',
      completionStatus: completionStatus ?? 'complete',
      distressIndicator,
      riskLevel,
      consentGiven: Boolean(consentGiven),
      responses: typeof responses === 'string' ? responses : JSON.stringify(responses),
      flaggedForEscalation: isCritical,
      humanReviewStatus: isCritical ? 'escalated' : 'pending',
    },
  });

  // Update case distress score and last check-in
  await prisma.case.update({
    where: { id: targetCase.id },
    data: {
      distressScore: distressIndicator,
      riskLevel,
      lastCheckIn: new Date(),
      lastContact: new Date(),
      dataFreshnessHours: 0,
    },
  });

  // Auto-create alert if critical or intimidation reported
  if (isCritical || responses.feelingUnsafe || responses.intimidatedRecently) {
    const alertType = responses.intimidatedRecently
      ? 'intimidation_reported'
      : responses.feelingUnsafe
      ? 'intimidation_reported'
      : 'distress_increase';
    const slaHours = responses.intimidatedRecently || responses.feelingUnsafe ? 4 : 24;

    await prisma.alert.create({
      data: {
        caseId: targetCase.id,
        alertType,
        severity: distressIndicator >= 80 || responses.intimidatedRecently ? 'critical' : 'high',
        triggerDescription: responses.intimidatedRecently
          ? 'Victim flagged recent intimidation/threats in daily check-in portal'
          : responses.feelingUnsafe
          ? 'Victim reported feeling unsafe in latest check-in'
          : `Distress indicator spiked to ${Math.round(distressIndicator)}/100 in latest check-in`,
        detectedAt: new Date(),
        recommendedAction: responses.intimidatedRecently
          ? 'Immediate police escort & witness protection order under Rule 12'
          : responses.feelingUnsafe
          ? 'Immediately contact assigned protection officer and counsellor'
          : 'Emergency tele-counselling & home welfare check',
        slaDue: new Date(Date.now() + slaHours * 60 * 60 * 1000),
        status: 'new',
      },
    });
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
router.get('/', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { caseId } = req.query;

  const where: Record<string, unknown> = {};
  if (caseId) {
    const targetCase = await prisma.case.findFirst({
      where: {
        OR: [
          { id: String(caseId) },
          { caseRef: String(caseId) },
        ],
      },
    });
    if (targetCase) {
      where.caseId = targetCase.id;
    } else {
      where.caseId = String(caseId);
    }
  }

  const checkIns = await prisma.checkIn.findMany({
    where,
    orderBy: { submittedAt: 'desc' },
    take: 30,
  });

  const formatted = checkIns.map((c) => {
    let parsed = c.responses;
    try {
      if (typeof c.responses === 'string') {
        parsed = JSON.parse(c.responses);
      }
    } catch {
      // keep
    }
    return {
      ...c,
      responses: parsed,
    };
  });

  res.json({ success: true, data: formatted });
});

// PATCH /api/check-ins/:id/review — mark as reviewed
router.patch('/:id/review', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
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
function computeDistressIndicator(responses: Record<string, unknown>): number {
  let score = 0;

  // Safety concern — highest weight (max 35 points)
  if (responses.feelingUnsafe === true) score += 35;
  if (responses.intimidatedRecently === true) score += 20;

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
  if (responses.ableToAttendWork === false) score += 5;
  if (responses.ableToAttendAppointments === false) score += 5;

  // Support needs complexity (max 10 points)
  const needs = Array.isArray(responses.supportNeeds) ? responses.supportNeeds.length : 0;
  score += Math.min(needs * 2, 10);

  return Math.min(Math.max(Math.round(score), 0), 100);
}

function distressToRisk(score: number): string {
  if (score >= 75) return 'critical';
  if (score >= 55) return 'high';
  if (score >= 35) return 'moderate';
  return 'low';
}

export default router;
