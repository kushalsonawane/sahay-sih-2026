import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import { mockAuditEvents } from '../../data/mockTimeline';
import { formatDate } from '../../lib/dateUtils';
import { useLanguage } from '../../hooks/useLanguage';
import { ShieldCheck, Lock, User, Clock, FileText, CheckCircle2 } from 'lucide-react';

export const AuditLogPage: React.FC = () => {
  const { isHindi, isMarathi } = useLanguage();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <PageHeader
        title={(isMarathi || isHindi) ? 'सुरक्षित डेटा एक्सेस एवं ऑडिट ट्रेल' : 'Confidential Data Access & Audit Trail'}
        subtitle={
          (isMarathi || isHindi)
            ? 'अधिकारियों द्वारा मामले के अवलोकन, स्थिति परिवर्तन एवं आदेशों का अपरिवर्तनीय रिकॉर्ड'
            : 'Immutable, cryptographically verified record of every case access, officer action, status update, and statutory report export.'
        }
        badge={
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Cryptographically Verified</span>
          </span>
        }
      />

      {/* Audit Banner */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs text-stone-600 space-y-1">
        <span className="font-bold text-stone-900">Statutory Compliance Standard:</span>
        <p className="leading-relaxed">
          In accordance with the Bharatiya Nyaya Sanhita and Ministry Data Protection Guidelines, all actions performed on victim sensitive data are logged permanently with officer credentials, client IP, and stated administrative purpose.
        </p>
      </div>

      {/* Audit Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Timestamp (IST)</th>
                <th className="py-3.5 px-4">Official Actor</th>
                <th className="py-3.5 px-4">Action Performed</th>
                <th className="py-3.5 px-4">Resource Affected</th>
                <th className="py-3.5 px-4">Stated Purpose / Legal Reason</th>
                <th className="py-3.5 px-4">Client IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200/70">
              {mockAuditEvents.map((evt) => (
                <tr key={evt.id} className="hover:bg-stone-50/80 transition font-mono text-[11px]">
                  <td className="py-3.5 px-4 text-stone-600 whitespace-nowrap">
                    {formatDate(evt.timestamp)}
                  </td>
                  <td className="py-3.5 px-4 font-sans">
                    <div className="font-bold text-stone-900">{evt.actorName}</div>
                    <div className="text-stone-500 text-[10px] capitalize">
                      {evt.actorRole.replace('_', ' ')}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-800 font-bold text-[10px]">
                      {evt.action}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-sans font-medium text-stone-900">
                    {evt.resourceLabel || evt.resourceId}
                  </td>
                  <td className="py-3.5 px-4 font-sans text-stone-600 max-w-xs">
                    {evt.reason || 'Routine operational case review'}
                  </td>
                  <td className="py-3.5 px-4 text-stone-400">
                    {evt.ipAddress}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
