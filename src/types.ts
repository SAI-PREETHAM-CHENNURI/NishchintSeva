export type Role = 'patient' | 'fhw' | 'doctor' | 'admin';

export interface AuthUser {
  id: string;
  role: Role;
  name: string;
  phone?: string;
  email?: string;
  patientId?: string;
  fhwId?: string;
  doctorId?: string;
  adminId?: string;
  isVerified?: boolean;
  verificationStatus?: 'approved' | 'pending' | 'rejected' | 'suspended' | string;
  assignedVillage?: string;
  abhaId?: string;
  registrationNo?: string;
  designation?: string;
}

export type Language = 'en' | 'hi' | 'te' | 'mr' | 'bn';

export type TriageUrgency = 'green' | 'yellow' | 'red';

export type VitalAlert = 'normal' | 'moderate' | 'critical';

export interface VitalRecord {
  id: string;
  patientId: string;
  recordedAt: string;
  recordedBy: string; // e.g., 'Sunita Devi (ASHA Worker)'
  bpSystolic: number;
  bpDiastolic: number;
  pulse: number;
  spO2: number;
  tempF: number;
  bloodSugarMgDl?: number;
  hemoglobin?: number; // g/dL
  alertFlag: VitalAlert;
  notes?: string;
}

export interface Patient {
  id: string;
  abhaId: string;
  name: string;
  nameLocal?: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  phone: string;
  village: string;
  district: string;
  state: string;
  guardianName?: string;
  bloodGroup: string;
  pmjayCard: boolean;
  pmjayNumber?: string;
  consentGiven: boolean;
  chronicConditions: string[];
  allergies: string[];
  isHighRiskPregnancy?: boolean;
  lastVisitDate?: string;
  vitalsHistory: VitalRecord[];
}

export interface Appointment {
  id: string;
  tokenNumber: number;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  patientVillage: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  timeSlot: string;
  status: 'waiting' | 'in_consultation' | 'completed' | 'cancelled';
  priority: 'normal' | 'urgent' | 'emergency';
  triageCategory: TriageUrgency;
  chiefComplaint: string;
  bookedBy: 'Self' | 'ASHA Worker';
  bookedByName?: string;
  fhwNotes?: string;
}

export interface PrescriptionMedicine {
  id: string;
  name: string;
  genericName: string; // Jan Aushadhi generic equivalent
  dosage: string;
  frequency: string; // e.g. 1-0-1
  durationDays: number;
  instructionsLocal: string; // e.g. भोजन के बाद गुनगुने पानी से
  morning: boolean;
  afternoon: boolean;
  night: boolean;
  withFood: 'before' | 'after' | 'with';
}

export interface Prescription {
  id: string;
  appointmentId: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  doctorRegNo: string;
  doctorSpecialty: string;
  date: string;
  provisionalDiagnosis: string;
  icdCode?: string;
  clinicalAdvice: string;
  medicines: PrescriptionMedicine[];
  followUpDate?: string;
  pdfSimulatedUrl?: string;
}

export interface DiagnosticTest {
  id: string;
  patientId: string;
  patientName: string;
  testName: string;
  category: 'Blood' | 'Urine' | 'Imaging' | 'Rapid Test';
  orderedByDoctor: string;
  orderedDate: string;
  status: 'ordered' | 'sample_collected' | 'processing' | 'completed';
  facilityName: string;
  resultSummary?: string;
  isAbnormal?: boolean;
}

export type FacilityCategory = 'hospital' | 'pharmacy' | 'diagnostic' | 'other';

export interface Facility {
  id: string;
  name: string;
  type: 'PHC' | 'CHC' | 'District Hospital' | 'Jan Aushadhi' | 'Diagnostic Centre' | 'Sub-Centre' | 'Clinic';
  category?: FacilityCategory;
  distanceKm: number;
  address: string;
  phone: string;
  is24x7: boolean;
  availableDoctorsCount: number;
  hasEmergency: boolean;
  hasAmbulance: boolean;
  availableServices?: string[];
  travelInfo?: string;
  timings?: string;
  isOpenNow?: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  registrationNo: string;
  medicalCouncil: string;
  experienceYears: number;
  rating: number;
  isVerified: boolean;
  verificationStatus?: 'approved' | 'pending' | 'rejected' | 'suspended' | string;
  availabilityStatus: 'available' | 'in_consultation' | 'offline';
  currentQueueLength: number;
  languages: string[];
  photoUrl?: string;
  facilityName?: string;
  distanceKm?: number;
  consultationTypes?: ('teleconsultation' | 'in_person')[];
  nextSlot?: string;
  waitingTime?: string;
}

export interface FHW {
  id: string;
  name: string;
  roleTitle: 'ASHA' | 'ANM' | 'CHO';
  village: string;
  subCenter: string;
  phone: string;
  assignedPatientsCount: number;
  activeHighRiskCount: number;
  immunizationsDueCount: number;
  lastSyncTime: string;
  isKitSynced: boolean;
}

export type ReferralStage =
  | 'created'
  | 'sent'
  | 'accepted'
  | 'destination_confirmed'
  | 'checked_in'
  | 'consultation'
  | 'investigation'
  | 'treatment'
  | 'completed'
  | 'cancelled';

export interface ReferralNotification {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'alert';
}

export interface Referral {
  id: string;
  patientId: string;
  patientName: string;
  fromFacility: string;
  toFacility: string;
  destinationAddress?: string;
  destinationPhone?: string;
  specialty?: string;
  doctorName?: string;
  reason: string;
  urgency: 'routine' | 'urgent' | 'emergency';
  priority?: 'Normal' | 'High' | 'Emergency';
  referredBy: string;
  referredByRole?: string;
  status: 'pending' | 'accepted' | 'completed' | string;
  currentStage?: ReferralStage;
  nextStepText?: string;
  appointmentSlot?: string;
  patientAcknowledged?: boolean;
  date: string;
  notifications?: ReferralNotification[];
}

export interface FollowUpReminder {
  id: string;
  patientId: string;
  patientName: string;
  title: string;
  dueDate: string;
  type: 'medication' | 'doctor_review' | 'vitals_check' | 'vaccination';
  completed: boolean;
  description: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  details: string;
  severity: 'info' | 'warning' | 'alert';
}

export interface TriageResult {
  urgency: TriageUrgency;
  urgencyLabel: string;
  colorClass: string;
  recommendedCareLevel: string;
  suggestedSpecialty: string;
  estimatedWaitMinutes: number;
  careGuidance: string[];
  emergencyWarning?: string;
}
