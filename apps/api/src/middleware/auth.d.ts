import { Request, Response, NextFunction } from 'express';
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
export declare function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
export declare function authorize(...roles: string[]): (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.d.ts.map