import { Router, Response } from 'express';
import { prisma } from '../../config/database.js';
import { authenticate, authorize, AuthenticatedRequest } from '../../middleware/auth.js';
import { auditLog } from '../../middleware/auditLog.js';

const router = Router();
router.use(authenticate);

// GET /api/alerts
router.get('/', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { district, severity, status, alertType, page = '1', pageSize = '20' } = req.query;

  const where: Record<string, unknown> = {};
  if (severity) where.severity = severity;
  if (status) where.status = status;
  if (alertType) where.alertType = alertType;

  // Filter by district via case relation
  if (req.user?.role === 'district_officer' && req.user.district) {
    where.case = { district: req.user.district };
  } else if (district) {
    where.case = { district };
  }

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
        caseRef: a.case.caseRef,
        personNameMasked: a.case.personNameMasked,
        district: a.case.district,
        caseStage: a.case.caseStage,
      })),
      total,
      page: pageNum,
      pageSize: pageSizeNum,
      totalPages: Math.ceil(total / pageSizeNum),
    },
  });
});

// PATCH /api/alerts/:id — acknowledge, assign, escalate, resolve
router.patch(
  '/:id',
  authorize('district_officer', 'state_admin', 'national_officer', 'counsellor'),
  auditLog('UPDATE_ALERT', 'Alert'),
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
