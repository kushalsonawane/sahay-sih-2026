/**
 * SAHAY API Server
 * Smart India Hackathon Prototype
 * Ministry of Social Justice and Empowerment
 *
 * This is a demonstration backend. All data is fictional and anonymized.
 * See /api/health for server status.
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { config } from './config/env.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

// Module routers
import authRouter from './modules/auth/auth.router.js';
import casesRouter from './modules/cases/cases.router.js';
import checkInsRouter from './modules/check-ins/checkIns.router.js';
import alertsRouter from './modules/alerts/alerts.router.js';
import interventionsRouter from './modules/interventions/interventions.router.js';
import analyticsRouter from './modules/analytics/analytics.router.js';
import auditLogRouter from './modules/audit-log/auditLog.router.js';
import reportsRouter from './modules/reports/reports.router.js';

const app = express();

// ---- Security middleware ----
app.use(helmet({ contentSecurityPolicy: false }));
app.use(
  cors({
    origin: (requestOrigin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
      if (!requestOrigin) return callback(null, true);
      // Allow if CORS_ORIGIN is wildcard or matches directly
      if (config.cors.origin === '*' || requestOrigin === config.cors.origin) {
        return callback(null, true);
      }
      // Allow Vercel preview/production deployments and local dev
      if (
        requestOrigin.endsWith('.vercel.app') ||
        requestOrigin.includes('localhost') ||
        requestOrigin.includes('127.0.0.1')
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(
  rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.max,
    message: { success: false, message: 'Too many requests — please try again later' },
  })
);

// ---- Logging & body parsing ----
if (config.isDev) {
  app.use(morgan('dev'));
}
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// ---- Health check ----
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'SAHAY API',
    version: '1.0.0',
    environment: config.nodeEnv,
    timestamp: new Date().toISOString(),
    notice: 'Smart India Hackathon Prototype — Demo data only',
  });
});

// ---- API Routes ----
app.use('/api/auth', authRouter);
app.use('/api/cases', casesRouter);
app.use('/api/check-ins', checkInsRouter);
app.use('/api/alerts', alertsRouter);
app.use('/api/interventions', interventionsRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/audit-log', auditLogRouter);
app.use('/api/reports', reportsRouter);

// ---- Error handling ----
app.use(notFound);
app.use(errorHandler);

// ---- Start server ----
app.listen(config.port, () => {
  console.log(`\n🌟 SAHAY API running on http://localhost:${config.port}`);
  console.log(`   Environment: ${config.nodeEnv}`);
  console.log(`   Health check: http://localhost:${config.port}/api/health`);
  console.log(`\n⚠️  Smart India Hackathon Prototype — Demo data only\n`);
});

export default app;
