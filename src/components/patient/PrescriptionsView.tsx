import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import { Prescription } from '../../types';
import {
  Pill,
  Sun,
  Sunset,
  Moon,
  Clock,
  Download,
  Printer,
  ShieldCheck,
  Building2,
  Calendar,
  AlertCircle,
  FileCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const PrescriptionsView: React.FC = () => {
  const { prescriptions, currentPatient, language } = useApp();
  const t = translations[language];

  const patientPrescriptions = prescriptions.filter(
    (rx) => rx.patientId === currentPatient.id
  );

  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownload = (id: string) => {
    setDownloadSuccess(id);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <Pill className="w-6 h-6 text-emerald-700" />
            <span>{t.prescriptionsTitle}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            {t.prescriptionsSubtitle}
          </p>
        </div>

        <span className="text-xs font-semibold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-xl self-start sm:self-auto border border-emerald-200">
          {t.totalPrescriptions}: {patientPrescriptions.length}
        </span>
      </div>

      {patientPrescriptions.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center text-slate-500">
          <Pill className="w-12 h-12 text-slate-300 mx-auto mb-2" />
          <p className="font-semibold text-sm">{t.noPrescriptions}</p>
          <p className="text-xs mt-1">
            Prescriptions issued during Tele-OPD or PHC visits will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {patientPrescriptions.map((rx) => (
            <div
              key={rx.id}
              className="bg-white border-2 border-slate-200 rounded-3xl overflow-hidden shadow-xs"
            >
              {/* Prescription Top Banner (Digital OPD Slip Header) */}
              <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-700 text-emerald-100 border border-emerald-600">
                      TELE-OPD DIGITAL PRESCRIPTION
                    </span>
                    <span className="text-xs text-emerald-200 font-mono">Date: {rx.date}</span>
                  </div>
                  <h3 className="text-lg font-black mt-1">Prescribed by {rx.doctorName}</h3>
                  <p className="text-xs text-emerald-200 font-medium">
                    {rx.doctorSpecialty} • {t.doctorRegNo}: {rx.doctorRegNo}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    onClick={() => handleDownload(rx.id)}
                    className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors border border-white/20 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{t.downloadPrescription}</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-3.5 py-2 bg-white text-emerald-950 hover:bg-emerald-50 text-xs font-extrabold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Slip</span>
                  </button>
                </div>
              </div>

              {downloadSuccess === rx.id && (
                <div className="bg-emerald-100 border-b border-emerald-300 p-2 text-center text-xs font-bold text-emerald-900 flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Prescription slip downloaded successfully (Demo PDF)</span>
                </div>
              )}

              <div className="p-5 sm:p-6 space-y-5">
                {/* Diagnosis & Advice Card */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 rounded-2xl p-4 border border-slate-200">
                  <div>
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                      {t.provisionalDiagnosis}:
                    </span>
                    <p className="font-extrabold text-sm text-slate-900 mt-0.5">
                      {rx.provisionalDiagnosis}
                    </p>
                    {rx.icdCode && (
                      <span className="text-[11px] font-mono text-slate-500">ICD-10: {rx.icdCode}</span>
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                      {t.clinicalAdvice}:
                    </span>
                    <p className="text-xs text-slate-700 font-medium mt-0.5 leading-relaxed">
                      {rx.clinicalAdvice}
                    </p>
                  </div>
                </div>

                {/* Medicines Table / Cards */}
                <div>
                  <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-3">
                    {t.dosageSchedule}:
                  </h4>

                  <div className="space-y-3">
                    {rx.medicines.map((med, idx) => (
                      <div
                        key={med.id || idx}
                        className="border border-slate-200 rounded-2xl p-4 bg-white hover:border-emerald-300 transition-colors shadow-2xs"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                          {/* Medicine Info */}
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                                {idx + 1}
                              </span>
                              <h5 className="font-black text-slate-900 text-sm sm:text-base">
                                {med.name}
                              </h5>
                              <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                                {med.dosage}
                              </span>
                            </div>

                            {/* Jan Aushadhi Low Cost Alternative Banner */}
                            <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 w-fit">
                              <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span className="font-bold">Jan Aushadhi Generic:</span>
                              <span>{med.genericName}</span>
                            </div>

                            <p className="text-xs text-slate-600 font-medium pt-0.5">
                              {med.instructionsLocal}
                            </p>
                          </div>

                          {/* Visual Time-of-day Schedule */}
                          <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200 shrink-0">
                            {/* Morning */}
                            <div
                              className={`flex flex-col items-center p-2 rounded-lg text-center min-w-[55px] ${
                                med.morning
                                  ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300'
                                  : 'opacity-30 text-slate-400'
                              }`}
                            >
                              <Sun className="w-4 h-4 mb-0.5 text-amber-600" />
                              <span className="text-[10px] uppercase">{t.morning}</span>
                              <span className="text-xs">{med.morning ? '1 Tab' : '-'}</span>
                            </div>

                            {/* Afternoon */}
                            <div
                              className={`flex flex-col items-center p-2 rounded-lg text-center min-w-[55px] ${
                                med.afternoon
                                  ? 'bg-orange-100 text-orange-900 font-bold border border-orange-300'
                                  : 'opacity-30 text-slate-400'
                              }`}
                            >
                              <Sunset className="w-4 h-4 mb-0.5 text-orange-600" />
                              <span className="text-[10px] uppercase">{t.afternoon}</span>
                              <span className="text-xs">{med.afternoon ? '1 Tab' : '-'}</span>
                            </div>

                            {/* Night */}
                            <div
                              className={`flex flex-col items-center p-2 rounded-lg text-center min-w-[55px] ${
                                med.night
                                  ? 'bg-indigo-100 text-indigo-900 font-bold border border-indigo-300'
                                  : 'opacity-30 text-slate-400'
                              }`}
                            >
                              <Moon className="w-4 h-4 mb-0.5 text-indigo-600" />
                              <span className="text-[10px] uppercase">{t.night}</span>
                              <span className="text-xs">{med.night ? '1 Tab' : '-'}</span>
                            </div>

                            {/* Duration */}
                            <div className="pl-2 border-l border-slate-200 text-right text-xs">
                              <span className="text-[10px] text-slate-400 block font-semibold">{t.durationDays}</span>
                              <span className="font-extrabold text-slate-800">{med.durationDays}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Follow up & Chemist Guidance */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-slate-200 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-700" />
                    <span>Next Review Date: <strong className="text-slate-900">{rx.followUpDate || 'As needed'}</strong></span>
                  </div>
                  <span className="text-slate-500 italic">
                    Available at Rampur Jan Aushadhi Kendra #492 (2.4 km away)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
