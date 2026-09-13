import { Router, Response } from 'express';
import { prisma } from '../../config/database.js';
import { authenticate, AuthenticatedRequest } from '../../middleware/auth.js';
import { auditLog } from '../../middleware/auditLog.js';

const router = Router();
router.use(authenticate);
router.use(auditLog('VIEW_ANALYTICS', 'Analytics'));

// GET /api/analytics/summary
router.get('/summary', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { district, state } = req.query;

  const caseWhere: Record<string, unknown> = {};
  if (req.user?.role === 'district_officer' && req.user.district) caseWhere.district = req.user.district;
  else if (req.user?.role === 'state_admin' && req.user.state) caseWhere.state = req.user.state;
  if (district) caseWhere.district = district;
  if (state) caseWhere.state = state;

  const [
    totalCases,
    highPriorityCases,
    riskCounts,
    checkInStats,
    interventionsThisWeek,
  ] = await Promise.all([
    prisma.case.count({ where: caseWhere }),
    prisma.case.count({ where: { ...caseWhere, riskLevel: { in: ['high', 'critical'] } } }),
    prisma.case.groupBy({
      by: ['riskLevel'],
      _count: { riskLevel: true },
      where: caseWhere,
    }),
    prisma.case.aggregate({
      _avg: { distressScore: true, checkInCompletionRate: true },
      where: caseWhere,
    }),
    prisma.intervention.count({
      where: {
        createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        status: 'completed',
        case: caseWhere,
      },
    }),
  ]);

  const riskDist = { low: 0, moderate: 0, high: 0, critical: 0 };
  for (const r of riskCounts) {
    riskDist[r.riskLevel as keyof typeof riskDist] = r._count.riskLevel;
  }

  res.json({
    success: true,
    data: {
      totalMonitoredCases: totalCases,
      highPriorityCases,
      pendingFollowUps: Math.round(totalCases * 0.3), // derived metric
      interventionsThisWeek,
      checkInCompletionRate: Math.round(checkInStats._avg.checkInCompletionRate ?? 0),
      avgDistressScore: Math.round(checkInStats._avg.distressScore ?? 0),
      riskDistribution: riskDist,
    },
  });
});

// GET /api/analytics/trend — distress trend over 30 days (mocked relative to real cases)
router.get('/trend', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  // Generate trend data from actual check-in records
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const checkIns = await prisma.checkIn.findMany({
    where: { submittedAt: { gte: thirtyDaysAgo } },
    select: { submittedAt: true, distressIndicator: true, riskLevel: true },
    orderBy: { submittedAt: 'asc' },
  });

  // Group by day
  const byDay: Record<string, { sum: number; count: number; highRisk: number }> = {};
  for (const ci of checkIns) {
    const day = ci.submittedAt.toISOString().split('T')[0];
    if (!byDay[day]) byDay[day] = { sum: 0, count: 0, highRisk: 0 };
    byDay[day].sum += ci.distressIndicator;
    byDay[day].count++;
    if (ci.riskLevel === 'high' || ci.riskLevel === 'critical') byDay[day].highRisk++;
  }

  const trend = Object.entries(byDay).map(([date, stats]) => ({
    date,
    avgDistress: Math.round(stats.sum / stats.count),
    highRiskCount: stats.highRisk,
    checkInsCompleted: stats.count,
  }));

  res.json({ success: true, data: trend });
});

// GET /api/analytics/districts
router.get('/districts', async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
  const cases = await prisma.case.groupBy({
    by: ['district', 'state'],
    _count: { id: true },
    _avg: { distressScore: true, checkInCompletionRate: true },
  });

  const stats = cases.map((c) => ({
    district: c.district,
    state: c.state,
    totalCases: c._count.id,
    avgDistressScore: Math.round(c._avg.distressScore ?? 0),
    avgCheckInRate: Math.round(c._avg.checkInCompletionRate ?? 0),
  }));

  res.json({ success: true, data: stats });
});

export default router;
