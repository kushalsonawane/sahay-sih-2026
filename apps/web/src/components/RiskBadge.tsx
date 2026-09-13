import React from 'react';
import type { RiskLevel } from '@sahay/shared';
import { cn } from '../lib/cn';
import { useLanguage } from '../hooks/useLanguage';

interface RiskBadgeProps {
  level: RiskLevel;
  className?: string;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  level,
  className,
  showIcon = true,
  size = 'md',
}) => {
  const { t } = useLanguage();

  const config: Record<
    RiskLevel,
    { label: string; bg: string; text: string; border: string; dot: string }
  > = {
    low: {
      label: t.risk?.low || 'Low',
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      text: 'text-emerald-800',
      border: 'border-emerald-200',
      dot: 'bg-emerald-600',
    },
    moderate: {
      label: t.risk?.moderate || 'Moderate',
      bg: 'bg-amber-50 text-amber-800 border-amber-200',
      text: 'text-amber-800',
      border: 'border-amber-200',
      dot: 'bg-amber-600',
    },
    high: {
      label: t.risk?.high || 'High',
      bg: 'bg-orange-50 text-orange-800 border-orange-200',
      text: 'text-orange-800',
      border: 'border-orange-200',
      dot: 'bg-orange-600',
    },
    critical: {
      label: t.risk?.critical || 'Critical',
      bg: 'bg-rose-50 text-rose-800 border-rose-200',
      text: 'text-rose-800',
      border: 'border-rose-200',
      dot: 'bg-rose-600',
    },
  };

  const current = config[level] || config.low;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 gap-2 font-semibold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border transition-colors',
        current.bg,
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label={`Risk level: ${current.label}`}
    >
      {showIcon && (
        <span
          className={cn(
            'rounded-full',
            current.dot,
            size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2',
            level === 'critical' && 'animate-pulse'
          )}
          aria-hidden="true"
        />
      )}
      <span>{current.label}</span>
    </span>
  );
};
