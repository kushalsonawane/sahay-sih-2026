import React, { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { useLanguage } from '../../hooks/useLanguage';
import { Download, CheckCircle2, FileSpreadsheet, Layers, ShieldCheck, Activity } from 'lucide-react';
import {
  mockRule12Data,
  mockProtectionData,
  mockDistrictAdherenceData,
} from '../../data/mockReportsData';

export const ReportsPage: React.FC = () => {
  const { isHindi, isMarathi } = useLanguage();
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [activePreviewTab, setActivePreviewTab] = useState<'rule12' | 'protection' | 'distress'>('rule12');

  const downloadCSVFile = (filename: string, headers: string[], rows: (string | number)[][]) => {
    // RFC 4180 compliant CSV generator with UTF-8 BOM for Microsoft Excel & Google Sheets
    const escapeCell = (val: string | number) => {
      const str = String(val ?? '');
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const csvLines = [
      headers.map(escapeCell).join(','),
      ...rows.map((row) => row.map(escapeCell).join(',')),
    ];

    const csvBlob = new Blob(['\uFEFF' + csvLines.join('\r\n')], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(csvBlob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadReport = (reportId: string) => {
    const today = new Date().toISOString().split('T')[0];

    if (reportId === 'rep-rule12') {
      const headers = [
        'FIR Number',
        'FIR Registration Date',
        'District',
        'State',
        'Beneficiary (Masked)',
        'Caste Category',
        'PoA Act Sections',
        'Total Entitled Relief (INR)',
        'Stage 1 Amount (INR)',
        'Stage 1 Status',
        'Stage 1 DBT UTR Reference',
        '7-Day Statutory SLA Compliance',
        'Stage 2 Status (Chargesheet 50%)',
        'Stage 3 Status (Conviction 25%)',
        'Sanctioning Authority',
      ];
      const rows = mockRule12Data.map((r) => [
        r.firNumber,
        r.firDate,
        r.district,
        r.state,
        r.beneficiaryMasked,
        r.casteCategory,
        r.poaSections,
        r.totalEntitledRelief,
        r.stage1Amount,
        r.stage1Status,
        r.stage1DbtUtr,
        r.stage1SlaStatus,
        r.stage2Status,
        r.stage3Status,
        r.sanctioningAuthority,
      ]);
      downloadCSVFile(`Rule_12_Relief_Disbursement_Register_${today}.csv`, headers, rows);
      setDownloadSuccess('Exported Rule 12 Statutory Relief & Compensation Register (.CSV)');
    } else if (reportId === 'rep-protection') {
      const headers = [
        'Threat Audit ID',
        'Case Reference',
        'District',
        'State',
        'Protected Subject (Masked)',
        'Incident Date',
        'Threat Classification',
        'Risk Tier',
        'Armed Police Escort',
        'Safe House / Relocation Status',
        'CCTV Security',
        'Patrol Frequency',
        'Response SLA',
        'Section 15A Audit Status',
      ];
      const rows = mockProtectionData.map((p) => [
        p.threatId,
        p.caseRef,
        p.district,
        p.state,
        p.protectedSubject,
        p.incidentDate,
        p.threatClassification,
        p.riskTier,
        p.armedEscort,
        p.safeHouse,
        p.cctvSecurity,
        p.patrolFrequency,
        p.responseSla,
        p.auditStatus,
      ]);
      downloadCSVFile(`Section_15A_Witness_Protection_Threat_Audit_${today}.csv`, headers, rows);
      setDownloadSuccess('Exported Section 15A Witness Protection & Threat Audit (.CSV)');
    } else {
      const headers = [
        'District',
        'State',
        'Monitored Cohort Size',
        'IVRS Calls Completed',
        'SMS Pulse Completed',
        'Web App Check-Ins',
        '30-Day Adherence Rate',
        'Average Distress Score (0-100)',
        'Critical Escalations (Last 7d)',
        'Counsellor Follow-Ups',
        'Average Response SLA (Hours)',
        'DLSA Legal Counsel Status',
      ];
      const rows = mockDistrictAdherenceData.map((d) => [
        d.district,
        d.state,
        d.cohortSize,
        d.ivrsCompleted,
        d.smsCompleted,
        d.webCompleted,
        d.adherenceRate,
        d.avgDistress,
        d.criticalEscalations7d,
        d.counsellorFollowups,
        d.avgResponseSlaHours,
        d.dlsaStatus,
      ]);
      downloadCSVFile(`District_CheckIn_Adherence_Distress_Trajectory_${today}.csv`, headers, rows);
      setDownloadSuccess('Exported District Check-In Adherence & Distress Trajectory (.CSV)');
    }

    setTimeout(() => setDownloadSuccess(null), 4500);
  };

  const reports = [
    {
      id: 'rep-rule12',
      title: isMarathi
        ? 'नियम १२ मासिक अत्याचार निवारण व आर्थिक भरपाई वाटप नोंदवही'
        : isHindi
        ? 'नियम 12 मासिक अत्याचार निवारण एवं मुआवजा वितरण रजिस्टर'
        : 'Rule 12 Monthly Atrocity Relief & Compensation Disbursement Register',
      desc: isMarathi
        ? 'अनुसूचित जाती/जमाती अत्याचार प्रतिबंधक नियम १२(४) अन्वये अनिवार्य ७-दिवसीय २५% अंतरिम मदत, डीबीटी यूटीआर पुष्टी, ५०% दोषारोपपत्र प्रकाशन आणि अंतिम २५% शिक्षा वितरण देखरेख.'
        : isHindi
        ? 'एससी/एसटी अत्याचार निवारण नियम 12(4) के तहत अनिवार्य 7-दिवसीय 25% अंतरिम राहत, डीबीटी यूटीआर पुष्टि, 50% चार्जशीट रिलीज और अंतिम 25% सजा वितरण निगरानी।'
        : 'Official return mandated under Rule 12(4) of the SC/ST PoA Rules, tracking mandatory 7-day 25% interim relief, DBT UTR confirmation, 50% chargesheet release, and final 25% conviction disbursement.',
      frequency: isMarathi ? 'मासिक (७ तारखेपर्यंत)' : isHindi ? 'मासिक (7 तारीख तक)' : 'Monthly (Due by 7th)',
      lastGenerated: '14 Sep 2026',
      icon: <Layers className="w-4 h-4 text-teal-800 shrink-0" />,
      tabKey: 'rule12' as const,
    },
    {
      id: 'rep-protection',
      title: isMarathi
        ? 'कलम १५A साक्षीदार संरक्षण व धमकी ऑडिट नोंदवही'
        : isHindi
        ? 'धारा 15A गवाह सुरक्षा एवं धमकी ऑडिट रजिस्टर'
        : 'Section 15A Witness Protection & Intimidation Threat Audit',
      desc: isMarathi
        ? 'अत्याचार प्रतिबंधक कायद्याच्या कलम १५A अन्वये धमकी अहवाल, सशस्त्र पोलीस संरक्षण, सुरक्षित संक्रमण गृह, सीसीटीव्ही कव्हरेज आणि ४-तास एसएलए अनुपालनाचे सर्वसमावेशक ऑडिट.'
        : isHindi
        ? 'एससी/एसटी अधिनियम की धारा 15A के तहत धमकी रिपोर्ट, सशस्त्र पुलिस सुरक्षा, सुरक्षित आवास, सीसीटीवी कवरेज और 4 घंटे के एसएलए अनुपालन का व्यापक ऑडिट।'
        : 'Comprehensive register mandated under Section 15A of the SC/ST Act, auditing threat reports, armed police escort deployment, safe transit quarters, CCTV coverage, and 4-hour SLA compliance.',
      frequency: isMarathi ? 'पाक्षिक' : isHindi ? 'पाक्षिक' : 'Fortnightly',
      lastGenerated: '14 Sep 2026',
      icon: <ShieldCheck className="w-4 h-4 text-indigo-800 shrink-0" />,
      tabKey: 'protection' as const,
    },
    {
      id: 'rep-distress',
      title: isMarathi
        ? 'जिल्हानिहाय बहु-माध्यम चेक-इन पालन व संकट प्रवृत्ती'
        : isHindi
        ? 'जिला-वार मल्टी-चैनल चेक-इन अनुपालन एवं संकट प्रक्षेपवक्र'
        : 'District-Wise Multi-Channel Check-In Adherence & Distress Trajectory',
      desc: isMarathi
        ? 'आयव्हीआरएस स्वयंचलित कॉल्स, एसएमएस व सुरक्षित ॲपद्वारे नोंदवलेल्या प्रतिसादांचे विश्लेषण, तीव्र संकट क्षेत्रांची ओळख आणि जिल्हाधिकारी आपत्कालीन हस्तक्षेप ट्रॅकिंग.'
        : isHindi
        ? 'आईवीआरएस स्वचालित कॉल, एसएमएस और नागरिक सुरक्षित ऐप के माध्यम से चेक-इन का सांख्यिकीय विश्लेषण, उच्च-संकट समूहों की पहचान और डीएम हस्तक्षेप ट्रैकिंग।'
        : 'Statistical trajectory across IVRS automated calls, SMS pulses, and Citizen Safe App check-ins, identifying high-distress clusters and tracking DM emergency interventions.',
      frequency: isMarathi ? 'साप्ताहिक' : isHindi ? 'साप्ताहिक' : 'Weekly',
      lastGenerated: 'Today, 06:00 IST',
      icon: <Activity className="w-4 h-4 text-emerald-800 shrink-0" />,
      tabKey: 'distress' as const,
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title={
          isMarathi
            ? 'वैधानिक अनुपालन आणि अहवाल जनरेटर'
            : isHindi
            ? 'वैधानिक अनुपालन एवं रिपोर्ट जनरेटर'
            : 'Statutory Compliance & Reports Generator'
        }
        subtitle={
          isMarathi
            ? 'सामाजिक न्याय आणि अधिकारिता मंत्रालय व विशेष न्यायालयांसाठी अधिकृत अहवाल आणि डेटा संच'
            : isHindi
            ? 'सामाजिक न्याय और अधिकारिता मंत्रालय एवं विशेष अदालतों के लिए आधिकारिक रिपोर्ट'
            : 'Generate verifiable statutory returns, relief audit registers, and protection summaries for MoSJE review committees and Special Courts.'
        }
      />

      {downloadSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2 shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold">{downloadSuccess}</span>
        </div>
      )}

      {/* Reports List Cards */}
      <div className="grid gap-4">
        {reports.map((rep) => (
          <div
            key={rep.id}
            className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-3 hover:border-stone-300 transition"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-2">
              <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-sm sm:text-base">
                {rep.icon}
                <span>{rep.title}</span>
              </div>
              <span className="text-[11px] font-semibold text-stone-600 bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200">
                {rep.frequency}
              </span>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">{rep.desc}</p>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs text-stone-500 border-t border-stone-100">
              <span>
                Verified on Portal: <strong>{rep.lastGenerated}</strong>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActivePreviewTab(rep.tabKey)}
                  className="px-3 py-1.5 rounded-lg border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold text-xs transition"
                >
                  {isMarathi ? 'डेटा पूर्वावलोकन' : isHindi ? 'डेटा पूर्वावलोकन' : 'Preview Data'}
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadReport(rep.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0B3B60] hover:bg-[#082944] text-white font-semibold text-xs shadow-2xs transition"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isMarathi ? 'CSV डेटा संच डाउनलोड' : isHindi ? 'CSV डेटा निर्यात करें' : 'Export CSV Dataset'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live Data Preview Section with Tabs */}
      <div className="space-y-3 pt-4 border-t border-stone-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold font-serif text-stone-900">
              {isMarathi ? 'थेट वैधानिक डेटा पूर्वावलोकन' : isHindi ? 'लाइव वैधानिक डेटा पूर्वावलोकन' : 'Live Statutory Dataset Preview'}
            </h3>
            <p className="text-[11px] text-stone-500">
              {isMarathi
                ? 'अधिकृत CSV मध्ये निर्यात करण्यापूर्वी सक्रिय डेटा नोंदी तपासा'
                : isHindi
                ? 'आधिकारिक सीएसवी में निर्यात करने से पहले सक्रिय डेटा रिकॉर्ड का निरीक्षण करें'
                : 'Inspect active dataset records before exporting to official CSV'}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              handleDownloadReport(
                activePreviewTab === 'rule12'
                  ? 'rep-rule12'
                  : activePreviewTab === 'protection'
                  ? 'rep-protection'
                  : 'rep-distress'
              )
            }
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-900 text-white hover:bg-stone-800 text-xs font-semibold self-start sm:self-auto transition"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>{isMarathi ? 'सक्रिय टॅब डाउनलोड (.CSV)' : isHindi ? 'सक्रिय टैब डाउनलोड (.CSV)' : 'Download Active Tab (.CSV)'}</span>
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap gap-1 p-1 bg-stone-100 rounded-lg border border-stone-200/80">
          <button
            type="button"
            onClick={() => setActivePreviewTab('rule12')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
              activePreviewTab === 'rule12'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {isMarathi ? `१. नियम १२ भरपाई नोंदवही (${mockRule12Data.length} नोंदी)` : isHindi ? `1. नियम 12 राहत रजिस्टर (${mockRule12Data.length} रिकॉर्ड)` : `1. Rule 12 Relief Disbursement (${mockRule12Data.length} Records)`}
          </button>
          <button
            type="button"
            onClick={() => setActivePreviewTab('protection')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
              activePreviewTab === 'protection'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {isMarathi ? `२. कलम १५A साक्षीदार संरक्षण (${mockProtectionData.length} नोंदी)` : isHindi ? `2. धारा 15A गवाह सुरक्षा (${mockProtectionData.length} रिकॉर्ड)` : `2. Section 15A Witness Protection (${mockProtectionData.length} Records)`}
          </button>
          <button
            type="button"
            onClick={() => setActivePreviewTab('distress')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
              activePreviewTab === 'distress'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {isMarathi ? `३. जिल्हा संकट व पालन (${mockDistrictAdherenceData.length} जिल्हे)` : isHindi ? `3. जिला संकट एवं अनुपालन (${mockDistrictAdherenceData.length} जिले)` : `3. District Adherence & Distress (${mockDistrictAdherenceData.length} Districts)`}
          </button>
        </div>

        {/* Tab 1: Rule 12 Relief Table */}
        {activePreviewTab === 'rule12' && (
          <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-stone-700 text-[11px] font-semibold">
                    <th className="py-2.5 px-3">FIR Number</th>
                    <th className="py-2.5 px-3">District</th>
                    <th className="py-2.5 px-3">Beneficiary</th>
                    <th className="py-2.5 px-3">PoA Sections</th>
                    <th className="py-2.5 px-3">Total Relief (₹)</th>
                    <th className="py-2.5 px-3">Stage 1 (25%) Status</th>
                    <th className="py-2.5 px-3">DBT UTR</th>
                    <th className="py-2.5 px-3">7-Day SLA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {mockRule12Data.map((r) => (
                    <tr key={r.firNumber} className="hover:bg-stone-50/60">
                      <td className="py-2.5 px-3 font-semibold text-stone-900 font-sans tabular-nums whitespace-nowrap">
                        {r.firNumber}
                      </td>
                      <td className="py-2.5 px-3 text-stone-700 whitespace-nowrap">
                        {r.district}, {r.state}
                      </td>
                      <td className="py-2.5 px-3 text-stone-800 font-medium whitespace-nowrap">
                        {r.beneficiaryMasked}
                      </td>
                      <td className="py-2.5 px-3 text-stone-600 text-[11px] whitespace-nowrap">
                        {r.poaSections}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-stone-900 font-sans tabular-nums whitespace-nowrap">
                        ₹{r.totalEntitledRelief.toLocaleString('en-IN')}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
                          ₹{r.stage1Amount.toLocaleString('en-IN')} ({r.stage1Status})
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-sans tabular-nums text-stone-600 text-[11px] whitespace-nowrap">
                        {r.stage1DbtUtr}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                            r.stage1SlaStatus.includes('Delayed')
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-teal-100 text-teal-800'
                          }`}
                        >
                          {r.stage1SlaStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Section 15A Witness Protection Table */}
        {activePreviewTab === 'protection' && (
          <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-stone-700 text-[11px] font-semibold">
                    <th className="py-2.5 px-3">Audit ID</th>
                    <th className="py-2.5 px-3">Case Ref</th>
                    <th className="py-2.5 px-3">District</th>
                    <th className="py-2.5 px-3">Protected Witness</th>
                    <th className="py-2.5 px-3">Threat Classification</th>
                    <th className="py-2.5 px-3">Tier</th>
                    <th className="py-2.5 px-3">Police Escort</th>
                    <th className="py-2.5 px-3">SLA Response</th>
                    <th className="py-2.5 px-3">Audit Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {mockProtectionData.map((p) => (
                    <tr key={p.threatId} className="hover:bg-stone-50/60">
                      <td className="py-2.5 px-3 font-semibold text-stone-900 font-sans tabular-nums whitespace-nowrap">
                        {p.threatId}
                      </td>
                      <td className="py-2.5 px-3 font-medium text-stone-700 whitespace-nowrap">
                        {p.caseRef}
                      </td>
                      <td className="py-2.5 px-3 text-stone-700 whitespace-nowrap">
                        {p.district}
                      </td>
                      <td className="py-2.5 px-3 text-stone-800 font-medium whitespace-nowrap">
                        {p.protectedSubject}
                      </td>
                      <td className="py-2.5 px-3 text-stone-600 max-w-xs truncate">
                        {p.threatClassification}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                            p.riskTier === 'Critical'
                              ? 'bg-rose-100 text-rose-800'
                              : p.riskTier === 'High'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {p.riskTier}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-stone-700 text-[11px] whitespace-nowrap">
                        {p.armedEscort}
                      </td>
                      <td className="py-2.5 px-3 font-sans tabular-nums font-semibold text-teal-800 whitespace-nowrap">
                        {p.responseSla}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 text-[11px] font-medium border border-blue-200">
                          {p.auditStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: District Adherence & Distress Table */}
        {activePreviewTab === 'distress' && (
          <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-stone-700 text-[11px] font-semibold">
                    <th className="py-2.5 px-3">District & State</th>
                    <th className="py-2.5 px-3">Cohort</th>
                    <th className="py-2.5 px-3">IVRS Completed</th>
                    <th className="py-2.5 px-3">SMS Completed</th>
                    <th className="py-2.5 px-3">Web Check-Ins</th>
                    <th className="py-2.5 px-3">Adherence Rate</th>
                    <th className="py-2.5 px-3">Avg Distress</th>
                    <th className="py-2.5 px-3">Critical Alerts (7d)</th>
                    <th className="py-2.5 px-3">Avg SLA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {mockDistrictAdherenceData.map((d) => (
                    <tr key={d.district} className="hover:bg-stone-50/60">
                      <td className="py-2.5 px-3 font-semibold text-stone-900 whitespace-nowrap">
                        {d.district}, {d.state}
                      </td>
                      <td className="py-2.5 px-3 font-sans tabular-nums text-stone-800 font-semibold whitespace-nowrap">
                        {d.cohortSize}
                      </td>
                      <td className="py-2.5 px-3 font-sans tabular-nums text-stone-600 whitespace-nowrap">
                        {d.ivrsCompleted.toLocaleString('en-IN')}
                      </td>
                      <td className="py-2.5 px-3 font-sans tabular-nums text-stone-600 whitespace-nowrap">
                        {d.smsCompleted.toLocaleString('en-IN')}
                      </td>
                      <td className="py-2.5 px-3 font-sans tabular-nums text-stone-600 whitespace-nowrap">
                        {d.webCompleted.toLocaleString('en-IN')}
                      </td>
                      <td className="py-2.5 px-3 font-sans tabular-nums font-bold text-emerald-800 whitespace-nowrap">
                        {d.adherenceRate}
                      </td>
                      <td className="py-2.5 px-3 font-sans tabular-nums font-bold text-stone-800 whitespace-nowrap">
                        {d.avgDistress} / 100
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold font-sans tabular-nums text-xs">
                          {d.criticalEscalations7d}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-sans tabular-nums text-teal-800 font-semibold whitespace-nowrap">
                        {d.avgResponseSlaHours}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
