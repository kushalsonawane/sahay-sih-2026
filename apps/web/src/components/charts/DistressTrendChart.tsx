import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import type { TrendDataPoint } from '@sahay/shared';

interface DistressTrendChartProps {
  data: TrendDataPoint[];
  title?: string;
  subtitle?: string;
}

export const DistressTrendChart: React.FC<DistressTrendChartProps> = ({
  data,
  title = 'Distress Index & High-Risk Case Trajectory',
  subtitle = 'Aggregate 30-day trend monitoring across all districts (scale: 0-100)',
}) => {
  return (
    <div className="bg-white rounded-xl border border-stone-200/90 p-4 sm:p-5 shadow-2xs">
      <div className="mb-4">
        <h3 className="text-sm font-bold text-stone-900 font-serif">{title}</h3>
        <p className="text-xs text-stone-500 mt-0.5">{subtitle}</p>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F0EB" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: '#78716C' }}
              axisLine={{ stroke: '#E7E5E4' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#78716C' }}
              axisLine={{ stroke: '#E7E5E4' }}
              tickLine={false}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1C1917',
                color: '#FAFAF9',
                borderRadius: '8px',
                border: 'none',
                fontSize: '12px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
              iconType="circle"
            />
            <Line
              type="monotone"
              dataKey="avgDistress"
              name="Avg Distress Index (0-100)"
              stroke="#C2410C"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#C2410C' }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="highRiskCount"
              name="High & Critical Risk Cases"
              stroke="#1B3A6B"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ r: 3, fill: '#1B3A6B' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
