import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';
import { MetricCard } from '../../components/MetricCard';
import { DistressTrendChart } from '../../components/charts/DistressTrendChart';
import { RiskDistributionChart } from '../../components/charts/RiskDistributionChart';
import { CaseTable } from '../../components/cases/CaseTable';
import { AlertCard } from '../../components/alerts/AlertCard';
import { useCases } from '../../hooks/useCases';
import { useAlerts } from '../../hooks/useAlerts';
import { useLanguage } from '../../hooks/useLanguage';
import { mockTrendData, mockAnalyticsSummary } from '../../data/mockAnalytics';
import {
  FolderGit2,
  AlertTriangle,
  HeartHandshake,
  Clock,
  ArrowRight,
  Download,
  Shield,
  FileCheck,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { cases } = useCases();
  const { alerts, acknowledgeAlert, escalateAlert, resolveAlert } = useAlerts();
  const { isHindi, isMarathi } = useLanguage();

  const criticalAlerts = alerts.filter(
    (a) => (a.severity === 'critical' || a.severity === 'high') && a.status !== 'resolved'
  );

  const highPriorityCases = cases.filter(
    (c) => c.riskLevel === 'critical' || c.riskLevel === 'high'
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title={(isMarathi || isHindi) ? 'जिला कल्याण एवं संकट निगरानी कंसोल' : 'District Welfare & Distress Monitoring Console'}
        subtitle={
          (isMarathi || isHindi)
            ? 'लखनऊ जिला • सामाजिक न्याय एवं अधिकारिता विभाग • एसओपी नियम 12 के अंतर्गत सक्रिय'
            : 'Operational District Console • Lucknow & Surrounding Blocks • Real-time Monitoring under Rule 12 SC/ST PoA Rules'
        }
        actions={
          <div className="flex items-center gap-2">
            <Link
              to="/reports"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition border border-stone-200"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Monthly Report</span>
            </Link>

            <Link
              to="/cases"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold shadow-xs transition"
            >
              <FolderGit2 className="w-3.5 h-3.5 text-amber-400" />
              <span>View All Monitored Cases ({cases.length})</span>
            </Link>
          </div>
        }
      />

      {/* SLA Alert Notification Banner */}
      {criticalAlerts.length > 0 && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-2xs">
          <div className="flex items-center gap-2.5 text-rose-900 font-medium">
            <div className="w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-xs shrink-0 animate-pulse">
              {criticalAlerts.length}
            </div>
            <div>
              <span className="font-bold font-serif text-sm">
                {criticalAlerts.length} Critical Protection & Distress Alerts Awaiting Action
              </span>
              <p className="text-rose-700 text-[11px] mt-0.5">
                Immediate review mandated under Rule 12(4) within the 12-hour statutory response window.
              </p>
            </div>
          </div>

          <Link
            to="/alerts"
            className="px-3.5 py-1.5 bg-rose-700 hover:bg-rose-800 text-white font-semibold rounded-lg shrink-0 transition flex items-center gap-1"
          >
            <span>Review Alerts</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      {/* KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Monitored Caseload"
          value={cases.length}
          subtitle="Active victims & witnesses"
          change="+3 this month"
          trend="up"
          trendGood={true}
          icon={<FolderGit2 className="w-4 h-4 text-navy-900" />}
        />

        <MetricCard
          title="Critical / High Risk"
          value={highPriorityCases.length}
          subtitle="Immediate monitoring tier"
          change="+1 in 48h"
          trend="up"
          trendGood={false}
          variant="urgent"
          icon={<AlertTriangle className="w-4 h-4 text-rose-600" />}
        />

        <MetricCard
          title="Active Interventions"
          value="12"
          subtitle="Protection, relief & counselling"
          change="4 pending sign-off"
          trend="neutral"
          icon={<HeartHandshake className="w-4 h-4 text-teal-700" />}
        />

        <MetricCard
          title="Check-in Compliance"
          value="88.4%"
          subtitle="Across IVRS, SMS & Web"
          change="+4.2% vs last mo"
          trend="up"
          trendGood={true}
          variant="calm"
          icon={<Clock className="w-4 h-4 text-emerald-700" />}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <DistressTrendChart data={mockTrendData} />
        </div>

        <div className="lg:col-span-5">
          <RiskDistributionChart
            distribution={mockAnalyticsSummary.riskDistribution}
          />
        </div>
      </div>

      {/* Priority Caseload Preview */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold font-serif text-stone-900">
              High-Priority Caseload Requiring Immediate Action
            </h3>
            <p className="text-xs text-stone-500">
              Cases with elevated distress index (&gt;65) or active intimidation flags.
            </p>
          </div>
          <Link
            to="/cases"
            className="text-xs font-semibold text-navy-900 hover:text-navy-700 inline-flex items-center gap-1"
          >
            <span>View All ({cases.length})</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <CaseTable cases={highPriorityCases} />
      </div>

      {/* Urgent Alerts Preview */}
      {criticalAlerts.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-stone-200/80">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-serif text-stone-900">
                Active Distress & Protection Alerts
              </h3>
              <p className="text-xs text-stone-500">
                Triggered automatically by self-reports, missed check-ins, or upcoming court dates.
              </p>
            </div>
            <Link
              to="/alerts"
              className="text-xs font-semibold text-navy-900 hover:text-navy-700 inline-flex items-center gap-1"
            >
              <span>View All Alerts ({alerts.length})</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid gap-3">
            {criticalAlerts.slice(0, 3).map((a) => (
              <AlertCard
                key={a.id}
                alert={a}
                onAcknowledge={acknowledgeAlert}
                onEscalate={escalateAlert}
                onResolve={resolveAlert}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
