import React, { useState, useMemo } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { InterventionCard } from '../../components/interventions/InterventionCard';
import { EmptyState } from '../../components/EmptyState';
import { useInterventions } from '../../hooks/useInterventions';
import { useLanguage } from '../../hooks/useLanguage';
import { HeartHandshake, Filter, Plus, Check } from 'lucide-react';

export const InterventionsPage: React.FC = () => {
  const { interventions, updateInterventionStatus, approveIntervention } = useInterventions();
  const { isHindi, isMarathi, isMarathi } = useLanguage();

  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredInterventions = useMemo(() => {
    return interventions.filter((i) => {
      if (selectedType !== 'all' && i.interventionType !== selectedType) return false;
      if (selectedStatus !== 'all' && i.status !== selectedStatus) return false;
      return true;
    });
  }, [interventions, selectedType, selectedStatus]);

  const pendingApprovals = interventions.filter((i) => i.approvalStatus === 'pending').length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title={(isMarathi || isHindi) ? 'हस्तक्षेप, सुरक्षा एवं राहत प्रबंधन' : 'Interventions, Protection & Relief Management'}
        subtitle={
          (isMarathi || isHindi)
            ? 'गवाह सुरक्षा, परामर्श, निःशुल्क कानूनी सहायता एवं वैधानिक राहत आदेश'
            : 'Track witness protection orders, clinical counselling deployments, safe housing, and statutory relief disbursements.'
        }
        badge={
          pendingApprovals > 0 ? (
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
              {pendingApprovals} Pending DM / SDM Approval
            </span>
          ) : undefined
        }
      />

      {/* Filter Row */}
      <div className="bg-white rounded-xl border border-stone-200 p-3.5 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium text-stone-500">Type:</span>
          {['all', 'witness_protection', 'counselling', 'safe_accommodation', 'financial_assistance', 'legal_aid', 'medical'].map(
            (t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-2.5 py-1 rounded-lg capitalize font-medium transition ${
                  selectedType === t
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {t.replace('_', ' ')}
              </button>
            )
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium text-stone-500">Status:</span>
          {['all', 'pending', 'approved', 'in_progress', 'completed'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-2.5 py-1 rounded-lg capitalize font-medium transition ${
                selectedStatus === st
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="grid gap-4">
        {filteredInterventions.length > 0 ? (
          filteredInterventions.map((i) => (
            <InterventionCard
              key={i.id}
              intervention={i}
              onApprove={(id) => approveIntervention(id, 'usr-officer-01')}
              onStatusChange={updateInterventionStatus}
            />
          ))
        ) : (
          <EmptyState
            title="No interventions match your filter"
            description="Try selecting a different type or status to view other active or completed interventions."
          />
        )}
      </div>
    </div>
  );
};
