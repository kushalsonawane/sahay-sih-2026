import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
import type { RiskLevel, CaseStage } from '@sahay/shared';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedRisk: string;
  onRiskChange: (r: string) => void;
  selectedStage?: string;
  onStageChange?: (s: string) => void;
  selectedDistrict?: string;
  onDistrictChange?: (d: string) => void;
  districts?: string[];
  onReset?: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedRisk,
  onRiskChange,
  selectedStage,
  onStageChange,
  selectedDistrict,
  onDistrictChange,
  districts = ['All Districts', 'Lucknow', 'Pune', 'Jaipur', 'Chennai', 'Bhopal', 'Udaipur', 'Agra', 'Kolkata'],
  onReset,
}) => {
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-3 sm:p-4 mb-6 shadow-2xs space-y-3">
      <div className="flex flex-col md:flex-row items-center gap-3">
        {/* Search Bar */}
        <div className="relative w-full md:flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search case ref, initials, block, or officer..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Risk Level */}
          <select
            value={selectedRisk}
            onChange={(e) => onRiskChange(e.target.value)}
            className="px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-700 focus:outline-none focus:ring-2 focus:ring-navy-800/20 font-medium"
          >
            <option value="all">All Risk Levels</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="moderate">Moderate</option>
            <option value="low">Low</option>
          </select>

          {/* Case Stage */}
          {onStageChange && (
            <select
              value={selectedStage || 'all'}
              onChange={(e) => onStageChange(e.target.value)}
              className="px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-700 focus:outline-none focus:ring-2 focus:ring-navy-800/20 font-medium"
            >
              <option value="all">All Stages</option>
              <option value="registration">Registration</option>
              <option value="investigation">Investigation</option>
              <option value="trial">Trial</option>
              <option value="compensation">Compensation</option>
              <option value="rehabilitation">Rehabilitation</option>
              <option value="witness_protection">Witness Protection</option>
              <option value="closed">Closed</option>
            </select>
          )}

          {/* District */}
          {onDistrictChange && (
            <select
              value={selectedDistrict || 'all'}
              onChange={(e) => onDistrictChange(e.target.value)}
              className="px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-700 focus:outline-none focus:ring-2 focus:ring-navy-800/20 font-medium"
            >
              {districts.map((d) => (
                <option key={d} value={d === 'All Districts' ? 'all' : d}>
                  {d}
                </option>
              ))}
            </select>
          )}

          {/* Reset button */}
          {onReset && (
            <button
              onClick={onReset}
              className="p-2 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition"
              title="Reset filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
