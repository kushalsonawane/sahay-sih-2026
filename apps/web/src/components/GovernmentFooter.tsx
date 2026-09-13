import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { AshokaEmblem } from './NationalEmblem';
import { Shield, ExternalLink, Phone, Lock, HeartHandshake } from 'lucide-react';

export const GovernmentFooter: React.FC = () => {
  const { isHindi } = useLanguage();

  return (
    <footer className="bg-[#08233C] text-slate-300 text-xs border-t-4 border-[#F58220]">
      {/* Upper Footer: Government Scheme Links & Important Portals */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Column 1: Ministry Info */}
        <div className="space-y-3 col-span-2 md:col-span-1">
          <div className="flex items-center gap-2.5 text-white font-serif font-black text-sm">
            <AshokaEmblem className="w-8 h-10 text-amber-400 shrink-0" />
            <div>
              <div className="text-[10px] text-stone-300 uppercase">भारत सरकार</div>
              <div className="leading-tight">Ministry of Social Justice & Empowerment</div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            {isHindi
              ? 'अनुसूचित जाति एवं अनुसूचित जनजाति (अत्याचार निवारण) अधिनियम के अंतर्गत पीड़ितों, शिकायतकर्ताओं एवं गवाहों की सुरक्षा, मानसिक स्वास्थ्य एवं वैधानिक आर्थिक पुनर्वास हेतु समर्पित राष्ट्रीय डिजिटल प्रणाली।'
              : 'Dedicated sovereign digital infrastructure for mental health monitoring, Rule 12 statutory economic relief, and Section 15A witness protection under the SC/ST (PoA) Act.'}
          </p>

          <div className="pt-1 flex flex-col gap-1 text-[11px]">
            <span className="text-amber-300 font-bold">National PoA Helpline: 14566</span>
            <span className="text-slate-400">Emergency Police: 112</span>
            <span className="text-slate-400">Email: helpdesk-sahay@dosje.gov.in</span>
          </div>
        </div>

        {/* Column 2: Legal & Statutory Framework */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider font-serif border-b border-slate-700 pb-1.5">
            {isHindi ? 'कानूनी एवं वैधानिक ढांचा' : 'Statutory Framework'}
          </h3>
          <ul className="space-y-1.5 text-[11px] text-slate-300">
            <li className="hover:text-white transition cursor-pointer">
              • SC/ST (Prevention of Atrocities) Act, 1989
            </li>
            <li className="hover:text-white transition cursor-pointer">
              • PoA Rules, 1995 & Amendment Rules, 2016
            </li>
            <li className="hover:text-white transition cursor-pointer">
              • Rule 12 Statutory Relief Scales (Annexure-I)
            </li>
            <li className="hover:text-white transition cursor-pointer">
              • Section 15A Witness Protection Guidelines
            </li>
            <li className="hover:text-white transition cursor-pointer">
              • Protection of Civil Rights (PCR) Act, 1955
            </li>
            <li className="hover:text-white transition cursor-pointer">
              • Digital Personal Data Protection (DPDP) Act, 2023
            </li>
          </ul>
        </div>

        {/* Column 3: National Portals & Related Links */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider font-serif border-b border-slate-700 pb-1.5">
            {isHindi ? 'राष्ट्रीय पोर्टल एवं आयोग' : 'Important Portals'}
          </h3>
          <ul className="space-y-1.5 text-[11px] text-slate-300">
            <li>
              <a href="https://socialjustice.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                <span>DoSJE Official Website</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
            </li>
            <li>
              <a href="https://ncsc.nic.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                <span>National Commission for SCs (NCSC)</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
            </li>
            <li>
              <a href="https://india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                <span>National Portal of India (india.gov.in)</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
            </li>
            <li>
              <a href="https://mygov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                <span>MyGov India</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
            </li>
            <li>
              <a href="https://pgportal.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                <span>CPGRAMS Public Grievances</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: GIGW Policies & Compliance */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider font-serif border-b border-slate-700 pb-1.5">
            {isHindi ? 'वेबसाइट नीतियां एवं सहायता' : 'Website Policies'}
          </h3>
          <ul className="space-y-1.5 text-[11px] text-slate-300">
            <li className="hover:text-white transition cursor-pointer">• Accessibility Statement</li>
            <li className="hover:text-white transition cursor-pointer">• Privacy & Cookie Policy</li>
            <li className="hover:text-white transition cursor-pointer">• Hyperlinking Policy</li>
            <li className="hover:text-white transition cursor-pointer">• Terms & Conditions</li>
            <li className="hover:text-white transition cursor-pointer">• Right to Information (RTI)</li>
            <li className="hover:text-white transition cursor-pointer">• Web Information Manager</li>
            <li className="hover:text-white transition cursor-pointer">• Feedback & Help</li>
          </ul>
        </div>
      </div>

      {/* Official Government Logos Strip */}
      <div className="bg-[#05182a] border-t border-slate-800 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-4 text-slate-400 text-[11px] font-bold">
          <div className="flex items-center gap-2">
            <span className="text-amber-400">🇮🇳</span>
            <span>Digital India (डिजिटल भारत)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-teal-400">🏛️</span>
            <span>National Informatics Centre (NIC)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-orange-400">🕊️</span>
            <span>Swachh Bharat Abhiyan</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">🛡️</span>
            <span>STQC Certified Quality (GIGW 3.0)</span>
          </div>
        </div>
      </div>

      {/* Mandatory GIGW Copyright & Host Attribution */}
      <div className="bg-[#030e19] text-slate-400 text-[11px] py-4 px-4 sm:px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto space-y-2 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-slate-300 leading-relaxed">
              Contents of this website are owned and managed by{' '}
              <strong className="text-white">
                Department of Social Justice and Empowerment, Ministry of Social Justice and Empowerment, Government of India
              </strong>.
            </p>
            <p className="text-slate-400 text-[10px]">
              Website Designed, Developed and Hosted by{' '}
              <strong className="text-slate-200">National Informatics Centre (NIC)</strong>. Supports Google Chrome 6.0+, Firefox 2.0+, Safari 4.0+, Edge. Minimum resolution: 1024×768.
            </p>
          </div>

          <div className="shrink-0 text-center sm:text-right space-y-0.5 pt-2 sm:pt-0">
            <div className="text-[11px] text-amber-300 font-mono font-bold">
              Visitor Count: 2,49,58,164
            </div>
            <div className="text-[10px] text-slate-400">
              Last Updated: 13 September 2026
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
