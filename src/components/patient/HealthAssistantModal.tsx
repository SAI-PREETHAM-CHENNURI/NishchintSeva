import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import {
  Sparkles,
  X,
  Send,
  Volume2,
  VolumeX,
  ShieldCheck,
  AlertTriangle,
  Bot,
  User,
  HelpCircle,
  PhoneCall,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  timestamp: string;
  isWarning?: boolean;
}

const KNOWLEDGE_RESPONSES: Record<string, Record<string, string>> = {
  fever: {
    en: 'General Fever Guidance: Ensure adequate hydration with clean boiled water, ORS, or light soups. Rest in a well-ventilated room. Use a clean cloth damp with room-temperature water on the forehead. DO NOT give adult medications or aspirin to children without a doctor’s order. If fever lasts >48 hours, exceeds 102°F, or is accompanied by severe rash, stiff neck, or vomiting, see a doctor immediately.',
    hi: 'बुखार के लिए सामान्य देखभाल: पर्याप्त मात्रा में उबला पानी, ओआरएस या दाल का पानी पिएं। हवादार कमरे में आराम करें। माथे पर सामान्य पानी की ठंडी पट्टी रखें। डॉक्टर की सलाह के बिना बच्चों को कोई भी दवा न दें। यदि बुखार 48 घंटे से अधिक रहे या 102°F से ऊपर जाए, तो तुरंत प्राथमिक स्वास्थ्य केंद्र जाएं।',
    te: 'జ్వరం సంరక్షణ మార్గదర్శకాలు: కాచి చల్లార్చిన నీరు, ORS లేదా తేలికపాటి ఆహారం పుష్కలంగా తీసుకోవాలి. గాలి వెలుతురు ఉన్న గదిలో విశ్రాంతి తీసుకోండి. నుదుటిపై చల్లటి గుడ్డతో తుడవండి. డాక్టర్ సలహా లేకుండా పిల్లలకు పెద్దల మందులు ఇవ్వవద్దు. జ్వరం 48 గంటలకు మించి ఉంటే లేదా 102°F కంటే ఎక్కువ ఉంటే వెంటనే ఆసుపత్రికి వెళ్లండి.',
    mr: 'तापासाठी काळजी: उकळलेले स्वच्छ पाणी, ओआरएस किंवा पातळ सूप भरपूर प्या. हवेशीर खोलीत विश्रांती घ्या. कपाळावर साध्या पाण्याच्या घड्या ठेवा. डॉक्टरांच्या सल्ल्याशिवाय मुलांना कोणतीही औषधे देऊ नका. ताप ४८ तासांपेक्षा जास्त राहिल्यास लगेच प्राथमिक आरोग्य केंद्रात जा.',
    bn: 'জ্বরের যত্ন সংক্রান্ত নির্দেশিকা: প্রচুর পরিমাণে ফুটিয়ে ঠান্ডা করা জল, ওআরএস বা হালকা খাবার খান। বাতাসযুক্ত ঘরে বিশ্রাম নিন। কপালে পরিষ্কার ভেজা কাপড়ের পট্টি দিন। ডাক্তারের পরামর্শ ছাড়া শিশুদের কোনো ওষুধ দেবেন না। জ্বর ৪৮ ঘণ্টার বেশি থাকলে অবিলম্বে স্বাস্থ্যকেন্দ্রে যান।',
  },
  bp: {
    en: 'High Blood Pressure Management: Limit dietary salt to less than 1 level teaspoon (5g) per day. Avoid pickles, papad, and salted packaged snacks. Take brisk morning walks for 20-30 minutes. Take prescribed antihypertensives at the same time every day. Have your ASHA worker check your BP weekly. If you feel severe chest heaviness or sudden blurry vision, seek emergency care.',
    hi: 'हाई ब्लड प्रेशर (उच्च रक्तचाप) सलाह: रोज़ाना नमक का सेवन कम करें (1 चम्मच से कम)। अचार, पापड़ और ज्यादा तेल वाले भोजन से बचें। रोज़ 20-30 मिनट टहलें। डॉक्टर द्वारा दी गई दवा हर दिन समय पर लें। आशा दीदी से हर हफ्ते बीपी जाँच करवाएं।',
    te: 'రక్తపోటు (బీపీ) నిర్వహణ: రోజువారీ ఆహారంలో ఉప్పు తగ్గించండి. ఊరగాయలు, అప్పడాలు తగ్గించండి. రోజూ 20-30 నిమిషాలు నడవండి. డాక్టర్ సూచించిన మందులను సమయానికి తీసుకోండి. క్రమం తప్పకుండా బీపీ తనిఖీ చేయించుకోండి.',
    mr: 'उच्च रक्तदाब व्यवस्थापन: रोजच्या आहारात मिठाचे प्रमाण कमी करा. लोणचे, पापड टाळा. दररोज २०-३० मिनिटे चाला. डॉक्टरांनी दिलेली औषधे वेळेवर घ्या. दर आठवड्याला आशा सेविकेकडून रक्तदाब तपासा.',
    bn: 'উচ্চ রক্তচাপ নিয়ন্ত্রণ: খাবারে লবণের পরিমাণ সীমিত রাখুন। আচার ও ভাজাভুজি এড়িয়ে চলুন। প্রতিদিন সকালে ২০-৩০ মিনিট হাঁটুন। নিয়মিত ডাক্তারের নির্দেশিত ওষুধ খান এবং আশা কর্মীর মাধ্যমে রক্তচাপ মাপান।',
  },
  anemia: {
    en: 'Anemia & Iron Care: Consume iron-rich foods such as green leafy vegetables (palak, methi), jaggery (gud), roasted chana, drumsticks (sahjan), and pulses. Take Iron-Folic Acid (IFA) tablets supplied by your ASHA worker with lemon water or amla (Vitamin C helps iron absorption). Avoid tea or coffee immediately before or after meals.',
    hi: 'खून की कमी (एनीमिया) और पोषण: हरी पत्तेदार सब्जियां (पालक, मेथी), गुड़, भुना चना, सहजन और दालें खाएं। आशा दीदी द्वारा दी जाने वाली आयरन की गोलियां नींबू पानी या आंवले के साथ लें (विटामिन सी से आयरन जल्दी पचता है)। खाने के तुरंत बाद चाय न पिएं।',
    te: 'రక్తహీనత (ఎనీమియా) సంరక్షణ: ఆకుకూరలు (పాలకూర), బెల్లం, వేయించిన శనగలు మరియు పప్పుధాన్యాలు ఎక్కువగా తినండి. ఆశా కార్యకర్త ఇచ్చే ఐరన్-ఫోలిక్ యాసిడ్ మాత్రలను నిమ్మరసంతో కలిపి తీసుకోండి. భోజనానికి ముందు లేదా తర్వాత టీ, కాఫీలు తాగవద్దు.',
    mr: 'अ‍ॅनिमिया (रक्ताची कमतरता) काळजी: हिरव्या पालेभाज्या, गूळ, भाजलेले चणे आणि डाळी खा. आशा कार्यकर्त्यांनी दिलेल्या आयर्न-फोलिक अ‍ॅसिड गोळ्या लिंबू पाण्यास सोबत घ्या. जेवणानंतर लगेच चहा पिणे टाळा.',
    bn: 'রক্তস্বল্পতা ও পুষ্টি: শাকসবজি (পালং শাক), গুড়, ছোলা ও ডাল প্রচুর পরিমাণে খান। আশা কর্মীর থেকে প্রাপ্ত আয়রন ট্যাবলেট লেবুর জলের সাথে খান। খাওয়ার পরপরই চা বা কফি পান করবেন না।',
  },
  water: {
    en: 'Safe Drinking Water & Diarrhea Prevention: Boil drinking water vigorously for at least 1 minute or use chlorine purification tablets. For loose motions/vomiting, start ORS (Oral Rehydration Solution) immediately after every loose stool. Continue feeding breastmilk to infants. Avoid raw or unwashed street vegetables. Seek urgent medical attention if stool contains blood or if child is unusually lethargic.',
    hi: 'सुरक्षित पेयजल व दस्त से बचाव: पीने के पानी को कम से कम 1 मिनट तक अच्छी तरह उबालें। दस्त या उल्टी होने पर हर बार शौच के बाद ओआरएस का घोल पिएं। छोटे बच्चों को स्तनपान जारी रखें। यदि दस्त में खून आए या बच्चा बहुत सुस्त हो, तो तुरंत अस्पताल ले जाएं।',
    te: 'సురక్షిత తాగునీరు & విరేచనాల నివారణ: తాగునీటిని కనీసం 1 నిమిషం పాటు బాగా మరిగించండి. విరేచనాలు లేదా వాంతులు వచ్చినప్పుడు వెంటనే ORS ద్రావణం తాగండి. శిశువులకు తల్లిపాలు ఇవ్వడం కొనసాగించండి.',
    mr: 'स्वच्छ पिण्याचे पाणी व अतिसार प्रतिबंध: पिण्याचे पाणी कमीतकमी १ मिनिट उकळा. जुलाब किंवा उलट्या झाल्यास प्रत्येक वेळी ओआरएस द्रावण प्या. बाळाला स्तनपान सुरू ठेवा.',
    bn: 'বিশুদ্ধ পানীয় জল ও ডায়রিয়া প্রতিরোধ: জল অন্তত ১ মিনিট ভালো করে ফুটিয়ে পান করুন। পাতলা পায়খানা বা বমি হলে অবিলম্বে ওআরএস দ্রবণ পান করুন। শিশুদের বুকের দুধ খাওয়ানো চালিয়ে যান।',
  },
  emergency: {
    en: 'EMERGENCY ADVISORY: Severe symptoms like chest crushing pain, sudden shortness of breath, snakebite, heavy bleeding, or loss of consciousness require immediate medical evaluation! Please click the red "EMERGENCY 108" button at the top to call an ambulance and alert your nearest PHC and village ASHA.',
    hi: 'आपातकालीन चेतावनी: सीने में तेज दर्द, साँस फूलना, सर्पदंश या बेहोशी जैसी स्थिति में तुरंत अस्पताल जाना आवश्यक है! कृपया ऊपर दिए गए लाल "आपातकाल 108" बटन पर क्लिक करके एम्बुलेंस बुलाएं।',
    te: 'అత్యవసర హెచ్చరిక: ఛాతీలో తీవ్రమైన నొప్పి, ఊపిరి ఆడకపోవడం లేదా స్పృహ తప్పడం వంటి లక్షణాలు ఉంటే వెంటనే ఆసుపత్రికి వెళ్లండి! దయచేసి ఎగువన ఉన్న ఎరుపు "ఎమర్జెన్సీ 108" బటన్‌పై క్లిక్ చేయండి.',
    mr: 'तातडीचा इशारा: छातीत तीव्र वेदना, श्वास घेण्यास त्रास होणे किंवा बेशुद्ध पडणे यासारख्या लक्षणांसाठी त्वरित वैद्यकीय उपचारांची आवश्यकता आहे! कृपया रुग्णवाहिका बोलवण्यासाठी लाल "इमर्जन्सी १०८" बटणावर क्लिक करा.',
    bn: 'জরুরি সতর্কতা: বুকে প্রচণ্ড ব্যথা, শ্বাসকষ্ট বা অজ্ঞান হয়ে যাওয়ার মতো লক্ষণে অবিলম্বে হাসপাতালে যান! অ্যাম্বুলেন্স ডাকতে অনুগ্রহ করে লাল "জরুরি ১০৮" বোতামটি ব্যবহার করুন।',
  },
};

