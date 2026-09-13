import { Router, Response } from 'express';
import { prisma } from '../../config/database.js';
import { authenticate, authorize, AuthenticatedRequest } from '../../middleware/auth.js';
import { auditLog } from '../../middleware/auditLog.js';

const router = Router();

// All cases routes require authentication
router.use(authenticate);

// GET /api/cases — list cases (filtered by role/district)
router.get('/', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { district, state, riskLevel, caseStage, search, page = '1', pageSize = '20' } = req.query;

  const where: Record<string, unknown> = {};

  // District officers can only see their district
  if (req.user?.role === 'district_officer' && req.user.district) {
    where.district = req.user.district;
  } else if (req.user?.role === 'state_admin' && req.user.state) {
    where.state = req.user.state;
  } else if (req.user?.role === 'victim') {
    // Victims see only their own case (by assigned officer matching their case)
    // In production this would use a direct case↔user link
    where.district = req.user.district;
  }

  if (district) where.district = district;
  if (state) where.state = state;
  if (riskLevel) where.riskLevel = riskLevel;
  if (caseStage) where.caseStage = caseStage;
  if (search) {
    where.OR = [
      { caseRef: { contains: search } },
      { personNameMasked: { contains: search } },
      { district: { contains: search } },
    ];
  }

  const pageNum = parseInt(String(page), 10);
  const pageSizeNum = Math.min(parseInt(String(pageSize), 10), 100);
  const skip = (pageNum - 1) * pageSizeNum;

  const [items, total] = await Promise.all([
    prisma.case.findMany({
      where,
      orderBy: [{ distressScore: 'desc' }, { updatedAt: 'desc' }],
      skip,
      take: pageSizeNum,
    }),
    prisma.case.count({ where }),
  ]);

  res.json({
    success: true,
    data: {
      items,
      total,
      page: pageNum,
      pageSize: pageSizeNum,
      totalPages: Math.ceil(total / pageSizeNum),
    },
  });
});

// GET /api/cases/:id — case detail (with audit log)
router.get(
  '/:id',
  auditLog('VIEW_CASE', 'Case'),
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const caseData = await prisma.case.findUnique({
      where: { id: req.params.id },
      include: {
        checkIns: { orderBy: { submittedAt: 'desc' }, take: 10 },
        alerts: { orderBy: { detectedAt: 'desc' }, take: 10 },
        interventions: { orderBy: { createdAt: 'desc' } },
        appointments: { orderBy: { scheduledAt: 'asc' } },
        timeline: { orderBy: { date: 'desc' } },
      },
    });

    if (!caseData) {
      res.status(404).json({ success: false, message: 'Case not found' });
      return;
    }

    res.json({ success: true, data: caseData });
  }
);

// PATCH /api/cases/:id — update case (officer/admin only)
router.patch(
  '/:id',
  authorize('district_officer', 'state_admin', 'national_officer'),
  auditLog('UPDATE_CASE', 'Case'),
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { nextAction, nextActionDue, notes, assignedCounsellorId, assignedOfficerId } = req.body;

    const updated = await prisma.case.update({
      where: { id: req.params.id },
      data: {
        ...(nextAction !== undefined && { nextAction }),
        ...(nextActionDue !== undefined && { nextActionDue: new Date(nextActionDue) }),
        ...(notes !== undefined && { notes }),
        ...(assignedCounsellorId !== undefined && { assignedCounsellorId }),
        ...(assignedOfficerId !== undefined && { assignedOfficerId }),
      },
    });

    res.json({ success: true, data: updated });
  }
);

export default router;
