import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import { useLanguage } from '../../hooks/useLanguage';
import { Shield, Lock, Eye, CheckCircle2, UserCheck, AlertCircle } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  const { isHindi, isMarathi, isMarathi } = useLanguage();

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2">
      <PageHeader
        title={(isMarathi || isHindi) ? 'गोपनीयता, सहमति एवं डेटा सुरक्षा' : 'Privacy, Consent & Data Governance'}
        subtitle={
          (isMarathi || isHindi)
            ? 'आपकी व्यक्तिगत पहचान और निगरानी डेटा की सुरक्षा की गारंटी'
            : 'How SAHAY protects citizen privacy, enforces pseudonymity, and guarantees voluntary participation under legal safeguards.'
        }
      />

      <div className="grid gap-4">
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-sm sm:text-base">
            <Lock className="w-4 h-4 text-teal-700" />
            <span>Default Identity Masking & Pseudonymity</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Your real legal name is masked across all general dashboards. System administrators and dashboard viewers only see initials (e.g. "R.K.") and case reference numbers (e.g. "UP-LKO-2026-0842"). Only your directly assigned District Welfare Officer and Counsellor can access full case contact details for emergency relief.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-sm sm:text-base">
            <Shield className="w-4 h-4 text-teal-700" />
            <span>Strict Human-in-the-Loop Safeguards</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            The AI distress prediction algorithm is solely a decision-support indicator. No automated punitive, coercive, or court actions can ever be executed based on the algorithm. Any protection deployment, safe-house transfer, or clinical consultation requires explicit verification by human officers.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-sm sm:text-base">
            <UserCheck className="w-4 h-4 text-teal-700" />
            <span>Right to Opt Out / Revoke Consent</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Participation in dynamic well-being check-ins is completely voluntary. You may pause notifications or opt out of automated prompts at any time without affecting your statutory compensation, legal aid, or court witness protection entitlements under the law.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-sm sm:text-base">
            <Eye className="w-4 h-4 text-teal-700" />
            <span>Immutable Audit Logging</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Every single time an officer or counsellor views your case, a permanent cryptographic audit log is generated capturing their official ID, timestamp, IP address, and mandatory stated purpose. Unauthorized access is punishable under the Bharatiya Nyaya Sanhita and Service Conduct Rules.
          </p>
        </div>
      </div>
    </div>
  );
};
