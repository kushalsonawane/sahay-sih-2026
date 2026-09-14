import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  Search,
  X,
  Loader2,
  Filter,
  FileCheck,
  BookOpen,
  Calculator,
  TrendingUp,
  Coins,
  Check,
  ChevronRight,
  Info,
  Building,
} from 'lucide-react';
import {
  OFFICIAL_CIRCULARS_DATA,
  generateCircularPdf,
  OfficialCircular,
} from '../utils/circularPdfGenerator';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const setDemoRole = useAuthStore((s) => s.setDemoRole);
  const { isHindi, isMarathi } = useLanguage();

  const [downloadingRef, setDownloadingRef] = useState<string | null>(null);
  const [downloadNotification, setDownloadNotification] = useState<string | null>(null);
  const [allCircularsModalOpen, setAllCircularsModalOpen] = useState(false);
  const [circularSearchQuery, setCircularSearchQuery] = useState('');
  const [circularTypeFilter, setCircularTypeFilter] = useState<string>('all');

  // Sub-tab states for Schemes, Acts, and Stats
  const [schemesTab, setSchemesTab] = useState<'table' | 'calc' | 'schemes'>('table');
  const [selectedCalcOffence, setSelectedCalcOffence] = useState<number>(0);
  const [reliefTableFilter, setReliefTableFilter] = useState<string>('all');

  const [actFilter, setActFilter] = useState<string>('all');
  const [expandedAct, setExpandedAct] = useState<string | null>(null);

  const [statsTab, setStatsTab] = useState<'dbt' | 'triage' | 'judicial'>('dbt');

  // Smooth scroll to anchor on mount or when location.hash changes
  useEffect(() => {
    const hash = location.hash || window.location.hash;
    if (hash) {
      const targetId = hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, [location.hash]);

  const handleRoleSelect = (role: any, path: string) => {
    setDemoRole(role);
    navigate(path);
  };

  const handleDownloadPdf = (circular: OfficialCircular) => {
    setDownloadingRef(circular.ref);
    try {
      generateCircularPdf(circular);
      setDownloadNotification(
        isMarathi
          ? `डाउनलोड पूर्ण: ${circular.ref}.pdf (शासकीय राजपत्र)`
          : isHindi
          ? `डाउनलोड संपन्न: ${circular.ref}.pdf (शासकीय राजपत्र)`
          : `Downloaded: ${circular.ref}.pdf (Official GoI Dispatch)`
      );
      setTimeout(() => setDownloadNotification(null), 4500);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setDownloadingRef(null);
    }
  };

  const officialNotifications = OFFICIAL_CIRCULARS_DATA;

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
          <span>{isMarathi ? 'अधिकृत सूचना' : isHindi ? 'नवीनतम अधिसूचना' : 'Official Notification'}</span>
        </div>

        <div className="text-xs text-stone-800 font-medium overflow-hidden">
          <span className="text-[#B91C1C] font-bold mr-1.5">[MANDATORY COMPLIANCE]:</span>
          <span>
            {isMarathi
              ? 'अनुसूचित जाती व जमाती (अत्याचार प्रतिबंध) नियम १२(४) अंतर्गत ७ कामकाजाच्या दिवसांत २५% कायदेशीर आर्थिक मदत देणे अनिवार्य आहे.'
              : isHindi
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
              {isMarathi
                ? 'सहाय (SAHAY) — राष्ट्रीय अत्याचार संकट देखरेख आणि कायदेशीर मदत प्रणाली'
                : isHindi
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
      <section id="users" className="space-y-4 scroll-mt-24">
        <div className="flex items-center justify-between border-b-2 border-[#0B3B60] pb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-6 bg-[#F58220] rounded-xs" />
            <h2 className="text-base sm:text-lg font-black font-serif text-[#0B3B60] uppercase tracking-tight">
              {isMarathi ? 'हितधारक आणि वापरकर्ता पोर्टल (#users)' : isHindi ? 'हितधारक एवं उपयोगकर्ता पोर्टल (#users)' : 'Stakeholder & User Portals (#users)'}
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
                {isMarathi ? 'नागरिक व लाभार्थी सुरक्षित जागा' : isHindi ? 'नागरिक एवं पीड़ित सुरक्षित पोर्टल' : 'Citizen & Beneficiary Safe Space'}
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
              <span>{isMarathi ? 'नागरिक सुरक्षित पोर्टल प्रविष्ट करा →' : isHindi ? 'नागरिक सुरक्षित पोर्टल में प्रवेश करें →' : 'Enter Citizen Safe Portal →'}</span>
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
                {isMarathi ? 'जिल्हा दंडाधिकारी आणि अधिकारी कन्सोल' : isHindi ? 'जिला दंडाधिकारी एवं अधिकारी कंसोल' : 'District Magistrate & Officer Console'}
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
              <span>{isMarathi ? 'प्रशासकीय कन्सोल प्रविष्ट करा →' : isHindi ? 'प्रशासनिक कंसोल में प्रवेश करें →' : 'Enter District Officer Console →'}</span>
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
                {isMarathi ? 'क्लिनिकल सायकोलॉजिस्ट कन्सोल' : isHindi ? 'क्लिनिकल मनोवैज्ञानिक कंसोल' : 'Clinical Psychologist Console'}
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
              <span>{isMarathi ? 'सल्लागार कन्सोल प्रविष्ट करा →' : isHindi ? 'क्लिनिकल कंसोल में प्रवेश करें →' : 'Enter Counsellor Console →'}</span>
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
                {isMarathi ? 'संचालनालय व राज्य विश्लेषण' : isHindi ? 'मंत्रालय एवं राज्य निदेशालय डैशबोर्ड' : 'Ministry Directorate & State Analytics'}
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
              <span>{isMarathi ? 'संचालनालय विश्लेषण प्रविष्ट करा →' : isHindi ? 'मंत्रालय डैशबोर्ड में प्रवेश करें →' : 'Enter Directorate Analytics →'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. OFFICIAL WHAT'S NEW & CIRCULARS TABLE (Matching socialjustice.gov.in)
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-white rounded-xl border border-stone-300 p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200 pb-3 gap-2">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-[#0B3B60]" />
            <h3 className="text-base font-bold font-serif text-stone-900">
              {isMarathi ? 'नवीनतम परिपत्रके, अधिसूचना व सरकारी आदेश' : isHindi ? 'नवीनतम परिपत्र, अधिसूचनाएं एवं आदेश' : 'Latest Circulars, Notifications & Government Orders'}
            </h3>
          </div>
          <button
            onClick={() => setAllCircularsModalOpen(true)}
            className="text-[11px] font-semibold text-[#0B3B60] hover:text-[#082942] hover:underline self-start sm:self-auto flex items-center gap-1 cursor-pointer bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded border border-stone-300 transition"
          >
            <span>{isMarathi ? 'सर्व परिपत्रके पहा (Gazette Repo) →' : isHindi ? 'सभी परिपत्र देखें (Gazette Repo) →' : 'View All Circulars (Gazette Repo) →'}</span>
          </button>
        </div>

        {/* Real-time PDF download confirmation toast */}
        {downloadNotification && (
          <div className="flex items-center justify-between gap-3 p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-900 text-xs font-semibold shadow-xs animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{downloadNotification}</span>
            </div>
            <span className="text-[10px] text-emerald-700 font-mono bg-emerald-100/70 px-2 py-0.5 rounded border border-emerald-200">
              GoI Authorized
            </span>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-100 text-stone-700 border-b border-stone-300">
                <th className="py-2.5 px-3 font-bold">Ref No. & Date</th>
                <th className="py-2.5 px-3 font-bold">Subject / Title</th>
                <th className="py-2.5 px-3 font-bold">Division</th>
                <th className="py-2.5 px-3 font-bold text-center">Official Document</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-stone-800">
              {officialNotifications.map((n, idx) => {
                const isDownloading = downloadingRef === n.ref;
                return (
                  <tr key={idx} className="hover:bg-stone-50 transition">
                    <td className="py-3 px-3 font-mono text-[11px] text-stone-600 whitespace-nowrap">
                      <div className="font-semibold text-stone-900">{n.ref}</div>
                      <div className="text-[10px] text-stone-500">{n.date}</div>
                    </td>
                    <td className="py-3 px-3">
                      <p className="font-semibold text-stone-900 leading-snug">
                        {isHindi ? n.titleHi : n.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-block text-[10px] text-amber-900 bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded font-medium">
                          {n.type}
                        </span>
                        {n.legalAct && (
                          <span className="text-[10px] text-stone-500 hidden md:inline truncate max-w-xs">
                            {n.legalAct}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-[11px] text-stone-600 whitespace-nowrap">
                      {n.division}
                    </td>
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleDownloadPdf(n)}
                        disabled={isDownloading}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded border text-[11px] font-semibold transition cursor-pointer shadow-2xs ${
                          isDownloading
                            ? 'bg-amber-100 text-amber-900 border-amber-300 cursor-wait'
                            : 'bg-white hover:bg-stone-100 text-stone-900 border-stone-300 hover:border-stone-400'
                        }`}
                        title="Download Official Government Gazette PDF"
                      >
                        {isDownloading ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 text-amber-700 animate-spin" />
                            <span>Generating...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5 text-[#B91C1C]" />
                            <span>Download PDF</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. SCHEMES & STATUTORY RELIEF (#schemes)
         ───────────────────────────────────────────────────────────── */}
      <section id="schemes" className="bg-white rounded-xl border border-stone-300 p-5 sm:p-7 space-y-6 scroll-mt-24 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-stone-200 pb-4 gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#0B3B60]/10 text-[#0B3B60]">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold font-serif text-stone-900">
                  {isMarathi
                    ? 'कायदेशीर आर्थिक मदत व कल्याणकारी योजना'
                    : isHindi
                    ? 'वैधानिक आर्थिक राहत एवं कल्याणकारी योजनाएं'
                    : 'Statutory Economic Relief & Welfare Schemes'}
                </h3>
                <span className="hidden sm:inline-block text-[10px] font-mono text-[#0B3B60] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded font-bold">
                  #schemes
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Guaranteed under Rule 12(4) Annexure-I of the SC/ST (PoA) Rules, 2016 & Centrally Sponsored Schemes
              </p>
            </div>
          </div>

          {/* Sub-tab switcher */}
          <div className="flex items-center bg-stone-100 p-1 rounded-lg border border-stone-300 text-xs font-semibold self-start md:self-auto">
            <button
              onClick={() => setSchemesTab('table')}
              className={`px-3 py-1.5 rounded-md transition cursor-pointer ${
                schemesTab === 'table'
                  ? 'bg-white text-[#0B3B60] shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>{isMarathi ? 'मदत दर अनुसूची' : isHindi ? 'राहत दर अनुसूची' : 'Relief Scales Table'}</span>
            </button>
            <button
              onClick={() => setSchemesTab('calc')}
              className={`px-3 py-1.5 rounded-md transition cursor-pointer flex items-center gap-1.5 ${
                schemesTab === 'calc'
                  ? 'bg-white text-[#0B3B60] shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-amber-600" />
              <span>{isMarathi ? 'मदत कॅल्क्युलेटर' : isHindi ? 'राहत कैलकुलेटर' : 'Relief Calculator'}</span>
            </button>
            <button
              onClick={() => setSchemesTab('schemes')}
              className={`px-3 py-1.5 rounded-md transition cursor-pointer ${
                schemesTab === 'schemes'
                  ? 'bg-white text-[#0B3B60] shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>{isMarathi ? 'शासकीय योजना' : isHindi ? 'सरकारी योजनाएं' : 'Welfare Schemes'}</span>
            </button>
          </div>
        </div>

        {/* TAB 1: RELIEF SCALES TABLE */}
        {schemesTab === 'table' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-stone-600 font-medium">Filter Offence Severity:</span>
                <div className="flex items-center gap-1">
                  {[
                    { key: 'all', label: 'All Offences (सभी)' },
                    { key: 'humiliation', label: 'Insults / Slurs' },
                    { key: 'assault', label: 'Physical Hurt' },
                    { key: 'arson', label: 'Arson / Land' },
                    { key: 'heinous', label: 'Murder / Fatal' },
                  ].map((f) => (
                    <button
                      key={f.key}
                      onClick={() => setReliefTableFilter(f.key)}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer border ${
                        reliefTableFilter === f.key
                          ? 'bg-[#0B3B60] text-white border-[#0B3B60]'
                          : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-stone-100'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
              <span className="text-[11px] text-emerald-800 font-bold bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded self-start sm:self-auto">
                Mandatory 7-Day DBT (Rule 12(4))
              </span>
            </div>

            <div className="overflow-x-auto rounded-lg border border-stone-200">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-100 text-stone-700 border-b border-stone-300">
                    <th className="py-2.5 px-3 font-bold">Category of Offence</th>
                    <th className="py-2.5 px-3 font-bold">Prescribed Statutory Scale</th>
                    <th className="py-2.5 px-3 font-bold">Mandated Disbursement Stages</th>
                    <th className="py-2.5 px-3 font-bold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-stone-800">
                  {reliefScales
                    .filter((item) => {
                      if (reliefTableFilter === 'all') return true;
                      if (reliefTableFilter === 'humiliation') return item.offence.includes('Humiliation');
                      if (reliefTableFilter === 'assault') return item.offence.includes('Assault');
                      if (reliefTableFilter === 'arson') return item.offence.includes('Arson') || item.offence.includes('Land');
                      if (reliefTableFilter === 'heinous') return item.offence.includes('Murder');
                      return true;
                    })
                    .map((item, idx) => (
                      <tr key={idx} className="hover:bg-stone-50 transition">
                        <td className="py-3 px-3 font-semibold text-stone-900">
                          <div>{isHindi ? item.offenceHi : item.offence}</div>
                          <div className="text-[10px] text-stone-500 font-normal">
                            {isHindi ? item.offence : item.offenceHi}
                          </div>
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-emerald-800 whitespace-nowrap">
                          {item.minAmount}
                        </td>
                        <td className="py-3 px-3 text-[11px] text-stone-600">
                          {item.timeline}
                        </td>
                        <td className="py-3 px-3 text-center whitespace-nowrap">
                          <button
                            onClick={() => {
                              setSelectedCalcOffence(idx % 5);
                              setSchemesTab('calc');
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-semibold border border-stone-300 transition cursor-pointer"
                          >
                            <Calculator className="w-3 h-3 text-amber-700" />
                            <span>Calculate</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE RULE 12 RELIEF CALCULATOR */}
        {schemesTab === 'calc' && (
          <div className="space-y-5">
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                <Calculator className="w-4 h-4 text-amber-700" />
                <span>Direct Benefit Transfer (DBT) Compensation Stage Breakdown</span>
              </div>
              <p className="text-[11px] text-amber-800">
                Select an offence category below to inspect prescribed statutory relief amounts, mandatory disbursement timelines, and additional rehabilitation entitlements under Rule 12 of SC/ST (PoA) Amendment Rules, 2016.
              </p>
            </div>

            {/* Category Selector Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {[
                { id: 0, title: 'Caste Slurs / Insults', sub: 'Sec 3(1)(r)(s)', amt: '₹1,00,000' },
                { id: 1, title: 'Physical Assault / Hurt', sub: 'Bodily injury', amt: '₹4,25,000' },
                { id: 2, title: 'Arson / House Destroyed', sub: 'Rebuilding + Rent', amt: '₹8,25,000' },
                { id: 3, title: 'Land Dispossession', sub: 'Land restoration', amt: '₹3,00,000' },
                { id: 4, title: 'Murder / Loss of Life', sub: 'Pension + Govt Job', amt: '₹8,25,000' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedCalcOffence(opt.id)}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer flex items-start justify-between ${
                    selectedCalcOffence === opt.id
                      ? 'bg-[#0B3B60] text-white border-[#0B3B60] shadow-sm'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs">{opt.title}</div>
                    <div className={`text-[10px] ${selectedCalcOffence === opt.id ? 'text-blue-200' : 'text-stone-500'}`}>
                      {opt.sub}
                    </div>
                  </div>
                  <span className={`font-mono font-bold text-xs ${selectedCalcOffence === opt.id ? 'text-amber-300' : 'text-emerald-800'}`}>
                    {opt.amt}
                  </span>
                </button>
              ))}
            </div>

            {/* Calculated Breakdown Cards */}
            {(() => {
              const opt = [
                {
                  id: 0,
                  name: 'Public Humiliation, Caste Slurs & Insults (Sec 3(1)(r)(s))',
                  nameHi: 'सार्वजनिक रूप से जातिसूचक गाली-गलौज एवं अपमान (धारा 3(1)(r)(s))',
                  totalAmount: 100000,
                  stage1: 25000,
                  stage2: 50000,
                  stage3: 25000,
                  timeline1: 'Mandatory within 7 working days of FIR registration under Rule 12(4)',
                  timeline2: 'Upon filing of charge-sheet in Special Court within 60 days',
                  timeline3: 'Upon conviction and conclusion of judicial trial',
                  additional: 'Free state legal aid under Section 15 & Witness conveyance allowance of ₹500/day during trials.',
                },
                {
                  id: 1,
                  name: 'Physical Assault, Grievous Hurt & Bodily Injury',
                  nameHi: 'मारपीट, गंभीर शारीरिक चोट एवं हमला',
                  totalAmount: 425000,
                  stage1: 106250,
                  stage2: 212500,
                  stage3: 106250,
                  timeline1: 'Within 7 days of medical injury report by Chief Medical Officer',
                  timeline2: 'Upon submission of charge-sheet by investigating officer',
                  timeline3: 'Upon final order of conviction by Exclusive Special Court',
                  additional: 'Free tertiary medical treatment aid up to ₹3,50,000 at empanelled hospital / AIIMS under Dr. Ambedkar Scheme.',
                },
                {
                  id: 2,
                  name: 'Arson / Complete Destruction of House or Property',
                  nameHi: 'मकान, झोपड़ी या संपत्ति में आगजनी या पूर्ण विनाश',
                  totalAmount: 825000,
                  stage1: 412500,
                  stage2: 206250,
                  stage3: 206250,
                  timeline1: '50% within 7 days of spot inspection report by SDM/Collector',
                  timeline2: '25% upon submission of police charge-sheet',
                  timeline3: '25% upon conviction of accused',
                  additional: 'Immediate safe transit shelter + Priority reconstruction under PM Awas Yojana within 90 days.',
                },
                {
                  id: 3,
                  name: 'Illegal Dispossession of Agricultural Land or Water Source',
                  nameHi: 'कृषि भूमि पर अवैध कब्जा या जल स्रोत से वंचित करना',
                  totalAmount: 300000,
                  stage1: 75000,
                  stage2: 150000,
                  stage3: 75000,
                  timeline1: '25% upon FIR + Immediate physical restoration of land by DM within 7 days',
                  timeline2: '50% upon charge-sheet filing',
                  timeline3: '25% on conviction',
                  additional: 'Mandatory physical possession restoration under Rule 8 & free agricultural input subsidy.',
                },
                {
                  id: 4,
                  name: 'Murder / Loss of Life of Victim or Sole Breadwinner',
                  nameHi: 'हत्या / पीड़ित या एकमात्र कमाने वाले की जान जाना',
                  totalAmount: 825000,
                  stage1: 412500,
                  stage2: 412500,
                  stage3: 0,
                  timeline1: '50% within 7 days of post-mortem report submission',
                  timeline2: '50% upon filing of charge-sheet in Special Court',
                  timeline3: 'Lifelong family security benefits start immediately',
                  additional: 'Mandatory Government Employment for one dependent + Monthly pension ₹5,000+ (with DA) + Free education and boarding for children.',
                },
              ][selectedCalcOffence];

              return (
                <div className="bg-stone-50 p-5 rounded-xl border border-stone-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200 pb-3 gap-2">
                    <div>
                      <h4 className="font-bold text-sm text-stone-900">{opt.name}</h4>
                      <p className="text-xs text-stone-500 font-serif">{opt.nameHi}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-stone-500 uppercase block font-semibold">Total Prescribed Relief</span>
                      <span className="text-xl font-black font-mono text-emerald-800">
                        ₹{opt.totalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Stage 1 */}
                    <div className="p-3.5 bg-white rounded-lg border border-emerald-300 shadow-2xs space-y-1 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          STAGE 1: 25% (or 50%)
                        </span>
                        <span className="text-[10px] font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded">
                          7-Day SLA
                        </span>
                      </div>
                      <div className="text-lg font-black font-mono text-stone-900 pt-1">
                        ₹{opt.stage1.toLocaleString('en-IN')}
                      </div>
                      <p className="text-[11px] text-stone-600 leading-snug">
                        {opt.timeline1}
                      </p>
                    </div>

                    {/* Stage 2 */}
                    <div className="p-3.5 bg-white rounded-lg border border-blue-300 shadow-2xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          STAGE 2: 50% (or 25%)
                        </span>
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                          60-Day SLA
                        </span>
                      </div>
                      <div className="text-lg font-black font-mono text-stone-900 pt-1">
                        ₹{opt.stage2.toLocaleString('en-IN')}
                      </div>
                      <p className="text-[11px] text-stone-600 leading-snug">
                        {opt.timeline2}
                      </p>
                    </div>

                    {/* Stage 3 */}
                    <div className="p-3.5 bg-white rounded-lg border border-amber-300 shadow-2xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          STAGE 3: 25% (Final)
                        </span>
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded">
                          Conviction
                        </span>
                      </div>
                      <div className="text-lg font-black font-mono text-stone-900 pt-1">
                        ₹{opt.stage3.toLocaleString('en-IN')}
                      </div>
                      <p className="text-[11px] text-stone-600 leading-snug">
                        {opt.timeline3}
                      </p>
                    </div>
                  </div>

                  {/* Mandatory Social Rehabilitation Package */}
                  <div className="p-3.5 bg-emerald-50/80 rounded-lg border border-emerald-200 flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-emerald-950 block">
                        Mandatory Additional Rehabilitation Entitlements:
                      </span>
                      <p className="text-emerald-900 text-[11px] mt-0.5">
                        {opt.additional}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* TAB 3: CENTRALLY SPONSORED & STATE WELFARE SCHEMES */}
        {schemesTab === 'schemes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: 'Centrally Sponsored Scheme for Implementation of PCR & PoA Acts',
                titleHi: 'नागरिक अधिकार संरक्षण एवं अत्याचार निवारण अधिनियमों के क्रियान्वयन हेतु केंद्र प्रायोजित योजना',
                funding: '50:50 Centre-State (100% for UTs)',
                ministry: 'Ministry of Social Justice & Empowerment',
                desc: 'Central financial assistance provided to State Governments for setting up Exclusive Special Courts, Special Police Stations, appointing Special Public Prosecutors, and establishing the Atrocity Relief Fund for prompt compensation payouts.',
                benefits: [
                  'Dedicated staffing for Special Atrocity Courts in every district',
                  'State-level SC/ST Protection Cells & Helplines',
                  'Incentives for inter-caste marriages and untouchability abolition campaigns',
                  'Automated DBT compensation pipeline linked to PFMS',
                ],
              },
              {
                title: 'Section 15A Witness Protection & Maintenance Scheme',
                titleHi: 'धारा 15A गवाह संरक्षण एवं रखरखाव भत्ता योजना',
                funding: '100% State-Administered Scheme',
                ministry: 'Ministry of Home Affairs & Social Justice',
                desc: 'Statutory mandate ensuring that no victim or witness in an atrocity prosecution is intimidated or economically burdened during judicial proceedings.',
                benefits: [
                  'Daily travel, food & maintenance allowance of ₹500/day during depositions',
                  'State-funded 24x7 armed escort (Police PSO) for high-threat witnesses',
                  'Safe house relocation and confidential transit during trials',
                  'Digital identity concealment and in-camera video evidence recording',
                ],
              },
              {
                title: 'Dr. Ambedkar Medical Aid & Emergency Relief Scheme',
                titleHi: 'डॉ. आंबेडकर चिकित्सा सहायता एवं आपातकालीन राहत योजना',
                funding: 'Dr. Ambedkar Foundation (Central Sector)',
                ministry: 'Ministry of Social Justice & Empowerment',
                desc: 'Provides immediate financial assistance to victims of heinous atrocities suffering grievous bodily hurt, requiring urgent tertiary or surgical medical care.',
                benefits: [
                  'Direct hospital grant up to ₹3,50,000 for critical surgeries',
                  'Treatment at AIIMS, State Govt Medical Colleges & empanelled super-specialty hospitals',
                  'Immediate cashless admission based on FIR and DM certification',
                  'Prosthetic and physical disability rehabilitation grants',
                ],
              },
              {
                title: 'Pradhan Mantri Awas Yojana (PMAY-G) Priority Housing Reconstruction',
                titleHi: 'प्रधानमंत्री आवास योजना (ग्रामीण) प्राथमिकता आवास पुनर्निर्माण',
                funding: '60:40 Centre-State',
                ministry: 'Ministry of Rural Development & DoSJE',
                desc: 'Automatic priority sanction of permanent pucca houses for victims of arson or property destruction under Rule 12 Annexure-I.',
                benefits: [
                  'Pucca house grant of ₹1,20,000 + 90 days MGNREGA wage support',
                  'Direct allotment within 90 days of DM spot inspection report',
                  'Free LPG connection (Ujjwala) and solar electricity under PM-Surya Ghar',
                  'Allotment in safe community clusters away from perpetrator influence',
                ],
              },
            ].map((scheme, idx) => (
              <div key={idx} className="bg-stone-50 rounded-xl border border-stone-300 p-4 sm:p-5 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                      {scheme.funding}
                    </span>
                    <span className="text-[10px] text-stone-500 font-medium">
                      {scheme.ministry}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-stone-900 leading-snug">
                    {scheme.title}
                  </h4>
                  <p className="text-[11px] text-stone-500 font-serif">
                    {scheme.titleHi}
                  </p>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {scheme.desc}
                  </p>

                  <div className="bg-white p-3 rounded-lg border border-stone-200 space-y-1">
                    <span className="text-[10px] font-bold text-stone-800 uppercase block">
                      Core Scheme Components:
                    </span>
                    <ul className="space-y-0.5 text-[11px] text-stone-600 list-disc list-inside">
                      {scheme.benefits.map((b, bIdx) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. STATUTORY LEGAL FRAMEWORK & BARE ACT COMPENDIUM (#acts)
         ───────────────────────────────────────────────────────────── */}
      <section id="acts" className="bg-white rounded-xl border border-stone-300 p-5 sm:p-7 space-y-6 scroll-mt-24 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-stone-200 pb-4 gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#0B3B60]/10 text-[#0B3B60]">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold font-serif text-stone-900">
                  {isMarathi
                    ? 'अनुसूचित जाती व अनुसूचित जमाती (अत्याचार प्रतिबंध) कायदा आणि नियम'
                    : isHindi
                    ? 'अनुसूचित जाति एवं जनजाति (अत्याचार निवारण) अधिनियम एवं नियम'
                    : 'SC/ST (Prevention of Atrocities) Acts & Rules Compendium'}
                </h3>
                <span className="hidden sm:inline-block text-[10px] font-mono text-[#0B3B60] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded font-bold">
                  #acts
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Act No. 33 of 1989 as amended by Amendment Act, 2015 (Act 1 of 2016) & PoA Amendment Rules, 2016
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              const actCircular = OFFICIAL_CIRCULARS_DATA.find((c) => c.ref.includes('ACT'));
              if (actCircular) {
                handleDownloadPdf(actCircular);
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0B3B60] hover:bg-[#134975] text-white rounded-lg text-xs font-bold transition shadow-2xs self-start md:self-auto cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-amber-300" />
            <span>{isMarathi ? 'कायदा संकलन डाउनलोड (.PDF)' : isHindi ? 'विधिक संकलन डाउनलोड (.PDF)' : 'Download Bare Act Compendium (.PDF)'}</span>
          </button>
        </div>

        {/* Filter Pills for Key Legal Provisions */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-[11px]">
          {[
            { key: 'all', label: 'All Key Provisions (सभी धाराएं)' },
            { key: 'offences', label: 'Offences & Penalties (धारा 3)' },
            { key: 'officer', label: 'Public Servants Liability (धारा 4)' },
            { key: 'courts', label: 'Special Courts & 60-Day SLA (धारा 14)' },
            { key: 'witness', label: 'Witness Rights (धारा 15A)' },
            { key: 'bail', label: 'Bar on Anticipatory Bail (धारा 18A)' },
            { key: 'relief', label: '7-Day DBT Relief Mandate (नियम 12)' },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setActFilter(f.key)}
              className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition cursor-pointer border ${
                actFilter === f.key
                  ? 'bg-[#0B3B60] text-white border-[#0B3B60]'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-300'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Legal Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              sec: 'Section 3',
              badge: 'Substantive Offences',
              badgeColor: 'bg-red-50 text-red-700 border-red-200',
              title: 'Punishments for Offences of Atrocities (29 Categories)',
              titleHi: 'अत्याचार के अपराधों के लिए दंड (29 विनिर्दिष्ट श्रेणियां)',
              act: 'SC/ST (PoA) Act, 1989 (Amended 2015)',
              desc: 'Defines 29 specific atrocity crimes against Scheduled Castes and Scheduled Tribes: forcing ingestion of obnoxious substances, parading naked, tonsuring head, wrongful dispossession of land/water, economic boycott, assault on modesty, contamination of drinking water, and caste abuse in public view.',
              penalty: 'Minimum 6 months to 5 years imprisonment with fine; up to Life Imprisonment or Death Penalty for heinous offences.',
              tag: 'offences',
            },
            {
              sec: 'Section 4',
              badge: 'Officer Accountability',
              badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
              title: 'Punishment for Neglect of Duties by Public Servants',
              titleHi: 'कर्तव्यों की उपेक्षा के लिए लोक सेवकों को अनिवार्य कारावास',
              act: 'SC/ST (PoA) Act, 1989 (Amended 2015)',
              desc: 'Any public servant (police officers, magistrates, administrative staff) who knowingly or willfully neglects their statutory duties under the Act (such as refusal or delay in registering FIR, non-release of Rule 12 relief within 7 days, or failure to complete investigation within 60 days) is criminally liable.',
              penalty: 'Mandatory imprisonment for a term between 6 months and 1 year (non-compoundable).',
              tag: 'officer',
            },
            {
              sec: 'Section 14 & 14(3)',
              badge: 'Judicial SLA',
              badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
              title: 'Exclusive Special Courts & 60-Day Investigation SLA',
              titleHi: 'अनन्य विशेष न्यायालय एवं 60-दिवसीय जांच समय-सीमा',
              act: 'SC/ST (PoA) Act, 1989 (Amended 2015)',
              desc: 'Mandates the establishment of Exclusive Special Courts for every district for day-to-day trials to be concluded within 2 months. Investigating Officers (DSP rank) must complete investigation and file the charge-sheet within 60 days of FIR registration.',
              penalty: 'Day-to-day trial mandate. Investigating Officer must formally explain any delay beyond 60 days to the DVMC.',
              tag: 'courts',
            },
            {
              sec: 'Section 15A',
              badge: 'Witness Charter',
              badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
              title: 'Rights of Victims and Witnesses Protection Charter',
              titleHi: 'पीड़ितों और गवाहों के अधिकार एवं संरक्षण योजना',
              act: 'SC/ST (PoA) Act, 1989 (Inserted 2015)',
              desc: 'Statutory protection charter granting victims and witnesses: state-funded armed escort, concealment of identity during depositions, audio-video recorded testimony, safe transit relocation, daily witness allowance (₹500/day), and mandatory hearing prior to any bail order of accused.',
              penalty: 'Non-derogable right. Threat Assessment Unit in each district must review security.',
              tag: 'witness',
            },
            {
              sec: 'Section 18 & 18A',
              badge: 'Bail Bar & Arrest',
              badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
              title: 'Bar on Anticipatory Bail & No Preliminary Enquiry Requirement',
              titleHi: 'अग्रिम जमानत पर पूर्ण रोक एवं प्रारंभिक जांच की अनिवार्यता समाप्त',
              act: 'SC/ST (PoA) Amendment Act, 2018',
              desc: 'Section 438 of CrPC (anticipatory bail) does not apply to any offence under this Act. Preliminary inquiry is NOT required prior to registration of FIR, nor is approval required for arresting any person accused of an atrocity under the Act.',
              penalty: 'Immediate FIR registration and arrest without prior administrative sanctions.',
              tag: 'bail',
            },
            {
              sec: 'Rule 12(4)',
              badge: 'DBT Relief SLA',
              badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
              title: 'Mandatory 7-Day First Relief Release via Direct Benefit Transfer',
              titleHi: 'प्रत्यक्ष लाभ अंतरण द्वारा 7-दिवसीय अनिवार्य प्रारंभिक राहत',
              act: 'SC/ST (PoA) Amendment Rules, 2016',
              desc: 'The District Magistrate or Sub-Divisional Magistrate must sanction and disburse the first 25% installment of statutory compensation within 7 working days of FIR registration, directly into the bank account of the victim via DBT linked with PFMS.',
              penalty: 'Non-disbursement within 7 days triggers automatic Section 4 neglect proceedings.',
              tag: 'relief',
            },
            {
              sec: 'Rule 17',
              badge: 'Statutory Oversight',
              badgeColor: 'bg-stone-100 text-stone-800 border-stone-300',
              title: 'District Level Vigilance and Monitoring Committee (DVMC)',
              titleHi: 'जिला स्तरीय सतर्कता एवं निगरानी समिति (DVMC)',
              act: 'SC/ST (PoA) Rules, 1995 (Amended 2016)',
              desc: 'Mandatory quarterly meeting chaired by the District Magistrate with local Members of Parliament (MPs), MLAs, SP, and social activists to audit compliance of relief payments, pending investigations, Special Court trials, and witness security.',
              penalty: 'Quarterly review reports must be submitted directly to State Government & NCSC.',
              tag: 'courts',
            },
          ]
            .filter((item) => actFilter === 'all' || item.tag === actFilter)
            .map((sec, idx) => (
              <div
                key={idx}
                className="bg-stone-50 rounded-xl border border-stone-300 p-4 flex flex-col justify-between space-y-3 hover:border-[#0B3B60] transition shadow-2xs"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#0B3B60] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                      {sec.sec}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${sec.badgeColor}`}>
                      {sec.badge}
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">
                    {sec.title}
                  </h4>
                  <p className="text-[11px] text-stone-500 font-serif">
                    {sec.titleHi}
                  </p>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {sec.desc}
                  </p>
                </div>

                <div className="p-2.5 bg-white rounded-lg border border-stone-200 text-[11px] space-y-0.5">
                  <span className="font-bold text-stone-800 block text-[10px] uppercase tracking-wider">
                    Statutory Mandate & Penalty:
                  </span>
                  <span className="text-stone-700 font-medium">
                    {sec.penalty}
                  </span>
                </div>
              </div>
            ))}
        </div>

        {/* 5-Step Statutory Compliance SLA Timeline */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-50/70 via-stone-50 to-emerald-50/70 rounded-xl border border-stone-300 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-[#0B3B60] uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#0B3B60]" />
              <span>Statutory Compliance SLA Trajectory (Day 1 to Conviction)</span>
            </span>
            <span className="text-[10px] text-stone-500 font-mono">SC/ST (PoA) Act Guaranteed</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center sm:text-left">
            <div className="bg-white p-3 rounded-lg border border-stone-200 space-y-1">
              <span className="text-[10px] font-bold text-red-700 block">DAY 1</span>
              <div className="font-bold text-xs text-stone-900">FIR & Safety</div>
              <p className="text-[10px] text-stone-500 leading-tight">Sec 18A No anticipatory bail + Emergency triage</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-emerald-300 space-y-1">
              <span className="text-[10px] font-bold text-emerald-800 block">DAY 7</span>
              <div className="font-bold text-xs text-stone-900">25% DBT Relief</div>
              <p className="text-[10px] text-stone-500 leading-tight">Rule 12(4) Mandatory initial grant credit</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-blue-300 space-y-1">
              <span className="text-[10px] font-bold text-blue-800 block">DAY 60</span>
              <div className="font-bold text-xs text-stone-900">Charge Sheet</div>
              <p className="text-[10px] text-stone-500 leading-tight">Sec 14(3) DSP investigation deadline</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-purple-300 space-y-1">
              <span className="text-[10px] font-bold text-purple-800 block">TRIAL</span>
              <div className="font-bold text-xs text-stone-900">Special Court</div>
              <p className="text-[10px] text-stone-500 leading-tight">Sec 15A Armed escort & audio-video evidence</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-amber-300 space-y-1">
              <span className="text-[10px] font-bold text-amber-900 block">JUDGMENT</span>
              <div className="font-bold text-xs text-stone-900">Final Relief</div>
              <p className="text-[10px] text-stone-500 leading-tight">100% Compensation + Lifelong pension / Govt job</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. REAL-TIME OPERATIONAL METRICS & NATIONAL STATISTICS (#stats)
         ───────────────────────────────────────────────────────────── */}
      <section id="stats" className="bg-[#0B3B60] text-white rounded-xl p-6 sm:p-7 shadow-md space-y-6 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black font-serif text-white uppercase tracking-tight flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-amber-400" />
                <span>National Atrocity Monitoring & Welfare Statistics</span>
              </h3>
              <span className="hidden sm:inline-block text-[10px] font-mono text-amber-300 bg-blue-950 px-2 py-0.5 rounded border border-blue-700">
                #stats
              </span>
            </div>
            <p className="text-xs text-blue-200 mt-0.5">
              Live operational metrics under Rule 12 & Section 15A of the SC/ST PoA Rules across 766 districts
            </p>
          </div>

          {/* Stats Tab Switcher */}
          <div className="flex items-center bg-blue-950 p-1 rounded-lg border border-blue-700 text-xs font-semibold self-start sm:self-auto">
            <button
              onClick={() => setStatsTab('dbt')}
              className={`px-3 py-1 rounded-md transition cursor-pointer ${
                statsTab === 'dbt'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              <span>Relief & DBT</span>
            </button>
            <button
              onClick={() => setStatsTab('triage')}
              className={`px-3 py-1 rounded-md transition cursor-pointer ${
                statsTab === 'triage'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              <span>Distress Triage</span>
            </button>
            <button
              onClick={() => setStatsTab('judicial')}
              className={`px-3 py-1 rounded-md transition cursor-pointer ${
                statsTab === 'judicial'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              <span>Judicial & SLA</span>
            </button>
          </div>
        </div>

        {/* 5 Core Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-center sm:text-left">
          <div className="bg-blue-950/70 p-4 rounded-xl border border-blue-700/60 space-y-1">
            <span className="text-[10px] text-blue-300 uppercase block font-semibold">Districts Monitored</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">766</span>
            <p className="text-[10px] text-blue-200">All 36 States & UTs active</p>
          </div>

          <div className="bg-blue-950/70 p-4 rounded-xl border border-blue-700/60 space-y-1">
            <span className="text-[10px] text-blue-300 uppercase block font-semibold">Pilot Caseload</span>
            <span className="text-2xl sm:text-3xl font-black text-white font-mono">12</span>
            <p className="text-[10px] text-blue-200">Actively tracked in portal</p>
          </div>

          <div className="bg-blue-950/70 p-4 rounded-xl border border-blue-700/60 space-y-1">
            <span className="text-[10px] text-blue-300 uppercase block font-semibold">Relief Sanctioned</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">₹4.85 Cr</span>
            <p className="text-[10px] text-blue-200">Rule 12(4) Direct DBT</p>
          </div>

          <div className="bg-blue-950/70 p-4 rounded-xl border border-blue-700/60 space-y-1">
            <span className="text-[10px] text-blue-300 uppercase block font-semibold">12-hr SLA Rate</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">98.2%</span>
            <p className="text-[10px] text-blue-200">Statutory compliance</p>
          </div>

          <div className="bg-blue-950/70 p-4 rounded-xl border border-blue-700/60 space-y-1 col-span-2 lg:col-span-1">
            <span className="text-[10px] text-blue-300 uppercase block font-semibold">PoA Helpline 14566</span>
            <span className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono">24×7</span>
            <p className="text-[10px] text-blue-200">National live triage active</p>
          </div>
        </div>

        {/* Tab 1: Relief & DBT Analytics */}
        {statsTab === 'dbt' && (
          <div className="bg-blue-950/50 p-5 rounded-xl border border-blue-800 space-y-4">
            <div className="flex items-center justify-between text-xs text-blue-200">
              <span className="font-bold text-white uppercase tracking-wider">
                Direct Benefit Transfer (DBT) Efficiency & Turnaround Indicators
              </span>
              <span className="font-mono text-[11px] text-amber-300">Live PFMS Gateway Telemetry</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-900/40 p-4 rounded-lg border border-blue-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-blue-200 font-medium">7-Day Initial Relief Release</span>
                  <span className="font-mono font-bold text-emerald-400">94.6%</span>
                </div>
                <div className="w-full h-2 bg-blue-950 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: '94.6%' }} />
                </div>
                <p className="text-[10px] text-blue-300">
                  Average time to 1st tranche: <strong>4.2 working days</strong> (SLA target: &le; 7 days)
                </p>
              </div>

              <div className="bg-blue-900/40 p-4 rounded-lg border border-blue-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-blue-200 font-medium">60-Day Investigation SLA</span>
                  <span className="font-mono font-bold text-amber-300">91.8%</span>
                </div>
                <div className="w-full h-2 bg-blue-950 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: '91.8%' }} />
                </div>
                <p className="text-[10px] text-blue-300">
                  Average charge-sheet filing: <strong>48.1 days</strong> by DSP IOs
                </p>
              </div>

              <div className="bg-blue-900/40 p-4 rounded-lg border border-blue-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-blue-200 font-medium">PFMS Direct Credit Success</span>
                  <span className="font-mono font-bold text-cyan-300">99.4%</span>
                </div>
                <div className="w-full h-2 bg-blue-950 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: '99.4%' }} />
                </div>
                <p className="text-[10px] text-blue-300">
                  Zero commission leakage; 0.6% bounced accounts auto-rerouted
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Distress Triage Analytics */}
        {statsTab === 'triage' && (
          <div className="bg-blue-950/50 p-5 rounded-xl border border-blue-800 space-y-4">
            <div className="flex items-center justify-between text-xs text-blue-200">
              <span className="font-bold text-white uppercase tracking-wider">
                National Helpline 14566 & Dynamic Distress Trajectory Analytics
              </span>
              <span className="font-mono text-[11px] text-cyan-300">Psychological First-Aid Console</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-center sm:text-left">
              <div className="bg-blue-900/40 p-3.5 rounded-lg border border-blue-800 space-y-1">
                <span className="text-[10px] text-blue-300 uppercase block font-semibold">Calls Ingested</span>
                <span className="text-xl font-black text-white font-mono">1,842</span>
                <p className="text-[10px] text-blue-200">Toll-free 14566 intake</p>
              </div>
              <div className="bg-blue-900/40 p-3.5 rounded-lg border border-blue-800 space-y-1">
                <span className="text-[10px] text-blue-300 uppercase block font-semibold">AI First-Aid Triage</span>
                <span className="text-xl font-black text-emerald-400 font-mono">71.3%</span>
                <p className="text-[10px] text-blue-200">Mild/Moderate de-escalated</p>
              </div>
              <div className="bg-blue-900/40 p-3.5 rounded-lg border border-blue-800 space-y-1">
                <span className="text-[10px] text-blue-300 uppercase block font-semibold">Clinical Referrals</span>
                <span className="text-xl font-black text-amber-300 font-mono">28.7%</span>
                <p className="text-[10px] text-blue-200">Licensed counselor sessions</p>
              </div>
              <div className="bg-blue-900/40 p-3.5 rounded-lg border border-blue-800 space-y-1">
                <span className="text-[10px] text-blue-300 uppercase block font-semibold">Median Response Time</span>
                <span className="text-xl font-black text-cyan-300 font-mono">3.4 min</span>
                <p className="text-[10px] text-blue-200">SLA target: &le; 10 min</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Judicial & Special Courts */}
        {statsTab === 'judicial' && (
          <div className="bg-blue-950/50 p-5 rounded-xl border border-blue-800 space-y-4">
            <div className="flex items-center justify-between text-xs text-blue-200">
              <span className="font-bold text-white uppercase tracking-wider">
                Designated Special Courts & Section 15A Witness Protection Adherence
              </span>
              <span className="font-mono text-[11px] text-amber-300">National Special Courts Registry</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-center sm:text-left">
              <div className="bg-blue-900/40 p-3.5 rounded-lg border border-blue-800 space-y-1">
                <span className="text-[10px] text-blue-300 uppercase block font-semibold">Special Courts Active</span>
                <span className="text-xl font-black text-white font-mono">412</span>
                <p className="text-[10px] text-blue-200">Designated atrocity courts</p>
              </div>
              <div className="bg-blue-900/40 p-3.5 rounded-lg border border-blue-800 space-y-1">
                <span className="text-[10px] text-blue-300 uppercase block font-semibold">Pilot Conviction Rate</span>
                <span className="text-xl font-black text-emerald-400 font-mono">62.4%</span>
                <p className="text-[10px] text-blue-200">National baseline: 39.2%</p>
              </div>
              <div className="bg-blue-900/40 p-3.5 rounded-lg border border-blue-800 space-y-1">
                <span className="text-[10px] text-blue-300 uppercase block font-semibold">Witness Protection</span>
                <span className="text-xl font-black text-amber-300 font-mono">100%</span>
                <p className="text-[10px] text-blue-200">High-threat witnesses escorted</p>
              </div>
              <div className="bg-blue-900/40 p-3.5 rounded-lg border border-blue-800 space-y-1">
                <span className="text-[10px] text-blue-300 uppercase block font-semibold">Median Trial Duration</span>
                <span className="text-xl font-black text-cyan-300 font-mono">14.2 mo</span>
                <p className="text-[10px] text-blue-200">Down from 38 months</p>
              </div>
            </div>
          </div>
        )}

        {/* Source Citation Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-3 border-t border-blue-800/80 text-[11px] text-blue-300">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>
              Official Data Source: National Crime Records Bureau (NCRB) Crime in India Report & DoSJE Central Telemetry.
            </span>
          </div>
          <span className="text-blue-300 font-mono">
            Updated: Daily 06:00 IST
          </span>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          OFFICIAL GAZETTE & CIRCULARS REPOSITORY MODAL
         ───────────────────────────────────────────────────────────── */}
      {allCircularsModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-stone-300 shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden relative">
            {/* Top Sovereign Tricolor Stripe */}
            <div className="h-1.5 bg-gradient-to-r from-[#F58220] via-white to-[#138808] shrink-0" />

            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-stone-200 flex items-start justify-between bg-stone-50/80">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#0B3B60]/10 text-[#0B3B60]">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-serif text-stone-900">
                    {isMarathi
                      ? 'अधिकृत राजपत्र, परिपत्रके व सरकारी आदेश संग्रह'
                      : isHindi
                      ? 'आधिकारिक राजपत्र, परिपत्र एवं सरकारी आदेश संग्रह'
                      : 'Official Gazette, Circulars & Statutory Orders Repository'}
                  </h3>
                  <p className="text-xs text-stone-600">
                    Ministry of Social Justice & Empowerment • Department of Social Justice & Empowerment
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAllCircularsModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search and Filters Bar */}
            <div className="p-4 bg-white border-b border-stone-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder={
                    isMarathi
                      ? 'संदर्भ क्र., विषय किंवा कायद्यानुसार शोधा...'
                      : isHindi
                      ? 'संदर्भ संख्या, विषय या अधिनियम द्वारा खोजें...'
                      : 'Search by reference number, subject, act citation...'
                  }
                  value={circularSearchQuery}
                  onChange={(e) => setCircularSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0B3B60]/30 focus:border-[#0B3B60]"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto text-[11px]">
                {(['all', 'Notification', 'Circular', 'Advisory', 'Gazette Order'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setCircularTypeFilter(type)}
                    className={`px-2.5 py-1 rounded-full font-medium whitespace-nowrap transition cursor-pointer border ${
                      circularTypeFilter === type
                        ? 'bg-[#0B3B60] text-white border-[#0B3B60]'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-300'
                    }`}
                  >
                    {type === 'all' ? (isMarathi ? 'सर्व' : isHindi ? 'सभी' : 'All') : type}
                  </button>
                ))}
              </div>
            </div>

            {/* Circulars List Content */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 divide-y divide-stone-200 flex-1">
              {OFFICIAL_CIRCULARS_DATA.filter((item) => {
                const matchesType =
                  circularTypeFilter === 'all' || item.type === circularTypeFilter;
                const matchesQuery =
                  !circularSearchQuery ||
                  item.ref.toLowerCase().includes(circularSearchQuery.toLowerCase()) ||
                  item.title.toLowerCase().includes(circularSearchQuery.toLowerCase()) ||
                  item.titleHi.toLowerCase().includes(circularSearchQuery.toLowerCase()) ||
                  (item.division && item.division.toLowerCase().includes(circularSearchQuery.toLowerCase())) ||
                  (item.legalAct && item.legalAct.toLowerCase().includes(circularSearchQuery.toLowerCase()));
                return matchesType && matchesQuery;
              }).map((circular, idx) => {
                const isDownloading = downloadingRef === circular.ref;
                return (
                  <div key={circular.ref} className={`pt-4 first:pt-0 space-y-3`}>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1 max-w-2xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#0B3B60] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                            F. No. {circular.ref}
                          </span>
                          <span className="text-[11px] font-semibold text-stone-600">
                            {circular.date}
                          </span>
                          <span className="text-[10px] font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded uppercase">
                            {circular.type}
                          </span>
                          <span className="text-[10px] text-stone-500">
                            Division: {circular.division}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-stone-900 leading-snug pt-1">
                          {isHindi ? circular.titleHi : circular.title}
                        </h4>

                        {circular.titleHi && !isHindi && (
                          <p className="text-xs text-stone-500 font-serif">
                            {circular.titleHi}
                          </p>
                        )}

                        {circular.legalAct && (
                          <div className="text-[11px] text-amber-950 font-semibold bg-amber-50/80 border border-amber-200 px-2.5 py-1 rounded mt-1.5 inline-block">
                            Statutory Reference: {circular.legalAct}
                          </div>
                        )}

                        {circular.summary && (
                          <p className="text-xs text-stone-700 leading-relaxed pt-1">
                            {circular.summary}
                          </p>
                        )}

                        {circular.keyDirectives && circular.keyDirectives.length > 0 && (
                          <div className="mt-2 bg-stone-50 p-2.5 rounded-lg border border-stone-200 text-xs space-y-1">
                            <span className="font-bold text-stone-800 text-[11px] block">
                              Key Directives & Action Mandates:
                            </span>
                            <ul className="list-disc list-inside space-y-0.5 text-stone-600 text-[11px]">
                              {circular.keyDirectives.map((d, dIdx) => (
                                <li key={dIdx}>{d}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Download PDF button */}
                      <div className="shrink-0 sm:pt-1">
                        <button
                          onClick={() => handleDownloadPdf(circular)}
                          disabled={isDownloading}
                          className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer shadow-xs ${
                            isDownloading
                              ? 'bg-amber-100 text-amber-900 border border-amber-300 cursor-wait'
                              : 'bg-[#0B3B60] hover:bg-[#134975] text-white border border-[#0B3B60]'
                          }`}
                        >
                          {isDownloading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-amber-800" />
                              <span>Generating PDF...</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4 text-amber-300" />
                              <span>Download Official PDF</span>
                            </>
                          )}
                        </button>
                        <div className="text-[10px] text-center text-stone-500 mt-1 font-mono">
                          Format: PDF • ~120 KB
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:p-4 bg-stone-100 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-600">
              <div className="flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-[11px]">
                  All downloaded documents carry statutory authentication under IT Act, 2000 & Rule 12 of SC/ST (PoA) Rules.
                </span>
              </div>
              <button
                onClick={() => setAllCircularsModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold text-xs transition cursor-pointer"
              >
                Close (बंद करें)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
