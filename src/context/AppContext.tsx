import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Role,
  AuthUser,
  Language,
  Patient,
  Doctor,
  FHW,
  Facility,
  Appointment,
  Prescription,
  DiagnosticTest,
  Referral,
  FollowUpReminder,
  AuditLog,
  VitalRecord,
} from '../types';
import {
  INITIAL_PATIENTS,
  INITIAL_DOCTORS,
  INITIAL_FHWS,
  INITIAL_FACILITIES,
  INITIAL_APPOINTMENTS,
  INITIAL_PRESCRIPTIONS,
  INITIAL_DIAGNOSTIC_TESTS,
  INITIAL_REFERRALS,
  INITIAL_FOLLOW_UPS,
  INITIAL_AUDIT_LOGS,
} from '../data/mockData';
import {
  isSupabaseConfigured,
  supabase,
  buildAuthUserFromSupabase,
  signOutFromSupabase,
  fetchSupabasePatients,
  fetchSupabaseDoctors,
  fetchSupabaseFhws,
} from '../lib/supabase';

interface AppContextType {
  // Authentication & RBAC
  authUser: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
  role: Role;
  isSupabaseConfigured: boolean;
  supabaseAuthLoading: boolean;
  refreshSupabaseData: () => Promise<void>;
  
  // Active session context
  activePatientId: string;
  setActivePatientId: (id: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  hasSelectedLanguage: boolean;
  isLanguageModalOpen: boolean;
  setIsLanguageModalOpen: (open: boolean) => void;
  openLanguageSelector: () => void;
  closeLanguageSelector: () => void;
  lowBandwidthMode: boolean;
  setLowBandwidthMode: (val: boolean) => void;
  emergencyModalOpen: boolean;
  setEmergencyModalOpen: (open: boolean) => void;
  
  // Entities
  patients: Patient[];
  doctors: Doctor[];
  fhws: FHW[];
  facilities: Facility[];
  appointments: Appointment[];
  prescriptions: Prescription[];
  diagnosticTests: DiagnosticTest[];
  referrals: Referral[];
  followUps: FollowUpReminder[];
  auditLogs: AuditLog[];
  
  currentPatient: Patient;
  activeDoctor: Doctor;
  activeFhw: FHW;
  
  // Handlers
  bookAppointment: (data: {
    patientId: string;
    doctorId: string;
    chiefComplaint: string;
    priority?: 'normal' | 'urgent' | 'emergency';
    triageCategory?: 'green' | 'yellow' | 'red';
    bookedBy?: 'Self' | 'ASHA Worker';
    bookedByName?: string;
    fhwNotes?: string;
  }) => Appointment;
  recordVitals: (patientId: string, vitals: Omit<VitalRecord, 'id' | 'patientId' | 'recordedAt'>) => VitalRecord;
  registerPatient: (patientData: Omit<Patient, 'id' | 'vitalsHistory'>) => Patient;
  createPrescription: (data: Omit<Prescription, 'id' | 'date'>) => Prescription;
  updateDoctorAvailability: (doctorId: string, status: 'available' | 'in_consultation' | 'offline') => void;
  verifyDoctor: (doctorId: string) => void;
  toggleDoctorVerification: (doctorId: string) => void;
  orderDiagnosticTest: (data: {
    patientId: string;
    testName: string;
    category: 'Blood' | 'Urine' | 'Imaging' | 'Rapid Test';
    orderedByDoctor: string;
    facilityName: string;
  }) => DiagnosticTest;
  createReferral: (data: Omit<Referral, 'id' | 'date' | 'status'>) => Referral;
  updateReferralStage: (referralId: string, stage: import('../types').ReferralStage) => void;
  acknowledgeReferral: (referralId: string) => void;
  toggleFollowUpComplete: (id: string) => void;
  triggerEmergencySOS: (locationHint?: string) => void;
  activeAppointment?: Appointment;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auth state persisted in localStorage
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem('ns_auth_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // If Supabase is configured, do not use mock initial user; await real Supabase session
    if (isSupabaseConfigured) {
      return null;
    }
    // Default demonstration patient when in local preview mode
    return {
      id: 'usr-p1',
      role: 'patient',
      name: 'Rameshwar Yadav',
      patientId: 'p-1',
      phone: '+91 98391 20491',
      abhaId: '14-8921-4309-8812',
      assignedVillage: 'Rampur Kalan',
    };
  });

