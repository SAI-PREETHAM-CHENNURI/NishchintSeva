import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import { Facility, FacilityCategory } from '../../types';
import {
  Building2,
  PhoneCall,
  Navigation,
  MapPin,
  Clock,
  ShieldAlert,
  Sparkles,
  Stethoscope,
  Activity,
  CheckCircle2,
  ArrowRight,
  Pill,
  FlaskConical,
  ChevronLeft,
  Search,
  Check,
  X,
  AlertCircle,
  Car,
} from 'lucide-react';

interface MedicineItem {
  name: string;
  genericName: string;
  janAushadhiPrice: string;
  marketPrice: string;
  inStock: boolean;
  dosage: string;
}

const COMMON_GENERIC_MEDICINES: MedicineItem[] = [
  {
    name: 'Paracetamol 500mg (10 tabs)',
    genericName: 'Paracetamol IP',
    janAushadhiPrice: '₹12.00',
    marketPrice: '₹35.00',
    inStock: true,
    dosage: 'Fever & pain relief',
  },
  {
    name: 'Metformin 500mg SR (10 tabs)',
    genericName: 'Metformin Hydrochloride',
    janAushadhiPrice: '₹14.50',
    marketPrice: '₹68.00',
    inStock: true,
    dosage: 'Blood sugar control',
  },
  {
    name: 'Amlodipine 5mg (10 tabs)',
    genericName: 'Amlodipine Besylate',
    janAushadhiPrice: '₹9.00',
    marketPrice: '₹45.00',
    inStock: true,
    dosage: 'Blood pressure regulation',
  },
  {
    name: 'Telmisartan 40mg (10 tabs)',
    genericName: 'Telmisartan IP',
    janAushadhiPrice: '₹18.00',
    marketPrice: '₹89.00',
    inStock: true,
    dosage: 'Hypertension',
  },
  {
    name: 'Azithromycin 500mg (3 tabs)',
    genericName: 'Azithromycin Dihydrate',
    janAushadhiPrice: '₹34.00',
    marketPrice: '₹120.00',
    inStock: true,
    dosage: 'Bacterial infections',
  },
  {
    name: 'ORS Electrolyte Sachet 21.8g',
    genericName: 'Oral Rehydration Salts IP',
    janAushadhiPrice: '₹5.50',
    marketPrice: '₹22.00',
    inStock: true,
    dosage: 'Dehydration / Diarrhea',
  },
  {
    name: 'Pantoprazole 40mg (10 tabs)',
    genericName: 'Pantoprazole Sodium',
    janAushadhiPrice: '₹16.00',
    marketPrice: '₹75.00',
    inStock: true,
    dosage: 'Gastritis & acidity',
  },
];

const COMMON_DIAGNOSTIC_TESTS = [
  { name: 'Complete Blood Count (CBC)', time: 'Same day', cost: 'Free under PM-JAY / ₹80' },
  { name: 'Random & Fasting Blood Sugar', time: '15 mins', cost: 'Free / ₹25' },
  { name: 'Lipid Profile (Cholesterol)', time: '24 hours', cost: 'Free under PM-JAY / ₹180' },
  { name: 'HbA1c Glycated Hemoglobin', time: 'Same day', cost: '₹150' },
  { name: 'Digital Chest X-Ray PA View', time: '1 hour', cost: 'Free at CHC / ₹100' },
  { name: 'Sputum for AFB (TB Screening)', time: 'Same day', cost: 'Free under NTEP' },
  { name: '12-Lead ECG with Rhythm Strip', time: 'Immediate', cost: 'Free at PHC/CHC' },
];

