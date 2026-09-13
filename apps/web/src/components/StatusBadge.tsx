import React from 'react';
import type { CaseStage, AlertStatus, InterventionStatus } from '@sahay/shared';
import { cn } from '../lib/cn';

interface StatusBadgeProps {
  status: CaseStage | AlertStatus | InterventionStatus | string;
  className?: string;
  size?: 'sm' | 'md';
}

const statusMap: Record<string, { label: string; className: string }> = {
  // Case Stages
  registration: { label: 'Registration / FIR', className: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
  investigation: { label: 'Investigation', className: 'bg-sky-50 text-sky-800 border-sky-200' },
  trial: { label: 'Special Court Trial', className: 'bg-purple-50 text-purple-800 border-purple-200' },
  compensation: { label: 'Statutory Relief', className: 'bg-amber-50 text-amber-800 border-amber-200' },
  rehabilitation: { label: 'Rehabilitation', className: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  witness_protection: { label: 'Witness Protection', className: 'bg-rose-50 text-rose-800 border-rose-200' },
  closed: { label: 'Closed / Rehabilitated', className: 'bg-slate-100 text-slate-700 border-slate-200' },

  // Alert Statuses
  new: { label: 'New Alert', className: 'bg-red-50 text-red-800 border-red-200 font-semibold' },
  acknowledged: { label: 'Acknowledged', className: 'bg-amber-50 text-amber-800 border-amber-200' },
  assigned: { label: 'Assigned', className: 'bg-blue-50 text-blue-800 border-blue-200' },
  escalated: { label: 'Escalated to SP/DM', className: 'bg-purple-50 text-purple-800 border-purple-200' },
  resolved: { label: 'Resolved', className: 'bg-emerald-50 text-emerald-800 border-emerald-200' },

  // Intervention Statuses
  pending: { label: 'Pending Approval', className: 'bg-amber-50 text-amber-800 border-amber-200' },
  approved: { label: 'Approved', className: 'bg-blue-50 text-blue-800 border-blue-200' },
  in_progress: { label: 'In Progress', className: 'bg-sky-50 text-sky-800 border-sky-200' },
  completed: { label: 'Completed', className: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  cancelled: { label: 'Cancelled', className: 'bg-slate-100 text-slate-600 border-slate-200' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className, size = 'md' }) => {
  const info = statusMap[status] || {
    label: status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    className: 'bg-slate-50 text-slate-700 border-slate-200',
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1 font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border tracking-wide uppercase',
        info.className,
        sizeClasses[size],
        className
      )}
    >
      {info.label}
    </span>
  );
};
