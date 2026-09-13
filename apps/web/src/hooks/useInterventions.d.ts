import type { Intervention, InterventionStatus } from '@sahay/shared';
export declare function useInterventions(): {
    interventions: Intervention[];
    updateInterventionStatus: (id: string, status: InterventionStatus) => void;
    approveIntervention: (id: string, approverId: string) => void;
    addIntervention: (newIntervention: Omit<Intervention, "id" | "createdAt" | "updatedAt">) => Intervention;
    getInterventionsByCaseId: (caseId: string) => Intervention[];
};
//# sourceMappingURL=useInterventions.d.ts.map