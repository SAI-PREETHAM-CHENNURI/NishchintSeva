import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import {
  Stethoscope,
  Bot,
  GitFork,
  Pill,
  FileText,
  Building2,
  PhoneCall,
  Clock,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  CalendarCheck,
  Volume2,
  CheckCircle2,
} from 'lucide-react';
import { HealthAssistantModal } from './HealthAssistantModal';
import { ReferralStatusModal } from './ReferralStatusModal';

export const PatientDashboard: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const {
    currentPatient,
    language,
    activeAppointment,
    followUps,
    toggleFollowUpComplete,
    referrals,
  } = useApp();

  const t = translations[language];

  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);

  // Active referral for current patient
  const activeReferral =
    referrals.find((r) => r.patientId === currentPatient.id) || referrals[0];

  // Audio accessibility reader (Read out greeting in the current language)
  const speakRuralGreeting = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text =
        language === 'hi'
          ? `नमस्ते ${currentPatient.name} जी। निश्चिंत सेवा में आपका स्वागत है। डॉक्टर से मिलने के लिए पहला बटन दबाएं, या आपातकाल के लिए ऊपर लाल बटन दबाएं।`
          : language === 'te'
          ? `నమస్తే ${currentPatient.name} గారు. నిశ్చింత సేవకు స్వాగతం.`
          : language === 'mr'
          ? `नमस्कार ${currentPatient.name} जी. निश्चिंत सेवेमध्ये आपले स्वागत आहे.`
          : language === 'bn'
          ? `নমস্কার ${currentPatient.name} বাবু। নিশ্চিন্ত সেবায় স্বাগতম।`
          : `Namaste ${currentPatient.name}. Welcome to Nishchint Seva. Press the first button to meet a doctor, or the red emergency button for immediate help.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const pendingFollowUp = followUps.find((f) => f.patientId === currentPatient.id && !f.completed);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Welcome & Rural Health Context Banner */}
      <div className="bg-emerald-800 rounded-3xl p-5 sm:p-7 text-white shadow-lg relative overflow-hidden">
        {/* Subtle patterned backdrop */}
        <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute right-24 -top-12 w-32 h-32 rounded-full bg-emerald-500/10 pointer-events-none" />

        <div className="relative z-10 space-y-2 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-700/80 text-emerald-100 border border-emerald-600">
              {t.gramPanchayat}: {currentPatient.village}
            </span>
            <span className="text-xs font-medium text-emerald-200">
              {t.abhaId}: {currentPatient.abhaId}
            </span>
            {currentPatient.pmjayCard && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> {t.pmjayCard}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
            <span>{t.welcomeBack}, {currentPatient.name}</span>
            <button
              onClick={speakRuralGreeting}
              id="voice-readout-greeting-btn"
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-emerald-200 hover:text-white transition-colors cursor-pointer"
              title="Audio speech guidance"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
            {t.patientDashboardIntro}
          </p>
        </div>
      </div>

      {/* Active Tele-OPD Queue Token Alert (If Active) */}
      {activeAppointment && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex flex-col items-center justify-center font-extrabold shrink-0 shadow-xs">
              <span className="text-[10px] uppercase tracking-wider font-bold">{t.token}</span>
              <span className="text-xl leading-none">#{activeAppointment.tokenNumber}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-200 text-amber-900 uppercase">
                  {t.activeQueue}
                </span>
                <span className="text-xs text-amber-800 font-medium">
                  {activeAppointment.doctorName}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base mt-0.5">
                {t.chiefComplaint}: {activeAppointment.chiefComplaint}
              </h4>
              <p className="text-xs text-slate-600 flex items-center gap-2 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>{t.estimatedWait}: ~15 mins</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('meet-doctor')}
            id="enter-opd-room-btn"
            className="w-full sm:w-auto px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <span>{t.enterConsultationRoom}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Upcoming Follow-up / Medication Reminder */}
      {pendingFollowUp && (
        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-teal-600 text-white rounded-xl shrink-0">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded uppercase">
                  {t.followUpAlert}
                </span>
                <span className="text-xs text-slate-500 font-medium">Due: {pendingFollowUp.dueDate}</span>
              </div>
              <p className="font-bold text-slate-900 text-sm mt-0.5">{pendingFollowUp.title}</p>
              <p className="text-xs text-slate-600">{pendingFollowUp.description}</p>
            </div>
          </div>
          <button
            onClick={() => toggleFollowUpComplete(pendingFollowUp.id)}
            className="px-3.5 py-1.5 bg-white border border-teal-300 hover:bg-teal-100 text-teal-900 text-xs font-bold rounded-lg transition-colors shrink-0 cursor-pointer"
          >
            {t.markDone}
          </button>
        </div>
      )}

      {/* Main Touch-Friendly Action Grid */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-base sm:text-lg font-black text-slate-900">
            {t.healthcareServices}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: Meet a Doctor */}
          <div
            onClick={() => onNavigate('meet-doctor')}
            id="nav-card-meet-doctor"
            className="group bg-white border-2 border-emerald-100 hover:border-emerald-500 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Stethoscope className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Tele-OPD
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-emerald-800 transition-colors">
                {t.talkToDoctor}
              </h3>
              <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
                {t.talkToDoctorSub}
              </p>
              <div className="mt-3 flex items-center text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform gap-1">
                <span>{t.joinQueue}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Card 2: AI Health Assistant */}
          <div
            onClick={() => setIsAssistantOpen(true)}
            id="nav-card-health-assistant"
            className="group bg-white border-2 border-teal-100 hover:border-teal-500 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Voice
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-teal-800 transition-colors">
                {t.healthAssistant}
              </h3>
              <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
                {t.healthAssistantSub}
              </p>
              <div className="mt-3 flex items-center text-xs font-bold text-teal-700 group-hover:translate-x-1 transition-transform gap-1">
                <span>{t.askHealthQuestion}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Card 3: Referral Status & Journey Tracking */}
          <div
            onClick={() => setIsReferralModalOpen(true)}
            id="nav-card-referral-status"
            className="group bg-white border-2 border-emerald-100 hover:border-emerald-500 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <GitFork className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                {activeReferral ? activeReferral.id : t.activeReferralBadge}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-emerald-800 transition-colors">
                {t.referralStatusTitle}
              </h3>
              <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
                {activeReferral
                  ? `${activeReferral.toFacility.split('(')[0].trim()} • ${activeReferral.specialty || 'Specialist'}`
                  : t.referralStatusSubtitle}
              </p>
              <div className="mt-3 flex items-center text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform gap-1">
                <span>{t.viewReferralProgress}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Card 4: My Prescriptions */}
          <div
            onClick={() => onNavigate('prescriptions')}
            id="nav-card-prescriptions"
            className="group bg-white border-2 border-slate-200 hover:border-slate-400 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Pill className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                Jan Aushadhi
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-indigo-800 transition-colors">
                {t.myPrescriptions}
              </h3>
              <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
                {t.myPrescriptionsSub}
              </p>
              <div className="mt-3 flex items-center text-xs font-bold text-indigo-700 group-hover:translate-x-1 transition-transform gap-1">
                <span>{t.viewMedicineSchedule}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Card 5: Health Records & ABHA */}
          <div
            onClick={() => onNavigate('records')}
            id="nav-card-records"
            className="group bg-white border-2 border-slate-200 hover:border-slate-400 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                ABHA / EHR
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-blue-800 transition-colors">
                {t.healthRecords}
              </h3>
              <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
                {t.healthRecordsSub}
              </p>
              <div className="mt-3 flex items-center text-xs font-bold text-blue-700 group-hover:translate-x-1 transition-transform gap-1">
                <span>{t.openDigitalRecords}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Card 6: Nearby Hospitals & Jan Aushadhi */}
          <div
            onClick={() => onNavigate('facilities')}
            id="nav-card-facilities"
            className="group bg-white border-2 border-slate-200 hover:border-slate-400 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                15 KM
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-purple-800 transition-colors">
                {t.nearbyFacilities}
              </h3>
              <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
                {t.nearbyFacilitiesSub}
              </p>
              <div className="mt-3 flex items-center text-xs font-bold text-purple-700 group-hover:translate-x-1 transition-transform gap-1">
                <span>{t.findCentres}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <HealthAssistantModal isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
      <ReferralStatusModal
        isOpen={isReferralModalOpen}
        onClose={() => setIsReferralModalOpen(false)}
      />
    </div>
  );
};
