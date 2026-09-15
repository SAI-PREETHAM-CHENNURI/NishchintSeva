import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import { Referral, ReferralStage } from '../../types';
import {
  GitFork,
  CheckCircle2,
  Clock,
  Building2,
  MapPin,
  Phone,
  User,
  Stethoscope,
  ArrowRight,
  RotateCcw,
  Sparkles,
  AlertCircle,
  Calendar,
  ShieldCheck,
  FileText,
  X,
  Bell,
  Activity,
  Check,
} from 'lucide-react';

interface ReferralStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  referral?: Referral;
}

const STAGES_ORDER: ReferralStage[] = [
  'created',
  'sent',
  'accepted',
  'destination_confirmed',
  'checked_in',
  'consultation',
  'investigation',
  'treatment',
  'completed',
];

export const ReferralStatusModal: React.FC<ReferralStatusModalProps> = ({
  isOpen,
  onClose,
  referral: propReferral,
}) => {
  const {
    currentPatient,
    referrals,
    updateReferralStage,
    acknowledgeReferral,
    language,
  } = useApp();

  const t = translations[language];

  // Find active referral for current patient if not explicitly provided
  const activeReferral =
    propReferral ||
    referrals.find((r) => r.patientId === currentPatient.id) ||
    referrals[0];

  const [localReferralId, setLocalReferralId] = useState<string>(
    activeReferral?.id || ''
  );

  // Keep synced with state
  const currentReferral =
    referrals.find((r) => r.id === (localReferralId || activeReferral?.id)) ||
    activeReferral;

  if (!isOpen || !currentReferral) return null;

  const currentStage = currentReferral.currentStage || 'destination_confirmed';
  const currentStageIndex = STAGES_ORDER.indexOf(currentStage);

  const stageLabels: Record<ReferralStage, string> = {
    created: t.referralStageCreated,
    sent: t.referralStageSent,
    accepted: t.referralStageAccepted,
    destination_confirmed: t.referralStageDestinationConfirmed,
    checked_in: t.referralStageCheckedIn,
    consultation: t.referralStageConsultation,
    investigation: t.referralStageInvestigation,
    treatment: t.referralStageTreatment,
    completed: t.referralStageCompleted,
    cancelled: 'Cancelled',
  };

  const stageDescriptions: Record<ReferralStage, string> = {
    created: 'Referral generated at Primary Health Centre after clinical evaluation.',
    sent: 'Digital patient record & vitals securely transferred to tertiary facility.',
    accepted: 'Hospital department accepted referral & allocated clinical resources.',
    destination_confirmed: 'Destination hospital, OPD unit, and date confirmed.',
    checked_in: 'Patient arrived at hospital registration desk & verified via ABHA.',
    consultation: 'Patient undergoing clinical evaluation with specialist physician.',
    investigation: 'Diagnostic tests, imaging, or laboratory panels in progress.',
    treatment: 'Specialized therapy, medication regimen, or procedure underway.',
    completed: 'Referral finalized, discharge summary & follow-up sent to village PHC.',
    cancelled: 'Referral was cancelled by clinical team or redirected.',
  };

  const handleSimulateNextStage = () => {
    if (currentStageIndex < STAGES_ORDER.length - 1) {
      const nextStage = STAGES_ORDER[currentStageIndex + 1];
      updateReferralStage(currentReferral.id, nextStage);
    }
  };

  const handleSimulateReset = () => {
    updateReferralStage(currentReferral.id, 'created');
  };

  const handleAcknowledge = () => {
    acknowledgeReferral(currentReferral.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white p-5 sm:p-6 shrink-0 relative">
          <button
            onClick={onClose}
            id="close-referral-modal-btn"
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-600/80 border border-emerald-400 text-white flex items-center gap-1.5">
              <GitFork className="w-3.5 h-3.5" />
              {t.activeReferralBadge}
            </span>
            <span className="text-xs font-mono text-emerald-200 bg-black/20 px-2 py-0.5 rounded">
              {t.referralIdLabel}: {currentReferral.id}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 font-extrabold uppercase">
              {t.priorityLevel}: {currentReferral.priority || 'High'}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            {t.referralStatusTitle}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-xl">
            {t.referralStatusSubtitle}
          </p>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Key Summary Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Origin & Destination */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                    {t.originFacilityLabel}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">
                    {currentReferral.fromFacility}
                  </h4>
                  <p className="text-xs text-slate-600">
                    {t.referredByLabel}: <span className="font-semibold text-slate-800">{currentReferral.referredBy}</span>
                    {currentReferral.referredByRole && (
                      <span className="block text-[11px] text-slate-500">{currentReferral.referredByRole}</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center py-1">
                <div className="h-6 border-l-2 border-dashed border-emerald-400 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-emerald-600 rotate-90 my-auto" />
                </div>
              </div>

              <div className="flex items-start gap-3 pt-1 border-t border-slate-200">
                <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="space-y-0.5 flex-1">
                  <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wide block">
                    {t.destinationFacilityLabel}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">
                    {currentReferral.toFacility}
                  </h4>
                  {currentReferral.destinationAddress && (
                    <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{currentReferral.destinationAddress}</span>
                    </p>
                  )}
                  {currentReferral.destinationPhone && (
                    <p className="text-xs text-slate-600 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{currentReferral.destinationPhone}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Specialty & Clinical Purpose */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center shrink-0">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                      {t.specialtyRequired}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">
                      {currentReferral.specialty || 'Specialist Consultation'}
                    </h4>
                    {currentReferral.doctorName && (
                      <p className="text-xs text-indigo-800 font-medium">
                        Doctor: {currentReferral.doctorName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block mb-1">
                    {t.referralReasonLabel}
                  </span>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed bg-white p-2.5 rounded-xl border border-slate-200">
                    "{currentReferral.reason}"
                  </p>
                </div>
              </div>

              {/* Next Step / Appointment Box */}
              {currentReferral.nextStepText && (
                <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 text-xs">
                  <span className="font-bold text-amber-900 block flex items-center gap-1.5 mb-0.5">
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                    {t.nextStepLabel}:
                  </span>
                  <p className="text-amber-800 font-medium leading-relaxed">
                    {currentReferral.nextStepText}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Multi-State Progress Tracker */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-4 sm:p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-600" />
                  {t.referralTimelineTitle}
                </h3>
                <p className="text-xs text-slate-500">
                  Step {currentStageIndex + 1} of {STAGES_ORDER.length} • Current: <span className="font-bold text-emerald-700">{stageLabels[currentStage]}</span>
                </p>
              </div>

              {/* Patient Acknowledgement Badge or Button */}
              <div>
                {currentReferral.patientAcknowledged ? (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{t.acknowledgedNotice}</span>
                  </div>
                ) : (
                  <button
                    onClick={handleAcknowledge}
                    id="acknowledge-referral-btn"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-transform active:scale-95 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{t.acknowledgeReferralBtn}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Visual Stepper Bar */}
            <div className="relative py-2">
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
                {STAGES_ORDER.map((stageKey, idx) => {
                  const isCompleted = idx < currentStageIndex;
                  const isCurrent = idx === currentStageIndex;
                  const isUpcoming = idx > currentStageIndex;

                  return (
                    <div
                      key={stageKey}
                      className={`flex flex-col items-center text-center p-2 rounded-xl transition-all ${
                        isCurrent
                          ? 'bg-emerald-50 border-2 border-emerald-500 shadow-xs ring-2 ring-emerald-200'
                          : isCompleted
                          ? 'bg-slate-50 border border-emerald-200 text-slate-700'
                          : 'opacity-50 border border-slate-200 text-slate-400'
                      }`}
                    >
                      {/* Step Indicator Dot */}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black mb-1.5 ${
                          isCompleted
                            ? 'bg-emerald-600 text-white'
                            : isCurrent
                            ? 'bg-emerald-700 text-white animate-pulse'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {isCompleted ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                      </div>

                      {/* Stage Name */}
                      <span className={`text-[10px] leading-tight font-bold ${isCurrent ? 'text-emerald-900 font-extrabold' : 'text-slate-700'}`}>
                        {stageLabels[stageKey]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Current Active Stage Detailed Callout */}
            <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider block">
                  Current Active Stage
                </span>
                <h4 className="text-sm sm:text-base font-black text-emerald-950 flex items-center gap-2">
                  <span>{stageLabels[currentStage]}</span>
                  {currentStage === 'completed' && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                      Completed
                    </span>
                  )}
                </h4>
                <p className="text-xs text-slate-700">
                  {stageDescriptions[currentStage]}
                </p>
              </div>

              {/* Simulation Controls for SIH Demo Evaluation */}
              <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-emerald-200">
                <button
                  onClick={handleSimulateNextStage}
                  disabled={currentStageIndex >= STAGES_ORDER.length - 1}
                  id="simulate-advance-stage-btn"
                  className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                  title="Simulate doctor/facility advancing this referral"
                >
                  <span>{t.simulateStageAdvance}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleSimulateReset}
                  id="simulate-reset-stage-btn"
                  className="p-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 transition-colors cursor-pointer"
                  title={t.simulateReset}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Notifications / Audit Updates Log */}
          {currentReferral.notifications && currentReferral.notifications.length > 0 && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
              <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-slate-500" />
                {t.referralNotificationsTitle}
              </h4>
              <div className="space-y-2">
                {currentReferral.notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="flex items-start gap-2.5 text-xs bg-white p-2.5 rounded-xl border border-slate-200"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-1 shrink-0 ${
                        notif.type === 'success'
                          ? 'bg-emerald-500'
                          : notif.type === 'warning'
                          ? 'bg-amber-500'
                          : 'bg-blue-500'
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-slate-800 font-medium">{notif.message}</p>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">
                        {notif.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Nishchint Seva Frontline Referral Coordination Protocol
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            {t.closeTriageBtn || 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
