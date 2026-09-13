import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../config/database.js';
import { config } from '../../config/env.js';
import { authenticate } from '../../middleware/auth.js';
const router = Router();
function generateTokens(userId, email, role) {
    const accessToken = jwt.sign({ id: userId, email, role }, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn,
    });
    const refreshToken = jwt.sign({ id: userId }, config.jwt.refreshSecret, {
        expiresIn: config.jwt.refreshExpiresIn,
    });
    return { accessToken, refreshToken };
}
// POST /api/auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body ?? {};
    if (!email || !password) {
        res.status(400).json({ success: false, message: 'Email and password are required' });
        return;
    }
    const user = await prisma.user.findUnique({ where: { email: String(email) } });
    if (!user || !user.isActive) {
        res.status(401).json({ success: false, message: 'Invalid email or password' });
        return;
    }
    const valid = await bcrypt.compare(String(password), user.passwordHash);
    if (!valid) {
        res.status(401).json({ success: false, message: 'Invalid email or password' });
        return;
    }
    const { accessToken, refreshToken } = generateTokens(user.id, user.email, user.role);
    // Store refresh token
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await prisma.refreshToken.create({
        data: { token: refreshToken, userId: user.id, expiresAt },
    });
    res.json({
        success: true,
        data: {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                district: user.district,
                state: user.state,
                language: user.language,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
            tokens: {
                accessToken,
                refreshToken,
                expiresIn: 900, // 15 minutes in seconds
            },
        },
    });
});
// POST /api/auth/refresh
router.post('/refresh', async (req, res) => {
    const { refreshToken } = req.body ?? {};
    if (!refreshToken) {
        res.status(400).json({ success: false, message: 'Refresh token required' });
        return;
    }
    try {
        const decoded = jwt.verify(refreshToken, config.jwt.refreshSecret);
        const stored = await prisma.refreshToken.findFirst({
            where: { token: refreshToken, revokedAt: null, expiresAt: { gt: new Date() } },
            include: { user: true },
        });
        if (!stored || stored.userId !== decoded.id) {
            res.status(401).json({ success: false, message: 'Invalid or expired refresh token' });
            return;
        }
        const { accessToken, refreshToken: newRefreshToken } = generateTokens(stored.user.id, stored.user.email, stored.user.role);
        // Rotate refresh token
        await prisma.refreshToken.update({
            where: { id: stored.id },
            data: { revokedAt: new Date() },
        });
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await prisma.refreshToken.create({
            data: { token: newRefreshToken, userId: stored.user.id, expiresAt },
        });
        res.json({
            success: true,
            data: {
                tokens: { accessToken, refreshToken: newRefreshToken, expiresIn: 900 },
            },
        });
    }
    catch {
        res.status(401).json({ success: false, message: 'Invalid refresh token' });
    }
});
// POST /api/auth/logout
router.post('/logout', authenticate, async (req, res) => {
    const { refreshToken } = req.body ?? {};
    if (refreshToken) {
        await prisma.refreshToken.updateMany({
            where: { token: refreshToken },
            data: { revokedAt: new Date() },
        }).catch(() => { });
    }
    res.json({ success: true, message: 'Logged out successfully' });
});
// GET /api/auth/me
router.get('/me', authenticate, (req, res) => {
    res.json({ success: true, data: req.user });
});
export default router;
//# sourceMappingURL=auth.router.js.map