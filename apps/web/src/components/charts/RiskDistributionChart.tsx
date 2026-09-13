import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';

interface RiskDistributionChartProps {
  distribution: {
    low: number;
    moderate: number;
    high: number;
    critical: number;
  };
  title?: string;
  subtitle?: string;
}

export const RiskDistributionChart: React.FC<RiskDistributionChartProps> = ({
  distribution,
  title = 'Caseload by Assessed Risk Tier',
  subtitle = 'Dynamic classification based on check-in frequency, threat flags, and distress scores',
}) => {
  const data = [
    { name: 'Low Risk', count: distribution.low, color: '#0D7A5B' },
    { name: 'Moderate', count: distribution.moderate, color: '#B45309' },
    { name: 'High Risk', count: distribution.high, color: '#EA580C' },
    { name: 'Critical', count: distribution.critical, color: '#DC2626' },
  ];

  const total = distribution.low + distribution.moderate + distribution.high + distribution.critical;

  return (
    <div className="bg-white rounded-xl border border-stone-200/90 p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-stone-900 font-serif">{title}</h3>
          <span className="text-xs font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
            {total} Cases Monitored
          </span>
        </div>
        <p className="text-xs text-stone-500 mt-0.5">{subtitle}</p>
      </div>

      <div className="h-48 sm:h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis type="number" tick={{ fontSize: 11, fill: '#78716C' }} axisLine={false} tickLine={false} />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 11, fill: '#1C1917', fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              width={75}
            />
            <Tooltip
              formatter={(val: number) => [`${val} cases (${Math.round((val / total) * 100)}%)`, 'Count']}
              contentStyle={{
                backgroundColor: '#1C1917',
                color: '#FAFAF9',
                borderRadius: '8px',
                border: 'none',
                fontSize: '12px',
              }}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend pill row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-stone-100 text-center">
        {data.map((item) => (
          <div key={item.name} className="bg-stone-50 rounded-lg p-2 border border-stone-200/60">
            <div className="text-xs text-stone-500 font-medium">{item.name}</div>
            <div className="text-base font-bold font-serif text-stone-900 mt-0.5">
              {item.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
