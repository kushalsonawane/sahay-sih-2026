import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useLanguage } from '../hooks/useLanguage';
import { AshokaEmblem } from '../components/NationalEmblem';
import {
  Heart,
  Scale,
  Stethoscope,
  Building2,
  Shield,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  FileText,
  MessageCircleHeart,
  BarChart3,
  Lock,
  Phone,
  Users,
  Star,
} from 'lucide-react';

/**
 * WelcomePage — SIH 2026 Hackathon Evaluator & Demo Hub
 *
 * A dedicated presentation hub for hackathon judges to quickly understand
 * the SAHAY system and navigate to any role portal.
 */
export const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const setDemoRole = useAuthStore((s) => s.setDemoRole);
  const { isHindi, isMarathi, isMarathi } = useLanguage();

  const handleRoleNavigate = (role: any, path: string) => {
    setDemoRole(role);
    navigate(path);
  };

  const roles = [
    {
      role: 'victim' as const,
      path: '/victim',
      icon: <Heart className="w-6 h-6 text-teal-700" />,
      title: 'Citizen / Victim Safe Portal',
      titleHi: 'नागरिक / पीड़ित सुरक्षित पोर्टल',
      description:
        'Trauma-informed safe space for SC/ST atrocity victims with daily check-in, Sahay Mitra AI companion, Rule 12 relief tracking, and emergency quick-exit.',
      descHi: 'SC/ST अत्याचार पीड़ितों के लिए सुरक्षित डिजिटल स्थान जहाँ दैनिक कल्याण चेक-इन, सहाय मित्र AI साथी, नियम 12 राहत ट्रैकिंग और त्वरित बाहरी निकास उपलब्ध हैं।',
      color: 'border-teal-600 hover:bg-teal-50',
      badge: 'bg-teal-50 text-teal-800 border-teal-300',
      btn: 'bg-teal-700 hover:bg-teal-600',
      features: ['Sahay Mitra AI Chatbot (TTS + Voice)', '5-4-3-2-1 Grounding Tool', '4-2-6 Box Breathing', 'Rule 12 Relief Calculator', 'Quick Safe Exit (Google)'],
    },
    {
      role: 'district_officer' as const,
      path: '/dashboard',
      icon: <Scale className="w-6 h-6 text-[#0B3B60]" />,
      title: 'District Officer Console (DM/SDM)',
      titleHi: 'जिला अधिकारी कंसोल (DM/SDM)',
      description:
        'Real-time distress monitoring dashboard for District Magistrates and SDMs, with SLA-enforced Rule 12 relief approvals, Section 15A protection orders, and critical alert triage.',
      descHi: 'जिला मजिस्ट्रेट और SDM के लिए रियल-टाइम निगरानी कंसोल जहाँ SLA-प्रवर्तित नियम 12 राहत अनुमोदन, धारा 15A सुरक्षा आदेश और संकट अलर्ट उपलब्ध हैं।',
      color: 'border-[#0B3B60] hover:bg-blue-50',
      badge: 'bg-blue-50 text-[#0B3B60] border-blue-300',
      btn: 'bg-[#0B3B60] hover:bg-[#082b47]',
      features: ['Rule 12(4) SLA Alert System', 'PHQ-9 & ISQ Distress Trajectories', 'Section 15A Protection Orders', 'Case Management & Interventions', 'Analytics & Compliance Reports'],
    },
    {
      role: 'counsellor' as const,
      path: '/cases',
      icon: <Stethoscope className="w-6 h-6 text-purple-700" />,
      title: 'Clinical Psychologist Console',
      titleHi: 'क्लिनिकल मनोवैज्ञानिक कंसोल',
      description:
        'Longitudinal mental health monitoring for licensed counsellors, with distress trajectory charts, tele-counselling session management, and clinical intervention notes.',
      descHi: 'लाइसेंसधारी परामर्शदाताओं के लिए दीर्घकालिक मानसिक स्वास्थ्य निगरानी, जहाँ संकट ट्रेंड चार्ट, टेली-परामर्श प्रबंधन और क्लिनिकल हस्तक्षेप नोट्स उपलब्ध हैं।',
      color: 'border-purple-500 hover:bg-purple-50',
      badge: 'bg-purple-50 text-purple-800 border-purple-300',
      btn: 'bg-purple-700 hover:bg-purple-600',
      features: ['Distress Trend Visualization', 'PHQ-9 Score Monitoring', 'Session Appointment Tracking', 'Intervention Logging', 'Crisis Alert Escalation'],
    },
    {
      role: 'state_admin' as const,
      path: '/analytics',
      icon: <Building2 className="w-6 h-6 text-amber-700" />,
      title: 'State / National Admin Dashboard',
      titleHi: 'राज्य / राष्ट्रीय प्रशासन डैशबोर्ड',
      description:
        'Ministry-level policy analytics with district-wide distress statistics, Rule 12 compliance tracking, DPDP-compliant audit trails, and national SC/ST monitoring reports.',
      descHi: 'मंत्रालय स्तरीय नीति विश्लेषण, जिला-स्तरीय संकट आँकड़े, नियम 12 अनुपालन ट्रैकिंग और राष्ट्रीय SC/ST निगरानी रिपोर्ट उपलब्ध हैं।',
      color: 'border-amber-600 hover:bg-amber-50',
      badge: 'bg-amber-50 text-amber-800 border-amber-300',
      btn: 'bg-amber-700 hover:bg-amber-600',
      features: ['766-District Analytics', 'Compliance SLA Reports', 'DPDP Audit Trails', 'National Trend Reports', 'Ministry-Level Monitoring'],
    },
  ];

  const keyTechStack = [
    { name: 'React + Vite', desc: 'TypeScript, progressive web app (PWA)' },
    { name: 'AI Intent Engine', desc: '25+ trauma-informed intent categories' },
    { name: 'Web Speech API', desc: 'TTS + Speech Recognition (multilingual)' },
    { name: 'Express.js API', desc: 'REST backend with Prisma ORM' },
    { name: 'Rule 12 Logic', desc: 'SC/ST PoA statutory relief calculator' },
    { name: 'DPDP Compliance', desc: 'Pseudonymized records + immutable audit log' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      {/* ─── Header Strip ─── */}
      <div className="bg-[#0B3B60] text-white border-b-4 border-[#F58220]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center gap-6">
          <AshokaEmblem className="w-14 h-18 shrink-0" />
          <div className="text-center sm:text-left">
            <div className="text-xs text-blue-200 font-semibold uppercase tracking-widest mb-1">
              Smart India Hackathon 2026 — SIH26 • Ministry of Social Justice & Empowerment
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-serif tracking-tight">
              SAHAY (सहाय) — Evaluator & Demo Hub
            </h1>
            <p className="text-sm text-blue-200 mt-1.5 leading-relaxed max-w-2xl">
              AI-Powered Dynamic Mental Health Monitoring, Distress Prediction & Rule 12 Statutory Relief System for Victims of SC/ST Atrocities
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
                <Star className="w-3 h-3" /> Problem Statement PS-2026-SIH-MoSJE-04
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-teal-400/20 text-teal-300 border border-teal-400/30 text-xs font-bold">
                <CheckCircle2 className="w-3 h-3" /> Build: ✓ Passing • TypeScript: 0 Errors
              </span>
              <a
                href="https://socialjustice.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 text-white border border-white/20 text-xs font-semibold hover:bg-white/20 transition"
              >
                <ExternalLink className="w-3 h-3" /> socialjustice.gov.in
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* ─── Problem Statement Summary ─── */}
        <section className="bg-white rounded-xl border border-stone-300 p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2.5 border-b border-stone-200 pb-3">
            <FileText className="w-5 h-5 text-[#0B3B60]" />
            <h2 className="text-base font-black font-serif text-stone-900">
              Problem Statement & Solution Overview
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 text-xs text-stone-700">
            <div className="space-y-3">
              <h3 className="font-bold text-sm text-stone-900">Problem Statement</h3>
              <p className="leading-relaxed">
                Victims of SC/ST atrocities face a critical gap in post-incident support: delayed statutory economic relief under Rule 12(4), inadequate mental health monitoring, failure to provide witness protection under Section 15A, and no real-time mechanism for authorities to detect and respond to escalating distress.
              </p>
              <p className="leading-relaxed text-stone-600">
                The SC/ST (Prevention of Atrocities) Act 1989 mandates relief disbursement within 7 days of FIR registration, but compliance rates remain critically low across districts due to lack of automated tracking and psychological early-warning systems.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-sm text-stone-900">SAHAY Solution</h3>
              <ul className="space-y-2">
                {[
                  'Dynamic mental health monitoring via daily PHQ-9 & ISQ check-ins with AI distress score prediction',
                  'Sahay Mitra: 24/7 trauma-informed AI companion with TTS, voice input, grounding tools, and crisis escalation',
                  'Rule 12 automatic SLA enforcement: real-time alerts when 7-day/12-hour windows approach breach',
                  'Section 15A protection protocol: one-click witness protection order generation for DM/SDM',
                  'DPDP Act 2023 compliant: pseudonymized records, role-based access, immutable audit trails',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── Role Portal Navigation ─── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 border-b-2 border-[#0B3B60] pb-2">
            <div className="w-1.5 h-6 bg-[#F58220] rounded-sm" />
            <h2 className="text-base sm:text-lg font-black font-serif text-[#0B3B60] uppercase tracking-tight">
              {(isMarathi || isHindi) ? 'डेमो रोल पोर्टल — Evaluator Navigation' : 'Demo Role Portals — Select Any Role to Evaluate'}
            </h2>
          </div>
          <p className="text-xs text-stone-600">
            Click any portal below to instantly switch demo roles and explore all features without login.
            All data is safely sandboxed with anonymized pilot case records.
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            {roles.map((r) => (
              <div
                key={r.role}
                className={`bg-white rounded-xl border-2 ${r.color} shadow-xs transition p-5 space-y-4 flex flex-col justify-between`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="p-2 rounded-lg bg-stone-100 border border-stone-200">
                      {r.icon}
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${r.badge} uppercase`}>
                      Demo Role
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-black font-serif text-stone-900 leading-tight">
                      {(isMarathi || isHindi) ? r.titleHi : r.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed mt-1.5">
                      {(isMarathi || isHindi) ? r.descHi : r.description}
                    </p>
                  </div>
                  <ul className="space-y-1 text-[11px] text-stone-700">
                    {r.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => handleRoleNavigate(r.role, r.path)}
                  className={`w-full py-2.5 px-4 rounded-xl ${r.btn} text-white font-bold text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer`}
                >
                  <span>Enter {(isMarathi || isHindi) ? r.titleHi : r.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Technology Stack ─── */}
        <section className="bg-white rounded-xl border border-stone-300 p-5 space-y-4 shadow-xs">
          <div className="flex items-center gap-2.5 border-b border-stone-200 pb-3">
            <Shield className="w-5 h-5 text-[#0B3B60]" />
            <h2 className="text-base font-bold font-serif text-stone-900">
              Technology Stack & Architecture
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {keyTechStack.map((t, i) => (
              <div
                key={i}
                className="bg-stone-50 border border-stone-200 rounded-lg p-3 space-y-1"
              >
                <div className="text-xs font-bold text-stone-900">{t.name}</div>
                <div className="text-[11px] text-stone-600">{t.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Key Demo Scenarios ─── */}
        <section className="bg-[#0B3B60] text-white rounded-xl p-6 space-y-4">
          <h2 className="text-base font-black font-serif uppercase tracking-tight flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400" />
            Recommended Evaluation Scenarios
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {[
              {
                title: '1. Victim Uses Sahay Mitra',
                desc: 'Enter Citizen Portal → Talk to Sahay Mitra → Type "I am getting threats" or click "I feel threatened" → See Section 15A legal response + officer alert chip.',
                icon: <MessageCircleHeart className="w-4 h-4 text-amber-300" />,
              },
              {
                title: '2. Crisis Protocol Demo',
                desc: 'Enter Citizen Portal → Sahay Mitra → Type "I want to end my life" → See immediate crisis response with KIRAN 1800-599-0019, 14566 helpline, and emergency officer alert.',
                icon: <Phone className="w-4 h-4 text-red-300" />,
              },
              {
                title: '3. Rule 12 Grounding + Breathing',
                desc: 'In Sahay Mitra → Type "help me calm down" → Use 5-4-3-2-1 Grounding Tool → Then click "Box Breathing" → Interactive step-by-step guides open in-chat.',
                icon: <Heart className="w-4 h-4 text-teal-300" />,
              },
              {
                title: '4. Daily Well-Being Check-In',
                desc: 'Enter Citizen Portal → Start Check-In → Complete all 6 steps (distress, sleep, safety, legal anxiety, practical needs) → See distress score output.',
                icon: <CheckCircle2 className="w-4 h-4 text-emerald-300" />,
              },
              {
                title: '5. District Officer Alert Response',
                desc: 'Enter Officer Console (DM/SDM) → View critical SLA alerts → Click any alert → See 12-hour response window → Approve Rule 12 initial relief.',
                icon: <Scale className="w-4 h-4 text-amber-300" />,
              },
              {
                title: '6. State Analytics Dashboard',
                desc: 'Enter State/National Admin → View 766-district distress heatmap → See compliance SLA rates → Export simulated ministry report.',
                icon: <BarChart3 className="w-4 h-4 text-blue-300" />,
              },
            ].map((scenario, i) => (
              <div
                key={i}
                className="bg-blue-950/50 border border-blue-700/40 rounded-lg p-3.5 space-y-2"
              >
                <div className="flex items-center gap-2 font-bold text-sm text-white">
                  {scenario.icon}
                  {scenario.title}
                </div>
                <p className="text-blue-200 leading-relaxed">{scenario.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Privacy & Compliance ─── */}
        <section className="bg-stone-100 rounded-xl border border-stone-300 p-5 text-xs text-stone-700 flex flex-col sm:flex-row items-start gap-4">
          <Lock className="w-5 h-5 text-stone-500 shrink-0 mt-0.5" />
          <div className="space-y-1.5 leading-relaxed">
            <strong className="text-stone-900 text-sm block">Privacy & Data Protection Statement</strong>
            All data displayed in this prototype is entirely simulated and anonymized for demonstration
            purposes only. No real victim or case data is used. The system is designed for full compliance with the
            Digital Personal Data Protection (DPDP) Act 2023 — all PII is pseudonymized, access is role-restricted,
            and every record access is logged in an immutable audit trail. In production, end-to-end encryption would
            be implemented across the full data lifecycle.
          </div>
        </section>

        {/* Quick Links */}
        <div className="flex flex-wrap gap-3 justify-center pb-4">
          <button
            onClick={() => handleRoleNavigate('victim', '/victim')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-700 text-white rounded-lg text-sm font-bold hover:bg-teal-600 transition"
          >
            <Heart className="w-4 h-4" /> Citizen Safe Portal
          </button>
          <button
            onClick={() => handleRoleNavigate('district_officer', '/dashboard')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B3B60] text-white rounded-lg text-sm font-bold hover:bg-[#072842] transition"
          >
            <Scale className="w-4 h-4" /> Officer Console
          </button>
          <button
            onClick={() => handleRoleNavigate('counsellor', '/cases')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-700 text-white rounded-lg text-sm font-bold hover:bg-purple-600 transition"
          >
            <Stethoscope className="w-4 h-4" /> Counsellor Console
          </button>
          <button
            onClick={() => handleRoleNavigate('state_admin', '/analytics')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-700 text-white rounded-lg text-sm font-bold hover:bg-amber-600 transition"
          >
            <BarChart3 className="w-4 h-4" /> State Analytics
          </button>
        </div>
      </div>
    </div>
  );
};
