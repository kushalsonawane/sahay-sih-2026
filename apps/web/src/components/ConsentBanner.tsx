import React, { useState } from 'react';
import { Shield, Eye, Lock, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface ConsentBannerProps {
  onConsentChange?: (consent: boolean) => void;
}

export const ConsentBanner: React.FC<ConsentBannerProps> = ({ onConsentChange }) => {
  const { isHindi } = useLanguage();
  const [agreed, setAgreed] = useState(true);

  const toggle = () => {
    const next = !agreed;
    setAgreed(next);
    onConsentChange?.(next);
  };

  return (
    <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-950 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-semibold text-amber-900 font-serif">
          <Shield className="w-4 h-4 text-amber-700" />
          <span>
            {isHindi ? 'सुरक्षित एवं गोपनीय निगरानी सहमति' : 'Confidentiality & Voluntary Monitoring Consent'}
          </span>
        </div>
        <button
          onClick={toggle}
          className="text-[11px] font-semibold text-amber-800 hover:text-amber-950 underline"
        >
          {agreed ? (isHindi ? 'सहमति सक्रिय' : 'Consent Active') : (isHindi ? 'सहमति दें' : 'Enable Consent')}
        </button>
      </div>
      <p className="text-amber-900/80 leading-relaxed text-[11px]">
        {isHindi
          ? 'आपकी सुरक्षा और गोपनीयता हमारी प्राथमिकता है। इस चेक-इन के उत्तर केवल आपके नियुक्त कल्याण अधिकारी और काउंसलर को दिखाई देंगे ताकि आपको समय पर राहत मिल सके।'
          : 'Your privacy and safety are paramount. All names and identifying details are masked. Check-in responses are strictly used by assigned district officers and designated counsellors to dispatch timely support and protection.'}
      </p>
      <div className="flex flex-wrap gap-4 pt-1 text-[11px] text-amber-800 font-medium">
        <span className="flex items-center gap-1">
          <Lock className="w-3 h-3" /> 256-bit Encrypted
        </span>
        <span className="flex items-center gap-1">
          <Eye className="w-3 h-3" /> Masked Person Identifiers
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-700" /> SC/ST PoA Act Rules 2016 Compliant
        </span>
      </div>
    </div>
  );
};