export const HealthAssistantModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { language, triggerEmergencySOS } = useApp();
  const t = translations[language];

  const getGreeting = () => {
    switch (language) {
      case 'hi':
        return 'नमस्ते! मैं आपका निश्चिंत स्वास्थ्य सहायक हूँ। मैं स्वास्थ्य जागरूकता और प्राथमिक देखभाल में आपकी मदद कर सकता हूँ। आप क्या पूछना चाहते हैं?';
      case 'te':
        return 'నమస్కారం! నేను మీ నిశ్చింత ఆరోగ్య సహాయకుడిని. రోజువారీ ఆరోగ్యం మరియు నివారణ సంరక్షణ గురించి మీకు సహాయం చేస్తాను. ఈరోజు నేను మీకు ఎలా సహాయపడగలను?';
      case 'mr':
        return 'नमस्कार! मी तुमचा निश्चिंत आरोग्य सहाय्यक आहे. मी आरोग्य शिक्षण आणि दैनंदिन काळजी यामध्ये मदत करू शकतो. मी तुम्हाला कशी मदत करू?';
      case 'bn':
        return 'নমস্কার! আমি আপনার নিশ্চিন্ত স্বাস্থ্য সহায়ক। আমি সাধারণ স্বাস্থ্য শিক্ষা এবং প্রাথমিক পরিচর্যায় আপনাকে সাহায্য করতে পারি। আমি আপনাকে কীভাবে সাহায্য করতে পারি?';
      default:
        return 'Namaste! I am your Nishchint Health Assistant. I provide health education, preventive care tips, and daily wellness guidance. How can I help you today?';
    }
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: getGreeting(),
      timestamp: 'Just now',
    },
  ]);

  // Update initial message greeting if language changes
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].sender === 'assistant') {
        return [
          {
            id: 'msg-1',
            sender: 'assistant',
            text: getGreeting(),
            timestamp: 'Just now',
          },
        ];
      }
      return prev;
    });
  }, [language]);

  const [inputQuery, setInputQuery] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const quickPrompts = [
    { key: 'fever', label: t.symptomFever },
    { key: 'bp', label: t.bloodPressure },
    { key: 'anemia', label: t.anemiaNutrition },
    { key: 'water', label: t.cleanDrinkingWater },
  ];

  const handleSend = (textToSend?: string, keyMatch?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');

    const lower = query.toLowerCase();
    let topic = keyMatch || '';

    if (!topic) {
      if (lower.includes('fever') || lower.includes('bukhar') || lower.includes('temperature') || lower.includes('ताप') || lower.includes('జ్వరం') || lower.includes('জ্বর')) topic = 'fever';
      else if (lower.includes('bp') || lower.includes('pressure') || lower.includes('salt') || lower.includes('नमक') || lower.includes('బీపీ') || lower.includes('రక్తపోటు') || lower.includes('রক্তচাপ')) topic = 'bp';
      else if (lower.includes('anemia') || lower.includes('iron') || lower.includes('khoon') || lower.includes('खून') || lower.includes('రక్తహీనత') || lower.includes('রক্তস্বল্পতা')) topic = 'anemia';
      else if (lower.includes('water') || lower.includes('paani') || lower.includes('diarrhea') || lower.includes('पानी') || lower.includes('दस्त') || lower.includes('నీరు') || lower.includes('విరేచనాలు') || lower.includes('জল')) topic = 'water';
      else if (lower.includes('chest') || lower.includes('heart') || lower.includes('emergency') || lower.includes('snake') || lower.includes('ఛాతీ') || lower.includes('గుండె') || lower.includes('জরুরি')) topic = 'emergency';
    }

    setTimeout(() => {
      let reply = '';
      let isAlert = false;

      if (topic && KNOWLEDGE_RESPONSES[topic]) {
        reply = KNOWLEDGE_RESPONSES[topic][language] || KNOWLEDGE_RESPONSES[topic]['en'];
        isAlert = topic === 'emergency';
      } else {
        if (language === 'hi') {
          reply = 'धन्यवाद। इस समस्या के लिए सबसे अच्छा है कि आप हमारे टेली-ओपीडी के माध्यम से सत्यापित डॉक्टर से बात करें या अपनी आशा दीदी से परामर्श लें। स्वच्छ पानी, साफ-सफाई और पौष्टिक भोजन का ध्यान रखें।';
        } else if (language === 'te') {
          reply = 'ధన్యవాదాలు. ఈ లక్షణం కొరకు మన టెలి-ఓపీడీ ద్వారా డాక్టర్‌ను లేదా మీ గ్రామ ఆశా కార్యకర్తను సంప్రదించడం మంచిది.';
        } else if (language === 'mr') {
          reply = 'धन्यवाद. या समस्येसाठी टेली-ओपीडीद्वारे डॉक्टरांचा सल्ला घ्या किंवा आशा सेविकेशी बोला.';
        } else if (language === 'bn') {
          reply = 'ধন্যবাদ। এই সমস্যার জন্য টেলি-ওপিডির মাধ্যমে ডাক্তারের সাথে কথা বলুন বা আপনার আশা কর্মীর পরামর্শ নিন।';
        } else {
          reply = 'Thank you for asking. For this symptom or query, it is best to consult a verified doctor via our Tele-OPD service or ask your village ASHA worker during home visits. Maintaining proper hygiene, clean hydration, and a balanced diet is always recommended.';
        }
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: 'Just now',
        isWarning: isAlert,
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 400);
  };

  const handleSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[85vh] max-h-[720px]">
        {/* Assistant Header */}
        <div className="bg-gradient-to-r from-teal-700 to-emerald-800 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-white">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg">{t.healthAssistant}</h3>
                <span className="text-[10px] bg-emerald-500/30 text-emerald-100 px-2 py-0.5 rounded-full border border-emerald-400/40">
                  {t.aiGuidanceBadge}
                </span>
              </div>
              <p className="text-xs text-emerald-100/90">
                {t.healthAssistantSub}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (isSpeaking && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
              onClose();
            }}
            className="p-2 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Healthcare Safety Disclaimer */}
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-900 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>{t.safetyNotice}</strong>
            </span>
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/60">
          {messages.map((msg) => {
            const isBot = msg.sender === 'assistant';

            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${isBot ? 'justify-start' : 'justify-end'}`}
              >
                {isBot && (
                  <div className="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                    isBot
                      ? msg.isWarning
                        ? 'bg-red-50 border border-red-200 text-red-900'
                        : 'bg-white border border-slate-200 text-slate-800'
                      : 'bg-emerald-700 text-white font-medium'
                  }`}
                >
                  <p>{msg.text}</p>
                  {isBot && (
                    <div className="mt-2 pt-1 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{msg.timestamp}</span>
                      <button
                        onClick={() => handleSpeech(msg.text)}
                        className="flex items-center gap-1 text-teal-700 hover:text-teal-900 font-medium px-2 py-0.5 rounded bg-teal-50 cursor-pointer"
                        title={t.listenAudio}
                      >
                        {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                        <span>{t.listenAudio}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>

        {/* Quick Question Prompts */}
        <div className="p-2.5 bg-slate-100 border-t border-slate-200 overflow-x-auto flex gap-2">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(qp.label, qp.key)}
              className="text-xs bg-white text-slate-700 px-3 py-1.5 rounded-xl border border-slate-300 hover:border-teal-500 hover:text-teal-800 font-medium whitespace-nowrap shadow-2xs transition-all shrink-0 cursor-pointer"
            >
              {qp.label}
            </button>
          ))}
        </div>

        {/* Message Input Box */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.enterSymptomsPlaceholder}
            className="flex-1 text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputQuery.trim()}
            className="p-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white rounded-xl transition-colors shrink-0 shadow-xs cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
