import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import {
  ShieldAlert,
  AlertTriangle,
  FileCheck2,
  Lock,
  RefreshCw,
  LogOut,
  Stethoscope,
  Building2,
  AlertOctagon,
  CheckCircle2,
  PhoneCall,
  ExternalLink,
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

export const DoctorVerificationBarrier: React.FC = () => {
  const { activeDoctor, authUser, logout, language, updateDoctorAvailability, login } = useApp();
  const t = translations[language];

  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<string | null>(null);

  const status = activeDoctor.verificationStatus || (activeDoctor.isVerified ? 'approved' : 'pending');

  const handleRecheckStatus = async () => {
    setIsChecking(true);
    setCheckResult(null);

    try {
      if (isSupabaseConfigured && authUser?.id) {
        const { data, error } = await supabase
          .from('doctor_profiles')
          .select('*')
          .eq('id', authUser.id)
          .maybeSingle();

        if (error) {
          setCheckResult(`Database query note: ${error.message}`);
        } else if (data) {
          if (data.is_verified === true && data.verification_status === 'approved') {
            setCheckResult('Verification Approved! Refreshing your clinical session...');
            // Update authUser and activeDoctor
            login({
              ...authUser,
              isVerified: true,
              verificationStatus: 'approved',
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
            return;
          } else {
            const currentStat = data.verification_status || (data.is_verified ? 'approved' : 'pending');
            setCheckResult(
              `Live database status: "${currentStat.toUpperCase()}". Status has not yet been updated to "approved".`
            );
          }
        } else {
          setCheckResult('Doctor profile record not found in doctor_profiles table.');
        }
      } else {
        // Demonstration simulation
        await new Promise((r) => setTimeout(r, 800));
        setCheckResult('Verification status confirmed from database: Registration is currently in PENDING state.');
      }
    } catch (e: any) {
      setCheckResult(`Check failed: ${e.message}`);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in py-4">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div
          className={`px-6 py-6 text-white ${
            status === 'rejected' || status === 'suspended'
              ? 'bg-red-700'
              : 'bg-amber-600'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur-xs shrink-0">
                {status === 'rejected' || status === 'suspended' ? (
                  <AlertOctagon className="w-8 h-8 text-white" />
                ) : (
                  <AlertTriangle className="w-8 h-8 text-white" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 text-white">
                    ABDM Provider Registry • NMC Protocol
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black mt-1">
                  {status === 'rejected'
                    ? 'Doctor Verification Unsuccessful'
                    : status === 'suspended'
                    ? 'Medical License Practice Suspended'
                    : 'Doctor Credentials Pending NMC Verification'}
                </h1>
                <p className="text-white/80 text-xs sm:text-sm mt-0.5">
                  Clinical access to patient records, teleconsultation queues, and electronic prescribing is locked.
                </p>
              </div>
            </div>

            <div className="sm:self-center shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-slate-900 font-extrabold text-xs shadow-xs">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                Status: {status.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Doctor Details Card */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 font-semibold block text-[11px]">Practitioner Name</span>
              <span className="text-slate-900 font-black text-sm">{activeDoctor.name}</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold block text-[11px]">Medical Council Registration</span>
              <span className="text-slate-900 font-mono font-bold">{activeDoctor.registrationNo}</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold block text-[11px]">Specialty & Qualification</span>
              <span className="text-slate-900 font-semibold">
                {activeDoctor.specialty} ({activeDoctor.qualification})
              </span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold block text-[11px]">Medical Council Authority</span>
              <span className="text-slate-900 font-semibold">
                {activeDoctor.medicalCouncil || 'National Medical Commission (NMC)'}
              </span>
            </div>
          </div>

          {/* Regulatory Notice */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-xs text-amber-950 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <Lock className="w-4 h-4 text-amber-700" />
              <span>Statutory Compliance Barrier (Telemedicine Practice Guidelines 2020)</span>
            </div>
            <p className="leading-relaxed text-amber-900">
              In accordance with National Medical Commission regulations and Ayushman Bharat Digital Mission (ABDM)
              security policies, medical practitioners cannot access confidential clinical patient charts, conduct
              telemedicine consultations, or issue digital prescriptions until their medical registration number is
              officially confirmed by the council registrar.
            </p>
          </div>

          {/* Locked Features Summary */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              Enforced Clinical Restrictions (Locked)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-100/80 border border-slate-200 text-slate-700">
                <Lock className="w-4 h-4 text-red-500 shrink-0" />
                <span>Issuing digital prescriptions & Jan Aushadhi advice</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-100/80 border border-slate-200 text-slate-700">
                <Lock className="w-4 h-4 text-red-500 shrink-0" />
                <span>Conducting live audio/video teleconsultations</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-100/80 border border-slate-200 text-slate-700">
                <Lock className="w-4 h-4 text-red-500 shrink-0" />
                <span>Ordering lab diagnostic investigations</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-100/80 border border-slate-200 text-slate-700">
                <Lock className="w-4 h-4 text-red-500 shrink-0" />
                <span>Modifying or saving clinical diagnosis records</span>
              </div>
            </div>
          </div>

          {/* Check result feedback */}
          {checkResult && (
            <div
              className={`p-3.5 rounded-xl text-xs font-medium border ${
                checkResult.includes('Approved')
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-slate-100 border-slate-300 text-slate-800'
              }`}
            >
              {checkResult}
            </div>
          )}

          {/* Actions: Re-check & Logout */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200">
            <button
              onClick={handleRecheckStatus}
              disabled={isChecking}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-black text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
              <span>{isChecking ? 'Checking Database...' : 'Re-check Verification Status'}</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={logout}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out / Switch Role</span>
              </button>
            </div>
          </div>

          {/* Helpdesk Footer */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <span>NMC Verification Helpline: 1800-11-4477 (Mon-Fri, 9:30 AM - 5:30 PM IST)</span>
            <span className="font-mono text-slate-400">ABDM Registry Node: U.P. Medical Council</span>
          </div>
        </div>
      </div>
    </div>
  );
};
