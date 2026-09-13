import React from 'react';
import type { RiskLevel } from '@sahay/shared';
interface Factor {
    name: string;
    weight: string;
    impact: 'high' | 'medium' | 'low';
    description: string;
}
interface ModelTransparencyPanelProps {
    score: number;
    riskLevel: RiskLevel;
    factors?: Factor[];
    lastAssessed?: string;
    className?: string;
}
export declare const ModelTransparencyPanel: React.FC<ModelTransparencyPanelProps>;
export {};
//# sourceMappingURL=ModelTransparencyPanel.d.ts.map