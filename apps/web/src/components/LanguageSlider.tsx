import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import type { Language } from '@sahay/shared';

interface LanguageSliderProps {
  className?: string;
  compact?: boolean;
  showIcon?: boolean;
}

export const LanguageSlider: React.FC<LanguageSliderProps> = ({
  className = '',
  compact = false,
  showIcon = true,
}) => {
  const { language, setLanguage } = useLanguage();

  const options: { id: Language; label: string; shortLabel: string }[] = [
    { id: 'en', label: 'English', shortLabel: 'EN' },
    { id: 'hi', label: 'हिन्दी', shortLabel: 'हिं' },
    { id: 'mr', label: 'मराठी', shortLabel: 'मरा' },
  ];

  return (
    <div
      className={`inline-flex items-center gap-1.5 p-0.5 rounded-lg bg-slate-900/95 border border-slate-700/90 shadow-inner ${className}`}
      role="radiogroup"
      aria-label="Language selection slider"
    >
      {showIcon && (
        <Globe className="w-3.5 h-3.5 text-teal-400 ml-1.5 shrink-0 hidden xs:inline-block" />
      )}
      <div className="flex items-center gap-0.5 relative">
        {options.map((opt) => {
          const isSelected = language === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => setLanguage(opt.id)}
              className={`relative px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all duration-150 cursor-pointer ${
                isSelected
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-xs scale-[1.02]'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
              title={`Switch language to ${opt.label}`}
            >
              {compact ? opt.shortLabel : opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
