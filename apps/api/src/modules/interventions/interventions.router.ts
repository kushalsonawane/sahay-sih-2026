import { Router, Response } from 'express';
import { prisma } from '../../config/database.js';
import { authenticate, authorize, AuthenticatedRequest } from '../../middleware/auth.js';
import { auditLog } from '../../middleware/auditLog.js';

const router = Router();
router.use(authenticate);

// GET /api/interventions
router.get('/', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { caseId, status, priority, interventionType, page = '1', pageSize = '20' } = req.query;

  const where: Record<string, unknown> = {};
  if (caseId) where.caseId = caseId;
  if (status) where.status = status;
  if (priority) where.priority = priority;
  if (interventionType) where.interventionType = interventionType;

  const pageNum = parseInt(String(page), 10);
  const pageSizeNum = Math.min(parseInt(String(pageSize), 10), 100);

  const [items, total] = await Promise.all([
    prisma.intervention.findMany({
      where,
      include: {
        case: { select: { caseRef: true, personNameMasked: true, district: true } },
      },
      orderBy: [{ priority: 'desc' }, { dueDate: 'asc' }],
      skip: (pageNum - 1) * pageSizeNum,
      take: pageSizeNum,
    }),
    prisma.intervention.count({ where }),
  ]);

  res.json({
    success: true,
    data: {
      items: items.map((i) => ({
        ...i,
        caseRef: i.case.caseRef,
        personNameMasked: i.case.personNameMasked,
        district: i.case.district,
      })),
      total,
      page: pageNum,
      pageSize: pageSizeNum,
      totalPages: Math.ceil(total / pageSizeNum),
    },
  });
});

// POST /api/interventions — create intervention
router.post(
  '/',
  authorize('district_officer', 'state_admin', 'national_officer', 'counsellor'),
  auditLog('CREATE_INTERVENTION', 'Intervention'),
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { caseId, interventionType, reason, priority, assignedDept, assignedPersonId, dueDate, notes } = req.body;

    if (!caseId || !interventionType || !reason || !priority || !assignedDept || !dueDate) {
      res.status(400).json({ success: false, message: 'Missing required fields' });
      return;
    }

    const intervention = await prisma.intervention.create({
      data: {
        caseId,
        interventionType,
        reason,
        priority,
        assignedDept,
        assignedPersonId,
        dueDate: new Date(dueDate),
        notes,
        status: 'pending',
        approvalStatus: 'pending',
      },
    });

    // Log to timeline
    const caseData = await prisma.case.findUnique({ where: { id: caseId }, select: { caseRef: true } });
    await prisma.timelineEvent.create({
      data: {
        caseId,
        eventType: 'intervention',
        title: `Intervention Requested: ${interventionType.replace(/_/g, ' ')}`,
        description: reason,
        date: new Date(),
        outcome: 'Pending approval',
      },
    });

    res.status(201).json({ success: true, data: intervention });
  }
);

// PATCH /api/interventions/:id — update status, approve
router.patch(
  '/:id',
  authorize('district_officer', 'state_admin', 'national_officer'),
  auditLog('UPDATE_INTERVENTION', 'Intervention'),
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { status, approvalStatus, notes } = req.body;

    const updated = await prisma.intervention.update({
      where: { id: req.params.id },
      data: {
        ...(status !== undefined && { status }),
        ...(approvalStatus !== undefined && { approvalStatus }),
        ...(approvalStatus === 'approved' && { approvedById: req.user?.id }),
        ...(notes !== undefined && { notes }),
      },
    });

    res.json({ success: true, data: updated });
  }
);

export default router;