  const [supabaseAuthLoading, setSupabaseAuthLoading] = useState<boolean>(isSupabaseConfigured);

  const role: Role = authUser ? authUser.role : 'patient';

  const [activePatientId, setActivePatientId] = useState<string>(() => {
    if (authUser && authUser.role === 'patient' && authUser.patientId) {
      return authUser.patientId;
    }
    return 'p-1';
  });

  // Role-based language state
  const [patientLanguage, setPatientLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('ns_patient_language') || localStorage.getItem('ns_language');
    if (saved && ['en', 'hi', 'te', 'mr', 'bn'].includes(saved)) {
      return saved as Language;
    }
    return 'te'; // Telugu default for rural patient experience
  });

  const [fhwLanguage, setFhwLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('ns_fhw_language') || localStorage.getItem('ns_language');
    if (saved && ['en', 'hi', 'te', 'mr', 'bn'].includes(saved)) {
      return saved as Language;
    }
    return 'te'; // Telugu default for field health workers in Andhra / Telangana
  });

  const [patientLangSelected, setPatientLangSelected] = useState<boolean>(() => {
    return localStorage.getItem('ns_patient_lang_selected') === 'true';
  });

  const [fhwLangSelected, setFhwLangSelected] = useState<boolean>(() => {
    return localStorage.getItem('ns_fhw_lang_selected') === 'true';
  });

  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState<boolean>(false);

  // Computed language strictly following role mandates:
  // - Doctors & Admins are strictly ENGLISH ONLY (no language selector, no regional language)
  // - Patients and FHW use their selected language
  const language: Language =
    role === 'doctor' || role === 'admin'
      ? 'en'
      : role === 'fhw'
      ? fhwLanguage
      : patientLanguage;

  const hasSelectedLanguage: boolean =
    role === 'doctor' || role === 'admin'
      ? true
      : role === 'fhw'
      ? fhwLangSelected
      : patientLangSelected;

  const setLanguage = (lang: Language) => {
    // Doctors and Admins cannot change language - always English
    if (role === 'doctor' || role === 'admin') return;

    if (role === 'fhw') {
      setFhwLanguage(lang);
      setFhwLangSelected(true);
      localStorage.setItem('ns_fhw_language', lang);
      localStorage.setItem('ns_fhw_lang_selected', 'true');
      localStorage.setItem('ns_language', lang);
    } else {
      setPatientLanguage(lang);
      setPatientLangSelected(true);
      localStorage.setItem('ns_patient_language', lang);
      localStorage.setItem('ns_patient_lang_selected', 'true');
      localStorage.setItem('ns_language', lang);
    }
    setIsLanguageModalOpen(false);
  };

  const openLanguageSelector = () => {
    if (role === 'doctor' || role === 'admin') return; // forbidden for doctor
    setIsLanguageModalOpen(true);
  };

  const closeLanguageSelector = () => {
    setIsLanguageModalOpen(false);
  };

  const [lowBandwidthMode, setLowBandwidthMode] = useState<boolean>(false);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState<boolean>(false);

  const [patients, setPatients] = useState<Patient[]>(() => {
    const saved = localStorage.getItem('ns_patients');
    return saved ? JSON.parse(saved) : INITIAL_PATIENTS;
  });

  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    const saved = localStorage.getItem('ns_doctors');
    return saved ? JSON.parse(saved) : INITIAL_DOCTORS;
  });

  const [fhws, setFhws] = useState<FHW[]>(INITIAL_FHWS);
  const [facilities] = useState<Facility[]>(INITIAL_FACILITIES);

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('ns_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [prescriptions, setPrescriptions] = useState<Prescription[]>(() => {
    const saved = localStorage.getItem('ns_prescriptions');
    return saved ? JSON.parse(saved) : INITIAL_PRESCRIPTIONS;
  });

  const [diagnosticTests, setDiagnosticTests] = useState<DiagnosticTest[]>(() => {
    const saved = localStorage.getItem('ns_diagnostic_tests');
    return saved ? JSON.parse(saved) : INITIAL_DIAGNOSTIC_TESTS;
  });

  const [referrals, setReferrals] = useState<Referral[]>(INITIAL_REFERRALS);
  const [followUps, setFollowUps] = useState<FollowUpReminder[]>(INITIAL_FOLLOW_UPS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  // Sync state
  useEffect(() => {
    localStorage.setItem('ns_patients', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem('ns_doctors', JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem('ns_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('ns_prescriptions', JSON.stringify(prescriptions));
  }, [prescriptions]);

  useEffect(() => {
    localStorage.setItem('ns_diagnostic_tests', JSON.stringify(diagnosticTests));
  }, [diagnosticTests]);

  const refreshSupabaseData = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    try {
      const [supaPatients, supaDoctors, supaFhws] = await Promise.all([
        fetchSupabasePatients(),
        fetchSupabaseDoctors(),
        fetchSupabaseFhws(),
      ]);

      if (supaPatients.length > 0) {
        setPatients((prev) => {
          const ids = new Set(supaPatients.map((p) => p.id));
          const filtered = prev.filter((p) => !ids.has(p.id));
          return [...supaPatients, ...filtered];
        });
      }

      if (supaDoctors.length > 0) {
        setDoctors((prev) => {
          const ids = new Set(supaDoctors.map((d) => d.id));
          const filtered = prev.filter((d) => !ids.has(d.id));
          return [...supaDoctors, ...filtered];
        });
      }

      if (supaFhws.length > 0) {
        setFhws((prev) => {
          const ids = new Set(supaFhws.map((f) => f.id));
          const filtered = prev.filter((f) => !ids.has(f.id));
          return [...supaFhws, ...filtered];
        });
      }
    } catch (err) {
      console.warn('[Supabase] Error during refreshSupabaseData:', err);
    }
  }, []);

  // Supabase Auth session synchronization
  useEffect(() => {
    if (!isSupabaseConfigured) {
      setSupabaseAuthLoading(false);
      return;
    }

    let isMounted = true;

    // 1. Check existing session on load
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!isMounted) return;
      if (session?.user) {
        try {
          const profile = await buildAuthUserFromSupabase(session.user);
          if (profile && isMounted) {
            setAuthUser(profile);
            localStorage.setItem('ns_auth_user', JSON.stringify(profile));
            if (profile.role === 'patient' && profile.patientId) {
              setActivePatientId(profile.patientId);
            }
          }
        } catch (e) {
          console.warn('[Supabase] Error loading profile from initial session:', e);
        }
      } else {
        // Real Supabase backend connected with no active session
        setAuthUser(null);
        localStorage.removeItem('ns_auth_user');
      }
      if (isMounted) setSupabaseAuthLoading(false);
    });

    // 2. Refresh database data
    refreshSupabaseData();

    // 3. Listen for Supabase Auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isMounted) return;
      if ((event === 'SIGNED_IN' || event === 'USER_UPDATED') && session?.user) {
        try {
          const profile = await buildAuthUserFromSupabase(session.user);
          if (profile && isMounted) {
            setAuthUser(profile);
            localStorage.setItem('ns_auth_user', JSON.stringify(profile));
            if (profile.role === 'patient' && profile.patientId) {
              setActivePatientId(profile.patientId);
            }
          }
        } catch (e) {
          console.warn('[Supabase] Error fetching profile on auth change:', e);
        }
      } else if (event === 'SIGNED_OUT') {
        if (isMounted) {
          setAuthUser(null);
          localStorage.removeItem('ns_auth_user');
        }
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [refreshSupabaseData]);

  const login = (user: AuthUser) => {
    setAuthUser(user);
    localStorage.setItem('ns_auth_user', JSON.stringify(user));
    if (user.role === 'patient' && user.patientId) {
      setActivePatientId(user.patientId);
    }
    addAuditLog('User Login', `Signed in as ${user.name} with role ${user.role.toUpperCase()}`);
  };

  const logout = async () => {
    if (authUser) {
      addAuditLog('User Logout', `Signed out from ${authUser.name} session`);
    }
    setAuthUser(null);
    localStorage.removeItem('ns_auth_user');
    if (isSupabaseConfigured) {
      await signOutFromSupabase();
    }
  };

  // Resolved entities
  const currentPatient = patients.find((p) => p.id === activePatientId) || patients[0];

  const baseDoctor =
    authUser?.doctorId ? doctors.find((d) => d.id === authUser.doctorId) || doctors[0] : doctors[0];

  const activeDoctor: Doctor =
    authUser?.role === 'doctor'
      ? {
          ...baseDoctor,
          name: authUser.name || baseDoctor.name,
          registrationNo: authUser.registrationNo || baseDoctor.registrationNo,
          isVerified: authUser.isVerified ?? false,
          verificationStatus: authUser.verificationStatus ?? (authUser.isVerified ? 'approved' : 'pending'),
        }
      : baseDoctor;

  const activeFhw =
    authUser?.fhwId ? fhws.find((f) => f.id === authUser.fhwId) || fhws[0] : fhws[0];

  const activeAppointment = appointments.find(
    (apt) => apt.patientId === currentPatient.id && (apt.status === 'waiting' || apt.status === 'in_consultation')
  );

  const addAuditLog = (action: string, details: string, severity: 'info' | 'warning' | 'alert' = 'info') => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      actor: authUser ? authUser.name : 'System',
      role: authUser ? authUser.role.toUpperCase() : 'SYSTEM',
      action,
      details,
      severity,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const bookAppointment = (data: {
    patientId: string;
    doctorId: string;
    chiefComplaint: string;
    priority?: 'normal' | 'urgent' | 'emergency';
    triageCategory?: 'green' | 'yellow' | 'red';
    bookedBy?: 'Self' | 'ASHA Worker';
    bookedByName?: string;
    fhwNotes?: string;
  }): Appointment => {
    const patient = patients.find((p) => p.id === data.patientId) || currentPatient;
    const doctor = doctors.find((d) => d.id === data.doctorId) || doctors[0];
    const nextToken = Math.max(10, ...appointments.map((a) => a.tokenNumber)) + 1;

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      tokenNumber: nextToken,
      patientId: patient.id,
      patientName: patient.name,
      patientAge: patient.age,
      patientGender: patient.gender,
      patientVillage: patient.village,
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      date: 'Today, 14 Sep 2026',
      timeSlot: 'Next Available Token',
      status: 'waiting',
      priority: data.priority || 'normal',
      triageCategory: data.triageCategory || 'green',
      chiefComplaint: data.chiefComplaint,
      bookedBy: data.bookedBy || (role === 'fhw' ? 'ASHA Worker' : 'Self'),
      bookedByName: data.bookedByName || (role === 'fhw' ? `${activeFhw.name} (ASHA)` : undefined),
      fhwNotes: data.fhwNotes,
    };

    setAppointments((prev) => [newAppointment, ...prev]);
    setDoctors((prev) =>
      prev.map((d) => (d.id === doctor.id ? { ...d, currentQueueLength: d.currentQueueLength + 1 } : d))
    );

    addAuditLog(
      'Booked Tele-OPD',
      `Token #${nextToken} booked for ${patient.name} with ${doctor.name} (${data.triageCategory?.toUpperCase() || 'GREEN'})`
    );

    return newAppointment;
  };

  const recordVitals = (patientId: string, vitals: Omit<VitalRecord, 'id' | 'patientId' | 'recordedAt'>): VitalRecord => {
    const newRecord: VitalRecord = {
      ...vitals,
      id: `v-${Date.now()}`,
      patientId,
      recordedAt: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setPatients((prev) =>
      prev.map((p) => {
        if (p.id === patientId) {
          return {
            ...p,
            vitalsHistory: [newRecord, ...p.vitalsHistory],
            lastVisitDate: '2026-09-14',
          };
        }
        return p;
      })
    );

    addAuditLog(
      'Recorded Vitals',
      `BP: ${vitals.bpSystolic}/${vitals.bpDiastolic}, SpO2: ${vitals.spO2}%, Sugar: ${vitals.bloodSugarMgDl || 'N/A'} for patient ${patientId}`,
      vitals.alertFlag === 'critical' ? 'alert' : vitals.alertFlag === 'moderate' ? 'warning' : 'info'
    );

    return newRecord;
  };

  const registerPatient = (patientData: Omit<Patient, 'id' | 'vitalsHistory'>): Patient => {
    const newPatient: Patient = {
      ...patientData,
      id: `p-${Date.now()}`,
      vitalsHistory: [],
    };

    setPatients((prev) => [newPatient, ...prev]);
    addAuditLog('Patient Registered', `Registered ${newPatient.name} (ABHA: ${newPatient.abhaId}) in village ${newPatient.village}`);
    return newPatient;
  };

  const createPrescription = (data: Omit<Prescription, 'id' | 'date'>): Prescription => {
    const newRx: Prescription = {
      ...data,
      id: `rx-${Date.now()}`,
      date: '14 Sep 2026',
    };

    setPrescriptions((prev) => [newRx, ...prev]);

    if (data.appointmentId) {
      setAppointments((prev) =>
        prev.map((apt) => (apt.id === data.appointmentId ? { ...apt, status: 'completed' } : apt))
      );
    }

    addAuditLog('Prescription Generated', `Prescription generated for ${data.patientName} by ${data.doctorName}`);
    return newRx;
  };

  const updateDoctorAvailability = (doctorId: string, status: 'available' | 'in_consultation' | 'offline') => {
    setDoctors((prev) =>
      prev.map((d) => (d.id === doctorId ? { ...d, availabilityStatus: status } : d))
    );
    addAuditLog('Doctor Status Update', `Doctor ${doctorId} status set to ${status}`);
  };

  const verifyDoctor = (doctorId: string) => {
    setDoctors((prev) =>
      prev.map((d) => (d.id === doctorId ? { ...d, isVerified: true } : d))
    );
    if (authUser?.doctorId === doctorId) {
      const updatedUser = { ...authUser, isVerified: true };
      setAuthUser(updatedUser);
      localStorage.setItem('ns_auth_user', JSON.stringify(updatedUser));
    }
    addAuditLog('Doctor Verified', `Admin approved NMC credentials for doctor ${doctorId}`, 'info');
  };

  const toggleDoctorVerification = (doctorId: string) => {
    setDoctors((prev) =>
      prev.map((d) => {
        if (d.id === doctorId) {
          const next = !d.isVerified;
          if (authUser?.doctorId === doctorId) {
            const updatedUser = { ...authUser, isVerified: next };
            setAuthUser(updatedUser);
            localStorage.setItem('ns_auth_user', JSON.stringify(updatedUser));
          }
          return { ...d, isVerified: next };
        }
        return d;
      })
    );
    addAuditLog('Doctor Status Toggled', `Toggled NMC credentials for doctor ${doctorId}`);
  };

  const orderDiagnosticTest = (data: {
    patientId: string;
    testName: string;
    category: 'Blood' | 'Urine' | 'Imaging' | 'Rapid Test';
    orderedByDoctor: string;
    facilityName: string;
  }): DiagnosticTest => {
    const patient = patients.find((p) => p.id === data.patientId) || currentPatient;
    const newTest: DiagnosticTest = {
      id: `dt-${Date.now()}`,
      patientId: patient.id,
      patientName: patient.name,
      testName: data.testName,
      category: data.category,
      orderedByDoctor: data.orderedByDoctor,
      orderedDate: '14 Sep 2026',
      status: 'ordered',
      facilityName: data.facilityName,
    };

    setDiagnosticTests((prev) => [newTest, ...prev]);
    addAuditLog('Diagnostic Order', `Ordered ${data.testName} for ${patient.name}`);
    return newTest;
  };

  const createReferral = (data: Omit<Referral, 'id' | 'date' | 'status'>): Referral => {
    const newRef: Referral = {
      ...data,
      id: `ref-${Date.now()}`,
      date: '14 Sep 2026',
      status: 'pending',
    };

    setReferrals((prev) => [newRef, ...prev]);
    addAuditLog('Referral Dispatched', `Referred ${data.patientName} from ${data.fromFacility} to ${data.toFacility}`, 'warning');
    return newRef;
  };

  const updateReferralStage = (referralId: string, stage: import('../types').ReferralStage) => {
    setReferrals((prev) =>
      prev.map((ref) => {
        if (ref.id === referralId) {
          const stageNames: Record<import('../types').ReferralStage, string> = {
            created: 'Created',
            sent: 'Sent to Facility',
            accepted: 'Accepted by Department',
            destination_confirmed: 'Destination Confirmed',
            checked_in: 'Patient Checked In',
            consultation: 'Doctor Consultation In Progress',
            investigation: 'Investigations / Labs',
            treatment: 'Treatment Underway',
            completed: 'Referral Completed & Discharged',
            cancelled: 'Referral Cancelled',
          };
          const newNotification: import('../types').ReferralNotification = {
            id: `rn-${Date.now()}`,
            timestamp: 'Just now',
            message: `Referral progressed to: ${stageNames[stage]}`,
            type: stage === 'completed' ? 'success' : 'info',
          };
          return {
            ...ref,
            currentStage: stage,
            status: stage === 'completed' ? 'completed' : ref.status,
            notifications: [newNotification, ...(ref.notifications || [])],
          };
        }
        return ref;
      })
    );
    addAuditLog('Referral Updated', `Referral ${referralId} progressed to stage ${stage}`);
  };

  const acknowledgeReferral = (referralId: string) => {
    setReferrals((prev) =>
      prev.map((ref) => {
        if (ref.id === referralId) {
          const ackNotification: import('../types').ReferralNotification = {
            id: `rn-${Date.now()}`,
            timestamp: 'Just now',
            message: 'Patient confirmed receipt and acknowledged referral instructions.',
            type: 'success',
          };
          return {
            ...ref,
            patientAcknowledged: true,
            notifications: [ackNotification, ...(ref.notifications || [])],
          };
        }
        return ref;
      })
    );
    addAuditLog('Referral Acknowledged', `Patient acknowledged instructions for referral ${referralId}`);
  };

  const toggleFollowUpComplete = (id: string) => {
    setFollowUps((prev) =>
      prev.map((f) => (f.id === id ? { ...f, completed: !f.completed } : f))
    );
  };

  const triggerEmergencySOS = (locationHint: string = 'Rampur Kalan') => {
    addAuditLog(
      'EMERGENCY SOS TRIGGERED',
      `Emergency button pressed by ${currentPatient.name} in ${locationHint}. Auto-dispatching 108 Ambulance alert & SMS to Sunita Devi (ASHA).`,
      'alert'
    );
    setEmergencyModalOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        authUser,
        login,
        logout,
        role,
        isSupabaseConfigured,
        supabaseAuthLoading,
        refreshSupabaseData,
        activePatientId,
        setActivePatientId,
        language,
        setLanguage,
        hasSelectedLanguage,
        isLanguageModalOpen,
        setIsLanguageModalOpen,
        openLanguageSelector,
        closeLanguageSelector,
        lowBandwidthMode,
        setLowBandwidthMode,
        emergencyModalOpen,
        setEmergencyModalOpen,
        patients,
        doctors,
        fhws,
        facilities,
        appointments,
        prescriptions,
        diagnosticTests,
        referrals,
        followUps,
        auditLogs,
        currentPatient,
        activeDoctor,
        activeFhw,
        bookAppointment,
        recordVitals,
        registerPatient,
        createPrescription,
        updateDoctorAvailability,
        verifyDoctor,
        toggleDoctorVerification,
        orderDiagnosticTest,
        createReferral,
        updateReferralStage,
        acknowledgeReferral,
        toggleFollowUpComplete,
        triggerEmergencySOS,
        activeAppointment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
