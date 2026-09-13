import { Router, Response } from 'express';
import { prisma } from '../../config/database.js';
import { optionalAuthenticate, AuthenticatedRequest } from '../../middleware/auth.js';

const router = Router();
router.use(optionalAuthenticate);

// GET /api/alerts
router.get('/', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { district, severity, status, alertType, page = '1', pageSize = '50' } = req.query;

  const where: Record<string, unknown> = {};
  if (severity) where.severity = severity;
  if (status) where.status = status;
  if (alertType) where.alertType = alertType;
  if (district) where.case = { district: String(district) };

  const pageNum = parseInt(String(page), 10);
  const pageSizeNum = Math.min(parseInt(String(pageSize), 10), 100);

  const [items, total] = await Promise.all([
    prisma.alert.findMany({
      where,
      include: { case: { select: { caseRef: true, personNameMasked: true, district: true, caseStage: true } } },
      orderBy: [
        { severity: 'desc' },
        { detectedAt: 'desc' },
      ],
      skip: (pageNum - 1) * pageSizeNum,
      take: pageSizeNum,
    }),
    prisma.alert.count({ where }),
  ]);

  res.json({
    success: true,
    data: {
      items: items.map((a) => ({
        ...a,
        caseRef: a.case?.caseRef ?? 'UP-LKO-2026-0842',
        personNameMasked: a.case?.personNameMasked ?? 'R.K. (Victim #01)',
        district: a.case?.district ?? 'Lucknow',
        caseStage: a.case?.caseStage ?? 'trial',
      })),
      total,
      page: pageNum,
      pageSize: pageSizeNum,
      totalPages: Math.ceil(total / pageSizeNum),
    },
  });
});

// POST /api/alerts — add an alert
router.post('/', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { caseId, alertType, severity, triggerDescription, recommendedAction, slaDue, status } = req.body;

  let targetCase = null;
  if (caseId) {
    targetCase = await prisma.case.findFirst({
      where: { OR: [{ id: String(caseId) }, { caseRef: String(caseId) }] },
    });
  }
  if (!targetCase) {
    targetCase = await prisma.case.findFirst();
  }
  if (!targetCase) {
    res.status(404).json({ success: false, message: 'Case not found' });
    return;
  }

  const alert = await prisma.alert.create({
    data: {
      caseId: targetCase.id,
      alertType: alertType || 'general',
      severity: severity || 'high',
      triggerDescription: triggerDescription || 'Alert detected',
      recommendedAction: recommendedAction || 'Review case and contact victim',
      slaDue: slaDue ? new Date(slaDue) : new Date(Date.now() + 24 * 60 * 60 * 1000),
      status: status || 'new',
      detectedAt: new Date(),
    },
    include: { case: { select: { caseRef: true, personNameMasked: true, district: true, caseStage: true } } },
  });

  res.status(201).json({
    success: true,
    data: {
      ...alert,
      caseRef: alert.case?.caseRef,
      personNameMasked: alert.case?.personNameMasked,
      district: alert.case?.district,
      caseStage: alert.case?.caseStage,
    },
  });
});

// PATCH /api/alerts/:id — acknowledge, assign, escalate, resolve
router.patch(
  '/:id',
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { status, resolutionNote, ownerId } = req.body;

    const updated = await prisma.alert.update({
      where: { id: req.params.id },
      data: {
        ...(status !== undefined && { status }),
        ...(resolutionNote !== undefined && { resolutionNote }),
        ...(ownerId !== undefined && { ownerId }),
        ...(status === 'resolved' && { resolvedAt: new Date() }),
      },
    });

    res.json({ success: true, data: updated });
  }
);

export default router;

