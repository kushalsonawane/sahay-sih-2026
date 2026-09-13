export const en = {
  // App
  appName: 'SAHAY',
  appSubtitle: 'A human-centred well-being monitoring system for victims, complainants, and witnesses',
  prototypeLabel: 'Smart India Hackathon Prototype',
  demoMode: 'Demo Mode',
  demoRole: 'Demo Role',
  demoNotice: 'All data shown is fictional and for demonstration purposes only.',

  // Navigation
  nav: {
    overview: 'Overview',
    cases: 'Cases',
    alerts: 'Alerts',
    interventions: 'Interventions',
    analytics: 'Analytics',
    reports: 'Reports',
    auditLog: 'Audit Log',
    settings: 'Settings',
    victimHome: 'Home',
    checkIn: 'Check-In',
    support: 'Support',
    appointments: 'Appointments',
    privacy: 'Privacy',
  },

  // Roles
  roles: {
    victim: 'Victim / Complainant',
    counsellor: 'Counsellor',
    district_officer: 'District Officer',
    state_admin: 'State Administrator',
    national_officer: 'National Monitoring Officer',
  },

  // Landing
  landing: {
    continueAsVictim: 'Continue as Victim / Complainant',
    openDashboard: 'Open Official Dashboard',
    explanation:
      'SAHAY supports early identification of distress and coordination of timely support. It does not replace professional mental-health assessment or emergency services.',
    emergencyTitle: 'If you are in immediate danger',
    emergencyText:
      'Contact local emergency services or your designated protection officer immediately.',
    emergencyNumber: 'Emergency: 112',
    privacyNotice: 'Privacy Notice',
    whatIsSahay: 'What is SAHAY?',
  },

  // Risk levels
  risk: {
    low: 'Low',
    moderate: 'Moderate',
    high: 'High',
    critical: 'Critical',
  },

  // Trend
  trend: {
    improving: 'Improving',
    stable: 'Stable',
    worsening: 'Worsening',
    unknown: 'Not enough data',
  },

  // Check-in
  checkIn: {
    title: 'Well-Being Check-In',
    step1: 'Consent',
    step2: 'How are you feeling?',
    step3: 'Safety',
    step4: 'Daily functioning',
    step5: 'Support needs',
    step6: 'Review',
    submit: 'Submit check-in',
    saveForLater: 'Save and continue later',
    back: 'Back',
    next: 'Next',
    consentTitle: 'Before we begin',
    consentText:
      'The following questions help monitor your well-being. Your responses are reviewed by authorized personnel only — not shared with others without your consent.',
    consentAgree: 'I understand and wish to continue',
    consentCallRequest: 'I prefer to speak with a person instead',
    notAlone: 'You are not alone.',
  },

  // Victim home
  victim: {
    greeting: 'Your well-being matters.',
    nextCheckIn: 'Next check-in',
    supportStatus: 'Support status',
    upcomingAppointment: 'Upcoming appointment',
    startCheckIn: 'Start well-being check-in',
    requestCall: 'Request a call',
    contactCounsellor: 'Contact counsellor',
    viewSupport: 'View support services',
    privacyStatus: 'Your data is private',
    largeText: 'Large text',
  },

  // Cases
  cases: {
    title: 'Case Monitoring',
    districtOverview: 'District Well-being Overview',
    caseId: 'Case ID',
    person: 'Person',
    district: 'District',
    stage: 'Stage',
    lastCheckIn: 'Last check-in',
    riskLevel: 'Risk level',
    trend: 'Trend',
    counsellor: 'Counsellor',
    nextAction: 'Next action',
    status: 'Status',
    viewCase: 'View case',
    noResults: 'No cases found for the selected filters.',
  },

  // Alerts
  alerts: {
    title: 'Alerts & Escalation',
    acknowledge: 'Acknowledge',
    assign: 'Assign',
    escalate: 'Escalate',
    resolve: 'Mark resolved',
    addNote: 'Add note',
    noAlerts: 'No active alerts matching the selected filters.',
    sla: 'SLA due',
    detected: 'Detected',
  },

  // Interventions
  interventions: {
    title: 'Intervention Coordination',
    create: 'Create intervention',
    approve: 'Approve',
    noInterventions: 'No interventions found.',
  },

  // Model transparency
  model: {
    title: 'Monitoring Indicator',
    disclaimer:
      'This is a decision-support indicator, not a clinical diagnosis. Human review is required before any action is taken.',
    confidence: 'Confidence',
    dataSources: 'Data sources used',
    lastEvaluated: 'Last evaluated',
    humanReview: 'Human review status',
    limitations: 'Limitations',
    limitationsList: [
      'Incomplete responses reduce reliability.',
      'This indicator does not diagnose mental illness.',
      'It should not be the sole basis for action.',
      'Human officials must verify context before acting.',
    ],
  },

  // Common
  common: {
    loading: 'Loading...',
    error: 'Something went wrong',
    retry: 'Retry',
    noData: 'No data available',
    search: 'Search',
    filter: 'Filter',
    export: 'Export',
    print: 'Print',
    cancel: 'Cancel',
    confirm: 'Confirm',
    close: 'Close',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    lastUpdated: 'Last updated',
    dataFreshness: 'Data freshness',
    permissionDenied: 'You do not have permission to view this information.',
    sensitiveInfo: 'Sensitive information. Access is logged and restricted to authorized personnel.',
    aiDisclaimer:
      'AI outputs shown here are monitoring indicators only, not diagnoses. All actions require human review.',
  },
} as const;

export type TranslationKey = typeof en;
