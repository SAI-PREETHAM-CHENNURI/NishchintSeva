import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import { TriageUrgency } from '../../types';
import {
  Stethoscope,
  X,
  AlertTriangle,
  CheckCircle,
  Clock,
  ShieldAlert,
  ArrowRight,
  Flame,
  Activity,
  HeartCrack,
  Thermometer,
  Wind,
  PhoneCall,
} from 'lucide-react';

interface LocalizedSymptom {
  id: string;
  icon: string;
  defaultUrgency: TriageUrgency;
  labels: Record<string, string>;
}

const LOCALIZED_SYMPTOMS: LocalizedSymptom[] = [
  {
    id: 'fever',
    icon: '🌡️',
    defaultUrgency: 'yellow',
    labels: {
      en: 'High Fever / Shivering',
      hi: 'तेज बुखार / ठंड लगना',
      te: 'తీవ్రమైన జ్వరం / వణుకు',
      mr: 'तीव्र ताप / थंडी वाजणे',
      bn: 'তীব্র জ্বর / কাঁপুনি',
    },
  },
  {
    id: 'cough',
    icon: '🫁',
    defaultUrgency: 'yellow',
    labels: {
      en: 'Persistent Cough / Phlegm',
      hi: 'लगातार खांसी / बलगम',
      te: 'ఎడతెగని దగ్గు / కఫం',
      mr: 'सतत खोकला / कफ',
      bn: 'ক্রমাগত কাশি / কফ',
    },
  },
  {
    id: 'breath',
    icon: '💨',
    defaultUrgency: 'red',
    labels: {
      en: 'Shortness of Breath',
      hi: 'साँस फूलना / घबराहट',
      te: 'ఊపిరి ఆడకపోవడం / ఆయాసం',
      mr: 'श्वास घेण्यास त्रास / धाप',
      bn: 'শ্বাসকষ্ট / হাঁপ ধরা',
    },
  },
  {
    id: 'chest',
    icon: '🫀',
    defaultUrgency: 'red',
    labels: {
      en: 'Chest Pressure / Discomfort',
      hi: 'सीने में भारीपन या दर्द',
      te: 'ఛాతీలో నొప్పి లేదా బరువు',
      mr: 'छातीत जडपणा किंवा वेदना',
      bn: 'বুকে চাপ বা অস্বস্তি',
    },
  },
  {
    id: 'dizziness',
    icon: '💫',
    defaultUrgency: 'yellow',
    labels: {
      en: 'Dizziness / High BP feeling',
      hi: 'चक्कर आना / सिर घूमना',
      te: 'తలతిరగడం / అధిక బీపీ భావన',
      mr: 'भोवळ येणे / चक्कर',
      bn: 'মাথা ঘোরা / দুর্বল লাগা',
    },
  },
  {
    id: 'stomach',
    icon: '🤢',
    defaultUrgency: 'yellow',
    labels: {
      en: 'Abdominal Pain / Loose motions',
      hi: 'पेट में दर्द / दस्त',
      te: 'కడుపు నొప్పి / విరేచనాలు',
      mr: 'पोटदुखी / जुलाब',
      bn: 'পেটে ব্যথা / পাতলা পায়খানা',
    },
  },
  {
    id: 'joint',
    icon: '🦵',
    defaultUrgency: 'green',
    labels: {
      en: 'Joint Pain / Body Ache',
      hi: 'जोड़ों व शरीर में दर्द',
      te: 'కీళ్ల నొప్పులు / ఒళ్లు నొప్పులు',
      mr: 'सांधेदुखी / अंगदुखी',
      bn: 'গাঁটে ব্যথা / গা হাত পা ব্যথা',
    },
  },
  {
    id: 'rash',
    icon: '🩹',
    defaultUrgency: 'green',
    labels: {
      en: 'Skin Itching / Red Rashes',
      hi: 'त्वचा पर लाल दाने / खुजली',
      te: 'చర్మంపై దురద / దద్దుర్లు',
      mr: 'त्वचेवर खाज / लाल पुरळ',
      bn: 'ত্বকে চুলকানি / লাল ফুসকুড়ি',
    },
  },
];

