import { config } from '../config/env.js';
export function errorHandler(err, _req, res, _next) {
    console.error('[SAHAY API Error]', err);
    const isDev = config.isDev;
    res.status(500).json({
        success: false,
        message: 'An internal server error occurred',
        ...(isDev && { details: err.message, stack: err.stack }),
    });
}
export function notFound(_req, res) {
    res.status(404).json({ success: false, message: 'Route not found' });
}
//# sourceMappingURL=errorHandler.js.map