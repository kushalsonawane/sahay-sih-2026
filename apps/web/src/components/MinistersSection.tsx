import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { AshokaEmblem } from './NationalEmblem';
import { Building2, Phone, Mail, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

export const MinistersSection: React.FC = () => {
  const { isHindi } = useLanguage();

  const dignitaries = [
    {
      name: 'Dr. Virendra Kumar',
      nameHi: 'डॉ. वीरेंद्र कुमार',
      title: 'Union Minister',
      titleHi: 'केंद्रीय मंत्री',
      portfolio: 'Ministry of Social Justice and Empowerment',
      portfolioHi: 'सामाजिक न्याय और अधिकारिता मंत्रालय',
      office: 'Room No. 202, C-Wing, Shastri Bhawan, New Delhi',
      badge: 'Cabinet Minister (कैबिनेट मंत्री)',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    {
      name: 'Shri Ramdas Athawale',
      nameHi: 'श्री रामदास आठवले',
      title: 'Minister of State',
      titleHi: 'राज्य मंत्री',
      portfolio: 'Ministry of Social Justice and Empowerment',
      portfolioHi: 'सामाजिक न्याय और अधिकारिता मंत्रालय',
      office: 'Room No. 201, C-Wing, Shastri Bhawan, New Delhi',
      badge: 'Minister of State (MoS)',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
    },
    {
      name: 'Shri B. L. Verma',
      nameHi: 'श्री बी. एल. वर्मा',
      title: 'Minister of State',
      titleHi: 'राज्य मंत्री',
      portfolio: 'Ministry of Social Justice and Empowerment',
      portfolioHi: 'सामाजिक न्याय और अधिकारिता मंत्रालय',
      office: 'Room No. 204, C-Wing, Shastri Bhawan, New Delhi',
      badge: 'Minister of State (MoS)',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
    },
    {
      name: 'Shri Amit Yadav, IAS',
      nameHi: 'श्री अमित यादव, भा.प्र.से.',
      title: 'Secretary',
      titleHi: 'सचिव',
      portfolio: 'Department of Social Justice and Empowerment',
      portfolioHi: 'सामाजिक न्याय और अधिकारिता विभाग',
      office: 'Room No. 604, A-Wing, Shastri Bhawan, New Delhi',
      badge: 'Secretary (सचिव)',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    },
  ];

  return (
    <section className="bg-[#F8F9FA] border-t border-b border-stone-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Government Directory Section Header */}
        <div className="flex items-center justify-between border-b-2 border-[#0B3B60] pb-2.5 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-6 bg-[#F58220] rounded-xs" />
            <h2 className="text-base sm:text-lg font-black font-serif text-[#0B3B60] uppercase tracking-tight">
              {isHindi ? 'मंत्रालय नेतृत्व एवं प्रमुख पदाधिकारी' : 'Ministry Leadership & Official Directory'}
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-stone-600 hidden sm:inline">
            Department of Social Justice & Empowerment • Government of India
          </span>
        </div>

        {/* Dignitaries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dignitaries.map((person, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-stone-300 p-4 shadow-2xs hover:shadow-sm transition flex flex-col justify-between space-y-3 relative overflow-hidden"
            >
              {/* Top Tiranga Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F58220] via-white to-[#138808]" />

              <div className="space-y-2 pt-1">
                {/* Official Ashoka Emblem Stamp */}
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${person.badgeColor} uppercase`}>
                    {person.badge}
                  </span>
                  <AshokaEmblem className="w-6 h-8 opacity-70" />
                </div>

                <div>
                  <h3 className="text-sm font-black text-stone-900 font-serif leading-tight">
                    {isHindi ? person.nameHi : person.name}
                  </h3>
                  <p className="text-xs font-bold text-[#0B3B60] mt-0.5">
                    {isHindi ? person.titleHi : person.title}
                  </p>
                  <p className="text-[11px] text-stone-600 leading-tight mt-0.5">
                    {isHindi ? person.portfolioHi : person.portfolio}
                  </p>
                </div>
              </div>

              {/* Office Location & Details */}
              <div className="pt-2.5 border-t border-stone-200 text-[10px] text-stone-500 space-y-1">
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3 h-3 text-[#F58220] shrink-0 mt-0.5" />
                  <span className="leading-tight">{person.office}</span>
                </div>
                <div className="flex items-center gap-1.5 text-stone-600 font-medium">
                  <ShieldCheck className="w-3 h-3 text-[#0D6938] shrink-0" />
                  <span>Government of India (भारत सरकार)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
