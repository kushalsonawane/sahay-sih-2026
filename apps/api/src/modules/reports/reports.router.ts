import { Router, Response } from 'express';
import { prisma } from '../../config/database.js';
import { authenticate, authorize, AuthenticatedRequest } from '../../middleware/auth.js';
import { auditLog } from '../../middleware/auditLog.js';

const router = Router();
router.use(authenticate);
router.use(authorize('district_officer', 'state_admin', 'national_officer'));

// POST /api/reports/generate — generate a CSV report (mock for demo)
router.post(
  '/generate',
  auditLog('GENERATE_REPORT', 'Report'),
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { reportType, district, state, dateFrom, dateTo, riskLevel, caseStage } = req.body;

    const where: Record<string, unknown> = {};
    if (req.user?.role === 'district_officer' && req.user.district) where.district = req.user.district;
    if (district) where.district = district;
    if (state) where.state = state;
    if (riskLevel) where.riskLevel = riskLevel;
    if (caseStage) where.caseStage = caseStage;
    if (dateFrom || dateTo) {
      where.createdAt = {
        ...(dateFrom && { gte: new Date(dateFrom) }),
        ...(dateTo && { lte: new Date(dateTo) }),
      };
    }

    const cases = await prisma.case.findMany({
      where,
      orderBy: { distressScore: 'desc' },
    });

    // Build CSV
    const headers = [
      'Case ID', 'Case Reference', 'District', 'State', 'Stage',
      'Type', 'Risk Level', 'Distress Score', 'Check-In Rate', 'Trend',
      'Last Check-In', 'Data Confidence', 'Created At',
    ];

    const rows = cases.map((c) => [
      c.id, c.caseRef, c.district, c.state, c.caseStage,
      c.caseType, c.riskLevel, c.distressScore, c.checkInCompletionRate, c.trend,
      c.lastCheckIn?.toISOString() ?? '', c.dataConfidence, c.createdAt.toISOString(),
    ]);

    const csv = [
      `# SAHAY — ${reportType ?? 'District Summary'} Report`,
      `# Generated: ${new Date().toISOString()}`,
      `# DEMO DATA — Not for official use`,
      '',
      headers.join(','),
      ...rows.map((r) => r.map((v) => `"${v}"`).join(',')),
    ].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="sahay-report-${Date.now()}.csv"`);
    res.send(csv);
  }
);

export default router;
