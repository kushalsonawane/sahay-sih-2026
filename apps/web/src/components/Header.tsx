import React from 'react';
import { useActiveRole } from '../store/authStore';
import { useLanguage } from '../hooks/useLanguage';
import { Bell, Search, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AshokaEmblem, SwachhBharatLogo } from './NationalEmblem';

export const Header: React.FC = () => {
  const activeRole = useActiveRole();
  const { isHindi } = useLanguage();

  return (
    <header className="bg-white border-b-2 border-stone-300 sticky top-0 z-40 shadow-xs">
      {/* Top official banner */}
      <div className="bg-[#1E293B] text-slate-200 px-4 sm:px-6 py-1 text-[11px] flex justify-between items-center border-b border-slate-700">
        <div className="flex items-center gap-2">
          {/* Tiranga Mini Bar */}
          <div className="flex flex-col h-3.5 w-5 rounded-[2px] overflow-hidden border border-white/20">
            <div className="h-1/3 bg-[#F58220]" />
            <div className="h-1/3 bg-white flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#000080]" />
            </div>
            <div className="h-1/3 bg-[#138808]" />
          </div>
          <span className="font-bold text-slate-100">सत्यमेव जयते</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">Government of India • Ministry of Social Justice & Empowerment</span>
        </div>
        <div className="hidden md:flex items-center gap-3 text-slate-300 text-[11px]">
          <span>National SC/ST PoA Helpline: <strong className="text-amber-300 font-mono">14566 (Toll-Free)</strong></span>
          <span className="text-slate-500">|</span>
          <span>Emergency: <strong className="text-rose-400 font-mono">112</strong></span>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4 py-2">
        {/* Brand with Ashoka Lion Capital */}
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <div className="text-[#0B3B60] shrink-0 group-hover:scale-105 transition-transform">
            <AshokaEmblem className="w-10 h-13 sm:w-11 sm:h-14" />
          </div>
          <div>
            <div className="text-[10px] sm:text-[11px] font-bold text-stone-700 font-serif leading-tight">
              सामाजिक न्याय और अधिकारिता विभाग • DoSJE
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-black tracking-tight text-[#0B3B60] font-serif">
                {isHindi ? 'सहाय' : 'SAHAY'}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-[#0B3B60] font-bold border border-blue-200 uppercase">
                {isHindi ? 'प्रशासनिक कंसोल' : 'Official Console'}
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-stone-500 hidden sm:block leading-tight">
              {isHindi
                ? 'अत्याचार पीड़ितों के लिए गतिशील मानसिक स्वास्थ्य निगरानी'
                : 'Atrocity Victim Distress Safeguard & Rule 12 Monitoring System'}
            </p>
          </div>
        </Link>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Swachh Bharat in Header */}
          <div className="hidden xl:block">
            <SwachhBharatLogo className="h-8" />
          </div>

          {/* Return to Presentation Hub button */}
          <Link
            to="/welcome"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-semibold text-xs transition"
            title="Return to Presentation Hub"
          >
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            <span className="hidden sm:inline">{isHindi ? 'पोर्टल हब' : 'SIH Hub'}</span>
          </Link>

          {/* Search input for cases & alerts */}
          <div className="relative hidden md:block w-56 lg:w-64">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search case ref, FIR, block..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0B3B60] focus:border-[#0B3B60]"
                />
              </div>

              {/* Staff notifications */}
              <Link
                to="/alerts"
                className="relative p-2 rounded-lg text-stone-600 hover:text-[#0B3B60] hover:bg-stone-100 transition"
                title="View Active Alerts"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-600 ring-2 ring-white" />
              </Link>

              {/* Staff profile summary */}
              <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-[#0B3B60] flex items-center justify-center font-bold text-xs border border-blue-300">
                  {activeRole === 'counsellor' ? 'PS' : 'RV'}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-bold text-stone-900 leading-tight">
                    {activeRole === 'counsellor' ? 'Priya Sharma' : 'Dr. Rajesh Verma'}
                  </p>
                  <p className="text-[10px] text-stone-500 capitalize leading-tight">
                    {activeRole.replace('_', ' ')} • DoSJE
                  </p>
                </div>
              </div>
        </div>
      </div>
    </header>
  );
};
