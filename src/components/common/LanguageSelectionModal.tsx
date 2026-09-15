import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import { Language } from '../../types';
import { Languages, Check, X, Globe } from 'lucide-react';

interface LanguageOption {
  code: Language;
  nativeName: string;
  englishName: string;
  tagline: Record<Language, string>;
  scriptSample: string;
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    code: 'te',
    nativeName: 'తెలుగు',
    englishName: 'Telugu',
    tagline: {
      te: 'గ్రామీణ ఆరోగ్య సేవలు, వైద్యుల సంప్రదింపులు మరియు మందుల వివరాలు తెలుగులో',
      hi: 'ग्रामीण स्वास्थ्य सेवाएँ और डॉक्टर परामर्श तेलुगु में',
      en: 'Rural healthcare services, consultations, and prescriptions in Telugu',
      mr: 'ग्रामीण आरोग्य सेवा आणि औषध माहिती तेलुगुमध्ये',
      bn: 'গ্রামীণ স্বাস্থ্যসেবা ও প্রেসক্রিপশন তেলুগুতে',
    },
    scriptSample: 'నమస్కారం • మీ ఆరోగ్యం మా బాధ్యత',
  },
  {
    code: 'hi',
    nativeName: 'हिन्दी',
    englishName: 'Hindi',
    tagline: {
      te: 'గ్రామీణ ఆరోగ్య సేవలు మరియు వైద్యుల సంప్రదింపులు హిందీలో',
      hi: 'ग्रामीण स्वास्थ्य सेवाएँ, डॉक्टर परामर्श और दवाइयों की पर्ची हिन्दी में',
      en: 'Rural healthcare services, doctor consultations, and prescriptions in Hindi',
      mr: 'ग्रामीण आरोग्य सेवा आणि औषध माहिती हिंदीत',
      bn: 'গ্রামীণ স্বাস্থ্যসেবা ও প্রেসক্রিপশন হিন্দিতে',
    },
    scriptSample: 'नमस्ते • आपका स्वास्थ्य हमारी प्राथमिकता',
  },
  {
    code: 'en',
    nativeName: 'English',
    englishName: 'English',
    tagline: {
      te: 'గ్రామీణ ఆరోగ్య సేవలు మరియు వైద్య రికార్డులు ఆంగ్లంలో',
      hi: 'ग्रामीण स्वास्थ्य सेवाएँ और मेडिकल रिकॉर्ड अंग्रेज़ी में',
      en: 'Complete rural telemedicine and health locker records in English',
      mr: 'ग्रामीण आरोग्य सेवा आणि नोंदी इंग्रजीत',
      bn: 'গ্রামীণ স্বাস্থ্যসেবা ও রেকর্ড ইংরেজিতে',
    },
    scriptSample: 'Welcome • Accessible Healthcare For Every Village',
  },
  {
    code: 'mr',
    nativeName: 'मराठी',
    englishName: 'Marathi',
    tagline: {
      te: 'గ్రామీణ ఆరోగ్య సేవలు మరాఠీలో',
      hi: 'ग्रामीण स्वास्थ्य सेवाएँ मराठी में',
      en: 'Rural healthcare and ASHA services in Marathi',
      mr: 'ग्रामीण आरोग्य सेवा, डॉक्टरांचा सल्ला आणि औषधे मराठीत',
      bn: 'গ্রামীণ স্বাস্থ্যসেবা মারাঠিতে',
    },
    scriptSample: 'नमस्कार • आपले आरोग्य आमचे ध्येय',
  },
  {
    code: 'bn',
    nativeName: 'বাংলা',
    englishName: 'Bengali',
    tagline: {
      te: 'గ్రామీణ ఆరోగ్య సేవలు బెంగాలీలో',
      hi: 'ग्रामीण स्वास्थ्य सेवाएँ बांग्ला में',
      en: 'Rural health records and doctor consultations in Bengali',
      mr: 'ग्रामीण आरोग्य सेवा बंगालीमध्ये',
      bn: 'গ্রামীণ স্বাস্থ্যসেবা, ডাক্তারের পরামর্শ ও প্রেসক্রিপশন বাংলায়',
    },
    scriptSample: 'নমস্কার • আপনার স্বাস্থ্য আমাদের অগ্রাধিকার',
  },
];

export const LanguageSelectionModal: React.FC<{
  isOpen: boolean;
  onClose?: () => void;
  canDismiss?: boolean;
}> = ({ isOpen, onClose, canDismiss = true }) => {
  const { language, setLanguage, role } = useApp();
  const [selectedLang, setSelectedLang] = useState<Language>(language);

  if (!isOpen) return null;
  // Doctors must never see language selector
  if (role === 'doctor' || role === 'admin') return null;

  const t = translations[selectedLang] || translations[language];

  const handleSelect = (lang: Language) => {
    setSelectedLang(lang);
    setLanguage(lang);
    if (onClose) onClose();
  };

  return (
    <div
      id="language-selection-overlay"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in"
    >
      <div
        id="language-selection-dialog"
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-5 sm:p-6 relative">
          {canDismiss && onClose && (
            <button
              id="close-language-modal-btn"
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-white">
              <Languages className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200">
                Nishchint Seva • నిశ్చింత్ సేవ
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {selectedLang === 'te'
                  ? 'మీ భాషను ఎంచుకోండి'
                  : selectedLang === 'hi'
                  ? 'अपनी भाषा चुनें'
                  : 'Choose Your Language'}
              </h2>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed mt-1">
            {t.selectLanguageSubtitle}
          </p>
        </div>

        {/* Language Options List */}
        <div className="p-4 sm:p-6 space-y-2.5 max-h-[60vh] overflow-y-auto">
          {LANGUAGE_OPTIONS.map((opt) => {
            const isSelected = selectedLang === opt.code;
            return (
              <button
                key={opt.code}
                id={`lang-opt-${opt.code}`}
                type="button"
                onClick={() => handleSelect(opt.code)}
                className={`w-full p-3.5 sm:p-4 rounded-xl border text-left transition-all flex items-center justify-between group cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-600/30 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50/80'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-colors ${
                      isSelected
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 group-hover:bg-emerald-100 group-hover:text-emerald-800'
                    }`}
                  >
                    {opt.code.toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-base sm:text-lg text-slate-900">
                        {opt.nativeName}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        ({opt.englishName})
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                      {opt.tagline[opt.code] || opt.tagline['en']}
                    </p>
                    <p className="text-[11px] text-emerald-700 font-medium mt-0.5">
                      {opt.scriptSample}
                    </p>
                  </div>
                </div>

                <div className="ml-3 shrink-0">
                  {isSelected ? (
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                      <Check className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border border-slate-300 group-hover:border-emerald-500" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Footer Notice */}
        <div className="bg-slate-50 border-t border-slate-200 p-3.5 sm:p-4 text-center">
          <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-emerald-700" />
            <span>
              {selectedLang === 'te'
                ? 'మీరు మీ ప్రొఫైల్ నుండి ఎప్పుడైనా భాషను మార్చుకోవచ్చు'
                : selectedLang === 'hi'
                ? 'आप अपनी प्रोफ़ाइल से कभी भी भाषा बदल सकते हैं'
                : 'You can change this language at any time in your profile'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
