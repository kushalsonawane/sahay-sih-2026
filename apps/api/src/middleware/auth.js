import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { prisma } from '../config/database.js';
export async function authenticate(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            res.status(401).json({ success: false, message: 'Authentication required' });
            return;
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, config.jwt.secret);
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
    }
    catch {
        res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
}
export function authorize(...roles) {
    return (req, res, next) => {
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
//# sourceMappingURL=auth.js.map