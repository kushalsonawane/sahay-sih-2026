import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { prisma } from '../config/database.js';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    name: string;
    district?: string;
    state?: string;
  };
}

export async function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, config.jwt.secret) as {
      id: string;
      email: string;
      role: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id, isActive: true },
      select: { id: true, email: true, role: true, name: true, district: true, state: true },
    });

    if (!user) {
      res.status(401).json({ success: false, message: 'User not found or inactive' });
      return;
    }

    req.user = {
      ...user,
      district: user.district ?? undefined,
      state: user.state ?? undefined,
    };
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
}

export function authorize(...roles: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }
    if (roles.length > 0 && !roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: 'You do not have permission to perform this action',
      });
      return;
    }
    next();
  };
}

export async function optionalAuthenticate(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, config.jwt.secret) as {
        id: string;
        email: string;
        role: string;
      };

      const user = await prisma.user.findUnique({
        where: { id: decoded.id, isActive: true },
        select: { id: true, email: true, role: true, name: true, district: true, state: true },
      });

      if (user) {
        req.user = {
          ...user,
          district: user.district ?? undefined,
          state: user.state ?? undefined,
        };
        return next();
      }
    }
  } catch {
    // Proceed to fallback
  }

  // Fallback demo user context so demo requests without JWT work smoothly
  try {
    const demoUser = await prisma.user.findFirst({
      where: { role: 'district_officer' },
      select: { id: true, email: true, role: true, name: true, district: true, state: true },
    });
    if (demoUser) {
      req.user = {
        ...demoUser,
        district: demoUser.district ?? undefined,
        state: demoUser.state ?? undefined,
      };
    }
  } catch {
    // ignore
  }

  next();
}
