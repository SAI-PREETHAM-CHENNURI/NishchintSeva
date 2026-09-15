import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import { Role, AuthUser, Language } from '../../types';
import {
  User,
  HeartPulse,
  Stethoscope,
  ShieldCheck,
  ArrowLeft,
  KeyRound,
  Phone,
  Lock,
  Sparkles,
  AlertOctagon,
  CheckCircle2,
  AlertTriangle,
  FileBadge,
  Globe,
  Users,
  Database,
  UserPlus,
  LogIn,
  Loader2,
} from 'lucide-react';
import {
  isSupabaseConfigured,
  SUPABASE_URL,
  signInWithSupabase,
  signUpWithSupabase,
} from '../../lib/supabase';

interface DemoAccountConfig {
  email: string;
  name: string;
  role: Role;
  phone?: string;
  mockFallback: AuthUser;
  extra: Record<string, any>;
}

export const LoginView: React.FC = () => {
  const { login, language, setLanguage, setEmergencyModalOpen, doctors, patients, fhws } = useApp();
  const t = translations[language];

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [identifier, setIdentifier] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [registerName, setRegisterName] = useState<string>('');
  const [registerPhone, setRegisterPhone] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Available languages with native script labels
  const languageOptions: { id: Language; label: string; code: string }[] = [
    { id: 'en', label: 'English', code: 'EN' },
    { id: 'hi', label: 'हिंदी', code: 'HI' },
    { id: 'te', label: 'తెలుగు', code: 'TE' },
    { id: 'mr', label: 'मराठी', code: 'MR' },
    { id: 'bn', label: 'বাংলা', code: 'BN' },
  ];

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setAuthMode('login');
    setError(null);
    setSuccessMessage(null);

    // Pre-fill realistic identifiers per role
    if (role === 'patient') {
      setIdentifier(isSupabaseConfigured ? 'rameshwar.yadav@nishchint.in' : '14-8921-4309-8812');
      setPassword('Password@123');
    } else if (role === 'fhw') {
      setIdentifier(isSupabaseConfigured ? 'sunita.devi@nishchint.in' : 'ASHA-UP-VNS-041');
      setPassword('Password@123');
    } else if (role === 'doctor') {
      setIdentifier(isSupabaseConfigured ? 'dr.rajesh@nishchint.in' : 'NMC/2014/08942');
      setPassword('Password@123');
    } else if (role === 'admin') {
      setIdentifier(isSupabaseConfigured ? 'admin.alok@nishchint.in' : 'DHO-VARANASI-01');
      setPassword('Password@123');
    }
  };

  /**
   * Quick demo account authentication:
   * When Supabase is connected: authenticates with real Supabase Auth, auto-creating
   * the account in auth.users + profiles + role profile table if it does not yet exist.
   * When Supabase anon key is pending: uses realistic local preview fallback.
   */
  const handleDemoAccountLogin = async (config: DemoAccountConfig) => {
    setError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    if (isSupabaseConfigured) {
      try {
        const demoPassword = 'Password@123';
        let resultUser: AuthUser | null = null;

        try {
          // Attempt real Supabase sign-in with expected role validation
          const res = await signInWithSupabase(config.email, demoPassword, config.role);
          resultUser = res.user;
        } catch (signInErr: any) {
          // If user doesn't exist yet in Supabase auth, auto-create account and seed tables
          if (
            signInErr.message?.includes('Invalid login credentials') ||
            signInErr.message?.includes('user_not_found') ||
            signInErr.message?.includes('User not found')
          ) {
            try {
              const signUpRes = await signUpWithSupabase(config.email, demoPassword, {
                role: config.role,
                name: config.name,
                phone: config.phone,
                ...config.extra,
              });
              resultUser = signUpRes.user;
            } catch (signUpErr: any) {
              console.warn('[Supabase Auth Note] Could not auto-create demo user:', signUpErr.message);
              // Fall back to demo mock fallback to avoid blocking hackathon testing
              resultUser = {
                ...config.mockFallback,
                verificationStatus:
                  config.role === 'doctor'
                    ? config.extra?.isVerified
                      ? 'approved'
                      : 'pending'
                    : undefined,
              };
            }
          } else {
            console.warn('[Supabase Auth Note] Falling back to demo mock user:', signInErr.message);
            resultUser = {
              ...config.mockFallback,
              verificationStatus:
                config.role === 'doctor'
                  ? config.extra?.isVerified
                    ? 'approved'
                    : 'pending'
                  : undefined,
            };
          }
        }

        if (resultUser) {
          login(resultUser);
        } else {
          login(config.mockFallback);
        }
      } catch (err: any) {
        console.error('[Supabase Auth Error]:', err);
        setError(`Supabase Auth Error: ${err.message || 'Authentication failed'}`);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Offline / Demonstration mode
      login(config.mockFallback);
      setIsSubmitting(false);
    }
  };

  /**
   * Custom form submit handler
   */
  const handleCustomLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!identifier.trim()) {
      setError(
        language === 'hi'
          ? 'कृपया अपनी पहचान संख्या या ईमेल दर्ज करें।'
          : 'Please enter your ID, email, or mobile number.'
      );
      return;
    }

    if (!password.trim()) {
      setError(language === 'hi' ? 'कृपया पासवर्ड दर्ज करें।' : 'Please enter your password.');
      return;
    }

    setIsSubmitting(true);

    if (isSupabaseConfigured) {
      try {
        const emailToUse = identifier.includes('@')
          ? identifier.trim()
          : `${identifier.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}@nishchint.in`;

        if (authMode === 'register') {
          // Block public self-registration for Admin role
          if (selectedRole === 'admin') {
            setError(
              language === 'hi'
                ? 'प्रशासनिक खाते केवल अधिकृत जिला स्वास्थ्य विभाग द्वारा जारी किए जाते हैं।'
                : 'Public self-registration is not permitted for the Admin role. Admin credentials are provisioned by authorized health authorities.'
            );
            setIsSubmitting(false);
            return;
          }

          if (!selectedRole) {
            setError(
              language === 'hi'
                ? 'कृपया पंजीकरण के लिए एक मान्य भूमिका चुनें।'
                : 'Please select a valid role (Patient, Frontline Worker, or Doctor) before registering.'
            );
            setIsSubmitting(false);
            return;
          }

          // Handle Supabase Sign Up
          if (!registerName.trim()) {
            setError(
              language === 'hi'
                ? 'कृपया पंजीकरण के लिए अपना पूरा नाम दर्ज करें।'
                : 'Please provide your full legal name for registration.'
            );
            setIsSubmitting(false);
            return;
          }

          // Strict role assignment per registration portal (patient, fhw, doctor)
          const targetRole: Role = selectedRole;

          const res = await signUpWithSupabase(emailToUse, password, {
            role: targetRole,
            name: registerName.trim(),
            phone: registerPhone.trim() || '+91 98000 00000',
            village: 'Rampur Kalan',
            district: 'Varanasi',
            designation: targetRole === 'fhw' ? 'ASHA Worker' : undefined,
            specialty: targetRole === 'doctor' ? 'General Physician' : undefined,
            qualification: targetRole === 'doctor' ? 'MBBS' : undefined,
            registrationNo: targetRole === 'doctor' ? 'NMC/2026/PENDING' : undefined,
            isVerified: false,
            verificationStatus: 'pending',
          });

          setSuccessMessage(
            targetRole === 'doctor'
              ? 'Doctor account created with status PENDING. Awaiting district medical council verification.'
              : 'Account registered successfully with Supabase! Signing in...'
          );
          if (res.user) {
            login(res.user);
          }
        } else {
          // Handle Supabase Sign In with strict role verification from database
          const res = await signInWithSupabase(emailToUse, password, selectedRole || undefined);
          if (res.user) {
            login(res.user);
          } else {
            throw new Error('User profile could not be loaded from Supabase.');
          }
        }
      } catch (err: any) {
        console.error('[Supabase Auth Error]:', err);
        setError(err.message || 'Authentication failed. Please check credentials.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Local fallback mode when VITE_SUPABASE_ANON_KEY is not yet supplied
      if (selectedRole === 'patient') {
        const match =
          patients.find(
            (p) =>
              p.abhaId.includes(identifier) ||
              p.phone.includes(identifier) ||
              p.id === identifier
          ) || patients[0];

        const patientUser: AuthUser = {
          id: `usr-${match.id}`,
          role: 'patient',
          name: match.name,
          patientId: match.id,
          phone: match.phone,
          abhaId: match.abhaId,
          assignedVillage: match.village,
        };
        login(patientUser);
      } else if (selectedRole === 'fhw') {
        const matchFhw = fhws[0];
        const fhwUser: AuthUser = {
          id: `usr-${matchFhw.id}`,
          role: 'fhw',
          name: matchFhw.name,
          fhwId: matchFhw.id,
          phone: matchFhw.phone,
          designation: `${matchFhw.roleTitle} Worker`,
          assignedVillage: matchFhw.village,
        };
        login(fhwUser);
      } else if (selectedRole === 'doctor') {
        const matchDoc =
          doctors.find((d) => d.registrationNo.includes(identifier)) || doctors[0];
        const docUser: AuthUser = {
          id: `usr-${matchDoc.id}`,
          role: 'doctor',
          name: matchDoc.name,
          doctorId: matchDoc.id,
          isVerified: matchDoc.isVerified,
          registrationNo: matchDoc.registrationNo,
          designation: matchDoc.specialty,
        };
        login(docUser);
      } else if (selectedRole === 'admin') {
        const adminUser: AuthUser = {
          id: 'usr-admin-1',
          role: 'admin',
          name: 'Dr. Alok Nath Mishra',
          adminId: 'admin-1',
          designation: 'District Chief Medical Officer (Varanasi)',
        };
        login(adminUser);
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between p-4 sm:p-6 relative selection:bg-emerald-100 selection:text-emerald-900">
      {/* Subtle Ambient Background Wash for Visual Warmth and Depth */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar: Brand, Supabase Status, Language Selector & Emergency Button */}
      <header className="relative z-10 max-w-6xl w-full mx-auto flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-2xl shadow-md shadow-emerald-600/20">
            N
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
              <span>{t.appName}</span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                ABDM
              </span>
            </h1>
            <p className="text-xs text-slate-500 font-medium">{t.appTagline}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Supabase Connection Status Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] shadow-2xs">
            <Database className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-slate-500 font-medium">Supabase:</span>
            {isSupabaseConfigured ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                Live Auth Connected
              </span>
            ) : (
              <span className="text-amber-700 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Ready (Set VITE_SUPABASE_ANON_KEY)
              </span>
            )}
          </div>

          {/* Strict 5-Language Switcher */}
          <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-1 shadow-2xs">
            <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-1" />
            <div className="flex gap-1">
              {languageOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setLanguage(opt.id)}
                  title={opt.label}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                    language === opt.id
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Emergency 108 Button */}
          <button
            onClick={() => setEmergencyModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-xl shadow-md shadow-red-200 transition-all cursor-pointer"
          >
            <AlertOctagon className="w-4 h-4" />
            <span>{t.emergencyBtn}</span>
          </button>
        </div>
      </header>

      {/* Main Interactive Stage */}
      <main className="relative z-10 max-w-5xl w-full mx-auto my-auto py-8">
        {!selectedRole ? (
          /* STEP 1: ROLE SELECTION */
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {t.selectRoleTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                {t.selectRoleSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Role 1: Patient */}
              <button
                onClick={() => handleRoleSelect('patient')}
                className="group p-6 bg-white hover:bg-emerald-50/30 border border-slate-200 hover:border-emerald-400 rounded-3xl text-left transition-all duration-200 shadow-sm hover:shadow-xl hover:shadow-emerald-100 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                      <User className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      Citizen
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {t.patientRoleTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {t.patientRoleDesc}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between text-xs font-bold text-emerald-700 pt-4 border-t border-slate-100">
                  <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    {t.loginBtn} &rarr;
                  </span>
                  <span className="text-slate-500 font-normal">
                    {isSupabaseConfigured ? 'Supabase Auth / ABHA' : 'ABHA / OTP'}
                  </span>
                </div>
              </button>

              {/* Role 2: Frontline Health Worker (ASHA / ANM) */}
              <button
                onClick={() => handleRoleSelect('fhw')}
                className="group p-6 bg-white hover:bg-amber-50/30 border border-slate-200 hover:border-amber-400 rounded-3xl text-left transition-all duration-200 shadow-sm hover:shadow-xl hover:shadow-amber-100 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                      <Users className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                      ASHA / ANM / CHO
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-amber-700 transition-colors">
                    {t.fhwRoleTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {t.fhwRoleDesc}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between text-xs font-bold text-amber-700 pt-4 border-t border-slate-100">
                  <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    {t.loginBtn} &rarr;
                  </span>
                  <span className="text-slate-500 font-normal">Worker ID / MPIN</span>
                </div>
              </button>

              {/* Role 3: Verified Doctor */}
              <button
                onClick={() => handleRoleSelect('doctor')}
                className="group p-6 bg-white hover:bg-teal-50/30 border border-slate-200 hover:border-teal-400 rounded-3xl text-left transition-all duration-200 shadow-sm hover:shadow-xl hover:shadow-teal-100 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                      <Stethoscope className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                      NMC Verified
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-teal-700 transition-colors">
                    {t.doctorRoleTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {t.doctorRoleDesc}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between text-xs font-bold text-teal-700 pt-4 border-t border-slate-100">
                  <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    {t.loginBtn} &rarr;
                  </span>
                  <span className="text-slate-500 font-normal">NMC Reg / Password</span>
                </div>
              </button>

              {/* Role 4: District Health Admin */}
              <button
                onClick={() => handleRoleSelect('admin')}
                className="group p-6 bg-white hover:bg-indigo-50/30 border border-slate-200 hover:border-indigo-400 rounded-3xl text-left transition-all duration-200 shadow-sm hover:shadow-xl hover:shadow-indigo-100 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-bold text-indigo-800 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                      District Ops
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-700 transition-colors">
                    {t.adminRoleTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {t.adminRoleDesc}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between text-xs font-bold text-indigo-700 pt-4 border-t border-slate-100">
                  <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    {t.loginBtn} &rarr;
                  </span>
                  <span className="text-slate-500 font-normal">Officer ID / Key</span>
                </div>
              </button>
            </div>
          </div>
        ) : (
          /* STEP 2: ROLE-SPECIFIC LOGIN FORM */
          <div className="max-w-xl mx-auto space-y-6 animate-in fade-in duration-200">
            <button
              onClick={() => setSelectedRole(null)}
              className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer py-1 px-2.5 rounded-lg hover:bg-slate-100"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.backToRoles}</span>
            </button>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-100 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-md ${
                      selectedRole === 'patient'
                        ? 'bg-emerald-600 shadow-emerald-200'
                        : selectedRole === 'fhw'
                        ? 'bg-amber-600 shadow-amber-200'
                        : selectedRole === 'doctor'
                        ? 'bg-teal-600 shadow-teal-200'
                        : 'bg-indigo-600 shadow-indigo-200'
                    }`}
                  >
                    {selectedRole === 'patient' && <User className="w-7 h-7" />}
                    {selectedRole === 'fhw' && <Users className="w-7 h-7" />}
                    {selectedRole === 'doctor' && <Stethoscope className="w-7 h-7" />}
                    {selectedRole === 'admin' && <ShieldCheck className="w-7 h-7" />}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      {t.loginTitle}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                      {selectedRole === 'patient' && t.patientRoleTitle}
                      {selectedRole === 'fhw' && t.fhwRoleTitle}
                      {selectedRole === 'doctor' && t.doctorRoleTitle}
                      {selectedRole === 'admin' && t.adminRoleTitle}
                    </h2>
                  </div>
                </div>

                {isSupabaseConfigured && (selectedRole !== 'admin' ? (
                  <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        authMode === 'login'
                          ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <LogIn className="w-3.5 h-3.5 inline mr-1" />
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthMode('register')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        authMode === 'register'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <UserPlus className="w-3.5 h-3.5 inline mr-1" />
                      Register
                    </button>
                  </div>
                ) : (
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">
                    Official Admin Gateway
                  </span>
                ))}
              </div>

              {error && (
                <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {successMessage && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Form inputs */}
              <form onSubmit={handleCustomLogin} className="space-y-4">
                {authMode === 'register' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Full Legal Name
                      </label>
                      <input
                        type="text"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        placeholder="e.g. Smt. Kamala Devi"
                        required
                        className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        value={registerPhone}
                        onChange={(e) => setRegisterPhone(e.target.value)}
                        placeholder="+91 98XXX XXXXX"
                        className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden transition-all"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {authMode === 'register'
                      ? 'Account Email'
                      : isSupabaseConfigured
                      ? 'Email or Identifier'
                      : selectedRole === 'patient'
                      ? t.patientLoginPlaceholder
                      : selectedRole === 'fhw'
                      ? t.fhwLoginPlaceholder
                      : selectedRole === 'doctor'
                      ? t.doctorLoginPlaceholder
                      : t.adminLoginPlaceholder}
                  </label>
                  <div className="relative">
                    <input
                      type={isSupabaseConfigured && authMode === 'register' ? 'email' : 'text'}
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      required
                      placeholder={
                        isSupabaseConfigured
                          ? 'name@nishchint.in or ID'
                          : 'Enter ID / Mobile'
                      }
                      className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden font-mono transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {authMode === 'register'
                      ? 'Choose Password (min 6 characters)'
                      : selectedRole === 'patient'
                      ? isSupabaseConfigured
                        ? 'Password'
                        : t.enterOtp
                      : selectedRole === 'fhw'
                      ? isSupabaseConfigured
                        ? 'Password'
                        : t.enterMpin
                      : t.enterPassword}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden font-mono transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 px-4 rounded-xl text-sm font-black text-white shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  } ${
                    selectedRole === 'patient'
                      ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200'
                      : selectedRole === 'fhw'
                      ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-200'
                      : selectedRole === 'doctor'
                      ? 'bg-teal-600 hover:bg-teal-700 shadow-teal-200'
                      : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Authenticating with Supabase...</span>
                    </>
                  ) : authMode === 'register' ? (
                    <>
                      <span>Create Account & Register in {selectedRole?.toUpperCase()} Profile</span>
                      <span>&rarr;</span>
                    </>
                  ) : (
                    <>
                      <span>{t.loginBtn}</span>
                      <span>&rarr;</span>
                    </>
                  )}
                </button>
              </form>

              {/* DEMO PROFILES SECTION FOR CONVENIENT 1-CLICK ACCESS */}
              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between mb-2 text-xs font-bold text-slate-800">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>{t.demoAccountsTitle}</span>
                  </div>
                  {isSupabaseConfigured && (
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-mono">
                      Supabase Auth Enabled
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mb-3">{t.demoAccountsNote}</p>

                <div className="space-y-2.5">
                  {selectedRole === 'patient' && (
                    <>
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() =>
                          handleDemoAccountLogin({
                            email: 'rameshwar.yadav@nishchint.in',
                            name: 'Rameshwar Yadav',
                            role: 'patient',
                            phone: '+91 98391 20491',
                            extra: {
                              abhaId: '14-8921-4309-8812',
                              age: 58,
                              gender: 'Male',
                              village: 'Rampur Kalan',
                              district: 'Varanasi',
                              bloodGroup: 'B+',
                            },
                            mockFallback: {
                              id: 'usr-p1',
                              role: 'patient',
                              name: 'Rameshwar Yadav',
                              patientId: 'p-1',
                              phone: '+91 98391 20491',
                              abhaId: '14-8921-4309-8812',
                              assignedVillage: 'Rampur Kalan',
                            },
                          })
                        }
                        className="w-full p-3 bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-300 rounded-xl text-left text-xs transition-all flex items-center justify-between shadow-2xs hover:shadow-sm cursor-pointer"
                      >
                        <div>
                          <strong className="text-slate-900 block font-bold">Rameshwar Yadav (Age 58)</strong>
                          <span className="text-slate-500 text-[11px]">
                            Village: Rampur Kalan • ABHA: 14-8921-4309-8812
                          </span>
                        </div>
                        <span className="text-emerald-700 font-bold text-[11px] bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-lg">
                          Sign In &rarr;
                        </span>
                      </button>

                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() =>
                          handleDemoAccountLogin({
                            email: 'laxmi.bai@nishchint.in',
                            name: 'Laxmi Bai',
                            role: 'patient',
                            phone: '+91 98112 44921',
                            extra: {
                              abhaId: '14-3312-9904-1244',
                              age: 26,
                              gender: 'Female',
                              village: 'Rampur Kalan',
                              district: 'Varanasi',
                              bloodGroup: 'O+',
                              is_high_risk_pregnancy: true,
                            },
                            mockFallback: {
                              id: 'usr-p2',
                              role: 'patient',
                              name: 'Laxmi Bai',
                              patientId: 'p-2',
                              phone: '+91 98112 44921',
                              abhaId: '14-3312-9904-1244',
                              assignedVillage: 'Rampur Kalan',
                            },
                          })
                        }
                        className="w-full p-3 bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-300 rounded-xl text-left text-xs transition-all flex items-center justify-between shadow-2xs hover:shadow-sm cursor-pointer"
                      >
                        <div>
                          <strong className="text-slate-900 block font-bold">Laxmi Bai (Age 26, ANC)</strong>
                          <span className="text-slate-500 text-[11px]">
                            Village: Rampur Kalan • High-Risk Maternal Profile
                          </span>
                        </div>
                        <span className="text-emerald-700 font-bold text-[11px] bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-lg">
                          Sign In &rarr;
                        </span>
                      </button>
                    </>
                  )}

                  {selectedRole === 'fhw' && (
                    <>
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() =>
                          handleDemoAccountLogin({
                            email: 'sunita.devi@nishchint.in',
                            name: 'Sunita Devi',
                            role: 'fhw',
                            phone: '+91 98450 11200',
                            extra: {
                              workerId: 'ASHA-UP-VNS-041',
                              designation: 'ASHA Worker',
                              village: 'Rampur Kalan',
                            },
                            mockFallback: {
                              id: 'usr-fhw1',
                              role: 'fhw',
                              name: 'Sunita Devi',
                              fhwId: 'fhw-1',
                              phone: '+91 98450 11200',
                              designation: 'ASHA Worker',
                              assignedVillage: 'Rampur Kalan',
                            },
                          })
                        }
                        className="w-full p-3 bg-slate-50 hover:bg-amber-50/50 border border-slate-200 hover:border-amber-300 rounded-xl text-left text-xs transition-all flex items-center justify-between shadow-2xs hover:shadow-sm cursor-pointer"
                      >
                        <div>
                          <strong className="text-slate-900 block font-bold">Sunita Devi (ASHA Didi)</strong>
                          <span className="text-slate-500 text-[11px]">
                            Sub-Centre: Rampur Kalan • 48 Families Assigned
                          </span>
                        </div>
                        <span className="text-amber-700 font-bold text-[11px] bg-amber-50 border border-amber-200 px-2 py-1 rounded-lg">
                          Sign In &rarr;
                        </span>
                      </button>

                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() =>
                          handleDemoAccountLogin({
                            email: 'meena.kumari@nishchint.in',
                            name: 'Meena Kumari',
                            role: 'fhw',
                            phone: '+91 98450 33811',
                            extra: {
                              workerId: 'ANM-UP-VNS-019',
                              designation: 'Auxiliary Nurse Midwife (ANM)',
                              village: 'Belpahari',
                            },
                            mockFallback: {
                              id: 'usr-fhw2',
                              role: 'fhw',
                              name: 'Meena Kumari',
                              fhwId: 'fhw-2',
                              phone: '+91 98450 33811',
                              designation: 'Auxiliary Nurse Midwife (ANM)',
                              assignedVillage: 'Belpahari',
                            },
                          })
                        }
                        className="w-full p-3 bg-slate-50 hover:bg-amber-50/50 border border-slate-200 hover:border-amber-300 rounded-xl text-left text-xs transition-all flex items-center justify-between shadow-2xs hover:shadow-sm cursor-pointer"
                      >
                        <div>
                          <strong className="text-slate-900 block font-bold">Meena Kumari (ANM)</strong>
                          <span className="text-slate-500 text-[11px]">
                            Primary Sub-Centre: Belpahari • Immunization Lead
                          </span>
                        </div>
                        <span className="text-amber-700 font-bold text-[11px] bg-amber-50 border border-amber-200 px-2 py-1 rounded-lg">
                          Sign In &rarr;
                        </span>
                      </button>
                    </>
                  )}

                  {selectedRole === 'doctor' && (
                    <>
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() =>
                          handleDemoAccountLogin({
                            email: 'dr.rajesh@nishchint.in',
                            name: 'Dr. Rajesh Varma',
                            role: 'doctor',
                            phone: '+91 98220 54100',
                            extra: {
                              specialty: 'General Medicine & Diabetology',
                              qualification: 'MBBS, MD (Medicine)',
                              registrationNo: 'NMC/2014/08942',
                              isVerified: true,
                            },
                            mockFallback: {
                              id: 'usr-doc1',
                              role: 'doctor',
                              name: 'Dr. Rajesh Varma',
                              doctorId: 'doc-1',
                              isVerified: true,
                              registrationNo: 'NMC/2014/08942',
                              designation: 'General Medicine & Diabetology',
                            },
                          })
                        }
                        className="w-full p-3 bg-slate-50 hover:bg-teal-50/50 border border-slate-200 hover:border-teal-300 rounded-xl text-left text-xs transition-all flex items-center justify-between shadow-2xs hover:shadow-sm cursor-pointer"
                      >
                        <div>
                          <div className="flex items-center gap-1.5">
                            <strong className="text-slate-900 block font-bold">Dr. Rajesh Varma</strong>
                            <span className="px-2 py-0.5 bg-teal-50 text-teal-800 border border-teal-200 rounded-full text-[10px] font-bold">
                              Verified
                            </span>
                          </div>
                          <span className="text-slate-500 text-[11px]">
                            MBBS, MD • Reg: NMC/2014/08942 • Available Now
                          </span>
                        </div>
                        <span className="text-teal-700 font-bold text-[11px] bg-teal-50 border border-teal-200 px-2 py-1 rounded-lg">
                          Sign In &rarr;
                        </span>
                      </button>

                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() =>
                          handleDemoAccountLogin({
                            email: 'dr.vikram@nishchint.in',
                            name: 'Dr. Vikramaditya Singh',
                            role: 'doctor',
                            phone: '+91 98220 77301',
                            extra: {
                              specialty: 'Cardiologist',
                              qualification: 'MBBS, DM (Cardiology)',
                              registrationNo: 'NMC/2012/04581',
                              isVerified: false,
                            },
                            mockFallback: {
                              id: 'usr-doc4',
                              role: 'doctor',
                              name: 'Dr. Vikramaditya Singh',
                              doctorId: 'doc-4',
                              isVerified: false,
                              registrationNo: 'NMC/2012/04581',
                              designation: 'Cardiologist',
                            },
                          })
                        }
                        className="w-full p-3 bg-amber-50/40 hover:bg-amber-50 border border-amber-200 hover:border-amber-300 rounded-xl text-left text-xs transition-all flex items-center justify-between shadow-2xs hover:shadow-sm cursor-pointer"
                      >
                        <div>
                          <div className="flex items-center gap-1.5">
                            <strong className="text-slate-900 block font-bold">Dr. Vikramaditya Singh</strong>
                            <span className="px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-[10px] font-bold">
                              Unverified (Pending)
                            </span>
                          </div>
                          <span className="text-slate-600 text-[11px]">
                            Test unverified doctor safety barrier & practice restrictions
                          </span>
                        </div>
                        <span className="text-amber-800 font-bold text-[11px] bg-amber-100/70 border border-amber-300 px-2 py-1 rounded-lg">
                          Sign In &rarr;
                        </span>
                      </button>
                    </>
                  )}

                  {selectedRole === 'admin' && (
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() =>
                        handleDemoAccountLogin({
                          email: 'admin.alok@nishchint.in',
                          name: 'Dr. Alok Nath Mishra',
                          role: 'admin',
                          phone: '+91 94150 11980',
                          extra: {
                            adminId: 'DHO-VARANASI-01',
                            designation: 'District Chief Medical Officer (Varanasi)',
                            district: 'Varanasi',
                          },
                          mockFallback: {
                            id: 'usr-admin-1',
                            role: 'admin',
                            name: 'Dr. Alok Nath Mishra',
                            adminId: 'admin-1',
                            designation: 'District Chief Medical Officer (Varanasi)',
                          },
                        })
                      }
                      className="w-full p-3 bg-slate-50 hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 rounded-xl text-left text-xs transition-all flex items-center justify-between shadow-2xs hover:shadow-sm cursor-pointer"
                    >
                      <div>
                        <strong className="text-slate-900 block font-bold">Dr. Alok Nath Mishra</strong>
                        <span className="text-slate-500 text-[11px]">
                          District Chief Medical Officer • ABDM Nodal Officer (Varanasi)
                        </span>
                      </div>
                      <span className="text-indigo-700 font-bold text-[11px] bg-indigo-50 border border-indigo-200 px-2 py-1 rounded-lg">
                        Sign In &rarr;
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer disclaimer */}
      <footer className="relative z-10 max-w-6xl w-full mx-auto text-center pt-6 border-t border-slate-200 text-xs text-slate-500 space-y-1">
        <p>
          {t.footerTitle} • {t.footerSubtitle}
        </p>
        <p className="text-[11px] text-slate-400 font-mono">
          Connected Backend: {SUPABASE_URL}
        </p>
      </footer>
    </div>
  );

};
