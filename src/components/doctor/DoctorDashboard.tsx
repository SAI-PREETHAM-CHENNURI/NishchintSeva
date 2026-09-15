import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import { Appointment, PrescriptionMedicine } from '../../types';
import {
  Stethoscope,
  ShieldCheck,
  Video,
  Mic,
  PhoneOff,
  User,
  Activity,
  FileText,
  Pill,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Clock,
  Sparkles,
  Send,
  Navigation,
  FileSpreadsheet,
} from 'lucide-react';

export const DoctorDashboard: React.FC = () => {
  const {
    activeDoctor,
    updateDoctorAvailability,
    appointments,
    patients,
    createPrescription,
    orderDiagnosticTest,
    createReferral,
    language,
  } = useApp();

  const t = translations[language];

  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(
    appointments[0] || null
  );

  const [inConsultationCall, setInConsultationCall] = useState<boolean>(false);

  // Clinical Notes & Prescription Builder State
  const [provisionalDiagnosis, setProvisionalDiagnosis] = useState('Essential Hypertension & Mild Dehydration');
  const [icdCode, setIcdCode] = useState('I10');
  const [clinicalAdvice, setClinicalAdvice] = useState(
    'Salt-restricted diet (<5g/day). Drink clean boiled water. Weekly BP check with ASHA worker.'
  );

  const [medicines, setMedicines] = useState<PrescriptionMedicine[]>([
    {
      id: 'm-1',
      name: 'Telmisartan 40mg',
      genericName: 'Jan Aushadhi Tab Telmisartan 40mg',
      dosage: '1 Tablet',
      frequency: '1-0-0',
      durationDays: 30,
      instructionsLocal: t.afterMeals,
      morning: true,
      afternoon: false,
      night: false,
      withFood: 'after',
    },
    {
      id: 'm-2',
      name: 'ORS Sachet (WHO Formula)',
      genericName: 'Oral Rehydration Salts IP',
      dosage: '1 Sachet in 1 Litre',
      frequency: 'As needed',
      durationDays: 5,
      instructionsLocal: t.asNeeded,
      morning: false,
      afternoon: false,
      night: false,
      withFood: 'after',
    },
  ]);

  // New medicine inputs
  const [newMedName, setNewMedName] = useState('');
  const [newMedGeneric, setNewMedGeneric] = useState('');
  const [newMedDosage, setNewMedDosage] = useState('1 Tablet');
  const [newMedDays, setNewMedDays] = useState(15);
  const [newMedMorning, setNewMedMorning] = useState(true);
  const [newMedAfternoon, setNewMedAfternoon] = useState(false);
  const [newMedNight, setNewMedNight] = useState(true);
  const [newMedInstruction, setNewMedInstruction] = useState(t.afterMeals);

  // Diagnostic Test Order
  const [diagTestName, setDiagTestName] = useState('Kidney Function Test (Serum Creatinine/Urea)');
  const [diagCategory, setDiagCategory] = useState<'Blood' | 'Urine' | 'Imaging' | 'Rapid Test'>('Blood');
  const [diagOrderedSuccess, setDiagOrderedSuccess] = useState(false);

  // Referral Order
  const [refHospital, setRefHospital] = useState('Pandit Deen Dayal Upadhyaya District Hospital');
  const [refReason, setRefReason] = useState('');
  const [refSuccess, setRefSuccess] = useState(false);

  const [prescriptionSaved, setPrescriptionSaved] = useState(false);

  // Current patient for selected appointment
  const currentPatient = patients.find((p) => p.id === selectedAppointment?.patientId) || patients[0];
  const latestVitals = currentPatient.vitalsHistory[0];

  const handleAddMedicine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedName.trim() || !activeDoctor.isVerified) return;

    const newMed: PrescriptionMedicine = {
      id: `m-${Date.now()}`,
      name: newMedName,
      genericName: newMedGeneric || `Jan Aushadhi Generic of ${newMedName}`,
      dosage: newMedDosage,
      frequency: `${newMedMorning ? '1' : '0'}-${newMedAfternoon ? '1' : '0'}-${newMedNight ? '1' : '0'}`,
      durationDays: Number(newMedDays),
      instructionsLocal: newMedInstruction,
      morning: newMedMorning,
      afternoon: newMedAfternoon,
      night: newMedNight,
      withFood: 'after',
    };

    setMedicines([...medicines, newMed]);
    setNewMedName('');
    setNewMedGeneric('');
  };

  const handleRemoveMedicine = (id: string) => {
    if (!activeDoctor.isVerified) return;
    setMedicines(medicines.filter((m) => m.id !== id));
  };

  const handleSavePrescription = () => {
    if (!selectedAppointment || !activeDoctor.isVerified) return;

    createPrescription({
      appointmentId: selectedAppointment.id,
      patientId: currentPatient.id,
      patientName: currentPatient.name,
      doctorName: activeDoctor.name,
      doctorRegNo: activeDoctor.registrationNo,
      doctorSpecialty: activeDoctor.specialty,
      provisionalDiagnosis,
      icdCode,
      clinicalAdvice,
      medicines,
      followUpDate: '28 Sep 2026',
    });

    setPrescriptionSaved(true);
    setTimeout(() => {
      setPrescriptionSaved(false);
      setInConsultationCall(false);
    }, 2000);
  };

  const handleOrderDiagnostic = () => {
    if (!activeDoctor.isVerified) return;
    orderDiagnosticTest({
      patientId: currentPatient.id,
      testName: diagTestName,
      category: diagCategory,
      orderedByDoctor: activeDoctor.name,
      facilityName: 'Rampur Primary Health Centre / SRL Hub',
    });
    setDiagOrderedSuccess(true);
    setTimeout(() => setDiagOrderedSuccess(false), 2000);
  };

  const handleMakeReferral = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeDoctor.isVerified) return;
    createReferral({
      patientId: currentPatient.id,
      patientName: currentPatient.name,
      fromFacility: 'Rampur Tele-OPD Hub',
      toFacility: refHospital,
      reason: refReason || 'Specialized secondary evaluation and diagnostic imaging',
      urgency: 'urgent',
      referredBy: activeDoctor.name,
    });
    setRefSuccess(true);
    setRefReason('');
    setTimeout(() => setRefSuccess(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Unverified Doctor Security Alert Barrier */}
      {!activeDoctor.isVerified && (
        <div className="bg-amber-500/15 border-2 border-amber-500 rounded-3xl p-5 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-3.5">
            <div className="p-3 bg-amber-500 text-white rounded-2xl shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500 text-white uppercase tracking-wider">
                  {t.unverifiedDoctorBadge}
                </span>
                <span className="text-xs font-bold text-amber-900">
                  {activeDoctor.registrationNo}
                </span>
              </div>
              <p className="text-sm font-bold text-amber-950 mt-1">
                {t.unverifiedDoctorNotice}
              </p>
              <p className="text-xs text-amber-800 mt-0.5">
                Practice restrictions are enforced in accordance with National Medical Commission (NMC) regulations.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Doctor Credentials & Availability Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-900 to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center font-black text-2xl text-teal-200 shadow-md">
              <Stethoscope className="w-9 h-9" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                {activeDoctor.isVerified ? (
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> {t.verifiedDoctor}
                  </span>
                ) : (
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> {t.unverifiedDoctorBadge}
                  </span>
                )}
                <span className="text-xs text-teal-200">
                  {activeDoctor.medicalCouncil}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black mt-1">{activeDoctor.name}</h1>
              <p className="text-xs sm:text-sm text-teal-100">
                {activeDoctor.qualification} • Registration: <strong className="font-mono text-white">{activeDoctor.registrationNo}</strong>
              </p>
            </div>
          </div>

          {/* Tele-Clinic Shift Availability Switcher */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-3 border border-white/15 flex items-center gap-2 shrink-0">
            <span className="text-xs text-teal-200 font-semibold pl-1">Tele-OPD:</span>
            <div className="flex gap-1">
              {(['available', 'in_consultation', 'offline'] as const).map((status) => (
                <button
                  key={status}
                  disabled={!activeDoctor.isVerified}
                  onClick={() => updateDoctorAvailability(activeDoctor.id, status)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                    activeDoctor.availabilityStatus === status
                      ? status === 'available'
                        ? 'bg-emerald-500 text-slate-950 shadow-xs'
                        : status === 'in_consultation'
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-slate-700 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  } ${!activeDoctor.isVerified ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {status === 'available' ? t.availableStatus : status === 'in_consultation' ? t.inConsultation : t.offlineStatus}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Doctor Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: OPD Queue & Patient Vitals */}
        <div className="lg:col-span-4 space-y-4">
          {/* OPD Queue List */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-black text-slate-900 text-base flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-teal-700" />
                <span>{t.todayAppointments}</span>
              </h3>
              <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-lg border border-teal-200">
                {appointments.length} Patients
              </span>
            </div>

            <div className="space-y-2.5 max-h-[440px] overflow-y-auto pr-1">
              {appointments.map((apt) => {
                const isSelected = selectedAppointment?.id === apt.id;
                return (
                  <div
                    key={apt.id}
                    onClick={() => {
                      setSelectedAppointment(apt);
                      setProvisionalDiagnosis(apt.chiefComplaint);
                    }}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-teal-50 border-teal-600 ring-1 ring-teal-600 shadow-xs'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-xl bg-teal-700 text-white flex items-center justify-center font-black text-xs shrink-0">
                          #{apt.tokenNumber}
                        </span>
                        <div>
                          <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">{apt.patientName}</h4>
                          <p className="text-[11px] text-slate-500">
                            {apt.patientGender}, {apt.patientAge}y • {apt.patientVillage}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                          apt.priority === 'emergency'
                            ? 'bg-red-100 text-red-800'
                            : apt.priority === 'urgent'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {apt.priority === 'emergency' ? t.emergency : apt.priority === 'urgent' ? t.urgent : t.normal}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-slate-700 line-clamp-1 italic font-medium">
                      "{apt.chiefComplaint}"
                    </p>

                    <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400">
                      <span>Booked by: {apt.bookedBy}</span>
                      <span className="capitalize text-teal-800 font-bold">● {apt.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Patient Vitals Card (Recorded by ASHA worker) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs">
            <h4 className="font-black text-slate-900 text-sm flex items-center gap-1.5 mb-3">
              <Activity className="w-4 h-4 text-emerald-700" />
              <span>{t.vitalsRecord} ({currentPatient.name})</span>
            </h4>

            {latestVitals ? (
              <div className="space-y-2.5">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-semibold">{t.bloodPressure}</span>
                    <span className="font-black text-sm text-slate-900">
                      {latestVitals.bpSystolic}/{latestVitals.bpDiastolic} mmHg
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-semibold">{t.oxygenLevel}</span>
                    <span className="font-black text-sm text-slate-900">{latestVitals.spO2}%</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-semibold">{t.pulseRate}</span>
                    <span className="font-bold text-slate-900">{latestVitals.pulse} bpm</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-semibold">{t.randomSugar}</span>
                    <span className="font-bold text-slate-900">
                      {latestVitals.bloodSugarMgDl ? `${latestVitals.bloodSugarMgDl} mg/dL` : 'Normal'}
                    </span>
                  </div>
                </div>

                {latestVitals.notes && (
                  <p className="text-xs text-slate-600 bg-amber-50 p-2.5 rounded-xl border border-amber-200 italic">
                    Note: "{latestVitals.notes}"
                  </p>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No vitals logged for this patient today.</p>
            )}
          </div>
        </div>

        {/* Right Column: Consultation Workspace */}
        <div className="lg:col-span-8 space-y-5">
          {/* Active Call Simulation Header */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-lg text-slate-900">
                  {t.enterConsultationRoom}: {currentPatient.name}
                </h3>
                <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                  {t.abhaId}: {currentPatient.abhaId}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentPatient.village} • {currentPatient.age}y • {currentPatient.bloodGroup} • PM-JAY: {currentPatient.pmjayCard ? 'Yes' : 'No'}
              </p>
            </div>

            {inConsultationCall ? (
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg">
                  Live
                </span>
                <button
                  onClick={() => setInConsultationCall(false)}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  End Call
                </button>
              </div>
            ) : (
              <button
                disabled={!activeDoctor.isVerified}
                onClick={() => setInConsultationCall(true)}
                className={`px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-xs rounded-xl shadow-md transition-transform active:scale-95 flex items-center gap-2 self-start sm:self-auto ${
                  !activeDoctor.isVerified ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>{t.enterConsultationRoom}</span>
              </button>
            )}
          </div>

          {/* In-Call Video Preview */}
          {inConsultationCall && (
            <div className="bg-slate-950 rounded-3xl p-4 text-white aspect-video max-h-[300px] flex items-center justify-center relative overflow-hidden border-2 border-teal-500 animate-in zoom-in-95">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-slate-800 mx-auto flex items-center justify-center text-teal-300 mb-2 border border-slate-700">
                  <User className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-sm">{currentPatient.name}</h4>
                <p className="text-xs text-slate-400">Connected via Sub-Centre Android Tele-Kit</p>
                <p className="text-[11px] text-emerald-400 mt-1 font-mono">Audio & Video Latency: 42ms (Stable)</p>
              </div>
            </div>
          )}

          {/* Clinical Notes & Diagnosis */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
            <h4 className="font-black text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
              <FileText className="w-5 h-5 text-teal-700" />
              <span>{t.diagnosis}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  {t.diagnosis}
                </label>
                <input
                  type="text"
                  disabled={!activeDoctor.isVerified}
                  value={provisionalDiagnosis}
                  onChange={(e) => setProvisionalDiagnosis(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-teal-500 disabled:opacity-60"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  ICD-10 Code
                </label>
                <input
                  type="text"
                  disabled={!activeDoctor.isVerified}
                  value={icdCode}
                  onChange={(e) => setIcdCode(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-mono focus:ring-2 focus:ring-teal-500 disabled:opacity-60"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Clinical Advice:
              </label>
              <textarea
                rows={2}
                disabled={!activeDoctor.isVerified}
                value={clinicalAdvice}
                onChange={(e) => setClinicalAdvice(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-teal-500 disabled:opacity-60"
              />
            </div>
          </div>

          {/* Prescription Medicine Builder */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-black text-slate-900 text-base flex items-center gap-2">
                <Pill className="w-5 h-5 text-teal-700" />
                <span>{t.medicines}</span>
              </h4>
              <span className="text-xs font-bold text-slate-500">
                {medicines.length} Prescribed
              </span>
            </div>

            {/* List of currently added medicines */}
            <div className="space-y-2">
              {medicines.map((med) => (
                <div
                  key={med.id}
                  className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="font-black text-slate-900 text-sm">{med.name}</strong>
                      <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-bold">
                        {med.dosage}
                      </span>
                      <span className="text-slate-500 font-mono">({med.frequency})</span>
                    </div>
                    <p className="text-[11px] text-emerald-800 font-medium mt-0.5">
                      Jan Aushadhi: {med.genericName}
                    </p>
                    <p className="text-[11px] text-slate-500 italic mt-0.5">
                      {med.instructionsLocal} • {med.durationDays} Days
                    </p>
                  </div>
                  {activeDoctor.isVerified && (
                    <button
                      onClick={() => handleRemoveMedicine(med.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-white transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add new medicine form */}
            {activeDoctor.isVerified && (
              <form onSubmit={handleAddMedicine} className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-700 uppercase block">
                  + Add Medication:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    required
                    value={newMedName}
                    onChange={(e) => setNewMedName(e.target.value)}
                    placeholder="Medicine Name (e.g. Paracetamol 500mg)"
                    className="bg-white border border-slate-300 rounded-xl p-2 text-xs focus:ring-2 focus:ring-teal-500"
                  />
                  <input
                    type="text"
                    value={newMedGeneric}
                    onChange={(e) => setNewMedGeneric(e.target.value)}
                    placeholder="Jan Aushadhi generic alternative"
                    className="bg-white border border-slate-300 rounded-xl p-2 text-xs focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <input
                    type="text"
                    value={newMedDosage}
                    onChange={(e) => setNewMedDosage(e.target.value)}
                    placeholder="Dosage (1 Tab)"
                    className="bg-white border border-slate-300 rounded-xl p-2 text-xs"
                  />
                  <input
                    type="number"
                    value={newMedDays}
                    onChange={(e) => setNewMedDays(Number(e.target.value))}
                    placeholder="Duration Days"
                    className="bg-white border border-slate-300 rounded-xl p-2 text-xs"
                  />
                  <input
                    type="text"
                    value={newMedInstruction}
                    onChange={(e) => setNewMedInstruction(e.target.value)}
                    placeholder="Instructions"
                    className="sm:col-span-2 bg-white border border-slate-300 rounded-xl p-2 text-xs"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newMedMorning}
                        onChange={(e) => setNewMedMorning(e.target.checked)}
                        className="rounded text-teal-600 w-4 h-4"
                      />
                      <span>Morning</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newMedAfternoon}
                        onChange={(e) => setNewMedAfternoon(e.target.checked)}
                        className="rounded text-teal-600 w-4 h-4"
                      />
                      <span>Afternoon</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newMedNight}
                        onChange={(e) => setNewMedNight(e.target.checked)}
                        className="rounded text-teal-600 w-4 h-4"
                      />
                      <span>Night</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl flex items-center gap-1 shadow-xs cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Medicine</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Diagnostics & Referrals Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Diagnostic order */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                <span>Order Diagnostic Lab Test</span>
              </h4>
              <input
                type="text"
                disabled={!activeDoctor.isVerified}
                value={diagTestName}
                onChange={(e) => setDiagTestName(e.target.value)}
                placeholder="Test name..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs focus:ring-2 focus:ring-teal-500 disabled:opacity-60"
              />
              <button
                type="button"
                disabled={!activeDoctor.isVerified}
                onClick={handleOrderDiagnostic}
                className={`w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 rounded-xl font-bold text-xs transition-colors ${
                  !activeDoctor.isVerified ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                {diagOrderedSuccess ? '✓ Order Sent to PHC Lab' : 'Send Diagnostic Order'}
              </button>
            </div>

            {/* Refer to higher hospital */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Navigation className="w-4 h-4 text-amber-600" />
                <span>Refer to Higher Facility</span>
              </h4>
              <input
                type="text"
                disabled={!activeDoctor.isVerified}
                value={refReason}
                onChange={(e) => setRefReason(e.target.value)}
                placeholder="Reason for referral..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs focus:ring-2 focus:ring-teal-500 disabled:opacity-60"
              />
              <button
                type="button"
                disabled={!activeDoctor.isVerified}
                onClick={handleMakeReferral}
                className={`w-full py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl font-bold text-xs transition-colors ${
                  !activeDoctor.isVerified ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                {refSuccess ? '✓ Referral Dispatched' : 'Create Referral Slip'}
              </button>
            </div>
          </div>

          {/* Complete & Issue Prescription Button */}
          <div className="bg-emerald-50 rounded-3xl border-2 border-emerald-300 p-5 text-center">
            {prescriptionSaved ? (
              <div className="p-3 bg-emerald-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Prescription issued & added to Patient ABHA Health Locker!</span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-left">
                  <p className="font-black text-emerald-950 text-sm">
                    {t.issueDigitalRx}
                  </p>
                  <p className="text-xs text-emerald-800">
                    Signed with NMC credentials & dispatched via SMS to patient & ASHA Didi.
                  </p>
                </div>
                <button
                  disabled={!activeDoctor.isVerified}
                  onClick={handleSavePrescription}
                  id="issue-rx-btn"
                  className={`w-full sm:w-auto px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-700/20 transition-transform active:scale-95 ${
                    !activeDoctor.isVerified ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  {t.issueDigitalRx}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
