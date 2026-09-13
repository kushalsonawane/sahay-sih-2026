import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import { MetricCard } from '../../components/MetricCard';
import { DistressTrendChart } from '../../components/charts/DistressTrendChart';
import { RiskDistributionChart } from '../../components/charts/RiskDistributionChart';
import { mockDistrictStats, mockTrendData, mockAnalyticsSummary } from '../../data/mockAnalytics';
import { useLanguage } from '../../hooks/useLanguage';
import { BarChart3, TrendingUp, Shield, Clock, FileCheck, Building } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const { isHindi, isMarathi } = useLanguage();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <PageHeader
        title={(isMarathi || isHindi) ? 'राष्ट्रीय एवं राज्य स्तरीय सांख्यिकी' : 'District & State Level Analytics Console'}
        subtitle={
          (isMarathi || isHindi)
            ? 'अनुसूचित जाति एवं जनजाति कल्याण निगरानी सांख्यिकी एवं अंतर-जिला तुलना'
            : 'Cross-district performance metrics, distress index trends, and statutory compliance under the SC/ST PoA Act.'
        }
      />

      {/* Aggregate KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricCard
          title="Total Monitored Cases"
          value={mockAnalyticsSummary.totalMonitoredCases}
          subtitle="Across 8 sample districts"
          change="+18 this month"
          trend="up"
          trendGood={true}
        />
        <MetricCard
          title="Avg Distress Index"
          value={`${mockAnalyticsSummary.avgDistressScore}/100`}
          subtitle="Across active cohorts"
          change="+1.4 pts"
          trend="up"
          trendGood={false}
          variant="warning"
        />
        <MetricCard
          title="Check-in Adherence"
          value={`${mockAnalyticsSummary.checkInCompletionRate}%`}
          subtitle="30-day reporting compliance"
          change="+3.1% vs Q1"
          trend="up"
          trendGood={true}
          variant="calm"
        />
        <MetricCard
          title="Protection SLA Avg"
          value="4.8 Hours"
          subtitle="Threat to escort deployment"
          change="-1.2h improvement"
          trend="down"
          trendGood={true}
        />
      </div>

      {/* Trend Charts */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <DistressTrendChart data={mockTrendData} />
        </div>
        <div className="lg:col-span-5">
          <RiskDistributionChart distribution={mockAnalyticsSummary.riskDistribution} />
        </div>
      </div>

      {/* Cross-District Comparative Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold font-serif text-stone-900">
            District-Wise Atrocity Monitoring & Distress Distribution
          </h3>
          <span className="text-xs text-stone-500">
            Updated Daily at 06:00 IST
          </span>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4">District & State</th>
                  <th className="py-3.5 px-4">Total Caseload</th>
                  <th className="py-3.5 px-4">Critical / High Risk</th>
                  <th className="py-3.5 px-4">Avg Distress Index</th>
                  <th className="py-3.5 px-4">Check-In Rate</th>
                  <th className="py-3.5 px-4">Risk Distribution Bar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200/70">
                {mockDistrictStats.map((d) => (
                  <tr key={d.district} className="hover:bg-stone-50/80 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-stone-900">{d.district}</div>
                      <div className="text-stone-500 text-[11px]">{d.state}</div>
                    </td>
                    <td className="py-3.5 px-4 font-serif font-bold text-stone-900 text-sm">
                      {d.totalCases}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-xs">
                        {d.highPriorityCases} Cases
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-serif font-bold text-stone-800">
                      {d.avgDistressScore} / 100
                    </td>
                    <td className="py-3.5 px-4 font-medium text-emerald-800">
                      {d.checkInCompletionRate}%
                    </td>
                    <td className="py-3.5 px-4 w-48">
                      <div className="h-2 bg-stone-200 rounded-full overflow-hidden flex">
                        <div
                          style={{
                            width: `${(d.riskDistribution.low / d.totalCases) * 100}%`,
                          }}
                          className="bg-emerald-600 h-full"
                          title="Low Risk"
                        />
                        <div
                          style={{
                            width: `${(d.riskDistribution.moderate / d.totalCases) * 100}%`,
                          }}
                          className="bg-amber-500 h-full"
                          title="Moderate Risk"
                        />
                        <div
                          style={{
                            width: `${
                              ((d.riskDistribution.high + d.riskDistribution.critical) /
                                d.totalCases) *
                              100
                            }%`,
                          }}
                          className="bg-rose-600 h-full"
                          title="High / Critical Risk"
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                        <span>{d.riskDistribution.low} Low</span>
                        <span>{d.riskDistribution.moderate} Mod</span>
                        <span>{d.riskDistribution.high + d.riskDistribution.critical} High</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
