import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Alert } from '@sahay/shared';
import { formatDate } from '../../lib/dateUtils';
import { StatusBadge } from '../StatusBadge';
import {
  AlertTriangle,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  Shield,
  Send,
  Building,
} from 'lucide-react';
import { cn } from '../../lib/cn';

interface AlertCardProps {
  alert: Alert;
  onAcknowledge?: (id: string) => void;
  onEscalate?: (id: string) => void;
  onResolve?: (id: string, note?: string) => void;
}

export const AlertCard: React.FC<AlertCardProps> = ({
  alert,
  onAcknowledge,
  onEscalate,
  onResolve,
}) => {
  const [resolveNote, setResolveNote] = useState('');
  const [showResolveInput, setShowResolveInput] = useState(false);

  const isCritical = alert.severity === 'critical';
  const isHigh = alert.severity === 'high';

  const handleResolveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onResolve?.(alert.id, resolveNote);
    setShowResolveInput(false);
  };

  return (
    <div
      className={cn(
        'rounded-xl border p-4 sm:p-5 transition-all shadow-2xs space-y-4 bg-white',
        isCritical && 'border-rose-300 bg-rose-50/20 ring-1 ring-rose-300/60',
        isHigh && 'border-orange-300 bg-orange-50/15',
        alert.status === 'resolved' && 'opacity-75 bg-stone-50 border-stone-200'
      )}
    >
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider',
              isCritical && 'bg-rose-600 text-white',
              isHigh && 'bg-orange-600 text-white',
              alert.severity === 'moderate' && 'bg-amber-600 text-white',
              alert.severity === 'info' && 'bg-teal-600 text-white'
            )}
          >
            {alert.severity} Severity
          </span>
          <StatusBadge status={alert.status} size="sm" />
          <span className="text-xs text-stone-500">
            Detected {formatDate(alert.detectedAt)}
          </span>
        </div>

        <Link
          to={`/cases/${alert.caseId}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-navy-900 hover:text-navy-700 underline"
        >
          <span>Case {alert.caseRef}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Trigger Description */}
      <div>
        <h4 className="text-sm font-bold text-stone-900 font-serif">
          {alert.triggerDescription}
        </h4>
        <div className="flex items-center gap-3 text-xs text-stone-500 mt-1">
          <span>Masked Subject: <strong>{alert.personNameMasked}</strong></span>
          <span>•</span>
          <span>District: <strong>{alert.district}</strong></span>
          <span>•</span>
          <span>Stage: <strong className="capitalize">{alert.caseStage.replace('_', ' ')}</strong></span>
        </div>
      </div>

      {/* Recommended Action & SLA */}
      <div className="p-3 rounded-lg bg-stone-50 border border-stone-200/80 space-y-2 text-xs">
        <div className="flex items-start gap-2">
          <Shield className="w-4 h-4 text-navy-900 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-stone-900">Recommended Protocol Action:</span>
            <p className="text-stone-700 mt-0.5 leading-relaxed">
              {alert.recommendedAction}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-stone-600 pt-1 border-t border-stone-200/60">
          <span className="flex items-center gap-1 text-rose-700 font-semibold">
            <Clock className="w-3.5 h-3.5" /> SLA Deadline: {formatDate(alert.slaDue)}
          </span>
          {alert.ownerName && (
            <span>Assigned Officer: <strong>{alert.ownerName}</strong></span>
          )}
        </div>
      </div>

      {/* Resolution note if already resolved */}
      {alert.status === 'resolved' && alert.resolutionNote && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
          <span className="font-semibold">Resolution Record:</span> {alert.resolutionNote}
        </div>
      )}

      {/* Action Buttons */}
      {alert.status !== 'resolved' && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
          {alert.status === 'new' && onAcknowledge && (
            <button
              onClick={() => onAcknowledge(alert.id)}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-semibold shadow-2xs transition"
            >
              Acknowledge Alert
            </button>
          )}

          {onEscalate && alert.status !== 'escalated' && (
            <button
              onClick={() => onEscalate(alert.id)}
              className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium transition flex items-center gap-1"
            >
              <Send className="w-3 h-3 text-amber-400" />
              <span>Escalate to District Magistrate / SP</span>
            </button>
          )}

          {onResolve && !showResolveInput && (
            <button
              onClick={() => setShowResolveInput(true)}
              className="px-3 py-1.5 rounded-lg border border-emerald-600 text-emerald-700 hover:bg-emerald-50 text-xs font-semibold transition ml-auto flex items-center gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Record Resolution</span>
            </button>
          )}
        </div>
      )}

      {/* Inline Resolution form */}
      {showResolveInput && (
        <form onSubmit={handleResolveSubmit} className="pt-2 space-y-2">
          <textarea
            required
            rows={2}
            value={resolveNote}
            onChange={(e) => setResolveNote(e.target.value)}
            placeholder="Document action taken (e.g. Police protection assigned, counsellor conducted home visit)..."
            className="w-full p-2 text-xs border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
          <div className="flex items-center gap-2 justify-end">
            <button
              type="button"
              onClick={() => setShowResolveInput(false)}
              className="px-2.5 py-1 text-xs text-stone-600 hover:text-stone-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-semibold"
            >
              Submit Resolution
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
