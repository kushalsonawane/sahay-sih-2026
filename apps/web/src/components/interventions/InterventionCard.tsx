import React from 'react';
import { Link } from 'react-router-dom';
import type { Intervention } from '@sahay/shared';
import { formatDate } from '../../lib/dateUtils';
import { StatusBadge } from '../StatusBadge';
import {
  ShieldCheck,
  Clock,
  CheckCircle2,
  Building,
  User,
  ArrowUpRight,
  Check,
} from 'lucide-react';
import { cn } from '../../lib/cn';

interface InterventionCardProps {
  intervention: Intervention;
  onApprove?: (id: string) => void;
  onStatusChange?: (id: string, status: any) => void;
}

export const InterventionCard: React.FC<InterventionCardProps> = ({
  intervention,
  onApprove,
  onStatusChange,
}) => {
  const isUrgent = intervention.priority === 'urgent';
  const isPending = intervention.approvalStatus === 'pending';

  return (
    <div
      className={cn(
        'rounded-xl border p-4 sm:p-5 bg-white shadow-2xs space-y-3 transition-all',
        isUrgent && 'border-rose-300 bg-rose-50/15',
        intervention.status === 'completed' && 'opacity-80 bg-stone-50'
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-navy-900 text-white">
            {intervention.interventionType.replace('_', ' ')}
          </span>
          <span
            className={cn(
              'px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider',
              isUrgent ? 'bg-rose-100 text-rose-800' : 'bg-stone-100 text-stone-700'
            )}
          >
            {intervention.priority} Priority
          </span>
          <StatusBadge status={intervention.status} size="sm" />
        </div>

        <Link
          to={`/cases/${intervention.caseId}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-navy-900 hover:text-navy-700 underline"
        >
          <span>{intervention.caseRef}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div>
        <h4 className="text-sm font-bold text-stone-900 font-serif">
          {intervention.reason}
        </h4>
        <div className="text-xs text-stone-500 mt-1 flex items-center gap-2">
          <span>Subject: <strong>{intervention.personNameMasked}</strong></span>
          <span>•</span>
          <span>District: <strong>{intervention.district}</strong></span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-2 text-xs bg-stone-50 p-3 rounded-lg border border-stone-200/70">
        <div className="flex items-center gap-1.5 text-stone-700">
          <Building className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span className="truncate">
            Dept: <strong>{intervention.assignedDept}</strong>
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-stone-700">
          <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span>
            Target Due: <strong>{formatDate(intervention.dueDate)}</strong>
          </span>
        </div>
      </div>

      {intervention.notes && (
        <p className="text-xs text-stone-600 italic bg-white p-2 rounded border border-stone-200/50">
          "{intervention.notes}"
        </p>
      )}

      {/* Action footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100">
        <div className="text-[11px] text-stone-500">
          Approval: <strong className="capitalize">{intervention.approvalStatus}</strong>
          {intervention.approvedById && ' (Signed off)'}
        </div>

        <div className="flex items-center gap-2">
          {isPending && onApprove && (
            <button
              onClick={() => onApprove(intervention.id)}
              className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-2xs transition flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Approve & Authorize</span>
            </button>
          )}

          {intervention.status === 'in_progress' && onStatusChange && (
            <button
              onClick={() => onStatusChange(intervention.id, 'completed')}
              className="px-3 py-1.5 rounded-lg border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-medium transition flex items-center gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Mark as Completed</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
