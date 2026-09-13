import React from 'react';
interface RiskDistributionChartProps {
    distribution: {
        low: number;
        moderate: number;
        high: number;
        critical: number;
    };
    title?: string;
    subtitle?: string;
}
export declare const RiskDistributionChart: React.FC<RiskDistributionChartProps>;
export {};
//# sourceMappingURL=RiskDistributionChart.d.ts.map