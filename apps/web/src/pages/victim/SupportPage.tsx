import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import { useLanguage } from '../../hooks/useLanguage';
import {
  Shield,
  FileText,
  PhoneCall,
  Scale,
  HeartHandshake,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';

export const SupportPage: React.FC = () => {
  const { isHindi, isMarathi, isMarathi } = useLanguage();

  const rights = [
    {
      title: (isMarathi || isHindi) ? 'वैधानिक राहत एवं मुआवजा (Annexure I)' : 'Statutory Financial Relief & Compensation',
      desc: (isMarathi || isHindi)
        ? 'नियम 12(4) के अनुसार, प्राथमिकी (FIR) दर्ज होने के 7 दिनों के भीतर 25% राहत राशि और आरोप पत्र (Charge-sheet) दाखिल होने पर अगली किश्त सीधे बैंक खाते में मिलना वैधानिक अधिकार है।'
        : 'Under Rule 12(4) of the SC/ST PoA Rules, 25% of statutory relief must be released within 7 days of FIR registration, with balance released at charge-sheet and conviction stages via direct bank transfer.',
      amount: '₹1,00,000 to ₹8,25,000 (Based on offence schedule)',
    },
    {
      title: (isMarathi || isHindi) ? 'गवाह एवं पीड़ित सुरक्षा (Section 15A)' : 'Witness Protection Scheme (Section 15A)',
      desc: (isMarathi || isHindi)
        ? 'अधिनियम की धारा 15A के अंतर्गत, किसी भी धमकी या अनुचित दबाव की स्थिति में पुलिस सुरक्षा, सुरक्षित आवास, और अदालत जाने के लिए सुरक्षित वाहन प्राप्त करने का पूर्ण कानूनी अधिकार है।'
        : 'Section 15A mandates state protection against intimidation, including armed police escort, installation of CCTV/security at residence, and emergency safe-house relocation.',
      amount: 'Full State Coverage (No Fee)',
    },
    {
      title: (isMarathi || isHindi) ? 'निःशुल्क कानूनी सहायता (DLSA)' : 'Free Empanelled Legal Aid (DLSA)',
      desc: (isMarathi || isHindi)
        ? 'जिला विधिक सेवा प्राधिकरण (DLSA) द्वारा विशेष न्यायालय में आपकी पैरवी के लिए अनुभवी वरिष्ठ अधिवक्ता निःशुल्क उपलब्ध कराया जाता है।'
        : 'Free senior legal representation via the District Legal Services Authority (DLSA) with dedicated briefing sessions before trial proceedings.',
      amount: '100% Free of Cost',
    },
    {
      title: (isMarathi || isHindi) ? 'यात्रा एवं दैनिक भत्ता (TA/DA)' : 'Travel & Daily Maintenance Allowance',
      desc: (isMarathi || isHindi)
        ? 'जांच अधिकारी या विशेष न्यायालय के समक्ष उपस्थित होने पर पीड़ित और उसके सहायक को यात्रा व्यय और दैनिक भत्ते का तत्काल भुगतान।'
        : 'Immediate reimbursement of travel expenses and daily maintenance allowance for victim and accompanying escort during investigations and trial hearings.',
      amount: 'Disbursed by Special Court / DWO',
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2">
      <PageHeader
        title={(isMarathi || isHindi) ? 'कानूनी अधिकार एवं सहायता निर्देशिका' : 'Statutory Rights & Support Directory'}
        subtitle={
          (isMarathi || isHindi)
            ? 'अनुसूचित जाति एवं अनुसूचित जनजाति (अत्याचार निवारण) अधिनियम के अंतर्गत आपके अधिकार'
            : 'Entitlements, protection mechanisms, and support channels guaranteed under the SC/ST (Prevention of Atrocities) Act & Rules.'
        }
      />

      {/* Emergency helpline banner */}
      <div className="bg-teal-900 text-white rounded-xl p-5 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-bold font-serif">
            National SC/ST PoA Helpline (Toll-Free)
          </h3>
          <p className="text-xs text-teal-200">
            Available 24 hours a day, 7 days a week in Hindi, English, and regional languages.
          </p>
        </div>
        <a
          href="tel:14566"
          className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs shrink-0 flex items-center gap-2 shadow-sm transition"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Call 14566 Now</span>
        </a>
      </div>

      {/* Rights list */}
      <div className="grid gap-4">
        {rights.map((r, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-2"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-2">
              <div className="flex items-center gap-2 font-bold text-stone-900 font-serif text-sm sm:text-base">
                <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" />
                <span>{r.title}</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[11px] font-semibold font-mono">
                {r.amount}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{r.desc}</p>
          </div>
        ))}
      </div>

      {/* Grievance redressal */}
      <div className="bg-stone-50 rounded-xl border border-stone-200 p-4 text-xs text-stone-600 space-y-1.5">
        <span className="font-bold text-stone-900">Grievance Redressal Mechanism:</span>
        <p className="leading-relaxed">
          If statutory relief is delayed beyond 7 days or witness protection is not provided following an intimidation report, a direct appeal can be filed before the District Vigilance and Monitoring Committee chaired by the District Collector / District Magistrate.
        </p>
      </div>
    </div>
  );
};
