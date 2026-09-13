/**
 * SAHAY Demo Seed Script
 * Smart India Hackathon Prototype
 *
 * ALL DATA IS FICTIONAL AND ANONYMIZED.
 * No real victim names, phone numbers, addresses, or case numbers are used.
 * Data is clearly labelled as DEMO DATA throughout the application.
 *
 * Distress scoring uses a simplified rubric adapted from:
 * - PHQ-9 (Patient Health Questionnaire) — Public Domain, Pfizer Inc.
 * - ISQ (Indicators of Safety) — adapted wellness indicators
 *
 * INTEGRATION NOTE: In a production deployment, replace the mock distress
 * computation in distressScore.ts with a call to a validated clinical
 * decision-support API. All AI outputs must pass human review before action.
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// ---- Dates relative to "now" for realistic demo ----
const now = new Date();
const daysAgo = (n: number) => new Date(now.getTime() - n * 24 * 60 * 60 * 1000);
const daysFromNow = (n: number) => new Date(now.getTime() + n * 24 * 60 * 60 * 1000);

async function main() {
  console.log('🌱 Seeding SAHAY demo database...');

  // ---- Users ----
  const passwordHash = await bcrypt.hash('Demo@1234', 12);

  const [
    nationalOfficer,
    stateAdmin,
    districtOfficerUP,
    districtOfficerMH,
    counsellorA,
    counsellorB,
    victim1,
    victim2,
  ] = await Promise.all([
    prisma.user.upsert({
      where: { email: 'national@sahay.demo' },
      update: {},
      create: {
        email: 'national@sahay.demo',
        passwordHash,
        name: 'R. Krishnamurthy',
        role: 'national_officer',
        language: 'en',
      },
    }),
    prisma.user.upsert({
      where: { email: 'state.up@sahay.demo' },
      update: {},
      create: {
        email: 'state.up@sahay.demo',
        passwordHash,
        name: 'Anjali Verma',
        role: 'state_admin',
        state: 'Uttar Pradesh',
        language: 'hi',
      },
    }),
    prisma.user.upsert({
      where: { email: 'officer.lucknow@sahay.demo' },
      update: {},
      create: {
        email: 'officer.lucknow@sahay.demo',
        passwordHash,
        name: 'Sanjay Mishra',
        role: 'district_officer',
        district: 'Lucknow',
        state: 'Uttar Pradesh',
        language: 'hi',
      },
    }),
    prisma.user.upsert({
      where: { email: 'officer.pune@sahay.demo' },
      update: {},
      create: {
        email: 'officer.pune@sahay.demo',
        passwordHash,
        name: 'Priya Kulkarni',
        role: 'district_officer',
        district: 'Pune',
        state: 'Maharashtra',
        language: 'en',
      },
    }),
    prisma.user.upsert({
      where: { email: 'counsellor.a@sahay.demo' },
      update: {},
      create: {
        email: 'counsellor.a@sahay.demo',
        passwordHash,
        name: 'Dr. Meena Sharma',
        role: 'counsellor',
        district: 'Lucknow',
        state: 'Uttar Pradesh',
        language: 'hi',
      },
    }),
    prisma.user.upsert({
      where: { email: 'counsellor.b@sahay.demo' },
      update: {},
      create: {
        email: 'counsellor.b@sahay.demo',
        passwordHash,
        name: 'Dr. Rohan Desai',
        role: 'counsellor',
        district: 'Pune',
        state: 'Maharashtra',
        language: 'en',
      },
    }),
    prisma.user.upsert({
      where: { email: 'victim.demo@sahay.demo' },
      update: {},
      create: {
        email: 'victim.demo@sahay.demo',
        passwordHash,
        name: 'Demo Complainant',
        role: 'victim',
        district: 'Lucknow',
        state: 'Uttar Pradesh',
        language: 'hi',
      },
    }),
    prisma.user.upsert({
      where: { email: 'victim2.demo@sahay.demo' },
      update: {},
      create: {
        email: 'victim2.demo@sahay.demo',
        passwordHash,
        name: 'Demo Witness',
        role: 'victim',
        district: 'Jaipur',
        state: 'Rajasthan',
        language: 'en',
      },
    }),
  ]);

  console.log('✅ Users created');

  // ---- Cases (12 fictional, anonymized) ----
  const caseDefs = [
    // HIGH-PRIORITY / CRITICAL
    {
      caseRef: 'SIH-2024-LKO-001',
      personNameMasked: 'P.D. (Victim)',
      personInitials: 'PD',
      district: 'Lucknow', state: 'Uttar Pradesh', block: 'Alambagh',
      caseStage: 'trial', caseType: 'victim',
      riskLevel: 'critical', distressScore: 88, trend: 'worsening',
      assignedOfficerId: districtOfficerUP.id,
      assignedCounsellorId: counsellorA.id,
      assignedOfficerName: districtOfficerUP.name,
      assignedCounsellorName: counsellorA.name,
      lastCheckIn: daysAgo(1).toISOString(),
      lastContact: daysAgo(1).toISOString(),
      nextAction: 'Emergency counselling session and protection review',
      nextActionDue: daysFromNow(1).toISOString(),
      checkInCompletionRate: 60,
      dataConfidence: 'high',
      dataFreshnessHours: 24,
      consentGiven: true,
      notes: 'DEMO: Reported intimidation during latest check-in. Court appearance in 3 days.',
    },
    {
      caseRef: 'SIH-2024-LKO-002',
      personNameMasked: 'R.S. (Witness)',
      personInitials: 'RS',
      district: 'Lucknow', state: 'Uttar Pradesh', block: 'Gomti Nagar',
      caseStage: 'witness_protection', caseType: 'witness',
      riskLevel: 'high', distressScore: 74, trend: 'worsening',
      assignedOfficerId: districtOfficerUP.id,
      assignedCounsellorId: counsellorA.id,
      assignedOfficerName: districtOfficerUP.name,
      assignedCounsellorName: counsellorA.name,
      lastCheckIn: daysAgo(3).toISOString(),
      lastContact: daysAgo(3).toISOString(),
      nextAction: 'Witness protection review meeting',
      nextActionDue: daysFromNow(2).toISOString(),
      checkInCompletionRate: 55,
      dataConfidence: 'medium',
      dataFreshnessHours: 72,
      consentGiven: true,
      notes: 'DEMO: Missed two scheduled follow-ups. Distress increasing.',
    },
    {
      caseRef: 'SIH-2024-AGR-003',
      personNameMasked: 'M.K. (Complainant)',
      personInitials: 'MK',
      district: 'Agra', state: 'Uttar Pradesh', block: 'Taj Ganj',
      caseStage: 'investigation', caseType: 'complainant',
      riskLevel: 'high', distressScore: 71, trend: 'stable',
      assignedOfficerId: districtOfficerUP.id,
      assignedCounsellorId: counsellorA.id,
      assignedOfficerName: districtOfficerUP.name,
      assignedCounsellorName: counsellorA.name,
      lastCheckIn: daysAgo(4).toISOString(),
      lastContact: daysAgo(4).toISOString(),
      nextAction: 'Schedule medical assessment',
      nextActionDue: daysFromNow(3).toISOString(),
      checkInCompletionRate: 70,
      dataConfidence: 'medium',
      dataFreshnessHours: 96,
      consentGiven: true,
      notes: 'DEMO: Medical support requested.',
    },
    {
      caseRef: 'SIH-2024-PUN-004',
      personNameMasked: 'S.T. (Victim)',
      personInitials: 'ST',
      district: 'Pune', state: 'Maharashtra', block: 'Hadapsar',
      caseStage: 'trial', caseType: 'victim',
      riskLevel: 'critical', distressScore: 91, trend: 'worsening',
      assignedOfficerId: districtOfficerMH.id,
      assignedCounsellorId: counsellorB.id,
      assignedOfficerName: districtOfficerMH.name,
      assignedCounsellorName: counsellorB.name,
      lastCheckIn: daysAgo(0).toISOString(),
      lastContact: daysAgo(0).toISOString(),
      nextAction: 'Immediate counselling and protection officer contact',
      nextActionDue: daysFromNow(0).toISOString(),
      checkInCompletionRate: 80,
      dataConfidence: 'high',
      dataFreshnessHours: 6,
      consentGiven: true,
      notes: 'DEMO: Highest distress in current cohort. Court date tomorrow.',
    },
    {
      caseRef: 'SIH-2024-NGP-005',
      personNameMasked: 'A.B. (Witness)',
      personInitials: 'AB',
      district: 'Nagpur', state: 'Maharashtra', block: 'Sitabuldi',
      caseStage: 'trial', caseType: 'witness',
      riskLevel: 'high', distressScore: 68, trend: 'stable',
      assignedOfficerId: districtOfficerMH.id,
      assignedCounsellorId: counsellorB.id,
      assignedOfficerName: districtOfficerMH.name,
      assignedCounsellorName: counsellorB.name,
      lastCheckIn: daysAgo(5).toISOString(),
      lastContact: daysAgo(5).toISOString(),
      nextAction: 'Counselling session scheduled for next week',
      nextActionDue: daysFromNow(7).toISOString(),
      checkInCompletionRate: 65,
      dataConfidence: 'medium',
      dataFreshnessHours: 120,
      consentGiven: true,
      notes: 'DEMO: Legal aid requested.',
    },
    // MODERATE RISK
    {
      caseRef: 'SIH-2024-JAI-006',
      personNameMasked: 'K.R. (Complainant)',
      personInitials: 'KR',
      district: 'Jaipur', state: 'Rajasthan', block: 'Malviya Nagar',
      caseStage: 'compensation', caseType: 'complainant',
      riskLevel: 'moderate', distressScore: 48, trend: 'improving',
      assignedOfficerName: 'Deepak Rao',
      assignedCounsellorName: 'Dr. Sunita Jain',
      lastCheckIn: daysAgo(6).toISOString(),
      lastContact: daysAgo(6).toISOString(),
      nextAction: 'Review compensation status',
      nextActionDue: daysFromNow(10).toISOString(),
      checkInCompletionRate: 85,
      dataConfidence: 'high',
      dataFreshnessHours: 144,
      consentGiven: true,
      notes: 'DEMO: Distress decreasing. Compensation processing under way.',
    },
    {
      caseRef: 'SIH-2024-UDR-007',
      personNameMasked: 'L.V. (Victim)',
      personInitials: 'LV',
      district: 'Udaipur', state: 'Rajasthan', block: 'Fateh Sagar',
      caseStage: 'rehabilitation', caseType: 'victim',
      riskLevel: 'moderate', distressScore: 52, trend: 'stable',
      assignedOfficerName: 'Deepak Rao',
      assignedCounsellorName: 'Dr. Sunita Jain',
      lastCheckIn: daysAgo(7).toISOString(),
      lastContact: daysAgo(7).toISOString(),
      nextAction: 'Rehabilitation programme enrolment',
      nextActionDue: daysFromNow(14).toISOString(),
      checkInCompletionRate: 78,
      dataConfidence: 'high',
      dataFreshnessHours: 168,
      consentGiven: true,
      notes: 'DEMO: Rehabilitation services initiated.',
    },
    {
      caseRef: 'SIH-2024-CHN-008',
      personNameMasked: 'G.P. (Complainant)',
      personInitials: 'GP',
      district: 'Chennai', state: 'Tamil Nadu', block: 'Adyar',
      caseStage: 'investigation', caseType: 'complainant',
      riskLevel: 'moderate', distressScore: 55, trend: 'stable',
      assignedOfficerName: 'S. Ramaswamy',
      assignedCounsellorName: 'Dr. Kavitha Nair',
      lastCheckIn: daysAgo(8).toISOString(),
      lastContact: daysAgo(8).toISOString(),
      nextAction: 'Legal aid coordination',
      nextActionDue: daysFromNow(5).toISOString(),
      checkInCompletionRate: 90,
      dataConfidence: 'high',
      dataFreshnessHours: 192,
      consentGiven: true,
      notes: 'DEMO: Legal aid required.',
    },
    {
      caseRef: 'SIH-2024-KOL-009',
      personNameMasked: 'B.D. (Witness)',
      personInitials: 'BD',
      district: 'Kolkata', state: 'West Bengal', block: 'Park Street',
      caseStage: 'trial', caseType: 'witness',
      riskLevel: 'moderate', distressScore: 47, trend: 'improving',
      assignedOfficerName: 'A. Chatterjee',
      assignedCounsellorName: 'Dr. Pooja Banerjee',
      lastCheckIn: daysAgo(2).toISOString(),
      lastContact: daysAgo(2).toISOString(),
      nextAction: 'Court preparation session',
      nextActionDue: daysFromNow(8).toISOString(),
      checkInCompletionRate: 88,
      dataConfidence: 'high',
      dataFreshnessHours: 48,
      consentGiven: true,
      notes: 'DEMO: Witness distress moderating. Court preparation underway.',
    },
    // LOW RISK
    {
      caseRef: 'SIH-2024-BPL-010',
      personNameMasked: 'N.T. (Victim)',
      personInitials: 'NT',
      district: 'Bhopal', state: 'Madhya Pradesh', block: 'Shyamla Hills',
      caseStage: 'rehabilitation', caseType: 'victim',
      riskLevel: 'low', distressScore: 24, trend: 'improving',
      assignedOfficerName: 'V. Tiwari',
      assignedCounsellorName: 'Dr. Asha Gupta',
      lastCheckIn: daysAgo(10).toISOString(),
      lastContact: daysAgo(10).toISOString(),
      nextAction: 'Monthly follow-up check-in',
      nextActionDue: daysFromNow(20).toISOString(),
      checkInCompletionRate: 95,
      dataConfidence: 'high',
      dataFreshnessHours: 240,
      consentGiven: true,
      notes: 'DEMO: Rehabilitation progressing well.',
    },
    {
      caseRef: 'SIH-2024-IDR-011',
      personNameMasked: 'F.Q. (Complainant)',
      personInitials: 'FQ',
      district: 'Indore', state: 'Madhya Pradesh', block: 'Vijay Nagar',
      caseStage: 'closed', caseType: 'complainant',
      riskLevel: 'low', distressScore: 18, trend: 'improving',
      assignedOfficerName: 'V. Tiwari',
      assignedCounsellorName: 'Dr. Asha Gupta',
      lastCheckIn: daysAgo(14).toISOString(),
      lastContact: daysAgo(14).toISOString(),
      nextAction: 'Periodic welfare check in 30 days',
      nextActionDue: daysFromNow(30).toISOString(),
      checkInCompletionRate: 98,
      dataConfidence: 'high',
      dataFreshnessHours: 336,
      consentGiven: true,
      notes: 'DEMO: Case closed. Well-being stable. Follow-up monitoring continues.',
    },
    {
      caseRef: 'SIH-2024-LKO-012',
      personNameMasked: 'H.J. (Victim)',
      personInitials: 'HJ',
      district: 'Lucknow', state: 'Uttar Pradesh', block: 'Aliganj',
      caseStage: 'compensation', caseType: 'victim',
      riskLevel: 'low', distressScore: 30, trend: 'stable',
      assignedOfficerId: districtOfficerUP.id,
      assignedCounsellorId: counsellorA.id,
      assignedOfficerName: districtOfficerUP.name,
      assignedCounsellorName: counsellorA.name,
      lastCheckIn: daysAgo(5).toISOString(),
      lastContact: daysAgo(5).toISOString(),
      nextAction: 'Compensation disbursement follow-up',
      nextActionDue: daysFromNow(12).toISOString(),
      checkInCompletionRate: 92,
      dataConfidence: 'high',
      dataFreshnessHours: 120,
      consentGiven: true,
      notes: 'DEMO: Compensation processing. Stable condition.',
    },
  ];

  const cases: { id: string; caseRef: string }[] = [];
  for (const c of caseDefs) {
    const created = await prisma.case.upsert({
      where: { caseRef: c.caseRef },
      update: {},
      create: {
        caseRef: c.caseRef,
        personNameMasked: c.personNameMasked,
        personInitials: c.personInitials,
        district: c.district,
        state: c.state,
        block: c.block,
        caseStage: c.caseStage,
        caseType: c.caseType,
        assignedOfficerId: c.assignedOfficerId,
        assignedCounsellorId: c.assignedCounsellorId,
        riskLevel: c.riskLevel,
        distressScore: c.distressScore,
        trend: c.trend,
        lastCheckIn: c.lastCheckIn ? new Date(c.lastCheckIn) : undefined,
        lastContact: c.lastContact ? new Date(c.lastContact) : undefined,
        nextAction: c.nextAction,
        nextActionDue: c.nextActionDue ? new Date(c.nextActionDue) : undefined,
        checkInCompletionRate: c.checkInCompletionRate,
        dataConfidence: c.dataConfidence,
        dataFreshnessHours: c.dataFreshnessHours,
        consentGiven: c.consentGiven,
        notes: c.notes,
      },
    });
    cases.push({ id: created.id, caseRef: created.caseRef });
  }

  console.log(`✅ ${cases.length} cases created`);

  // ---- Check-Ins for case 0 (SIH-2024-LKO-001, critical) ----
  const case0 = cases[0];
  const checkInResponses = [
    {
      submittedAt: daysAgo(1),
      channel: 'web',
      completionStatus: 'complete',
      distressIndicator: 88,
      riskLevel: 'critical',
      flaggedForEscalation: true,
      responses: JSON.stringify({
        feelingRating: 1,
        feelingLabel: 'Very distressed',
        feelingUnsafe: true,
        intimidatedRecently: true,
        sleepQuality: 1,
        appetite: 2,
        ableToAttendWork: false,
        ableToAttendAppointments: false,
        supportNeeds: ['counselling', 'witness_protection', 'legal_aid'],
        additionalNotes: 'I am very scared about the court date.',
      }),
      humanReviewStatus: 'escalated',
    },
    {
      submittedAt: daysAgo(8),
      channel: 'ivrs',
      completionStatus: 'partial',
      distressIndicator: 72,
      riskLevel: 'high',
      flaggedForEscalation: false,
      responses: JSON.stringify({
        feelingRating: 2,
        feelingLabel: 'Quite distressed',
        feelingUnsafe: null,
        intimidatedRecently: null,
        sleepQuality: 2,
        appetite: 2,
        ableToAttendWork: false,
        ableToAttendAppointments: true,
        supportNeeds: ['counselling'],
        additionalNotes: '',
      }),
      humanReviewStatus: 'reviewed',
    },
    {
      submittedAt: daysAgo(15),
      channel: 'sms',
      completionStatus: 'missed',
      distressIndicator: 60,
      riskLevel: 'high',
      flaggedForEscalation: false,
      responses: JSON.stringify({}),
      humanReviewStatus: 'reviewed',
    },
  ];

  for (const ci of checkInResponses) {
    await prisma.checkIn.create({
      data: {
        caseId: case0.id,
        submittedAt: ci.submittedAt,
        channel: ci.channel,
        completionStatus: ci.completionStatus,
        distressIndicator: ci.distressIndicator,
        riskLevel: ci.riskLevel,
        consentGiven: true,
        responses: ci.responses,
        humanReviewStatus: ci.humanReviewStatus,
        flaggedForEscalation: ci.flaggedForEscalation,
        reviewerId: ci.humanReviewStatus !== 'pending' ? districtOfficerUP.id : undefined,
        reviewedAt: ci.humanReviewStatus !== 'pending' ? daysAgo(0) : undefined,
      },
    });
  }

  // ---- Alerts ----
  const alertDefs = [
    {
      caseId: case0.id,
      alertType: 'intimidation_reported',
      severity: 'critical',
      triggerDescription: 'Person reported intimidation and feeling unsafe during latest web check-in',
      detectedAt: daysAgo(1),
      ownerId: districtOfficerUP.id,
      recommendedAction: 'Immediately contact assigned protection officer and counsellor',
      slaDue: daysFromNow(0),
      status: 'acknowledged',
    },
    {
      caseId: cases[1].id,
      alertType: 'missed_checkins',
      severity: 'high',
      triggerDescription: 'No check-in response received for 3 consecutive scheduled contacts',
      detectedAt: daysAgo(3),
      ownerId: districtOfficerUP.id,
      recommendedAction: 'Attempt contact via helpline and field visit if unreachable',
      slaDue: daysFromNow(1),
      status: 'assigned',
    },
    {
      caseId: cases[3].id,
      alertType: 'distress_increase',
      severity: 'critical',
      triggerDescription: 'Distress indicator reached 91 — highest in current district cohort',
      detectedAt: daysAgo(0),
      ownerId: districtOfficerMH.id,
      recommendedAction: 'Emergency counselling session — contact assigned counsellor immediately',
      slaDue: daysFromNow(0),
      status: 'new',
    },
    {
      caseId: cases[2].id,
      alertType: 'court_approaching',
      severity: 'high',
      triggerDescription: 'Court appearance scheduled in 3 days — no recent support contact',
      detectedAt: daysAgo(2),
      ownerId: districtOfficerUP.id,
      recommendedAction: 'Arrange pre-hearing counselling and legal aid briefing',
      slaDue: daysFromNow(3),
      status: 'acknowledged',
    },
    {
      caseId: cases[4].id,
      alertType: 'counselling_not_scheduled',
      severity: 'moderate',
      triggerDescription: 'Counselling intervention approved 10 days ago — session not yet scheduled',
      detectedAt: daysAgo(5),
      ownerId: districtOfficerMH.id,
      recommendedAction: 'Schedule counselling session immediately',
      slaDue: daysFromNow(2),
      status: 'new',
    },
    {
      caseId: cases[5].id,
      alertType: 'general',
      severity: 'info',
      triggerDescription: 'Compensation disbursement overdue by 5 days',
      detectedAt: daysAgo(7),
      recommendedAction: 'Follow up with district finance officer on compensation status',
      slaDue: daysFromNow(5),
      status: 'resolved',
    },
  ];

  for (const a of alertDefs) {
    await prisma.alert.create({ data: a });
  }

  console.log('✅ Alerts created');

  // ---- Interventions ----
  const interventionDefs = [
    {
      caseId: case0.id,
      interventionType: 'witness_protection',
      reason: 'Person reported intimidation and is scheduled for court appearance',
      priority: 'urgent',
      assignedDept: 'Police — Witness Protection Cell',
      assignedPersonId: districtOfficerUP.id,
      dueDate: daysFromNow(1),
      status: 'in_progress',
      approvalStatus: 'approved',
      approvedById: districtOfficerUP.id,
      notes: 'DEMO: Protection officer assigned. Field visit scheduled for tomorrow.',
    },
    {
      caseId: case0.id,
      interventionType: 'counselling',
      reason: 'High distress score — emergency counselling required before court date',
      priority: 'urgent',
      assignedDept: 'District Mental Health Programme',
      assignedPersonId: counsellorA.id,
      dueDate: daysFromNow(1),
      status: 'pending',
      approvalStatus: 'approved',
      approvedById: districtOfficerUP.id,
      notes: 'DEMO: Counsellor to call within 24 hours.',
    },
    {
      caseId: cases[3].id,
      interventionType: 'counselling',
      reason: 'Critical distress indicator — immediate counselling required',
      priority: 'urgent',
      assignedDept: 'District Mental Health Programme',
      assignedPersonId: counsellorB.id,
      dueDate: daysFromNow(0),
      status: 'in_progress',
      approvalStatus: 'approved',
      approvedById: districtOfficerMH.id,
    },
    {
      caseId: cases[2].id,
      interventionType: 'legal_aid',
      reason: 'Legal representation required for upcoming trial stage',
      priority: 'high',
      assignedDept: 'District Legal Services Authority',
      dueDate: daysFromNow(3),
      status: 'pending',
      approvalStatus: 'pending',
    },
    {
      caseId: cases[1].id,
      interventionType: 'relocation',
      reason: 'Witness safety concern — relocation assessment initiated',
      priority: 'high',
      assignedDept: 'Social Welfare Department',
      assignedPersonId: districtOfficerUP.id,
      dueDate: daysFromNow(7),
      status: 'pending',
      approvalStatus: 'pending',
    },
    {
      caseId: cases[5].id,
      interventionType: 'financial_assistance',
      reason: 'Compensation disbursement support — complainant facing financial hardship',
      priority: 'medium',
      assignedDept: 'District Social Welfare Officer',
      dueDate: daysFromNow(10),
      status: 'in_progress',
      approvalStatus: 'approved',
      approvedById: districtOfficerUP.id,
    },
    {
      caseId: cases[6].id,
      interventionType: 'rehabilitation',
      reason: 'Rehabilitation programme enrolment required',
      priority: 'medium',
      assignedDept: 'State Rehabilitation Centre',
      dueDate: daysFromNow(14),
      status: 'pending',
      approvalStatus: 'approved',
    },
    {
      caseId: cases[7].id,
      interventionType: 'legal_aid',
      reason: 'Legal aid coordination for ongoing investigation',
      priority: 'medium',
      assignedDept: 'Tamil Nadu State Legal Services Authority',
      dueDate: daysFromNow(5),
      status: 'pending',
      approvalStatus: 'pending',
    },
  ];

  for (const i of interventionDefs) {
    await prisma.intervention.create({ data: i });
  }

  console.log('✅ Interventions created');

  // ---- Timeline Events for case 0 ----
  const timelineEvents = [
    {
      caseId: case0.id,
      eventType: 'registration',
      title: 'Case Registered',
      description: 'Complaint registered with District Social Welfare Officer',
      date: daysAgo(45),
      flagged: false,
    },
    {
      caseId: case0.id,
      eventType: 'check_in',
      title: 'Initial Well-Being Check-In',
      description: 'First well-being check-in completed via web portal',
      date: daysAgo(40),
      channel: 'web',
      distressIndicator: 55,
      riskLevel: 'moderate',
      outcome: 'Counselling referral initiated',
      flagged: false,
    },
    {
      caseId: case0.id,
      eventType: 'counselling',
      title: 'Counselling Session',
      description: 'Initial counselling session with Dr. Meena Sharma',
      date: daysAgo(35),
      outcome: 'Follow-up scheduled',
      flagged: false,
    },
    {
      caseId: case0.id,
      eventType: 'check_in',
      title: 'Well-Being Check-In',
      description: 'Check-in via IVRS — partial completion',
      date: daysAgo(15),
      channel: 'ivrs',
      distressIndicator: 60,
      riskLevel: 'high',
      outcome: 'Reviewed by officer',
      flagged: false,
    },
    {
      caseId: case0.id,
      eventType: 'court_date',
      title: 'Court Appearance — Trial Hearing',
      description: 'First trial hearing attended with legal aid support',
      date: daysAgo(10),
      outcome: 'Next hearing scheduled',
      flagged: false,
    },
    {
      caseId: case0.id,
      eventType: 'check_in',
      title: 'Well-Being Check-In',
      description: 'Check-in via IVRS — partial completion',
      date: daysAgo(8),
      channel: 'ivrs',
      distressIndicator: 72,
      riskLevel: 'high',
      outcome: 'Flag for review',
      flagged: true,
    },
    {
      caseId: case0.id,
      eventType: 'threat_report',
      title: 'Intimidation Reported',
      description: 'Person reported feeling threatened — check-in response escalated',
      date: daysAgo(1),
      distressIndicator: 88,
      riskLevel: 'critical',
      flagged: true,
    },
    {
      caseId: case0.id,
      eventType: 'intervention',
      title: 'Protection Review Initiated',
      description: 'Witness protection review initiated by district officer',
      date: daysAgo(1),
      outcome: 'Pending',
      flagged: false,
    },
    {
      caseId: case0.id,
      eventType: 'court_date',
      title: 'Upcoming Court Appearance',
      description: 'Next trial hearing — legal aid briefing required',
      date: daysFromNow(3),
      outcome: 'Pending',
      flagged: true,
    },
  ];

  for (const t of timelineEvents) {
    await prisma.timelineEvent.create({ data: t });
  }

  console.log('✅ Timeline events created');

  // ---- Appointments ----
  const apptDefs = [
    { caseId: case0.id, counsellorName: 'Dr. Meena Sharma', scheduledAt: daysFromNow(1), type: 'counselling', status: 'scheduled', notes: 'Emergency session — high distress' },
    { caseId: case0.id, counsellorName: 'Adv. R. Tripathi (Legal Aid)', scheduledAt: daysFromNow(2), type: 'legal', status: 'scheduled', notes: 'Pre-court briefing' },
    { caseId: case0.id, counsellorName: 'Dr. Meena Sharma', scheduledAt: daysAgo(35), type: 'counselling', status: 'completed', notes: 'Initial counselling session' },
    { caseId: cases[3].id, counsellorName: 'Dr. Rohan Desai', scheduledAt: daysFromNow(0), type: 'counselling', status: 'scheduled', notes: 'Emergency session' },
    { caseId: cases[5].id, counsellorName: 'Dr. Sunita Jain', scheduledAt: daysAgo(3), type: 'counselling', status: 'completed', notes: '' },
  ];

  for (const a of apptDefs) {
    await prisma.appointment.create({ data: a });
  }

  console.log('✅ Appointments created');

  // ---- Audit Logs ----
  const auditDefs = [
    { actorId: districtOfficerUP.id, actorRole: districtOfficerUP.role, action: 'VIEW_CASE', resourceType: 'Case', resourceId: case0.id, resourceLabel: case0.caseRef, reason: 'Routine monitoring review', ipAddress: '10.0.0.1' },
    { actorId: districtOfficerUP.id, actorRole: districtOfficerUP.role, action: 'ACKNOWLEDGE_ALERT', resourceType: 'Alert', resourceId: 'alert-1', resourceLabel: 'Intimidation reported — ' + case0.caseRef, reason: 'Alert acknowledged', ipAddress: '10.0.0.1' },
    { actorId: districtOfficerUP.id, actorRole: districtOfficerUP.role, action: 'CREATE_INTERVENTION', resourceType: 'Intervention', resourceId: 'int-1', resourceLabel: 'Witness protection — ' + case0.caseRef, reason: 'Urgent protection required', ipAddress: '10.0.0.1' },
    { actorId: counsellorA.id, actorRole: counsellorA.role, action: 'REVIEW_CHECKIN', resourceType: 'CheckIn', resourceId: 'ci-1', resourceLabel: 'Check-in review — ' + case0.caseRef, reason: 'High distress flagged', ipAddress: '10.0.0.2' },
    { actorId: stateAdmin.id, actorRole: stateAdmin.role, action: 'VIEW_ANALYTICS', resourceType: 'Analytics', resourceId: 'district-lucknow', resourceLabel: 'District analytics — Lucknow', reason: 'Weekly monitoring review', ipAddress: '10.0.0.3' },
    { actorId: nationalOfficer.id, actorRole: nationalOfficer.role, action: 'GENERATE_REPORT', resourceType: 'Report', resourceId: 'rpt-1', resourceLabel: 'State summary — UP — ' + now.toISOString().split('T')[0], reason: 'Ministry briefing preparation', ipAddress: '10.0.0.4' },
    { actorId: districtOfficerMH.id, actorRole: districtOfficerMH.role, action: 'VIEW_CASE', resourceType: 'Case', resourceId: cases[3].id, resourceLabel: cases[3].caseRef, reason: 'New alert — critical distress', ipAddress: '10.0.0.5' },
    { actorId: districtOfficerMH.id, actorRole: districtOfficerMH.role, action: 'APPROVE_INTERVENTION', resourceType: 'Intervention', resourceId: 'int-3', resourceLabel: 'Emergency counselling — ' + cases[3].caseRef, reason: 'Urgent — approved immediately', ipAddress: '10.0.0.5' },
  ];

  for (const a of auditDefs) {
    await prisma.auditLog.create({
      data: {
        actorId: a.actorId,
        action: a.action,
        resourceType: a.resourceType,
        resourceId: a.resourceId,
        resourceLabel: a.resourceLabel,
        reason: a.reason,
        ipAddress: a.ipAddress,
        caseId: a.resourceType === 'Case' ? a.resourceId : undefined,
      },
    });
  }

  console.log('✅ Audit logs created');
  console.log('\n🎉 Demo seed complete!');
  console.log('\n📋 Demo credentials:');
  console.log('   Victim:           victim.demo@sahay.demo / Demo@1234');
  console.log('   Counsellor:       counsellor.a@sahay.demo / Demo@1234');
  console.log('   District Officer: officer.lucknow@sahay.demo / Demo@1234');
  console.log('   State Admin:      state.up@sahay.demo / Demo@1234');
  console.log('   National Officer: national@sahay.demo / Demo@1234');
  console.log('\n⚠️  All data is fictional and for demonstration purposes only.');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
