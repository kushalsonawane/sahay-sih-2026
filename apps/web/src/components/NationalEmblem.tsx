import React from 'react';

/**
 * Official State Emblem of India (Lion Capital of Ashoka with "सत्यमेव जयते")
 * Uses the canonical, high-resolution vector from public/emblem-of-india.svg
 */
export const AshokaEmblem: React.FC<{ className?: string; alt?: string }> = ({
  className = 'w-12 h-16',
  alt = 'State Emblem of India • सत्यमेव जयते',
}) => (
  <img
    src="/emblem-of-india.svg"
    alt={alt}
    className={`object-contain select-none ${className}`}
    loading="eager"
  />
);

/**
 * Swachh Bharat Abhiyan Logo (Clean India Mission)
 */
export const SwachhBharatLogo: React.FC<{ className?: string }> = ({ className = 'h-9' }) => (
  <div className={`inline-flex items-center gap-1.5 ${className}`} title="Swachh Bharat Abhiyan">
    <svg viewBox="0 0 120 50" className="h-full w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="35" cy="25" r="17" stroke="#138808" strokeWidth="3" fill="#FFFFFF" />
      <circle cx="85" cy="25" r="17" stroke="#138808" strokeWidth="3" fill="#FFFFFF" />
      <path d="M52 22C60 17 60 17 68 22" stroke="#138808" strokeWidth="3" strokeLinecap="round" />
      <path d="M18 24C12 20 8 15 2 12" stroke="#138808" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M102 24C108 20 112 15 118 12" stroke="#138808" strokeWidth="2.5" strokeLinecap="round" />
      <text x="35" y="29" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0B3B60" fontFamily="sans-serif">
        स्वच्छ
      </text>
      <text x="85" y="29" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0B3B60" fontFamily="sans-serif">
        भारत
      </text>
    </svg>
    <div className="hidden xl:flex flex-col text-[9px] font-bold text-stone-700 leading-tight">
      <span>एक कदम</span>
      <span className="text-[#138808]">स्वच्छता की ओर</span>
    </div>
  </div>
);

/**
 * Azadi Ka Amrit Mahotsav Badge
 */
export const AzadiMahotsavBadge: React.FC<{ className?: string }> = ({ className = 'h-9' }) => (
  <div
    className={`inline-flex items-center px-2.5 py-1 rounded bg-amber-50/90 border border-amber-300 text-amber-950 font-bold ${className}`}
    title="Azadi Ka Amrit Mahotsav"
  >
    <div className="flex flex-col text-center leading-none">
      <span className="text-[10px] text-[#F58220] font-black">आज़ादी का</span>
      <span className="text-[11px] text-[#0B3B60] font-serif font-black">अमृत महोत्सव</span>
    </div>
  </div>
);

/**
 * National Helpline 14566 Badge (Department of Social Justice & Empowerment)
 */
export const AtrocityHelplineBadge: React.FC<{ className?: string }> = ({ className = '' }) => (
  <a
    href="tel:14566"
    className={`inline-flex items-center gap-2.5 bg-[#0B3B60] hover:bg-[#082b47] text-white px-3 py-1.5 rounded-lg border border-amber-400/50 shadow-xs transition ${className}`}
    title="Call National Atrocities Helpline 14566"
  >
    <div className="w-7 h-7 rounded-full bg-[#F58220] text-slate-950 flex items-center justify-center font-black text-xs shrink-0">
      📞
    </div>
    <div className="text-left leading-tight">
      <span className="text-[9px] text-amber-300 font-bold block uppercase tracking-wider">
        National Atrocities Helpline
      </span>
      <span className="text-sm font-black tracking-wide text-white font-mono">
        14566 <span className="text-[10px] font-normal text-stone-300 font-sans">(Toll-Free 24x7)</span>
      </span>
    </div>
  </a>
);
