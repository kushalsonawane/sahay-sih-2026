import React, { useState } from 'react';
import type { RiskLevel } from '@sahay/shared';
import { Info, HelpCircle, AlertTriangle, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { RiskBadge } from './RiskBadge';

interface Factor {
  name: string;
  weight: string;
  impact: 'high' | 'medium' | 'low';
  description: string;
}

interface ModelTransparencyPanelProps {
  score: number;
  riskLevel: RiskLevel;
  factors?: Factor[];
  lastAssessed?: string;
  className?: string;
}

export const ModelTransparencyPanel: React.FC<ModelTransparencyPanelProps> = ({
  score,
  riskLevel,
  factors = [
    {
      name: 'Physical Threat / Intimidation Reported',
      weight: '+35 pts',
      impact: 'high',
      description: 'Recent reported threat near residence or verbal intimidation prior to testimony.',
    },
    {
      name: 'Severe Sleep & Rest Disruption',
      weight: '+20 pts',
      impact: 'high',
      description: 'Self-reported sleep quality 1/5 (severe acute insomnia and hyperarousal).',
    },
    {
      name: 'Impending Special Court Date',
      weight: '+15 pts',
      impact: 'medium',
      description: 'Court summons scheduled within next 7 days without prior counsel preparation.',
    },
    {
      name: 'Diminished Daily Functioning',
      weight: '+14 pts',
      impact: 'medium',
      description: 'Inability to attend work/daily chores due to acute distress or fear.',
    },
  ],
  lastAssessed = '12 Sep 2026, 14:30 IST',
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white rounded-xl border border-stone-200/90 shadow-2xs overflow-hidden">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 bg-stone-50/70 border-b border-stone-200 flex items-center justify-between cursor-pointer hover:bg-stone-100/70 transition"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-navy-900 text-white flex items-center justify-center text-xs font-bold">
            AI
          </div>
          <div>
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2 font-serif">
              Algorithmic Distress Index & Explainability
              <span className="text-[11px] font-normal text-stone-500 font-sans">
                (Rule 12 Decision Support)
              </span>
            </h3>
            <p className="text-xs text-stone-500">
              Transparent risk breakdown • Assessed {lastAssessed}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <RiskBadge level={riskLevel} size="md" />
          <button className="text-stone-400 hover:text-stone-600">
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="p-4 sm:p-5 space-y-4">
          {/* Main score bar */}
          <div className="bg-stone-50 rounded-lg p-3.5 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-stone-700 tracking-wide uppercase">
                Computed Distress Indicator
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-serif text-stone-900">{score}</span>
                <span className="text-xs text-stone-500">/ 100 max scale</span>
              </div>
              <p className="text-[11px] text-stone-500">
                Deterministic clinical rubric inspired by standardized PHQ-9 & trauma safety indicators.
              </p>
            </div>

            {/* Score progress track */}
            <div className="w-full sm:w-64 space-y-1.5">
              <div className="h-2.5 bg-stone-200 rounded-full overflow-hidden flex">
                <div
                  className="bg-emerald-500 h-full transition-all duration-500"
                  style={{ width: '30%' }}
                  title="Low Risk (0-30)"
                />
                <div
                  className="bg-amber-500 h-full transition-all duration-500"
                  style={{ width: '30%' }}
                  title="Moderate (31-60)"
                />
                <div
                  className="bg-rose-600 h-full transition-all duration-500"
                  style={{ width: '40%' }}
                  title="High & Critical (61-100)"
                />
              </div>
              <div className="flex justify-between text-[10px] text-stone-500 font-medium">
                <span>0 (Calm)</span>
                <span>50 (Moderate)</span>
                <span>100 (Critical)</span>
              </div>
            </div>
          </div>

          {/* Factor Breakdown */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-stone-800 uppercase tracking-wider">
              Contributing Factors Detected
            </h4>
            <div className="grid gap-2">
              {factors.map((f, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg border border-stone-200/80 bg-stone-50/50 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-stone-800">{f.name}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 font-bold">
                        {f.weight}
                      </span>
                    </div>
                    <p className="text-stone-600 leading-relaxed">{f.description}</p>
                  </div>
                  <span className="shrink-0 text-[10px] font-medium text-stone-500 uppercase tracking-wider">
                    {f.impact} impact
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Ethical AI Safeguard Box */}
          <div className="p-3 rounded-lg bg-teal-50/80 border border-teal-200/90 text-xs text-teal-900 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-semibold text-teal-950">Human-in-the-Loop Safeguard:</span>
              <p className="text-teal-800 leading-relaxed text-[11px]">
                This indicator serves solely as decision-support for Welfare Officers and Counsellors. No punitive, coercive, or automated court decisions are made without verified human review and consent.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
