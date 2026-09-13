import React from 'react';
import { Link } from 'react-router-dom';
import type { Case } from '@sahay/shared';
import { RiskBadge } from '../RiskBadge';
import { StatusBadge } from '../StatusBadge';
import { formatDate } from '../../lib/dateUtils';
import { TrendingUp, TrendingDown, Minus, ArrowRight, Shield, AlertCircle } from 'lucide-react';

interface CaseTableProps {
  cases: Case[];
}

export const CaseTable: React.FC<CaseTableProps> = ({ cases }) => {
  const renderTrend = (trend: string) => {
    switch (trend) {
      case 'worsening':
        return (
          <span className="inline-flex items-center text-rose-700 text-xs font-semibold" title="Distress Worsening">
            <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> Worsening
          </span>
        );
      case 'improving':
        return (
          <span className="inline-flex items-center text-emerald-700 text-xs font-semibold" title="Distress Improving">
            <TrendingDown className="w-3.5 h-3.5 mr-0.5" /> Improving
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center text-stone-500 text-xs font-medium" title="Distress Stable">
            <Minus className="w-3.5 h-3.5 mr-0.5" /> Stable
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-stone-50/90 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3.5 px-4">Case Ref & Masked Identity</th>
              <th className="py-3.5 px-4">District & Block</th>
              <th className="py-3.5 px-4">Legal Stage</th>
              <th className="py-3.5 px-4">Distress Score & Risk</th>
              <th className="py-3.5 px-4">Trend</th>
              <th className="py-3.5 px-4">Next Required Action</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200/70">
            {cases.map((c) => (
              <tr
                key={c.id}
                className="hover:bg-stone-50/80 transition group"
              >
                {/* Ref & Identity */}
                <td className="py-3.5 px-4">
                  <div className="font-bold text-stone-900 font-mono text-[12px]">
                    {c.caseRef}
                  </div>
                  <div className="text-stone-500 text-[11px] flex items-center gap-1 mt-0.5">
                    <Shield className="w-3 h-3 text-stone-400" />
                    <span>{c.personNameMasked}</span>
                  </div>
                </td>

                {/* District */}
                <td className="py-3.5 px-4">
                  <div className="font-medium text-stone-900">{c.district}</div>
                  <div className="text-stone-500 text-[11px]">{c.block || c.state}</div>
                </td>

                {/* Stage */}
                <td className="py-3.5 px-4">
                  <StatusBadge status={c.caseStage} size="sm" />
                </td>

                {/* Distress & Risk */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-serif text-sm text-stone-900">
                      {c.distressScore}
                    </span>
                    <RiskBadge level={c.riskLevel} size="sm" />
                  </div>
                  <div className="text-[10px] text-stone-400 mt-0.5">
                    Check-in Rate: {c.checkInCompletionRate}%
                  </div>
                </td>

                {/* Trend */}
                <td className="py-3.5 px-4">
                  {renderTrend(c.trend)}
                </td>

                {/* Next Action */}
                <td className="py-3.5 px-4 max-w-xs">
                  <div className="text-stone-800 line-clamp-1 font-medium">
                    {c.nextAction || 'Routine weekly monitoring check-in'}
                  </div>
                  {c.nextActionDue && (
                    <div className="text-[10px] text-stone-500 mt-0.5">
                      Due by: <strong>{formatDate(c.nextActionDue)}</strong>
                    </div>
                  )}
                </td>

                {/* Action Link */}
                <td className="py-3.5 px-4 text-right">
                  <Link
                    to={`/cases/${c.id}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium text-[11px] transition shadow-2xs group-hover:ring-2 group-hover:ring-primary/30"
                  >
                    <span>View Case</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
