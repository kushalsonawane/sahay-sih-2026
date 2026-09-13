import React from 'react';
import type { Alert } from '@sahay/shared';
interface AlertCardProps {
    alert: Alert;
    onAcknowledge?: (id: string) => void;
    onEscalate?: (id: string) => void;
    onResolve?: (id: string, note?: string) => void;
}
export declare const AlertCard: React.FC<AlertCardProps>;
export {};
//# sourceMappingURL=AlertCard.d.ts.map