import type { Case, RiskLevel, CaseStage } from '@sahay/shared';
export declare function useCases(): {
    cases: Case[];
    loading: boolean;
    getCaseById: (id: string) => Case | undefined;
    updateCase: (id: string, updates: Partial<Case>) => void;
    updateCaseRisk: (id: string, riskLevel: RiskLevel, distressScore?: number) => void;
    updateCaseStage: (id: string, caseStage: CaseStage) => void;
    resetToDefault: () => void;
};
//# sourceMappingURL=useCases.d.ts.map