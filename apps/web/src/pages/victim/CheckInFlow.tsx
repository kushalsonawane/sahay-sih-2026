import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { useCheckIns } from '../../hooks/useCheckIns';
import { useAlerts } from '../../hooks/useAlerts';
import { useCases } from '../../hooks/useCases';
import {
  Heart,
  Shield,
  AlertTriangle,
  Moon,
  Utensils,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  PhoneCall,
} from 'lucide-react';
import type { CheckInResponse } from '@sahay/shared';

export const CheckInFlow: React.FC = () => {
  const { isHindi } = useLanguage();
  const navigate = useNavigate();
  const { submitCheckIn } = useCheckIns();
  const { addAlert } = useAlerts();
  const { updateCaseRisk } = useCases();

  const [step, setStep] = useState(1);
  const [submittedResult, setSubmittedResult] = useState<{
    distressScore: number;
    riskLevel: string;
    isCritical: boolean;
  } | null>(null);

  // Form State
  const [feelingRating, setFeelingRating] = useState<number>(3);
  const [feelingUnsafe, setFeelingUnsafe] = useState<boolean | null>(null);
  const [intimidatedRecently, setIntimidatedRecently] = useState<boolean | null>(null);
  const [sleepQuality, setSleepQuality] = useState<number>(3);
  const [appetite, setAppetite] = useState<number>(3);
  const [supportNeeds, setSupportNeeds] = useState<string[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState('');

  const feelingLabels: Record<number, string> = {
    5: isHindi ? 'शांत एवं सुरक्षित (Calm & Safe)' : 'Calm & Secure',
    4: isHindi ? 'सामान्य (Managing Well)' : 'Managing Reasonably Well',
    3: isHindi ? 'थोड़ा असहज / चिंतित (Somewhat Uneasy)' : 'Somewhat Uneasy / Stressed',
    2: isHindi ? 'काफी परेशान (Very Distressed)' : 'Very Distressed / Anxious',
    1: isHindi ? 'अत्यधिक संकट / भयभीत (Overwhelmed / Fearful)' : 'Severely Overwhelmed / Fearful',
  };

  const handleSupportToggle = (item: string) => {
    setSupportNeeds((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const responses: CheckInResponse = {
      feelingRating,
      feelingLabel: feelingLabels[feelingRating],
      feelingUnsafe,
      intimidatedRecently,
      sleepQuality,
      appetite,
      ableToAttendWork: feelingRating > 2,
      ableToAttendAppointments: true,
      supportNeeds,
      additionalNotes,
    };

    const result = submitCheckIn('case-001', responses, 'web');

    // Update the victim's case risk and distress score
    updateCaseRisk('case-001', result.riskLevel, result.distressScore);

    // If critical or intimidation reported, create an immediate alert for the district officer
    if (result.isCritical || intimidatedRecently) {
      addAlert({
        caseId: 'case-001',
        caseRef: 'UP-LKO-2026-0842',
        personNameMasked: 'R.K. (Victim #01)',
        district: 'Lucknow',
        alertType: intimidatedRecently ? 'intimidation_reported' : 'distress_increase',
        severity: result.riskLevel === 'critical' ? 'critical' : 'high',
        triggerDescription: intimidatedRecently
          ? 'Victim flagged recent intimidation/threats in daily check-in portal'
          : `Distress indicator spiked to ${result.distressScore}/100 in latest check-in`,
        recommendedAction: intimidatedRecently
          ? 'Immediate police escort & witness protection order under Rule 12'
          : 'Emergency tele-counselling & home welfare check',
        slaDue: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
        status: 'new',
        caseStage: 'trial',
      });
    }

    setSubmittedResult({
      distressScore: result.distressScore,
      riskLevel: result.riskLevel,
      isCritical: result.isCritical,
    });
  };

  if (submittedResult) {
    return (
      <div className="max-w-xl mx-auto py-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center mx-auto ring-8 ring-teal-50/50">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-serif text-stone-900">
            {isHindi ? 'आपका चेक-इन सुरक्षित दर्ज कर लिया गया है' : 'Thank You. Your Check-In Is Recorded.'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-md mx-auto">
            {isHindi
              ? 'आपकी जानकारी आपके नियुक्त अधिकारी और काउंसलर तक सुरक्षित पहुंचा दी गई है।'
              : 'Your responses have been confidentially logged and shared with your assigned welfare officer and counsellor.'}
          </p>
        </div>

        {submittedResult.isCritical && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-left space-y-2">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-xs">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Priority Welfare Alert Dispatched</span>
            </div>
            <p className="text-xs text-rose-700 leading-relaxed">
              Because you indicated safety concerns or elevated distress, an automated priority alert has been notified to <strong>Dr. Rajesh Verma (District Officer)</strong> and <strong>Priya Sharma (Counsellor)</strong> for prompt follow-up.
            </p>
          </div>
        )}

        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-left text-xs">
          <div>
            <span className="text-stone-500 font-medium">Computed Well-being Indicator:</span>
            <div className="text-stone-900 font-bold font-serif text-base mt-0.5">
              {submittedResult.distressScore} / 100 ({submittedResult.riskLevel.toUpperCase()} TIER)
            </div>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-stone-500">Next Check-in:</span>
            <div className="font-semibold text-stone-800">Tomorrow</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate('/victim')}
            className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition"
          >
            Return to Safe Space
          </button>
          <a
            href="tel:14566"
            className="px-5 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-semibold text-xs transition flex items-center gap-1.5"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call Helpline 14566</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-4 space-y-6">
      {/* Step progress header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
          <span>
            {isHindi ? `चरण ${step} / 6` : `Step ${step} of 6`}
          </span>
          <span>{Math.round((step / 6) * 100)}% Complete</span>
        </div>
        <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-teal-700 transition-all duration-300"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>
      </div>

      {/* Step card */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs min-h-[360px] flex flex-col justify-between">
        {/* Step 1: Overall feeling */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
                Emotional State
              </span>
              <h2 className="text-xl font-bold font-serif text-stone-900">
                {isHindi ? 'आज आप कुल मिलाकर कैसा महसूस कर रहे हैं?' : 'How are you feeling overall today?'}
              </h2>
              <p className="text-xs text-stone-500">
                Select the option that best reflects your emotional state over the past 24 hours.
              </p>
            </div>

            <div className="space-y-2.5">
              {[5, 4, 3, 2, 1].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setFeelingRating(num)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                    feelingRating === num
                      ? 'border-teal-700 bg-teal-50/60 text-teal-950 font-bold ring-1 ring-teal-700'
                      : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <span>{feelingLabels[num]}</span>
                  <span className="text-xs font-mono font-bold text-stone-400">
                    {num}/5
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Safety feeling */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
                Personal Safety
              </span>
              <h2 className="text-xl font-bold font-serif text-stone-900">
                {isHindi
                  ? 'क्या आप वर्तमान में जहाँ रह रहे हैं, वहाँ सुरक्षित महसूस कर रहे हैं?'
                  : 'Do you feel physically safe where you are living right now?'}
              </h2>
              <p className="text-xs text-stone-500">
                Your answer is strictly confidential and used to evaluate witness protection needs.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setFeelingUnsafe(false)}
                className={`p-5 rounded-xl border text-left transition-all ${
                  feelingUnsafe === false
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-600 font-bold'
                    : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50 text-stone-800'
                }`}
              >
                <div className="text-sm font-semibold">Yes, I feel safe</div>
                <div className="text-xs text-stone-500 mt-1">
                  No immediate concern in my current environment.
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFeelingUnsafe(true)}
                className={`p-5 rounded-xl border text-left transition-all ${
                  feelingUnsafe === true
                    ? 'border-rose-600 bg-rose-50 text-rose-950 ring-1 ring-rose-600 font-bold'
                    : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50 text-stone-800'
                }`}
              >
                <div className="text-sm font-semibold text-rose-800">No, I feel unsafe / fearful</div>
                <div className="text-xs text-rose-700/80 mt-1">
                  I am worried about my safety or my family's safety.
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Threats / Intimidation */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
                Witness Protection & Threats
              </span>
              <h2 className="text-xl font-bold font-serif text-stone-900">
                {isHindi
                  ? 'क्या हाल ही में आपको किसी ने धमकाया, दबाव डाला या अनुचित संपर्क किया है?'
                  : 'Have you faced any threats, pressure, or intimidation recently?'}
              </h2>
              <p className="text-xs text-stone-500">
                Under Section 15A of the SC/ST PoA Act, intimidation of victims or witnesses is a serious cognizable offence.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIntimidatedRecently(false)}
                className={`p-5 rounded-xl border text-left transition-all ${
                  intimidatedRecently === false
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-600 font-bold'
                    : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50 text-stone-800'
                }`}
              >
                <div className="text-sm font-semibold">No Threats Reported</div>
                <div className="text-xs text-stone-500 mt-1">
                  No person has attempted to pressure or threaten me.
                </div>
              </button>

              <button
                type="button"
                onClick={() => setIntimidatedRecently(true)}
                className={`p-5 rounded-xl border text-left transition-all ${
                  intimidatedRecently === true
                    ? 'border-rose-600 bg-rose-50 text-rose-950 ring-1 ring-rose-600 font-bold'
                    : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50 text-stone-800'
                }`}
              >
                <div className="text-sm font-semibold text-rose-800">Yes, I was threatened / intimidated</div>
                <div className="text-xs text-rose-700/80 mt-1">
                  Accused party or someone on their behalf contacted or threatened me.
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Sleep & Rest */}
        {step === 4 && (
          <div className="space-y-5">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
                Physical Well-Being
              </span>
              <h2 className="text-xl font-bold font-serif text-stone-900">
                {isHindi
                  ? 'पिछले कुछ दिनों में आपकी नींद कैसी रही है?'
                  : 'How has your sleep and rest been over the past few nights?'}
              </h2>
              <p className="text-xs text-stone-500">
                Severe insomnia or nightmares are common physiological indicators of post-traumatic stress.
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                { rating: 5, label: 'Sleeping well without disruption' },
                { rating: 4, label: 'Mild trouble falling asleep' },
                { rating: 3, label: 'Broken sleep / waking up frequently' },
                { rating: 2, label: 'Very poor sleep (frequent anxiety or nightmares)' },
                { rating: 1, label: 'Severe insomnia / unable to sleep at all' },
              ].map((item) => (
                <button
                  key={item.rating}
                  type="button"
                  onClick={() => setSleepQuality(item.rating)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                    sleepQuality === item.rating
                      ? 'border-teal-700 bg-teal-50 text-teal-950 font-bold ring-1 ring-teal-700'
                      : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-mono font-bold text-stone-400">{item.rating}/5</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Appetite & Meals */}
        {step === 5 && (
          <div className="space-y-5">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
                Daily Routine & Appetite
              </span>
              <h2 className="text-xl font-bold font-serif text-stone-900">
                {isHindi
                  ? 'क्या आप नियमित भोजन और दिनचर्या बनाए रख पा रहे हैं?'
                  : 'Have you been able to eat regular meals and manage daily tasks?'}
              </h2>
              <p className="text-xs text-stone-500">
                Appetite loss is an early physiological sign of elevated distress.
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                { rating: 5, label: 'Regular healthy appetite and daily routine' },
                { rating: 4, label: 'Mild loss of appetite but managing' },
                { rating: 3, label: 'Skipping meals occasionally due to stress' },
                { rating: 2, label: 'Significant difficulty eating regular meals' },
                { rating: 1, label: 'Severe loss of appetite / skipping meals continuously' },
              ].map((item) => (
                <button
                  key={item.rating}
                  type="button"
                  onClick={() => setAppetite(item.rating)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                    appetite === item.rating
                      ? 'border-teal-700 bg-teal-50 text-teal-950 font-bold ring-1 ring-teal-700'
                      : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-mono font-bold text-stone-400">{item.rating}/5</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 6: Support Needs & Final Message */}
        {step === 6 && (
          <div className="space-y-5">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
                Immediate Assistance
              </span>
              <h2 className="text-xl font-bold font-serif text-stone-900">
                {isHindi
                  ? 'वर्तमान में आपको किस प्रकार की सहायता की आवश्यकता है?'
                  : 'What kind of support would help you most right now?'}
              </h2>
              <p className="text-xs text-stone-500">
                Select all that apply. Your welfare officer will review these immediately.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-2 text-xs">
              {[
                'Emergency police protection / patrol',
                'Someone to speak to / counselling session',
                'Legal advice regarding court proceedings',
                'Temporary safe accommodation / shelter',
                'Statutory compensation / relief assistance',
                'Medical or psychiatric care',
              ].map((item) => (
                <label
                  key={item}
                  className={`p-3 rounded-lg border flex items-start gap-2.5 cursor-pointer transition ${
                    supportNeeds.includes(item)
                      ? 'border-teal-700 bg-teal-50 text-teal-950 font-semibold'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={supportNeeds.includes(item)}
                    onChange={() => handleSupportToggle(item)}
                    className="mt-0.5 rounded text-teal-700 focus:ring-teal-700"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">
                Optional Message for your Counsellor or Officer:
              </label>
              <textarea
                rows={2}
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Share anything you want them to know (confidential)..."
                className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700"
              />
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-stone-100 mt-6">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 rounded-lg text-stone-600 hover:text-stone-900 text-xs font-semibold transition flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 6 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-5 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-semibold text-xs shadow-sm transition flex items-center gap-1.5"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-sm transition flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit Check-In Confidentially</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