export const SymptomTriageModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onProceedToDoctor: (complaint: string, priority: 'normal' | 'urgent' | 'emergency', triage: TriageUrgency) => void;
}> = ({ isOpen, onClose, onProceedToDoctor }) => {
  const { language, triggerEmergencySOS, currentPatient } = useApp();
  const t = translations[language];

  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(['dizziness']);
  const [durationDays, setDurationDays] = useState<string>('2-3 days');
  const [severity, setSeverity] = useState<'mild' | 'moderate' | 'severe'>('moderate');
  const [redFlags, setRedFlags] = useState<{
    chestPain: boolean;
    blueLips: boolean;
    unconscious: boolean;
    bloodInStool: boolean;
  }>({
    chestPain: false,
    blueLips: false,
    unconscious: false,
    bloodInStool: false,
  });

  const [triageEvaluated, setTriageEvaluated] = useState(false);

  if (!isOpen) return null;

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const hasRedFlag =
    redFlags.chestPain || redFlags.blueLips || redFlags.unconscious || selectedSymptoms.includes('chest');
  const isSevere = severity === 'severe' || selectedSymptoms.includes('breath');

  let urgency: TriageUrgency = 'green';
  let urgencyLabel = language === 'te'
    ? 'సాధారణ సంరక్షణ'
    : language === 'hi'
    ? 'सामान्य प्राथमिक देखभाल'
    : language === 'mr'
    ? 'नेहमीची काळजी'
    : language === 'bn'
    ? 'নিয়মিত প্রাথমিক যত্ন'
    : 'Routine Care';
  let colorClass = 'bg-emerald-50 border-emerald-300 text-emerald-900';
  let badgeColor = 'bg-emerald-600 text-white';
  let recommendedCare = language === 'te'
    ? 'ప్రాథమిక ఆరోగ్య కేంద్రం (PHC) టెలి-ఓపీడీ లేదా ఆశా కార్యకర్త సంప్రదింపు 48-72 గంటలలోపు సరిపోతుంది.'
    : language === 'hi'
    ? 'प्राथमिक स्वास्थ्य केंद्र (PHC) सामान्य टेली-ओपीडी या आशा कार्यकर्ता परामर्श (48-72 घंटों में)।'
    : language === 'mr'
    ? 'प्राथमिक आरोग्य केंद्र (PHC) टेलि-ओपीडी किंवा आशा ताईंशी ४८-७२ तासांत संपर्क साधा.'
    : language === 'bn'
    ? 'প্রাথমিক স্বাস্থ্য কেন্দ্র (PHC) সাধারণ টেলি-ওপিডি বা আশা কর্মীর পরামর্শ (৪৮-৭২ ঘণ্টার মধ্যে)।'
    : 'Primary Health Centre (PHC) Routine Tele-OPD or ASHA consultation within 48-72 hours.';
  let homeCare = language === 'te'
    ? [
        'పరిశుభ్రమైన, గాలి వెలుతురు ఉన్న గదిలో తగినంత విశ్రాంతి తీసుకోండి.',
        'కాచి చల్లార్చిన నీటిని లేదా క్లోరినేట్ చేసిన నీటిని క్రమం తప్పకుండా తాగండి.',
        'సులభంగా జీర్ణమయ్యే తేలికపాటి ఆహారం మాత్రమే తీసుకోండి.',
        'లక్షణాలు తగ్గకపోతే గ్రామ ఆశా కార్యకర్తను సంప్రదించండి.',
      ]
    : language === 'hi'
    ? [
        'साफ और हवादार कमरे में पर्याप्त विश्राम करें।',
        'उबला हुआ या सुरक्षित पानी नियमित पिएं।',
        'हल्का और सुपाच्य भोजन लें।',
        'यदि लक्षण न सुधरें तो गाँव की आशा कार्यकर्ता से संपर्क करें।',
      ]
    : language === 'mr'
    ? [
        'हवेशीर खोलीत पूर्ण विश्रांती घ्या.',
        'उकळून थंड केलेले पाणी नियमित प्या.',
        'हलका व पचायला सोपा आहार घ्या.',
        'लक्षणे न कमी झाल्यास आशा ताईंना कळवा.',
      ]
    : language === 'bn'
    ? [
        'খোলামেলা ঘরে পর্যাপ্ত বিশ্রাম নিন।',
        'ফোটানো বা বিশুদ্ধ জল নিয়মিত পান করুন।',
        'হালকা ও সহজপাচ্য খাবার খান।',
        'উপশম না হলে আশা কর্মীর সাথে যোগাযোগ করুন।',
      ]
    : [
        'Rest adequately in a clean, ventilated room.',
        'Drink safe boiled or chlorinated water regularly.',
        'Maintain a light, easily digestible diet.',
        'Follow up with village ASHA worker if symptoms do not improve.',
      ];

  if (hasRedFlag) {
    urgency = 'red';
    urgencyLabel = language === 'te'
      ? 'తీవ్రమైన అత్యవసర స్థాయి'
      : language === 'hi'
      ? 'गंभीर आपातकालीन स्तर'
      : language === 'mr'
      ? 'अतिदक्षता / तातडीचा स्तर'
      : language === 'bn'
      ? 'জরুরি চিকিৎসা প্রয়োজন'
      : 'Critical Attention Required';
    colorClass = 'bg-red-50 border-red-300 text-red-900';
    badgeColor = 'bg-red-600 text-white';
    recommendedCare = language === 'te'
      ? 'తక్షణ అత్యవసర స్పందన: వెంటనే 108 అంబులెన్స్‌ను పిలవండి లేదా సమీప సామాజిక ఆరోగ్య కేంద్రం / జిల్లా ఆసుపత్రి ఎమర్జెన్సీ విభాగానికి వెళ్లండి.'
      : language === 'hi'
      ? 'तुरंत १०८ एम्बुलेंस बुलाएं या नजदीकी स्वास्थ्य केंद्र आपातकालीन कक्ष जाएं।'
      : language === 'mr'
      ? 'त्वरित १०८ रुग्णवाहिका बोलवा किंवा नजीकच्या ग्रामीण रुग्णालय / जिल्हा रुग्णालयाच्या आपत्कालीन कक्षात जा.'
      : language === 'bn'
      ? 'অবিলম্বে ১০৮ নম্বরে কল করে অ্যাম্বুলেন্স ডাকুন বা নিকটস্থ হাসপাতালের জরুরি বিভাগে যান।'
      : 'Immediate Emergency Dispatch: Call 108 Ambulance or rush to nearest CHC/District Hospital Emergency Room.';
    homeCare = language === 'te'
      ? [
          'రోగిని అలసటకు గురిచేయవద్దు. నిటారుగా కూర్చోబెట్టండి.',
          'మెడ మరియు నడుము వద్ద ఉన్న బిగుతు దుస్తులను వదులు చేయండి.',
          'ఘనమైన, బరువైన ఆహారాన్ని తినిపించవద్దు.',
          'అత్యవసర వాహన సమన్వయం కోసం వెంటనే గ్రామ ఆశా కార్యకర్తను అప్రమత్తం చేయండి.',
        ]
      : language === 'hi'
      ? [
          'मरीज को चलाएं नहीं, सीधा बैठाकर रखें।',
          'गले और कमर के कसे हुए कपड़े ढीले करें।',
          'भारी या ठोस भोजन बिल्कुल न दें।',
          'एम्बुलेंस सहायता के लिए तुरंत आशा दीदी को सूचित करें।',
        ]
      : language === 'mr'
      ? [
          'रुग्णाला जास्त हालचाल करू देऊ नका, सरळ बसवून ठेवा.',
          'मानेभोवतीचे आणि कमरेचे कपडे सैल करा.',
          'जड अन्न खायला देऊ नका.',
          'रुग्णवाहिका समन्वयासाठी तात्काळ आशा ताईंना कळवा.',
        ]
      : language === 'bn'
      ? [
          'রোগীকে হাঁটাচলা করতে দেবেন না, সোজা বসিয়ে রাখুন।',
          'গলা ও কোমরের আঁটসাঁট পোশাক ঢিলে করে দিন।',
          'ভারী কোনো খাবার খেতে দেবেন না।',
          'জরুরি গাড়ির জন্য অবিলম্বে আশা কর্মীকে খবর দিন।',
        ]
      : [
          'Do not exert the patient. Keep them seated upright.',
          'Loosen all tight clothing around neck and waist.',
          'Do not give heavy solids to eat.',
          'Alert village ASHA worker immediately for emergency vehicle coordination.',
        ];
  } else if (isSevere || selectedSymptoms.includes('fever') || selectedSymptoms.includes('stomach') || selectedSymptoms.includes('dizziness')) {
    urgency = 'yellow';
    urgencyLabel = language === 'te'
      ? 'మధ్యస్థ ప్రాధాన్యత (వైద్య సంప్రదింపు సిఫార్సు చేయబడింది)'
      : language === 'hi'
      ? 'मध्यम प्राथमिकता (चिकित्सक परामर्श अनुशंसित)'
      : language === 'mr'
      ? 'मध्यम प्राधान्य (डॉक्टरांचा सल्ला आवश्यक)'
      : language === 'bn'
      ? 'মাঝারি সতর্কতা (ডাক্তারি পরামর্শ প্রয়োজন)'
      : 'Moderate Urgency - Doctor Review Recommended';
    colorClass = 'bg-amber-50 border-amber-300 text-amber-900';
    badgeColor = 'bg-amber-600 text-white';
    recommendedCare = language === 'te'
      ? 'ధృవీకరించబడిన వైద్యులతో ఈరోజే టెలి-ఓపీడీ సంప్రదింపు తీసుకోండి (12-24 గంటలలోపు).'
      : language === 'hi'
      ? 'आज ही सत्यापित डॉक्टर से टेली-ओपीडी परामर्श लें (१२-२४ घंटों में)।'
      : language === 'mr'
      ? 'आजच अधिकृत डॉक्टरांशी टेलि-ओपीडी तपासणी करून घ्या (१२-२४ तासांत).'
      : language === 'bn'
      ? 'আজই অনুমোদিত ডাক্তারের সাথে টেলি-ওপিডি পরামর্শ নিন (১২-২৪ ঘণ্টার মধ্যে)।'
      : 'Tele-OPD consultation with Verified Doctor recommended today (within 12-24 hours).';
    homeCare = language === 'te'
      ? [
          'ఆశా డిజిటల్ కిట్ ఉపయోగించి రక్తపోటు (బీపీ) మరియు శరీర ఉష్ణోగ్రతను నమోదు చేయండి.',
          'ORS లేదా గోరువెచ్చని నీటితో శరీరాన్ని హైడ్రేట్ గా ఉంచండి.',
          'వైద్యుల సలహా లేకుండా బలమైన యాంటీబయాటిక్స్ వాడవద్దు.',
          'క్రింద ఉన్న ఆన్‌లైన్ డాక్టర్ క్యూ ద్వారా సంప్రదింపు పొందండి.',
        ]
      : language === 'hi'
      ? [
          'आशा डिजिटल किट से रक्तचाप (बीपी) और तापमान मापें।',
          'ओआरएस घोल या गुनगुना पानी पिएं।',
          'बिना पर्ची के तेज दवाइयां या एंटीबायोटिक न लें।',
          'नीचे दिए गए डॉक्टर परामर्श से जुड़ें।',
        ]
      : language === 'mr'
      ? [
          'आशा किटद्वारे रक्तदाब व तापमान मोजा.',
          'ओआरएस किंवा कोमट पाणी पिऊन शरीरातील पाण्याचे प्रमाण ठेवा.',
          'स्वतःच्या मनाने तीव्र औषधे घेऊ नका.',
          'खालील ऑनलाइन डॉक्टरांशी संपर्क साधा.',
        ]
      : language === 'bn'
      ? [
          'আশা কিটের মাধ্যমে রক্তচাপ ও তাপমাত্রা মেপে নিন।',
          'ওআরএস বা হালকা গরম জল পান করুন।',
          'ডাক্তারের পরামর্শ ছাড়া কড়া ওষুধ খাবেন না।',
          'নিচে দেওয়া ডাক্তারের সাথে সরাসরি পরামর্শ করুন।',
        ]
      : [
          'Record vitals (Blood Pressure and Temperature) using ASHA digital kit.',
          'Continue light hydration with ORS or warm water.',
          'Avoid taking over-the-counter strong antibiotics or unverified remedies.',
          'Connect with online doctor queue below.',
        ];
  }

  const handleEvaluate = () => {
    setTriageEvaluated(true);
  };

  const handleProceed = () => {
    const symptomNames = selectedSymptoms
      .map((id) => {
        const item = LOCALIZED_SYMPTOMS.find((s) => s.id === id);
        return item ? item.labels[language] || item.labels['en'] : id;
      })
      .join(', ');

    const complaint = `${symptomNames} (${durationDays}, ${severity}). Patient: ${currentPatient.name}`;
    const priority = urgency === 'red' ? 'emergency' : urgency === 'yellow' ? 'urgent' : 'normal';

    onProceedToDoctor(complaint, priority, urgency);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-emerald-800 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <Stethoscope className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{t.symptomCheck}</h3>
              <p className="text-xs text-emerald-200">
                {t.symptomCheckSub}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Safety Disclaimer Banner */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 text-xs text-slate-700 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>
            <strong>{t.safetyNotice}</strong>
          </span>
        </div>

        {/* Form Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {!triageEvaluated ? (
            <>
              {/* Step 1: Select symptoms */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  1. {t.chiefComplaint}:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5">
                  {LOCALIZED_SYMPTOMS.map((s) => {
                    const isSelected = selectedSymptoms.includes(s.id);
                    const label = s.labels[language] || s.labels['en'];
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => toggleSymptom(s.id)}
                        className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-semibold shadow-xs ring-1 ring-emerald-600'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-xl shrink-0">{s.icon}</span>
                        <div>
                          <p className="text-xs sm:text-sm font-semibold">{label}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Duration & Severity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    2. {t.triageDurationLabel}:
                  </label>
                  <select
                    value={durationDays}
                    onChange={(e) => setDurationDays(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value={t.durationTodayMorning}>{t.durationTodayMorning}</option>
                    <option value={t.duration2to3Days}>{t.duration2to3Days}</option>
                    <option value={t.duration1Week}>{t.duration1Week}</option>
                    <option value={t.duration2WeeksPlus}>{t.duration2WeeksPlus}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    3. {t.triageSeverityLabel}:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'mild', label: t.severityMild },
                      { key: 'moderate', label: t.severityModerate },
                      { key: 'severe', label: t.severitySevere },
                    ].map((sev) => (
                      <button
                        key={sev.key}
                        type="button"
                        onClick={() => setSeverity(sev.key as 'mild' | 'moderate' | 'severe')}
                        className={`py-2 text-xs font-bold rounded-xl transition-all border cursor-pointer ${
                          severity === sev.key
                            ? sev.key === 'severe'
                              ? 'bg-red-600 text-white border-red-700'
                              : 'bg-emerald-700 text-white border-emerald-800'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {sev.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 3: Red Flags Checklist */}
              <div className="bg-red-50/70 border border-red-200 rounded-xl p-3.5">
                <span className="text-xs font-bold text-red-900 flex items-center gap-1.5 mb-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  {t.redFlagsLabel}:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-800">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={redFlags.chestPain}
                      onChange={(e) => setRedFlags({ ...redFlags, chestPain: e.target.checked })}
                      className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                    />
                    <span>{t.redFlagChestPain}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={redFlags.blueLips}
                      onChange={(e) => setRedFlags({ ...redFlags, blueLips: e.target.checked })}
                      className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                    />
                    <span>{t.redFlagBlueLips}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={redFlags.unconscious}
                      onChange={(e) => setRedFlags({ ...redFlags, unconscious: e.target.checked })}
                      className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                    />
                    <span>{t.redFlagUnconscious}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={redFlags.bloodInStool}
                      onChange={(e) => setRedFlags({ ...redFlags, bloodInStool: e.target.checked })}
                      className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                    />
                    <span>{t.redFlagBloodInStool}</span>
                  </label>
                </div>
              </div>

              <button
                type="button"
                onClick={handleEvaluate}
                disabled={selectedSymptoms.length === 0}
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold rounded-xl shadow-md transition-transform active:scale-[0.99] flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <span>{t.calculateTriageBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            /* Triage Evaluation Result */
            <div className="space-y-4">
              <div className={`p-4 rounded-2xl border-2 ${colorClass}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide ${badgeColor}`}>
                    {urgency.toUpperCase()}
                  </span>
                  <span className="text-xs font-semibold text-slate-600">{t.decisionSupportSystem}</span>
                </div>
                <h4 className="text-base sm:text-lg font-black mt-1">{urgencyLabel}</h4>
                <p className="text-xs sm:text-sm mt-2 font-medium leading-relaxed">
                  <strong>{t.recommendedLevelOfCare}:</strong> {recommendedCare}
                </p>
              </div>

              {/* Emergency Action if Red */}
              {urgency === 'red' && (
                <div className="bg-red-600 text-white p-4 rounded-xl flex items-center justify-between gap-3">
                  <div>
                    <p className="font-extrabold text-sm">{t.criticalEmergencyBanner}</p>
                    <p className="text-xs text-red-100">{t.ambulance108}</p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      triggerEmergencySOS();
                    }}
                    className="px-4 py-2 bg-white text-red-700 font-extrabold text-xs rounded-lg shrink-0 shadow-xs cursor-pointer"
                  >
                    {t.dial108Now}
                  </button>
                </div>
              )}

              {/* Primary Home Care Guidance */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <h5 className="font-bold text-xs uppercase text-slate-700 tracking-wider mb-2">
                  {t.homeCareGuidance}:
                </h5>
                <ul className="space-y-2 text-xs text-slate-700">
                  {homeCare.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setTriageEvaluated(false)}
                  className="px-4 py-2.5 border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  ← {t.symptomCheck}
                </button>
                <button
                  type="button"
                  onClick={handleProceed}
                  className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-extrabold rounded-xl shadow-md transition-transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{t.proceedToDoctorBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
