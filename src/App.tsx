/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { translations } from './data/translations';
import { Header } from './components/Header';
import { LoginView } from './components/auth/LoginView';
import { EmergencyModal } from './components/common/EmergencyModal';
import { LanguageSelectionModal } from './components/common/LanguageSelectionModal';

// Patient role views
import { PatientDashboard } from './components/patient/PatientDashboard';
import { MeetDoctorView } from './components/patient/MeetDoctorView';
import { PrescriptionsView } from './components/patient/PrescriptionsView';
import { HealthRecordsView } from './components/patient/HealthRecordsView';
import { FacilitiesDirectoryView } from './components/patient/FacilitiesDirectoryView';
import { PatientProfileView } from './components/patient/PatientProfileView';

// Role-based Dashboards
import { FhwDashboard } from './components/fhw/FhwDashboard';
import { DoctorDashboard } from './components/doctor/DoctorDashboard';
import { DoctorVerificationBarrier } from './components/doctor/DoctorVerificationBarrier';
import { AdminDashboard } from './components/admin/AdminDashboard';

import {
  Home,
  Stethoscope,
  Pill,
  FileText,
  Building2,
  User,
} from 'lucide-react';

function MainApp() {
  const {
    authUser,
    role,
    language,
    isLanguageModalOpen,
    hasSelectedLanguage,
    closeLanguageSelector,
    supabaseAuthLoading,
    activeDoctor,
  } = useApp();
  const t = translations[language];

  // Active patient sub-tab
  const [patientTab, setPatientTab] = useState<string>('home');

  // Enforce role-based URL route protection: prevents authenticated users from manually navigating to another role's URL
  React.useEffect(() => {
    if (!authUser) return;

    const authorizedRole = authUser.role;

    const enforceRoleRoute = () => {
      const rawHash = window.location.hash.replace(/^#\/?/, '').split('/')[0].toLowerCase();
      const knownRoles = ['patient', 'fhw', 'doctor', 'admin'];

      if (knownRoles.includes(rawHash) && rawHash !== authorizedRole) {
        console.warn(
          `[Route Guard] Blocked unauthorized attempt to navigate to "#${rawHash}". Enforcing authorized role "#${authorizedRole}".`
        );
        window.location.hash = `#${authorizedRole}`;
      } else if (!window.location.hash || window.location.hash === '#') {
        window.location.hash = `#${authorizedRole}`;
      }
    };

    window.addEventListener('hashchange', enforceRoleRoute);
    enforceRoleRoute();

    return () => {
      window.removeEventListener('hashchange', enforceRoleRoute);
    };
  }, [authUser]);

  if (supabaseAuthLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-2xl shadow-md shadow-emerald-600/20 mb-4 animate-bounce">
          N
        </div>
        <div className="flex items-center gap-3 text-slate-700 text-sm font-medium">
          <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          <span>Synchronizing with Supabase Auth...</span>
        </div>
      </div>
    );
  }

  // If unauthenticated, present dedicated Role-Based Login screen
  if (!authUser) {
    return (
      <>
        <LoginView />
        <EmergencyModal />
        <LanguageSelectionModal
          isOpen={isLanguageModalOpen}
          onClose={closeLanguageSelector}
          canDismiss={true}
        />
      </>
    );
  }

  const patientNavItems = [
    { id: 'home', label: t.home, icon: <Home className="w-4 h-4" /> },
    { id: 'meet-doctor', label: t.talkToDoctor, icon: <Stethoscope className="w-4 h-4" /> },
    { id: 'prescriptions', label: t.myPrescriptions, icon: <Pill className="w-4 h-4" /> },
    { id: 'records', label: t.healthRecords, icon: <FileText className="w-4 h-4" /> },
    { id: 'facilities', label: t.nearbyFacilities, icon: <Building2 className="w-4 h-4" /> },
    { id: 'profile', label: t.patientProfile, icon: <User className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-emerald-200 selection:text-emerald-900">
      {/* Universal Header with User Identity, Language Switcher, Emergency SOS & Logout */}
      <Header activeTab={patientTab} setActiveTab={setPatientTab} />

      {/* Role-Specific Secondary Navigation Bar: Rendered ONLY for Patient role */}
      {role === 'patient' && (
        <div className="bg-white border-b border-slate-200 sticky top-[82px] z-30 shadow-2xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-1 overflow-x-auto py-2 scrollbar-none">
              {patientNavItems.map((item) => {
                const isActive = patientTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`patient-nav-${item.id}`}
                    onClick={() => setPatientTab(item.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area: Enforces Strict Role Boundaries */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {role === 'patient' && (
          <>
            {patientTab === 'home' && <PatientDashboard onNavigate={(tab) => setPatientTab(tab)} />}
            {patientTab === 'meet-doctor' && <MeetDoctorView />}
            {patientTab === 'prescriptions' && <PrescriptionsView />}
            {patientTab === 'records' && <HealthRecordsView />}
            {patientTab === 'facilities' && <FacilitiesDirectoryView />}
            {patientTab === 'profile' && <PatientProfileView />}
          </>
        )}

        {role === 'fhw' && <FhwDashboard />}

        {role === 'doctor' &&
          (activeDoctor.isVerified && activeDoctor.verificationStatus === 'approved' ? (
            <DoctorDashboard />
          ) : (
            <DoctorVerificationBarrier />
          ))}

        {role === 'admin' && <AdminDashboard />}
      </main>

      {/* Rural Helpline & Safety Footer in Selected Language */}
      <footer className="bg-slate-900 text-slate-300 mt-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Emergency Helplines Quick-Dial Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pb-6 border-b border-slate-800 text-xs">
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
              <span className="text-[10px] uppercase text-red-400 font-extrabold block">{t.emergencyBtn}</span>
              <span className="font-mono text-base font-black text-white">108</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">{t.ambulance108}</span>
            </div>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
              <span className="text-[10px] uppercase text-emerald-400 font-extrabold block">Health 104</span>
              <span className="font-mono text-base font-black text-white">104</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">{t.healthHelpline104}</span>
            </div>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
              <span className="text-[10px] uppercase text-amber-400 font-extrabold block">Jan Aushadhi</span>
              <span className="font-mono text-base font-black text-white">1800-180-8080</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">{t.janAushadhiHelpline}</span>
            </div>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
              <span className="text-[10px] uppercase text-teal-400 font-extrabold block">PM-JAY</span>
              <span className="font-mono text-base font-black text-white">14555</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">{t.pmjayHelpline}</span>
            </div>
          </div>

          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="text-center md:text-left space-y-1">
              <p className="font-bold text-slate-200">
                {t.appName} • {t.appTagline}
              </p>
              <p className="text-[11px] text-slate-400">
                {t.footerSubtitle}
              </p>
            </div>

            <div className="text-center md:text-right text-[11px] text-slate-500">
              <span className="inline-block px-2.5 py-1 bg-slate-800 rounded-lg text-slate-300 font-medium">
                {t.prototypeNotice}
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Universal Emergency SOS Modal */}
      <EmergencyModal />

      {/* Role-governed Language Selection Modal (Never shown to Doctors/Admins) */}
      {(role === 'patient' || role === 'fhw') && (
        <LanguageSelectionModal
          isOpen={isLanguageModalOpen || !hasSelectedLanguage}
          onClose={closeLanguageSelector}
          canDismiss={hasSelectedLanguage}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
