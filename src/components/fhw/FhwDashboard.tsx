import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import { Patient, VitalRecord, VitalAlert } from '../../types';
import {
  Users,
  UserPlus,
  Activity,
  CalendarPlus,
  Navigation,
  CheckCircle2,
  AlertTriangle,
  HeartPulse,
  Search,
  CheckSquare,
  ShieldCheck,
  PhoneCall,
  Clock,
  Sparkles,
  ClipboardList,
  Globe,
} from 'lucide-react';

export const FhwDashboard: React.FC = () => {
  const {
    activeFhw,
    patients,
    doctors,
    registerPatient,
    recordVitals,
    bookAppointment,
    referrals,
    followUps,
    toggleFollowUpComplete,
    language,
    openLanguageSelector,
  } = useApp();

  const t = translations[language];

  const [activeTab, setActiveTab] = useState<'roster' | 'register' | 'vitals' | 'book' | 'referrals'>('roster');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRiskOnly, setFilterRiskOnly] = useState(false);

  // Registration Form State
  const [regName, setRegName] = useState('');
  const [regAge, setRegAge] = useState<number>(32);
  const [regGender, setRegGender] = useState<'Female' | 'Male' | 'Other'>('Female');
  const [regPhone, setRegPhone] = useState('+91 9');
  const [regVillage, setRegVillage] = useState(activeFhw.village);
  const [regBloodGroup, setRegBloodGroup] = useState('B+');
  const [regPmjay, setRegPmjay] = useState(true);
  const [regConsent, setRegConsent] = useState(true);
  const [regConditions, setRegConditions] = useState('');
  const [regSuccess, setRegSuccess] = useState<string | null>(null);

  // Vitals Form State
  const [selectedPatientId, setSelectedPatientId] = useState<string>(patients[0]?.id || '');
  const [vSystolic, setVSystolic] = useState<number>(140);
  const [vDiastolic, setVDiastolic] = useState<number>(90);
  const [vPulse, setVPulse] = useState<number>(76);
  const [vSpO2, setVSpO2] = useState<number>(98);
  const [vTemp, setVTemp] = useState<number>(98.6);
  const [vSugar, setVSugar] = useState<number>(140);
  const [vHb, setVHb] = useState<number>(11.5);
  const [vNotes, setVNotes] = useState('');
  const [vitalsSaved, setVitalsSaved] = useState<boolean>(false);

  // Appointment Booking State
  const [bookDoctorId, setBookDoctorId] = useState<string>(doctors[0]?.id || '');
  const [bookComplaint, setBookComplaint] = useState('');
  const [bookUrgency, setBookUrgency] = useState<'normal' | 'urgent'>('normal');
  const [bookSuccess, setBookSuccess] = useState<string | null>(null);

  // Patients assigned to this FHW's coverage area
  const assignedPatients = patients.filter((p) => {
    // Authorized to this FHW's village or primary sub-centre
    return p.village === activeFhw.village || p.village === 'Rampur Kalan';
  });

  // Filtered patients for search
  const filteredPatients = assignedPatients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.abhaId.includes(searchQuery);
    if (filterRiskOnly) {
      return matchesSearch && (p.isHighRiskPregnancy || p.chronicConditions.length > 0);
    }
    return matchesSearch;
  });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const abhaGenerated = `14-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newP = registerPatient({
      name: regName,
      age: Number(regAge),
      gender: regGender,
      phone: regPhone,
      village: regVillage,
      district: 'Varanasi',
      state: 'Uttar Pradesh',
      bloodGroup: regBloodGroup,
      pmjayCard: regPmjay,
      consentGiven: regConsent,
      chronicConditions: regConditions ? regConditions.split(',').map((s) => s.trim()) : [],
      allergies: [],
      abhaId: abhaGenerated,
    });

    setRegSuccess(`Registered ${newP.name} with new ABHA ID ${newP.abhaId}`);
    setRegName('');
    setTimeout(() => {
      setRegSuccess(null);
      setActiveTab('roster');
    }, 2000);
  };

  const handleRecordVitals = (e: React.FormEvent) => {
    e.preventDefault();
    let flag: VitalAlert = 'normal';
    if (vSystolic >= 160 || vDiastolic >= 100 || vSpO2 < 93 || vTemp >= 102) {
      flag = 'critical';
    } else if (vSystolic >= 140 || vDiastolic >= 90 || vSpO2 < 95 || vSugar > 160 || vHb < 10) {
      flag = 'moderate';
    }

    recordVitals(selectedPatientId, {
      recordedBy: `${activeFhw.name} (${activeFhw.roleTitle} Worker)`,
      bpSystolic: Number(vSystolic),
      bpDiastolic: Number(vDiastolic),
      pulse: Number(vPulse),
      spO2: Number(vSpO2),
      tempF: Number(vTemp),
      bloodSugarMgDl: Number(vSugar),
      hemoglobin: Number(vHb),
      alertFlag: flag,
      notes: vNotes,
    });

    setVitalsSaved(true);
    setTimeout(() => setVitalsSaved(false), 2500);
  };

  const handleBookOnBehalf = (e: React.FormEvent) => {
    e.preventDefault();
    const apt = bookAppointment({
      patientId: selectedPatientId,
      doctorId: bookDoctorId,
      chiefComplaint: bookComplaint,
      priority: bookUrgency,
      triageCategory: bookUrgency === 'urgent' ? 'yellow' : 'green',
      bookedBy: 'ASHA Worker',
      bookedByName: `${activeFhw.name} (${activeFhw.roleTitle})`,
      fhwNotes: `Assisted rural booking from ${activeFhw.village} Sub-Centre.`,
    });

    setBookSuccess(`Token #${apt.tokenNumber} successfully booked for ${apt.patientName}!`);
    setBookComplaint('');
    setTimeout(() => setBookSuccess(null), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Frontline Health Worker Identity Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center font-black text-2xl text-amber-200 shadow-md">
              <Users className="w-9 h-9" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950">
                  {activeFhw.roleTitle} • Sub-Centre {activeFhw.village}
                </span>
                <span className="text-xs text-amber-200">
                  Worker ID: {activeFhw.workerId}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black mt-1">{activeFhw.name}</h1>
              <p className="text-xs sm:text-sm text-amber-100">
                Authorized Field Worker • {activeFhw.assignedHouseholds} Assigned Households in {activeFhw.village}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={openLanguageSelector}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all border border-white/20 cursor-pointer"
            >
              <Globe className="w-4 h-4 text-amber-200" />
              <span>{t.selectLanguage}</span>
            </button>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-2xl p-3 border border-white/15">
              <div className="text-center px-2 border-r border-white/20">
                <span className="text-xs text-amber-200 block">Covered</span>
                <strong className="text-base font-black">{assignedPatients.length} Patients</strong>
              </div>
              <div className="text-center px-2">
                <span className="text-xs text-amber-200 block">Due Visits</span>
                <strong className="text-base font-black text-amber-300">
                  {followUps.filter((f) => !f.completed).length} Pending
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('roster')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'roster'
              ? 'bg-amber-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>{t.assignedPatients} ({assignedPatients.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('vitals')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'vitals'
              ? 'bg-amber-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>{t.recordVitalsTab}</span>
        </button>

        <button
          onClick={() => setActiveTab('book')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'book'
              ? 'bg-amber-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <CalendarPlus className="w-4 h-4" />
          <span>{t.bookOnBehalf}</span>
        </button>

        <button
          onClick={() => setActiveTab('register')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'register'
              ? 'bg-amber-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <UserPlus className="w-4 h-4" />
          <span>{t.registerPatientTab}</span>
        </button>

        <button
          onClick={() => setActiveTab('referrals')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'referrals'
              ? 'bg-amber-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Navigation className="w-4 h-4" />
          <span>{t.trackReferrals}</span>
        </button>
      </div>

      {/* Tab 1: Assigned Patients Roster */}
      {activeTab === 'roster' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search patient name or ABHA ID..."
                className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-xs focus:ring-2 focus:ring-amber-500 text-slate-900"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 px-3 py-2 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterRiskOnly}
                  onChange={(e) => setFilterRiskOnly(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                />
                <span>{t.highRiskOnly}</span>
              </label>
              <button
                onClick={() => setActiveTab('register')}
                className="px-3.5 py-2 bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>+ {t.registerPatientTab}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPatients.map((p) => {
              const latestV = p.vitalsHistory[0];

              return (
                <div
                  key={p.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-amber-400 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-black text-base text-slate-900">{p.name}</h4>
                          {p.isHighRiskPregnancy && (
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-300">
                              High-Risk ANC
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 font-mono mt-0.5">{t.abhaId}: {p.abhaId}</p>
                        <p className="text-xs text-slate-600 mt-1">
                          {p.gender}, {p.age} yrs • {t.gramPanchayat}: <strong>{p.village}</strong> • {p.phone}
                        </p>
                      </div>

                      <span className="text-xs font-bold px-2 py-1 bg-slate-100 rounded-lg text-slate-700 shrink-0">
                        {p.bloodGroup}
                      </span>
                    </div>

                    {/* Vitals summary */}
                    {latestV ? (
                      <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 flex flex-wrap items-center justify-between gap-2">
                        <span>
                          {t.bloodPressure}: <strong>{latestV.bpSystolic}/{latestV.bpDiastolic}</strong>
                        </span>
                        <span>
                          {t.oxygenLevel}: <strong>{latestV.spO2}%</strong>
                        </span>
                        <span>
                          {t.randomSugar}: <strong>{latestV.bloodSugarMgDl ? `${latestV.bloodSugarMgDl} mg` : 'N/A'}</strong>
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            latestV.alertFlag === 'critical'
                              ? 'bg-red-100 text-red-800'
                              : latestV.alertFlag === 'moderate'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {latestV.alertFlag.toUpperCase()}
                        </span>
                      </div>
                    ) : (
                      <div className="mt-3 p-2 bg-slate-50 rounded-xl text-xs text-slate-400 italic">
                        No vitals logged yet this week.
                      </div>
                    )}

                    {p.chronicConditions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1 text-[11px]">
                        {p.chronicConditions.map((c, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions (Strictly FHW workflow) */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedPatientId(p.id);
                        setActiveTab('vitals');
                      }}
                      className="flex-1 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Activity className="w-3.5 h-3.5" />
                      <span>{t.recordVitalsTab}</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPatientId(p.id);
                        setActiveTab('book');
                      }}
                      className="flex-1 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <CalendarPlus className="w-3.5 h-3.5" />
                      <span>{t.bookOnBehalf}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Record Vitals & Symptoms */}
      {activeTab === 'vitals' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-amber-100 text-amber-800 rounded-2xl">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-900">
                {t.recordVitalsTab}
              </h3>
              <p className="text-xs text-slate-500">
                Values will automatically synchronize with Doctor Tele-OPD queue
              </p>
            </div>
          </div>

          {vitalsSaved && (
            <div className="mb-4 bg-emerald-100 border border-emerald-300 text-emerald-900 p-3 rounded-xl flex items-center gap-2 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Vitals saved and synchronized! Automatic triage alert dispatched if elevated.</span>
            </div>
          )}

          <form onSubmit={handleRecordVitals} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                {t.selectPatient}:
              </label>
              <select
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-900"
              >
                {assignedPatients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.gender}, {p.age}y - {p.village})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  {t.bpSystolic}
                </label>
                <input
                  type="number"
                  required
                  value={vSystolic}
                  onChange={(e) => setVSystolic(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  {t.bpDiastolic}
                </label>
                <input
                  type="number"
                  required
                  value={vDiastolic}
                  onChange={(e) => setVDiastolic(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  {t.oxygenLevel}
                </label>
                <input
                  type="number"
                  required
                  value={vSpO2}
                  onChange={(e) => setVSpO2(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  {t.pulseRate}
                </label>
                <input
                  type="number"
                  required
                  value={vPulse}
                  onChange={(e) => setVPulse(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  {t.tempF}
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={vTemp}
                  onChange={(e) => setVTemp(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  {t.randomSugar}
                </label>
                <input
                  type="number"
                  value={vSugar}
                  onChange={(e) => setVSugar(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  {t.hemoglobin}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={vHb}
                  onChange={(e) => setVHb(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                {t.fhwObservations}:
              </label>
              <textarea
                rows={2}
                value={vNotes}
                onChange={(e) => setVNotes(e.target.value)}
                placeholder="Observations, compliance notes..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white font-black text-sm rounded-xl shadow-md transition-transform active:scale-[0.99] cursor-pointer"
            >
              {t.saveVitals}
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: Book Doctor OPD on Behalf */}
      {activeTab === 'book' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-emerald-100 text-emerald-800 rounded-2xl">
              <CalendarPlus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-900">
                {t.bookOnBehalf}
              </h3>
              <p className="text-xs text-slate-500">
                Assisted booking for rural citizens who need digital healthcare access
              </p>
            </div>
          </div>

          {bookSuccess && (
            <div className="mb-4 bg-emerald-100 border border-emerald-300 text-emerald-900 p-3 rounded-xl flex items-center gap-2 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>{bookSuccess}</span>
            </div>
          )}

          <form onSubmit={handleBookOnBehalf} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                {t.selectPatient}:
              </label>
              <select
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-900"
              >
                {assignedPatients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.gender}, {p.age}y - {p.village})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                {t.selectSpecialist}:
              </label>
              <select
                value={bookDoctorId}
                onChange={(e) => setBookDoctorId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-900"
              >
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.specialty}) • {d.availabilityStatus}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                {t.priority}:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setBookUrgency('normal')}
                  className={`py-2 text-xs font-bold rounded-xl border cursor-pointer ${
                    bookUrgency === 'normal'
                      ? 'bg-emerald-700 text-white border-emerald-800'
                      : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  🟢 {t.normal}
                </button>
                <button
                  type="button"
                  onClick={() => setBookUrgency('urgent')}
                  className={`py-2 text-xs font-bold rounded-xl border cursor-pointer ${
                    bookUrgency === 'urgent'
                      ? 'bg-amber-600 text-white border-amber-700'
                      : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  🟡 {t.urgent}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                {t.chiefComplaint}:
              </label>
              <textarea
                required
                rows={3}
                value={bookComplaint}
                onChange={(e) => setBookComplaint(e.target.value)}
                placeholder="Clinical observations..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm rounded-xl shadow-md transition-transform active:scale-[0.99] cursor-pointer"
            >
              {t.generateToken}
            </button>
          </form>
        </div>
      )}

      {/* Tab 4: Register Patient */}
      {activeTab === 'register' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-indigo-100 text-indigo-800 rounded-2xl">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-900">
                {t.registerPatientTab}
              </h3>
              <p className="text-xs text-slate-500">
                Offline-capable registration with e-KYC consent & PM-JAY linking
              </p>
            </div>
          </div>

          {regSuccess && (
            <div className="mb-4 bg-emerald-100 border border-emerald-300 text-emerald-900 p-3 rounded-xl flex items-center gap-2 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>{regSuccess}</span>
            </div>
          )}

          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  {t.fullName}
                </label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="E.g. Shanti Devi"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  {t.age}
                </label>
                <input
                  type="number"
                  required
                  value={regAge}
                  onChange={(e) => setRegAge(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  {t.gender}
                </label>
                <select
                  value={regGender}
                  onChange={(e) => setRegGender(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-semibold"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  {t.mobileNumber}
                </label>
                <input
                  type="text"
                  required
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-mono font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  {t.gramPanchayat}
                </label>
                <input
                  type="text"
                  required
                  value={regVillage}
                  onChange={(e) => setRegVillage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  {t.bloodGroup}
                </label>
                <select
                  value={regBloodGroup}
                  onChange={(e) => setRegBloodGroup(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-semibold"
                >
                  <option value="A+">A+</option>
                  <option value="B+">B+</option>
                  <option value="O+">O+</option>
                  <option value="AB+">AB+</option>
                  <option value="Unknown">Unknown</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Known Chronic Illnesses:
              </label>
              <input
                type="text"
                value={regConditions}
                onChange={(e) => setRegConditions(e.target.value)}
                placeholder="E.g., Hypertension, Diabetes"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs"
              />
            </div>

            <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 space-y-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-800">
                <input
                  type="checkbox"
                  checked={regPmjay}
                  onChange={(e) => setRegPmjay(e.target.checked)}
                  className="rounded text-amber-600 w-4 h-4"
                />
                <span className="font-bold">{t.pmjayCard} Linking</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-slate-800">
                <input
                  type="checkbox"
                  required
                  checked={regConsent}
                  onChange={(e) => setRegConsent(e.target.checked)}
                  className="rounded text-amber-600 w-4 h-4"
                />
                <span className="font-bold">
                  Patient Verbal Consent Captured for digital ABHA creation & EHR sharing
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-700 hover:bg-indigo-800 text-white font-black text-sm rounded-xl shadow-md transition-transform active:scale-[0.99] cursor-pointer"
            >
              {t.registerPatientBtn}
            </button>
          </form>
        </div>
      )}

      {/* Tab 5: Referrals & Follow-ups */}
      {activeTab === 'referrals' && (
        <div className="space-y-6">
          {/* Active Referrals Tracker */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
            <h3 className="text-base sm:text-lg font-black text-slate-900 mb-3 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-amber-700" />
              <span>{t.trackReferrals}</span>
            </h3>

            <div className="space-y-3">
              {referrals.map((ref) => (
                <div
                  key={ref.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-sm text-slate-900">{ref.patientName}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800 uppercase">
                        {ref.urgency}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      From: <strong>{ref.fromFacility}</strong> ➔ To: <strong>{ref.toFacility}</strong>
                    </p>
                    <p className="text-xs text-slate-500 italic mt-0.5">Reason: {ref.reason}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800">
                      Status: {ref.status.toUpperCase()}
                    </span>
                    <p className="text-[11px] text-slate-400 mt-1">Referred: {ref.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Follow-ups Checklist for Village Visit */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
            <h3 className="text-base sm:text-lg font-black text-slate-900 mb-3 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-emerald-700" />
              <span>{t.followUpsChecklist}</span>
            </h3>

            <div className="space-y-2.5">
              {followUps.map((fup) => (
                <div
                  key={fup.id}
                  className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-3 bg-white hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleFollowUpComplete(fup.id)}
                      className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border transition-colors cursor-pointer ${
                        fup.completed
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-slate-300 hover:border-emerald-500'
                      }`}
                    >
                      {fup.completed && <CheckSquare className="w-4 h-4" />}
                    </button>
                    <div>
                      <p
                        className={`text-xs sm:text-sm font-bold ${
                          fup.completed ? 'line-through text-slate-400' : 'text-slate-900'
                        }`}
                      >
                        {fup.patientName} - {fup.title}
                      </p>
                      <p className="text-xs text-slate-500">{fup.description}</p>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-slate-400 shrink-0">
                    Due: {fup.dueDate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
