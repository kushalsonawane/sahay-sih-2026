import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database.js';
import { AuthenticatedRequest } from './auth.js';

/**
 * Middleware factory that logs all data access and mutations to the audit trail.
 * Every sensitive resource access is recorded automatically.
 */
export function auditLog(action: string, resourceType: string) {
  return async (
    req: AuthenticatedRequest,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (req.user) {
        const resourceId =
          req.params.id ?? req.params.caseId ?? req.body?.caseId ?? 'unknown';

        await prisma.auditLog.create({
          data: {
            actorId: req.user.id,
            action,
            resourceType,
            resourceId: String(resourceId),
            caseId:
              resourceType === 'Case' && req.params.id ? req.params.id : undefined,
            reason: String(req.body?.reason ?? ''),
            ipAddress:
              (req.headers['x-forwarded-for'] as string) ??
              req.socket.remoteAddress ??
              'unknown',
          },
        });
      }
    } catch {
      // Audit log failure should never block the request
    }
    next();
  };
}
