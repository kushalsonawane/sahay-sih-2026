import React from 'react';
import type { CaseStage, AlertStatus, InterventionStatus } from '@sahay/shared';
interface StatusBadgeProps {
    status: CaseStage | AlertStatus | InterventionStatus | string;
    className?: string;
    size?: 'sm' | 'md';
}
export declare const StatusBadge: React.FC<StatusBadgeProps>;
export {};
//# sourceMappingURL=StatusBadge.d.ts.map