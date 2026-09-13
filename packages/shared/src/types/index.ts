// ============================================================
// SAHAY Shared Types
// Smart India Hackathon Prototype — DEMO DATA ONLY
// ============================================================

export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';
export type TrendDirection = 'improving' | 'stable' | 'worsening' | 'unknown';
export type CaseStage =
  | 'registration'
  | 'investigation'
  | 'trial'
  | 'compensation'
  | 'rehabilitation'
  | 'witness_protection'
  | 'closed';
export type CaseType = 'victim' | 'complainant' | 'witness';
export type CheckInChannel = 'web' | 'app' | 'ivrs' | 'sms' | 'helpline' | 'in_person';
export type CheckInStatus = 'complete' | 'partial' | 'missed' | 'refused';
export type HumanReviewStatus = 'pending' | 'reviewed' | 'escalated' | 'no_action_needed';
export type AlertSeverity = 'info' | 'moderate' | 'high' | 'critical';
export type AlertStatus = 'new' | 'acknowledged' | 'assigned' | 'escalated' | 'resolved';
export type AlertType =
  | 'intimidation_reported'
  | 'distress_increase'
  | 'missed_checkins'
  | 'court_approaching'
  | 'counselling_not_scheduled'
  | 'contact_failed'
  | 'protection_needed'
  | 'general';
export type InterventionType =
  | 'counselling'
  | 'medical'
  | 'legal_aid'
  | 'witness_protection'
  | 'relocation'
  | 'financial_assistance'
  | 'rehabilitation'
  | 'safe_accommodation'
  | 'other';
export type InterventionStatus = 'pending' | 'approved' | 'in_progress' | 'completed' | 'cancelled';
export type InterventionPriority = 'low' | 'medium' | 'high' | 'urgent';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';
export type UserRole =
  | 'victim'
  | 'counsellor'
  | 'district_officer'
  | 'state_admin'
  | 'national_officer';
export type Language = 'en' | 'hi';
export type DataConfidence = 'high' | 'medium' | 'limited';

// ---- User ----
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  district?: string;
  state?: string;
  language: Language;
  createdAt: string;
  updatedAt: string;
}

// ---- Case ----
export interface Case {
  id: string;
  caseRef: string;
  personNameMasked: string;  // e.g. "A.K." or "Victim #04"
  personInitials: string;
  district: string;
  state: string;
  block?: string;
  caseStage: CaseStage;
  caseType: CaseType;
  assignedOfficerId?: string;
  assignedOfficerName?: string;
  assignedCounsellorId?: string;
  assignedCounsellorName?: string;
  riskLevel: RiskLevel;
  distressScore: number;       // 0-100, monitoring indicator
  trend: TrendDirection;
  lastCheckIn?: string;        // ISO date
  lastContact?: string;        // ISO date
  nextAction?: string;
  nextActionDue?: string;      // ISO date
  checkInCompletionRate: number; // 0-100 %
  dataConfidence: DataConfidence;
  dataFreshnessHours: number;  // hours since last check-in data
  privacyMasked: boolean;
  consentGiven: boolean;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

// ---- CheckIn ----
export interface CheckInResponse {
  feelingRating: number;         // 1-5
  feelingLabel: string;
  feelingUnsafe: boolean | null;
  intimidatedRecently: boolean | null;
  sleepQuality: number;          // 1-5
  appetite: number;              // 1-5
  ableToAttendWork: boolean | null;
  ableToAttendAppointments: boolean | null;
  supportNeeds: string[];
  additionalNotes?: string;
}

export interface CheckIn {
  id: string;
  caseId: string;
  submittedAt: string;
  channel: CheckInChannel;
  completionStatus: CheckInStatus;
  distressIndicator: number;     // 0-100 computed monitoring indicator
  riskLevel: RiskLevel;
  consentGiven: boolean;
  responses: CheckInResponse;
  humanReviewStatus: HumanReviewStatus;
  reviewerId?: string;
  reviewerName?: string;
  reviewedAt?: string;
  flaggedForEscalation: boolean;
}

// ---- Alert ----
export interface Alert {
  id: string;
  caseId: string;
  caseRef: string;
  personNameMasked: string;
  district: string;
  alertType: AlertType;
  severity: AlertSeverity;
  triggerDescription: string;
  detectedAt: string;
  ownerId?: string;
  ownerName?: string;
  recommendedAction: string;
  slaDue: string;                // ISO date
  status: AlertStatus;
  resolvedAt?: string;
  resolutionNote?: string;
  caseStage: CaseStage;
}

// ---- Intervention ----
export interface Intervention {
  id: string;
  caseId: string;
  caseRef: string;
  personNameMasked: string;
  district: string;
  interventionType: InterventionType;
  reason: string;
  priority: InterventionPriority;
  assignedDept: string;
  assignedPersonId?: string;
  assignedPersonName?: string;
  dueDate: string;
  status: InterventionStatus;
  approvalStatus: ApprovalStatus;
  approvedById?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ---- Audit Log ----
export interface AuditEvent {
  id: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  resourceType: string;
  resourceId: string;
  resourceLabel?: string;
  reason?: string;
  ipAddress: string;
  timestamp: string;
}

// ---- Appointment ----
export interface Appointment {
  id: string;
  caseId: string;
  counsellorName: string;
  scheduledAt: string;
  type: 'counselling' | 'medical' | 'legal' | 'court' | 'follow_up';
  status: 'scheduled' | 'completed' | 'missed' | 'cancelled' | 'rescheduled';
  notes?: string;
}

// ---- Timeline Event ----
export interface TimelineEvent {
  id: string;
  caseId: string;
  eventType:
    | 'registration'
    | 'check_in'
    | 'threat_report'
    | 'counselling'
    | 'court_date'
    | 'compensation'
    | 'intervention'
    | 'follow_up'
    | 'alert'
    | 'note';
  title: string;
  description: string;
  date: string;
  channel?: CheckInChannel;
  distressIndicator?: number;
  riskLevel?: RiskLevel;
  outcome?: string;
  flagged?: boolean;
}

// ---- Analytics ----
export interface DistrictStats {
  district: string;
  state: string;
  totalCases: number;
  highPriorityCases: number;
  pendingFollowUps: number;
  interventionsThisWeek: number;
  checkInCompletionRate: number;
  avgDistressScore: number;
  riskDistribution: {
    low: number;
    moderate: number;
    high: number;
    critical: number;
  };
}

export interface TrendDataPoint {
  date: string;
  avgDistress: number;
  highRiskCount: number;
  checkInsCompleted: number;
}

export interface AnalyticsSummary {
  totalMonitoredCases: number;
  highPriorityCases: number;
  pendingFollowUps: number;
  interventionsThisWeek: number;
  checkInCompletionRate: number;
  avgDistressScore: number;
  riskDistribution: {
    low: number;
    moderate: number;
    high: number;
    critical: number;
  };
  distressTrend: TrendDataPoint[];
  districtStats: DistrictStats[];
}

// ---- API Responses ----
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}
