import { Router, Response } from 'express';
import { prisma } from '../../config/database.js';
import { authenticate, AuthenticatedRequest } from '../../middleware/auth.js';
import { auditLog } from '../../middleware/auditLog.js';

const router = Router();
router.use(authenticate);

// GET /api/audit-log
router.get(
  '/',
  auditLog('VIEW_AUDIT_LOG', 'AuditLog'),
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { resourceType, action, page = '1', pageSize = '30' } = req.query;

    const where: Record<string, unknown> = {};
    if (resourceType) where.resourceType = resourceType;
    if (action) where.action = action;

    // District officers only see their own district audit logs
    if (req.user?.role === 'district_officer') {
      where.actor = { district: req.user.district };
    }

    const pageNum = parseInt(String(page), 10);
    const pageSizeNum = Math.min(parseInt(String(pageSize), 10), 100);

    const [items, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        include: { actor: { select: { name: true, role: true, email: true } } },
        orderBy: { timestamp: 'desc' },
        skip: (pageNum - 1) * pageSizeNum,
        take: pageSizeNum,
      }),
      prisma.auditLog.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        items: items.map((log) => ({
          id: log.id,
          actorId: log.actorId,
          actorName: log.actor.name,
          actorRole: log.actor.role,
          action: log.action,
          resourceType: log.resourceType,
          resourceId: log.resourceId,
          resourceLabel: log.resourceLabel,
          reason: log.reason,
          ipAddress: log.ipAddress,
          timestamp: log.timestamp,
        })),
        total,
        page: pageNum,
        pageSize: pageSizeNum,
        totalPages: Math.ceil(total / pageSizeNum),
      },
    });
  }
);

export default router;
