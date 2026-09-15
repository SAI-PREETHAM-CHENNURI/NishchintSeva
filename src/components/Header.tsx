import React from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';
import { Language } from '../types';
import {
  HeartPulse,
  User,
  Users,
  Stethoscope,
  ShieldCheck,
  Wifi,
  WifiOff,
  Globe,
  PhoneCall,
  LogOut,
  Sparkles,
} from 'lucide-react';

export const Header: React.FC<{ activeTab?: string; setActiveTab?: (tab: string) => void }> = ({
  activeTab,
  setActiveTab,
}) => {
  const {
    authUser,
    logout,
    role,
    language,
    setLanguage,
    lowBandwidthMode,
    setLowBandwidthMode,
    triggerEmergencySOS,
    activeDoctor,
  } = useApp();

  const t = translations[language];

  const languagesList: { code: Language; name: string; native: string }[] = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Utility & Compliance Banner */}
      <div className="bg-slate-900 text-slate-200 px-4 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-medium">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide uppercase border border-slate-700 text-emerald-300">
            {t.mockDataNotice}
          </span>
          <span className="hidden md:inline text-slate-400 text-[11px]">
            • {t.safetyNotice}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Low Bandwidth Simulator */}
          <button
            onClick={() => setLowBandwidthMode(!lowBandwidthMode)}
            id="toggle-bandwidth-btn"
            title={lowBandwidthMode ? t.lowBandwidthMode : t.normalBandwidth}
            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[11px] transition-colors ${
              lowBandwidthMode
                ? 'bg-amber-400 text-amber-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            {lowBandwidthMode ? <WifiOff className="w-3 h-3" /> : <Wifi className="w-3 h-3" />}
            <span>{lowBandwidthMode ? t.lowBandwidthMode : t.normalBandwidth}</span>
          </button>

          {/* Language Switcher - STRICTLY HIDDEN for Doctor & Admin roles per specification */}
          {role !== 'doctor' && role !== 'admin' && (
            <div className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-0.5 rounded-lg border border-slate-700">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <select
                id="language-select"
                value={language}
                aria-label="Select application language"
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent text-white text-xs rounded border-none focus:outline-hidden cursor-pointer font-bold"
              >
                {languagesList.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-slate-900 text-white">
                    {lang.native}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Main Bar: Brand, Role-Based Identity Badge, Emergency SOS, and Logout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo & Name */}
          <div
            onClick={() => setActiveTab && setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl sm:text-2xl tracking-tight text-slate-900">
                  {t.appName}
                </span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  ABDM
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium line-clamp-1">
                {t.appTagline}
              </p>
            </div>
          </div>

          {/* Authenticated User Session Badge & Controls (Strictly No Role Switching Here) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {authUser && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-white ${
                    role === 'patient'
                      ? 'bg-emerald-600'
                      : role === 'fhw'
                      ? 'bg-amber-600'
                      : role === 'doctor'
                      ? 'bg-teal-600'
                      : 'bg-indigo-600'
                  }`}
                >
                  {role === 'patient' && <User className="w-4 h-4" />}
                  {role === 'fhw' && <Users className="w-4 h-4" />}
                  {role === 'doctor' && <Stethoscope className="w-4 h-4" />}
                  {role === 'admin' && <ShieldCheck className="w-4 h-4" />}
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <span>{authUser.name}</span>
                    {role === 'doctor' && (
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                          activeDoctor.isVerified
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {activeDoctor.isVerified ? t.verifiedDoctor : t.unverifiedDoctorBadge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium block">
                    {role === 'patient' && t.patientRoleTitle}
                    {role === 'fhw' && t.fhwRoleTitle}
                    {role === 'doctor' && t.doctorRoleTitle}
                    {role === 'admin' && t.adminRoleTitle}
                  </span>
                </div>
              </div>
            )}

            {/* Emergency SOS Button */}
            <button
              id="header-emergency-btn"
              onClick={() => triggerEmergencySOS()}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-red-600/30 transition-transform active:scale-95 animate-pulse cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{t.emergencyBtn}</span>
            </button>

            {/* Secure Sign Out Button */}
            {authUser && (
              <button
                id="logout-btn"
                onClick={logout}
                title={t.logoutBtn}
                className="flex items-center gap-1 px-3 py-2 bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 hover:border-red-200 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">{t.logoutBtn}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
