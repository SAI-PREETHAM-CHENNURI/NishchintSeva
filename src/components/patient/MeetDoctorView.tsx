import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import { Doctor, Language } from '../../types';
import {
  Stethoscope,
  Video,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Clock,
  ShieldCheck,
  Star,
  Globe,
  UserCheck,
  Sparkles,
  AlertCircle,
  MessageSquare,
  FileCheck2,
  PhoneCall,
  Wifi,
  Bot,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Check,
  ChevronRight,
  MapPin,
  Calendar,
  Building2,
  Volume2,
} from 'lucide-react';

interface MatchedSpecialistInfo {
  specialty: string;
  categoryKey: string;
  rationale: string;
  urgency: 'normal' | 'urgent' | 'emergency';
  triageCategory: 'green' | 'yellow' | 'red';
  isEmergency: boolean;
}

export const MeetDoctorView: React.FC = () => {
  const {
    doctors,
    currentPatient,
    activeAppointment,
    bookAppointment,
    language,
    lowBandwidthMode,
    triggerEmergencySOS,
  } = useApp();
  const t = translations[language];

  // Intake flow states: 'input' | 'analyzing' | 'followup' | 'results'
  const [intakeStep, setIntakeStep] = useState<'input' | 'analyzing' | 'followup' | 'results'>('input');
  const [complaintInput, setComplaintInput] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);

  // SpeechRecognition instance and transcript accumulation refs
  const recognitionRef = useRef<any>(null);
  const baseInputRef = useRef<string>('');

  // Map application language to SpeechRecognition BCP-47 locale code
  const getSpeechRecognitionLang = useCallback((lang: Language): string => {
    switch (lang) {
      case 'hi':
        return 'hi-IN';
      case 'te':
        return 'te-IN';
      case 'mr':
        return 'mr-IN';
      case 'bn':
        return 'bn-IN';
      case 'en':
      default:
        return 'en-IN';
    }
  }, []);

  // Gracefully stop listening
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Safe to ignore if already stopped
      }
    }
    setIsListening(false);
  }, []);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // Safe to ignore
        }
        recognitionRef.current = null;
      }
    };
  }, []);

  // Analysis state
  const [matchedAnalysis, setMatchedAnalysis] = useState<MatchedSpecialistInfo | null>(null);

  // Follow-up question state
  const [symptomDuration, setSymptomDuration] = useState<string>('2-3 days');
  const [additionalSigns, setAdditionalSigns] = useState<string[]>([]);

  // Selected filter & booking doctor
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [bookingDoc, setBookingDoc] = useState<Doctor | null>(null);
  const [bookingConsultType, setBookingConsultType] = useState<'teleconsultation' | 'in_person'>('teleconsultation');

  // Active call states
  const [inActiveCall, setInActiveCall] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVideoOff, setIsVideoOff] = useState<boolean>(false);

  // Quick symptom chips
  const quickSymptoms = [
    { label: t.symptomFeverChills || 'High fever with chills & weakness', text: 'High fever with shivering, headache and fatigue for 3 days' },
    { label: t.symptomChestTightness || 'Chest pain & breathlessness', text: 'Chest tightness radiating to left shoulder with shortness of breath' },
    { label: t.symptomStomachPain || 'Severe stomach pain & vomiting', text: 'Severe abdominal pain with continuous vomiting and inability to eat' },
    { label: t.symptomPregnancy || 'Pregnancy swelling & nausea', text: '7 months pregnant with severe pedal edema, headache and dizziness' },
    { label: t.symptomCoughBreathing || 'Persistent cough & phlegm', text: 'Deep cough for 2 weeks with evening low-grade fever and chest congestion' },
    { label: t.symptomChildFever || 'Child fever & irritable', text: 'Child 3 years old with sudden high fever, refusing oral fluids and crying' },
  ];

  // Voice Input via native Web Speech API
  const handleVoiceInput = async () => {
    // If currently listening, clicking again stops listening
    if (isListening) {
      stopListening();
      return;
    }

    setVoiceError(null);

    const SpeechRecognitionClass =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      setVoiceError(
        'Speech-to-text is not supported in this browser. Please use a supported browser or type your message.'
      );
      return;
    }

    // Request microphone permission via getUserMedia if available
    if (navigator?.mediaDevices?.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach((track) => track.stop());
      } catch (err: any) {
        if (err?.name === 'NotAllowedError' || err?.name === 'PermissionDeniedError') {
          setVoiceError(
            'Microphone permission is denied. Please allow microphone access in your browser settings to speak your symptoms.'
          );
          setIsListening(false);
          return;
        }
        if (err?.name === 'NotFoundError' || err?.name === 'DevicesNotFoundError') {
          setVoiceError('No microphone detected. Please connect a microphone or type your message.');
          setIsListening(false);
          return;
        }
      }
    }

    // Abort any lingering instance
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {
        // ignore
      }
      recognitionRef.current = null;
    }

    try {
      const recognition = new SpeechRecognitionClass();
      recognitionRef.current = recognition;

      recognition.lang = getSpeechRecognitionLang(language);
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      // Remember the text already present before listening started
      baseInputRef.current = complaintInput.trim();

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceError(null);
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = 0; i < event.results.length; ++i) {
          const item = event.results[i];
          if (item.isFinal) {
            finalTranscript += item[0].transcript + ' ';
          } else {
            interimTranscript += item[0].transcript;
          }
        }

        const spoken = (finalTranscript + interimTranscript).trim();
        const base = baseInputRef.current;
        if (base && spoken) {
          setComplaintInput(`${base} ${spoken}`);
        } else if (spoken) {
          setComplaintInput(spoken);
        }
      };

      recognition.onerror = (event: any) => {
        // Case: No speech detected -> simply return to normal state without crashing
        if (event.error === 'no-speech') {
          setIsListening(false);
          return;
        }

        // Case: Microphone permission denied
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setVoiceError(
            'Microphone permission is denied. Please allow microphone access in your browser settings to speak your symptoms.'
          );
        } else if (event.error === 'audio-capture') {
          setVoiceError('No microphone was found or microphone is busy. Please check your audio input.');
        } else if (event.error === 'network') {
          setVoiceError('Network connection issue during speech recognition. Please check your internet or type your message.');
        } else if (event.error !== 'aborted') {
          setVoiceError('Could not recognize speech clearly. Please speak again or type your message.');
        }

        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        recognitionRef.current = null;
      };

      recognition.start();
    } catch (err) {
      console.error('Speech recognition start failed:', err);
      setIsListening(false);
      setVoiceError('Unable to start speech recognition. Please type your message.');
    }
  };

  // Analyze Symptoms & Match Specialist
  const handleAnalyzeSymptoms = (textToAnalyze?: string) => {
    const text = (textToAnalyze || complaintInput).trim();
    if (!text) return;

    setIntakeStep('analyzing');

    // Simulate clinical NLP intake analysis
    setTimeout(() => {
      const lower = text.toLowerCase();

      // Emergency Detection Guardrail
      const isCardiacEmergency =
        lower.includes('chest') ||
        lower.includes('heart') ||
        lower.includes('left shoulder') ||
        lower.includes('breathless') ||
        lower.includes('छाती') ||
        lower.includes('दर्द');
      const isUnconscious = lower.includes('unconscious') || lower.includes('fainted') || lower.includes('stroke') || lower.includes('paralysis');
      const isSevereEmergency = isCardiacEmergency || isUnconscious;

      let specialty = 'General Physician';
      let categoryKey = 'general';
      let rationale = 'General clinical assessment based on reported constitutional symptoms.';
      let urgency: 'normal' | 'urgent' | 'emergency' = 'normal';
      let triageCategory: 'green' | 'yellow' | 'red' = 'green';

      if (isSevereEmergency) {
        specialty = 'Cardiology & Emergency Medicine';
        categoryKey = 'cardiology';
        rationale = 'Symptoms of acute chest discomfort or severe respiratory distress indicate potential cardiac or acute pulmonary event requiring immediate emergency triage.';
        urgency = 'emergency';
        triageCategory = 'red';
      } else if (lower.includes('pregnant') || lower.includes('pregnancy') || lower.includes('delivery') || lower.includes('गर्भवती') || lower.includes('गर्भ')) {
        specialty = 'Obstetrics & Gynaecology';
        categoryKey = 'obgyn';
        rationale = 'Maternal health symptoms require obstetric evaluation, antenatal vitals check, and fetal monitoring.';
        urgency = 'urgent';
        triageCategory = 'yellow';
      } else if (lower.includes('child') || lower.includes('baby') || lower.includes('kid') || lower.includes('बच्चा') || lower.includes('शिशु')) {
        specialty = 'Paediatrics & Child Health';
        categoryKey = 'paediatrics';
        rationale = 'Paediatric symptoms require weight-adjusted clinical assessment and hydration evaluation.';
        urgency = 'urgent';
        triageCategory = 'yellow';
      } else if (lower.includes('stomach') || lower.includes('abdomen') || lower.includes('vomit') || lower.includes('पेट') || lower.includes('उल्टी')) {
        specialty = 'General Physician & Gastroenterology';
        categoryKey = 'general';
        rationale = 'Acute gastrointestinal presentation evaluated for acute gastritis, food infection or dehydration.';
        urgency = 'urgent';
        triageCategory = 'yellow';
      } else {
        specialty = 'General Medicine & Family Health';
        categoryKey = 'general';
        rationale = 'Standard primary outpatient evaluation for fever, infection, or general health concerns.';
        urgency = 'normal';
        triageCategory = 'green';
      }

      setMatchedAnalysis({
        specialty,
        categoryKey,
        rationale,
        urgency,
        triageCategory,
        isEmergency: isSevereEmergency,
      });

      // If emergency, jump straight to emergency guardrail in results, otherwise go to follow-up questions
      if (isSevereEmergency) {
        setIntakeStep('results');
      } else {
        setIntakeStep('followup');
      }
    }, 900);
  };

  const handleSelectQuickChip = (chip: { label: string; text: string }) => {
    setComplaintInput(chip.text);
    handleAnalyzeSymptoms(chip.text);
  };

  const handleCompleteFollowUp = () => {
    setIntakeStep('results');
  };

  const handleSkipToAll = () => {
    setIntakeStep('results');
    setMatchedAnalysis(null);
    setSelectedSpecialty('all');
  };

  const handleResetIntake = () => {
    setIntakeStep('input');
    setComplaintInput('');
    setMatchedAnalysis(null);
  };

  // Doctor filtering & ranking
  const rankedDoctors = useMemo(() => {
    let list = [...doctors];

    // If specialty filter selected or matched
    const activeFilter =
      selectedSpecialty !== 'all'
        ? selectedSpecialty
        : matchedAnalysis?.categoryKey || 'all';

    if (activeFilter !== 'all') {
      if (activeFilter === 'cardiology') {
        list = list.filter((d) => d.specialty.toLowerCase().includes('cardio') || d.specialty.toLowerCase().includes('general'));
      } else if (activeFilter === 'obgyn') {
        list = list.filter((d) => d.specialty.toLowerCase().includes('obstetrics') || d.specialty.toLowerCase().includes('gynaecology'));
      } else if (activeFilter === 'paediatrics') {
        list = list.filter((d) => d.specialty.toLowerCase().includes('paediatrics') || d.specialty.toLowerCase().includes('child'));
      } else if (activeFilter === 'general') {
        list = list.filter((d) => d.specialty.toLowerCase().includes('general'));
      }
    }

    // Rank: Available first, then verified, then queue length
    return list.sort((a, b) => {
      if (a.availabilityStatus === 'available' && b.availabilityStatus !== 'available') return -1;
      if (b.availabilityStatus === 'available' && a.availabilityStatus !== 'available') return 1;
      return a.currentQueueLength - b.currentQueueLength;
    });
  }, [doctors, selectedSpecialty, matchedAnalysis]);

  // Book appointment action
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDoc) return;

    const fullComplaint = [
      complaintInput.trim() || 'General Consultation Request',
      symptomDuration ? `Duration: ${symptomDuration}` : null,
      additionalSigns.length > 0 ? `Associated signs: ${additionalSigns.join(', ')}` : null,
      matchedAnalysis ? `[AI Intake Specialty Match: ${matchedAnalysis.specialty}]` : null,
    ]
      .filter(Boolean)
      .join(' | ');

    bookAppointment({
      patientId: currentPatient.id,
      doctorId: bookingDoc.id,
      chiefComplaint: fullComplaint,
      priority: matchedAnalysis?.urgency || 'normal',
      triageCategory: matchedAnalysis?.triageCategory || 'green',
      bookedBy: 'Self',
    });

    setBookingDoc(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-emerald-700" />
            <span>{t.teleOpdTitle}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            {t.teleOpdSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700">
          <Wifi className="w-4 h-4 text-emerald-600" />
          <span>{lowBandwidthMode ? t.audioOptimized : t.hdVideoStream}</span>
        </div>
      </div>

      {/* Active Consultation Call Window (If Active) */}
      {inActiveCall ? (
        <div className="bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-600 text-white animate-in zoom-in-95 duration-200">
          <div className="bg-slate-900/90 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 rounded-full bg-red-500 animate-ping" />
              <div>
                <p className="font-bold text-sm">
                  Active Consultation • Dr. Rajesh Kumar (General Physician)
                </p>
                <p className="text-[11px] text-slate-400">
                  NMC Reg: NMC/2014/08942 • Encrypted Telemedicine Session
                </p>
              </div>
            </div>
            <span className="text-xs bg-emerald-950 text-emerald-300 font-mono px-2.5 py-1 rounded-full border border-emerald-800">
              04:18
            </span>
          </div>

          <div className="relative aspect-video max-h-[420px] bg-gradient-to-b from-slate-900 to-slate-950 flex items-center justify-center p-4">
            <div className="w-full h-full rounded-2xl bg-slate-800/80 border border-slate-700 flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">
              <div className="w-24 h-24 rounded-full bg-emerald-800/80 border-2 border-emerald-400 flex items-center justify-center text-white mb-3 shadow-lg">
                <Stethoscope className="w-12 h-12 text-emerald-200" />
              </div>
              <h3 className="font-black text-lg text-white">Dr. Rajesh Kumar</h3>
              <p className="text-xs text-emerald-300 font-medium">
                "Namaste {currentPatient.name} ji! I have reviewed your vitals and chief complaint. How are you feeling right now?"
              </p>
              <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-400 bg-slate-900/60 px-3 py-1.5 rounded-lg">
                <span>Vitals Synced from ASHA Didi Sunita Devi: BP 148/94, SpO2 97%, Sugar 168 mg</span>
              </div>

              <div className="absolute bottom-4 right-4 w-32 aspect-video bg-slate-900 rounded-xl border border-slate-600 flex flex-col items-center justify-center p-1 text-[10px] text-slate-300 shadow-md">
                <span>You ({currentPatient.name})</span>
                <span className="text-[9px] text-emerald-400 font-mono">Connected</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-4 flex items-center justify-center gap-4">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-3 rounded-full transition-colors ${
                isMuted ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`p-3 rounded-full transition-colors ${
                isVideoOff ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
            >
              {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setInActiveCall(false)}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-full flex items-center gap-2 shadow-lg shadow-red-600/30 transition-transform active:scale-95 cursor-pointer"
            >
              <PhoneOff className="w-5 h-5" />
              <span>{t.endConsultation}</span>
            </button>
          </div>
        </div>
      ) : activeAppointment ? (
        /* Active Appointment Queue Card */
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-3xl p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-700 text-white flex flex-col items-center justify-center font-black shadow-md shrink-0">
                <span className="text-[10px] uppercase tracking-wider text-emerald-200">TOKEN</span>
                <span className="text-2xl leading-none">#{activeAppointment.tokenNumber}</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-200 text-emerald-950 uppercase">
                    {t.queueStatus}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {t.priorityLabel}: {activeAppointment.priority.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  {t.appointmentWithDoctor} {activeAppointment.doctorName}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 font-medium">
                  {t.chiefComplaint}: {activeAppointment.chiefComplaint}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-1">
                  <span className="flex items-center gap-1 font-semibold text-emerald-800">
                    <Clock className="w-3.5 h-3.5" /> {t.nowServingToken} #11
                  </span>
                  <span>• {t.approxWaitTime}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
              <button
                onClick={() => setInActiveCall(true)}
                id="join-teleconsult-video-btn"
                className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm rounded-xl shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Video className="w-5 h-5" />
                <span>{t.teleConsultationRoom}</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* STEP 1: AI INTAKE ASSISTANT INTERFACE */}
      {intakeStep === 'input' && (
        <div className="bg-white border-2 border-emerald-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-emerald-600" />
                {t.aiIntakeGreeting}
              </span>
              <button
                onClick={handleSkipToAll}
                className="text-xs font-bold text-slate-500 hover:text-emerald-700 transition-colors cursor-pointer"
              >
                {t.skipToAllDoctors} &rarr;
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              {t.howAreYouFeeling}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              {t.meetDoctorAiIntro}
            </p>
          </div>

          {/* Quick Rural Symptom Chips */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {t.commonSymptomQuickPicks}:
            </span>
            <div className="flex flex-wrap gap-2">
              {quickSymptoms.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectQuickChip(chip)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-200 hover:border-emerald-300 transition-colors cursor-pointer text-left"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Symptom Text & Voice Input Box */}
          <div className="space-y-3">
            <div className="relative">
              <textarea
                value={complaintInput}
                onChange={(e) => setComplaintInput(e.target.value)}
                placeholder={t.typeSymptomsPlaceholder}
                rows={3}
                className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-none transition-all pr-14 text-slate-900"
              />

              {/* Voice Mic Button */}
              <button
                type="button"
                onClick={handleVoiceInput}
                id="voice-symptom-input-btn"
                className={`absolute right-3.5 top-3.5 p-2.5 rounded-xl transition-all cursor-pointer ${
                  isListening
                    ? 'bg-red-600 text-white animate-pulse ring-4 ring-red-200'
                    : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
                }`}
                title={isListening ? (t.listening || 'Listening... click to stop') : (t.speakSymptoms || 'Speak your symptoms')}
                aria-label={isListening ? 'Stop listening' : 'Start speech to text'}
              >
                <Mic className={`w-5 h-5 ${isListening ? 'animate-bounce' : ''}`} />
              </button>
            </div>

            {isListening && (
              <div className="flex items-center justify-between px-1 text-xs text-red-600 animate-in fade-in">
                <div className="flex items-center gap-2 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                  <span>{t.listening || 'Listening... please speak'}</span>
                </div>
                <button
                  type="button"
                  onClick={stopListening}
                  className="text-[11px] font-semibold text-slate-500 hover:text-red-700 underline cursor-pointer"
                >
                  Click mic to stop
                </button>
              </div>
            )}

            {voiceError && (
              <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-xl flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>{voiceError}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setVoiceError(null)}
                  className="text-[11px] font-bold text-amber-800 hover:text-amber-950 underline shrink-0 cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className="text-xs text-slate-500">
                Patient: <strong className="text-slate-800">{currentPatient.name}</strong> ({currentPatient.age} yrs, {currentPatient.village})
              </span>

              <button
                onClick={() => handleAnalyzeSymptoms()}
                disabled={!complaintInput.trim()}
                id="analyze-symptoms-btn"
                className="w-full sm:w-auto px-6 py-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t.analyzeSymptomsBtn}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: ANALYZING ANIMATION */}
      {intakeStep === 'analyzing' && (
        <div className="bg-white border-2 border-emerald-100 rounded-3xl p-12 text-center shadow-xs space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto animate-bounce">
            <Bot className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-black text-slate-900">
            {t.aiAnalyzingSymptoms}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Reviewing clinical indicators, screening for red flags, and matching with on-duty rural specialists.
          </p>
        </div>
      )}

      {/* STEP 3: DYNAMIC FOLLOW-UP QUESTIONS */}
      {intakeStep === 'followup' && matchedAnalysis && (
        <div className="bg-white border-2 border-teal-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 inline-block mb-1">
                Clinical Follow-up
              </span>
              <h3 className="text-lg font-black text-slate-900">
                {t.followUpQuestionsTitle}
              </h3>
            </div>
            <button
              onClick={handleResetIntake}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
              title="Start over"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs">
            <span className="font-bold text-slate-500 block uppercase tracking-wider text-[10px] mb-0.5">
              Reported Chief Complaint:
            </span>
            <p className="text-slate-900 font-semibold">"{complaintInput}"</p>
          </div>

          {/* Question 1: Duration */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              1. {t.howLongSymptoms}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['< 24 hours', '2-3 days', '> 1 week'].map((dur) => (
                <button
                  key={dur}
                  type="button"
                  onClick={() => setSymptomDuration(dur)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                    symptomDuration === dur
                      ? 'bg-teal-700 text-white border-teal-800 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {dur}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Accompanying signs */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              2. {t.anyOtherSigns}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                'High fever / Chills',
                'Dizziness / Fainting',
                'Vomiting / Nausea',
                'None of these',
              ].map((sign) => {
                const isChecked = additionalSigns.includes(sign);
                return (
                  <button
                    key={sign}
                    type="button"
                    onClick={() => {
                      if (sign === 'None of these') {
                        setAdditionalSigns(['None of these']);
                      } else {
                        const filtered = additionalSigns.filter((s) => s !== 'None of these');
                        if (isChecked) {
                          setAdditionalSigns(filtered.filter((s) => s !== sign));
                        } else {
                          setAdditionalSigns([...filtered, sign]);
                        }
                      }
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border text-left flex items-center justify-between ${
                      isChecked
                        ? 'bg-teal-700 text-white border-teal-800 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span>{sign}</span>
                    {isChecked && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setIntakeStep('input')}
              className="text-xs font-bold text-slate-500 hover:text-slate-800"
            >
              &larr; Back to Symptom Edit
            </button>
            <button
              onClick={handleCompleteFollowUp}
              id="complete-intake-btn"
              className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{t.viewMatchedDoctors}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: SPECIALIST MATCHING & RANKED DOCTORS */}
      {intakeStep === 'results' && (
        <div className="space-y-6 animate-in fade-in">
          {/* EMERGENCY DETECTION GUARDRAIL BANNER (IF TRIGGERED) */}
          {matchedAnalysis?.isEmergency ? (
            <div className="bg-red-950 border-4 border-red-500 rounded-3xl p-6 text-white shadow-2xl space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-600 text-white rounded-2xl shrink-0 animate-pulse">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-red-800 border border-red-400 text-red-100 inline-block">
                    {t.emergencyWarningBadge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {t.emergencyDetectedTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-red-200 leading-relaxed">
                    {t.emergencyDetectedMessage}
                  </p>
                </div>
              </div>

              {/* Emergency Call to Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => triggerEmergencySOS('Rampur Patient Home')}
                  id="emergency-108-intake-btn"
                  className="py-3.5 px-5 bg-red-600 hover:bg-red-700 text-white font-black text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
                >
                  <PhoneCall className="w-5 h-5" />
                  <span>{t.call108Immediately}</span>
                </button>

                <button
                  onClick={() => {
                    // Let user proceed with emergency consult option if needed
                    setSelectedSpecialty('cardiology');
                  }}
                  className="py-3.5 px-5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Stethoscope className="w-4 h-4 text-emerald-400" />
                  <span>{t.urgentEmergencyConsult}</span>
                </button>
              </div>
            </div>
          ) : matchedAnalysis ? (
            /* NON-EMERGENCY AI CLINICAL MATCH BANNER */
            <div className="bg-gradient-to-r from-emerald-800 to-teal-800 rounded-3xl p-6 text-white shadow-lg space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-700 border border-emerald-500 text-emerald-100 inline-flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    {t.aiSpecialistMatchBadge}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black">
                    {matchedAnalysis.specialty}
                  </h3>
                  <p className="text-xs text-emerald-100 max-w-2xl leading-relaxed">
                    "{matchedAnalysis.rationale}"
                  </p>
                </div>

                <button
                  onClick={handleResetIntake}
                  className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.editSymptoms}</span>
                </button>
              </div>

              <div className="pt-2 border-t border-white/15 flex flex-wrap items-center gap-3 text-xs text-emerald-200">
                <span>{t.rankedBySpecialtyPrompt}</span>
              </div>
            </div>
          ) : null}

          {/* Specialty Filter Tabs */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
            <div className="flex gap-2">
              {[
                { id: 'all', label: t.allSpecialties },
                { id: 'general', label: t.generalPhysician },
                { id: 'cardiology', label: 'Cardiology' },
                { id: 'obgyn', label: t.maternalGynae },
                { id: 'paediatrics', label: t.childHealth },
              ].map((spec) => {
                const isActive =
                  selectedSpecialty === spec.id ||
                  (selectedSpecialty === 'all' && matchedAnalysis?.categoryKey === spec.id);
                return (
                  <button
                    key={spec.id}
                    onClick={() => setSelectedSpecialty(spec.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${
                      isActive
                        ? 'bg-emerald-700 text-white border-emerald-800 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {spec.label}
                  </button>
                );
              })}
            </div>

            {!matchedAnalysis && (
              <button
                onClick={() => setIntakeStep('input')}
                className="text-xs font-bold text-emerald-700 hover:underline shrink-0"
              >
                + AI Intake
              </button>
            )}
          </div>

          {/* Ranked Doctors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rankedDoctors.map((doc, idx) => {
              const isTopMatch = idx === 0 && matchedAnalysis !== null;

              return (
                <div
                  key={doc.id}
                  id={`doctor-card-${doc.id}`}
                  className={`bg-white border-2 rounded-3xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden ${
                    isTopMatch
                      ? 'border-emerald-500 ring-2 ring-emerald-200'
                      : 'border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  {isTopMatch && (
                    <div className="absolute top-0 right-0 bg-emerald-600 text-white px-3 py-1 rounded-bl-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                      <Sparkles className="w-3 h-3" />
                      <span>{t.bestSpecialistMatchBadge}</span>
                    </div>
                  )}

                  <div>
                    {/* Doctor Info Row */}
                    <div className="flex items-start gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-black text-xl shrink-0 shadow-2xs">
                        {doc.name.split(' ')[1]?.[0] || 'D'}
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-extrabold text-base text-slate-900">{doc.name}</h4>
                          {doc.isVerified && (
                            <ShieldCheck
                              className="w-4 h-4 text-emerald-600 shrink-0"
                              title="NMC Verified Medical Practitioner"
                            />
                          )}
                        </div>
                        <p className="text-xs font-bold text-emerald-800">{doc.specialty}</p>
                        <p className="text-[11px] text-slate-500">{doc.qualification}</p>
                      </div>
                    </div>

                    {/* Facility & Distance Information */}
                    {doc.facilityName && (
                      <div className="mt-3 flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-200">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="font-medium truncate">{doc.facilityName}</span>
                        {doc.distanceKm && (
                          <span className="text-[11px] font-bold text-emerald-800 ml-auto shrink-0">
                            {doc.distanceKm} km away
                          </span>
                        )}
                      </div>
                    )}

                    {/* Key Attributes Badges */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                          doc.availabilityStatus === 'available'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {doc.availabilityStatus === 'available' ? '● Available Now' : '● In Consult'}
                      </span>

                      {doc.waitingTime && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {doc.waitingTime}
                        </span>
                      )}

                      {doc.nextSlot && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-blue-500" />
                          Next: {doc.nextSlot}
                        </span>
                      )}
                    </div>

                    {/* Credentials & Details Grid */}
                    <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Registration</span>
                        <span className="font-mono text-slate-800">{doc.registrationNo}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Experience</span>
                        <span className="font-semibold text-slate-800">{doc.experienceYears}+ years</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Languages</span>
                        <span className="font-medium text-slate-800">{doc.languages.join(', ')}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Current Queue</span>
                        <span className="font-bold text-amber-700">{doc.currentQueueLength} in line</span>
                      </div>
                    </div>
                  </div>

                  {/* Booking Action Buttons */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => setBookingDoc(doc)}
                      id={`book-doctor-btn-${doc.id}`}
                      className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>{t.bookConsultationToken}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* BOOKING MODAL */}
      {bookingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-md w-full shadow-2xl border border-slate-200">
            <h3 className="font-black text-lg text-slate-900">
              {t.bookConsultationToken}
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Doctor: <strong className="text-slate-800">{bookingDoc.name}</strong> ({bookingDoc.specialty})
            </p>

            <form onSubmit={handleConfirmBooking} className="mt-4 space-y-3">
              {/* Consultation Mode Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Consultation Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setBookingConsultType('teleconsultation')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 ${
                      bookingConsultType === 'teleconsultation'
                        ? 'bg-emerald-700 text-white border-emerald-800 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Tele-Consultation</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBookingConsultType('in_person')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 ${
                      bookingConsultType === 'in_person'
                        ? 'bg-emerald-700 text-white border-emerald-800 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>In-Person Visit</span>
                  </button>
                </div>
              </div>

              {/* Chief complaint textarea */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {t.enterSymptomsPlaceholder}
                </label>
                <textarea
                  required
                  rows={3}
                  value={complaintInput}
                  onChange={(e) => setComplaintInput(e.target.value)}
                  placeholder={t.enterSymptomsPlaceholder}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900"
                />
              </div>

              <div className="bg-emerald-50 rounded-xl p-3 text-xs text-emerald-900 border border-emerald-200">
                <span className="font-bold block">{t.patientLabel}: {currentPatient.name}</span>
                <span>{t.villageHamlet}: {currentPatient.village} • {t.ageLabel}: {currentPatient.age}</span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setBookingDoc(null)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                >
                  {t.confirmBooking}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
