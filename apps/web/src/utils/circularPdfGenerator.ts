import { jsPDF } from 'jspdf';

export interface OfficialCircular {
  ref: string;
  date: string;
  title: string;
  titleHi: string;
  division: string;
  type: 'Notification' | 'Circular' | 'Advisory' | 'Gazette Order';
  summary?: string;
  legalAct?: string;
  keyDirectives?: string[];
  signatory?: {
    name: string;
    designation: string;
    department: string;
  };
}

export const OFFICIAL_CIRCULARS_DATA: OfficialCircular[] = [
  {
    ref: 'DoSJE/PoA/2026-11012',
    date: '10 Sep 2026',
    title: 'Enforcement of Rule 12(4) Mandatory 7-Day Initial Relief Disbursement Schedule for Atrocity Victims across All Districts',
    titleHi: 'सभी जिलों में अत्याचार पीड़ितों हेतु नियम 12(4) के तहत 7 दिवसीय अनिवार्य प्रारंभिक राहत वितरण अनुसूची का क्रियान्वयन',
    division: 'PCR / PoA Division',
    type: 'Notification',
    legalAct: 'Scheduled Castes and Scheduled Tribes (Prevention of Atrocities) Amendment Rules, 2016 — Rule 12(4)',
    summary: 'Directing all District Magistrates, Collectors, and Special Officers to strictly adhere to the mandatory 7-working-day release of the first 25% statutory economic relief tranche to atrocity survivors upon FIR registration via direct benefit transfer (DBT).',
    keyDirectives: [
      'Immediate verification of FIR registration within 24 hours of filing by Special Officers under Rule 8.',
      'Mandatory electronic sanction of 25% first relief tranche within 7 working days, without waiting for the filing of the charge sheet.',
      'All disbursements must be routed through the SAHAY DBT Gateway and linked to PFMS with automated SMS alert to the victim.',
      'Any district showing pendency exceeding 7 days will be flagged for departmental review under Section 4 of the Act for wilful neglect of duty.',
    ],
    signatory: {
      name: 'Dr. Rajesh Kumar Meena, IAS',
      designation: 'Joint Secretary to the Government of India',
      department: 'Ministry of Social Justice and Empowerment',
    },
  },
  {
    ref: 'DoSJE/NHAPOA/2026-8941',
    date: '04 Sep 2026',
    title: 'Integration of National Atrocities Toll-Free Helpline (14566) with SAHAY Dynamic Distress Prediction & Psychological Triage Console',
    titleHi: 'राष्ट्रीय अत्याचार निवारण टोल-फ्री हेल्पलाइन (14566) का सहाय गतिशील संकट पूर्वानुमान कंसोल से एकीकरण',
    division: 'Scheduled Caste Welfare',
    type: 'Circular',
    legalAct: 'Section 15B of the SC/ST (PoA) Act & National Helpline for Atrocity Prevention (NHAPOA) Directives',
    summary: 'Standard operating circular for linking telephonic distress calls received on National Helpline 14566 with SAHAY dynamic distress trajectory algorithms for real-time psycho-social triage and zero-delay district officer dispatch.',
    keyDirectives: [
      'Automatic generation of dynamic distress trajectory card within 3 minutes of helpline distress call intake.',
      'Tier-1 immediate routing to District Welfare Officer (DWO) and Sub-Divisional Police Officer (SDPO) for high-threat calls.',
      'Deployment of certified mental health counselor for secondary psychological trauma assessment within 24 hours.',
      'Integration of telephonic voice analytics for urgency detection with strict anonymization of caller identity.',
    ],
    signatory: {
      name: 'Smt. Anjali Srivastava, ISS',
      designation: 'Director (PCR & Helpline Operations)',
      department: 'Ministry of Social Justice and Empowerment',
    },
  },
  {
    ref: 'MHA-DoSJE/Sec15A/2026-441',
    date: '28 Aug 2026',
    title: 'Standard Operating Procedure (SOP) for Automated Armed Escort and Identity Concealment under Section 15A Witness Protection Scheme',
    titleHi: 'धारा 15A गवाह सुरक्षा योजना के अंतर्गत सशस्त्र सुरक्षा एवं पहचान छिपाने हेतु मानक संचालन प्रक्रिया (एसओपी)',
    division: 'Social Defence & Legal',
    type: 'Advisory',
    legalAct: 'Section 15A (Rights of Victims and Witnesses) of the SC/ST (PoA) Act, 1989 (as amended 2015)',
    summary: 'Comprehensive advisory and Standard Operating Procedure issued jointly with Ministry of Home Affairs regarding threat assessment, armed protection, digital court deposition facilities, and travel relocation allowances for vulnerable atrocity witnesses.',
    keyDirectives: [
      'Automated threat score calculation triggered whenever an accused applies for bail or enters the victim’s village jurisdiction.',
      'Immediate deployment of armed police escort (minimum 1 Head Constable + 1 Constable) for witnesses with threat score >= 65.',
      'Mandatory provision of audio-video recording during evidence recording and digital screen concealment in Special Courts.',
      'Immediate disbursement of daily witness conveyance allowance (₹500/day) and safe temporary transit shelter by District Administration.',
    ],
    signatory: {
      name: 'Shri Vikramaditya Singh, IPS',
      designation: 'Inspector General & Joint Secretary (Internal Security & Social Defence)',
      department: 'Ministry of Home Affairs & Ministry of Social Justice',
    },
  },
  {
    ref: 'DoSJE/Relief/2026-7782',
    date: '15 Aug 2026',
    title: 'Revised Schedule of Relief Amounts under Annexure-I of the SC/ST (Prevention of Atrocities) Amendment Rules',
    titleHi: 'अनुसूचित जाति एवं अनुसूचित जनजाति (अत्याचार निवारण) संशोधन नियमों के अनुलग्नक-I के अंतर्गत संशोधित राहत राशि अनुसूची',
    division: 'PCR / PoA Division',
    type: 'Gazette Order',
    legalAct: 'The Gazette of India: Extraordinary, Part II—Section 3—Sub-section (i)',
    summary: 'Statutory gazette notification publishing updated compensation norms across 47 offence categories under Annexure-I of Rule 12(4), stipulating mandatory phased disbursements and non-derogable victim rehabilitation packages.',
    keyDirectives: [
      'Minimum relief scale calibrated from ₹1,00,000 for verbal humiliation/caste slurs up to ₹8,25,000 for grievous assault, arson, and heinous offences.',
      'Mandatory provision of government employment or monthly social pension (minimum ₹5,000/month with DA) in cases of death of sole breadwinner.',
      'Rebuilding of damaged houses under PM Awas Yojana on priority within 90 days of arson report.',
      'All compensation payments are non-refundable and completely independent of the final judicial verdict or court outcome.',
    ],
    signatory: {
      name: 'Sunil Kumar Barnwal, IAS',
      designation: 'Additional Secretary to the Government of India',
      department: 'Department of Social Justice and Empowerment',
    },
  },
  {
    ref: 'DoSJE/DigiGov/2026-302',
    date: '02 Aug 2026',
    title: 'Mandatory 60-Day Investigation & Charge-sheet Filing Enforcement through Special Courts (Section 14(3))',
    titleHi: 'विशेष न्यायालयों के माध्यम से 60 दिवसीय जांच एवं आरोप-पत्र दाखिल करने का अनिवार्य प्रवर्तन (धारा 14(3))',
    division: 'Special Courts & Legal Monitoring',
    type: 'Circular',
    legalAct: 'Section 14(3) of SC/ST (Prevention of Atrocities) Act, 1989',
    summary: 'Directive mandating strict compliance with the 60-day investigation completion rule by Investigating Officers (DSP rank), with automated alerts dispatched to Superintendents of Police on Day 45 and Day 55.',
    keyDirectives: [
      'Automated daily countdown tracking for every active atrocity FIR on the SAHAY Police Console.',
      'Mandatory explanation to be submitted to District Level Vigilance and Monitoring Committee for investigations exceeding 60 days.',
      'Fast-track allocation of Special Public Prosecutors with demonstrated experience under the Act.',
      'Quarterly review meetings chaired by District Magistrate under Rule 17 to review charge-sheet compliance rates.',
    ],
    signatory: {
      name: 'Dr. Rajesh Kumar Meena, IAS',
      designation: 'Joint Secretary to the Government of India',
      department: 'Ministry of Social Justice and Empowerment',
    },
  },
  {
    ref: 'GOI-ACT-33-1989/AMEND-2016',
    date: '26 Jan 2016',
    title: 'SC/ST (Prevention of Atrocities) Act, 1989 & Amendment Rules, 2016 (Statutory Bare Act Compendium)',
    titleHi: 'अनुसूचित जाति एवं अनुसूचित जनजाति (अत्याचार निवारण) अधिनियम, 1989 एवं संशोधन नियम, 2016 (विधिक संकलन)',
    division: 'Legislative & Legal Division',
    type: 'Gazette Order',
    legalAct: 'Act No. 33 of 1989 as amended by Act No. 1 of 2016 & Amendment Rules 2016',
    summary: 'Official statutory compendium containing Section 3 offence categories, Section 4 penal liabilities, Section 14 Exclusive Special Courts, Section 15A Witness Protection Charter, and Rule 12 Annexure-I Economic Relief Schedules.',
    keyDirectives: [
      'Strict application of Section 18A barring anticipatory bail without preliminary enquiry.',
      'Mandatory 60-day deadline for DSP-rank investigating officers under Section 14(3).',
      'Unconditional 7-working-day release of 25% first relief tranche under Rule 12(4).',
      'Statutory armed escort and identity concealment for vulnerable witnesses under Section 15A.',
    ],
    signatory: {
      name: 'Dr. Reena Saha, Joint Secretary (Legal)',
      designation: 'Joint Secretary & Legal Counsel',
      department: 'Ministry of Social Justice and Empowerment',
    },
  },
];

