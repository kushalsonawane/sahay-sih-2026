import React, { useState, useMemo } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { AlertCard } from '../../components/alerts/AlertCard';
import { EmptyState } from '../../components/EmptyState';
import { useAlerts } from '../../hooks/useAlerts';
import { useLanguage } from '../../hooks/useLanguage';
import { AlertTriangle, Filter, CheckCircle2 } from 'lucide-react';

export const AlertsPage: React.FC = () => {
  const { alerts, acknowledgeAlert, escalateAlert, resolveAlert } = useAlerts();
  const { isHindi } = useLanguage();

  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredAlerts = useMemo(() => {
    return alerts.filter((a) => {
      if (selectedSeverity !== 'all' && a.severity !== selectedSeverity) return false;
      if (selectedStatus !== 'all' && a.status !== selectedStatus) return false;
      return true;
    });
  }, [alerts, selectedSeverity, selectedStatus]);

  const criticalCount = alerts.filter(
    (a) => (a.severity === 'critical' || a.severity === 'high') && a.status !== 'resolved'
  ).length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title={isHindi ? 'संकट एवं सुरक्षा अलर्ट कंसोल' : 'Distress & Protection Alert Console'}
        subtitle={
          isHindi
            ? 'अधिनियम के अंतर्गत त्वरित प्रतिक्रिया हेतु सक्रिय अलर्ट'
            : 'Automated distress spikes, threat reports, and SLA countdowns requiring immediate administrative or clinical intervention.'
        }
        badge={
          <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200">
            {criticalCount} Critical / Urgent
          </span>
        }
      />

      {/* Filter row */}
      <div className="bg-white rounded-xl border border-stone-200 p-3.5 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium text-stone-500">Severity:</span>
          {['all', 'critical', 'high', 'moderate', 'info'].map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSeverity(s)}
              className={`px-2.5 py-1 rounded-lg capitalize font-medium transition ${
                selectedSeverity === s
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium text-stone-500">Status:</span>
          {['all', 'new', 'acknowledged', 'escalated', 'resolved'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-2.5 py-1 rounded-lg capitalize font-medium transition ${
                selectedStatus === st
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Alert Cards list */}
      <div className="grid gap-4">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((a) => (
            <AlertCard
              key={a.id}
              alert={a}
              onAcknowledge={acknowledgeAlert}
              onEscalate={escalateAlert}
              onResolve={resolveAlert}
            />
          ))
        ) : (
          <EmptyState
            title="No alerts match your selection"
            description="Try switching severity or status filters to view historical or resolved alerts."
          />
        )}
      </div>
    </div>
  );
};
