import { Router, Response } from 'express';
import { prisma } from '../../config/database.js';
import { optionalAuthenticate, AuthenticatedRequest } from '../../middleware/auth.js';

const router = Router();
router.use(optionalAuthenticate);

// GET /api/cases — list cases (filtered by query)
router.get('/', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { district, state, riskLevel, caseStage, search, page = '1', pageSize = '50' } = req.query;

  const where: Record<string, unknown> = {};

  if (district) where.district = String(district);
  if (state) where.state = String(state);
  if (riskLevel) where.riskLevel = String(riskLevel);
  if (caseStage) where.caseStage = String(caseStage);
  if (search) {
    where.OR = [
      { caseRef: { contains: String(search) } },
      { personNameMasked: { contains: String(search) } },
      { district: { contains: String(search) } },
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

// GET /api/cases/:id — case detail
router.get(
  '/:id',
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const caseData = await prisma.case.findFirst({
      where: {
        OR: [
          { id: req.params.id },
          { caseRef: req.params.id },
        ],
      },
      include: {
        checkIns: { orderBy: { submittedAt: 'desc' }, take: 20 },
        alerts: { orderBy: { detectedAt: 'desc' }, take: 20 },
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

// PATCH /api/cases/:id — update case
router.patch(
  '/:id',
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const {
      nextAction,
      nextActionDue,
      notes,
      assignedCounsellorId,
      assignedOfficerId,
      riskLevel,
      distressScore,
      caseStage,
    } = req.body;

    const targetCase = await prisma.case.findFirst({
      where: {
        OR: [
          { id: req.params.id },
          { caseRef: req.params.id },
        ],
      },
    });

    if (!targetCase) {
      res.status(404).json({ success: false, message: 'Case not found' });
      return;
    }

    const updated = await prisma.case.update({
      where: { id: targetCase.id },
      data: {
        ...(nextAction !== undefined && { nextAction }),
        ...(nextActionDue !== undefined && { nextActionDue: new Date(nextActionDue) }),
        ...(notes !== undefined && { notes }),
        ...(assignedCounsellorId !== undefined && { assignedCounsellorId }),
        ...(assignedOfficerId !== undefined && { assignedOfficerId }),
        ...(riskLevel !== undefined && { riskLevel }),
        ...(distressScore !== undefined && { distressScore: Number(distressScore) }),
        ...(caseStage !== undefined && { caseStage }),
      },
    });

    res.json({ success: true, data: updated });
  }
);

export default router;

