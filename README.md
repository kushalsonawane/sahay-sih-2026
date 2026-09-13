# SAHAY (सहाय)
### AI-Powered Dynamic Mental Health Monitoring & Distress Prediction System for Victims of Atrocities
**Smart India Hackathon Prototype**  
**Target Ministry:** Ministry of Social Justice and Empowerment (Department of Social Justice and Empowerment)

---

## 🏛️ Project Overview

**SAHAY** is a sensitive, human-centred, public-service digital infrastructure engineered to safeguard victims, complainants, and witnesses under the **Scheduled Castes and the Scheduled Tribes (Prevention of Atrocities) Act, 1989** and the **PoA Amendment Rules, 2016**.

Unlike generic dashboards, SAHAY prioritizes:
- **Dignity & Trauma-Informed UX:** Gentle, reassuring, low-cognitive-load interfaces for rural and vulnerable citizens.
- **Explainable, Ethical AI:** Deterministic decision-support indicators derived from validated clinical rubrics (adapted from PHQ-9 & Indicators of Safety), explicitly preventing black-box autonomous coercion.
- **Statutory Alignment:** Automated compliance tracking for **Rule 12(4)** (mandatory 7-day initial relief release) and **Section 15A** (witness protection, armed escorts, and safe accommodation).
- **Multi-Channel Delivery:** Engineered for web PWA, automated IVRS voice calls, SMS responses, and frontline field worker visits.
- **Confidentiality & Cryptographic Audit Trails:** Masked identifiers by default, with immutable logging of every officer access and stated purpose.

---

## 🚀 Quick Start (Running Locally)

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### 1. Install Dependencies
```bash
npm install
```

### 2. Initialize Database & Seed Demo Data
The backend uses SQLite (`apps/api/dev.db`) via Prisma ORM for instant zero-config setup on any machine:
```bash
npm run db:setup
```
*(This automatically pushes the schema, generates the Prisma client, and seeds 12+ realistic cases, alerts, interventions, timeline events, and audit logs).*

### 3. Run Development Servers
Start both the Frontend and Backend concurrently:
```bash
npm run dev
```

- **Frontend Portal (Web & PWA):** [http://localhost:5173](http://localhost:5173)
- **Backend API Server:** [http://localhost:3001](http://localhost:3001)
- **API Health Check:** [http://localhost:3001/api/health](http://localhost:3001/api/health)

---

## 👥 Evaluator Personas & Demo Credentials

Use the persistent **SIH Role Switcher** at the top of the screen to switch personas with one click, or log in with these demo credentials:

| Persona | Name & Jurisdiction | Email | Password |
|---|---|---|---|
| **Victim / Citizen** | R.K. (Victim #01), Lucknow | `victim.demo@sahay.demo` | `Demo@1234` |
| **Clinical Counsellor** | Priya Sharma, Senior Psychologist | `counsellor.a@sahay.demo` | `Demo@1234` |
| **District Officer** | Dr. Rajesh Verma, SDM / DWO | `officer.lucknow@sahay.demo` | `Demo@1234` |
| **State Administrator** | Sunil Aggarwal, UP Social Welfare | `state.up@sahay.demo` | `Demo@1234` |
| **National Officer** | National Directorate, New Delhi | `national@sahay.demo` | `Demo@1234` |

---

## 🧭 Evaluator Walkthrough Journey

To experience the complete end-to-end integration:

1. **Victim Experience (`/victim`):**
   - Click **"Victim / Complainant"** in the top bar.
   - Notice the trauma-informed safe space, emergency helpline shortcuts (`14566` / `112`), and the **"Quick Safe Exit"** button.
   - Click **"Start Today's Well-Being Check-In"** (`/victim/check-in`).
   - Complete the 6 gentle steps. In Step 2 & 3, select that you feel unsafe or experienced recent threats.
   - Submit the check-in. The algorithmic distress score will be computed dynamically, and an immediate high-priority alert will be dispatched to the officer.

2. **District Officer Response (`/` & `/alerts`):**
   - Switch the top role to **"District Welfare Officer"**.
   - Notice the SLA banner announcing the newly triggered alert for Case `UP-LKO-2026-0842`.
   - Click **"Review Alerts"** (`/alerts`) to see the recommendation for armed police escort and safe housing.
   - Click **"Acknowledge"** or **"Escalate to SP/DM"**.

3. **Case Explainability & Intervention (`/cases/:id`):**
   - Open Case `UP-LKO-2026-0842`.
   - Expand the **"Algorithmic Distress Index & Explainability"** panel. Notice how contributing factors (threat reported, insomnia score, upcoming court trial) are transparently isolated with weights and ethical safeguards.
   - Click **"Order Protocol Intervention"** to dispatch an armed escort requisition under Rule 12.

4. **Analytics, Statutory Reports & Audit Trail:**
   - Switch to **"State Administrator"** or click **"District Analytics"** (`/analytics`) to inspect cross-district distress comparisons and risk distributions.
   - Navigate to **"Statutory Reports"** (`/reports`) and click **"Export CSV Dataset"** to download the official Rule 12 compliance return.
   - Open **"Data Access Audit"** (`/audit-log`) to verify the immutable log capturing officer ID, timestamp, client IP, and stated administrative purpose.

---

## 📂 Architecture

```
sih/
├── apps/
│   ├── web/                    # React 18, TypeScript, Vite, Tailwind CSS, Recharts
│   │   ├── src/
│   │   │   ├── components/     # Reusable public-service design system components
│   │   │   ├── hooks/          # useCases, useAlerts, useInterventions, useCheckIns, useLanguage
│   │   │   ├── pages/          # Victim portal & Administrative staff consoles
│   │   │   ├── i18n/           # Bilingual translations (English + हिंदी)
│   │   │   ├── data/           # Realistic offline-resilient seed dataset
│   │   │   └── lib/            # PHQ-9 distress scoring rubric & date utilities
│   └── api/                    # Node.js, Express, TypeScript, Prisma ORM, SQLite
│       ├── prisma/             # Schema and realistic 12-case seed generator
│       └── src/                # Auth, Cases, Check-ins, Alerts, Interventions, Reports
├── packages/
│   └── shared/                 # Shared TypeScript interfaces & types across apps
└── package.json                # npm workspaces root
```

---

## 🛡️ Key Ethical Safeguards

- **No Autonomous Coercion:** AI outputs are advisory monitoring indicators for human officers, never automated judicial verdicts.
- **Voluntary Participation:** Citizens can opt out of check-in prompts at any time without forfeiting statutory relief.
- **Confidentiality:** Identifiers are masked across dashboards; only designated officers have access to raw contact files.
- **Inclusive Accessibility:** Built-in **A+ Large Text Mode** and seamless bilingual toggle between English and Hindi (Devanagari).
