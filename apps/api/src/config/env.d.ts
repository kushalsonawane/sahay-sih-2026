import 'dotenv/config';
export declare const config: {
    port: number;
    nodeEnv: string;
    isDev: boolean;
    jwt: {
        secret: string;
        refreshSecret: string;
        expiresIn: string;
        refreshExpiresIn: string;
    };
    cors: {
        origin: string;
    };
    rateLimit: {
        windowMs: number;
        max: number;
    };
};
//# sourceMappingURL=env.d.ts.map