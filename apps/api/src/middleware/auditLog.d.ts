import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.js';
/**
 * Middleware factory that logs all data access and mutations to the audit trail.
 * Every sensitive resource access is recorded automatically.
 */
export declare function auditLog(action: string, resourceType: string): (req: AuthenticatedRequest, _res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auditLog.d.ts.map