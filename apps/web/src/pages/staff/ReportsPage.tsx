import React, { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { useCases } from '../../hooks/useCases';
import { useLanguage } from '../../hooks/useLanguage';
import { Download, FileText, CheckCircle2, Calendar, FileSpreadsheet, Eye } from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const { cases } = useCases();
  const { isHindi, isMarathi, isMarathi } = useLanguage();
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const reports = [
    {
      id: 'rep-rule12',
      title: 'Rule 12 Monthly Atrocity Relief & Compensation Disbursement Register',
      desc: 'Official return mandated under Rule 12(4) tracking FIR registration dates, 25% interim relief release, chargesheet submissions, and DBT status.',
      frequency: 'Monthly (Due by 7th)',
      lastGenerated: '11 Sep 2026',
    },
    {
      id: 'rep-protection',
      title: 'Section 15A Witness Protection & Intimidation Threat Audit',
      desc: 'Comprehensive register of threat reports, police escort assignments, safe accommodation orders, and SLA compliance.',
      frequency: 'Fortnightly',
      lastGenerated: '12 Sep 2026',
    },
    {
      id: 'rep-distress',
      title: 'District-Wise Multi-Channel Check-In Adherence & Distress Trajectory',
      desc: 'Summary of IVRS, SMS, and Web check-in responses, identifying blocks with high distress elevation or response attrition.',
      frequency: 'Weekly',
      lastGenerated: 'Today, 06:00 IST',
    },
  ];

  const handleDownloadCSV = (reportId: string, reportTitle: string) => {
    // Generate real CSV from cases
    const headers = [
      'CaseRef',
      'PersonMasked',
      'District',
      'State',
      'Stage',
      'RiskLevel',
      'DistressScore',
      'Trend',
      'CheckInCompletionRate',
      'LastCheckIn',
      'NextActionDue',
      'AssignedOfficer',
    ];

    const rows = cases.map((c) => [
      c.caseRef,
      `"${c.personNameMasked}"`,
      c.district,
      c.state,
      c.caseStage,
      c.riskLevel,
      c.distressScore,
      c.trend,
      `${c.checkInCompletionRate}%`,
      c.lastCheckIn || '',
      c.nextActionDue || '',
      `"${c.assignedOfficerName || ''}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `${reportId}_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(`Generated and downloaded ${reportTitle}`);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title={(isMarathi || isHindi) ? 'वैधानिक अनुपालन एवं रिपोर्ट जनरेटर' : 'Statutory Compliance & Reports Generator'}
        subtitle={
          (isMarathi || isHindi)
            ? 'सामाजिक न्याय और अधिकारिता मंत्रालय एवं विशेष अदालतों के लिए आधिकारिक रिपोर्ट'
            : 'Generate verifiable statutory returns, relief audit registers, and protection summaries for MoSJE review committees and Special Courts.'
        }
      />

      {downloadSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2 shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* Reports List */}
      <div className="grid gap-4">
        {reports.map((rep) => (
          <div
            key={rep.id}
            className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-2">
              <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-sm sm:text-base">
                <FileSpreadsheet className="w-4 h-4 text-teal-800 shrink-0" />
                <span>{rep.title}</span>
              </div>
              <span className="text-[11px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                {rep.frequency}
              </span>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">{rep.desc}</p>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs text-stone-500 border-t border-stone-100">
              <span>Last generated: <strong>{rep.lastGenerated}</strong></span>
              <button
                onClick={() => handleDownloadCSV(rep.id, rep.title)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs shadow-2xs transition"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Export CSV Dataset</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Live Data Preview of the CSV Dataset */}
      <div className="space-y-3 pt-4 border-t border-stone-200/80">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold font-serif text-stone-900">
            Live Dataset Preview (First 5 Records)
          </h3>
          <span className="text-xs text-stone-500">
            Total Records: {cases.length}
          </span>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-mono">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 text-[11px]">
                  <th className="py-2 px-3">CaseRef</th>
                  <th className="py-2 px-3">PersonMasked</th>
                  <th className="py-2 px-3">District</th>
                  <th className="py-2 px-3">Stage</th>
                  <th className="py-2 px-3">Risk</th>
                  <th className="py-2 px-3">Distress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {cases.slice(0, 5).map((c) => (
                  <tr key={c.id} className="hover:bg-stone-50/50">
                    <td className="py-2 px-3 font-semibold text-stone-900">{c.caseRef}</td>
                    <td className="py-2 px-3 text-stone-600">{c.personNameMasked}</td>
                    <td className="py-2 px-3 text-stone-700">{c.district}</td>
                    <td className="py-2 px-3 uppercase text-[10px]">{c.caseStage}</td>
                    <td className="py-2 px-3 capitalize">{c.riskLevel}</td>
                    <td className="py-2 px-3 font-bold text-stone-900">{c.distressScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
