import type { CheckIn, CheckInResponse } from '@sahay/shared';
export declare function useCheckIns(): {
    checkIns: CheckIn[];
    submitCheckIn: (caseId: string, responses: CheckInResponse, channel?: "web" | "app") => {
        checkIn: CheckIn;
        distressScore: number;
        riskLevel: any;
        isCritical: boolean;
    };
    getCheckInsByCaseId: (caseId: string) => CheckIn[];
};
//# sourceMappingURL=useCheckIns.d.ts.map