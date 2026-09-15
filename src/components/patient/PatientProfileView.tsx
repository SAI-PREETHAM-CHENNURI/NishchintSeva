import React from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import {
  User,
  ShieldCheck,
  Phone,
  MapPin,
  Calendar,
  Activity,
  HeartPulse,
  AlertTriangle,
  FileCheck,
  Sparkles,
  Globe,
} from 'lucide-react';

export const PatientProfileView: React.FC = () => {
  const { currentPatient, patients, setActivePatientId, role, language, openLanguageSelector } = useApp();
  const t = translations[language];

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header & Persona Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <User className="w-6 h-6 text-emerald-700" />
            <span>{t.patientProfile}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            {language === 'te'
              ? 'ధృవీకరించబడిన ఆయుష్మాన్ భారత్ (ABHA) వివరాలు, ప్రభుత్వ పథకాలు మరియు ఆరోగ్య రికార్డులు'
              : language === 'hi'
              ? 'सत्यापित आभा (ABHA) विवरण, सरकारी योजनाएं और स्वास्थ्य रिकॉर्ड'
              : language === 'mr'
              ? 'सत्यापित आभा (ABHA) तपशील, शासकीय योजना आणि आरोग्य नोंदी'
              : language === 'bn'
              ? 'অনুমোদিত আভা (ABHA) বিবরণ, সরকারি প্রকল্প এবং স্বাস্থ্য রেকর্ড'
              : 'Verified ABHA credentials, government schemes, chronic conditions & vitals history'}
          </p>
        </div>

        {/* Change Language Button for Patient */}
        <div className="flex items-center gap-2">
          <button
            onClick={openLanguageSelector}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:border-emerald-500 hover:bg-emerald-50 text-slate-700 text-xs font-bold transition-all shadow-2xs cursor-pointer"
          >
            <Globe className="w-4 h-4 text-emerald-700" />
            <span>{t.selectLanguage}</span>
          </button>

          {/* Switcher only for non-patients if needed */}
          {role !== 'patient' && (
            <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 pl-1">Switch Patient:</span>
              <select
                value={currentPatient.id}
                aria-label="Switch active patient profile"
                onChange={(e) => setActivePatientId(e.target.value)}
                className="bg-white border border-slate-300 rounded-lg text-xs font-bold px-2.5 py-1 text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              >
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.gender}, {p.age}y - {p.village})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Main Profile Identity Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-black text-2xl shadow-md">
              {currentPatient.name[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-slate-900">{currentPatient.name}</h3>
                {currentPatient.nameLocal && (
                  <span className="text-sm font-semibold text-slate-500">
                    ({currentPatient.nameLocal})
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                ABHA ID: <strong className="text-emerald-700 font-bold">{currentPatient.abhaId}</strong>
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-slate-600">
                <span>{currentPatient.gender}</span> • <span>{currentPatient.age} {t.yearsOld}</span> •{' '}
                <span className="font-bold text-red-600">{t.bloodGroup}: {currentPatient.bloodGroup}</span>
              </div>
            </div>
          </div>

          {currentPatient.pmjayCard && (
            <div className="bg-amber-50 border border-amber-300 rounded-2xl p-3 text-xs text-amber-900 shrink-0 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-700" />
              <div>
                <p className="font-bold">{t.pmjayVerified}</p>
                <p className="text-[10px] text-amber-800 font-mono">
                  {t.cardNumber}: {currentPatient.pmjayNumber || 'PMJAY-ACTIVE'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Demographics & Contact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-xs text-slate-700">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">{t.villageHamlet}</span>
            <span className="font-semibold text-slate-900 text-sm mt-0.5 block">
              {currentPatient.village}
            </span>
            <span className="text-slate-500">{currentPatient.district}, {currentPatient.state}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">{t.mobilePhone}</span>
            <span className="font-semibold text-slate-900 text-sm mt-0.5 block font-mono">
              {currentPatient.phone}
            </span>
            <span className="text-emerald-700 font-medium">{t.verifiedSmsEnabled}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">{t.guardianNominee}</span>
            <span className="font-semibold text-slate-900 text-sm mt-0.5 block">
              {currentPatient.guardianName || t.selfPrimaryHead}
            </span>
            <span className="text-slate-500">{t.emergencyAuthorizedContact}</span>
          </div>
        </div>

        {/* Chronic Conditions & Allergies */}
        <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
              {t.chronicConditions}:
            </h4>
            {currentPatient.chronicConditions.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {currentPatient.chronicConditions.map((cond, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-bold px-3 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200"
                  >
                    ● {cond}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">{t.noChronicConditions}</p>
            )}
          </div>

          <div>
            <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
              {t.drugAllergies}:
            </h4>
            {currentPatient.allergies.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {currentPatient.allergies.map((alg, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-bold px-3 py-1 rounded-xl bg-red-50 text-red-800 border border-red-200"
                  >
                    ⚠️ {alg}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">{t.noAllergies}</p>
            )}
          </div>
        </div>
      </div>

      {/* Recorded Vitals History (By ASHA Worker) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-700" />
              <span>{t.vitalsMonitoringLog}</span>
            </h3>
            <p className="text-xs text-slate-500">
              {t.recordedDuringHomeVisits}
            </p>
          </div>
        </div>

        {currentPatient.vitalsHistory.length === 0 ? (
          <p className="text-xs text-slate-500 italic">{t.noVitalsRecorded}</p>
        ) : (
          <div className="space-y-3">
            {currentPatient.vitalsHistory.map((v) => (
              <div
                key={v.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100/80 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-slate-800">{v.recordedAt}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-emerald-800 font-semibold">{v.recordedBy}</span>
                  </div>
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase self-start sm:self-auto ${
                      v.alertFlag === 'critical'
                        ? 'bg-red-100 text-red-800 border border-red-300'
                        : v.alertFlag === 'moderate'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {v.alertFlag} {t.statusLabel}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">{t.bloodPressure}</span>
                    <span className="font-extrabold text-sm text-slate-900">{v.bpSystolic}/{v.bpDiastolic} mmHg</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">{t.oxygenSpO2}</span>
                    <span className="font-extrabold text-sm text-slate-900">{v.spO2}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">{t.pulseRate}</span>
                    <span className="font-extrabold text-sm text-slate-900">{v.pulse} bpm</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">{t.temperatureLabel}</span>
                    <span className="font-extrabold text-sm text-slate-900">{v.tempF} °F</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">{t.randomSugar}</span>
                    <span className="font-extrabold text-sm text-slate-900">
                      {v.bloodSugarMgDl ? `${v.bloodSugarMgDl} mg/dL` : t.notChecked}
                    </span>
                  </div>
                </div>

                {v.notes && (
                  <p className="mt-2 text-xs text-slate-600 bg-white p-2 rounded-lg border border-slate-200 italic">
                    {t.ashaFieldNotes}: "{v.notes}"
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