/**
 * Generates and triggers download of an authentic Government of India official document PDF.
 */
export function generateCircularPdf(circular: OfficialCircular): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 20;
  const contentWidth = pageWidth - marginX * 2; // 170 mm

  // Helper to draw header
  const drawOfficialHeader = (pageNum: number, totalPages: number) => {
    // Top Indian Sovereign Tricolor Bar (Saffron, White, Green)
    doc.setFillColor(245, 130, 32); // Saffron #F58220
    doc.rect(0, 0, pageWidth, 2.5, 'F');
    doc.setFillColor(255, 255, 255); // White
    doc.rect(0, 2.5, pageWidth, 1.5, 'F');
    doc.setFillColor(19, 136, 8); // Green #138808
    doc.rect(0, 4, pageWidth, 2.5, 'F');

    // Official GoI Crest Emblem Representation
    doc.setFillColor(11, 59, 96); // #0B3B60 Deep Sovereign Blue
    doc.circle(marginX + 6, 17, 5.5, 'F');
    doc.setFillColor(255, 255, 255);
    doc.circle(marginX + 6, 17, 4.5, 'F');
    doc.setFillColor(11, 59, 96);
    doc.circle(marginX + 6, 17, 2, 'F');

    // Bilingual Header
    doc.setFont('times', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(11, 59, 96);
    doc.text('भारत सरकार / GOVERNMENT OF INDIA', marginX + 16, 14);

    doc.setFontSize(9.5);
    doc.setTextColor(30, 41, 59);
    doc.text('सामाजिक न्याय एवं अधिकारिता मंत्रालय', marginX + 16, 18.5);
    doc.setFont('times', 'normal');
    doc.text('MINISTRY OF SOCIAL JUSTICE AND EMPOWERMENT', marginX + 16, 22.5);

    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text('Department of Social Justice and Empowerment • PCR / PoA Section', marginX + 16, 26.5);
    doc.text('Shastri Bhawan, Dr. Rajendra Prasad Road, New Delhi - 110001', marginX + 16, 30);

    // Right-aligned official document type badge
    doc.setFillColor(241, 245, 249);
    doc.setDrawColor(180, 83, 9); // Amber border
    doc.roundedRect(pageWidth - marginX - 48, 11, 48, 18, 1.5, 1.5, 'FD');
    doc.setFont('times', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(180, 83, 9);
    doc.text('OFFICIAL GAZETTE', pageWidth - marginX - 24, 16, { align: 'center' });
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(circular.type.toUpperCase(), pageWidth - marginX - 24, 21, { align: 'center' });
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text('STATUTORY DISPATCH', pageWidth - marginX - 24, 25.5, { align: 'center' });

    // Dividing rule
    doc.setDrawColor(11, 59, 96);
    doc.setLineWidth(0.6);
    doc.line(marginX, 34, pageWidth - marginX, 34);
    doc.setDrawColor(180, 83, 9);
    doc.setLineWidth(0.2);
    doc.line(marginX, 35, pageWidth - marginX, 35);

    // Footer
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.3);
    doc.line(marginX, pageHeight - 14, pageWidth - marginX, pageHeight - 14);

    doc.setFont('times', 'italic');
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text('SAHAY National Portal • SC/ST (PoA) Statutory Monitoring Repository • www.socialjustice.gov.in', marginX, pageHeight - 9);
    doc.setFont('times', 'normal');
    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - marginX, pageHeight - 9, { align: 'right' });
  };

  let currentY = 42;

  // Metadata Row: Ref No & Date
  doc.setFont('times', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text(`F. No. ${circular.ref}`, marginX, currentY);

  doc.setFont('times', 'normal');
  doc.text(`New Delhi, dated: ${circular.date}`, pageWidth - marginX, currentY, { align: 'right' });
  currentY += 6;

  doc.setFont('times', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text(`Division: ${circular.division}`, marginX, currentY);
  currentY += 8;

  // Subject Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);

  const subjectHeader = `SUBJECT: ${circular.title.toUpperCase()}`;
  const splitSubject = doc.splitTextToSize(subjectHeader, contentWidth - 8);
  const subjectBoxHeight = splitSubject.length * 4.5 + 8;

  doc.roundedRect(marginX, currentY, contentWidth, subjectBoxHeight, 1.5, 1.5, 'FD');
  doc.setFont('times', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(11, 59, 96);
  doc.text(splitSubject, marginX + 4, currentY + 5.5);
  currentY += subjectBoxHeight + 6;

  // Hindi Title Reference
  if (circular.titleHi) {
    doc.setFont('times', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    const hiLines = doc.splitTextToSize(`संदर्भ विषय: ${circular.titleHi}`, contentWidth);
    doc.text(hiLines, marginX, currentY);
    currentY += hiLines.length * 4 + 4;
  }

  // Statutory Citation Box
  if (circular.legalAct) {
    doc.setFillColor(254, 243, 199); // Amber-100
    doc.setDrawColor(245, 158, 11);
    doc.rect(marginX, currentY, contentWidth, 8, 'FD');
    doc.setFont('times', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(146, 64, 14); // Amber-800
    doc.text(`STATUTORY AUTHORITY: ${circular.legalAct}`, marginX + 3, currentY + 5.2);
    currentY += 12;
  }

  // Opening Addressee
  doc.setFont('times', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('To,', marginX, currentY);
  currentY += 4.5;
  doc.text('1. The Chief Secretaries of all States & Administrators of all Union Territories.', marginX + 4, currentY);
  currentY += 4;
  doc.text('2. The Directors General of Police / Commissioners of Police, all States & UTs.', marginX + 4, currentY);
  currentY += 4;
  doc.text('3. All District Magistrates / Collectors / Deputy Commissioners.', marginX + 4, currentY);
  currentY += 4;
  doc.text('4. All Registrar Generals, High Courts & Designated Special Courts under SC/ST (PoA) Act.', marginX + 4, currentY);
  currentY += 8;

  // Salutation
  doc.setFont('times', 'normal');
  doc.setFontSize(9);
  doc.text('Madam / Sir,', marginX, currentY);
  currentY += 6;

  // Body Paragraph 1: Purpose & Mandate
  const p1Text = circular.summary ||
    'I am directed to convey the statutory instructions of the Central Government regarding the mandatory compliance standards under the Scheduled Castes and Scheduled Tribes (Prevention of Atrocities) Act, 1989 and Amendment Rules, 2016.';
  
  doc.setFont('times', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  const p1Lines = doc.splitTextToSize(`1. ${p1Text}`, contentWidth);
  doc.text(p1Lines, marginX, currentY);
  currentY += p1Lines.length * 4.2 + 5;

  // Directives / Operative Guidelines
  if (circular.keyDirectives && circular.keyDirectives.length > 0) {
    doc.setFont('times', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(11, 59, 96);
    doc.text('2. OPERATIVE DIRECTIVES AND TIME-BOUND ACTION MANDATES:', marginX, currentY);
    currentY += 5;

    circular.keyDirectives.forEach((directive, idx) => {
      doc.setFont('times', 'normal');
      doc.setFontSize(8.2);
      doc.setTextColor(30, 41, 59);
      const directiveLines = doc.splitTextToSize(`2.${idx + 1}  ${directive}`, contentWidth - 4);
      doc.text(directiveLines, marginX + 3, currentY);
      currentY += directiveLines.length * 4 + 2.5;
    });
    currentY += 3;
  }

  // Compliance Clause
  doc.setFont('times', 'normal');
  doc.setFontSize(8.2);
  doc.setTextColor(15, 23, 42);
  const compLines = doc.splitTextToSize(
    '3. It is reiterated that non-compliance with statutory time-limits stipulated under the Act shall invite disciplinary proceedings under Section 4 of the SC/ST (Prevention of Atrocities) Act against default officers for wilful neglect of statutory duties. All District Vigilance & Monitoring Committees (DVMC) are instructed to review compliance monthly.',
    contentWidth
  );
  doc.text(compLines, marginX, currentY);
  currentY += compLines.length * 4 + 7;

  // Signatory Block
  const signatory = circular.signatory || {
    name: 'Dr. Rajesh Kumar Meena, IAS',
    designation: 'Joint Secretary to the Government of India',
    department: 'Ministry of Social Justice and Empowerment',
  };

  const signBlockX = pageWidth - marginX - 70;
  doc.setFont('times', 'normal');
  doc.setFontSize(8.5);
  doc.text('Yours faithfully,', signBlockX, currentY);
  currentY += 6;

  // Digital Signature Seal
  doc.setFillColor(240, 253, 244); // Green-50
  doc.setDrawColor(34, 197, 94); // Green-500
  doc.roundedRect(signBlockX - 2, currentY - 1, 72, 22, 1, 1, 'FD');

  doc.setFont('times', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(22, 101, 52); // Green-800
  doc.text('[DIGITALLY SIGNED]', signBlockX + 2, currentY + 3.5);

  doc.setFont('times', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(signatory.name, signBlockX + 2, currentY + 8);

  doc.setFont('times', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(signatory.designation, signBlockX + 2, currentY + 12);
  doc.text(signatory.department, signBlockX + 2, currentY + 15.5);
  doc.setFontSize(6.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`Signed: ${circular.date} • SHA-256 Verified`, signBlockX + 2, currentY + 19);

  currentY += 28;

  // Copy Forwarded To (Pratilipi)
  doc.setFont('times', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(71, 85, 105);
  doc.text('Copy forwarded for information and necessary compliance to:', marginX, currentY);
  currentY += 4;

  doc.setFont('times', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('1. PS to Hon’ble Union Minister of Social Justice & Empowerment.', marginX + 3, currentY);
  currentY += 3.5;
  doc.text('2. PS to Hon’ble Union Minister of Home Affairs, North Block, New Delhi.', marginX + 3, currentY);
  currentY += 3.5;
  doc.text('3. Member Secretary, National Commission for Scheduled Castes (NCSC), New Delhi.', marginX + 3, currentY);
  currentY += 3.5;
  doc.text('4. National Commission for Scheduled Tribes (NCST), Lok Nayak Bhawan, New Delhi.', marginX + 3, currentY);
  currentY += 3.5;
  doc.text('5. Project Director, SAHAY Central Atrocity Monitoring Console (For automated rule enforcement).', marginX + 3, currentY);

  // Draw official header and footer on Page 1
  drawOfficialHeader(1, 1);

  // Trigger browser download
  const safeFilename = `${circular.ref.replace(/[^a-zA-Z0-9_-]/g, '_')}_Official_Notification.pdf`;
  doc.save(safeFilename);
}
