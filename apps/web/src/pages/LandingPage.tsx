import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useLanguage } from '../hooks/useLanguage';
import { AshokaEmblem } from '../components/NationalEmblem';
import {
  Shield,
  Heart,
  Scale,
  Stethoscope,
  Building2,
  Lock,
  PhoneCall,
  CheckCircle2,
  ArrowRight,
  FileText,
  AlertTriangle,
  Clock,
  ExternalLink,
  Bell,
  Download,
  Phone,
  BarChart3,
  Calendar,
  Layers,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const setDemoRole = useAuthStore((s) => s.setDemoRole);
  const { isHindi } = useLanguage();

  const handleRoleSelect = (role: any, path: string) => {
    setDemoRole(role);
    navigate(path);
  };

  const officialNotifications = [
    {
      ref: 'DoSJE/PoA/2026-11012',
      date: '10 Sep 2026',
      title: 'Enforcement of Rule 12(4) Mandatory 7-Day Initial Relief Disbursement Schedule for Atrocity Victims across All Districts',
      titleHi: 'सभी जिलों में अत्याचार पीड़ितों हेतु नियम 12(4) के तहत 7 दिवसीय अनिवार्य प्रारंभिक राहत वितरण अनुसूची का क्रियान्वयन',
      division: 'PCR / PoA Division',
      type: 'Notification',
    },
    {
      ref: 'DoSJE/NHAPOA/2026-8941',
      date: '04 Sep 2026',
      title: 'Integration of National Atrocities Toll-Free Helpline (14566) with SAHAY Dynamic Distress Prediction & Psychological Triage Console',
      titleHi: 'राष्ट्रीय अत्याचार निवारण टोल-फ्री हेल्पलाइन (14566) का सहाय गतिशील संकट पूर्वानुमान कंसोल से एकीकरण',
      division: 'Scheduled Caste Welfare',
      type: 'Circular',
    },
    {
      ref: 'MHA-DoSJE/Sec15A/2026-441',
      date: '28 Aug 2026',
      title: 'Standard Operating Procedure (SOP) for Automated Armed Escort and Identity Concealment under Section 15A Witness Protection Scheme',
      titleHi: 'धारा 15A गवाह सुरक्षा योजना के अंतर्गत सशस्त्र सुरक्षा एवं पहचान छिपाने हेतु मानक संचालन प्रक्रिया (एसओपी)',
      division: 'Social Defence & Legal',
      type: 'Advisory',
    },
    {
      ref: 'DoSJE/Relief/2026-7782',
      date: '15 Aug 2026',
      title: 'Revised Schedule of Relief Amounts under Annexure-I of the SC/ST (Prevention of Atrocities) Amendment Rules',
      titleHi: 'अनुसूचित जाति एवं अनुसूचित जनजाति (अत्याचार निवारण) संशोधन नियमों के अनुलग्नक-I के अंतर्गत संशोधित राहत राशि अनुसूची',
      division: 'PCR / PoA Division',
      type: 'Gazette Order',
    },
  ];

  const reliefScales = [
    {
      offence: 'Public Humiliation, Caste Slurs & Insults (Sec 3(1)(r)(s))',
      offenceHi: 'सार्वजनिक रूप से जातिसूचक गाली-गलौज एवं अपमान (धारा 3(1)(r)(s))',
      minAmount: '₹1,00,000',
      timeline: '25% upon FIR, 50% upon chargesheet, 25% upon conviction',
    },
    {
      offence: 'Physical Assault, Grievous Hurt & Bodily Injury',
      offenceHi: 'मारपीट, गंभीर शारीरिक चोट एवं हमला',
      minAmount: '₹2,00,000 – ₹4,25,000',
      timeline: '25% on medical report, 50% upon chargesheet, 25% on conviction',
    },
    {
      offence: 'Arson / Complete Destruction of House or Property',
      offenceHi: 'मकान, झोपड़ी या संपत्ति में आगजनी या पूर्ण विनाश',
      minAmount: '₹8,25,000 + Rebuilding',
      timeline: 'Immediate safe accommodation + 50% on FIR inspection, balance on chargesheet',
    },
    {
      offence: 'Illegal Dispossession of Agricultural Land or Water Source',
      offenceHi: 'कृषि भूमि पर अवैध कब्जा या जल स्रोत से वंचित करना',
      minAmount: '₹1,00,000 – ₹4,25,000 + Land Restoration',
      timeline: 'Full restoration of land possession within 7 days by DM/SDM',
    },
    {
      offence: 'Murder / Loss of Life of Victim or Sole Breadwinner',
      offenceHi: 'हत्या / पीड़ित या एकमात्र कमाने वाले की जान जाना',
      minAmount: '₹8,25,000 + Govt. Job / Pension',
      timeline: '50% after post-mortem, 50% upon chargesheet + Monthly pension ₹5,000+',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 py-4">
      {/* ─────────────────────────────────────────────────────────────
          1. OFFICIAL GAZETTE NOTIFICATION BANNER
         ───────────────────────────────────────────────────────────── */}
      <div className="bg-white border-2 border-stone-300 rounded-lg p-2.5 shadow-2xs flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#B91C1C] text-white font-bold text-[11px] uppercase tracking-wider shrink-0">
          <Bell className="w-3.5 h-3.5 animate-pulse" />
          <span>{isHindi ? 'नवीनतम अधिसूचना' : 'Official Notification'}</span>
        </div>

        <div className="text-xs text-stone-800 font-medium overflow-hidden">
          <span className="text-[#B91C1C] font-bold mr-1.5">[MANDATORY COMPLIANCE]:</span>
          <span>
            {isHindi
              ? 'अनुसूचित जाति एवं अनुसूचित जनजाति (अत्याचार निवारण) नियम 12(4) के अंतर्गत पीड़ितों को 7 कार्यदिवसों में 25% प्रथम किश्त का प्रत्यक्ष लाभ अंतरण (DBT) अनिवार्य है।'
              : 'Rule 12(4) SC/ST PoA Rules mandates release of initial 25% statutory economic relief within 7 working days of FIR registration across all districts.'}
          </span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. INSTITUTIONAL WELCOME BANNER (GOI Gazette Style)
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-white rounded-xl border-2 border-[#0B3B60]/30 p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* Top Sovereign Tricolor Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#F58220] via-white to-[#138808]" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-1">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0B3B60]/10 text-[#0B3B60] text-xs font-bold border border-[#0B3B60]/20">
              <Shield className="w-4 h-4 text-[#0B3B60]" />
              <span>Ministry of Social Justice & Empowerment • Government of India</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black font-serif text-[#0B3B60] tracking-tight leading-tight">
              {isHindi
                ? 'सहाय (SAHAY) — राष्ट्रीय अत्याचार निवारण निगरानी, संकट पूर्वानुमान एवं वैधानिक राहत प्रणाली'
                : 'SAHAY — National Portal for Atrocity Distress Monitoring, Rule 12 Relief & Section 15A Witness Protection'}
            </h1>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
              {isHindi
                ? 'अनुसूचित जाति एवं अनुसूचित जनजाति (अत्याचार निवारण) अधिनियम, 1989 एवं संशोधन नियम, 2016 के प्रभावी क्रियान्वयन हेतु स्थापित आधिकारिक डिजिटल अवसंरचना। यह प्रणाली पीड़ितों के मानसिक स्वास्थ्य की सतत निगरानी, 12-घंटे की विधिक समय-सीमा (SLA) वाले सुरक्षा अलर्ट, और प्रत्यक्ष बैंक अंतरण (DBT) द्वारा समयबद्ध आर्थिक पुनर्वास सुनिश्चित करती है।'
                : 'An official public-service infrastructure mandated under the Scheduled Castes and the Scheduled Tribes (Prevention of Atrocities) Act, 1989 & PoA Rules, 2016. Integrating dynamic trauma-informed mental health monitoring, statutory Rule 12 economic relief disbursements, and Section 15A witness protection protocols across 766 districts.'}
            </p>
          </div>

          {/* Quick Helpline Callout */}
          <div className="shrink-0 bg-[#F0F4F8] border-2 border-[#0B3B60]/20 rounded-xl p-4 text-center space-y-2 lg:w-64">
            <div className="text-[11px] font-bold text-[#0B3B60] uppercase tracking-wider">
              National Atrocities Helpline
            </div>
            <div className="text-2xl font-black text-[#B91C1C] font-mono">
              14566
            </div>
            <div className="text-[10px] text-stone-600 leading-tight">
              Toll-Free 24x7 Across India • Direct Crisis Intervention
            </div>
            <a
              href="tel:14566"
              className="block w-full py-1.5 px-3 bg-[#0B3B60] hover:bg-[#082b47] text-white font-bold text-xs rounded transition"
            >
              Dial 14566
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. DUAL SOVEREIGN PORTAL SELECTION (Matching #users on socialjustice.gov.in)
         ───────────────────────────────────────────────────────────── */}
      <section id="users" className="space-y-4">
        <div className="flex items-center justify-between border-b-2 border-[#0B3B60] pb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-6 bg-[#F58220] rounded-xs" />
            <h2 className="text-base sm:text-lg font-black font-serif text-[#0B3B60] uppercase tracking-tight">
              {isHindi ? 'हितधारक एवं उपयोगकर्ता पोर्टल (#users)' : 'Stakeholder & User Portals (#users)'}
            </h2>
          </div>
          <span className="text-xs text-stone-500 hidden sm:inline">
            Select portal according to your official authorization:
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* 1. Citizen / Victim Safe Portal */}
          <div className="bg-white rounded-xl border-2 border-[#0D6938] shadow-xs hover:shadow-md transition p-6 flex flex-col justify-between space-y-4 relative overflow-hidden">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 text-[#0D6938] text-xs font-bold border border-emerald-300 uppercase">
                  <Heart className="w-3.5 h-3.5" />
                  <span>Beneficiary Portal • नागरिक पोर्टल</span>
                </span>
                <span className="text-[11px] font-bold text-stone-500">Confidential Space</span>
              </div>

              <h3 className="text-xl font-bold font-serif text-stone-900">
                {isHindi ? 'नागरिक एवं पीड़ित सुरक्षित पोर्टल' : 'Citizen & Beneficiary Safe Space'}
              </h3>

              <p className="text-xs text-stone-600 leading-relaxed">
                A dedicated, trauma-informed digital safe space engineered for victims of caste atrocities, complainants, and vulnerable witnesses. Features zero administrative surveillance, an emergency 1-click safe exit to Google, and automated statutory rights navigation.
              </p>

              <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-3 space-y-1.5 text-xs text-stone-800">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Key Services in Citizen Portal:</span>
                </div>
                <ul className="space-y-1 text-[11px] text-stone-700 pl-5 list-disc">
                  <li><strong>Sahay Mitra:</strong> 24/7 empathetic AI psychological first-aid companion (TTS + Voice).</li>
                  <li><strong>Daily Check-In:</strong> Gentle 2-minute well-being monitoring (PHQ-9 & ISQ).</li>
                  <li><strong>Rule 12 Relief Tracker:</strong> Direct tracking of statutory compensation tranches.</li>
                  <li><strong>Tele-Counselling:</strong> Free sessions with licensed clinical psychologist Priya Sharma.</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => handleRoleSelect('victim', '/victim')}
              className="w-full py-3 px-4 rounded-xl bg-[#0D6938] hover:bg-[#094d29] text-white font-bold text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer border border-emerald-700"
            >
              <span>{isHindi ? 'नागरिक सुरक्षित पोर्टल में प्रवेश करें →' : 'Enter Citizen Safe Portal →'}</span>
            </button>
          </div>

          {/* 2. District Officer / DM / SDM Console */}
          <div className="bg-white rounded-xl border-2 border-[#0B3B60] shadow-xs hover:shadow-md transition p-6 flex flex-col justify-between space-y-4 relative overflow-hidden">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-50 text-[#0B3B60] text-xs font-bold border border-blue-300 uppercase">
                  <Scale className="w-3.5 h-3.5" />
                  <span>Executive Console • DM / SDM</span>
                </span>
                <span className="text-[11px] font-bold text-stone-500">Statutory Authority</span>
              </div>

              <h3 className="text-xl font-bold font-serif text-stone-900">
                {isHindi ? 'जिला दंडाधिकारी एवं अधिकारी कंसोल' : 'District Magistrate & Officer Console'}
              </h3>

              <p className="text-xs text-stone-600 leading-relaxed">
                Official operational console for District Magistrates (DM), Sub-Divisional Magistrates (SDM), District Welfare Officers (DWO), and Deputy Superintendents of Police (DSP).
              </p>

              <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-3 space-y-1.5 text-xs text-stone-800">
                <div className="font-bold text-[#0B3B60] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0B3B60]" />
                  <span>Key Functions in Officer Console:</span>
                </div>
                <ul className="space-y-1 text-[11px] text-stone-700 pl-5 list-disc">
                  <li><strong>SLA Protection Alerts:</strong> 12-hour mandatory review window under Rule 12(4).</li>
                  <li><strong>Rule 12 Relief Approval:</strong> Immediate 25% FIR sanction and 50% chargesheet release.</li>
                  <li><strong>Section 15A Orders:</strong> Armed police escorts and safe accommodation warrants.</li>
                  <li><strong>Case Triage:</strong> Immediate review of escalated critical distress alerts.</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => handleRoleSelect('district_officer', '/dashboard')}
              className="w-full py-3 px-4 rounded-xl bg-[#0B3B60] hover:bg-[#072842] text-white font-bold text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer border border-[#082b47]"
            >
              <span>{isHindi ? 'प्रशासनिक कंसोल में प्रवेश करें →' : 'Enter District Officer Console →'}</span>
            </button>
          </div>

          {/* 3. Clinical Psychologist & Counsellor Console */}
          <div className="bg-white rounded-xl border-2 border-purple-600 shadow-xs hover:shadow-md transition p-6 flex flex-col justify-between space-y-4 relative overflow-hidden">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-purple-50 text-purple-800 text-xs font-bold border border-purple-300 uppercase">
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>Clinical Care • मनोवैज्ञानिक</span>
                </span>
                <span className="text-[11px] font-bold text-stone-500">Licensed Counsellor</span>
              </div>

              <h3 className="text-xl font-bold font-serif text-stone-900">
                {isHindi ? 'क्लिनिकल मनोवैज्ञानिक कंसोल' : 'Clinical Psychologist Console'}
              </h3>

              <p className="text-xs text-stone-600 leading-relaxed">
                Specialized clinical interface for licensed psychologists, psychiatric social workers, and trauma counsellors managing continuous victim psychological rehabilitation.
              </p>

              <div className="bg-purple-50/70 border border-purple-200 rounded-lg p-3 space-y-1.5 text-xs text-stone-800">
                <div className="font-bold text-purple-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-700" />
                  <span>Key Clinical Capabilities:</span>
                </div>
                <ul className="space-y-1 text-[11px] text-stone-700 pl-5 list-disc">
                  <li><strong>Distress Trajectories:</strong> Longitudinal PHQ-9 & ISQ tracking charts.</li>
                  <li><strong>Tele-Counselling Management:</strong> Schedule and log therapy video/audio sessions.</li>
                  <li><strong>Trauma Intervention Notes:</strong> Clinical documentation with role-restricted encryption.</li>
                  <li><strong>Escalation Triggers:</strong> Direct alert dispatch to DM/SDM if witness intimidation is detected.</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => handleRoleSelect('counsellor', '/cases')}
              className="w-full py-3 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer border border-purple-800"
            >
              <span>{isHindi ? 'क्लिनिकल कंसोल में प्रवेश करें →' : 'Enter Counsellor Console →'}</span>
            </button>
          </div>

          {/* 4. Ministry Directorate & State Administration */}
          <div className="bg-white rounded-xl border-2 border-amber-600 shadow-xs hover:shadow-md transition p-6 flex flex-col justify-between space-y-4 relative overflow-hidden">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-50 text-amber-900 text-xs font-bold border border-amber-300 uppercase">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Directorate • राज्य / राष्ट्रीय</span>
                </span>
                <span className="text-[11px] font-bold text-stone-500">Ministry Level</span>
              </div>

              <h3 className="text-xl font-bold font-serif text-stone-900">
                {isHindi ? 'मंत्रालय एवं राज्य निदेशालय डैशबोर्ड' : 'Ministry Directorate & State Analytics'}
              </h3>

              <p className="text-xs text-stone-600 leading-relaxed">
                High-level oversight console for State Welfare Departments, National Commission for Scheduled Castes (NCSC), and Ministry of Social Justice & Empowerment headquarters.
              </p>

              <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-3 space-y-1.5 text-xs text-stone-800">
                <div className="font-bold text-amber-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-700" />
                  <span>Directorate Oversight Tools:</span>
                </div>
                <ul className="space-y-1 text-[11px] text-stone-700 pl-5 list-disc">
                  <li><strong>766-District Comparative Analytics:</strong> Hotspot identification & risk distribution.</li>
                  <li><strong>Rule 12 Compliance Auditing:</strong> District-wise 7-day disbursement SLA compliance.</li>
                  <li><strong>DPDP Audit Trail:</strong> Cryptographically logged record access inspection.</li>
                  <li><strong>Annual Gazette Reporting:</strong> Automated export of statutory PoA reports.</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => handleRoleSelect('state_admin', '/analytics')}
              className="w-full py-3 px-4 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer border border-amber-800"
            >
              <span>{isHindi ? 'मंत्रालय डैशबोर्ड में प्रवेश करें →' : 'Enter Directorate Analytics →'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. OFFICIAL WHAT'S NEW & CIRCULARS TABLE (Matching socialjustice.gov.in)
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-white rounded-xl border border-stone-300 p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-[#0B3B60]" />
            <h3 className="text-base font-bold font-serif text-stone-900">
              {isHindi ? 'नवीनतम परिपत्र, अधिसूचनाएं एवं आदेश' : 'Latest Circulars, Notifications & Government Orders'}
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-[#0B3B60] cursor-pointer hover:underline">
            View All Circulars (सभी देखें) →
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-100 text-stone-700 border-b border-stone-300">
                <th className="py-2.5 px-3 font-bold">Ref No. & Date</th>
                <th className="py-2.5 px-3 font-bold">Subject / Title</th>
                <th className="py-2.5 px-3 font-bold">Division</th>
                <th className="py-2.5 px-3 font-bold text-center">Document</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-stone-800">
              {officialNotifications.map((n, idx) => (
                <tr key={idx} className="hover:bg-stone-50 transition">
                  <td className="py-3 px-3 font-mono text-[11px] text-stone-600 whitespace-nowrap">
                    <div>{n.ref}</div>
                    <div className="text-[10px] text-stone-500">{n.date}</div>
                  </td>
                  <td className="py-3 px-3">
                    <p className="font-semibold text-stone-900 leading-snug">
                      {isHindi ? n.titleHi : n.title}
                    </p>
                    <span className="inline-block mt-1 text-[10px] text-amber-900 bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded font-medium">
                      {n.type}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[11px] text-stone-600 whitespace-nowrap">
                    {n.division}
                  </td>
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <button
                      onClick={() => alert(`Downloading official document: ${n.ref}.pdf`)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded border border-stone-300 text-[11px] font-semibold transition"
                      title="Download PDF"
                    >
                      <Download className="w-3.5 h-3.5 text-[#B91C1C]" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. STATUTORY RELIEF SCHEDULE (Rule 12 Annexure-I Reference)
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-white rounded-xl border border-stone-300 p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-[#0B3B60]" />
            <div>
              <h3 className="text-base font-bold font-serif text-stone-900">
                {isHindi
                  ? 'वैधानिक आर्थिक राहत अनुसूची — नियम 12(4) अनुलग्नक-I'
                  : 'Statutory Economic Relief Scales — Rule 12(4) Annexure-I'}
              </h3>
              <p className="text-[11px] text-stone-500">
                Guaranteed by the SC/ST (Prevention of Atrocities) Amendment Rules, 2016
              </p>
            </div>
          </div>
          <span className="text-[11px] text-emerald-800 font-bold bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded">
            Mandatory DBT Relief
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-100 text-stone-700 border-b border-stone-300">
                <th className="py-2 px-3 font-bold">Category of Offence</th>
                <th className="py-2 px-3 font-bold">Prescribed Relief Scale</th>
                <th className="py-2 px-3 font-bold">Mandated Disbursement Stages</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-stone-800">
              {reliefScales.map((item, idx) => (
                <tr key={idx} className="hover:bg-stone-50 transition">
                  <td className="py-2.5 px-3 font-semibold text-stone-900">
                    {isHindi ? item.offenceHi : item.offence}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-emerald-800 whitespace-nowrap">
                    {item.minAmount}
                  </td>
                  <td className="py-2.5 px-3 text-[11px] text-stone-600">
                    {item.timeline}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. REAL-TIME OPERATIONAL METRICS (National Atrocity Monitoring)
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#0B3B60] text-white rounded-xl p-6 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-800 pb-3">
          <div>
            <h3 className="text-base font-black font-serif text-white uppercase tracking-tight flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-amber-400" />
              <span>National Atrocity Monitoring & Welfare Statistics</span>
            </h3>
            <p className="text-xs text-blue-200 mt-0.5">
              Live operational metrics under Rule 12 of the SC/ST PoA Rules, 2016
            </p>
          </div>
          <span className="text-[11px] font-mono text-amber-300 bg-blue-950 px-2.5 py-1 rounded border border-blue-700 w-fit">
            PILOT DISTRICT LIVE DATA
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-center sm:text-left">
          <div className="bg-blue-950/60 p-3.5 rounded-lg border border-blue-700/50 space-y-0.5">
            <span className="text-[10px] text-blue-300 uppercase block font-semibold">Districts Monitored</span>
            <span className="text-2xl font-black text-amber-400 font-mono">766</span>
            <p className="text-[10px] text-blue-200">All 36 States & UTs</p>
          </div>

          <div className="bg-blue-950/60 p-3.5 rounded-lg border border-blue-700/50 space-y-0.5">
            <span className="text-[10px] text-blue-300 uppercase block font-semibold">Pilot Caseload</span>
            <span className="text-2xl font-black text-white font-mono">12</span>
            <p className="text-[10px] text-blue-200">Actively tracked</p>
          </div>

          <div className="bg-blue-950/60 p-3.5 rounded-lg border border-blue-700/50 space-y-0.5">
            <span className="text-[10px] text-blue-300 uppercase block font-semibold">Relief Sanctioned</span>
            <span className="text-2xl font-black text-emerald-400 font-mono">₹4.85 Cr</span>
            <p className="text-[10px] text-blue-200">Rule 12(4) Annexure-I</p>
          </div>

          <div className="bg-blue-950/60 p-3.5 rounded-lg border border-blue-700/50 space-y-0.5">
            <span className="text-[10px] text-blue-300 uppercase block font-semibold">12-hr SLA Rate</span>
            <span className="text-2xl font-black text-amber-300 font-mono">98.2%</span>
            <p className="text-[10px] text-blue-200">Statutory compliance</p>
          </div>

          <div className="bg-blue-950/60 p-3.5 rounded-lg border border-blue-700/50 space-y-0.5 col-span-2 lg:col-span-1">
            <span className="text-[10px] text-blue-300 uppercase block font-semibold">PoA Helpline 14566</span>
            <span className="text-2xl font-black text-cyan-300 font-mono">24×7</span>
            <p className="text-[10px] text-blue-200">Toll-Free triage active</p>
          </div>
        </div>
      </section>
    </div>
  );
};
