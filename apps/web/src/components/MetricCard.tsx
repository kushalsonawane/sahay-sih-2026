import React from 'react';
import { cn } from '../lib/cn';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendGood?: boolean; // if true, 'up' is green; if false, 'up' is red (e.g. rising distress)
  icon?: React.ReactNode;
  variant?: 'default' | 'urgent' | 'warning' | 'calm';
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  change,
  trend,
  trendGood = true,
  icon,
  variant = 'default',
  onClick,
}) => {
  const borderVariants = {
    default: 'border-stone-200/80 bg-white hover:border-stone-300',
    urgent: 'border-rose-300 bg-rose-50/40 hover:border-rose-400',
    warning: 'border-amber-300 bg-amber-50/40 hover:border-amber-400',
    calm: 'border-teal-200 bg-teal-50/30 hover:border-teal-300',
  };

  const getTrendColor = () => {
    if (!trend || trend === 'neutral') return 'text-stone-500';
    if (trend === 'up') {
      return trendGood ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50';
    }
    return trendGood ? 'text-rose-700 bg-rose-50' : 'text-emerald-700 bg-emerald-50';
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-xl border p-4 sm:p-5 shadow-2xs transition-all',
        borderVariants[variant],
        onClick && 'cursor-pointer hover:shadow-xs'
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-stone-600 tracking-wide uppercase">
          {title}
        </span>
        {icon && (
          <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 font-serif">
          {value}
        </span>
        {change && (
          <span
            className={cn(
              'inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded',
              getTrendColor()
            )}
          >
            {trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
            {trend === 'down' && <ArrowDownRight className="w-3 h-3" />}
            {trend === 'neutral' && <Minus className="w-3 h-3" />}
            {change}
          </span>
        )}
      </div>

      {subtitle && <p className="mt-1 text-xs text-stone-500">{subtitle}</p>}
    </div>
  );
};
