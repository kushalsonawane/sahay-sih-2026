import React from 'react';
import type { DataConfidence } from '@sahay/shared';
import { Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import { cn } from '../lib/cn';

interface DataFreshnessIndicatorProps {
  hoursAgo: number;
  confidence: DataConfidence;
  channel?: string;
  className?: string;
}

export const DataFreshnessIndicator: React.FC<DataFreshnessIndicatorProps> = ({
  hoursAgo,
  confidence,
  channel = 'web',
  className,
}) => {
  const getConfidenceBadge = () => {
    switch (confidence) {
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-medium border border-emerald-200">
            <ShieldCheck className="w-3 h-3" /> High Confidence
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[11px] font-medium border border-amber-200">
            <AlertCircle className="w-3 h-3" /> Moderate Confidence
          </span>
        );
      case 'limited':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-rose-700 bg-rose-50 px-2 py-0.5 rounded text-[11px] font-medium border border-rose-200">
            <AlertCircle className="w-3 h-3" /> Limited Confidence (Stale)
          </span>
        );
    }
  };

  const formatHours = (h: number) => {
    if (h < 1) return 'Just now';
    if (h < 24) return `${h} hours ago`;
    const days = Math.floor(h / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  return (
    <div className={cn('flex flex-wrap items-center gap-2 text-xs text-stone-500', className)}>
      <span className="inline-flex items-center gap-1">
        <Clock className="w-3.5 h-3.5 text-stone-400" />
        <span>Last data: <strong>{formatHours(hoursAgo)}</strong></span>
      </span>
      <span>•</span>
      <span className="capitalize">Source: <strong>{channel.toUpperCase()}</strong></span>
      <span>•</span>
      {getConfidenceBadge()}
    </div>
  );
};
