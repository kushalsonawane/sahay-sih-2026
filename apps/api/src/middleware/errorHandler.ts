import { Request, Response, NextFunction } from 'express';
import { config } from '../config/env.js';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('[SAHAY API Error]', err);

  const isDev = config.isDev;

  res.status(500).json({
    success: false,
    message: 'An internal server error occurred',
    ...(isDev && { details: err.message, stack: err.stack }),
  });
}

export function notFound(_req: Request, res: Response): void {
  res.status(404).json({ success: false, message: 'Route not found' });
}
