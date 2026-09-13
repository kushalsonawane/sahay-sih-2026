import React from 'react';
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
export declare const FilterBar: React.FC<FilterBarProps>;
export {};
//# sourceMappingURL=FilterBar.d.ts.map