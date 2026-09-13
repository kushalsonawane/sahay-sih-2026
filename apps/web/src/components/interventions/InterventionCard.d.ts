import React from 'react';
import type { Intervention } from '@sahay/shared';
interface InterventionCardProps {
    intervention: Intervention;
    onApprove?: (id: string) => void;
    onStatusChange?: (id: string, status: any) => void;
}
export declare const InterventionCard: React.FC<InterventionCardProps>;
export {};
//# sourceMappingURL=InterventionCard.d.ts.map