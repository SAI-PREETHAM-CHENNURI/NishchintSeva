import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import {
  PhoneCall,
  AlertOctagon,
  X,
  Navigation,
  UserCheck,
  Building2,
  ShieldAlert,
  CheckCircle2,
  Activity,
  HeartCrack,
  Flame,
} from 'lucide-react';

export const EmergencyModal: React.FC = () => {
  const { emergencyModalOpen, setEmergencyModalOpen, currentPatient, facilities, fhws, language } = useApp();
  const t = translations[language];

  const [callInitiated, setCallInitiated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'dispatch' | 'firstaid'>('dispatch');

  if (!emergencyModalOpen) return null;

  const nearestPhc = facilities.find((f) => f.type === 'PHC') || facilities[0];
  const assignedAsha = fhws[0];

  const firstAidGuides = [
    {
      title: t.firstAidChestPain,
      icon: <HeartCrack className="w-5 h-5 text-red-600" />,
      steps: [
        'Have the patient sit down in a comfortable upright position; do not let them walk.',
        'Loosen tight clothing around chest, neck, and waist.',
        'Keep them calm and encourage steady breathing.',
        'If prescribed medication by a verified doctor, administer as directed.',
      ],
    },
    {
      title: t.firstAidBreathing,
      icon: <Activity className="w-5 h-5 text-amber-600" />,
      steps: [
        'Sit patient upright with open windows or move outdoors into fresh air.',
        'If patient has a prescribed inhaler or nebulizer, use as directed.',
        'Do not give heavy food or force lying down.',
        'Monitor lips and nails for blue/grey discoloration.',
      ],
    },
    {
      title: t.firstAidSnakebite,
      icon: <Flame className="w-5 h-5 text-rose-600" />,
      steps: [
        'Keep the victim completely still and calm to slow venom spread.',
        'Immobilize the bitten limb below heart level. Do NOT apply tight tourniquets or cut the wound.',
        'Do not give alcohol, herbal remedies, or traditional cuts.',
        'Rush directly to nearest PHC/CHC equipped with Anti-Snake Venom (ASV).',
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border-2 border-red-500 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Urgent Header */}
        <div className="bg-red-600 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-700 rounded-xl animate-bounce">
              <AlertOctagon className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase bg-red-800 px-2 py-0.5 rounded text-red-100">
                {t.criticalEmergencyBanner}
              </span>
              <h2 className="text-xl sm:text-2xl font-black mt-0.5">
                {t.emergencyTitle}
              </h2>
            </div>
          </div>
          <button
            onClick={() => setEmergencyModalOpen(false)}
            className="p-2 rounded-full hover:bg-red-700 text-red-100 transition-colors cursor-pointer"
            aria-label="Close emergency modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Safety Disclaimer Banner */}
        <div className="bg-amber-50 border-b border-amber-200 p-3 text-xs text-amber-900 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">
              {t.mockDataNotice}: Dial 108 immediately from any mobile or landline phone in India.
            </p>
            <p className="text-amber-800 mt-0.5">
              {t.emergencyDesc}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-2">
          <button
            onClick={() => setActiveTab('dispatch')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'dispatch'
                ? 'border-red-600 text-red-600 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            1. {t.dial108Now}
          </button>
          <button
            onClick={() => setActiveTab('firstaid')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'firstaid'
                ? 'border-red-600 text-red-600 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            2. {t.firstAidTitle}
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {activeTab === 'dispatch' ? (
            <div className="space-y-4">
              {/* Primary One-Tap 108 Dial Simulator */}
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-5 text-center">
                <p className="text-xs font-bold text-red-800 uppercase tracking-wide">
                  {t.ambulance108}
                </p>
                <div className="my-3">
                  <span className="text-4xl sm:text-5xl font-extrabold text-red-600 tracking-tight">
                    108 / 112
                  </span>
                  <p className="text-xs text-slate-600 mt-1">
                    Free 24x7 Government Medical Response across India
                  </p>
                </div>

                {callInitiated ? (
                  <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 p-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                    <span>{t.ambulanceDispatched}</span>
                  </div>
                ) : (
                  <button
                    onClick={() => setCallInitiated(true)}
                    id="dial-108-btn"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-base rounded-xl shadow-lg shadow-red-600/30 transition-transform active:scale-95 cursor-pointer"
                  >
                    <PhoneCall className="w-5 h-5 animate-pulse" />
                    <span>{t.dial108Now}</span>
                  </button>
                )}
              </div>

              {/* Patient Location & Automated SOS Broadcast */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Local ASHA Alert */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-start gap-3">
                  <div className="p-2 bg-amber-100 text-amber-800 rounded-lg shrink-0">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-slate-900">{t.assignedAshaWorker}</p>
                    <p className="text-slate-600">{assignedAsha.name} ({assignedAsha.village})</p>
                    <p className="text-slate-500 font-mono mt-0.5">{assignedAsha.phone}</p>
                    <span className="inline-block mt-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      Auto-notified on SOS
                    </span>
                  </div>
                </div>

                {/* Nearest Health Centre */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-start gap-3">
                  <div className="p-2 bg-teal-100 text-teal-800 rounded-lg shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-slate-900">{nearestPhc.name}</p>
                    <p className="text-slate-600">{nearestPhc.distanceKm} km away • 24x7 Emergency</p>
                    <p className="text-slate-500 font-mono mt-0.5">{nearestPhc.phone}</p>
                    <div className="flex items-center gap-1 text-[10px] font-medium text-teal-700 mt-1">
                      <Navigation className="w-3 h-3" />
                      <span>Route: Via Main Gram Panchayat Road</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Patient Medical ID Snapshot for Responder */}
              <div className="bg-slate-100 rounded-xl p-3.5 text-xs text-slate-700 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">
                  {t.patientProfile}:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-600">
                  <div>
                    <span className="text-[10px] text-slate-600 block font-semibold">{t.patientName}</span>
                    <span className="font-semibold text-slate-800">{currentPatient.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-600 block font-semibold">{t.bloodGroup}</span>
                    <span className="font-bold text-red-600">{currentPatient.bloodGroup}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-600 block font-semibold">{t.villageHamlet}</span>
                    <span className="font-semibold text-slate-800">{currentPatient.village}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-600 block font-semibold">{t.allergies}</span>
                    <span className="font-semibold text-slate-800">
                      {currentPatient.allergies.join(', ') || 'None'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 italic">
                Follow these critical first steps while waiting for the ambulance or medical professional:
              </p>
              <div className="space-y-3">
                {firstAidGuides.map((guide, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-slate-50/70">
                    <div className="flex items-center gap-2.5 mb-2">
                      {guide.icon}
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{guide.title}</h4>
                      </div>
                    </div>
                    <ul className="space-y-1.5 pl-6 list-disc text-xs text-slate-700">
                      {guide.steps.map((step, sIdx) => (
                        <li key={sIdx}>{step}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-5 py-3 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            Emergency Response Mode • National Health Helpline: 1075
          </span>
          <button
            onClick={() => setEmergencyModalOpen(false)}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            {t.cancel}
          </button>
        </div>
      </div>
    </div>
  );
};
