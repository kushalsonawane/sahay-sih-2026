import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { ConsentBanner } from '../../components/ConsentBanner';
import {
  Heart,
  HeartHandshake,
  PhoneCall,
  CalendarCheck,
  Shield,
  Clock,
  CheckCircle2,
  Lock,
  ArrowRight,
  MessageCircleHeart,
  Sparkles,
} from 'lucide-react';

export const VictimHome: React.FC = () => {
  const { isHindi } = useLanguage();

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2">
      {/* Trauma-informed gentle greeting */}
      <div className="bg-gradient-to-r from-teal-900 to-navy-950 rounded-2xl p-6 sm:p-8 text-white shadow-xs relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-800/60 text-teal-200 text-xs font-medium border border-teal-600/40">
            <Lock className="w-3 h-3" />
            <span>{isHindi ? 'सुरक्षित एवं गोपनीय पृष्ठ' : 'Confidential Citizen Space'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold font-serif leading-tight">
            {isHindi ? 'नमस्ते। हम आपके साथ हैं।' : 'You Are In A Safe Place.'}
          </h1>

          <p className="text-xs sm:text-sm text-stone-200 font-normal leading-relaxed">
            {isHindi
              ? 'यह पोर्टल आपके कल्याण, कानूनी सहायता और सुरक्षा की निगरानी के लिए बनाया गया है। यदि आप असहज महसूस कर रहे हैं, तो आप कभी भी चेक-इन कर सकते हैं या हमारे AI साथी "सहाय मित्र" से बात कर सकते हैं।'
              : 'This portal helps your assigned welfare officer and counsellor ensure you receive timely protection, counselling, and statutory relief. You can talk to Sahay Mitra or complete a short check-in anytime.'}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              to="/victim/check-in"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm shadow-sm transition"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>{isHindi ? 'आज का कल्याण चेक-इन शुरू करें' : 'Start Today\'s Well-Being Check-In'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/victim/chat"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-700 text-white font-semibold text-xs sm:text-sm border border-teal-600 transition shadow-sm"
            >
              <MessageCircleHeart className="w-4 h-4 text-amber-300" />
              <span>{isHindi ? 'सहाय मित्र से बात करें' : 'Talk to Sahay Mitra'}</span>
            </Link>

            <a
              href="tel:14566"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition"
            >
              <PhoneCall className="w-4 h-4 text-amber-300" />
              <span>{isHindi ? 'हेल्पलाइन 14566' : 'Call 14566 (Free)'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Consent & Privacy Notice */}
      <ConsentBanner />

      {/* Status & Support Cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Assigned Team */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-2">
            <Shield className="w-4 h-4 text-navy-900" />
            <h3 className="text-sm font-bold text-stone-900 font-serif">
              {isHindi ? 'आपकी नियुक्त सहायता टीम' : 'Your Assigned Support Team'}
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200/60 flex items-center justify-between">
              <div>
                <p className="font-semibold text-stone-900">Priya Sharma</p>
                <p className="text-stone-500 text-[11px]">Clinical Psychologist / Counsellor</p>
              </div>
              <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                Assigned
              </span>
            </div>

            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200/60 flex items-center justify-between">
              <div>
                <p className="font-semibold text-stone-900">Dr. Rajesh Verma</p>
                <p className="text-stone-500 text-[11px]">District Welfare Officer / SDM</p>
              </div>
              <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                District Officer
              </span>
            </div>
          </div>

          <p className="text-[11px] text-stone-500 leading-relaxed">
            {isHindi
              ? 'आपकी टीम आपकी सुरक्षा, काउंसलिंग और राहत राशि की समय पर प्राप्ति के लिए उत्तरदायी है।'
              : 'Your assigned officers receive alerts if you report distress or threats, and initiate immediate welfare actions.'}
          </p>
        </div>

        {/* Recent Monitoring Summary */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-2">
            <Clock className="w-4 h-4 text-teal-700" />
            <h3 className="text-sm font-bold text-stone-900 font-serif">
              {isHindi ? 'हालिया निगरानी स्थिति' : 'Recent Check-In Status'}
            </h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
              <span className="text-stone-600">Last Recorded Check-In</span>
              <strong className="text-stone-900">Yesterday, 14:30 IST</strong>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
              <span className="text-stone-600">Check-in Channel</span>
              <span className="font-mono bg-stone-100 px-1.5 py-0.5 rounded text-[11px]">Web Portal</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
              <span className="text-stone-600">Officer Review Status</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Reviewed
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-stone-600">Next Recommended Check-In</span>
              <span className="text-navy-900 font-semibold">Today</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/victim/check-in"
              className="block text-center py-2 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition"
            >
              Submit Check-In Now
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Link
          to="/victim/chat"
          className="p-4 bg-white rounded-xl border border-stone-200 hover:border-teal-600 shadow-2xs transition space-y-1 block group"
        >
          <div className="text-teal-800 font-semibold text-xs flex items-center gap-1.5">
            <MessageCircleHeart className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
            <span>Sahay Mitra (AI Companion)</span>
          </div>
          <p className="text-[11px] text-stone-500">
            24/7 confidential listening, emotional first aid, grounding exercises, and rights guidance.
          </p>
        </Link>

        <Link
          to="/victim/support"
          className="p-4 bg-white rounded-xl border border-stone-200 hover:border-teal-600 shadow-2xs transition space-y-1 block group"
        >
          <div className="text-teal-800 font-semibold text-xs flex items-center gap-1.5">
            <Shield className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Statutory Rights Guide</span>
          </div>
          <p className="text-[11px] text-stone-500">
            Know your compensation entitlements, witness protection rights, and free legal aid.
          </p>
        </Link>

        <Link
          to="/victim/appointments"
          className="p-4 bg-white rounded-xl border border-stone-200 hover:border-teal-600 shadow-2xs transition space-y-1 block group"
        >
          <div className="text-teal-800 font-semibold text-xs flex items-center gap-1.5">
            <CalendarCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Counsellor Sessions</span>
          </div>
          <p className="text-[11px] text-stone-500">
            View scheduled tele-counselling or in-person sessions with your psychologist.
          </p>
        </Link>

        <Link
          to="/victim/privacy"
          className="p-4 bg-white rounded-xl border border-stone-200 hover:border-teal-600 shadow-2xs transition space-y-1 block group"
        >
          <div className="text-teal-800 font-semibold text-xs flex items-center gap-1.5">
            <Lock className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Privacy & Identity Safety</span>
          </div>
          <p className="text-[11px] text-stone-500">
            Learn how your name is masked and who has authorized access to your records.
          </p>
        </Link>
      </div>
    </div>
  );
};