export const FacilitiesDirectoryView: React.FC = () => {
  const { facilities, language } = useApp();
  const t = translations[language];

  // Category state: null means user is on the Category Selection Screen first!
  const [selectedCategory, setSelectedCategory] = useState<FacilityCategory | 'all' | null>(null);
  const [calledFacility, setCalledFacility] = useState<string | null>(null);
  const [activeMedicineModalFacility, setActiveMedicineModalFacility] = useState<Facility | null>(null);
  const [activeTestModalFacility, setActiveTestModalFacility] = useState<Facility | null>(null);
  const [medicineSearchQuery, setMedicineSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'smart' | 'distance' | 'openNow'>('smart');

  const categoriesConfig = [
    {
      id: 'hospital' as FacilityCategory,
      title: t.catHospitals,
      description: t.catHospitalsDesc,
      icon: <Building2 className="w-8 h-8 text-emerald-700" />,
      bg: 'bg-emerald-50 border-emerald-200 hover:border-emerald-500',
      count: facilities.filter((f) => f.category === 'hospital' || f.type === 'PHC' || f.type === 'CHC' || f.type === 'District Hospital').length,
    },
    {
      id: 'pharmacy' as FacilityCategory,
      title: t.catPharmacies,
      description: t.catPharmaciesDesc,
      icon: <Pill className="w-8 h-8 text-indigo-700" />,
      bg: 'bg-indigo-50 border-indigo-200 hover:border-indigo-500',
      count: facilities.filter((f) => f.category === 'pharmacy' || f.type === 'Jan Aushadhi').length,
    },
    {
      id: 'diagnostic' as FacilityCategory,
      title: t.catDiagnosticCentres,
      description: t.catDiagnosticCentresDesc,
      icon: <FlaskConical className="w-8 h-8 text-purple-700" />,
      bg: 'bg-purple-50 border-purple-200 hover:border-purple-500',
      count: facilities.filter((f) => f.category === 'diagnostic' || f.type === 'Diagnostic Centre').length,
    },
    {
      id: 'other' as FacilityCategory,
      title: t.catOther,
      description: t.catOtherDesc,
      icon: <Stethoscope className="w-8 h-8 text-teal-700" />,
      bg: 'bg-teal-50 border-teal-200 hover:border-teal-500',
      count: facilities.filter((f) => f.category === 'other' || f.type === 'Sub-Centre' || f.type === 'Clinic').length,
    },
    {
      id: 'all' as const,
      title: t.catAllFacilities,
      description: t.catAllFacilitiesDesc,
      icon: <Activity className="w-8 h-8 text-amber-700" />,
      bg: 'bg-amber-50 border-amber-200 hover:border-amber-500',
      count: facilities.length,
    },
  ];

  // Filter & Intelligent Ranking Logic
  const rankedFacilities = useMemo(() => {
    if (!selectedCategory) return [];

    let list = facilities.filter((fac) => {
      if (selectedCategory === 'all') return true;
      if (selectedCategory === 'hospital') {
        return fac.category === 'hospital' || fac.type === 'PHC' || fac.type === 'CHC' || fac.type === 'District Hospital';
      }
      if (selectedCategory === 'pharmacy') {
        return fac.category === 'pharmacy' || fac.type === 'Jan Aushadhi';
      }
      if (selectedCategory === 'diagnostic') {
        return fac.category === 'diagnostic' || fac.type === 'Diagnostic Centre';
      }
      if (selectedCategory === 'other') {
        return fac.category === 'other' || fac.type === 'Sub-Centre' || fac.type === 'Clinic';
      }
      return fac.category === selectedCategory;
    });

    // Intelligent Sorting
    return list.sort((a, b) => {
      if (sortBy === 'distance') {
        return a.distanceKm - b.distanceKm;
      }

      if (sortBy === 'openNow') {
        const aOpen = a.isOpenNow ? 1 : 0;
        const bOpen = b.isOpenNow ? 1 : 0;
        if (bOpen !== aOpen) return bOpen - aOpen;
        return a.distanceKm - b.distanceKm;
      }

      // Default 'smart' ranking:
      // 1. Open now facilities first
      // 2. Proximity (closer is better)
      // 3. 24x7 Emergency services higher weight
      const aScore = (a.isOpenNow ? 100 : 0) + (a.is24x7 ? 30 : 0) - a.distanceKm * 5;
      const bScore = (b.isOpenNow ? 100 : 0) + (b.is24x7 ? 30 : 0) - b.distanceKm * 5;
      return bScore - aScore;
    });
  }, [facilities, selectedCategory, sortBy]);

  const handleCall = (fac: Facility) => {
    setCalledFacility(fac.name);
    setTimeout(() => setCalledFacility(null), 3500);
  };

  const filteredMedicines = COMMON_GENERIC_MEDICINES.filter(
    (m) =>
      m.name.toLowerCase().includes(medicineSearchQuery.toLowerCase()) ||
      m.genericName.toLowerCase().includes(medicineSearchQuery.toLowerCase()) ||
      m.dosage.toLowerCase().includes(medicineSearchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast alert when calling */}
      {calledFacility && (
        <div className="bg-emerald-800 border-2 border-emerald-600 text-white p-4 rounded-2xl flex items-center gap-3 text-xs sm:text-sm font-bold shadow-lg animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
          <span>Calling {calledFacility}... Connecting emergency tele-line via rural gateway.</span>
        </div>
      )}

      {/* VIEW 1: CATEGORY SELECTION FIRST */}
      {selectedCategory === null ? (
        <div className="space-y-6">
          {/* Hero Prompt */}
          <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
            <div className="max-w-2xl space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-600/80 border border-emerald-400 text-white inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {t.nearbyFacilities}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {t.nearbyCareQuestion}
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                {t.nearbyCareSelectPrompt}
              </p>
            </div>
          </div>

          {/* Category Choice Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoriesConfig.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                id={`cat-card-${cat.id}`}
                className={`group bg-white border-2 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between ${cat.bg}`}
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-xs flex items-center justify-center group-hover:scale-110 transition-transform">
                      {cat.icon}
                    </div>
                    <span className="text-xs font-black px-2.5 py-1 rounded-full bg-white shadow-2xs text-slate-800">
                      {cat.count} {cat.count === 1 ? 'Location' : 'Locations'}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-900 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-medium">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-slate-800 group-hover:text-emerald-800">
                  <span>View Nearby Centres</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* VIEW 2: FACILITY LISTING WITH INTELLIGENT RANKING & CATEGORY PILLS */
        <div className="space-y-6">
          {/* Header Bar with Change Category action */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                id="back-to-categories-btn"
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors flex items-center gap-1 text-xs font-bold cursor-pointer"
                title="Back to all categories"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{t.changeCategory}</span>
              </button>

              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                  <span>
                    {categoriesConfig.find((c) => c.id === selectedCategory)?.title}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {rankedFacilities.length} {t.verifiedLocationsCount}
                  </span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t.rankedByProximity}
                </p>
              </div>
            </div>

            {/* Sorting Controls */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-bold hidden sm:inline">Sort:</span>
              <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setSortBy('smart')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    sortBy === 'smart' ? 'bg-white text-emerald-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Intelligent
                </button>
                <button
                  onClick={() => setSortBy('distance')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    sortBy === 'distance' ? 'bg-white text-emerald-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Nearest
                </button>
                <button
                  onClick={() => setSortBy('openNow')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    sortBy === 'openNow' ? 'bg-white text-emerald-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t.openNowBadge}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Category Switcher Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categoriesConfig.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  id={`sub-cat-${cat.id}`}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    isActive
                      ? 'bg-emerald-700 text-white border-emerald-800 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat.title} ({cat.count})
                </button>
              );
            })}
          </div>

          {/* Facilities Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rankedFacilities.map((fac, idx) => {
              const isJanAushadhi = fac.category === 'pharmacy' || fac.type === 'Jan Aushadhi';
              const isDiagnostic = fac.category === 'diagnostic' || fac.type === 'Diagnostic Centre';
              const isHospital = fac.category === 'hospital' || fac.type === 'PHC' || fac.type === 'CHC' || fac.type === 'District Hospital';

              return (
                <div
                  key={fac.id}
                  id={`facility-card-${fac.id}`}
                  className="bg-white border-2 border-slate-200 hover:border-emerald-400 rounded-3xl p-5 shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Top Header Row */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold shrink-0 ${
                            isJanAushadhi
                              ? 'bg-indigo-100 text-indigo-800'
                              : isDiagnostic
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {isJanAushadhi ? (
                            <Pill className="w-6 h-6" />
                          ) : isDiagnostic ? (
                            <FlaskConical className="w-6 h-6" />
                          ) : (
                            <Building2 className="w-6 h-6" />
                          )}
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 uppercase">
                              {fac.type}
                            </span>
                            {fac.isOpenNow ? (
                              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                                {t.openNowBadge}
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                                {t.closedBadge}
                              </span>
                            )}
                          </div>

                          <h4 className="font-black text-base text-slate-900 mt-1 leading-snug">
                            {fac.name}
                          </h4>
                        </div>
                      </div>

                      {/* Distance & Travel Info Badge */}
                      <div className="text-right shrink-0">
                        <span className="text-xs font-black text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-xl block">
                          {fac.distanceKm} km
                        </span>
                        {fac.travelInfo && (
                          <span className="text-[10px] text-slate-500 font-medium block mt-1">
                            {fac.travelInfo}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Address & Timings */}
                    <div className="mt-3.5 space-y-1.5 text-xs text-slate-600">
                      <p className="flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span>{fac.address}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="font-medium text-slate-700">
                          {fac.timings || (fac.is24x7 ? '24 Hours Open' : '8:00 AM - 6:00 PM')}
                        </span>
                      </p>
                    </div>

                    {/* Feature Badges */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {fac.is24x7 && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-200 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> 24x7 Emergency
                        </span>
                      )}
                      {fac.hasAmbulance && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          Ambulance Stationed
                        </span>
                      )}
                      {fac.availableDoctorsCount > 0 && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                          {fac.availableDoctorsCount} Doctors Available
                        </span>
                      )}
                      {isJanAushadhi && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> 50%-90% Subsidized
                        </span>
                      )}
                    </div>

                    {/* Available Services Chips */}
                    {fac.availableServices && fac.availableServices.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">
                          Available Services:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {fac.availableServices.map((svc, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-50 text-slate-700 border border-slate-200"
                            >
                              {svc}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Dynamic Action Buttons Tailored by Facility Type */}
                  <div className="mt-5 pt-3 border-t border-slate-100 space-y-2">
                    {isJanAushadhi ? (
                      /* Jan Aushadhi specific actions */
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setActiveMedicineModalFacility(fac)}
                          id={`check-stock-btn-${fac.id}`}
                          className="py-2.5 px-3 bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                        >
                          <Pill className="w-3.5 h-3.5" />
                          <span>Check Stock</span>
                        </button>

                        <button
                          onClick={() => handleCall(fac)}
                          className="py-2.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>{t.callToCheckMedicine}</span>
                        </button>
                      </div>
                    ) : isDiagnostic ? (
                      /* Diagnostic Centre specific actions */
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setActiveTestModalFacility(fac)}
                          id={`view-tests-btn-${fac.id}`}
                          className="py-2.5 px-3 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                        >
                          <FlaskConical className="w-3.5 h-3.5" />
                          <span>View Lab Tests</span>
                        </button>

                        <button
                          onClick={() => handleCall(fac)}
                          className="py-2.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>Call Lab</span>
                        </button>
                      </div>
                    ) : (
                      /* Hospital / PHC / CHC actions */
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleCall(fac)}
                          className="py-2.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>Call Hospital</span>
                        </button>

                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            fac.name + ' ' + fac.address
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors text-center"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>Get Route</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODAL 1: JAN AUSHADHI MEDICINE AVAILABILITY CHECKER */}
      {activeMedicineModalFacility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[90vh] flex flex-col">
            <div className="bg-indigo-800 text-white p-5 shrink-0 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-700 border border-indigo-500 text-indigo-100 inline-block mb-1">
                  Jan Aushadhi Inventory
                </span>
                <h3 className="text-lg font-black">{activeMedicineModalFacility.name}</h3>
                <p className="text-xs text-indigo-200 mt-0.5">
                  Subsidized generic medicines available under PMBJP
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveMedicineModalFacility(null);
                  setMedicineSearchQuery('');
                }}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-4 border-b border-slate-200 bg-slate-50">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={medicineSearchQuery}
                  onChange={(e) => setMedicineSearchQuery(e.target.value)}
                  placeholder="Search medicine by brand or generic salt name..."
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Medicine Items List */}
            <div className="p-4 overflow-y-auto space-y-2.5 flex-1">
              {filteredMedicines.map((med, mIdx) => (
                <div
                  key={mIdx}
                  className="bg-white border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between gap-3 hover:border-indigo-300 transition-colors"
                >
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm">{med.name}</h5>
                    <p className="text-[11px] text-slate-500">{med.genericName} • {med.dosage}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        Jan Aushadhi: {med.janAushadhiPrice}
                      </span>
                      <span className="text-[10px] text-slate-400 line-through">
                        Market: {med.marketPrice}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <Check className="w-3 h-3" /> In Stock
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Call {activeMedicineModalFacility.phone} for prescription reservations
              </span>
              <button
                onClick={() => {
                  setActiveMedicineModalFacility(null);
                  setMedicineSearchQuery('');
                }}
                className="px-4 py-2 bg-indigo-800 hover:bg-indigo-900 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: DIAGNOSTIC CENTRE LAB TESTS CHECKER */}
      {activeTestModalFacility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[90vh] flex flex-col">
            <div className="bg-purple-800 text-white p-5 shrink-0 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-700 border border-purple-500 text-purple-100 inline-block mb-1">
                  Diagnostic & Pathology Services
                </span>
                <h3 className="text-lg font-black">{activeTestModalFacility.name}</h3>
                <p className="text-xs text-purple-200 mt-0.5">
                  Certified tests covered under PM-JAY & subsidized rates
                </p>
              </div>
              <button
                onClick={() => setActiveTestModalFacility(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-2.5 flex-1">
              {COMMON_DIAGNOSTIC_TESTS.map((test, tIdx) => (
                <div
                  key={tIdx}
                  className="bg-white border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between gap-3 hover:border-purple-300 transition-colors"
                >
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm">{test.name}</h5>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3 h-3 text-slate-400" />
                      Report Time: {test.time}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-purple-50 text-purple-800 border border-purple-200 block">
                      {test.cost}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Direct walk-in available with Doctor's prescription slip
              </span>
              <button
                onClick={() => setActiveTestModalFacility(null)}
                className="px-4 py-2 bg-purple-800 hover:bg-purple-900 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
