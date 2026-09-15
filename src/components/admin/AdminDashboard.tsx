import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import {
  ShieldCheck,
  Users,
  Activity,
  CheckCircle,
  XCircle,
  FileText,
  AlertTriangle,
  Building2,
  Lock,
  Search,
  Server,
  TrendingUp,
  MapPin,
  Clock,
  Sparkles,
  Wifi,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { doctors, fhws, patients, appointments, toggleDoctorVerification, language } = useApp();
  const t = translations[language];

  const [activeTab, setActiveTab] = useState<'overview' | 'doctors' | 'fhws' | 'logs'>('overview');

  // Simulated Audit Logs
  const [auditLogs] = useState([
    {
      id: 'log-1',
      timestamp: 'Today, 11:42 AM',
      user: 'Dr. Rajesh Kumar',
      action: 'Issued e-Prescription (Telmisartan 40mg) for Patient Rameshwar Yadav (ABHA: 14-8921-4309-8812)',
      category: 'Clinical',
      status: 'success',
    },
    {
      id: 'log-2',
      timestamp: 'Today, 11:20 AM',
      user: 'Sunita Devi (ASHA)',
      action: 'Synchronized Vitals (BP: 148/94) from Rampur Kalan Sub-Centre',
      category: 'FHW Sync',
      status: 'success',
    },
    {
      id: 'log-3',
      timestamp: 'Today, 10:55 AM',
      user: 'System Triage Engine',
      action: 'Triage Category YELLOW flagged for Patient Rameshwar Yadav - Elevated Blood Pressure',
      category: 'Triage',
      status: 'flagged',
    },
    {
      id: 'log-4',
      timestamp: 'Today, 10:15 AM',
      user: 'Admin (System)',
      action: 'NMC Medical License e-KYC Verification completed for Dr. Sunita Mehra (Reg: UP/2018/11928)',
      category: 'Credentialing',
      status: 'success',
    },
    {
      id: 'log-5',
      timestamp: 'Today, 09:30 AM',
      user: 'Emergency SOS Gateway',
      action: 'Simulated 108 Emergency Ambulance Dispatch for Village Rampur Kalan Hamlet 2',
      category: 'Emergency',
      status: 'alert',
    },
  ]);

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Admin Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/30 border border-indigo-400/40 backdrop-blur flex items-center justify-center font-black text-2xl text-indigo-300 shadow-md">
              <Server className="w-9 h-9" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  {t.adminTitle}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black mt-1">
                Nishchint Seva Administration
              </h1>
              <p className="text-xs sm:text-sm text-slate-300">
                {t.adminSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto bg-white/10 px-3.5 py-2 rounded-2xl border border-white/10 text-xs font-semibold text-emerald-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>{t.systemHealthUptime}</span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex overflow-x-auto gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'overview', label: t.tabOverview, icon: <TrendingUp className="w-4 h-4" /> },
          { id: 'doctors', label: t.tabDoctorVerification, icon: <ShieldCheck className="w-4 h-4" /> },
          { id: 'fhws', label: t.tabFhwManagement, icon: <Users className="w-4 h-4" /> },
          { id: 'logs', label: t.tabAuditLogs, icon: <FileText className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: District Overview Metrics */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metric KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                {t.kpiRuralCitizens}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 block">
                {patients.length * 482}
              </span>
              <span className="text-xs text-emerald-700 font-semibold mt-1 block">
                100% {t.abhaCardTitle}
              </span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                {t.kpiConsultations}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 block">
                {appointments.length + 128}
              </span>
              <span className="text-xs text-teal-700 font-semibold mt-1 block">
                Avg. wait time: 14 mins
              </span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                {t.kpiJanAushadhiSaved}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1 block">
                84.2%
              </span>
              <span className="text-xs text-slate-500 font-medium mt-1 block">
                Avg. ₹410 saved per prescription
              </span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                {t.kpiHighRiskMonitored}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-amber-600 mt-1 block">
                {patients.filter((p) => p.isHighRiskPregnancy || p.chronicConditions.length > 0).length + 42}
              </span>
              <span className="text-xs text-amber-700 font-semibold mt-1 block">
                Monitored by ASHA network
              </span>
            </div>
          </div>

          {/* Program Health & Rural Network Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
              <h3 className="text-base font-black text-slate-900 mb-3 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-700" />
                <span>Primary Healthcare Centres & Connectivity</span>
              </h3>
              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                  <div>
                    <strong className="block text-slate-900">Rampur Primary Health Centre (PHC)</strong>
                    <span className="text-slate-500">2 Doctors on duty • 2G/3G Audio fallback active</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    Online
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                  <div>
                    <strong className="block text-slate-900">Chiraigaon Community Health Centre (CHC)</strong>
                    <span className="text-slate-500">4 Doctors on duty • Diagnostic lab operational</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    Online
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                  <div>
                    <strong className="block text-slate-900">Rampur Jan Aushadhi Kendra #492</strong>
                    <span className="text-slate-500">Essential hypertension & diabetes meds in stock</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    Stocked
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
              <h3 className="text-base font-black text-slate-900 mb-3 flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-700" />
                <span>Ayushman Bharat ABDM & Triage Safety Compliance</span>
              </h3>
              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p>
                    <strong>Clear Safety Disclaimers:</strong> Symptom triage explicitly designated as decision support, not diagnostic proclamation.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p>
                    <strong>Emergency Redirection:</strong> Red triage flags immediately trigger direct 108 ambulance contact and nearby emergency hospital routing.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p>
                    <strong>Patient Consent:</strong> Verbal/voice consent captured during ASHA field onboarding prior to ABHA linking.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p>
                    <strong>Low-Bandwidth Reliability:</strong> Audio-optimized tele-OPD ensures uninterrupted care during rural network throttling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Doctor Verification & Licensing */}
      {activeTab === 'doctors' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-teal-700" />
                <span>{t.doctorVerificationTitle}</span>
              </h3>
              <p className="text-xs text-slate-500">
                Verify National Medical Commission (NMC) and State Medical Council credentials
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {doctors.map((doc) => (
              <div
                key={doc.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-base shrink-0">
                    {doc.name[4]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-slate-900 text-base">{doc.name}</h4>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          doc.isVerified
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {doc.isVerified ? `✓ ${t.doctorVerifiedStatus}` : `⚠️ ${t.doctorPendingStatus}`}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">
                      {doc.specialty} • {doc.qualification}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1 font-mono">
                      <span>{t.medicalCouncil}: {doc.medicalCouncil}</span>
                      <span>{t.nmcRegNo}: {doc.registrationNo}</span>
                      <span>Exp: {doc.experienceYears} Years</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleDoctorVerification(doc.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-colors flex items-center gap-1.5 cursor-pointer ${
                      doc.isVerified
                        ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                        : 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-xs'
                    }`}
                  >
                    {doc.isVerified ? (
                      <>
                        <XCircle className="w-4 h-4" />
                        <span>{t.suspendBtn}</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>{t.verifyBtn}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: FHW Management */}
      {activeTab === 'fhws' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-700" />
                <span>{t.fhwManagement}</span>
              </h3>
              <p className="text-xs text-slate-500">
                Track village distribution, diagnostic kit battery/sync, and high-risk pregnancy monitoring
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fhws.map((fhw) => (
              <div
                key={fhw.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 uppercase">
                      {fhw.roleTitle}
                    </span>
                    <h4 className="font-black text-base text-slate-900 mt-1">{fhw.name}</h4>
                    <p className="text-xs text-slate-500">{t.subCentre}: {fhw.subCenter}</p>
                  </div>
                  <span className="text-xs font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                    {t.lastSync}: {fhw.lastSyncTime}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2 border-t border-slate-200">
                  <div className="bg-white p-2 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block">{t.assignedPatients}</span>
                    <strong className="text-slate-900">{fhw.assignedPatientsCount}</strong>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block">{t.highRiskOnly}</span>
                    <strong className="text-amber-700">{fhw.activeHighRiskCount}</strong>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block">Vaccines Due</span>
                    <strong className="text-blue-700">{fhw.immunizationsDueCount}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Audit Logs */}
      {activeTab === 'logs' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-700" />
                <span>{t.auditLogTitle}</span>
              </h3>
              <p className="text-xs text-slate-500">
                Tamper-evident logs of all tele-consultations, vitals recording, and emergency alerts
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500">ABDM Encryption Active</span>
          </div>

          <div className="divide-y divide-slate-100">
            {auditLogs.map((log) => (
              <div key={log.id} className="py-3 flex items-start justify-between gap-4 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900">{log.user}</strong>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                      {log.category}
                    </span>
                  </div>
                  <p className="text-slate-700 mt-0.5">{log.action}</p>
                  <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">
                    {log.timestamp}
                  </span>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize shrink-0 ${
                    log.status === 'success'
                      ? 'bg-emerald-100 text-emerald-800'
                      : log.status === 'flagged'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
