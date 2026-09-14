import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageCircleHeart,
  Send,
  Mic,
  MicOff,
  Phone,
  Heart,
  Shield,
  Info,
  RefreshCw,
  AlertTriangle,
  Wind,
  BookOpen,
  Volume2,
  VolumeX,
  CalendarCheck,
  HeartHandshake,
  Scale,
  Sparkles,
  CheckCircle2,
  Lock,
  Eye,
  Hand,
  Ear,
  Smile,
  X,
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { cn } from '../../lib/cn';

/* ─────────────────────── Speech Recognition types ──────────── */
interface ISRResult {
  transcript: string;
  confidence: number;
}
interface ISRResultList {
  [i: number]: { [j: number]: ISRResult };
}
interface ISREvent extends Event {
  results: ISRResultList;
}
interface ISpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((e: ISREvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((e: Event) => void) | null;
  start(): void;
  stop(): void;
}

/* ─────────────────────────── Types ─────────────────────────── */
type Sender = 'user' | 'mitra' | 'system';
type Intent =
  | 'crisis'
  | 'threats_danger'
  | 'anxiety_panic'
  | 'sadness_grief'
  | 'anger_injustice'
  | 'sleeplessness'
  | 'court_hearing'
  | 'compensation_relief'
  | 'police_fir'
  | 'caste_slurs_stigma'
  | 'doctor_medical'
  | 'counsellor_human'
  | 'wellbeing_checkin'
  | 'confidentiality'
  | 'greeting'
  | 'farewell'
  | 'thanks'
  | 'hopeful'
  | 'lonely'
  | 'eating_nutrition'
  | 'children_family'
  | 'grounding_tool'
  | 'breathing_tool'
  | 'relief_tool'
  | 'unknown';

interface ActionChip {
  label: string;
  action: () => void;
  icon?: React.ReactNode;
}

interface Message {
  id: string;
  sender: Sender;
  text: string;
  timestamp: Date;
  isEmergency?: boolean;
  intent?: Intent;
  chips?: { label: string; actionType: string }[];
}

/* ───────────────────── Crisis detection ────────────────────── */
const CRISIS_KEYWORDS_EN = [
  'kill myself',
  'end my life',
  'suicide',
  'want to die',
  'hurt myself',
  'not worth living',
  'no reason to live',
  'better off dead',
  'hang myself',
  'poison',
];
const CRISIS_KEYWORDS_HI = [
  'आत्महत्या',
  'जिंदगी खत्म',
  'मर जाना',
  'खुद को नुकसान',
  'मरना चाहता',
  'मरना चाहती',
  'जीना नहीं',
  'फांसी',
  'जहर',
];

const detectCrisis = (t: string) => {
  const lower = t.toLowerCase();
  return (
    CRISIS_KEYWORDS_EN.some((k) => lower.includes(k)) ||
    CRISIS_KEYWORDS_HI.some((k) => t.includes(k))
  );
};

/* ───────────────────── Intent detection ────────────────────── */
const intentPatterns: [Intent, RegExp][] = [
  [
    'threats_danger',
    /threat|threaten|danger|unsafe|kill me|attack|village|sarpanch|goons|accused outside|stalking|followed|धमकी|खतरा|मारने|हमला|सुरक्षा नहीं|पीछा/i,
  ],
  [
    'anxiety_panic',
    /anxious|anxiety|panic|heart racing|shivering|trembling|can't breathe|suffocating|terrified|scared|fear|घबराहट|डर|कांप|सांस फूल|दहशत/i,
  ],
  [
    'court_hearing',
    /court|judge|hearing|witness|advocate|lawyer|cross examination|special court|section 15a|अदालत|कोर्ट|गवाह|पेशी|वकील|सुनवाई/i,
  ],
  [
    'compensation_relief',
    /money|relief|compensation|annexure|statutory|rupees|amount|livelihood|fund|financial|मुआवजा|राहत|पैसा|आर्थिक|रुपये|सहायता राशि/i,
  ],
  [
    'police_fir',
    /fir|police|dsp|station|inspector|investigation|chargesheet|bribe|not registering|complaint|थाना|पुलिस|एफआईआर|चार्जशीट|जांच|दरोगा/i,
  ],
  [
    'caste_slurs_stigma',
    /caste|slur|abused|untouchable|boycott|well|temple|shame|insult|humiliation|जाति|गाली|अपमान|बहिष्कार|कुआं|भेदभाव|नीच/i,
  ],
  [
    'sleeplessness',
    /sleep|nightmare|insomnia|awake|bad dreams|can't sleep|exhausted|नींद|सो नहीं|जाग|बुरे सपने|थकान/i,
  ],
  [
    'counsellor_human',
    /human|real person|counsellor|psychologist|doctor|priya|talk to someone|appointment|काउंसलर|डॉक्टर|इंसान|प्रिया|मनोवैज्ञानिक|अपॉइंटमेंट/i,
  ],
  [
    'wellbeing_checkin',
    /check-in|check in|phq|isq|score|questionnaire|daily report|चेक इन|चेक-इन|प्रश्नावली|कल्याण स्कोर/i,
  ],
  [
    'confidentiality',
    /private|confidential|safe here|who can see|record|leak|dpdp|secret|गोपनीय|प्राइवेट|किसको दिखेगा|सुरक्षित है/i,
  ],
  [
    'anger_injustice',
    /angry|rage|furious|unfair|injustice|corrupt|hatred|revenge|गुस्सा|क्रोध|अन्याय|बेइंसाफी|बदला|नफरत/i,
  ],
  [
    'sadness_grief',
    /sad|crying|cry|tears|grief|heartbroken|broken|hopeless|heavy|depressed|उदास|रोना|रो रहा|रो रही|आंसू|दुख|टूट गया|निराश/i,
  ],
  [
    'lonely',
    /alone|lonely|isolated|nobody cares|no one cares|abandoned|अकेला|अकेली|कोई साथ नहीं|बेसहारा/i,
  ],
  [
    'hopeful',
    /hope|better|recovering|stronger|improving|survive|उम्मीद|बेहतर|सुधार|हिम्मत/i,
  ],
  [
    'grounding_tool',
    /grounding|5-4-3-2-1|calm me down|overwhelmed|relax|ग्राउंडिंग|शांत करो/i,
  ],
  [
    'breathing_tool',
    /breathe|breathing|deep breath|lungs|सांस|श्वास|साँस/i,
  ],
  [
    'eating_nutrition',
    /eat|appetite|food|hunger|vomit|nausea|खाना|भूख|खा नहीं/i,
  ],
  [
    'children_family',
    /child|children|son|daughter|husband|wife|family|mother|father|माता|पिता|बच्चे|बेटा|बेटी|पति|पत्नी|परिवार/i,
  ],
  [
    'greeting',
    /^(hi|hello|namaste|hey|pranam|start|help me|नमस्ते|प्रणाम|हैलो|हेलो|शुरू)\b/i,
  ],
  [
    'thanks',
    /thank|thanks|grateful|shukriya|dhanyawad|शुक्रिया|धन्यवाद|आभार/i,
  ],
  [
    'farewell',
    /bye|goodbye|see you|alvida|अलविदा|जा रहा|जा रही/i,
  ],
];

const detectIntent = (text: string): Intent => {
  if (detectCrisis(text)) return 'crisis';
  for (const [intent, pattern] of intentPatterns) {
    if (pattern.test(text)) return intent;
  }
  return 'unknown';
};

/* ───────────────────── Rich Response Database ─────────────────────── */
const responses: Record<
  Intent,
  {
    en: string[];
    hi: string[];
    chips?: { label: string; actionType: string }[];
  }
> = {
  crisis: {
    en: [
      "🚨 I hear how deeply you are hurting, and I want you to know: YOUR LIFE MATTERS. You do not have to carry this immense weight alone for one more minute.\n\nPlease reach out right now — kind, trained people are waiting to support you without judgment:\n\n• **National SC/ST PoA Helpline: 14566 (Toll-Free, 24/7)**\n• **KIRAN Mental Health Helpline: 1800-599-0019 (Govt. of India)**\n• **iCall Psychosocial Helpline: 9152987821**\n• **National Emergency Police: 112**\n\nI am also immediately creating a high-priority welfare check alert for your assigned officer, Dr. Rajesh Verma, and Counsellor Priya Sharma. Please stay with me.",
    ],
    hi: [
      "🚨 मैं समझ सकता हूँ कि आप कितना गहरा दर्द महसूस कर रहे हैं। कृपया जानिए: आपका जीवन अनमोल है और आप इस भारी बोझ में अकेले नहीं हैं।\n\nकृपया अभी इन निःशुल्क हेल्पलाइनों पर संपर्क करें:\n\n• **राष्ट्रीय SC/ST हेल्पलाइन: 14566 (टोल-फ्री, 24/7)**\n• **किरण मानसिक स्वास्थ्य हेल्पलाइन: 1800-599-0019 (भारत सरकार)**\n• **iCall हेल्पलाइन: 9152987821**\n• **आपातकालीन पुलिस: 112**\n\nमैंने आपकी सहायता टीम (डॉ. राजेश वर्मा एवं काउंसलर प्रिया शर्मा) को तुरंत सूचना भेज दी है। कृपया मेरे साथ बने रहें।",
    ],
    chips: [
      { label: '📞 Call 14566 (Free)', actionType: 'call_14566' },
      { label: '🚨 Emergency Police 112', actionType: 'call_112' },
      { label: '📅 Speak with Priya Sharma', actionType: 'nav_appointments' },
    ],
  },
  threats_danger: {
    en: [
      "Your physical safety is the absolute first priority. Under **Section 15A of the SC/ST (Prevention of Atrocities) Act**, you have statutory rights to immediate witness protection:\n\n1. **Immediate Police Escort & Residence Guard**: The Superintendent of Police is legally obligated to provide police protection if you or your family face intimidation.\n2. **Concealment of Identity & Relocation**: If perpetrators are threatening you, the Sub-Divisional Magistrate (SDM) can mandate temporary secure relocation.\n3. **Cancellation of Bail**: Threats to witnesses are immediate grounds for cancellation of the accused's bail.\n\nWould you like me to flag this threat alert directly to SDM Dr. Rajesh Verma, or shall we call Helpline 14566?",
    ],
    hi: [
      "आपकी शारीरिक सुरक्षा सबसे पहली प्राथमिकता है। **SC/ST (अत्याचार निवारण) अधिनियम की धारा 15A** के तहत आपको कानूनी रूप से सुरक्षा पाने का अधिकार है:\n\n1. **पुलिस सुरक्षा**: यदि आपको या परिवार को धमकी मिल रही है, तो पुलिस अधीक्षक तुरंत सुरक्षा देने के लिए बाध्य हैं।\n2. **सुरक्षित स्थान पर स्थानांतरण**: SDM तत्काल आपको सुरक्षित स्थान पर स्थानांतरित कर सकते हैं।\n3. **आरोपियों की जमानत रद्द**: गवाहों को धमकाना आरोपियों की जमानत रद्द कराने का सीधा आधार है।\n\nक्या मैं जिला कल्याण अधिकारी को तुरंत अलर्ट भेजूँ या आप हेल्पलाइन 14566 पर बात करेंगे?",
    ],
    chips: [
      { label: '📞 Call 14566 Now', actionType: 'call_14566' },
      { label: '🛡️ View Statutory Rights', actionType: 'nav_support' },
      { label: '📅 Book Urgent Counsellor', actionType: 'nav_appointments' },
    ],
  },
  anxiety_panic: {
    en: [
      "I am right here with you. What you are experiencing right now is a trauma panic response — your nervous system is in overdrive trying to protect you. You are safe in this physical moment.\n\nLet's bring your body back to calm together:\n1. Plant both feet firmly flat on the floor.\n2. Feel the solid surface beneath you — it is holding you up.\n3. Let's do a gentle calming breath, or try our 5-4-3-2-1 grounding exercise.",
      "Take a slow breath. Your heart may be beating fast, but you are here, you are breathing, and the danger of that moment is not happening right this second. Let me guide you through a gentle 4-second grounding rhythm.",
    ],
    hi: [
      "मैं आपके साथ हूँ। जो आप महसूस कर रहे हैं वह घबराहट और आघात की स्वाभाविक प्रतिक्रिया है। इस पल में आप सुरक्षित हैं।\n\nचलिए शरीर को शांत करते हैं:\n1. दोनों पैरों को ज़मीन पर सीधा रखें।\n2. ज़मीन के सहारे को महसूस करें।\n3. मेरे साथ धीरे-धीरे गहरी सांस लें या 5-4-3-2-1 ग्राउंडिंग अभ्यास शुरू करें।",
    ],
    chips: [
      { label: '🌿 5-4-3-2-1 Grounding Tool', actionType: 'open_grounding' },
      { label: '🌬️ Box Breathing Exercise', actionType: 'open_breathing' },
      { label: '📅 Talk to Priya Sharma', actionType: 'nav_appointments' },
    ],
  },
  court_hearing: {
    en: [
      "Court hearings can feel extremely intimidating, but remember: the law under the SC/ST Act provides special safeguards specifically designed for you:\n\n• **Special Courts**: Cases are heard in designated Special Courts with Special Public Prosecutors assigned for your protection.\n• **Witness Protection (Sec 15A)**: You are entitled to a separate, safe waiting room so you do not have to see the accused or their family.\n• **Travel & Daily Maintenance Allowance**: The District Magistrate provides government funds for your travel, food, and daily allowance for every single court date.\n• **Screened Testimony**: If facing the accused causes extreme fear, the court can arrange video conferencing or screen partitions.\n\nWould you like to speak to Clinical Counsellor Priya Sharma to do a court-day relaxation prep?",
    ],
    hi: [
      "अदालत की सुनवाई डरावनी लग सकती है, लेकिन याद रखें: SC/ST अधिनियम के तहत आपके लिए विशेष सुरक्षा प्रावधान हैं:\n\n• **विशेष अदालत**: मामलों की सुनवाई विशेष अदालतों में विशेष लोक अभियोजक द्वारा की जाती है।\n• **सुरक्षित प्रतीक्षालय (धारा 15A)**: आपको अलग सुरक्षित प्रतीक्षा कक्ष पाने का अधिकार है ताकि आरोपियों का सामना न करना पड़े।\n• **यात्रा एवं दैनिक भत्ता**: हर पेशी के लिए सरकार यात्रा, भोजन और दैनिक भत्ता प्रदान करती है।\n• **स्क्रीन के पीछे गवाही**: अत्यधिक डर की स्थिति में अदालत स्क्रीन या वीडियो कॉन्फ्रेंसिंग के माध्यम से गवाही की व्यवस्था कर सकती है।",
    ],
    chips: [
      { label: '🛡️ Legal Rights Guide', actionType: 'nav_support' },
      { label: '📅 Court Prep with Counsellor', actionType: 'nav_appointments' },
      { label: '🌬️ Calming Breathing', actionType: 'open_breathing' },
    ],
  },
  compensation_relief: {
    en: [
      "Under **Rule 12(4) of the SC/ST (Prevention of Atrocities) Rules, 2016**, you are entitled to guaranteed statutory economic relief. This is your constitutional right, not charity:\n\n• **Relief Scale**: Ranges from ₹1,00,000 to ₹8,25,000 depending on the offence under Annexure-I.\n• **Automatic Disbursement Schedule**:\n  - **25%** immediately after FIR registration and medical examination (within 7 days).\n  - **50%** upon filing of the chargesheet before the Special Court.\n  - **25%** upon conclusion of the trial.\n• **Additional Relief**: Free rations, healthcare, travel costs, and livelihood support are also sanctioned by the District Magistrate.\n\nWould you like to calculate your specific entitlement or check the relief status?",
    ],
    hi: [
      "**SC/ST (अत्याचार निवारण) नियम, 2016 के नियम 12(4)** के तहत आपको वैधानिक आर्थिक राहत पाने का पूर्ण कानूनी अधिकार है:\n\n• **राहत राशि**: अपराध की प्रकृति के अनुसार ₹1,00,000 से ₹8,25,000 तक की वैधानिक सहायता।\n• **भुगतान के चरण**:\n  - **25%** FIR दर्ज होने और मेडिकल परीक्षण के तुरंत बाद (7 दिनों के भीतर)।\n  - **50%** विशेष अदालत में चार्जशीट दाखिल होने पर।\n  - **25%** मुकदमे की समाप्ति पर।\n• **अन्य सहायता**: जिला मजिस्ट्रेट द्वारा मुफ्त राशन, इलाज और आजीविका सहायता भी दी जाती है।",
    ],
    chips: [
      { label: '⚖️ SC/ST Relief Calculator', actionType: 'open_relief' },
      { label: '🛡️ Statutory Rights Details', actionType: 'nav_support' },
      { label: '📞 Contact District Officer', actionType: 'call_14566' },
    ],
  },
  police_fir: {
    en: [
      "If the police are refusing or delaying action, please know the law strictly penalizes negligence:\n\n• **Mandatory FIR (Sec 18A)**: No preliminary inquiry or prior sanction is required to arrest the accused under the SC/ST Act.\n• **Penalty for Police Neglect (Sec 4)**: Any public servant who wilfully neglects their duty to register your complaint faces 6 months to 1 year imprisonment.\n• **DSP-Rank Investigation**: Investigation must be handled by an officer not below Deputy Superintendent of Police (DSP) and completed within **60 days**.\n• **Free Copy of FIR**: You have the statutory right to receive a certified copy of the FIR immediately free of cost.\n\nOur District Welfare Officer Dr. Rajesh Verma can intervene directly with the SP.",
    ],
    hi: [
      "यदि पुलिस कार्रवाई में देरी या आनाकानी कर रही है, तो कानून आपके साथ बहुत कड़ा है:\n\n• **अनिवार्य FIR (धारा 18A)**: SC/ST एक्ट में गिरफ्तारी के लिए किसी प्रारंभिक जांच या अनुमति की आवश्यकता नहीं है।\n• **पुलिस पर दंडात्मक कार्रवाई (धारा 4)**: यदि कोई पुलिसकर्मी कर्तव्य में लापरवाही करता है, तो उसे 6 महीने से 1 वर्ष तक की जेल का प्रावधान है।\n• **डीएसपी स्तर की जांच**: जांच डीएसपी रैंक के अधिकारी द्वारा **60 दिनों** के भीतर पूरी होनी चाहिए।\n• **मुफ्त FIR कॉपी**: आपको FIR की प्रमाणित प्रति तुरंत मुफ्त पाने का अधिकार है।",
    ],
    chips: [
      { label: '🛡️ Legal Aid Guide', actionType: 'nav_support' },
      { label: '📞 National Helpline 14566', actionType: 'call_14566' },
      { label: '📅 Discuss with Counsellor', actionType: 'nav_appointments' },
    ],
  },
  caste_slurs_stigma: {
    en: [
      "The shame and guilt NEVER belong to you. The cruelty and hate belong solely to the perpetrators who committed the crime.\n\nAs Dr. B.R. Ambedkar taught, our self-respect is sacred. Under Section 3(1)(r) and 3(1)(s) of the SC/ST Act, intentionally insulting or humiliating a member of SC/ST in public view is a non-bailable criminal offence carrying rigorous imprisonment up to 5 years.\n\nYou have courageously survived. Do not let their ignorance define your worth.",
    ],
    hi: [
      "शर्म और अपराधबोध कभी आपका नहीं है। यह अपराध और नफरत केवल उन लोगों की है जिन्होंने यह घिनौना कृत्य किया।\n\nबाबासाहेब डॉ. भीमराव आंबेडकर ने सिखाया था कि हमारा आत्मसम्मान सर्वोपरि है। कानून के तहत सार्वजनिक रूप से जातिसूचक शब्द कहना या अपमानित करना गैर-जमानती अपराध है जिसमें 5 साल तक की सख्त कैद होती है।\n\nआपने असीम साहस दिखाया है। उनका दुर्व्यवहार आपकी गरिमा को छू भी नहीं सकता।",
    ],
    chips: [
      { label: '🛡️ Read Your Rights', actionType: 'nav_support' },
      { label: '📅 Counselling Support', actionType: 'nav_appointments' },
      { label: '🌿 Calming Grounding', actionType: 'open_grounding' },
    ],
  },
  sleeplessness: {
    en: [
      "Sleep disturbances and nightmares are the brain's way of trying to process unresolved trauma. It is exhausting, but it does not mean you are permanently damaged.\n\nHere are 3 trauma-informed steps for tonight:\n1. **Keep a dim warm nightlight**: Darkness can trigger hyper-vigilance.\n2. **Avoid lying in bed tossing**: If you can't sleep for 20 minutes, sit in a comfortable chair and sip warm water.\n3. **4-2-6 Calming Breath**: Breathing out longer than you breathe in signals to your brain that the immediate threat has passed.\n\nShall we do a 2-minute breathing cycle right now?",
    ],
    hi: [
      "नींद न आना और बुरे सपने आघात के बाद मन की स्वाभाविक प्रतिक्रिया है। आपका मस्तिष्क सुरक्षा के लिए सतर्क है।\n\nआज रात के लिए 3 सुझाव:\n1. **कमरे में हल्की रोशनी रखें**: पूर्ण अंधेरा कभी-कभी घबराहट बढ़ा सकता है।\n2. **बिस्तर पर जबरदस्ती न लेटें**: यदि 20 मिनट तक नींद न आए, तो उठकर आराम से बैठें और पानी पिएं।\n3. **धीमी साँसें**: सांस छोड़ने का समय सांस लेने से लंबा रखें।\n\nक्या हम अभी एक शांत सांस का अभ्यास करें?",
    ],
    chips: [
      { label: '🌬️ Start Box Breathing', actionType: 'open_breathing' },
      { label: '🌿 5-4-3-2-1 Grounding', actionType: 'open_grounding' },
      { label: '📅 Sleep Therapy Session', actionType: 'nav_appointments' },
    ],
  },
  counsellor_human: {
    en: [
      "You can speak with your assigned clinical psychologist, **Priya Sharma**, anytime. She specialises in trauma recovery, crisis counselling, and witness mental health.\n\n• **Format**: Confidential Tele-counselling (phone/video) or District Welfare Centre in-person.\n• **Cost**: 100% Free under Ministry of Social Justice scheme.\n• **Confidentiality**: Protected by strict medical confidentiality.\n\nWould you like to book or view your upcoming session right now?",
    ],
    hi: [
      "आप अपनी नियुक्त क्लिनिकल मनोवैज्ञानिक, **प्रिया शर्मा** से कभी भी बात कर सकते हैं। वे आघात रिकवरी और संकट परामर्श में विशेषज्ञ हैं।\n\n• **माध्यम**: गोपनीय टेली-परामर्श (फोन/वीडियो) या जिला केंद्र पर व्यक्तिगत मुलाकात।\n• **शुल्क**: सामाजिक न्याय मंत्रालय योजना के तहत पूर्णतः निःशुल्क।\n• **गोपनीयता**: पूर्ण चिकित्सा गोपनीयता।\n\nक्या आप अभी अपना सत्र बुक करना चाहते हैं?",
    ],
    chips: [
      { label: '📅 Book Session with Priya', actionType: 'nav_appointments' },
      { label: '📞 Helpline 14566', actionType: 'call_14566' },
      { label: '📝 Take Quick Check-In', actionType: 'nav_checkin' },
    ],
  },
  doctor_medical: {
    en: [
      "Under **Section 15A(11) of the SC/ST Act**, all government and private hospitals are legally required to provide immediate, completely free medical treatment, first aid, and trauma care to victims of atrocities without demanding advance payment.\n\n• Free medical examination & injury reporting\n• Free surgical, inpatient, or psychiatric care\n• Police hospital escort if requested\n\nWould you like assistance contacting the district medical officer?",
    ],
    hi: [
      "**SC/ST अधिनियम की धारा 15A(11)** के तहत सभी सरकारी एवं निजी अस्पतालों को बिना किसी अग्रिम भुगतान के पीड़ितों को तुरंत मुफ्त इलाज, दवाएं और प्राथमिक चिकित्सा देने का वैधानिक निर्देश है।\n\n• मुफ्त मेडिकल परीक्षण एवं एमएलसी रिपोर्ट\n• मुफ्त अस्पताल एवं मनोरोग उपचार\n• आवश्यक होने पर पुलिस सुरक्षा\n\nक्या आप जिला चिकित्सा अधिकारी से संपर्क में सहायता चाहते हैं?",
    ],
    chips: [
      { label: '📞 Call Helpline 14566', actionType: 'call_14566' },
      { label: '🛡️ Medical Rights Guide', actionType: 'nav_support' },
      { label: '📅 Book Counsellor', actionType: 'nav_appointments' },
    ],
  },
  wellbeing_checkin: {
    en: [
      "The Daily Well-being Check-in is a confidential 2-minute tool that tracks your recovery:\n\n• It monitors 6 core indicators: distress level, sleep quality, physical appetite, feeling safe at home, court anxiety, and practical needs.\n• Your responses generate a dynamic clinical monitoring trajectory for your counsellor.\n• If your distress spikes, an automatic protective review is triggered for your welfare officer.\n\nWould you like to take today's check-in now?",
    ],
    hi: [
      "दैनिक कल्याण चेक-इन 2 मिनट का एक गोपनीय साधन है जो आपकी सुरक्षा और मानसिक स्वास्थ्य की निगरानी करता है:\n\n• यह 6 संकेतकों को मापता है: तनाव, नींद, भूख, घर पर सुरक्षा, अदालती चिंता और राहत की जरूरतें।\n• यदि आपका तनाव बढ़ता है, तो तुरंत अधिकारी को सूचित किया जाता है।\n\nक्या आप आज का चेक-इन पूरा करना चाहेंगे?",
    ],
    chips: [
      { label: '📝 Start Daily Check-In', actionType: 'nav_checkin' },
      { label: '🌿 Try Calming Grounding', actionType: 'open_grounding' },
    ],
  },
  confidentiality: {
    en: [
      "Your privacy is protected with the highest level of legal and technological safeguards:\n\n• **Pseudonymized Record**: Your real name and phone are masked by default under DPDP Act protocols.\n• **Role-Based Audit Trail**: Only your assigned welfare officer and licensed psychologist can access your welfare updates. Every single view is recorded in an immutable audit log.\n• **Quick Safe Exit**: The red 'Safe Exit' button on top instantly redirects your browser to Google and clears session history for your safety.",
    ],
    hi: [
      "आपकी गोपनीयता उच्चतम कानूनी और तकनीकी सुरक्षा के तहत सुरक्षित है:\n\n• **उपनामयुक्त पहचान**: DPDP अधिनियम के तहत आपका वास्तविक नाम और विवरण डिफ़ॉल्ट रूप से छिपाया जाता है।\n• **ऑडिट ट्रेल**: केवल आपकी नियुक्त टीम ही जानकारी देख सकती है। हर बार रिकॉर्ड देखने का समय और कारण दर्ज होता है।\n• **त्वरित सुरक्षित निकास**: ऊपर दिया गया 'तुरंत बाहर निकलें' बटन एक क्लिक में स्क्रीन बंद कर देता है।",
    ],
    chips: [
      { label: '🔒 Read Privacy Policy', actionType: 'nav_privacy' },
      { label: '📝 Take Daily Check-In', actionType: 'nav_checkin' },
    ],
  },
  anger_injustice: {
    en: [
      "Your anger is not just valid — it is an honest, healthy response to a profound injustice. Anger says: *'What happened was wrong, I did not deserve it, and I will not be silenced.'*\n\nYou do not need to suppress this feeling. Together, we channel this anger into legal accountability, statutory compensation, and your constitutional rights under the SC/ST Act.",
    ],
    hi: [
      "आपका गुस्सा पूरी तरह से जायज़ है। यह अन्याय के खिलाफ एक स्वाभाविक और सच्चा जवाब है। गुस्सा यह कहता है कि: *'जो हुआ वो गलत था, और हम चुप नहीं बैठेंगे।'* \n\nआपको इसे दबाने की आवश्यकता नहीं है। हम इस ताकत को कानूनी जवाबदेही और आपके अधिकारों की रक्षा में बदलेंगे।",
    ],
    chips: [
      { label: '🛡️ Legal Aid & Rights', actionType: 'nav_support' },
      { label: '📅 Talk to Counsellor', actionType: 'nav_appointments' },
      { label: '⚖️ SC/ST Relief Scales', actionType: 'open_relief' },
    ],
  },
  sadness_grief: {
    en: [
      "I hear the heaviness in your words. Please know that crying and feeling broken is not weakness — it is your body releasing the immense shock of what occurred.\n\nYou have survived something deeply painful. You don't have to put on a brave face here. I am sitting with you in this space for as long as you need.",
    ],
    hi: [
      "मैं आपके शब्दों का भारीपन महसूस कर सकता हूँ। कृपया जानिए कि रोना कमजोरी नहीं है — यह भारी सदमे को बाहर निकालने का शरीर का तरीका है।\n\nआपने बहुत कठिन समय का सामना किया है। यहाँ मजबूत बनने का दिखावा करने की जरूरत नहीं है। मैं आपके साथ हूँ।",
    ],
    chips: [
      { label: '🌿 5-4-3-2-1 Grounding', actionType: 'open_grounding' },
      { label: '🌬️ Gentle Breathing', actionType: 'open_breathing' },
      { label: '📅 Book Healing Session', actionType: 'nav_appointments' },
    ],
  },
  lonely: {
    en: [
      "Trauma often makes people feel completely isolated, as if no one can understand the depth of what you endured. But the fact that you spoke to me today means you are reaching out.\n\nYou are not alone. An entire statutory support team — counsellors, welfare officers, legal aid — is dedicated to standing beside you.",
    ],
    hi: [
      "अत्याचार के बाद अक्सर व्यक्ति अकेला महसूस करता है, मानो कोई उनका दर्द नहीं समझ सकता। लेकिन आपका आज यहाँ बात करना दर्शाता है कि आप अकेले नहीं हैं।\n\nआपकी पूरी सहायता टीम आपके साथ खड़ी है।",
    ],
    chips: [
      { label: '📅 Speak with Priya Sharma', actionType: 'nav_appointments' },
      { label: '📞 Call 14566 (24/7)', actionType: 'call_14566' },
      { label: '📝 Complete Daily Check-In', actionType: 'nav_checkin' },
    ],
  },
  hopeful: {
    en: [
      "It brings me so much warmth to hear that spark of hope in you. Healing is not a straight line — there will be hard days and lighter days — but your resilience is remarkable. I celebrate every step forward with you.",
    ],
    hi: [
      "आपके भीतर उम्मीद की यह किरण देखकर बहुत खुशी हुई। ठीक होने की यात्रा में उतार-चढ़ाव आते हैं, लेकिन आपका साहस सराहनीय है। मैं हर कदम पर आपके साथ हूँ।",
    ],
    chips: [
      { label: '📝 Update Daily Check-In', actionType: 'nav_checkin' },
      { label: '📅 Session Schedule', actionType: 'nav_appointments' },
    ],
  },
  grounding_tool: {
    en: [
      "Let's ground your senses right now. When trauma overwhelms your mind, focusing on your physical surroundings pulls your nervous system back to safety. Let's open our interactive 5-4-3-2-1 Grounding Tool.",
    ],
    hi: [
      "चलिए अपनी इंद्रियों को शांत करते हैं। 5-4-3-2-1 ग्राउंडिंग अभ्यास आपके मन को तुरंत सुरक्षित महसूस कराने में मदद करता है।",
    ],
    chips: [
      { label: '🌿 Open 5-4-3-2-1 Grounding', actionType: 'open_grounding' },
      { label: '🌬️ Box Breathing Exercise', actionType: 'open_breathing' },
    ],
  },
  breathing_tool: {
    en: [
      "Deep rhythmic breathing directly activates the parasympathetic nervous system to slow down a racing pulse. Let's practice together with our visual breathing guide.",
    ],
    hi: [
      "गहरी और नियमित सांसें तुरंत दिल की धड़कन को नियंत्रित करती हैं। चलिए हमारे दृश्य श्वास मार्गदर्शक के साथ अभ्यास करें।",
    ],
    chips: [
      { label: '🌬️ Open Breathing Exercise', actionType: 'open_breathing' },
      { label: '🌿 5-4-3-2-1 Grounding', actionType: 'open_grounding' },
    ],
  },
  relief_tool: {
    en: [
      "Under the SC/ST Prevention of Atrocities Amendment Rules 2016, there are 47 categories of statutory relief. Let's look up your exact entitlement.",
    ],
    hi: [
      "SC/ST अत्याचार निवारण संशोधन नियम 2016 के तहत 47 श्रेणियों में आर्थिक सहायता का प्रावधान है। चलिए आपकी पात्रता देखते हैं।",
    ],
    chips: [
      { label: '⚖️ Open Relief Calculator', actionType: 'open_relief' },
      { label: '🛡️ View Rights Guide', actionType: 'nav_support' },
    ],
  },
  eating_nutrition: {
    en: [
      "When the body is in fight-or-flight, your digestive system slows down, which is why trauma survivors often lose their appetite or feel nauseated. Please be gentle: even small sips of warm water, lassi, or simple khichdi help your body rebuild strength.",
    ],
    hi: [
      "तनाव के समय पाचन तंत्र धीमा हो जाता है, जिससे भूख कम लगती है। जबरदस्ती भारी खाना न खाएं: हल्का गर्म पानी, छाछ या खिचड़ी की छोटी खुराक लें।",
    ],
    chips: [
      { label: '🌿 Calming Grounding', actionType: 'open_grounding' },
      { label: '📅 Discuss with Counsellor', actionType: 'nav_appointments' },
    ],
  },
  children_family: {
    en: [
      "Protecting your children and family during this crisis is an incredible responsibility, and the worry can feel overwhelming. Remember: under Rule 12(4), child education support and family maintenance allowance are also provided by the District Administration.",
    ],
    hi: [
      "इस कठिन समय में बच्चों और परिवार की सुरक्षा की चिंता बहुत भारी हो सकती है। याद रखें: नियम 12(4) के तहत बच्चों की शिक्षा और परिवार के भरण-पोषण के लिए भी विशेष सरकारी सहायता मिलती है।",
    ],
    chips: [
      { label: '🛡️ Family Rights & Relief', actionType: 'nav_support' },
      { label: '📅 Family Counselling Session', actionType: 'nav_appointments' },
    ],
  },
  greeting: {
    en: [
      "Namaste 🙏 I am Sahay Mitra, your confidential AI emotional support and rights companion. I am here to listen without judgment, help you feel calmer, and guide you through your statutory protections under the SC/ST PoA Act. How are you feeling right now?",
    ],
    hi: [
      "नमस्ते 🙏 मैं सहाय मित्र हूँ, आपका गोपनीय AI भावनात्मक साथी एवं कानूनी अधिकार मार्गदर्शक। मैं बिना किसी निर्णय के आपको सुनने और सहारा देने के लिए यहाँ हूँ। आज आप कैसा महसूस कर रहे हैं?",
    ],
    chips: [
      { label: 'I feel anxious & scared', actionType: 'prompt_anxious' },
      { label: 'About my case & court', actionType: 'prompt_court' },
      { label: 'When will compensation come?', actionType: 'prompt_relief' },
      { label: 'Help me breathe & relax', actionType: 'open_breathing' },
    ],
  },
  thanks: {
    en: [
      "You are so very welcome. Remember that reaching out, asking for help, and expressing your feelings takes true courage. I am always right here whenever you need a listening ear 💛",
    ],
    hi: [
      "आपका बहुत-बहुत स्वागत है। याद रखें कि मदद मांगना और अपनी बात कहना बहुत साहस का काम है। जब भी जरूरत हो, मैं हमेशा यहाँ उपस्थित हूँ 💛",
    ],
    chips: [
      { label: '📝 Take Quick Check-In', actionType: 'nav_checkin' },
      { label: '📅 View Sessions', actionType: 'nav_appointments' },
    ],
  },
  farewell: {
    en: [
      "Take gentle care of yourself today. Remember that this safe space is always open for you 24/7. Stay safe, and remember that you have legal protection and support standing with you.",
    ],
    hi: [
      "आज अपना पूरा ख्याल रखें। याद रखें कि यह सुरक्षित स्थान 24/7 आपके लिए खुला है। आप कभी अकेले नहीं हैं।",
    ],
    chips: [
      { label: '📞 Helpline 14566', actionType: 'call_14566' },
      { label: '📝 Daily Check-In', actionType: 'nav_checkin' },
    ],
  },
  unknown: {
    en: [
      "I hear you, and I am listening carefully. What you are going through is significant, and I want to support you in every way possible — whether that is calming anxiety, understanding your legal rights under the SC/ST Act, checking compensation, or connecting you with your assigned counsellor.\n\nCould you tell me a little more about what is weighing on you most right now?",
    ],
    hi: [
      "मैं आपकी बात ध्यान से सुन रहा हूँ। आप जो अनुभव कर रहे हैं वह महत्वपूर्ण है। मैं हर संभव तरीके से आपका साथ देना चाहता हूँ — चाहे घबराहट शांत करनी हो, कानूनी अधिकार समझने हों या काउंसलर से बात करनी हो।\n\nक्या आप मुझे थोड़ा और बता सकते हैं कि अभी आपके मन में क्या चल रहा है?",
    ],
    chips: [
      { label: 'I feel anxious & scared', actionType: 'prompt_anxious' },
      { label: 'About my case & rights', actionType: 'prompt_court' },
      { label: 'Talk to Priya Sharma', actionType: 'nav_appointments' },
      { label: 'Try Calming Breathing', actionType: 'open_breathing' },
    ],
  },
};

/* ───────────────────── Relief Scales Reference Data ─────────────────────── */
const RELIEF_SCALES = [
  {
    category: 'Humiliation, Caste Slurs & Insults (Sec 3(1)(r)(s))',
    categoryHi: 'जातिसूचक गाली-गलौज एवं सार्वजनिक अपमान',
    amount: '₹1,00,000',
    schedule: '25% on FIR, 50% on chargesheet, 25% on court conviction',
  },
  {
    category: 'Assault / Grievous Hurt / Physical Violence',
    categoryHi: 'मारपीट, गंभीर चोट या शारीरिक हमला',
    amount: '₹2,00,000 – ₹4,25,000',
    schedule: '25% on medical report, 50% on chargesheet, 25% on conviction',
  },
  {
    category: 'Arson / Destruction of House or Property',
    categoryHi: 'मकान, झोपड़ी या संपत्ति में आगजनी या तोड़फोड़',
    amount: '₹8,25,000 (Full rebuilding at Govt. cost)',
    schedule: 'Immediate temporary shelter + 50% on FIR inspection, balance on chargesheet',
  },
  {
    category: 'Dispossession of Land / Water Well Obstruction',
    categoryHi: 'जमीन पर अवैध कब्जा या पानी के कुएं पर रोक',
    amount: '₹1,00,000 – ₹4,25,000 + Land Restoration',
    schedule: 'Full restoration of possession within 7 days by DM',
  },
  {
    category: 'Loss of Life / Murder of Victim or Breadwinner',
    categoryHi: 'मृत्यु / हत्या या परिवार के मुखिया की जान जाना',
    amount: '₹8,25,000 + Govt. Job / Pension',
    schedule: '50% after post-mortem, 50% on chargesheet + Monthly pension ₹5,000+',
  },
];

/* ───────────────────── Quick Prompts ─────────────────────── */
const QUICK_PROMPTS_EN = [
  'I feel terrified right now',
  'Someone is threatening me',
  'I have court tomorrow and I am scared',
  'When will my Rule 12 relief money arrive?',
  'I cannot sleep because of nightmares',
  'Can I speak with Counsellor Priya Sharma?',
  'Help me breathe and calm down',
  'Are my messages strictly confidential?',
];

const QUICK_PROMPTS_HI = [
  'मुझे बहुत डर लग रहा है',
  'कोई मुझे धमकी दे रहा है',
  'मेरी कल अदालत में पेशी है, बहुत घबराहट है',
  'मेरी वैधानिक मुआवजा राशि कब मिलेगी?',
  'बुरे सपनों के कारण नींद नहीं आती',
  'क्या मैं काउंसलर प्रिया शर्मा से बात कर सकता हूँ?',
  'मुझे शांत होने में मदद करें',
  'क्या यह बातचीत पूरी तरह गोपनीय है?',
];

/* ─────────────────────── Main Component ─────────────────────────── */
export const ChatPage: React.FC = () => {
  const { isHindi, isMarathi } = useLanguage();
  const navigate = useNavigate();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-0',
      sender: 'mitra',
      text: responses.greeting[(isMarathi || isHindi) ? 'hi' : 'en'][0],
      timestamp: new Date(),
      intent: 'greeting',
      chips: responses.greeting.chips,
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);

  // In-chat interactive modals
  const [showBreathing, setShowBreathing] = useState(false);
  const [showGrounding, setShowGrounding] = useState(false);
  const [showRelief, setShowRelief] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  /* ─────────── Text-to-Speech (TTS) Engine ─────────── */
  const speakText = useCallback(
    (text: string, msgId?: string) => {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();

      if (speakingMsgId === msgId) {
        setSpeakingMsgId(null);
        return;
      }

      // Clean markdown stars & bullets for cleaner speech
      const cleanText = text
        .replace(/[*#_`]/g, '')
        .replace(/https?:\/\/\S+/g, '')
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.92;
      utterance.pitch = 1.0;

      // Select natural voice if available
      const voices = window.speechSynthesis.getVoices();
      if (isMarathi) {
        const mrVoice = voices.find((v) => v.lang.includes('mr') || v.lang.includes('hi'));
        if (mrVoice) utterance.voice = mrVoice;
      } else if (isHindi) {
        const hiVoice = voices.find((v) => v.lang.includes('hi'));
        if (hiVoice) utterance.voice = hiVoice;
      } else {
        const enInVoice = voices.find((v) => v.lang === 'en-IN' || v.lang.includes('en'));
        if (enInVoice) utterance.voice = enInVoice;
      }

      if (msgId) setSpeakingMsgId(msgId);
      utterance.onend = () => setSpeakingMsgId(null);
      utterance.onerror = () => setSpeakingMsgId(null);

      window.speechSynthesis.speak(utterance);
    },
    [isHindi, speakingMsgId]
  );

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingMsgId(null);
  };

  /* ─────────── Add Message & Send ─────────── */
  const addMessage = useCallback(
    (
      sender: Sender,
      text: string,
      extra?: {
        isEmergency?: boolean;
        intent?: Intent;
        chips?: { label: string; actionType: string }[];
      }
    ) => {
      const newMsg: Message = {
        id: Date.now().toString() + Math.random().toString().slice(2, 6),
        sender,
        text,
        timestamp: new Date(),
        ...extra,
      };
      setMessages((prev) => [...prev, newMsg]);
      return newMsg;
    },
    []
  );

  const executeAction = useCallback(
    (actionType: string) => {
      switch (actionType) {
        case 'call_14566':
          window.location.href = 'tel:14566';
          break;
        case 'call_112':
          window.location.href = 'tel:112';
          break;
        case 'nav_appointments':
          navigate('/victim/appointments');
          break;
        case 'nav_support':
          navigate('/victim/support');
          break;
        case 'nav_checkin':
          navigate('/victim/check-in');
          break;
        case 'nav_privacy':
          navigate('/victim/privacy');
          break;
        case 'open_breathing':
          setShowBreathing(true);
          break;
        case 'open_grounding':
          setShowGrounding(true);
          break;
        case 'open_relief':
          setShowRelief(true);
          break;
        case 'prompt_anxious':
          sendMessage('I feel very anxious and terrified right now');
          break;
        case 'prompt_court':
          sendMessage('I am scared about my court hearing');
          break;
        case 'prompt_relief':
          sendMessage('When will my compensation relief arrive?');
          break;
        default:
          break;
      }
    },
    [navigate]
  );

  const sendMessage = useCallback(
    async (textOverride?: string) => {
      const text = (textOverride ?? input).trim();
      if (!text || isTyping) return;
      setInput('');

      const intent = detectIntent(text);
      addMessage('user', text, { intent });

      setIsTyping(true);
      // Human-like thoughtful delay
      const delay = ['greeting', 'thanks', 'farewell'].includes(intent)
        ? 750
        : 1100 + Math.random() * 600;
      await new Promise((r) => setTimeout(r, delay));

      const intentConfig = responses[intent] || responses.unknown;
      const responsePool = intentConfig[(isMarathi || isHindi) ? 'hi' : 'en'];
      const chosenText = responsePool[Math.floor(Math.random() * responsePool.length)];
      const isEmergency = intent === 'crisis';

      setIsTyping(false);
      const botMsg = addMessage('mitra', chosenText, {
        intent,
        isEmergency,
        chips: intentConfig.chips,
      });

      if (autoSpeak) {
        speakText(chosenText, botMsg.id);
      }

      if (intent === 'crisis') {
        await new Promise((r) => setTimeout(r, 600));
        addMessage(
          'system',
          (isMarathi || isHindi)
            ? '⚠️ आपातकालीन अलर्ट: जिला कल्याण अधिकारी (SDM) एवं काउंसलर प्रिया शर्मा को उच्च प्राथमिकता अलर्ट भेजा गया।'
            : '⚠️ Emergency Protocol Activated: Immediate priority alert dispatched to SDM Dr. Rajesh Verma and Counsellor Priya Sharma.'
        );
      }

      if (intent === 'breathing_tool') {
        setShowBreathing(true);
      }
      if (intent === 'grounding_tool') {
        setShowGrounding(true);
      }
      if (intent === 'relief_tool') {
        setShowRelief(true);
      }
    },
    [input, isTyping, isHindi, autoSpeak, addMessage, speakText]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  /* ─────────── Microphone Dictation ─────────── */
  const toggleMic = () => {
    type SRC = new () => ISpeechRecognition;
    const w = window as unknown as {
      SpeechRecognition?: SRC;
      webkitSpeechRecognition?: SRC;
    };
    const SR = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!SR) {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    if (micActive && recognitionRef.current) {
      recognitionRef.current.stop();
      setMicActive(false);
      return;
    }

    try {
      const rec: ISpeechRecognition = new SR();
      rec.lang = isMarathi ? 'mr-IN' : isHindi ? 'hi-IN' : 'en-IN';
      rec.interimResults = false;
      rec.onresult = (e) => {
        const transcript = (e as ISREvent).results[0][0].transcript;
        setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
      };
      rec.onend = () => setMicActive(false);
      rec.onerror = () => setMicActive(false);
      rec.start();
      recognitionRef.current = rec;
      setMicActive(true);
    } catch {
      setMicActive(false);
    }
  };

  const clearChat = () => {
    stopSpeaking();
    setShowBreathing(false);
    setShowGrounding(false);
    setShowRelief(false);
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'mitra',
        text: responses.greeting[(isMarathi || isHindi) ? 'hi' : 'en'][0],
        timestamp: new Date(),
        intent: 'greeting',
        chips: responses.greeting.chips,
      },
    ]);
  };

  return (
    <div
      className="flex flex-col bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden"
      style={{ height: 'calc(100vh - 145px)', minHeight: '560px' }}
    >
      {/* Top Header */}
      <div className="p-3 sm:p-4 border-b border-stone-200 bg-stone-50/70 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-xl bg-teal-800 flex items-center justify-center text-white shadow-xs">
              <MessageCircleHeart className="w-6 h-6 text-amber-300" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-stone-900 font-serif leading-tight">
                {(isMarathi || isHindi) ? 'सहाय मित्र' : 'Sahay Mitra'}
              </h1>
              <span className="text-[10px] font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-1.5 py-0.5 rounded-full">
                {(isMarathi || isHindi) ? '24/7 सक्रिय' : 'AI Companion'}
              </span>
            </div>
            <p className="text-[11px] text-stone-500 leading-tight">
              {(isMarathi || isHindi)
                ? 'गोपनीय मनोवैज्ञानिक प्राथमिक उपचार एवं कानूनी अधिकार साथी'
                : 'Confidential Psychological First-Aid & Statutory Rights Companion'}
            </p>
          </div>
        </div>

        {/* Header Tools */}
        <div className="flex items-center gap-1.5">
          {/* Auto-read toggle */}
          <button
            onClick={() => {
              if (autoSpeak) stopSpeaking();
              setAutoSpeak((s) => !s);
            }}
            className={cn(
              'p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition border',
              autoSpeak
                ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-2xs'
                : 'bg-white hover:bg-stone-100 text-stone-500 border-stone-200'
            )}
            title={(isMarathi || isHindi) ? 'ऑटो-वॉइस वाचन ऑन/ऑफ' : 'Toggle auto-read aloud'}
          >
            {autoSpeak ? (
              <Volume2 className="w-4 h-4 text-amber-700" />
            ) : (
              <VolumeX className="w-4 h-4 text-stone-400" />
            )}
            <span className="hidden sm:inline text-[11px]">
              {autoSpeak ? ((isMarathi || isHindi) ? 'आवाज़ चालू' : 'Audio On') : ((isMarathi || isHindi) ? 'आवाज़' : 'Audio')}
            </span>
          </button>

          {/* Quick Grounding Button */}
          <button
            onClick={() => setShowGrounding((s) => !s)}
            className="p-2 rounded-xl bg-white hover:bg-stone-100 text-stone-600 border border-stone-200 text-xs font-medium transition flex items-center gap-1"
            title="5-4-3-2-1 Sensory Grounding"
          >
            <BookOpen className="w-4 h-4 text-teal-700" />
            <span className="hidden md:inline text-[11px]">5-4-3-2-1</span>
          </button>

          {/* Quick Breathing Button */}
          <button
            onClick={() => setShowBreathing((s) => !s)}
            className="p-2 rounded-xl bg-white hover:bg-stone-100 text-stone-600 border border-stone-200 text-xs font-medium transition flex items-center gap-1"
            title="Box Breathing Exercise"
          >
            <Wind className="w-4 h-4 text-teal-700" />
            <span className="hidden md:inline text-[11px]">{(isMarathi || isHindi) ? 'श्वास' : 'Breathe'}</span>
          </button>

          {/* Quick Relief Lookup */}
          <button
            onClick={() => setShowRelief((s) => !s)}
            className="p-2 rounded-xl bg-white hover:bg-stone-100 text-stone-600 border border-stone-200 text-xs font-medium transition flex items-center gap-1"
            title="SC/ST Statutory Relief Calculator"
          >
            <Scale className="w-4 h-4 text-amber-700" />
            <span className="hidden md:inline text-[11px]">{(isMarathi || isHindi) ? 'मुआवजा' : 'Relief'}</span>
          </button>

          {/* Reset Chat */}
          <button
            onClick={clearChat}
            className="p-2 rounded-xl bg-white hover:bg-stone-100 text-stone-400 hover:text-stone-700 border border-stone-200 transition"
            title="Start new conversation"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Modals/Tools Area */}
      {showGrounding && (
        <GroundingModal isHindi={isHindi} onClose={() => setShowGrounding(false)} />
      )}
      {showBreathing && (
        <BreathingModal isHindi={isHindi} onClose={() => setShowBreathing(false)} />
      )}
      {showRelief && (
        <ReliefCalculatorModal isHindi={isHindi} onClose={() => setShowRelief(false)} />
      )}

      {/* Ethical AI & Emergency Disclaimer Notice */}
      {!showGrounding && !showBreathing && !showRelief && (
        <div className="mx-3 mt-2 px-3 py-1.5 bg-amber-50/80 border border-amber-200/80 rounded-xl text-[11px] text-amber-900 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span>
              {(isMarathi || isHindi)
                ? 'सहाय मित्र एक AI साथी है। यह कानूनी या आपातकालीन पुलिस का विकल्प नहीं है।'
                : 'Sahay Mitra is an AI companion for emotional first aid and rights navigation.'}
            </span>
          </div>
          <a
            href="tel:14566"
            className="font-bold text-amber-950 underline hover:text-amber-800 shrink-0"
          >
            {(isMarathi || isHindi) ? 'संकट में 14566 मिलाएं' : 'Crisis? Dial 14566'}
          </a>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 transparent' }}
      >
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            msg={msg}
            isSpeaking={speakingMsgId === msg.id}
            onSpeak={() => speakText(msg.text, msg.id)}
            onStopSpeak={stopSpeaking}
            onAction={executeAction}
          />
        ))}

        {isTyping && <TypingIndicator isHindi={isHindi} />}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Carousel */}
      <div className="px-3 py-2 border-t border-stone-100 bg-stone-50/50 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
        {((isMarathi || isHindi) ? QUICK_PROMPTS_HI : QUICK_PROMPTS_EN).map((promptText) => (
          <button
            key={promptText}
            onClick={() => sendMessage(promptText)}
            disabled={isTyping}
            className="flex-shrink-0 px-3 py-1.5 rounded-full bg-white hover:bg-teal-50 hover:border-teal-300 border border-stone-200 text-stone-700 hover:text-teal-900 text-xs font-medium transition shadow-2xs whitespace-nowrap disabled:opacity-50"
          >
            {promptText}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="p-3 border-t border-stone-200 bg-white">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder={
                (isMarathi || isHindi)
                  ? 'अपनी बात या चिंता यहाँ लिखें… (Enter से भेजें)'
                  : 'Type your thoughts, fears, or questions here… (Enter to send)'
              }
              className={cn(
                'w-full resize-none rounded-xl border border-stone-300 px-3.5 py-2.5 pr-10',
                'text-sm text-stone-900 placeholder:text-stone-400',
                'focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-teal-700',
                'bg-white shadow-2xs transition leading-relaxed max-h-32'
              )}
            />

            <button
              onClick={toggleMic}
              type="button"
              className={cn(
                'absolute right-2.5 bottom-2.5 p-1 rounded-lg transition',
                micActive
                  ? 'text-rose-600 bg-rose-50 animate-pulse'
                  : 'text-stone-400 hover:text-teal-700'
              )}
              title={micActive ? 'Stop speech recognition' : 'Speak using microphone'}
            >
              {micActive ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
          </div>

          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || isTyping}
            className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center transition shadow-xs shrink-0',
              input.trim() && !isTyping
                ? 'bg-teal-800 hover:bg-teal-700 text-white cursor-pointer'
                : 'bg-stone-100 text-stone-300 cursor-not-allowed'
            )}
            title="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Emergency Footer Ribbon */}
        <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
          <div className="flex items-center gap-1.5 text-stone-600">
            <Lock className="w-3 h-3 text-emerald-600" />
            <span>{(isMarathi || isHindi) ? '100% गोपनीय एवं एन्क्रिप्टेड' : 'Encrypted & Confidential'}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-stone-400 hidden sm:inline">Helpline:</span>
            <a href="tel:14566" className="font-bold text-amber-800 hover:underline">
              14566 (Toll-Free)
            </a>
            <span className="text-stone-300">|</span>
            <a href="tel:112" className="font-bold text-rose-700 hover:underline">
              112 (Police)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ───────────────────── Message Bubble Component ─────────────────────── */
const MessageBubble: React.FC<{
  msg: Message;
  isSpeaking: boolean;
  onSpeak: () => void;
  onStopSpeak: () => void;
  onAction: (actionType: string) => void;
}> = ({ msg, isSpeaking, onSpeak, onStopSpeak, onAction }) => {
  if (msg.sender === 'system') {
    return (
      <div className="flex justify-center my-1">
        <div className="px-3.5 py-1.5 bg-rose-50 border border-rose-200 rounded-full text-xs text-rose-800 font-semibold flex items-center gap-1.5 shadow-2xs animate-pulse">
          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
          <span>{msg.text}</span>
        </div>
      </div>
    );
  }

  const isMitra = msg.sender === 'mitra';

  return (
    <div className={cn('flex gap-2.5', isMitra ? 'items-start' : 'items-end flex-row-reverse')}>
      {isMitra && (
        <div className="w-8 h-8 rounded-xl bg-teal-800 text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
          <MessageCircleHeart className="w-4 h-4 text-amber-300" />
        </div>
      )}

      <div
        className={cn(
          'max-w-[88%] sm:max-w-[78%] rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm leading-relaxed shadow-2xs relative group',
          isMitra
            ? msg.isEmergency
              ? 'bg-rose-50 border-2 border-rose-400 text-rose-950 rounded-tl-xs'
              : 'bg-white border border-stone-200 text-stone-900 rounded-tl-xs'
            : 'bg-teal-800 text-white rounded-br-xs'
        )}
      >
        {/* Mitra Header bar with TTS speaker button */}
        {isMitra && (
          <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-stone-100 text-[11px] text-stone-500">
            <span className="font-serif font-bold text-teal-900">
              Sahay Mitra (सहाय मित्र)
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={isSpeaking ? onStopSpeak : onSpeak}
                className={cn(
                  'px-2 py-0.5 rounded-md flex items-center gap-1 text-[10px] font-medium transition',
                  isSpeaking
                    ? 'bg-amber-200 text-amber-900 animate-pulse font-bold'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                )}
                title={isSpeaking ? 'Stop speech' : 'Listen to this response'}
              >
                {isSpeaking ? (
                  <VolumeX className="w-3 h-3 text-amber-900" />
                ) : (
                  <Volume2 className="w-3 h-3 text-teal-800" />
                )}
                <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Message Content */}
        <p className="whitespace-pre-wrap">{msg.text}</p>

        {/* Contextual Action Chips */}
        {msg.chips && msg.chips.length > 0 && (
          <div className="mt-3 pt-2.5 border-t border-stone-100 flex flex-wrap gap-1.5">
            {msg.chips.map((chip, i) => (
              <button
                key={i}
                onClick={() => onAction(chip.actionType)}
                className="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-900 font-semibold text-[11px] transition flex items-center gap-1 cursor-pointer"
              >
                <span>{chip.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <div
          className={cn(
            'text-[10px] mt-2 text-right',
            isMitra ? 'text-stone-400' : 'text-teal-200'
          )}
        >
          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

/* ───────────────────── Typing Indicator ─────────────────────── */
const TypingIndicator: React.FC<{ isHindi: boolean }> = ({ isHindi }) => (
  <div className="flex gap-2.5 items-start">
    <div className="w-8 h-8 rounded-xl bg-teal-800 text-white flex items-center justify-center shrink-0">
      <MessageCircleHeart className="w-4 h-4 text-amber-300" />
    </div>
    <div className="px-4 py-3 bg-white border border-stone-200 rounded-2xl rounded-tl-xs shadow-2xs">
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {[0, 200, 400].map((delay) => (
            <span
              key={delay}
              className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
        <span className="text-xs text-stone-500">
          {(false || isHindi) ? 'सहाय मित्र विचार कर रहे हैं…' : 'Sahay Mitra is reflecting…'}
        </span>
      </div>
    </div>
  </div>
);

/* ───────────────────── 5-4-3-2-1 Sensory Grounding Tool ─────────────────────── */
const GroundingModal: React.FC<{ isHindi: boolean; onClose: () => void }> = ({
  isHindi,
  onClose,
}) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      count: 5,
      icon: <Eye className="w-5 h-5 text-teal-700" />,
      title: '5 Things You Can See',
      titleHi: '5 चीजें जो आप देख सकते हैं',
      desc: 'Look around you right now. Spot 5 specific items: a shadow on the floor, a door handle, the color of your clothing, a light switch, or the sky.',
      descHi: 'अपने आस-पास देखें। कोई 5 वस्तुएं पहचानें: खिड़की, दीवार का रंग, दरवाजा, फर्श या पंखा।',
    },
    {
      count: 4,
      icon: <Hand className="w-5 h-5 text-indigo-700" />,
      title: '4 Things You Can Touch / Feel',
      titleHi: '4 चीजें जिन्हें आप छू या महसूस कर सकते हैं',
      desc: 'Notice the physical texture of your clothes, the coolness of the air on your hands, the weight of your feet pressing the ground, or your phone case.',
      descHi: 'अपने कपड़ों की बनावट, फर्श पर पैरों का वजन, कुर्सी का सहारा या हाथ की हथेली महसूस करें।',
    },
    {
      count: 3,
      icon: <Ear className="w-5 h-5 text-amber-700" />,
      title: '3 Sounds You Can Hear',
      titleHi: '3 आवाजें जो आप सुन सकते हैं',
      desc: 'Listen closely for distant sounds: birds outside, a passing vehicle, the hum of a fan, or the sound of your own quiet breath.',
      descHi: 'दूर की 3 आवाजें सुनें: पंखे की सरसराहट, किसी गाड़ी की आवाज या अपनी ही सांस।',
    },
    {
      count: 2,
      icon: <Wind className="w-5 h-5 text-purple-700" />,
      title: '2 Things You Can Smell',
      titleHi: '2 गंध जिन्हें आप महसूस कर सकते हैं',
      desc: 'Notice any scent in the air: soap, tea, rain on the earth, or the fresh clean air.',
      descHi: 'हवा में किसी गंध को पहचानें: साबुन, चाय, मिट्टी या ताजी हवा।',
    },
    {
      count: 1,
      icon: <Smile className="w-5 h-5 text-emerald-700" />,
      title: '1 Reassuring Truth About Yourself',
      titleHi: '1 सत्य जिसे आप जानते हैं',
      desc: 'Say this to yourself: "I survived the hardest days of my life. I am safe in this moment, and I am not alone."',
      descHi: 'खुद से कहें: "मैंने सबसे कठिन दिनों का सामना किया है। इस पल में मैं सुरक्षित हूँ और अकेला नहीं हूँ।"',
    },
  ];

  const current = steps[step];

  return (
    <div className="mx-3 mt-2 p-4 bg-teal-50/90 border border-teal-200 rounded-2xl relative shadow-xs">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-white"
        title="Close grounding guide"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-teal-800" />
        <h3 className="font-serif font-bold text-sm text-teal-950">
          {(false || isHindi) ? '5-4-3-2-1 संवेदी ग्राउंडिंग अभ्यास' : '5-4-3-2-1 Sensory Grounding Tool'}
        </h3>
        <span className="text-[11px] px-2 py-0.5 bg-teal-100 text-teal-900 rounded-full font-medium ml-auto mr-6">
          Step {step + 1} / 5
        </span>
      </div>

      <div className="bg-white rounded-xl p-3.5 border border-teal-100 shadow-2xs space-y-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center">
            {current.icon}
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-stone-900">
              {(false || isHindi) ? current.titleHi : current.title}
            </h4>
            <span className="text-[10px] text-stone-400">
              {current.count} sensory anchor points
            </span>
          </div>
        </div>

        <p className="text-xs text-stone-600 leading-relaxed pt-1">
          {(false || isHindi) ? current.descHi : current.desc}
        </p>
      </div>

      <div className="flex items-center justify-between mt-3 pt-1">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="px-3 py-1 rounded-lg text-xs font-semibold bg-white border border-stone-200 disabled:opacity-40"
        >
          {(false || isHindi) ? 'पिछला' : 'Previous'}
        </button>

        {step < steps.length - 1 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-teal-800 hover:bg-teal-700 text-white transition shadow-2xs"
          >
            {(false || isHindi) ? 'अगला कदम →' : 'Next Step →'}
          </button>
        ) : (
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white transition shadow-2xs flex items-center gap-1"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{(false || isHindi) ? 'पूरा हुआ (धन्यवाद)' : 'Complete (I feel calmer)'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

/* ───────────────────── Box Breathing Tool ─────────────────────── */
const BreathingModal: React.FC<{ isHindi: boolean; onClose: () => void }> = ({
  isHindi,
  onClose,
}) => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [cycleCount, setCycleCount] = useState(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const PHASES = [
    {
      name: 'Breathe In (Inhale)',
      nameHi: 'सांस अंदर लें',
      duration: 4000,
      color: 'bg-teal-500',
      scale: 'scale-125',
    },
    {
      name: 'Hold Gently',
      nameHi: 'सांस रोकें',
      duration: 2000,
      color: 'bg-amber-500',
      scale: 'scale-125',
    },
    {
      name: 'Breathe Out (Exhale)',
      nameHi: 'सांस धीरे-धीरे छोड़ें',
      duration: 6000,
      color: 'bg-indigo-500',
      scale: 'scale-90',
    },
    {
      name: 'Rest & Relax',
      nameHi: 'विश्राम करें',
      duration: 2000,
      color: 'bg-stone-400',
      scale: 'scale-100',
    },
  ];

  const runPhase = useCallback((idx: number, cycle: number) => {
    setPhaseIndex(idx);
    timerRef.current = setTimeout(() => {
      const nextIdx = (idx + 1) % PHASES.length;
      if (nextIdx === 0) {
        if (cycle >= 4) {
          setRunning(false);
          return;
        }
        setCycleCount(cycle + 1);
      }
      runPhase(nextIdx, nextIdx === 0 ? cycle + 1 : cycle);
    }, PHASES[idx].duration);
  }, []);

  const start = () => {
    setRunning(true);
    setCycleCount(1);
    runPhase(0, 1);
  };

  const stop = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setRunning(false);
    setPhaseIndex(0);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const cur = PHASES[phaseIndex];

  return (
    <div className="mx-3 mt-2 p-4 bg-slate-900 text-white rounded-2xl relative shadow-md">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 p-1 rounded-lg text-slate-400 hover:text-white"
        title="Close breathing exercise"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-2 mb-3">
        <Wind className="w-4 h-4 text-teal-400" />
        <h3 className="font-serif font-bold text-sm text-slate-100">
          {(false || isHindi) ? '4-2-6 शामक श्वास व्यायाम' : '4-2-6 Trauma Calming Breath'}
        </h3>
        {running && (
          <span className="text-[11px] text-teal-300 ml-auto mr-6">
            Cycle {cycleCount} / 4
          </span>
        )}
      </div>

      <div className="flex items-center justify-center py-4 gap-6">
        <div
          className={cn(
            'w-24 h-24 rounded-full flex items-center justify-center transition-all duration-1000 shadow-xl',
            running ? `${cur.color} ${cur.scale}` : 'bg-slate-800'
          )}
        >
          <Wind className={cn('w-8 h-8', running ? 'text-white' : 'text-slate-500')} />
        </div>

        <div className="space-y-1">
          <p className="text-base sm:text-lg font-bold text-white font-serif">
            {running ? ((false || isHindi) ? cur.nameHi : cur.name) : (false || isHindi) ? 'शुरू करने के लिए क्लिक करें' : 'Ready to begin'}
          </p>
          <p className="text-xs text-slate-300">
            {running
              ? (false || isHindi)
                ? 'शांत और लयबद्ध गति से पालन करें'
                : 'Follow the gentle rhythm to ease racing heartbeat'
              : (false || isHindi)
              ? '4 चक्र, धीमी और गहरी सांसें'
              : '4 soothing cycles of trauma-informed breath'}
          </p>
        </div>
      </div>

      <div className="flex justify-end pt-1">
        <button
          onClick={running ? stop : start}
          className={cn(
            'px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs',
            running
              ? 'bg-rose-600 hover:bg-rose-700 text-white'
              : 'bg-teal-500 hover:bg-teal-400 text-slate-950'
          )}
        >
          {running ? ((false || isHindi) ? 'रोकें' : 'Stop') : (false || isHindi) ? 'शुरू करें' : 'Start Calming Breath'}
        </button>
      </div>
    </div>
  );
};

/* ───────────────────── Statutory Relief Calculator Modal ─────────────────────── */
const ReliefCalculatorModal: React.FC<{ isHindi: boolean; onClose: () => void }> = ({
  isHindi,
  onClose,
}) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selected = RELIEF_SCALES[selectedIdx];

  return (
    <div className="mx-3 mt-2 p-4 bg-amber-50/90 border border-amber-300/80 rounded-2xl relative shadow-xs">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-white"
        title="Close relief calculator"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-2 mb-3">
        <Scale className="w-4 h-4 text-amber-800" />
        <h3 className="font-serif font-bold text-sm text-stone-900">
          {(false || isHindi)
            ? 'SC/ST अधिनियम वैधानिक मुआवजा कैलकुलेटर (नियम 12)'
            : 'SC/ST Act Statutory Relief Calculator (Rule 12)'}
        </h3>
      </div>

      {/* Select Category */}
      <div className="space-y-1 mb-3">
        <label className="text-[11px] font-semibold text-stone-600">
          {(false || isHindi) ? 'अत्याचार / घटना की श्रेणी चुनें:' : 'Select Atrocity / Offence Category:'}
        </label>
        <select
          value={selectedIdx}
          onChange={(e) => setSelectedIdx(Number(e.target.value))}
          className="w-full text-xs p-2 rounded-lg border border-amber-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          {RELIEF_SCALES.map((item, idx) => (
            <option key={idx} value={idx}>
              {(false || isHindi) ? item.categoryHi : item.category}
            </option>
          ))}
        </select>
      </div>

      {/* Result Card */}
      <div className="bg-white rounded-xl p-3.5 border border-amber-200 shadow-2xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-stone-500 font-medium">
            {(false || isHindi) ? 'वैधानिक राहत राशि' : 'Mandated Relief Scale'}
          </span>
          <span className="text-base font-bold text-emerald-800 font-mono">
            {selected.amount}
          </span>
        </div>

        <div className="pt-2 border-t border-stone-100 space-y-1">
          <p className="text-[11px] font-semibold text-stone-800">
            {(false || isHindi) ? 'भुगतान प्रक्रिया (नियम 12(4)):' : 'Mandatory Disbursement Timeline:'}
          </p>
          <p className="text-xs text-stone-600 leading-relaxed">{selected.schedule}</p>
        </div>
      </div>

      <p className="text-[10px] text-stone-500 mt-2">
        {(false || isHindi)
          ? '* यह राशि पीड़ित का कानूनी अधिकार है। जिला प्रशासन 7 दिनों में प्रथम किश्त देने के लिए बाध्य है।'
          : '* Guaranteed under the SC/ST (PoA) Amendment Rules, 2016. DM must release initial tranche within 7 days.'}
      </p>
    </div>
  );
};
