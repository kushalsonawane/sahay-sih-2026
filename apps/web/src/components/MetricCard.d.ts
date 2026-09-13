import React from 'react';
interface MetricCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
    trendGood?: boolean;
    icon?: React.ReactNode;
    variant?: 'default' | 'urgent' | 'warning' | 'calm';
    onClick?: () => void;
}
export declare const MetricCard: React.FC<MetricCardProps>;
export {};
//# sourceMappingURL=MetricCard.d.ts.map