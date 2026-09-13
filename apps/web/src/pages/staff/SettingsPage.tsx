import React, { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { useCases } from '../../hooks/useCases';
import { useLanguage } from '../../hooks/useLanguage';
import { Settings, Shield, Bell, RotateCcw, CheckCircle2 } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { resetToDefault } = useCases();
  const { isHindi, isMarathi, isMarathi } = useLanguage();
  const [resetDone, setResetDone] = useState(false);

  const [threshold, setThreshold] = useState(70);
  const [autoEscalate, setAutoEscalate] = useState(true);
  const [smsReminders, setSmsReminders] = useState(true);

  const handleReset = () => {
    resetToDefault();
    setResetDone(true);
    setTimeout(() => setResetDone(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title={(isMarathi || isHindi) ? 'प्रणाली सेटिंग्स एवं एसओपी मानक' : 'System Configuration & SOP Protocols'}
        subtitle={
          (isMarathi || isHindi)
            ? 'निगरानी सीमाएं, स्वचालित अलर्ट नियम एवं डेमो डेटा प्रबंधन'
            : 'Operational thresholds for algorithmic distress triggers, SLA escalations, and demonstration resets.'
        }
      />

      {resetDone && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Demo dataset successfully reset to initial hackathon state.</span>
        </div>
      )}

      {/* Thresholds Card */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold font-serif text-stone-900 border-b border-stone-100 pb-2">
          Algorithmic Distress & Escalation Thresholds
        </h3>

        <div className="space-y-4 text-xs">
          <div>
            <div className="flex justify-between font-medium text-stone-700 mb-1">
              <span>High-Distress Automatic Alert Threshold:</span>
              <span className="font-bold text-navy-900">{threshold} / 100</span>
            </div>
            <input
              type="range"
              min="50"
              max="90"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full accent-navy-900 cursor-pointer"
            />
            <p className="text-[11px] text-stone-500 mt-1">
              Any self-reported score above {threshold} automatically triggers a high-priority alert to the assigned welfare officer.
            </p>
          </div>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
            <div>
              <span className="font-bold text-stone-900">Auto-Escalate Intimidation to SP Office</span>
              <p className="text-[11px] text-stone-500">
                Immediately creates a priority protection requisition when a victim flags threats.
              </p>
            </div>
            <input
              type="checkbox"
              checked={autoEscalate}
              onChange={(e) => setAutoEscalate(e.target.checked)}
              className="w-4 h-4 text-navy-900 rounded focus:ring-navy-900"
            />
          </div>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
            <div>
              <span className="font-bold text-stone-900">Automated IVRS & SMS Check-in Reminders</span>
              <p className="text-[11px] text-stone-500">
                Dispatches automated bilingual voice calls to non-smartphone participants.
              </p>
            </div>
            <input
              type="checkbox"
              checked={smsReminders}
              onChange={(e) => setSmsReminders(e.target.checked)}
              className="w-4 h-4 text-navy-900 rounded focus:ring-navy-900"
            />
          </div>
        </div>
      </div>

      {/* Demo Reset Card */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-3">
        <h3 className="text-sm font-bold font-serif text-stone-900 border-b border-stone-100 pb-2">
          Hackathon Presentation Controls
        </h3>
        <p className="text-xs text-stone-600 leading-relaxed">
          During live demonstration tests, you can reset all modified cases, new alerts, and test check-ins back to the original baseline seed data with one click.
        </p>

        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition border border-stone-300 flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Demo Data to Baseline</span>
        </button>
      </div>
    </div>
  );
};
