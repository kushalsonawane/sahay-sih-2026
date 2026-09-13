import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCases } from '../../hooks/useCases';
import { useInterventions } from '../../hooks/useInterventions';
import { useAlerts } from '../../hooks/useAlerts';
import { useCheckIns } from '../../hooks/useCheckIns';
import { RiskBadge } from '../../components/RiskBadge';
import { StatusBadge } from '../../components/StatusBadge';
import { DataFreshnessIndicator } from '../../components/DataFreshnessIndicator';
import { ModelTransparencyPanel } from '../../components/ModelTransparencyPanel';
import { Timeline } from '../../components/timeline/Timeline';
import { InterventionCard } from '../../components/interventions/InterventionCard';
import { mockTimelineEvents } from '../../data/mockTimeline';
import { formatDate } from '../../lib/dateUtils';
import {
  ArrowLeft,
  Shield,
  User,
  Scale,
  Calendar,
  AlertTriangle,
  Plus,
  PhoneCall,
  CheckCircle2,
  FileText,
} from 'lucide-react';

export const CaseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getCaseById, updateCaseStage, updateCaseRisk } = useCases();
  const { interventions, addIntervention, updateInterventionStatus, approveIntervention } = useInterventions();
  const { alerts } = useAlerts();
  const { getCheckInsByCaseId } = useCheckIns();

  const caseData = getCaseById(id || 'case-001') || getCaseById('case-001')!;

  const [activeTab, setActiveTab] = useState<'overview' | 'checkins' | 'interventions' | 'timeline'>('overview');
  const [showInterventionModal, setShowInterventionModal] = useState(false);

  // New intervention form state
  const [intType, setIntType] = useState('witness_protection');
  const [intPriority, setIntPriority] = useState('urgent');
  const [intReason, setIntReason] = useState('');
  const [intDept, setIntDept] = useState('Superintendent of Police (Rural) / Protection Cell');

  const caseInterventions = interventions.filter(
    (i) => i.caseId === caseData.id || i.caseRef === caseData.caseRef
  );
  const caseCheckIns = getCheckInsByCaseId(caseData.id);

  const handleCreateIntervention = (e: React.FormEvent) => {
    e.preventDefault();
    addIntervention({
      caseId: caseData.id,
      caseRef: caseData.caseRef,
      personNameMasked: caseData.personNameMasked,
      district: caseData.district,
      interventionType: intType as any,
      priority: intPriority as any,
      reason: intReason,
      assignedDept: intDept,
      dueDate: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
      approvalStatus: 'pending',
      notes: 'Initiated from Case Detail Console under Rule 12 Protocol.',
    });
    setShowInterventionModal(false);
    setIntReason('');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Back link */}
      <Link
        to="/cases"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Monitored Caseload</span>
      </Link>

      {/* Case Header Card */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold font-serif text-stone-900">
                {caseData.caseRef}
              </h1>
              <span className="px-2.5 py-0.5 rounded bg-stone-100 text-stone-800 text-xs font-semibold border border-stone-200">
                {caseData.personNameMasked}
              </span>
              <RiskBadge level={caseData.riskLevel} size="md" />
              <StatusBadge status={caseData.caseStage} size="md" />
            </div>
            <p className="text-xs text-stone-500">
              {caseData.district} District, {caseData.state} • Block: {caseData.block || 'Central'} • Case Type: <strong className="capitalize">{caseData.caseType}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowInterventionModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold shadow-xs transition"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>Order Protocol Intervention</span>
            </button>
          </div>
        </div>

        {/* Freshness & Metadata row */}
        <DataFreshnessIndicator
          hoursAgo={caseData.dataFreshnessHours}
          confidence={caseData.dataConfidence}
          channel="web"
        />
      </div>

      {/* AI Distress Index & Explainability Card */}
      <ModelTransparencyPanel
        score={caseData.distressScore}
        riskLevel={caseData.riskLevel}
        lastAssessed={formatDate(caseData.lastCheckIn)}
      />

      {/* Tabs */}
      <div className="border-b border-stone-200">
        <nav className="flex gap-4 text-xs font-semibold">
          {[
            { id: 'overview', label: 'Case Overview & Notes' },
            { id: 'checkins', label: `Check-In History (${caseCheckIns.length})` },
            { id: 'interventions', label: `Interventions (${caseInterventions.length})` },
            { id: 'timeline', label: 'Chronological Timeline' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-navy-900 text-navy-900 font-bold'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold font-serif text-stone-900 border-b border-stone-100 pb-2">
              Assigned Officers & Jurisdiction
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-stone-500 font-medium">Designated Welfare Officer:</span>
                <p className="font-bold text-stone-900 mt-0.5">
                  {caseData.assignedOfficerName || 'Dr. Rajesh Verma (SDM / DWO Lucknow)'}
                </p>
              </div>
              <div>
                <span className="text-stone-500 font-medium">Assigned Clinical Psychologist:</span>
                <p className="font-bold text-stone-900 mt-0.5">
                  {caseData.assignedCounsellorName || 'Priya Sharma (Senior Clinical Counsellor)'}
                </p>
              </div>
              <div>
                <span className="text-stone-500 font-medium">Special Court Jurisdiction:</span>
                <p className="text-stone-800 mt-0.5">
                  Special Court (SC/ST PoA Act), Sessions Division Lucknow
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold font-serif text-stone-900 border-b border-stone-100 pb-2">
              Confidential Case Case-File Notes
            </h3>
            <div className="text-xs text-stone-700 space-y-2 leading-relaxed">
              <p className="bg-stone-50 p-3 rounded-lg border border-stone-200/70">
                {caseData.notes || 'FIR registered under Section 3(1)(r)(s) SC/ST PoA Act. Ongoing investigation.'}
              </p>
              <div className="pt-1 text-[11px] text-stone-500">
                Next Action Required: <strong>{caseData.nextAction}</strong> (Due: {formatDate(caseData.nextActionDue)})
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Check-Ins */}
      {activeTab === 'checkins' && (
        <div className="space-y-4">
          {caseCheckIns.length > 0 ? (
            caseCheckIns.map((chk) => (
              <div
                key={chk.id}
                className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900 font-mono">
                      Check-In #{chk.id}
                    </span>
                    <span className="uppercase bg-stone-100 px-2 py-0.5 rounded text-[10px] font-semibold text-stone-700">
                      Via {chk.channel}
                    </span>
                    <RiskBadge level={chk.riskLevel} size="sm" />
                  </div>
                  <span className="text-stone-500">{formatDate(chk.submittedAt)}</span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs bg-stone-50 p-3.5 rounded-lg border border-stone-200/60">
                  <div>
                    <span className="text-stone-500">Emotional State:</span>
                    <p className="font-bold text-stone-900 mt-0.5">{chk.responses.feelingLabel}</p>
                  </div>
                  <div>
                    <span className="text-stone-500">Threats / Intimidation:</span>
                    <p className={`font-bold mt-0.5 ${chk.responses.intimidatedRecently ? 'text-rose-700' : 'text-emerald-700'}`}>
                      {chk.responses.intimidatedRecently ? 'Reported (Active Threat)' : 'None Reported'}
                    </p>
                  </div>
                  <div>
                    <span className="text-stone-500">Sleep Rest Quality:</span>
                    <p className="font-bold text-stone-900 mt-0.5">{chk.responses.sleepQuality} / 5 Score</p>
                  </div>
                  <div>
                    <span className="text-stone-500">Meals / Appetite:</span>
                    <p className="font-bold text-stone-900 mt-0.5">{chk.responses.appetite} / 5 Score</p>
                  </div>
                </div>

                {chk.responses.additionalNotes && (
                  <div className="text-xs text-stone-700 italic bg-white p-3 rounded border border-stone-200/50">
                    "{chk.responses.additionalNotes}"
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-xs text-stone-500 text-center py-8">No check-ins recorded yet.</p>
          )}
        </div>
      )}

      {/* Tab 3: Interventions */}
      {activeTab === 'interventions' && (
        <div className="space-y-4">
          {caseInterventions.length > 0 ? (
            caseInterventions.map((i) => (
              <InterventionCard
                key={i.id}
                intervention={i}
                onApprove={(intId) => approveIntervention(intId, 'usr-officer-01')}
                onStatusChange={updateInterventionStatus}
              />
            ))
          ) : (
            <p className="text-xs text-stone-500 text-center py-8">No interventions ordered for this case yet.</p>
          )}
        </div>
      )}

      {/* Tab 4: Timeline */}
      {activeTab === 'timeline' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
          <Timeline events={mockTimelineEvents} />
        </div>
      )}

      {/* Modal: Create Intervention */}
      {showInterventionModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-stone-200 max-w-lg w-full p-6 shadow-xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-base font-bold font-serif text-stone-900">
                Order Protocol Intervention (Rule 12)
              </h3>
              <button
                onClick={() => setShowInterventionModal(false)}
                className="text-stone-400 hover:text-stone-600 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateIntervention} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-stone-700">Intervention Type</label>
                <select
                  value={intType}
                  onChange={(e) => setIntType(e.target.value)}
                  className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900"
                >
                  <option value="witness_protection">Witness Protection (Armed Escort / Patrol)</option>
                  <option value="counselling">Trauma & Psycho-social Counselling</option>
                  <option value="safe_accommodation">Emergency Safe Accommodation / Relocation</option>
                  <option value="legal_aid">Empanelled Legal Aid Advocate Assignment</option>
                  <option value="financial_assistance">Statutory Compensation Tranche Release</option>
                  <option value="medical">Forensic / Psychiatric Hospital Care</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700">Priority</label>
                <select
                  value={intPriority}
                  onChange={(e) => setIntPriority(e.target.value)}
                  className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900"
                >
                  <option value="urgent">Urgent (Immediate within 12h)</option>
                  <option value="high">High Priority (within 24-48h)</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Routine</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700">Assigned Department / Officer</label>
                <input
                  type="text"
                  value={intDept}
                  onChange={(e) => setIntDept(e.target.value)}
                  className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700">Reason & Justification</label>
                <textarea
                  required
                  rows={3}
                  value={intReason}
                  onChange={(e) => setIntReason(e.target.value)}
                  placeholder="Specific basis for intervention order..."
                  className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowInterventionModal(false)}
                  className="px-3 py-2 text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white font-semibold rounded-lg shadow-sm"
                >
                  Submit Intervention Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
