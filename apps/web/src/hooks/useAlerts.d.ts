import type { Alert, AlertStatus } from '@sahay/shared';
export declare function useAlerts(): {
    alerts: Alert[];
    updateAlertStatus: (id: string, status: AlertStatus, resolutionNote?: string) => void;
    acknowledgeAlert: (id: string) => void;
    escalateAlert: (id: string) => void;
    resolveAlert: (id: string, note?: string) => void;
    addAlert: (newAlert: Omit<Alert, "id" | "detectedAt">) => Alert;
    getAlertsByCaseId: (caseId: string) => Alert[];
};
//# sourceMappingURL=useAlerts.d.ts.map