import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { useAccessibilityStore, useAuthStore } from '../store/authStore';
import { AshokaEmblem, SwachhBharatLogo, AzadiMahotsavBadge, AtrocityHelplineBadge } from './NationalEmblem';
import {
  Globe,
  Type,
  Phone,
  Shield,
  Heart,
  Scale,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  Compass,
  FileText,
  AlertTriangle,
  Info,
} from 'lucide-react';

export const GovernmentHeader: React.FC = () => {
  const { isHindi, language, toggleLanguage } = useLanguage();
  const { largeText, toggleLargeText } = useAccessibilityStore();
  const setDemoRole = useAuthStore((s) => s.setDemoRole);
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  const handlePortalNavigate = (role: any, path: string) => {
    setDemoRole(role);
    navigate(path);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    if (largeText) {
      document.documentElement.classList.add('text-mode-large');
    } else {
      document.documentElement.classList.remove('text-mode-large');
    }
  }, [largeText]);

  return (
    <header className="w-full bg-white border-b border-stone-300 select-none">
      {/* ─────────────────────────────────────────────────────────────
          1. TOP GIGW ACCESSIBILITY & GOI SOVEREIGN STRIP
         ───────────────────────────────────────────────────────────── */}
      <div className="bg-[#1E293B] text-slate-200 text-xs py-1 px-3 sm:px-6 border-b border-slate-700">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Indian Tricolor & Government of India */}
          <div className="flex items-center gap-2">
            {/* Tiranga Mini Bar */}
            <div className="flex flex-col h-3.5 w-5 rounded-[2px] overflow-hidden border border-white/20">
              <div className="h-1/3 bg-[#F58220]" />
              <div className="h-1/3 bg-white flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#000080]" />
              </div>
              <div className="h-1/3 bg-[#138808]" />
            </div>
            <span className="font-semibold text-slate-100 text-[11px] tracking-wide">
              {isHindi ? 'भारत सरकार' : 'GOVERNMENT OF INDIA'}
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300 text-[11px] hidden md:inline">
              {isHindi
                ? 'सामाजिक न्याय और अधिकारिता मंत्रालय'
                : 'Ministry of Social Justice and Empowerment'}
            </span>
          </div>

          {/* Right: GIGW Accessibility & Language Controls */}
          <div className="flex items-center gap-2 sm:gap-3 text-[11px] ml-auto">
            {/* Skip to main content link for screen readers */}
            <a
              href="#main-content"
              className="text-slate-300 hover:text-amber-300 underline hidden lg:inline"
            >
              {isHindi ? 'मुख्य सामग्री पर जाएं' : 'Skip to main content'}
            </a>

            <span className="text-slate-600 hidden lg:inline">|</span>

            {/* Font Size A- / A / A+ */}
            <div className="flex items-center bg-slate-800 rounded border border-slate-700 overflow-hidden">
              <button
                onClick={toggleLargeText}
                className={`px-2 py-0.5 font-bold transition ${
                  !largeText ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-300 hover:text-white'
                }`}
                title="Standard Text Size"
              >
                A
              </button>
              <button
                onClick={toggleLargeText}
                className={`px-2 py-0.5 font-bold transition ${
                  largeText ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-300 hover:text-white'
                }`}
                title="Enlarge Text Size (A+)"
              >
                A+
              </button>
            </div>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition"
              title="Change Language / भाषा बदला"
            >
              <Globe className="w-3 h-3 text-teal-400" />
              <span>{language === 'en' ? 'English' : language === 'hi' ? 'हिन्दी' : 'मराठी'}</span>
            </button>

            {/* SIH 2026 Tag */}
            <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-[10px] tracking-wider">
              SIH 2026 PROTOTYPE
            </span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN MINISTRY BRANDING HEADER WITH EMBLEM & CAMPAIGNS
         ───────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
        {/* Left: Ashoka Emblem & Official Titles */}
        <Link to="/" className="flex items-center gap-3 sm:gap-4 group">
          <div className="text-[#0B3B60] shrink-0 group-hover:scale-105 transition-transform">
            <AshokaEmblem className="w-12 h-16 sm:w-14 sm:h-20" />
          </div>

          <div className="space-y-0.5">
            <div className="text-[11px] sm:text-xs font-bold text-stone-700 tracking-tight font-serif">
              सामाजिक न्याय और अधिकारिता मंत्रालय
            </div>
            <div className="text-xs sm:text-sm font-black text-[#0B3B60] tracking-tight uppercase font-serif leading-none">
              MINISTRY OF SOCIAL JUSTICE AND EMPOWERMENT
            </div>
            <div className="text-[10px] sm:text-[11px] font-semibold text-stone-600">
              सामाजिक न्याय और अधिकारिता विभाग | Department of Social Justice and Empowerment
            </div>
            <div className="pt-0.5 flex items-center gap-2">
              <span className="text-sm sm:text-base font-black text-amber-900 font-serif tracking-tight">
                सहाय (SAHAY)
              </span>
              <span className="text-[10px] font-bold text-teal-900 bg-teal-50 border border-teal-300 px-2 py-0.2 rounded">
                SC/ST PoA Monitoring & Distress Safeguard
              </span>
            </div>
          </div>
        </Link>

        {/* Right: National Campaigns & 14566 Helpline */}
        <div className="hidden lg:flex items-center gap-4">
          <SwachhBharatLogo className="h-10" />
          <AzadiMahotsavBadge className="h-10" />
          <AtrocityHelplineBadge />
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen((o) => !o)}
          className="lg:hidden p-2 rounded-lg bg-stone-100 text-stone-800 hover:bg-stone-200 transition border border-stone-300"
          title="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. PRIMARY GOVERNMENT BLUE NAVIGATION BAR
         ───────────────────────────────────────────────────────────── */}
      <nav
        aria-label="Government Portal Navigation"
        className="bg-[#0B3B60] text-white border-t border-b-2 border-b-[#F58220] sticky top-0 z-50 shadow-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Main horizontal nav links */}
          <div className="hidden lg:flex items-center font-semibold text-xs tracking-wide">
            <Link
              to="/"
              className={`px-3.5 py-3 transition hover:bg-[#134975] flex items-center gap-1.5 border-b-2 ${
                location.pathname === '/' || location.pathname === '/welcome'
                  ? 'border-amber-400 text-amber-300 bg-[#134975]'
                  : 'border-transparent text-white'
              }`}
            >
              <span>{isHindi ? 'मुख्य पृष्ठ' : 'Home'}</span>
            </Link>

            <button
              onClick={() => handlePortalNavigate('victim', '/victim')}
              className={`px-3.5 py-3 transition hover:bg-teal-900/60 flex items-center gap-1.5 border-b-2 ${
                location.pathname.startsWith('/victim')
                  ? 'border-teal-400 text-teal-200 bg-teal-950/80 font-bold'
                  : 'border-transparent text-teal-100'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-teal-300" />
              <span>{isHindi ? 'नागरिक सुरक्षित पोर्टल' : 'Citizen Safe Portal'}</span>
            </button>

            <button
              onClick={() => handlePortalNavigate('district_officer', '/dashboard')}
              className={`px-3.5 py-3 transition hover:bg-amber-900/60 flex items-center gap-1.5 border-b-2 ${
                location.pathname === '/dashboard' || location.pathname === '/cases' || location.pathname === '/alerts'
                  ? 'border-amber-400 text-amber-200 bg-navy-950 font-bold'
                  : 'border-transparent text-amber-100'
              }`}
            >
              <Scale className="w-3.5 h-3.5 text-amber-300" />
              <span>{isHindi ? 'प्रशासनिक कंसोल (DM/SDM)' : 'Official Console (DM/SDM)'}</span>
            </button>

            <a
              href="#users"
              className="px-3.5 py-3 transition hover:bg-[#134975] text-slate-100 border-b-2 border-transparent"
            >
              <span>{isHindi ? 'उपयोगकर्ता पोर्टल (#users)' : 'Stakeholder Portals (#users)'}</span>
            </a>

            <a
              href="#schemes"
              className="px-3.5 py-3 transition hover:bg-[#134975] text-slate-100 border-b-2 border-transparent"
            >
              <span>{isHindi ? 'प्रमुख योजनाएं' : 'Schemes & Relief'}</span>
            </a>

            <a
              href="#acts"
              className="px-3.5 py-3 transition hover:bg-[#134975] text-slate-100 border-b-2 border-transparent"
            >
              <span>{isHindi ? 'अधिनियम एवं नियम' : 'PoA Acts & Rules'}</span>
            </a>

            <a
              href="#stats"
              className="px-3.5 py-3 transition hover:bg-[#134975] text-slate-100 border-b-2 border-transparent"
            >
              <span>{isHindi ? 'सांख्यिकी' : 'Statistics'}</span>
            </a>

            <Link
              to="/welcome"
              className="px-3.5 py-3 transition hover:bg-[#134975] text-amber-300 border-b-2 border-transparent flex items-center gap-1"
            >
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>{isHindi ? 'SIH गाइड' : 'SIH Hub'}</span>
            </Link>
          </div>

          {/* Right side in navy bar: Emergency Direct Dial */}
          <div className="py-2 ml-auto flex items-center gap-2">
            <a
              href="tel:14566"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#F58220] hover:bg-[#d97014] text-slate-950 font-black text-xs shadow-xs transition"
            >
              <Phone className="w-3.5 h-3.5 text-slate-950" />
              <span>हेल्पलाइन 14566</span>
            </a>
          </div>
        </div>

        {/* Mobile Dropdown Nav Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#082b47] border-t border-slate-700 px-4 py-3 space-y-2 text-xs">
            <button
              onClick={() => {
                navigate('/');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 rounded hover:bg-slate-800 text-white font-semibold block"
            >
              {isHindi ? 'मुख्य पृष्ठ' : 'Home'}
            </button>
            <button
              onClick={() => handlePortalNavigate('victim', '/victim')}
              className="w-full text-left py-2 px-3 rounded bg-teal-900/60 text-teal-200 font-bold block"
            >
              {isHindi ? 'नागरिक / पीड़ित सुरक्षित पोर्टल' : 'Citizen Safe Space Portal'}
            </button>
            <button
              onClick={() => handlePortalNavigate('district_officer', '/dashboard')}
              className="w-full text-left py-2 px-3 rounded bg-amber-900/60 text-amber-200 font-bold block"
            >
              {isHindi ? 'प्रशासनिक कंसोल (DM / SDM)' : 'Officer Console (DM / SDM)'}
            </button>
            <button
              onClick={() => handlePortalNavigate('counsellor', '/cases')}
              className="w-full text-left py-2 px-3 rounded hover:bg-slate-800 text-slate-200 block"
            >
              {isHindi ? 'क्लिनिकल मनोवैज्ञानिक कंसोल' : 'Clinical Counsellor Console'}
            </button>
            <button
              onClick={() => handlePortalNavigate('state_admin', '/analytics')}
              className="w-full text-left py-2 px-3 rounded hover:bg-slate-800 text-slate-200 block"
            >
              {isHindi ? 'राज्य / राष्ट्रीय प्रशासन' : 'State / National Analytics'}
            </button>
            <div className="pt-2 border-t border-slate-700 flex items-center justify-between">
              <span className="text-amber-300 font-bold">Helpline: 14566</span>
              <button
                onClick={toggleLanguage}
                className="px-2 py-1 rounded bg-slate-700 text-white"
              >
                {language === 'en' ? 'हिन्दी में देखें' : 'View in English'}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
