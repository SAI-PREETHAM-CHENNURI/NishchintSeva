import { Language } from '../types';

export interface Translations {
  // App brand & notices
  appName: string;
  appTagline: string;
  safetyNotice: string;
  mockDataNotice: string;
  lowBandwidthMode: string;
  normalBandwidth: string;
  listenAudio: string;
  welcomeBack: string;

  // Roles & Auth
  selectRoleTitle: string;
  selectRoleSubtitle: string;
  patientRoleTitle: string;
  patientRoleDesc: string;
  fhwRoleTitle: string;
  fhwRoleDesc: string;
  doctorRoleTitle: string;
  doctorRoleDesc: string;
  adminRoleTitle: string;
  adminRoleDesc: string;
  loginTitle: string;
  loginSubtitle: string;
  patientLoginPlaceholder: string;
  doctorLoginPlaceholder: string;
  fhwLoginPlaceholder: string;
  adminLoginPlaceholder: string;
  enterPassword: string;
  enterMpin: string;
  enterOtp: string;
  loginBtn: string;
  logoutBtn: string;
  backToRoles: string;
  demoAccountsTitle: string;
  demoAccountsNote: string;
  securityNoteRls: string;
  loggedInAs: string;

  // Navigation
  home: string;
  talkToDoctor: string;
  myPrescriptions: string;
  healthRecords: string;
  nearbyFacilities: string;
  patientProfile: string;

  // Emergency
  emergencyTitle: string;
  emergencyBtn: string;
  emergencyDesc: string;
  criticalEmergencyBanner: string;
  dial108Now: string;
  firstAidTitle: string;
  ambulanceDispatched: string;
  calling108Simulated: string;
  firstAidChestPain: string;
  firstAidBreathing: string;
  firstAidSnakebite: string;

  // Patient Dashboard
  gramPanchayat: string;
  abhaIdLabel: string;
  pmjayCardLabel: string;
  latestVitals: string;
  bloodPressure: string;
  oxygenLevel: string;
  pulseRate: string;
  randomSugar: string;
  temperature: string;
  activeTokenNotice: string;
  activeQueue: string;
  chiefComplaint: string;
  estimatedWait: string;
  enterConsultationRoom: string;
  followUpAlert: string;
  markDone: string;
  healthcareServices: string;
  touchToOpen: string;
  activeTeleOpd: string;
  healthAssistant: string;
  healthAssistantSub: string;
  symptomCheck: string;
  symptomCheckSub: string;
  myPrescriptionsSub: string;
  healthRecordsSub: string;
  nearbyFacilitiesSub: string;
  talkToDoctorSub: string;

  // Meet Doctor
  teleOpdTitle: string;
  teleOpdSubtitle: string;
  audioOptimized: string;
  hdVideoStream: string;
  allSpecialties: string;
  generalPhysician: string;
  maternalGynae: string;
  childHealth: string;
  doctorAvailable: string;
  doctorInConsult: string;
  doctorOffline: string;
  experienceYears: string;
  rating: string;
  verifiedDoctor: string;
  unverifiedDoctorBadge: string;
  bookConsultationToken: string;
  enterSymptomsPlaceholder: string;
  cancel: string;
  confirmBooking: string;
  teleConsultationRoom: string;
  micOn: string;
  micOff: string;
  videoOn: string;
  videoOff: string;
  endConsultation: string;

  // Prescriptions
  prescriptionsTitle: string;
  prescriptionsSubtitle: string;
  totalPrescriptions: string;
  noPrescriptions: string;
  dosageSchedule: string;
  morning: string;
  afternoon: string;
  night: string;
  withFoodBefore: string;
  withFoodAfter: string;
  withFoodWith: string;
  durationDays: string;
  genericJanAushadhiNotice: string;
  doctorRegNo: string;
  provisionalDiagnosis: string;
  clinicalAdvice: string;
  followUpDate: string;
  downloadPrescription: string;

  // Health Records
  recordsTitle: string;
  recordsSubtitle: string;
  uploadPaperRecord: string;
  abhaCardTitle: string;
  abhaCardDesc: string;
  downloadAbhaCard: string;
  diagnosticLabReports: string;
  testStatus: string;
  sampleCollected: string;
  testCompleted: string;
  abnormalResult: string;
  normalResult: string;
  uploadModalTitle: string;
  documentName: string;
  documentCategory: string;
  uploadBtn: string;
  recordSavedSuccess: string;

  // Nearby Facilities
  facilitiesTitle: string;
  facilitiesSubtitle: string;
  filterAll: string;
  filterJanAushadhi: string;
  filterPhcChc: string;
  filterEmergency24x7: string;
  availableDoctors: string;
  ambulanceReady: string;
  distanceKm: string;
  callFacility: string;
  callingSimulated: string;

  // Patient Profile
  profileTitle: string;
  profileSubtitle: string;
  bloodGroup: string;
  contactNumber: string;
  emergencyContact: string;
  chronicConditions: string;
  noChronicConditions: string;
  drugAllergies: string;
  noAllergies: string;
  vitalsMonitoringLog: string;
  noVitalsRecorded: string;

  // FHW Dashboard
  fhwTitle: string;
  fhwSubtitle: string;
  assignedVillages: string;
  familiesCovered: string;
  highRiskCases: string;
  vaccinesDue: string;
  tabAssignedPatients: string;
  tabRecordVitals: string;
  tabBookDoctor: string;
  tabRegisterPatient: string;
  tabReferrals: string;
  searchPatientPlaceholder: string;
  filterHighRiskOnly: string;
  registerNewPatientBtn: string;
  patientName: string;
  age: string;
  gender: string;
  female: string;
  male: string;
  other: string;
  phoneNumber: string;
  village: string;
  consentCaptured: string;
  registerSubmitBtn: string;
  recordVitalsBtn: string;
  vitalsRecordedSuccess: string;
  selectPatient: string;
  bookOnBehalfBtn: string;
  tokenBookedSuccess: string;
  referralDestination: string;
  referralReason: string;
  sendReferralBtn: string;
  referralSentSuccess: string;

  // Doctor Dashboard
  doctorTitle: string;
  doctorSubtitle: string;
  opdStatusOnline: string;
  opdStatusConsult: string;
  opdStatusOffline: string;
  unverifiedDoctorAlert: string;
  unverifiedDoctorDesc: string;
  opdPatientQueue: string;
  tokenNumber: string;
  startConsultationBtn: string;
  clinicalWorkspace: string;
  provisionalDiagnosisLabel: string;
  icdCodeLabel: string;
  clinicalAdviceLabel: string;
  addMedicine: string;
  medicineName: string;
  genericSubstitute: string;
  dosageFrequency: string;
  issuePrescriptionBtn: string;
  prescriptionSuccess: string;
  orderDiagnosticTestLabel: string;
  submitOrderBtn: string;

  // Admin Dashboard
  adminTitle: string;
  adminSubtitle: string;
  systemHealthUptime: string;
  tabOverview: string;
  tabDoctorVerification: string;
  tabFhwManagement: string;
  tabAuditLogs: string;
  kpiRuralCitizens: string;
  kpiConsultations: string;
  kpiJanAushadhiSaved: string;
  kpiHighRiskMonitored: string;
  doctorVerificationTitle: string;
  nmcRegNo: string;
  medicalCouncil: string;
  verifyBtn: string;
  suspendBtn: string;
  doctorVerifiedStatus: string;
  doctorPendingStatus: string;
  fhwSyncStatus: string;
  subCentre: string;
  lastSync: string;
  activeCaseload: string;
  auditLogTitle: string;

  // Helplines & Footer
  ambulance108: string;
  healthHelpline104: string;
  janAushadhiHelpline: string;
  pmjayHelpline: string;
  footerTitle: string;
  footerSubtitle: string;
  prototypeNotice: string;

  // Role-based Language Selection
  chooseYourLanguage: string;
  selectLanguageSubtitle: string;
  teluguLangName: string;
  teluguLangDesc: string;
  hindiLangName: string;
  hindiLangDesc: string;
  englishLangName: string;
  englishLangDesc: string;
  marathiLangName: string;
  marathiLangDesc: string;
  bengaliLangName: string;
  bengaliLangDesc: string;
  continueWithLanguage: string;
  changeLanguage: string;
  preferredLanguage: string;

  // Single-Language Tele-OPD & Patient UI
  joinConsultationRoom: string;
  describeComplaint: string;
  confirmToken: string;
  token: string;
  liveOpdQueueStatus: string;
  priority: string;
  appointmentWith: string;
  nowServingToken: string;
  approxWait: string;
  filterBySpecialty: string;
  availableNow: string;
  inConsultation: string;
  registration: string;
  experience: string;
  years: string;
  languages: string;
  currentQueue: string;
  patientsWaiting: string;
  getTokenWithDoctor: string;
  doctorLabel: string;
  patientLabel: string;
  villageLabel: string;
  ageLabel: string;
  complaintPlaceholder: string;
  you: string;
  connected: string;
  audioSpeechGuidance: string;
  doctorVideoGreeting: string;
  vitalsSyncedNotice: string;
  mute: string;
  unmute: string;

  // Facilities
  callCentre: string;
  showingNearbyLocations: string;
  callingFacility: string;
  kmAway: string;
  open24x7: string;
  ambulanceAvailable: string;
  doctorsOnDuty: string;
  medicineSubsidy: string;
  viewMapRoute: string;

  // Prescriptions & Records
  prescriptionsAutoAppear: string;
  teleOpdPrescriptionHeader: string;
  prescribedBy: string;
  printSlip: string;
  prescriptionDownloadSuccess: string;
  janAushadhiGeneric: string;
  tablet: string;
  nextReviewDate: string;
  availableAtJanAushadhi: string;
  govIndiaNha: string;
  abhaNumber: string;
  abhaAddress: string;
  genderAge: string;
  villageDistrict: string;
  scanForAbhaEhr: string;
  consentActiveAadhaar: string;
  pmjayScheme: string;
  pmjayActive: string;
  pmjayNotLinked: string;
  diagnosticSamplesSubtitle: string;
  recordsCount: string;
  noDiagnosticOrders: string;
  resultLabel: string;
  flaggedForReview: string;
  uploadPhysicalRecord: string;
  uploadPhysicalRecordDesc: string;
  uploadSuccessMessage: string;

  // AI Assistant & Badges
  anemiaNutrition: string;
  cleanDrinkingWater: string;
  checkWithAsha: string;
  minutes: string;
  teleOpdBadge: string;
  voiceBadge: string;
  triageBadge: string;
  janAushadhiBadge: string;
  abhaEhrBadge: string;
  kmBadge: string;
  aiGuidanceBadge: string;

  // Symptom Triage Full Localization
  triageDurationLabel: string;
  triageSeverityLabel: string;
  redFlagsLabel: string;
  redFlagChestPain: string;
  redFlagBlueLips: string;
  redFlagUnconscious: string;
  redFlagBloodInStool: string;
  calculateTriageBtn: string;
  decisionSupportSystem: string;
  recommendedLevelOfCare: string;
  homeCareGuidance: string;
  proceedToDoctorBtn: string;
  closeTriageBtn: string;
  durationTodayMorning: string;
  duration2to3Days: string;
  duration1Week: string;
  duration2WeeksPlus: string;
  severityMild: string;
  severityModerate: string;
  severitySevere: string;

  // Referral Status & Tracking
  referralStatusTitle: string;
  referralStatusSubtitle: string;
  activeReferralBadge: string;
  viewReferralProgress: string;
  referralIdLabel: string;
  referredByLabel: string;
  originFacilityLabel: string;
  destinationFacilityLabel: string;
  specialtyRequired: string;
  referralReasonLabel: string;
  priorityLevel: string;
  nextStepLabel: string;
  referralTimelineTitle: string;
  acknowledgeReferralBtn: string;
  acknowledgedNotice: string;
  simulateStageAdvance: string;
  simulateReset: string;
  referralNotificationsTitle: string;
  backToDashboard: string;
  referralStageCreated: string;
  referralStageSent: string;
  referralStageAccepted: string;
  referralStageDestinationConfirmed: string;
  referralStageCheckedIn: string;
  referralStageConsultation: string;
  referralStageInvestigation: string;
  referralStageTreatment: string;
  referralStageCompleted: string;

  // Upgraded Nearby Care
  nearbyCareQuestion: string;
  nearbyCareSelectCategory: string;
  catHospitals: string;
  catHospitalsSub: string;
  catPharmacies: string;
  catPharmaciesSub: string;
  catDiagnostics: string;
  catDiagnosticsSub: string;
  catOther: string;
  catOtherSub: string;
  catAll: string;
  catAllSub: string;
  changeCategory: string;
  callToCheckMedicine: string;
  bookAppointment: string;
  viewServices: string;
  medicineAvailabilityCheck: string;
  medicineInStock: string;
  checkStockBtn: string;
  approxTravel: string;

  // AI-Powered Meet a Doctor
  howAreYouFeeling: string;
  tellUsWhatIsHappening: string;
  typeSymptomsPlaceholder: string;
  speakSymptoms: string;
  listening: string;
  stopListening: string;
  speechNotSupported: string;
  commonSymptomsSuggestions: string;
  analyzingSymptoms: string;
  understoodSymptoms: string;
  isThisCorrect: string;
  yesContinue: string;
  editSymptoms: string;
  followUpQuestionsTitle: string;
  possibleEmergencyTitle: string;
  possibleEmergencyDesc: string;
  call108Action: string;
  findEmergencyHospital: string;
  recommendedSpecialist: string;
  specialistRecommendationReason: string;
  doctorsSuitableForYou: string;
  bookTeleconsultation: string;
  bookInPerson: string;
  inPersonConsultation: string;
  teleconsultationOption: string;
  teleconsultAvailable: string;
  inPersonFacilityVisit: string;
  skipToAllDoctors: string;
  recheckSymptoms: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'Nishchint Seva',
    appTagline: 'Rural Healthcare & Frontline Care Network',
    safetyNotice: 'Health information is for decision support & guidance, not medical diagnosis.',
    mockDataNotice: 'Demonstration Prototype - Not connected to live government registry',
    lowBandwidthMode: '2G/3G Low-Bandwidth Mode Active',
    normalBandwidth: 'Standard Network',
    listenAudio: 'Listen in English',
    welcomeBack: 'Welcome',

    selectRoleTitle: 'Select Your Access Portal',
    selectRoleSubtitle: 'Secure, role-based healthcare services for rural citizens, frontline workers, doctors, and district health authorities.',
    patientRoleTitle: 'Patient Portal',
    patientRoleDesc: 'Access tele-OPD, personal health locker, digital prescriptions, and emergency care.',
    fhwRoleTitle: 'Frontline Health Worker',
    fhwRoleDesc: 'ASHA, ANM, and Community Health Officer portal for household surveys and vitals.',
    doctorRoleTitle: 'Verified Medical Doctor',
    doctorRoleDesc: 'Conduct tele-consultations, verify clinical history, and issue Jan Aushadhi prescriptions.',
    adminRoleTitle: 'District Health Admin',
    adminRoleDesc: 'District-level supervision, doctor credentialing, facility oversight, and audit logs.',
    loginTitle: 'Sign In to Portal',
    loginSubtitle: 'Enter your credentials or select a verified demonstration profile.',
    patientLoginPlaceholder: 'Enter 14-digit ABHA ID or mobile number',
    doctorLoginPlaceholder: 'Enter NMC registration number or email',
    fhwLoginPlaceholder: 'Enter Health Worker ID or phone number',
    adminLoginPlaceholder: 'Enter District Officer ID',
    enterPassword: 'Enter secure password',
    enterMpin: 'Enter 4-digit MPIN',
    enterOtp: 'Enter 6-digit OTP',
    loginBtn: 'Sign In',
    logoutBtn: 'Log Out',
    backToRoles: 'Back to Role Selection',
    demoAccountsTitle: 'Demonstration Accounts',
    demoAccountsNote: 'Click any profile below to sign in instantly with test credentials.',
    securityNoteRls: 'Secured via role-based access policies and encrypted patient records.',
    loggedInAs: 'Signed in as',

    home: 'Home',
    talkToDoctor: 'Meet a Doctor',
    myPrescriptions: 'My Prescriptions',
    healthRecords: 'Health Records',
    nearbyFacilities: 'Nearby Care',
    patientProfile: 'My Profile',

    emergencyTitle: 'Emergency Help (108 SOS)',
    emergencyBtn: 'EMERGENCY 108',
    emergencyDesc: 'Immediate call to 108 ambulance, village ASHA alert, and nearest PHC notification.',
    criticalEmergencyBanner: 'CRITICAL EMERGENCY ALERT',
    dial108Now: 'Dial 108 Immediately',
    firstAidTitle: 'Emergency First Aid Guidance',
    ambulanceDispatched: 'Emergency ambulance request transmitted.',
    calling108Simulated: 'Connecting to 108 Emergency Control Room...',
    firstAidChestPain: 'Keep patient seated upright. Loosen tight clothing. Ensure calm breathing.',
    firstAidBreathing: 'Move to well-ventilated open air. Use inhaler if prescribed. Do not lay flat.',
    firstAidSnakebite: 'Keep limb still below heart level. Do not cut or apply tight tourniquet. Rush to PHC.',

    gramPanchayat: 'Gram Panchayat',
    abhaIdLabel: 'ABHA Health ID',
    pmjayCardLabel: 'PM-JAY Ayushman Card',
    latestVitals: 'Latest Health Vitals',
    bloodPressure: 'Blood Pressure',
    oxygenLevel: 'Oxygen Saturation',
    pulseRate: 'Pulse Rate',
    randomSugar: 'Blood Glucose',
    temperature: 'Temperature',
    activeTokenNotice: 'You have an active appointment token today',
    activeQueue: 'Active Consultation Queue',
    chiefComplaint: 'Chief Complaint',
    estimatedWait: 'Estimated wait time',
    enterConsultationRoom: 'Enter Tele-Consultation Room',
    followUpAlert: 'Upcoming Follow-up Due',
    markDone: 'Mark Completed',
    healthcareServices: 'Healthcare Services',
    touchToOpen: 'Tap any service to open',
    activeTeleOpd: 'Active Tele-OPD',
    healthAssistant: 'Health Assistant',
    healthAssistantSub: 'Guidance and preventive care in simple language',
    symptomCheck: 'Symptom Triage',
    symptomCheckSub: 'Decision support and clinical triage',
    myPrescriptionsSub: 'Dosage schedule and generic medicine alternatives',
    healthRecordsSub: 'ABHA card, laboratory reports, and past history',
    nearbyFacilitiesSub: 'PHCs, CHCs, pharmacies, and diagnostic centres',
    talkToDoctorSub: 'Live tele-consultation and token queue',

    teleOpdTitle: 'Tele-OPD and Doctor Consultation',
    teleOpdSubtitle: 'Verified government and empanelled doctors providing free rural consultations.',
    audioOptimized: 'Audio-Optimized Bandwidth Mode',
    hdVideoStream: 'High-Definition Video Stream',
    allSpecialties: 'All Specialties',
    generalPhysician: 'General Physician',
    maternalGynae: 'Maternal and Women Health',
    childHealth: 'Child Health and Paediatrics',
    doctorAvailable: 'Available Online',
    doctorInConsult: 'In Consultation',
    doctorOffline: 'Currently Offline',
    experienceYears: 'Years Experience',
    rating: 'Rating',
    verifiedDoctor: 'NMC Verified Doctor',
    unverifiedDoctorBadge: 'Verification Pending',
    bookConsultationToken: 'Book Consultation Token',
    enterSymptomsPlaceholder: 'Describe your symptoms or reason for doctor visit...',
    cancel: 'Cancel',
    confirmBooking: 'Confirm Token Booking',
    teleConsultationRoom: 'Tele-Consultation Room',
    micOn: 'Microphone On',
    micOff: 'Microphone Muted',
    videoOn: 'Camera On',
    videoOff: 'Camera Off',
    endConsultation: 'End Consultation',

    prescriptionsTitle: 'My Prescriptions and Medicines',
    prescriptionsSubtitle: 'Digital prescriptions with visual schedule and Jan Aushadhi generic equivalents.',
    totalPrescriptions: 'Total Prescriptions',
    noPrescriptions: 'No prescriptions found for this patient.',
    dosageSchedule: 'Daily Dosage Schedule',
    morning: 'Morning',
    afternoon: 'Afternoon',
    night: 'Night',
    withFoodBefore: 'Before food',
    withFoodAfter: 'After food',
    withFoodWith: 'With food',
    durationDays: 'Duration (Days)',
    genericJanAushadhiNotice: 'Jan Aushadhi Generic Alternative',
    doctorRegNo: 'Doctor Reg Number',
    provisionalDiagnosis: 'Provisional Diagnosis',
    clinicalAdvice: 'Clinical Advice and Precautions',
    followUpDate: 'Follow-up Date',
    downloadPrescription: 'Download Prescription',

    recordsTitle: 'Health Records and ABHA Locker',
    recordsSubtitle: 'Ayushman Bharat Health Account (ABHA), diagnostic reports, and medical history.',
    uploadPaperRecord: 'Upload Health Record',
    abhaCardTitle: 'Official ABHA Health Card',
    abhaCardDesc: 'National Digital Health Mission Identity',
    downloadAbhaCard: 'Download ABHA Card',
    diagnosticLabReports: 'Diagnostic Laboratory Reports',
    testStatus: 'Status',
    sampleCollected: 'Sample Collected',
    testCompleted: 'Completed',
    abnormalResult: 'Attention Needed',
    normalResult: 'Within Normal Limits',
    uploadModalTitle: 'Upload Medical Record',
    documentName: 'Document Name',
    documentCategory: 'Document Category',
    uploadBtn: 'Save to Health Locker',
    recordSavedSuccess: 'Document saved to ABHA Locker successfully.',

    facilitiesTitle: 'Nearby Healthcare Facilities',
    facilitiesSubtitle: 'Geotagged public health centres, generic pharmacies, and diagnostic hubs.',
    filterAll: 'All Centres',
    filterJanAushadhi: 'Jan Aushadhi Stores',
    filterPhcChc: 'PHCs and CHCs',
    filterEmergency24x7: '24x7 Emergency Centres',
    availableDoctors: 'Doctors on Duty',
    ambulanceReady: 'Ambulance On Standby',
    distanceKm: 'Distance',
    callFacility: 'Call Facility',
    callingSimulated: 'Initiating call to facility...',

    profileTitle: 'Patient Profile and Health Identity',
    profileSubtitle: 'Verified ABHA credentials, government schemes, chronic conditions, and vital logs.',
    bloodGroup: 'Blood Group',
    contactNumber: 'Contact Number',
    emergencyContact: 'Emergency Contact',
    chronicConditions: 'Chronic Health Conditions',
    noChronicConditions: 'No chronic conditions recorded.',
    drugAllergies: 'Allergies and Sensitivities',
    noAllergies: 'No known allergies reported.',
    vitalsMonitoringLog: 'Vitals Monitoring Log',
    noVitalsRecorded: 'No vitals records logged yet.',

    fhwTitle: 'Frontline Health Worker Portal',
    fhwSubtitle: 'ASHA and ANM field health support, patient management, and vitals recording.',
    assignedVillages: 'Assigned Villages',
    familiesCovered: 'Assigned Families',
    highRiskCases: 'High-Risk Cases',
    vaccinesDue: 'Vaccinations Due',
    tabAssignedPatients: 'Assigned Patients',
    tabRecordVitals: 'Record Health Vitals',
    tabBookDoctor: 'Book Doctor OPD',
    tabRegisterPatient: 'Register Patient',
    tabReferrals: 'Referrals and Tracking',
    searchPatientPlaceholder: 'Search by patient name, ABHA ID, or village...',
    filterHighRiskOnly: 'High-Risk and Maternal Cases Only',
    registerNewPatientBtn: 'Register New Patient',
    patientName: 'Full Name',
    age: 'Age',
    gender: 'Gender',
    female: 'Female',
    male: 'Male',
    other: 'Other',
    phoneNumber: 'Mobile Phone Number',
    village: 'Village / Hamlet',
    consentCaptured: 'Patient Verbal Consent Obtained',
    registerSubmitBtn: 'Generate ABHA ID and Register',
    recordVitalsBtn: 'Save Vitals Record',
    vitalsRecordedSuccess: 'Vitals successfully recorded and synced.',
    selectPatient: 'Select Patient',
    bookOnBehalfBtn: 'Book Doctor Appointment',
    tokenBookedSuccess: 'Appointment token successfully generated.',
    referralDestination: 'Referred Health Facility',
    referralReason: 'Clinical Reason for Referral',
    sendReferralBtn: 'Dispatch Official Referral',
    referralSentSuccess: 'Referral dispatched to community health centre.',

    doctorTitle: 'Doctor Tele-Consultation Console',
    doctorSubtitle: 'National Medical Commission verified clinical workstation and e-prescribing.',
    opdStatusOnline: 'Online for Tele-OPD',
    opdStatusConsult: 'In Active Consultation',
    opdStatusOffline: 'Doctor Offline',
    unverifiedDoctorAlert: 'Verification Pending with District Health Authority',
    unverifiedDoctorDesc: 'Your medical credentials are under review by the District Health Admin. You cannot practice, consult, prescribe, or modify clinical records until approved.',
    opdPatientQueue: 'Tele-OPD Patient Queue',
    tokenNumber: 'Token Number',
    startConsultationBtn: 'Start Consultation Call',
    clinicalWorkspace: 'Clinical Consultation Workspace',
    provisionalDiagnosisLabel: 'Provisional Diagnosis',
    icdCodeLabel: 'ICD Code',
    clinicalAdviceLabel: 'Clinical Advice and Lifestyle Directions',
    addMedicine: 'Add Medicine',
    medicineName: 'Medicine Name',
    genericSubstitute: 'Generic Alternative (Jan Aushadhi)',
    dosageFrequency: 'Dosage Frequency',
    issuePrescriptionBtn: 'Sign and Issue e-Prescription',
    prescriptionSuccess: 'Prescription signed and transferred to patient ABHA locker.',
    orderDiagnosticTestLabel: 'Order Diagnostic Lab Test',
    submitOrderBtn: 'Dispatch Lab Order',

    adminTitle: 'District Health Administration and Compliance',
    adminSubtitle: 'District-wide healthcare monitoring, credentialing, and regulatory auditing.',
    systemHealthUptime: 'System Status: Optimal Uptime',
    tabOverview: 'District Health Overview',
    tabDoctorVerification: 'Doctor Credentialing',
    tabFhwManagement: 'Health Worker Management',
    tabAuditLogs: 'Audit and Compliance Logs',
    kpiRuralCitizens: 'Registered Rural Citizens',
    kpiConsultations: 'Tele-Consultations Completed',
    kpiJanAushadhiSaved: 'Generic Substitution Rate',
    kpiHighRiskMonitored: 'High-Risk Cases Monitored',
    doctorVerificationTitle: 'Medical Practitioner Credentialing',
    nmcRegNo: 'NMC Registration Number',
    medicalCouncil: 'State Medical Council',
    verifyBtn: 'Verify and Approve',
    suspendBtn: 'Suspend Credentials',
    doctorVerifiedStatus: 'Approved to Practice',
    doctorPendingStatus: 'Pending Verification',
    fhwSyncStatus: 'Field Sync Status',
    subCentre: 'Primary Sub-Centre',
    lastSync: 'Last Synchronized',
    activeCaseload: 'Active Field Caseload',
    auditLogTitle: 'Regulatory and Security Audit Logs',

    ambulance108: 'Free 24x7 Rural Ambulance',
    healthHelpline104: 'Health Advice and Blood Bank',
    janAushadhiHelpline: 'Generic Medicines Availability',
    pmjayHelpline: 'PM-JAY Ayushman Bharat Claims',
    footerTitle: 'Nishchint Seva Rural Healthcare Access Network',
    footerSubtitle: 'Integrated with Ayushman Bharat Digital Mission and National Health Authority standards.',
    prototypeNotice: 'Demonstration Prototype - Simulated Tele-OPD and ABHA Health Locker',

    // Role-based Language Selection
    chooseYourLanguage: 'Choose your language',
    selectLanguageSubtitle: 'Please select your preferred language. All medical services, consultations, and prescriptions will be provided in this language.',
    teluguLangName: 'తెలుగు (Telugu)',
    teluguLangDesc: 'Rural healthcare services, tele-consultation, and medicines in Telugu',
    hindiLangName: 'हिन्दी (Hindi)',
    hindiLangDesc: 'Rural healthcare services, doctor consultations, and prescriptions in Hindi',
    englishLangName: 'English (English)',
    englishLangDesc: 'Complete rural telemedicine and health locker records in English',
    marathiLangName: 'मराठी (Marathi)',
    marathiLangDesc: 'Rural healthcare and ASHA services in Marathi',
    bengaliLangName: 'বাংলা (Bengali)',
    bengaliLangDesc: 'Rural health records and doctor consultations in Bengali',
    continueWithLanguage: 'Continue with Selected Language',
    changeLanguage: 'Change Language',
    preferredLanguage: 'Preferred Language',

    // Single-Language Tele-OPD & Patient UI
    joinConsultationRoom: 'Join Consultation Room',
    describeComplaint: 'Describe your health problem or symptoms',
    confirmToken: 'Confirm Appointment Token',
    token: 'Token',
    liveOpdQueueStatus: 'LIVE OPD QUEUE STATUS',
    priority: 'Priority',
    appointmentWith: 'Consultation with',
    nowServingToken: 'Now Serving Token #11 (Your turn approaching)',
    approxWait: 'Estimated wait: 12-15 minutes',
    filterBySpecialty: 'Smart Care Matching • Filter by Specialty:',
    availableNow: '● Available Now',
    inConsultation: '● In Consultation',
    registration: 'Registration',
    experience: 'Experience',
    years: 'years',
    languages: 'Languages',
    currentQueue: 'Current Queue',
    patientsWaiting: 'patients waiting',
    getTokenWithDoctor: 'Get Tele-OPD Token with',
    doctorLabel: 'Doctor',
    patientLabel: 'Patient',
    villageLabel: 'Village',
    ageLabel: 'Age',
    complaintPlaceholder: 'E.g., Morning dizziness, elevated blood pressure, weakness for 2 days...',
    you: 'You',
    connected: 'Connected',
    audioSpeechGuidance: 'Audio speech guidance',
    doctorVideoGreeting: 'Namaste! I am reviewing your recent blood pressure readings synced by your village ASHA worker. How are you feeling today?',
    vitalsSyncedNotice: 'Vitals Synced from ASHA Didi: BP 140/90 mmHg • SpO2 98% • Pulse 76 bpm',
    mute: 'Mute',
    unmute: 'Unmute',

    // Facilities
    callCentre: 'Call Centre',
    showingNearbyLocations: 'Showing Nearby Healthcare Locations',
    callingFacility: 'Connecting call to centre via rural telecom gateway...',
    kmAway: 'km away',
    open24x7: '24x7 Emergency Open',
    ambulanceAvailable: 'Ambulance Available',
    doctorsOnDuty: 'Doctors on Duty',
    medicineSubsidy: '50%-90% Medicine Subsidy',
    viewMapRoute: 'View Route',

    // Prescriptions & Records
    prescriptionsAutoAppear: 'Prescriptions issued during Tele-OPD or PHC visits will appear here automatically.',
    teleOpdPrescriptionHeader: 'TELE-OPD DIGITAL PRESCRIPTION',
    prescribedBy: 'Prescribed by',
    printSlip: 'Download / Print Slip',
    prescriptionDownloadSuccess: 'Prescription slip downloaded successfully (PDF)',
    janAushadhiGeneric: 'Jan Aushadhi Generic Substitute',
    tablet: 'Tablet',
    nextReviewDate: 'Next Review Date',
    availableAtJanAushadhi: 'Available at Rampur Jan Aushadhi Kendra (2.4 km away)',
    govIndiaNha: 'GOVERNMENT OF INDIA • NATIONAL HEALTH AUTHORITY (NHA)',
    abhaNumber: 'ABHA Number',
    abhaAddress: 'ABHA Address',
    genderAge: 'Gender / Age',
    villageDistrict: 'Village & District',
    scanForAbhaEhr: 'Scan for ABHA EHR',
    consentActiveAadhaar: 'Patient Consent Active • e-KYC Verified via Aadhaar',
    pmjayScheme: 'PM-JAY Scheme',
    pmjayActive: 'Active / Eligible (₹5 Lakh Annual Cover)',
    pmjayNotLinked: 'Not Linked',
    diagnosticSamplesSubtitle: 'Samples collected by ASHA workers or tested at Rampur PHC / Diagnostic Hub',
    recordsCount: 'Records',
    noDiagnosticOrders: 'No diagnostic orders recorded.',
    resultLabel: 'Result',
    flaggedForReview: 'Flagged for Review',
    uploadPhysicalRecord: 'Upload Physical Health Record',
    uploadPhysicalRecordDesc: 'Take a photo or upload existing paper prescription or lab report to link to your ABHA profile.',
    uploadSuccessMessage: 'Document successfully scanned and added to your Health Locker!',

    // AI Assistant & Badges
    anemiaNutrition: 'Anemia & Nutrition',
    cleanDrinkingWater: 'Clean Drinking Water',
    checkWithAsha: 'Check with ASHA Didi',
    minutes: 'mins',
    teleOpdBadge: 'Tele-OPD',
    voiceBadge: 'Voice',
    triageBadge: 'Triage',
    janAushadhiBadge: 'Jan Aushadhi',
    abhaEhrBadge: 'ABHA / EHR',
    kmBadge: 'KM',
    aiGuidanceBadge: 'AI Guidance',

    // Symptom Triage Full Localization
    triageDurationLabel: 'How long have you had these symptoms?',
    triageSeverityLabel: 'Symptom Severity',
    redFlagsLabel: 'Red Flag Emergency Warning Signs',
    redFlagChestPain: 'Severe crushing chest pain',
    redFlagBlueLips: 'Blue lips or cold fingertips',
    redFlagUnconscious: 'Drowsiness or loss of response',
    redFlagBloodInStool: 'Blood in vomit or stool',
    calculateTriageBtn: 'Calculate Triage Assessment',
    decisionSupportSystem: 'Clinical Decision Support',
    recommendedLevelOfCare: 'Recommended Level of Care',
    homeCareGuidance: 'Immediate Home Care Guidance',
    proceedToDoctorBtn: 'Book Priority Tele-OPD Consultation',
    closeTriageBtn: 'Close Assessment',
    durationTodayMorning: 'Since today morning',
    duration2to3Days: '2 - 3 days',
    duration1Week: 'About 1 week',
    duration2WeeksPlus: 'More than 2 weeks',
    severityMild: 'Mild',
    severityModerate: 'Moderate',
    severitySevere: 'Severe',

    // Referral Status & Tracking
    referralStatusTitle: 'Referral Status',
    referralStatusSubtitle: 'Track your referral journey and care progress',
    activeReferralBadge: 'Active Referral',
    viewReferralProgress: 'View Referral Progress',
    referralIdLabel: 'Referral ID',
    referredByLabel: 'Referred By',
    originFacilityLabel: 'Origin Facility',
    destinationFacilityLabel: 'Destination Facility',
    specialtyRequired: 'Specialty Required',
    referralReasonLabel: 'Reason for Referral',
    priorityLevel: 'Priority Level',
    nextStepLabel: 'NEXT STEP',
    referralTimelineTitle: 'Care Journey & Referral Timeline',
    acknowledgeReferralBtn: 'Acknowledge Referral',
    acknowledgedNotice: 'Referral instructions acknowledged by patient',
    simulateStageAdvance: 'Simulate Next Stage',
    simulateReset: 'Reset to Initial Stage',
    referralNotificationsTitle: 'Referral Updates & Notifications',
    backToDashboard: 'Back to Dashboard',
    referralStageCreated: 'Referral Created',
    referralStageSent: 'Referral Sent',
    referralStageAccepted: 'Referral Accepted',
    referralStageDestinationConfirmed: 'Destination Confirmed',
    referralStageCheckedIn: 'Patient Arrived / Checked In',
    referralStageConsultation: 'Consultation',
    referralStageInvestigation: 'Investigation',
    referralStageTreatment: 'Treatment / Care',
    referralStageCompleted: 'Referral Completed',

    // Upgraded Nearby Care
    nearbyCareQuestion: 'What type of care are you looking for?',
    nearbyCareSelectCategory: 'Select a category to find closest verified facilities near your village:',
    catHospitals: 'Hospitals',
    catHospitalsSub: 'PHC, CHC & District Hospitals',
    catPharmacies: 'Pharmacies / Medical Shops',
    catPharmaciesSub: 'Jan Aushadhi & Generic Medicines',
    catDiagnostics: 'Diagnostic Centres',
    catDiagnosticsSub: 'Pathology, Blood Tests & Scans',
    catOther: 'Other Healthcare Facilities',
    catOtherSub: 'Sub-Centres & Wellness Clinics',
    catAll: 'All Nearby Care',
    catAllSub: 'Explore all healthcare locations',
    changeCategory: 'Change Category',
    callToCheckMedicine: 'Call to check medicine availability',
    bookAppointment: 'Book / Request Appointment',
    viewServices: 'View Available Services',
    medicineAvailabilityCheck: 'Medicine Availability Check',
    medicineInStock: 'In Stock at Jan Aushadhi',
    checkStockBtn: 'Check Stock',
    approxTravel: 'Travel Info',

    // AI-Powered Meet a Doctor
    howAreYouFeeling: 'How are you feeling today?',
    tellUsWhatIsHappening: 'Tell us what is happening. You can type or speak.',
    typeSymptomsPlaceholder: 'Describe your symptoms (e.g., chest discomfort, morning dizziness, high fever)...',
    speakSymptoms: 'Speak your symptoms',
    listening: 'Listening... please speak',
    stopListening: 'Stop recording',
    speechNotSupported: 'Speech recognition is not active on this browser. Try typing or tap a sample below.',
    commonSymptomsSuggestions: 'Quick symptom suggestions:',
    analyzingSymptoms: 'Analyzing symptoms with AI clinical matching...',
    understoodSymptoms: 'I understood these symptoms:',
    isThisCorrect: 'Is this correct?',
    yesContinue: 'YES, CONTINUE',
    editSymptoms: 'EDIT',
    followUpQuestionsTitle: 'A few quick follow-up questions:',
    possibleEmergencyTitle: 'POSSIBLE EMERGENCY',
    possibleEmergencyDesc: 'Your symptoms may require immediate emergency medical attention. Please do not wait for a routine consultation.',
    call108Action: 'CALL 108 IMMEDIATELY',
    findEmergencyHospital: 'FIND NEAREST EMERGENCY HOSPITAL',
    recommendedSpecialist: 'Recommended Specialist',
    specialistRecommendationReason: 'Based on the symptoms you described, this consultation may be appropriate.',
    doctorsSuitableForYou: 'Doctors who may be suitable for you',
    bookTeleconsultation: 'Book Teleconsultation',
    bookInPerson: 'Book In-Person Visit',
    inPersonConsultation: 'In-Person Consultation',
    teleconsultationOption: 'Teleconsultation',
    teleconsultAvailable: 'Available for Online Video OPD',
    inPersonFacilityVisit: 'Visit Facility In-Person',
    skipToAllDoctors: 'Skip symptom check and view all doctors',
    recheckSymptoms: 'Check different symptoms',
  },

  hi: {
    appName: 'निश्चिंत सेवा',
    appTagline: 'ग्रामीण स्वास्थ्य एवं स्वास्थ्य कार्यकर्ता नेटवर्क',
    safetyNotice: 'यह जानकारी स्वास्थ्य मार्गदर्शन हेतु है, चिकित्सीय निदान नहीं।',
    mockDataNotice: 'प्रोटोटाइप प्रदर्शन - सरकारी रजिस्ट्री से सीधा संपर्क नहीं',
    lowBandwidthMode: 'कम इंटरनेट गति मोड (2G/3G) चालू',
    normalBandwidth: 'सामान्य नेटवर्क',
    listenAudio: 'हिंदी में सुनें',
    welcomeBack: 'नमस्ते',

    selectRoleTitle: 'अपना पोर्टल चुनें',
    selectRoleSubtitle: 'ग्रामीण नागरिकों, आशा कार्यकर्ताओं, चिकित्सकों एवं स्वास्थ्य अधिकारियों हेतु सुरक्षित सेवा।',
    patientRoleTitle: 'मरीज़ पोर्टल',
    patientRoleDesc: 'टेली-परामर्श, स्वास्थ्य रिकॉर्ड, डिजिटल पर्ची और आपातकालीन सहायता।',
    fhwRoleTitle: 'स्वास्थ्य कार्यकर्ता (आशा / एएनएम)',
    fhwRoleDesc: 'घर-घर सर्वेक्षण, वाइटल्स जाँच एवं डॉक्टर अपॉइंटमेंट बुकिंग।',
    doctorRoleTitle: 'सत्यापित चिकित्सक',
    doctorRoleDesc: 'ऑनलाइन टेली-परामर्श, मरीज़ इतिहास एवं जन औषधि पर्ची लेखन।',
    adminRoleTitle: 'जिला स्वास्थ्य प्रशासन',
    adminRoleDesc: 'डॉक्टर सत्यापन, कार्यकर्ता निगरानी, स्वास्थ्य केंद्र एवं सुरक्षा ऑडिट।',
    loginTitle: 'पोर्टल में प्रवेश करें',
    loginSubtitle: 'अपने विवरण दर्ज करें या नीचे दिए गए परीक्षण खाते का चयन करें।',
    patientLoginPlaceholder: '14 अंकों की आभा आईडी या मोबाइल नंबर दर्ज करें',
    doctorLoginPlaceholder: 'एनएमसी पंजीकरण संख्या या ईमेल दर्ज करें',
    fhwLoginPlaceholder: 'स्वास्थ्य कार्यकर्ता आईडी या फोन नंबर दर्ज करें',
    adminLoginPlaceholder: 'जिला अधिकारी आईडी दर्ज करें',
    enterPassword: 'पासवर्ड दर्ज करें',
    enterMpin: '4 अंकों का एमपिन दर्ज करें',
    enterOtp: '6 अंकों का ओटीपी दर्ज करें',
    loginBtn: 'प्रवेश करें',
    logoutBtn: 'लॉग आउट',
    backToRoles: 'भूमिका चयन पर वापस जाएं',
    demoAccountsTitle: 'परीक्षण हेतु खाते',
    demoAccountsNote: 'तुरंत प्रवेश करने के लिए नीचे किसी भी प्रोफाइल पर क्लिक करें।',
    securityNoteRls: 'भूमिका आधारित सुरक्षा नियमों एवं एन्क्रिप्टेड रिकॉर्ड द्वारा सुरक्षित।',
    loggedInAs: 'सक्रिय उपयोगकर्ता',

    home: 'मुख्य पृष्ठ',
    talkToDoctor: 'डॉक्टर से परामर्श',
    myPrescriptions: 'मेरी दवाइयाँ',
    healthRecords: 'स्वास्थ्य रिकॉर्ड',
    nearbyFacilities: 'निकटतम अस्पताल',
    patientProfile: 'मेरी प्रोफाइल',

    emergencyTitle: 'आपातकालीन सहायता (108)',
    emergencyBtn: 'आपातकाल 108',
    emergencyDesc: '108 एम्बुलेंस, गाँव की आशा दीदी और प्राथमिक स्वास्थ्य केंद्र को तुरंत सूचना।',
    criticalEmergencyBanner: 'अत्यंत गंभीर आपातकालीन चेतावनी',
    dial108Now: 'तुरंत 108 पर कॉल करें',
    firstAidTitle: 'आपातकालीन प्राथमिक उपचार निर्देश',
    ambulanceDispatched: 'आपातकालीन एम्बुलेंस अनुरोध भेजा गया।',
    calling108Simulated: '108 नियंत्रण कक्ष से संपर्क स्थापित किया जा रहा है...',
    firstAidChestPain: 'रोगी को आराम से बैठाएं। कपड़े ढीले करें। शांत रहने में सहायता करें।',
    firstAidBreathing: 'खुली हवा में बैठाएं। यदि इनहेलर है तो तुरंत उपयोग करें। लेटने न दें।',
    firstAidSnakebite: 'दंश वाले अंग को स्थिर रखें। पट्टी न बांधें और न ही चीरा लगाएं। तुरंत अस्पताल ले जाएं।',

    gramPanchayat: 'ग्राम पंचायत',
    abhaIdLabel: 'आभा स्वास्थ्य पहचान संख्या',
    pmjayCardLabel: 'आयुष्मान भारत कार्ड',
    latestVitals: 'नवीनतम स्वास्थ्य जाँच',
    bloodPressure: 'रक्तचाप',
    oxygenLevel: 'ऑक्सीजन स्तर',
    pulseRate: 'नाड़ी गति',
    randomSugar: 'रक्त शर्करा',
    temperature: 'तापमान',
    activeTokenNotice: 'आज आपका डॉक्टर परामर्श टोकन सक्रिय है',
    activeQueue: 'सक्रिय परामर्श कतार',
    chiefComplaint: 'मुख्य समस्या',
    estimatedWait: 'अनुमानित प्रतीक्षा समय',
    enterConsultationRoom: 'टेली-परामर्श कक्ष में प्रवेश करें',
    followUpAlert: 'आगामी जाँच का समय',
    markDone: 'पूर्ण चिह्नित करें',
    healthcareServices: 'स्वास्थ्य सेवाएं',
    touchToOpen: 'सेवा खोलने के लिए स्पर्श करें',
    activeTeleOpd: 'सक्रिय टेली-ओपीडी',
    healthAssistant: 'स्वास्थ्य सहायक',
    healthAssistantSub: 'सरल भाषा में प्राथमिक स्वास्थ्य व रोकथाम सलाह',
    symptomCheck: 'लक्षण जाँच',
    symptomCheckSub: 'लक्षणों के आधार पर निर्णय व डॉक्टर सुझाव',
    myPrescriptionsSub: 'दवा का समय व जन औषधि किफायती विकल्प',
    healthRecordsSub: 'आभा कार्ड, लैब रिपोर्ट व पिछला इतिहास',
    nearbyFacilitiesSub: 'स्वास्थ्य केंद्र, अस्पताल व जन औषधि केंद्र',
    talkToDoctorSub: 'वीडियो परामर्श व टोकन कतार',

    teleOpdTitle: 'टेली-ओपीडी एवं डॉक्टर परामर्श',
    teleOpdSubtitle: 'सत्यापित सरकारी व विशेषज्ञ चिकित्सकों द्वारा निःशुल्क ग्रामीण परामर्श।',
    audioOptimized: 'कम इंटरनेट गति अनुकूलित मोड',
    hdVideoStream: 'उच्च गुणवत्ता वीडियो प्रवाह',
    allSpecialties: 'सभी विशेषज्ञ',
    generalPhysician: 'सामान्य चिकित्सक',
    maternalGynae: 'महिला एवं प्रसूति रोग विशेषज्ञ',
    childHealth: 'बाल रोग विशेषज्ञ',
    doctorAvailable: 'परामर्श हेतु उपलब्ध',
    doctorInConsult: 'परामर्श में व्यस्त',
    doctorOffline: 'वर्तमान में ऑफलाइन',
    experienceYears: 'वर्षों का अनुभव',
    rating: 'रेटिंग',
    verifiedDoctor: 'सत्यापित चिकित्सक',
    unverifiedDoctorBadge: 'सत्यापन लंबित',
    bookConsultationToken: 'परामर्श टोकन बुक करें',
    enterSymptomsPlaceholder: 'अपनी समस्या या बीमारी के लक्षण यहाँ लिखें...',
    cancel: 'रद्द करें',
    confirmBooking: 'टोकन बुकिंग की पुष्टि करें',
    teleConsultationRoom: 'टेली-परामर्श कक्ष',
    micOn: 'माइक चालू',
    micOff: 'माइक बंद',
    videoOn: 'कैमरा चालू',
    videoOff: 'कैमरा बंद',
    endConsultation: 'परामर्श समाप्त करें',

    prescriptionsTitle: 'मेरी दवाइयाँ एवं चिकित्सीय पर्ची',
    prescriptionsSubtitle: 'डिजिटल पर्ची, दवा का समय एवं सस्ती जन औषधि विकल्प।',
    totalPrescriptions: 'कुल पर्चियां',
    noPrescriptions: 'इस मरीज़ के लिए कोई पर्ची उपलब्ध नहीं है।',
    dosageSchedule: 'दैनिक खुराक समय सारणी',
    morning: 'सुबह',
    afternoon: 'दोपहर',
    night: 'रात',
    withFoodBefore: 'भोजन से पहले',
    withFoodAfter: 'भोजन के बाद',
    withFoodWith: 'भोजन के साथ',
    durationDays: 'अवधि (दिन)',
    genericJanAushadhiNotice: 'जन औषधि सस्ती जेनेरिक दवा',
    doctorRegNo: 'चिकित्सक पंजीकरण संख्या',
    provisionalDiagnosis: 'प्राथमिक रोग निदान',
    clinicalAdvice: 'चिकित्सीय सलाह एवं सावधानियां',
    followUpDate: 'पुनः परामर्श की तिथि',
    downloadPrescription: 'पर्ची डाउनलोड करें',

    recordsTitle: 'स्वास्थ्य रिकॉर्ड एवं आभा लॉकर',
    recordsSubtitle: 'आयुष्मान भारत स्वास्थ्य खाता (आभा), जाँच रिपोर्ट व इतिहास।',
    uploadPaperRecord: 'कागज़ी रिकॉर्ड अपलोड करें',
    abhaCardTitle: 'आधिकारिक आभा स्वास्थ्य कार्ड',
    abhaCardDesc: 'राष्ट्रीय डिजिटल स्वास्थ्य पहचान',
    downloadAbhaCard: 'आभा कार्ड डाउनलोड करें',
    diagnosticLabReports: 'रोग निदान एवं प्रयोगशाला रिपोर्ट',
    testStatus: 'स्थिति',
    sampleCollected: 'नमूना संकलित',
    testCompleted: 'जाँच पूर्ण',
    abnormalResult: 'विशेष ध्यान अपेक्षित',
    normalResult: 'सामान्य सीमा के भीतर',
    uploadModalTitle: 'स्वास्थ्य रिकॉर्ड अपलोड करें',
    documentName: 'दस्तावेज़ का नाम',
    documentCategory: 'दस्तावेज़ की श्रेणी',
    uploadBtn: 'आभा लॉकर में सुरक्षित करें',
    recordSavedSuccess: 'दस्तावेज़ आभा लॉकर में सफलतापूर्वक सहेजा गया।',

    facilitiesTitle: 'निकटतम स्वास्थ्य केंद्र एवं औषधालय',
    facilitiesSubtitle: 'गाँव के पास प्राथमिक स्वास्थ्य केंद्र, जन औषधि केंद्र व जाँच घर।',
    filterAll: 'सभी केंद्र',
    filterJanAushadhi: 'जन औषधि केंद्र',
    filterPhcChc: 'प्राथमिक व सामुदायिक स्वास्थ्य केंद्र',
    filterEmergency24x7: '24 घंटे आपातकालीन सेवा केंद्र',
    availableDoctors: 'उपस्थित चिकित्सक',
    ambulanceReady: 'एम्बुलेंस तैयार',
    distanceKm: 'दूरी',
    callFacility: 'केंद्र पर कॉल करें',
    callingSimulated: 'स्वास्थ्य केंद्र से संपर्क किया जा रहा है...',

    profileTitle: 'मरीज़ प्रोफाइल एवं स्वास्थ्य विवरण',
    profileSubtitle: 'सत्यापित आभा विवरण, सरकारी योजनाएं, पुरानी बीमारियां व वाइटल्स इतिहास।',
    bloodGroup: 'रक्त समूह',
    contactNumber: 'मोबाइल नंबर',
    emergencyContact: 'आपातकालीन संपर्क',
    chronicConditions: 'पुरानी बीमारियाँ',
    noChronicConditions: 'कोई पुरानी बीमारी दर्ज नहीं है।',
    drugAllergies: 'दवा व भोजन से एलर्जी',
    noAllergies: 'कोई ज्ञात एलर्जी दर्ज नहीं है।',
    vitalsMonitoringLog: 'वाइटल्स निगरानी इतिहास',
    noVitalsRecorded: 'अभी तक कोई वाइटल्स दर्ज नहीं हैं।',

    fhwTitle: 'स्वास्थ्य कार्यकर्ता पोर्टल (आशा / एएनएम)',
    fhwSubtitle: 'क्षेत्रीय स्वास्थ्य निगरानी, परिवार सर्वेक्षण एवं वाइटल्स दर्ज करना।',
    assignedVillages: 'नियुक्त गाँव',
    familiesCovered: 'आवंटित परिवार',
    highRiskCases: 'गंभीर मामले',
    vaccinesDue: 'टीकाकरण शेष',
    tabAssignedPatients: 'आवंटित मरीज़',
    tabRecordVitals: 'वाइटल्स दर्ज करें',
    tabBookDoctor: 'डॉक्टर टोकन बुक करें',
    tabRegisterPatient: 'नया मरीज़ पंजीकरण',
    tabReferrals: 'रेफरल एवं फॉलो-अप',
    searchPatientPlaceholder: 'मरीज़ का नाम, आभा आईडी या गाँव खोजें...',
    filterHighRiskOnly: 'केवल उच्च जोखिम व गर्भवती महिलाएं',
    registerNewPatientBtn: 'नया पंजीकरण करें',
    patientName: 'पूरा नाम',
    age: 'आयु',
    gender: 'लिंग',
    female: 'महिला',
    male: 'पुरुष',
    other: 'अन्य',
    phoneNumber: 'मोबाइल नंबर',
    village: 'गाँव / मजरा',
    consentCaptured: 'मरीज़ की मौखिक सहमति प्राप्त की गई',
    registerSubmitBtn: 'आभा आईडी बनाएं और पंजीकृत करें',
    recordVitalsBtn: 'वाइटल्स रिकॉर्ड सहेजें',
    vitalsRecordedSuccess: 'वाइटल्स सफलतापूर्वक दर्ज किए गए।',
    selectPatient: 'मरीज़ का चयन करें',
    bookOnBehalfBtn: 'डॉक्टर अपॉइंटमेंट बुक करें',
    tokenBookedSuccess: 'अपॉइंटमेंट टोकन सफलतापूर्वक बनाया गया।',
    referralDestination: 'रेफरल अस्पताल',
    referralReason: 'रेफरल का कारण',
    sendReferralBtn: 'आधिकारिक रेफरल भेजें',
    referralSentSuccess: 'रेफरल स्वास्थ्य केंद्र को भेज दिया गया है।',

    doctorTitle: 'चिकित्सक परामर्श कार्यस्थल',
    doctorSubtitle: 'राष्ट्रीय चिकित्सा आयोग (एनएमसी) सत्यापित क्लिनिकल कंसोल।',
    opdStatusOnline: 'टेली-ओपीडी हेतु ऑनलाइन',
    opdStatusConsult: 'परामर्श जारी है',
    opdStatusOffline: 'ऑफलाइन',
    unverifiedDoctorAlert: 'जिला स्वास्थ्य प्रशासन द्वारा सत्यापन लंबित',
    unverifiedDoctorDesc: 'आपके चिकित्सीय प्रमाण-पत्रों का सत्यापन जिला स्वास्थ्य प्रशासन द्वारा किया जा रहा है। सत्यापन पूर्ण होने तक आप परामर्श देने या दवा लिखने हेतु अधिकृत नहीं हैं।',
    opdPatientQueue: 'टेली-ओपीडी मरीज़ कतार',
    tokenNumber: 'टोकन संख्या',
    startConsultationBtn: 'परामर्श शुरू करें',
    clinicalWorkspace: 'चिकित्सीय परामर्श कार्यस्थल',
    provisionalDiagnosisLabel: 'प्राथमिक रोग निदान',
    icdCodeLabel: 'आईसीडी कोड',
    clinicalAdviceLabel: 'दवा व जीवनशैली संबंधी निर्देश',
    addMedicine: 'दवा जोड़ें',
    medicineName: 'दवा का नाम',
    genericSubstitute: 'जन औषधि सस्ती जेनेरिक दवा',
    dosageFrequency: 'खुराक की आवृत्ति',
    issuePrescriptionBtn: 'हस्ताक्षर करें व पर्ची जारी करें',
    prescriptionSuccess: 'पर्ची जारी कर मरीज़ के आभा लॉकर में भेज दी गई है।',
    orderDiagnosticTestLabel: 'लैब जाँच का आदेश दें',
    submitOrderBtn: 'जाँच आदेश भेजें',

    adminTitle: 'जिला स्वास्थ्य प्रशासन एवं नियामक कंसोल',
    adminSubtitle: 'जिले के स्वास्थ्य नेटवर्क की निगरानी, प्रमाणन एवं सुरक्षा ऑडिट।',
    systemHealthUptime: 'सिस्टम स्थिति: पूर्णतः सक्रिय',
    tabOverview: 'जिला स्वास्थ्य अवलोकन',
    tabDoctorVerification: 'चिकित्सक सत्यापन',
    tabFhwManagement: 'स्वास्थ्य कार्यकर्ता प्रबंधन',
    tabAuditLogs: 'सुरक्षा एवं अनुपालन लॉग',
    kpiRuralCitizens: 'पंजीकृत ग्रामीण नागरिक',
    kpiConsultations: 'पूर्ण हुए टेली-परामर्श',
    kpiJanAushadhiSaved: 'सस्ती जेनेरिक दवा उपयोग दर',
    kpiHighRiskMonitored: 'निगरानी में उच्च जोखिम मामले',
    doctorVerificationTitle: 'चिकित्सक लाइसेंस सत्यापन',
    nmcRegNo: 'एनएमसी पंजीकरण संख्या',
    medicalCouncil: 'राज्य चिकित्सा परिषद',
    verifyBtn: 'सत्यापित करें व अनुमति दें',
    suspendBtn: 'अनुमति निलंबित करें',
    doctorVerifiedStatus: 'अभ्यास हेतु अधिकृत',
    doctorPendingStatus: 'सत्यापन लंबित',
    fhwSyncStatus: 'क्षेत्रीय डेटा सिंक स्थिति',
    subCentre: 'उप-स्वास्थ्य केंद्र',
    lastSync: 'अंतिम सिंक समय',
    activeCaseload: 'सक्रिय क्षेत्र कार्यभार',
    auditLogTitle: 'नियामक एवं सुरक्षा ऑडिट लॉग',

    ambulance108: 'निःशुल्क 24 घंटे ग्रामीण एम्बुलेंस',
    healthHelpline104: 'स्वास्थ्य परामर्श व रक्तकोष',
    janAushadhiHelpline: 'किफायती जेनेरिक दवा उपलब्धता',
    pmjayHelpline: 'आयुष्मान भारत योजना सहायता',
    footerTitle: 'निश्चिंत सेवा ग्रामीण स्वास्थ्य सुरक्षा तंत्र',
    footerSubtitle: 'आयुष्मान भारत डिजिटल मिशन एवं राष्ट्रीय स्वास्थ्य प्राधिकरण मानकों के अनुरूप।',
    prototypeNotice: 'डेमो प्रोटोटाइप - टेली-ओपीडी व आभा हेल्थ लॉकर सिमुलेशन',

    // Role-based Language Selection
    chooseYourLanguage: 'अपनी भाषा चुनें',
    selectLanguageSubtitle: 'कृपया अपनी पसंदीदा भाषा का चयन करें। सभी सेवाएँ, टेली-परामर्श और दवाइयों की जानकारी इसी भाषा में उपलब्ध होगी।',
    teluguLangName: 'తెలుగు (Telugu)',
    teluguLangDesc: 'గ్రామీణ ఆరోగ్య సేవలు, టెలి-సంప్రదింపులు మరియు మందులు తెలుగులో',
    hindiLangName: 'हिन्दी (Hindi)',
    hindiLangDesc: 'ग्रामीण स्वास्थ्य सेवाएँ, डॉक्टर परामर्श और दवाइयों की पर्ची हिन्दी में',
    englishLangName: 'English (English)',
    englishLangDesc: 'ग्रामीण स्वास्थ्य सेवाएँ और मेडिकल रिकॉर्ड अंग्रेज़ी में',
    marathiLangName: 'मराठी (Marathi)',
    marathiLangDesc: 'ग्रामीण आरोग्य सेवा आणि आशा ताई सल्ला मराठीत',
    bengaliLangName: 'বাংলা (Bengali)',
    bengaliLangDesc: 'গ্রামীণ স্বাস্থ্যসেবা ও ডাক্তার পরামর্শ বাংলায়',
    continueWithLanguage: 'चयनित भाषा के साथ आगे बढ़ें',
    changeLanguage: 'भाषा बदलें',
    preferredLanguage: 'पसंदीदा भाषा',

    // Single-Language Tele-OPD & Patient UI
    joinConsultationRoom: 'परामर्श कक्ष में जुड़ें',
    describeComplaint: 'अपनी स्वास्थ्य समस्या या लक्षण बताएं',
    confirmToken: 'अपॉइंटमेंट टोकन की पुष्टि करें',
    token: 'टोकन',
    liveOpdQueueStatus: 'सक्रिय ओपीडी कतार स्थिति',
    priority: 'प्राथमिकता',
    appointmentWith: 'परामर्श हेतु डॉक्टर',
    nowServingToken: 'वर्तमान टोकन #11 (आपकी बारी निकट है)',
    approxWait: 'अनुमानित प्रतीक्षा समय: १२-१५ मिनट',
    filterBySpecialty: 'विशेषज्ञता अनुसार डॉक्टर खोजें:',
    availableNow: '● अभी उपलब्ध',
    inConsultation: '● परामर्श जारी है',
    registration: 'पंजीकरण',
    experience: 'अनुभव',
    years: 'वर्ष',
    languages: 'भाषाएं',
    currentQueue: 'वर्तमान कतार',
    patientsWaiting: 'मरीज़ प्रतीक्षारत',
    getTokenWithDoctor: 'डॉक्टर से परामर्श टोकन प्राप्त करें',
    doctorLabel: 'चिकित्सक',
    patientLabel: 'मरीज़',
    villageLabel: 'गाँव',
    ageLabel: 'आयु',
    complaintPlaceholder: 'उदा. सुबह चक्कर आना, रक्तचाप बढ़ना, २ दिनों से कमजोरी...',
    you: 'आप',
    connected: 'सम्पर्क स्थापित',
    audioSpeechGuidance: 'ध्वनि सहायता चालू करें',
    doctorVideoGreeting: 'नमस्ते! मैं आपकी आशा दीदी द्वारा भेजे गए आपके हालिया रक्तचाप के आंकड़े देख रहा हूँ। आज आप कैसा महसूस कर रहे हैं?',
    vitalsSyncedNotice: 'आशा दीदी द्वारा सिंक किए गए वाइटल्स: बीपी 140/90 mmHg • SpO2 98% • नब्ज 76 bpm',
    mute: 'माइक म्यूट करें',
    unmute: 'माइक चालू करें',

    // Facilities
    callCentre: 'कॉल करें',
    showingNearbyLocations: 'निकटतम स्वास्थ्य केंद्र एवं औषधालय',
    callingFacility: 'ग्रामीण टेलीकॉम गेटवे द्वारा कॉल मिलाई जा रही है...',
    kmAway: 'किमी दूर',
    open24x7: '२४ घंटे आपातकालीन खुला',
    ambulanceAvailable: 'एम्बुलेंस उपलब्ध',
    doctorsOnDuty: 'डॉक्टर उपस्थित',
    medicineSubsidy: '५०%-९०% सस्ती जेनेरिक दवाइयाँ',
    viewMapRoute: 'रास्ता देखें',

    // Prescriptions & Records
    prescriptionsAutoAppear: 'टेली-ओपीडी या प्राथमिक स्वास्थ्य केंद्र पर लिखी गई पर्चियां यहां स्वचालित रूप से आ जाएंगी।',
    teleOpdPrescriptionHeader: 'टेली-ओपीडी डिजिटल पर्ची',
    prescribedBy: 'परामर्शदाता चिकित्सक',
    printSlip: 'पर्ची डाउनलोड या प्रिंट करें',
    prescriptionDownloadSuccess: 'दवा पर्ची सफलतापूर्वक डाउनलोड हुई (PDF)',
    janAushadhiGeneric: 'जन औषधि सस्ती जेनेरिक दवा',
    tablet: 'गोली (टैबलेट)',
    nextReviewDate: 'पुनः परामर्श तिथि',
    availableAtJanAushadhi: 'रामपुर जन औषधि केंद्र में उपलब्ध (२.४ किमी दूर)',
    govIndiaNha: 'भारत सरकार • राष्ट्रीय स्वास्थ्य प्राधिकरण (NHA)',
    abhaNumber: 'आभा संख्या',
    abhaAddress: 'आभा पता',
    genderAge: 'लिंग / आयु',
    villageDistrict: 'गाँव व जिला',
    scanForAbhaEhr: 'आभा स्वास्थ्य रिकॉर्ड हेतु स्कैन करें',
    consentActiveAadhaar: 'मरीज़ सहमति सक्रिय • आधार द्वारा ई-केवाईसी सत्यापित',
    pmjayScheme: 'आयुष्मान भारत योजना',
    pmjayActive: 'सक्रिय / पात्र (₹५ लाख वार्षिक बीमा कवर)',
    pmjayNotLinked: 'लिंक नहीं है',
    diagnosticSamplesSubtitle: 'आशा कार्यकर्ता द्वारा संकलित नमूने अथवा रामपुर प्राथमिक केंद्र में हुई जांचें',
    recordsCount: 'दस्तावेज़',
    noDiagnosticOrders: 'कोई लंबित जांच आदेश नहीं है।',
    resultLabel: 'जांच परिणाम',
    flaggedForReview: 'डॉक्टर समीक्षा हेतु चिन्हित',
    uploadPhysicalRecord: 'कागज़ी स्वास्थ्य रिकॉर्ड अपलोड करें',
    uploadPhysicalRecordDesc: 'अपनी पुरानी कागज़ी पर्ची या लैब रिपोर्ट का फोटो खींचकर अपने आभा लॉकर में सुरक्षित रखें।',
    uploadSuccessMessage: 'दस्तावेज़ सफलतापूर्वक स्कैन होकर आपके स्वास्थ्य लॉकर में जुड़ गया!',

    // AI Assistant & Badges
    anemiaNutrition: 'एनीमिया और पोषण',
    cleanDrinkingWater: 'स्वच्छ पेयजल',
    checkWithAsha: 'आशा दीदी से जांच कराएं',
    minutes: 'मिनट',
    teleOpdBadge: 'टेली-ओपीडी',
    voiceBadge: 'आवाज',
    triageBadge: 'प्राथमिक जांच',
    janAushadhiBadge: 'जन औषधि',
    abhaEhrBadge: 'आभा / रिकॉर्ड',
    kmBadge: 'किमी',
    aiGuidanceBadge: 'एआई मार्गदर्शन',

    // Symptom Triage Full Localization
    triageDurationLabel: 'आपको यह लक्षण कितने समय से हैं?',
    triageSeverityLabel: 'लक्षणों की गंभीरता',
    redFlagsLabel: 'आपातकालीन चेतावनी संकेत',
    redFlagChestPain: 'सीने में अत्यधिक तेज दर्द या भारीपन',
    redFlagBlueLips: 'होंठ नीले पड़ना या उंगलियां ठंडी होना',
    redFlagUnconscious: 'बेहोशी, सुस्ती या बात न कर पाना',
    redFlagBloodInStool: 'उल्टी या शौच में खून आना',
    calculateTriageBtn: 'लक्षण आकलन की गणना करें',
    decisionSupportSystem: 'क्लिनिकल निर्णय सहायता प्रणाली',
    recommendedLevelOfCare: 'अनुशंसित स्वास्थ्य देखभाल स्तर',
    homeCareGuidance: 'तत्काल घरेलू देखभाल सलाह',
    proceedToDoctorBtn: 'प्राथमिकता के आधार पर डॉक्टर से परामर्श लें',
    closeTriageBtn: 'आकलन बंद करें',
    durationTodayMorning: 'आज सुबह से',
    duration2to3Days: '२ - ३ दिन से',
    duration1Week: 'लगभग १ सप्ताह से',
    duration2WeeksPlus: '२ सप्ताह से अधिक',
    severityMild: 'हल्का',
    severityModerate: 'मध्यम',
    severitySevere: 'गंभीर',

    // Referral Status & Tracking
    referralStatusTitle: 'रेफरल स्थिति',
    referralStatusSubtitle: 'अपनी रेफरल प्रक्रिया और स्वास्थ्य देखभाल की प्रगति देखें',
    activeReferralBadge: 'सक्रिय रेफरल',
    viewReferralProgress: 'रेफरल प्रगति देखें',
    referralIdLabel: 'रेफरल आईडी',
    referredByLabel: 'किसके द्वारा भेजा गया',
    originFacilityLabel: 'प्रारंभिक स्वास्थ्य केंद्र',
    destinationFacilityLabel: 'गंतव्य अस्पताल / केंद्र',
    specialtyRequired: 'आवश्यक विशेषज्ञता',
    referralReasonLabel: 'रेफरल का कारण',
    priorityLevel: 'प्राथमिकता स्तर',
    nextStepLabel: 'अगला कदम',
    referralTimelineTitle: 'देखभाल यात्रा और रेफरल समय-सीमा',
    acknowledgeReferralBtn: 'रेफरल निर्देश स्वीकार करें',
    acknowledgedNotice: 'मरीज द्वारा रेफरल निर्देशों की पुष्टि की गई',
    simulateStageAdvance: 'अगला चरण सिम्युलेट करें',
    simulateReset: 'शुरुआती चरण पर रीसेट करें',
    referralNotificationsTitle: 'रेफरल अपडेट और सूचनाएं',
    backToDashboard: 'डैशबोर्ड पर वापस जाएं',
    referralStageCreated: 'रेफरल तैयार हुआ',
    referralStageSent: 'रेफरल भेजा गया',
    referralStageAccepted: 'रेफरल स्वीकार हुआ',
    referralStageDestinationConfirmed: 'गंतव्य अस्पताल पुष्ट',
    referralStageCheckedIn: 'मरीज पहुंचे / चेक-इन हुआ',
    referralStageConsultation: 'डॉक्टर परामर्श',
    referralStageInvestigation: 'जांच / टेस्ट',
    referralStageTreatment: 'इलाज / देखभाल',
    referralStageCompleted: 'रेफरल पूर्ण',

    // Upgraded Nearby Care
    nearbyCareQuestion: 'आप किस प्रकार की स्वास्थ्य सुविधा ढूंढ रहे हैं?',
    nearbyCareSelectCategory: 'अपने गाँव के निकटतम सत्यापित केंद्रों को देखने के लिए श्रेणी चुनें:',
    catHospitals: 'अस्पताल',
    catHospitalsSub: 'पीएचसी, सीएचसी और जिला अस्पताल',
    catPharmacies: 'दवा दुकानें / फार्मेसी',
    catPharmaciesSub: 'जन औषधि केंद्र और जेनेरिक दवाएं',
    catDiagnostics: 'जांच केंद्र / पैथोलॉजी',
    catDiagnosticsSub: 'रक्त जांच, एक्स-रे और स्कैन',
    catOther: 'अन्य स्वास्थ्य सुविधाएं',
    catOtherSub: 'उप-स्वास्थ्य केंद्र एवं कल्याण क्लीनिक',
    catAll: 'सभी नजदीकी स्वास्थ्य केंद्र',
    catAllSub: 'सभी नजदीकी स्वास्थ्य सेवाएं देखें',
    changeCategory: 'श्रेणी बदलें',
    callToCheckMedicine: 'दवा की उपलब्धता जानने के लिए कॉल करें',
    bookAppointment: 'अपॉइंटमेंट बुक / अनुरोध करें',
    viewServices: 'उपलब्ध सेवाएं देखें',
    medicineAvailabilityCheck: 'दवा उपलब्धता जांचें',
    medicineInStock: 'जन औषधि केंद्र पर उपलब्ध',
    checkStockBtn: 'स्टॉक जांचें',
    approxTravel: 'यात्रा जानकारी',

    // AI-Powered Meet a Doctor
    howAreYouFeeling: 'आज आप कैसा महसूस कर रहे हैं?',
    tellUsWhatIsHappening: 'बताएं आपको क्या परेशानी हो रही है। आप बोल या लिख सकते हैं।',
    typeSymptomsPlaceholder: 'अपने लक्षण लिखें (उदा: सीने में भारीपन, सुबह चक्कर आना, तेज बुखार)...',
    speakSymptoms: 'बोलकर लक्षण बताएं',
    listening: 'सुन रहे हैं... कृपया बोलें',
    stopListening: 'रिकॉर्डिंग रोकें',
    speechNotSupported: 'इस ब्राउज़र में वॉयस सक्रिय नहीं है। लिखकर बताएं या नीचे से चुनें।',
    commonSymptomsSuggestions: 'त्वरित लक्षण सुझाव:',
    analyzingSymptoms: 'एआई क्लिनिकल विश्लेषण जारी है...',
    understoodSymptoms: 'मैंने ये लक्षण समझे:',
    isThisCorrect: 'क्या यह सही है?',
    yesContinue: 'हाँ, आगे बढ़ें',
    editSymptoms: 'संशोधित करें',
    followUpQuestionsTitle: 'कुछ संक्षिप्त अनुवर्ती प्रश्न:',
    possibleEmergencyTitle: 'संभावित आपातकालीन स्थिति',
    possibleEmergencyDesc: 'आपके लक्षणों में तत्काल आपातकालीन चिकित्सीय ध्यान की आवश्यकता हो सकती है। सामान्य ओपीडी प्रतीक्षा न करें।',
    call108Action: 'तुरंत 108 एम्बुलेंस पर कॉल करें',
    findEmergencyHospital: 'निकटतम आपातकालीन अस्पताल खोजें',
    recommendedSpecialist: 'अनुशंसित विशेषज्ञ डॉक्टर',
    specialistRecommendationReason: 'आपके द्वारा बताए गए लक्षणों के आधार पर, यह परामर्श उचित हो सकता है।',
    doctorsSuitableForYou: 'आपके लिए उपयुक्त डॉक्टर',
    bookTeleconsultation: 'टेली-परामर्श बुक करें',
    bookInPerson: 'अस्पताल जाकर मिलें',
    inPersonConsultation: 'अस्पताल में व्यक्तिगत परामर्श',
    teleconsultationOption: 'ऑनलाइन वीडियो परामर्श',
    teleconsultAvailable: 'ऑनलाइन वीडियो ओपीडी उपलब्ध',
    inPersonFacilityVisit: 'अस्पताल में जाकर दिखाएं',
    skipToAllDoctors: 'लक्षण जांच छोड़े और सभी डॉक्टर देखें',
    recheckSymptoms: 'अन्य लक्षणों की जांच करें',
  },

  te: {
    appName: 'నిశ్చింత్ సేవ',
    appTagline: 'గ్రామీణ ఆరోగ్య సంరక్షణ మరియు ఆశా సహాయ వేదిక',
    safetyNotice: 'ఈ సమాచారం ఆరోగ్య మార్గదర్శకత్వం కొరకు మాత్రమే, వైద్య నిర్ధారణ కాదు.',
    mockDataNotice: 'ప్రదర్శన నమూనా - ప్రత్యక్ష ప్రభుత్వ రికార్డులకు లింక్ చేయబడలేదు',
    lowBandwidthMode: 'తక్కువ ఇంటర్నెట్ మోడ్ (2G/3G) క్రియాశీలంగా ఉంది',
    normalBandwidth: 'సాధారణ నెట్‌వర్క్',
    listenAudio: 'తెలుగులో వినండి',
    welcomeBack: 'నమస్కారం',

    selectRoleTitle: 'మీ పోర్టల్‌ను ఎంచుకోండి',
    selectRoleSubtitle: 'గ్రామీణ పౌరులు, ఆశా కార్యకర్తలు, వైద్యులు మరియు ఆరోగ్య అధికారుల కోసం సురక్షిత వేదిక.',
    patientRoleTitle: 'రోగి పోర్టల్',
    patientRoleDesc: 'టెలీ-వైద్య సంప్రదింపులు, ఆరోగ్య రికార్డులు, డిజిటల్ ప్రిస్క్రిప్షన్ మరియు అత్యవసర సేవలు.',
    fhwRoleTitle: 'ఆరోగ్య కార్యకర్త (ఆశా / ఏఎన్ఎం)',
    fhwRoleDesc: 'ఇంటింటి సర్వే, కీలక పరీక్షలు మరియు డాక్టర్ అపాయింట్‌మెంట్ బుకింగ్.',
    doctorRoleTitle: 'ధృవీకరించబడిన వైద్యుడు',
    doctorRoleDesc: 'ఆన్‌లైన్ సంప్రదింపులు, వైద్య చరిత్ర పరిశీలన మరియు జన ఔషధి ప్రిస్క్రిప్షన్.',
    adminRoleTitle: 'జిల్లా ఆరోగ్య నిర్వాహకుడు',
    adminRoleDesc: 'వైద్యుల ధృవీకరణ, ఆశా సిబ్బంది పర్యవేక్షణ, ఆసుపత్రులు మరియు ఆడిట్ లాగ్‌లు.',
    loginTitle: 'పోర్టల్‌లోకి ప్రవేశించండి',
    loginSubtitle: 'మీ వివరాలను నమోదు చేయండి లేదా క్రింది ప్రదర్శన ఖాతాను ఎంచుకోండి.',
    patientLoginPlaceholder: '14 అంకెల ఆభా ఐడి లేదా మొబైల్ నంబర్ నమోదు చేయండి',
    doctorLoginPlaceholder: 'ఎన్ఎంసి రిజిస్ట్రేషన్ సంఖ్య లేదా ఈమెయిల్ నమోదు చేయండి',
    fhwLoginPlaceholder: 'హెల్త్ వర్కర్ ఐడి లేదా ఫోన్ నంబర్ నమోదు చేయండి',
    adminLoginPlaceholder: 'జిల్లా అధికారి ఐడి నమోదు చేయండి',
    enterPassword: 'పాస్‌వర్డ్ నమోదు చేయండి',
    enterMpin: '4 అంకెల ఎంపిన్ నమోదు చేయండి',
    enterOtp: '6 అంకెల ఓటిపి నమోదు చేయండి',
    loginBtn: 'లాగిన్ చేయండి',
    logoutBtn: 'లాగ్ అవుట్',
    backToRoles: 'పాత్రల ఎంపికకు తిరిగి వెళ్లండి',
    demoAccountsTitle: 'పరీక్ష కొరకు డెమో ఖాతాలు',
    demoAccountsNote: 'వెంటనే ప్రవేశించడానికి క్రింది ఖాతాలలో ఒకదాన్ని క్లిక్ చేయండి.',
    securityNoteRls: 'పాత్ర ఆధారిత భద్రతా నియమాలు మరియు ఎన్‌క్రిప్ట్ చేయబడిన రికార్డుల ద్వారా రక్షించబడింది.',
    loggedInAs: 'లాగిన్ అయిన వారు',

    home: 'హోమ్',
    talkToDoctor: 'వైద్యుడి సంప్రదింపు',
    myPrescriptions: 'నా మందుల చీటీ',
    healthRecords: 'ఆరోగ్య రికార్డులు',
    nearbyFacilities: 'సమీప ఆసుపత్రులు',
    patientProfile: 'నా ప్రొఫైల్',

    emergencyTitle: 'అత్యవసర సహాయం (108)',
    emergencyBtn: 'అత్యవసరం 108',
    emergencyDesc: '108 అంబులెన్స్, ఆశా వర్కర్ మరియు ప్రాథమిక ఆరోగ్య కేంద్రానికి తక్షణ హెచ్చరిక.',
    criticalEmergencyBanner: 'అత్యవసర వైద్య హెచ్చరిక',
    dial108Now: 'వెంటనే 108 కి కాల్ చేయండి',
    firstAidTitle: 'అత్యవసర ప్రథమ చికిత్స మార్గదర్శకాలు',
    ambulanceDispatched: 'అత్యవసర అంబులెన్స్ అభ్యర్థన పంపబడింది.',
    calling108Simulated: '108 నియంత్రణ కేంద్రానికి అనుసంధానించబడుతోంది...',
    firstAidChestPain: 'రోగిని సౌకర్యవంతంగా కూర్చోబెట్టండి. దుస్తులను వదులు చేయండి. ప్రశాంతంగా శ్వాస తీసుకోనివ్వండి.',
    firstAidBreathing: 'గాలి వెలుతురు ఉన్న చోట కూర్చోబెట్టండి. ఇన్హేలర్ ఉంటే వాడండి. పడుకోబెట్టవద్దు.',
    firstAidSnakebite: 'కాటు వేసిన భాగాన్ని కదల్చకండి. గట్టిగా కట్టవద్దు, గాయం చేయవద్దు. వెంటనే ఆసుపత్రికి తీసుకెళ్లండి.',

    gramPanchayat: 'గ్రామ పంచాయతీ',
    abhaIdLabel: 'ఆభా ఆరోగ్య ఐడి',
    pmjayCardLabel: 'ఆయుష్మాన్ భారత్ కార్డు',
    latestVitals: 'తాజా ఆరోగ్య పరీక్షలు',
    bloodPressure: 'రక్తపోటు',
    oxygenLevel: 'ఆక్సిజన్ శాతం',
    pulseRate: 'నాడి వేగం',
    randomSugar: 'రక్తంలో చక్కెర',
    temperature: 'శరీర ఉష్ణోగ్రత',
    activeTokenNotice: 'ఈ రోజు మీకు వైద్యుడి అపాయింట్‌మెంట్ టోకెన్ ఉంది',
    activeQueue: 'ప్రస్తుత క్యూ వివరాలు',
    chiefComplaint: 'ప్రధాన సమస్య',
    estimatedWait: 'అంచనా వేసిన వేచి ఉండే సమయం',
    enterConsultationRoom: 'కన్సల్టేషన్ గదిలోకి ప్రవేశించండి',
    followUpAlert: 'తదుపరి పరీక్ష సమయం',
    markDone: 'పూర్తయినట్లు గుర్తించండి',
    healthcareServices: 'ఆరోగ్య సేవలు',
    touchToOpen: 'ఓపెన్ చేయడానికి తాకండి',
    activeTeleOpd: 'క్రియాశీల టెలీ-ఓపిడి',
    healthAssistant: 'ఆరోగ్య సహాయకుడు',
    healthAssistantSub: 'సాధారణ భాషలో ప్రాథమిక జాగ్రత్తలు మరియు మార్గదర్శకత్వం',
    symptomCheck: 'లక్షణాల తనిఖీ',
    symptomCheckSub: 'లక్షణాల ఆధారంగా తక్షణ సలహా మరియు వర్గీకరణ',
    myPrescriptionsSub: 'మందుల వేళలు మరియు తక్కువ ధర జన ఔషధి వివరాలు',
    healthRecordsSub: 'ఆభా కార్డు, ల్యాబ్ రిపోర్టులు మరియు గత చరిత్ర',
    nearbyFacilitiesSub: 'ఆరోగ్య కేంద్రాలు, ఆసుపత్రులు మరియు మందుల షాపులు',
    talkToDoctorSub: 'లైవ్ వీడియో సంప్రదింపులు మరియు టోకెన్ క్యూ',

    teleOpdTitle: 'టెలీ-ఓపిడి మరియు వైద్య సంప్రదింపులు',
    teleOpdSubtitle: 'ప్రభుత్వ గుర్తింపు పొందిన వైద్యుల నుండి ఉచిత గ్రామీణ సంప్రదింపులు.',
    audioOptimized: 'తక్కువ నెట్‌వర్క్ ఆడియో మోడ్',
    hdVideoStream: 'హై డెఫినిషన్ వీడియో స్ట్రీమ్',
    allSpecialties: 'అన్ని విభాగాలు',
    generalPhysician: 'జనరల్ ఫిజీషియన్',
    maternalGynae: 'స్త్రీ మరియు ప్రసూతి వైద్య నిపుణులు',
    childHealth: 'పిల్లల వైద్య నిపుణులు',
    doctorAvailable: 'సంప్రదింపుకు అందుబాటులో ఉన్నారు',
    doctorInConsult: 'ఇతర రోగితో సంప్రదింపులో ఉన్నారు',
    doctorOffline: 'ప్రస్తుతం ఆఫ్‌లైన్‌లో ఉన్నారు',
    experienceYears: 'సంవత్సరాల అనుభవం',
    rating: 'రేటింగ్',
    verifiedDoctor: 'ధృవీకరించబడిన వైద్యుడు',
    unverifiedDoctorBadge: 'ధృవీకరణ పెండింగ్‌లో ఉంది',
    bookConsultationToken: 'టోకెన్ బుక్ చేయండి',
    enterSymptomsPlaceholder: 'మీ ఆరోగ్య సమస్య లేదా లక్షణాలను ఇక్కడ రాయండి...',
    cancel: 'రద్దు చేయండి',
    confirmBooking: 'బుకింగ్‌ను నిర్ధారించండి',
    teleConsultationRoom: 'టెలీ-కన్సల్టేషన్ గది',
    micOn: 'మైక్ ఆన్',
    micOff: 'మైక్ మ్యూట్',
    videoOn: 'కెమెరా ఆన్',
    videoOff: 'కెమెరా ఆఫ్',
    endConsultation: 'కాల్ ముగించండి',

    prescriptionsTitle: 'నా ప్రిస్క్రిప్షన్లు మరియు మందులు',
    prescriptionsSubtitle: 'మందుల సమయాలు మరియు చవకైన జన ఔషధి సమాచారం.',
    totalPrescriptions: 'మొత్తం ప్రిస్క్రిప్షన్లు',
    noPrescriptions: 'ఈ రోగికి ఎలాంటి ప్రిస్క్రిప్షన్లు లేవు.',
    dosageSchedule: 'రోజువారీ మందుల సమయ పట్టిక',
    morning: 'ఉదయం',
    afternoon: 'మధ్యాహ్నం',
    night: 'రాత్రి',
    withFoodBefore: 'ఆహారానికి ముందు',
    withFoodAfter: 'ఆహారం తర్వాత',
    withFoodWith: 'ఆహారంతో పాటు',
    durationDays: 'రోజుల సంఖ్య',
    genericJanAushadhiNotice: 'జన ఔషధి తక్కువ ధర ప్రత్యామ్నాయం',
    doctorRegNo: 'వైద్యుడి రిజిస్ట్రేషన్ సంఖ్య',
    provisionalDiagnosis: 'ప్రాథమిక రోగ నిర్ధారణ',
    clinicalAdvice: 'వైద్య సలహాలు మరియు జాగ్రత్తలు',
    followUpDate: 'మళ్లీ సంప్రదించవలసిన తేదీ',
    downloadPrescription: 'ప్రిస్క్రిప్షన్ డౌన్‌లోడ్ చేయండి',

    recordsTitle: 'ఆరోగ్య రికార్డులు మరియు ఆభా లాకర్',
    recordsSubtitle: 'ఆయుష్మాన్ భారత్ హెల్త్ అకౌంట్, పరీక్ష రిపోర్టులు మరియు చికిత్స చరిత్ర.',
    uploadPaperRecord: 'రిపోర్టును అప్‌లోడ్ చేయండి',
    abhaCardTitle: 'అధికారిక ఆభా ఆరోగ్య కార్డు',
    abhaCardDesc: 'జాతీయ డిజిటల్ ఆరోగ్య గుర్తింపు',
    downloadAbhaCard: 'ఆభా కార్డు డౌన్‌లోడ్ చేయండి',
    diagnosticLabReports: 'ల్యాబ్ పరీక్ష రిపోర్టులు',
    testStatus: 'స్థితి',
    sampleCollected: 'శాంపిల్ సేకరించబడింది',
    testCompleted: 'పూర్తయింది',
    abnormalResult: 'శ్రద్ధ వహించాల్సిన ఫలితం',
    normalResult: 'సాధారణ పరిమితిలో ఉంది',
    uploadModalTitle: 'మెడికల్ రికార్డును అప్‌లోడ్ చేయండి',
    documentName: 'పత్రం పేరు',
    documentCategory: 'పత్రం వర్గం',
    uploadBtn: 'ఆభా లాకర్‌లో భద్రపరచండి',
    recordSavedSuccess: 'పత్రం విజయవంతంగా ఆభా లాకర్‌లో భద్రపరచబడింది.',

    facilitiesTitle: 'సమీప ఆరోగ్య కేంద్రాలు మరియు ఆసుపత్రులు',
    facilitiesSubtitle: 'సమీప ప్రాథమిక ఆరోగ్య కేంద్రాలు, జన ఔషధి కేంద్రాలు మరియు ల్యాబ్‌లు.',
    filterAll: 'అన్ని కేంద్రాలు',
    filterJanAushadhi: 'జన ఔషధి దుకాణాలు',
    filterPhcChc: 'పిహెచ్‌సి మరియు సిహెచ్‌సి కేంద్రాలు',
    filterEmergency24x7: '24 గంటల అత్యవసర కేంద్రాలు',
    availableDoctors: 'డ్యూటీలో ఉన్న వైద్యులు',
    ambulanceReady: 'అందుబాటులో ఉన్న అంబులెన్స్',
    distanceKm: 'దూరం',
    callFacility: 'కేంద్రానికి కాల్ చేయండి',
    callingSimulated: 'ఆరోగ్య కేంద్రానికి కాల్ కలపబడుతోంది...',

    profileTitle: 'రోగి ప్రొఫైల్ మరియు ఆరోగ్య గుర్తింపు',
    profileSubtitle: 'ధృవీకరించబడిన ఆభా వివరాలు, ప్రభుత్వ పథకాలు మరియు ఆరోగ్య చరిత్ర.',
    bloodGroup: 'రక్త వర్గం',
    contactNumber: 'మొబైల్ సంఖ్య',
    emergencyContact: 'అత్యవసర సంప్రదింపు సంఖ్య',
    chronicConditions: 'దీర్ఘకాలిక వ్యాధులు',
    noChronicConditions: 'దీర్ఘకాలిక వ్యాధులు నమోదు కాలేదు.',
    drugAllergies: 'మందులు మరియు ఆహార అలెర్జీలు',
    noAllergies: 'ఎలాంటి అలెర్జీలు లేవు.',
    vitalsMonitoringLog: 'ఆరోగ్య పరీక్షల చరిత్ర',
    noVitalsRecorded: 'ఇప్పటివరకు ఎలాంటి పరీక్షలు నమోదు కాలేదు.',

    fhwTitle: 'ఆరోగ్య కార్యకర్త పోర్టల్ (ఆశా / ఏఎన్ఎం)',
    fhwSubtitle: 'గ్రామీణ ఆరోగ్య పర్యవేక్షణ, కుటుంబ సర్వే మరియు పరీక్షల నమోదు.',
    assignedVillages: 'కేటాయించిన గ్రామాలు',
    familiesCovered: 'కేటాయించిన కుటుంబాలు',
    highRiskCases: 'తీవ్ర అనారోగ్య కేసులు',
    vaccinesDue: 'టీకాలు వేయవలసిన వారు',
    tabAssignedPatients: 'కేటాయించిన రోగులు',
    tabRecordVitals: 'పరీక్షలు నమోదు చేయండి',
    tabBookDoctor: 'డాక్టర్ అపాయింట్‌మెంట్',
    tabRegisterPatient: 'కొత్త రోగి నమోదు',
    tabReferrals: 'రెఫరల్స్ మరియు ట్రాకింగ్',
    searchPatientPlaceholder: 'రోగి పేరు, ఆభా ఐడి లేదా గ్రామం ద్వారా వెతకండి...',
    filterHighRiskOnly: 'తీవ్ర అనారోగ్యం మరియు గర్భిణీ స్త్రీలు మాత్రమే',
    registerNewPatientBtn: 'కొత్త రోగిని నమోదు చేయండి',
    patientName: 'పూర్తి పేరు',
    age: 'వయస్సు',
    gender: 'లింగం',
    female: 'స్త్రీ',
    male: 'పురుషుడు',
    other: 'ఇతర',
    phoneNumber: 'మొబైల్ సంఖ్య',
    village: 'గ్రామం',
    consentCaptured: 'రోగి మౌఖిక సమ్మతి తీసుకోబడింది',
    registerSubmitBtn: 'ఆభా ఐడి సృష్టించి నమోదు చేయండి',
    recordVitalsBtn: 'పరీక్ష వివరాలను భద్రపరచండి',
    vitalsRecordedSuccess: 'పరీక్ష వివరాలు విజయవంతంగా నమోదు చేయబడ్డాయి.',
    selectPatient: 'రోగిని ఎంచుకోండి',
    bookOnBehalfBtn: 'అపాయింట్‌మెంట్ బుక్ చేయండి',
    tokenBookedSuccess: 'టోకెన్ విజయవంతంగా సృష్టించబడింది.',
    referralDestination: 'రెఫరల్ ఆసుపత్రి',
    referralReason: 'రెఫరల్ కారణం',
    sendReferralBtn: 'అధికారిక రెఫరల్ పంపండి',
    referralSentSuccess: 'రెఫరల్ ఆరోగ్య కేంద్రానికి పంపబడింది.',

    doctorTitle: 'వైద్యుల సంప్రదింపు వేదిక',
    doctorSubtitle: 'నేషనల్ మెడికల్ కమిషన్ గుర్తింపు పొందిన క్లినికల్ వర్క్‌స్పేస్.',
    opdStatusOnline: 'సంప్రదింపుకు సిద్ధంగా ఉన్నారు',
    opdStatusConsult: 'రోగిని పరీక్షిస్తున్నారు',
    opdStatusOffline: 'ఆఫ్‌లైన్',
    unverifiedDoctorAlert: 'జిల్లా ఆరోగ్య అధికారి నుండి ధృవీకరణ పెండింగ్‌లో ఉంది',
    unverifiedDoctorDesc: 'మీ వైద్య ఆధారాలు పరిశీలనలో ఉన్నాయి. ధృవీకరణ పూర్తయ్యే వరకు మీరు చికిత్స అందించడానికి లేదా మందులు రాయడానికి అనుమతి లేదు.',
    opdPatientQueue: 'రోగుల క్యూ వివరాలు',
    tokenNumber: 'టోకెన్ సంఖ్య',
    startConsultationBtn: 'సంప్రదింపు ప్రారంభించండి',
    clinicalWorkspace: 'వైద్య చికిత్స వర్క్‌స్పేస్',
    provisionalDiagnosisLabel: 'ప్రాథమిక వ్యాధి నిర్ధారణ',
    icdCodeLabel: 'ఐసిడి కోడ్',
    clinicalAdviceLabel: 'వైద్య సలహాలు మరియు జాగ్రత్తలు',
    addMedicine: 'మందును జోడించండి',
    medicineName: 'మందు పేరు',
    genericSubstitute: 'జన ఔషధి ప్రత్యామ్నాయం',
    dosageFrequency: 'వాడవలసిన సమయం',
    issuePrescriptionBtn: 'ప్రిస్క్రిప్షన్ జారీ చేయండి',
    prescriptionSuccess: 'ప్రిస్క్రిప్షన్ రోగి ఆభా లాకర్‌కు పంపబడింది.',
    orderDiagnosticTestLabel: 'ల్యాబ్ పరీక్షను సిఫార్సు చేయండి',
    submitOrderBtn: 'పరీక్ష ఆర్డర్ పంపండి',

    adminTitle: 'జిల్లా ఆరోగ్య పరిపాలన మరియు నియంత్రణ',
    adminSubtitle: 'జిల్లా స్థాయి ఆరోగ్య పర్యవేక్షణ మరియు అనుమతుల నియంత్రణ.',
    systemHealthUptime: 'వ్యవస్థ స్థితి: పూర్తి స్థాయిలో పని చేస్తోంది',
    tabOverview: 'జిల్లా ఆరోగ్య సమీక్ష',
    tabDoctorVerification: 'వైద్యుల ధృవీకరణ',
    tabFhwManagement: 'ఆరోగ్య సిబ్బంది నిర్వహణ',
    tabAuditLogs: 'భద్రతా మరియు ఆడిట్ లాగ్‌లు',
    kpiRuralCitizens: 'నమోదైన గ్రామీణ పౌరులు',
    kpiConsultations: 'పూర్తయిన టెలీ సంప్రదింపులు',
    kpiJanAushadhiSaved: 'జన ఔషధి మందుల వాడకం శాతం',
    kpiHighRiskMonitored: 'తీవ్ర అనారోగ్యం ఉన్న కేసులు',
    doctorVerificationTitle: 'వైద్యుల లైసెన్స్ ధృవీకరణ',
    nmcRegNo: 'ఎన్ఎంసి రిజిస్ట్రేషన్ సంఖ్య',
    medicalCouncil: 'స్టేట్ మెడికల్ కౌన్సిల్',
    verifyBtn: 'ధృవీకరించి ఆమోదించండి',
    suspendBtn: 'తాత్కాలికంగా నిలిపివేయండి',
    doctorVerifiedStatus: 'వైద్యం చేయడానికి అనుమతించబడింది',
    doctorPendingStatus: 'ధృవీకరణ పెండింగ్‌లో ఉంది',
    fhwSyncStatus: 'ఫీల్డ్ డేటా సింక్ స్థితి',
    subCentre: 'ఉప కేంద్రం',
    lastSync: 'చివరిగా సింక్ అయిన సమయం',
    activeCaseload: 'ప్రస్తుత బాధ్యతలు',
    auditLogTitle: 'భద్రతా మరియు నియంత్రణ లాగ్‌లు',

    ambulance108: 'ఉచిత 24 గంటల గ్రామీణ అంబులెన్స్',
    healthHelpline104: 'ఆరోగ్య సలహాలు మరియు బ్లడ్ బ్యాంక్',
    janAushadhiHelpline: 'చవకైన జన ఔషధి మందుల వివరాలు',
    pmjayHelpline: 'ఆయుష్మాన్ భారత్ పథకం సహాయం',
    footerTitle: 'నిశ్చింత్ సేవ గ్రామీణ ఆరోగ్య సంరక్షణ వేదిక',
    footerSubtitle: 'ఆయుష్మాన్ భారత్ డిజిటల్ మిషన్ ప్రమాణాలకు అనుగుణంగా రూపొందించబడింది.',
    prototypeNotice: 'డెమో ప్రోటోటైప్ - టెలీ-ఓపిడి మరియు ఆభా హెల్త్ లాకర్ సిమ్యులేషన్',

    // Role-based Language Selection
    chooseYourLanguage: 'మీ భాషను ఎంచుకోండి',
    selectLanguageSubtitle: 'దయచేసి మీ ప్రాధాన్య భాషను ఎంచుకోండి. అన్ని వైద్య సేవలు, టెలి-సంప్రదింపులు మరియు మందుల వివరాలు పూర్తిగా ఈ భాషలోనే అందించబడతాయి.',
    teluguLangName: 'తెలుగు (Telugu)',
    teluguLangDesc: 'గ్రామీణ ఆరోగ్య సేవలు, వైద్యుల సంప్రదింపులు మరియు మందుల వివరాలు తెలుగులో',
    hindiLangName: 'हिन्दी (Hindi)',
    hindiLangDesc: 'ग्रामीण स्वास्थ्य सेवाएँ, डॉक्टर परामर्श और दवाइयों की पर्ची हिन्दी में',
    englishLangName: 'English (English)',
    englishLangDesc: 'గ్రామీణ ఆరోగ్య సేవలు మరియు వైద్య రికార్డులు ఆంగ్లంలో',
    marathiLangName: 'मराठी (Marathi)',
    marathiLangDesc: 'ग्रामीण आरोग्य सेवा आणि आशा ताई सल्ला मराठीत',
    bengaliLangName: 'বাংলা (Bengali)',
    bengaliLangDesc: 'গ্রামীণ স্বাস্থ্যসেবা ও ডাক্তার পরামর্শ বাংলায়',
    continueWithLanguage: 'ఎంచుకున్న భాషతో కొనసాగండి',
    changeLanguage: 'భాషను మార్చండి',
    preferredLanguage: 'ప్రాధాన్య భాష',

    // Single-Language Tele-OPD & Patient UI
    joinConsultationRoom: 'సంప్రదింపు గదిలోకి ప్రవేశించండి',
    describeComplaint: 'మీ ఆరోగ్య సమస్య లేదా లక్షణాలను వివరించండి',
    confirmToken: 'అపాయింట్‌మెంట్ టోకెన్‌ను నిర్ధారించండి',
    token: 'టోకెన్',
    liveOpdQueueStatus: 'లైవ్ ఓపీడీ క్యూ స్థితి',
    priority: 'ప్రాధాన్యత',
    appointmentWith: 'సంప్రదింపు వైద్యులు',
    nowServingToken: 'ప్రస్తుత టోకెన్ #11 (త్వరలో మీ వంతు వస్తుంది)',
    approxWait: 'వేచి ఉండాల్సిన సమయం: 12-15 నిమిషాలు',
    filterBySpecialty: 'ప్రత్యేక విభాగాల వారీగా వైద్యులను ఎంచుకోండి:',
    availableNow: '● అందుబాటులో ఉన్నారు',
    inConsultation: '● సంప్రదింపులో ఉన్నారు',
    registration: 'రిజిస్ట్రేషన్',
    experience: 'అనుభవం',
    years: 'సంవత్సరాలు',
    languages: 'భాషలు',
    currentQueue: 'ప్రస్తుత క్యూ',
    patientsWaiting: 'రోగులు వేచి ఉన్నారు',
    getTokenWithDoctor: 'ఈ వైద్యుడితో టెలి-ఓపీడీ టోకెన్ పొందండి',
    doctorLabel: 'వైద్యులు',
    patientLabel: 'రోగి',
    villageLabel: 'గ్రామం',
    ageLabel: 'వయస్సు',
    complaintPlaceholder: 'ఉదా. ఉదయం తలతిరగడం, అధిక రక్తపోటు, 2 రోజులుగా నీరసం...',
    you: 'మీరు',
    connected: 'కనెక్ట్ చేయబడింది',
    audioSpeechGuidance: 'వాయిస్ సహాయం ప్రారంభించండి',
    doctorVideoGreeting: 'నమస్కారం! మీ గ్రామ ఆశా కార్యకర్త పంపిన మీ తాజా రక్తపోటు రీడింగులను పరిశీలిస్తున్నాను. ఈరోజు మీ ఆరోగ్యం ఎలా ఉంది?',
    vitalsSyncedNotice: 'ఆశా కార్యకర్త నుండి అందిన వివరాలు: బీపీ 140/90 mmHg • SpO2 98% • పల్స్ 76 bpm',
    mute: 'మైక్ ఆపివేయండి',
    unmute: 'మైక్ ఆన్ చేయండి',

    // Facilities
    callCentre: 'కాల్ చేయండి',
    showingNearbyLocations: 'సమీప ఆరోగ్య కేంద్రాలు మరియు మందుల దుకాణాలు',
    callingFacility: 'గ్రామీణ టెలికాం గేట్‌వే ద్వారా కాల్ కలుపుతున్నాము...',
    kmAway: 'కి.మీ దూరంలో',
    open24x7: '24 గంటలు అత్యవసర సేవలు అందుబాటులో ఉన్నాయి',
    ambulanceAvailable: 'అంబులెన్స్ అందుబాటులో ఉంది',
    doctorsOnDuty: 'వైద్యులు అందుబాటులో ఉన్నారు',
    medicineSubsidy: '50%-90% రాయితీతో జన ఔషధి మందులు',
    viewMapRoute: 'దారి చూడండి',

    // Prescriptions & Records
    prescriptionsAutoAppear: 'టెలి-ఓపీడీ లేదా ప్రాథమిక ఆరోగ్య కేంద్రంలో రాసిన మందుల చీటీలు ఇక్కడ కనిపిస్తాయి.',
    teleOpdPrescriptionHeader: 'టెలి-ఓపీడీ డిజిటల్ ప్రిస్క్రిప్షన్',
    prescribedBy: 'మందులు రాసిన వైద్యులు',
    printSlip: 'రశీదు డౌన్‌లోడ్ / ప్రింట్ చేయండి',
    prescriptionDownloadSuccess: 'మందుల చీటీ విజయవంతంగా డౌన్‌లోడ్ చేయబడింది (PDF)',
    janAushadhiGeneric: 'జన ఔషధి చవకైన ప్రత్యామ్నాయ మందు',
    tablet: 'మాత్ర (టాబ్లెట్)',
    nextReviewDate: 'తదుపరి సంప్రదింపు తేదీ',
    availableAtJanAushadhi: 'రాంపూర్ జన ఔషధి కేంద్రంలో అందుబాటులో ఉంది (2.4 కి.మీ దూరం)',
    govIndiaNha: 'భారత ప్రభుత్వం • జాతీయ ఆరోగ్య అథారిటీ (NHA)',
    abhaNumber: 'ఆభా సంఖ్య',
    abhaAddress: 'ఆభా చిరునామా',
    genderAge: 'లింగం / వయస్సు',
    villageDistrict: 'గ్రామం మరియు జిల్లా',
    scanForAbhaEhr: 'ఆభా హెల్త్ రికార్డుల కోసం స్కాన్ చేయండి',
    consentActiveAadhaar: 'రోగి సమ్మతి సక్రియంగా ఉంది • ఆధార్ ద్వారా ఈ-కేవైసీ ధృవీకరించబడింది',
    pmjayScheme: 'ఆయుష్మాన్ భారత్ పథకం',
    pmjayActive: 'సక్రియం / అర్హులు (సంవత్సరానికి ₹5 లక్షల బీమా)',
    pmjayNotLinked: 'జతచేయబడలేదు',
    diagnosticSamplesSubtitle: 'ఆశా కార్యకర్త సేకరించిన నమూనాలు లేదా రాంపూర్ ఆరోగ్య కేంద్రం పరీక్ష ఫలితాలు',
    recordsCount: 'పత్రాలు',
    noDiagnosticOrders: 'ఎలాంటి పెండింగ్ పరీక్షలు లేవు.',
    resultLabel: 'పరీక్ష ఫలితం',
    flaggedForReview: 'వైద్యుల సమీక్ష అవసరం',
    uploadPhysicalRecord: 'కాగితపు ఆరోగ్య రికార్డులను అప్‌లోడ్ చేయండి',
    uploadPhysicalRecordDesc: 'మీ పాత ప్రిస్క్రిప్షన్ లేదా ల్యాబ్ రిపోర్టు ఫోటో తీసి మీ ఆభా లాకర్‌లో భద్రపరచుకోండి.',
    uploadSuccessMessage: 'పత్రం విజయవంతంగా స్కాన్ చేయబడి మీ హెల్త్ లాకర్‌కు జోడించబడింది!',

    // AI Assistant & Badges
    anemiaNutrition: 'రక్తహీనత మరియు పోషకాహారం',
    cleanDrinkingWater: 'పరిశుభ్రమైన తాగునీరు',
    checkWithAsha: 'ఆశా కార్యకర్తను సంప్రదించండి',
    minutes: 'నిమిషాలు',
    teleOpdBadge: 'టెలి-ఓపీడీ',
    voiceBadge: 'వాయిస్',
    triageBadge: 'లక్షణాల తనిఖీ',
    janAushadhiBadge: 'జన ఔషధి',
    abhaEhrBadge: 'ఆభా రికార్డులు',
    kmBadge: 'కి.మీ',
    aiGuidanceBadge: 'ఏఐ మార్గదర్శకత్వం',

    // Symptom Triage Full Localization
    triageDurationLabel: 'ఈ లక్షణాలు మీకు ఎన్ని రోజులుగా ఉన్నాయి?',
    triageSeverityLabel: 'లక్షణాల తీవ్రత',
    redFlagsLabel: 'అత్యవసర ప్రమాద హెచ్చరిక సంకేతాలు',
    redFlagChestPain: 'తీవ్రమైన ఛాతీ నొప్పి లేదా భరించలేని బరువు',
    redFlagBlueLips: 'పెదవులు నీలం రంగులోకి మారడం లేదా వేళ్లు చల్లబడటం',
    redFlagUnconscious: 'మగత, స్పృహ కోల్పోవడం లేదా మాట్లాడలేకపోవడం',
    redFlagBloodInStool: 'వాంతి లేదా మలంలో రక్తం పడటం',
    calculateTriageBtn: 'లక్షణాల తీవ్రతను అంచనా వేయండి',
    decisionSupportSystem: 'క్లినికల్ నిర్ణయ సహాయక వ్యవస్థ',
    recommendedLevelOfCare: 'సిఫార్సు చేయబడిన వైద్య సంరక్షణ స్థాయి',
    homeCareGuidance: 'తక్షణ ఇంటి వద్ద సంరక్షణ సూచనలు',
    proceedToDoctorBtn: 'ప్రాధాన్యతపై టెలి-ఓపీడీ సంప్రదింపు బుక్ చేయండి',
    closeTriageBtn: 'ముగించండి',
    durationTodayMorning: 'ఈరోజు ఉదయం నుండి',
    duration2to3Days: '2 - 3 రోజులుగా',
    duration1Week: 'సుమారు 1 వారం నుండి',
    duration2WeeksPlus: '2 వారాల కంటే ఎక్కువ కాలం',
    severityMild: 'స్వల్పం',
    severityModerate: 'మధ్యస్థం',
    severitySevere: 'తీవ్రం',

    // Referral Status & Tracking
    referralStatusTitle: 'రెఫరల్ స్థితి',
    referralStatusSubtitle: 'మీ రెఫరల్ ప్రయాణం మరియు వైద్య సంరక్షణ పురోగతిని ట్రాక్ చేయండి',
    activeReferralBadge: 'యాక్టివ్ రెఫరల్',
    viewReferralProgress: 'రెఫరల్ పురోగతిని చూడండి',
    referralIdLabel: 'రెఫరల్ ఐడీ',
    referredByLabel: 'సిఫార్సు చేసిన వారు',
    originFacilityLabel: 'ప్రారంభ ఆరోగ్య కేంద్రం',
    destinationFacilityLabel: 'గమ్యస్థాన ఆసుపత్రి',
    specialtyRequired: 'అవసరమైన స్పెషాలిటీ',
    referralReasonLabel: 'రెఫరల్ కారణం',
    priorityLevel: 'ప్రాధాన్యత స్థాయి',
    nextStepLabel: 'తదుపరి చర్య',
    referralTimelineTitle: 'వైద్య సంరక్షణ ప్రయాణం & రెఫరల్ కాలక్రమం',
    acknowledgeReferralBtn: 'రెఫరల్ సూచనలను అంగీకరించండి',
    acknowledgedNotice: 'రోగి ద్వారా రెఫరల్ సూచనలు ధృవీకరించబడ్డాయి',
    simulateStageAdvance: 'తదుపరి దశను అనుకరించండి (సిమ్యులేట్)',
    simulateReset: 'ప్రారంభ దశకు రీసెట్ చేయండి',
    referralNotificationsTitle: 'రెఫరల్ అప్‌డేట్‌లు & నోటిఫికేషన్‌లు',
    backToDashboard: 'డ్యాష్‌బోర్డ్‌కు తిరిగి వెళ్లండి',
    referralStageCreated: 'రెఫరల్ సృష్టించబడింది',
    referralStageSent: 'రెఫరల్ పంపబడింది',
    referralStageAccepted: 'రెఫరల్ ఆమోదించబడింది',
    referralStageDestinationConfirmed: 'గమ్యస్థాన ఆసుపత్రి ఖరారైంది',
    referralStageCheckedIn: 'రోగి చేరుకున్నారు / చెక్-ఇన్',
    referralStageConsultation: 'వైద్యుల సంప్రదింపు',
    referralStageInvestigation: 'పరీక్షలు / నిర్ధారణ',
    referralStageTreatment: 'చికిత్స / సంరక్షణ',
    referralStageCompleted: 'రెఫరల్ పూర్తయింది',

    // Upgraded Nearby Care
    nearbyCareQuestion: 'మీరు ఎలాంటి ఆరోగ్య సేవ కోసం చూస్తున్నారు?',
    nearbyCareSelectCategory: 'మీ గ్రామానికి సమీపంలోని ధృవీకరించబడిన కేంద్రాల కోసం విభాగాన్ని ఎంచుకోండి:',
    catHospitals: 'ఆసుపత్రులు',
    catHospitalsSub: 'పీహెచ్‌సీ, సీహెచ్‌సీ & జిల్లా ఆసుపత్రులు',
    catPharmacies: 'మందుల దుకాణాలు / ఫార్మసీలు',
    catPharmaciesSub: 'జన ఔషధి కేంద్రాలు & జెనరిక్ మందులు',
    catDiagnostics: 'డయాగ్నస్టిక్ కేంద్రాలు',
    catDiagnosticsSub: 'రక్త పరీక్షలు, ఎక్స్-రే & స్కాన్‌లు',
    catOther: 'ఇతర ఆరోగ్య కేంద్రాలు',
    catOtherSub: 'సబ్-సెంటర్లు & వెల్‌నెస్ క్లినిక్‌లు',
    catAll: 'అన్ని సమీప కేంద్రాలు',
    catAllSub: 'సమీపంలోని అన్ని ఆరోగ్య సౌకర్యాలను చూడండి',
    changeCategory: 'విభాగం మార్చండి',
    callToCheckMedicine: 'మందు లభ్యత తెలుసుకోవడానికి కాల్ చేయండి',
    bookAppointment: 'అపాయింట్‌మెంట్ బుక్ / అభ్యర్థించండి',
    viewServices: 'అందుబాటులో ఉన్న సేవలు',
    medicineAvailabilityCheck: 'మందు లభ్యత తనిఖీ',
    medicineInStock: 'జన ఔషధిలో అందుబాటులో ఉంది',
    checkStockBtn: 'స్టాక్ తనిఖీ చేయండి',
    approxTravel: 'ప్రయాణ సమాచారం',

    // AI-Powered Meet a Doctor
    howAreYouFeeling: 'ఈరోజు మీకు ఎలా అనిపిస్తోంది?',
    tellUsWhatIsHappening: 'మీకు ఏమి జరుగుతుందో చెప్పండి. మీరు టైప్ చేయవచ్చు లేదా మాట్లాడవచ్చు.',
    typeSymptomsPlaceholder: 'మీ లక్షణాలను వివరించండి (ఉదా: ఛాతీలో నొప్పి, ఉదయం తలతిరగడం, తీవ్రమైన జ్వరం)...',
    speakSymptoms: 'లక్షణాలను మాట్లాడండి',
    listening: 'వింటున్నాము... దయచేసి మాట్లాడండి',
    stopListening: 'రికార్డింగ్ ఆపండి',
    speechNotSupported: 'ఈ బ్రౌజర్‌లో వాయిస్ రికగ్నిషన్ సపోర్ట్ లేదు. టైప్ చేయండి లేదా క్రింద ఎంచుకోండి.',
    commonSymptomsSuggestions: 'శీఘ్ర లక్షణాల సూచనలు:',
    analyzingSymptoms: 'ఏఐ క్లినికల్ సరిపోలిక విశ్లేషణ జరుగుతోంది...',
    understoodSymptoms: 'నేను ఈ లక్షణాలను గ్రహించాను:',
    isThisCorrect: 'ఇది సరైనదేనా?',
    yesContinue: 'అవును, ముందుకు వెళ్లండి',
    editSymptoms: 'సవరించండి',
    followUpQuestionsTitle: 'కొన్ని క్లుప్తమైన తదుపరి ప్రశ్నలు:',
    possibleEmergencyTitle: 'అత్యవసర పరిస్థితి కావచ్చు',
    possibleEmergencyDesc: 'మీ లక్షణాలకు తక్షణ అత్యవసర వైద్య సహాయం అవసరం కావచ్చు. సాధారణ సంప్రదింపు కోసం వేచి ఉండకండి.',
    call108Action: 'వెంటనే 108కి కాల్ చేయండి',
    findEmergencyHospital: 'సమీప అత్యవసర ఆసుపత్రిని కనుగొనండి',
    recommendedSpecialist: 'సిఫార్సు చేయబడిన స్పెషలిస్ట్ వైద్యులు',
    specialistRecommendationReason: 'మీరు వివరించిన లక్షణాల ఆధారంగా, ఈ సంప్రదింపు సరిపోతుంది.',
    doctorsSuitableForYou: 'మీ కోసం అనువైన వైద్యులు',
    bookTeleconsultation: 'టెలి-సంప్రదింపు బుక్ చేయండి',
    bookInPerson: 'ప్రత్యక్ష సందర్శన బుక్ చేయండి',
    inPersonConsultation: 'ఆసుపత్రిలో ప్రత్యక్ష సంప్రదింపు',
    teleconsultationOption: 'ఆన్‌లైన్ వీడియో ఓపీడీ',
    teleconsultAvailable: 'ఆన్‌లైన్ వీడియో ఓపీడీ అందుబాటులో ఉంది',
    inPersonFacilityVisit: 'ఆసుపత్రిని ప్రత్యక్షంగా సందర్శించండి',
    skipToAllDoctors: 'లక్షణాల తనిఖీని దాటవేసి అందరు వైద్యులను చూడండి',
    recheckSymptoms: 'మరోసారి లక్షణాలను తనిఖీ చేయండి',
  },

  mr: {
    appName: 'निश्चिंत सेवा',
    appTagline: 'ग्रामीण आरोग्य सेवा आणि आशा ताई सहाय्य नेटवर्क',
    safetyNotice: 'ही माहिती केवळ प्राथमिक मार्गदर्शनासाठी आहे, वैद्यकीय निदानासाठी नाही.',
    mockDataNotice: 'प्रात्यक्षिक प्रोटोटाइप - प्रत्यक्ष शासकीय यंत्रणेशी जोडलेले नाही',
    lowBandwidthMode: 'कमी इंटरनेट वेग मोड (2G/3G) सुरू आहे',
    normalBandwidth: 'सामान्य नेटवर्क',
    listenAudio: 'मराठीत ऐका',
    welcomeBack: 'नमस्कार',

    selectRoleTitle: 'आपले पोर्टल निवडा',
    selectRoleSubtitle: 'ग्रामीण नागरिक, आशा ताई, डॉक्टर आणि आरोग्य अधिकाऱ्यांसाठी सुरक्षित व्यासपीठ.',
    patientRoleTitle: 'रुग्ण पोर्टल',
    patientRoleDesc: 'टेलि-तपासणी, आरोग्य नोंदी, डिजिटल औषध चिठ्ठी आणि तातडीची मदत.',
    fhwRoleTitle: 'आरोग्य कार्यकर्त्या (आशा / एएनएम)',
    fhwRoleDesc: 'घरोघरी सर्वेक्षण, तपासणी आणि डॉक्टरांची वेळ नोंदणी.',
    doctorRoleTitle: 'प्रमाणित वैद्यकीय अधिकारी',
    doctorRoleDesc: 'ऑनलाइन तपासणी, रुग्णाचा इतिहास आणि जन औषधी चिठ्ठी देणे.',
    adminRoleTitle: 'जिल्हा आरोग्य प्रशासन',
    adminRoleDesc: 'डॉक्टर पडताळणी, कर्मचारी नियंत्रण, आरोग्य केंद्र आणि सुरक्षा नोंदी.',
    loginTitle: 'पोर्टलमध्ये प्रवेश करा',
    loginSubtitle: 'आपले तपशील प्रविष्ट करा किंवा खालीलपैकी एक चाचणी खाते निवडा.',
    patientLoginPlaceholder: '१४ अंकी आभा क्रमांक किंवा मोबाईल नंबर टाका',
    doctorLoginPlaceholder: 'एनएमसी नोंदणी क्रमांक किंवा ईमेल टाका',
    fhwLoginPlaceholder: 'आरोग्य कार्यकर्ता ओळख क्रमांक किंवा फोन टाका',
    adminLoginPlaceholder: 'जिल्हा अधिकारी ओळख क्रमांक टाका',
    enterPassword: 'पासवर्ड टाका',
    enterMpin: '४ अंकी एमपिन टाका',
    enterOtp: '६ अंकी ओटीपी टाका',
    loginBtn: 'लॉगिन करा',
    logoutBtn: 'लॉग आऊट',
    backToRoles: 'भूमिका निवडीकडे परत जा',
    demoAccountsTitle: 'चाचणीसाठी खाती',
    demoAccountsNote: 'लगेच प्रवेश करण्यासाठी खालीलपैकी कोणत्याही खात्यावर क्लिक करा.',
    securityNoteRls: 'भूमिका-आधारित सुरक्षा नियम आणि एन्क्रिप्टेड नोंदींद्वारे सुरक्षित.',
    loggedInAs: 'प्रवेश केलेले वापरकर्ता',

    home: 'मुख्य पान',
    talkToDoctor: 'डॉक्टरांचा सल्ला',
    myPrescriptions: 'माझी औषधे',
    healthRecords: 'आरोग्य नोंदी',
    nearbyFacilities: 'जवळचे दवाखाने',
    patientProfile: 'माझी माहिती',

    emergencyTitle: 'तातडीची मदत (108)',
    emergencyBtn: 'तातडीची मदत 108',
    emergencyDesc: '108 रुग्णवाहिका, आशा ताई आणि प्राथमिक आरोग्य केंद्राला त्वरित संदेश.',
    criticalEmergencyBanner: 'अत्यंत गंभीर वैद्यकीय इशारा',
    dial108Now: 'त्वरित 108 वर संपर्क करा',
    firstAidTitle: 'तातडीचे प्रथमोपचार मार्गदर्शन',
    ambulanceDispatched: 'रुग्णवाहिका पाठवण्याची विनंती पोहोचली आहे.',
    calling108Simulated: '108 नियंत्रण कक्षाशी संपर्क साधला जात आहे...',
    firstAidChestPain: 'रुग्णाला शांत बसवा. घट्ट कपडे सैल करा. शांतपणे श्वास घेण्यास मदत करा.',
    firstAidBreathing: 'हवेशीर जागी बसवा. इनहेलर असल्यास त्वरित वापरा. झोपवू नका.',
    firstAidSnakebite: 'दंश झालेला भाग हलवू नका. घट्ट बांधू नका किंवा जखम करू नका. ताबडतोब दवाखान्यात न्या.',

    gramPanchayat: 'ग्रामपंचायत',
    abhaIdLabel: 'आभा आरोग्य क्रमांक',
    pmjayCardLabel: 'आयुष्मान भारत कार्ड',
    latestVitals: 'नुकतीच झालेली तपासणी',
    bloodPressure: 'रक्तदाब',
    oxygenLevel: 'ऑक्सिजन पातळी',
    pulseRate: 'नाडीचे ठोके',
    randomSugar: 'रक्तातील साखर',
    temperature: 'शरीराचे तापमान',
    activeTokenNotice: 'आज तुमचे तपासणी टोकन सक्रिय आहे',
    activeQueue: 'सध्याची तपासणी रांग',
    chiefComplaint: 'मुख्य त्रास',
    estimatedWait: 'अपेक्षित प्रतीक्षा वेळ',
    enterConsultationRoom: 'तपासणी कक्षात प्रवेश करा',
    followUpAlert: 'पुढील तपासणीची आठवण',
    markDone: 'पूर्ण झाले',
    healthcareServices: 'आरोग्य सेवा',
    touchToOpen: 'उघडण्यासाठी स्पर्श करा',
    activeTeleOpd: 'सक्रिय टेलि-ओपीडी',
    healthAssistant: 'आरोग्य सहाय्यक',
    healthAssistantSub: 'सोप्या भाषेत आरोग्य मार्गदर्शन व काळजी',
    symptomCheck: 'लक्षण तपासणी',
    symptomCheckSub: 'लक्षणानुसार योग्य निर्णय व डॉक्टरांचा सल्ला',
    myPrescriptionsSub: 'औषधांची वेळ आणि जन औषधी पर्याय',
    healthRecordsSub: 'आभा कार्ड, तपासणी अहवाल आणि भूतकाळातील माहिती',
    nearbyFacilitiesSub: 'आरोग्य केंद्र, सरकारी दवाखाने आणि औषध दुकाने',
    talkToDoctorSub: 'थेट व्हिडिओ तपासणी आणि टोकन रांग',

    teleOpdTitle: 'टेलि-ओपीडी आणि डॉक्टरांचा सल्ला',
    teleOpdSubtitle: 'शासकीय व तज्ज्ञ डॉक्टरांकडून विनामूल्य ग्रामीण सल्ला.',
    audioOptimized: 'कमी नेटवर्कसाठी ऑडिओ मोड',
    hdVideoStream: 'उच्च दर्जाचा व्हिडिओ प्रवाह',
    allSpecialties: 'सर्व तज्ज्ञ',
    generalPhysician: 'सामान्य वैद्यकीय अधिकारी',
    maternalGynae: 'स्त्रीरोग व प्रसूती तज्ज्ञ',
    childHealth: 'बालरोग तज्ज्ञ',
    doctorAvailable: 'सल्ल्यासाठी उपलब्ध',
    doctorInConsult: 'तपासणी सुरू आहे',
    doctorOffline: 'सध्या ऑफलाइन',
    experienceYears: 'वर्षांचा अनुभव',
    rating: 'रेटिंग',
    verifiedDoctor: 'प्रमाणित डॉक्टर',
    unverifiedDoctorBadge: 'पडताळणी प्रलंबित',
    bookConsultationToken: 'तपासणी टोकन घ्या',
    enterSymptomsPlaceholder: 'तुमचा त्रास किंवा लक्षणे येथे लिहा...',
    cancel: 'रद्द करा',
    confirmBooking: 'टोकन निश्चित करा',
    teleConsultationRoom: 'टेलि-तपासणी कक्ष',
    micOn: 'माइक चालू',
    micOff: 'माइक बंद',
    videoOn: 'कॅमेरा चालू',
    videoOff: 'कॅमेरा बंद',
    endConsultation: 'कॉल समाप्त करा',

    prescriptionsTitle: 'माझी औषधे आणि वैद्यकीय चिठ्ठी',
    prescriptionsSubtitle: 'औषध घेण्याची वेळ आणि स्वस्त जन औषधी पर्याय.',
    totalPrescriptions: 'एकूण औषध चिठ्ठ्या',
    noPrescriptions: 'या रुग्णासाठी कोणतीही औषध चिठ्ठी उपलब्ध नाही.',
    dosageSchedule: 'दररोज औषध घेण्याची वेळ',
    morning: 'सकाळी',
    afternoon: 'दुपारी',
    night: 'रात्री',
    withFoodBefore: 'जेवणापूर्वी',
    withFoodAfter: 'जेवणानंतर',
    withFoodWith: 'जेवणासोबत',
    durationDays: 'कालावधी (दिवस)',
    genericJanAushadhiNotice: 'जन औषधी स्वस्त पर्याय',
    doctorRegNo: 'डॉक्टर नोंदणी क्रमांक',
    provisionalDiagnosis: 'प्राथमिक रोग निदान',
    clinicalAdvice: 'वैद्यकीय सल्ला आणि काळजी',
    followUpDate: 'पुढील भेटीची तारीख',
    downloadPrescription: 'चिठ्ठी डाउनलोड करा',

    recordsTitle: 'आरोग्य नोंदी आणि आभा लॉकर',
    recordsSubtitle: 'आयुष्मान भारत हेल्थ अकाउंट, प्रयोगशाळा अहवाल आणि जुनी माहिती.',
    uploadPaperRecord: 'कागदपत्रे अपलोड करा',
    abhaCardTitle: 'अधिकृत आभा आरोग्य कार्ड',
    abhaCardDesc: 'राष्ट्रीय डिजिटल आरोग्य ओळख',
    downloadAbhaCard: 'आभा कार्ड डाउनलोड करा',
    diagnosticLabReports: 'प्रयोगशाळा तपासणी अहवाल',
    testStatus: 'स्थिती',
    sampleCollected: 'नमुना घेतला आहे',
    testCompleted: 'तपासणी पूर्ण',
    abnormalResult: 'विशेष काळजी आवश्यक',
    normalResult: 'सामान्य मर्यादेत आहे',
    uploadModalTitle: 'वैद्यकीय अहवाल अपलोड करा',
    documentName: 'कागदपत्राचे नाव',
    documentCategory: 'कागदपत्राचा प्रकार',
    uploadBtn: 'आभा लॉकरमध्ये जतन करा',
    recordSavedSuccess: 'कागदपत्र आभा लॉकरमध्ये यशस्वीरीत्या जतन केले गेले.',

    facilitiesTitle: 'जवळची आरोग्य केंद्रे व औषधालये',
    facilitiesSubtitle: 'प्राथमिक आरोग्य केंद्र, स्वस्त जन औषधी दुकाने आणि तपासणी केंद्रे.',
    filterAll: 'सर्व केंद्रे',
    filterJanAushadhi: 'जन औषधी दुकाने',
    filterPhcChc: 'प्राथमिक व ग्रामीण आरोग्य केंद्रे',
    filterEmergency24x7: '२४ तास तातडीची सेवा केंद्रे',
    availableDoctors: 'उपस्थित डॉक्टर',
    ambulanceReady: 'रुग्णवाहिका सज्ज',
    distanceKm: 'अंतर',
    callFacility: 'केंद्राशी संपर्क करा',
    callingSimulated: 'आरोग्य केंद्राशी संपर्क केला जात आहे...',

    profileTitle: 'रुग्ण माहिती आणि आरोग्य ओळख',
    profileSubtitle: 'प्रमाणित आभा माहिती, शासकीय योजना आणि तपासणी इतिहास.',
    bloodGroup: 'रक्तगट',
    contactNumber: 'मोबाईल नंबर',
    emergencyContact: 'तातडीचा संपर्क क्रमांक',
    chronicConditions: 'जुने आजार',
    noChronicConditions: 'कोणताही जुना आजार नोंदवलेला नाही.',
    drugAllergies: 'औषध किंवा अन्नाची ॲलर्जी',
    noAllergies: 'कोणतीही ॲलर्जी नोंदवलेली नाही.',
    vitalsMonitoringLog: 'तपासणी नोंदींचा इतिहास',
    noVitalsRecorded: 'अद्याप कोणतीही तपासणी नोंदवलेली नाही.',

    fhwTitle: 'आरोग्य कार्यकर्त्या पोर्टल (आशा / एएनएम)',
    fhwSubtitle: 'ग्रामीण आरोग्य देखरेख, कुटुंब सर्वेक्षण आणि तपासणी नोंद.',
    assignedVillages: 'नेमून दिलेली गावे',
    familiesCovered: 'नेमून दिलेली कुटुंबे',
    highRiskCases: 'गंभीर आजाराची प्रकरणे',
    vaccinesDue: 'प्रलंबित लसीकरण',
    tabAssignedPatients: 'नेमून दिलेले रुग्ण',
    tabRecordVitals: 'तपासणी नोंदवा',
    tabBookDoctor: 'डॉक्टरांची वेळ घ्या',
    tabRegisterPatient: 'नवीन रुग्ण नोंदणी',
    tabReferrals: 'रेफरल आणि ट्रॅकिंग',
    searchPatientPlaceholder: 'रुग्णाचे नाव, आभा क्रमांक किंवा गाव शोधा...',
    filterHighRiskOnly: 'फक्त गंभीर रुग्ण व गरोदर माता',
    registerNewPatientBtn: 'नवीन रुग्ण नोंदणी करा',
    patientName: 'पूर्ण नाव',
    age: 'वय',
    gender: 'लिंग',
    female: 'स्त्री',
    male: 'पुरुष',
    other: 'इतर',
    phoneNumber: 'मोबाईल नंबर',
    village: 'गाव',
    consentCaptured: 'रुग्णाची तोंडी संमती घेतली आहे',
    registerSubmitBtn: 'आभा क्रमांक तयार करून नोंदवा',
    recordVitalsBtn: 'तपासणी जतन करा',
    vitalsRecordedSuccess: 'तपासणी यशस्वीरीत्या नोंदवली गेली.',
    selectPatient: 'रुग्ण निवडा',
    bookOnBehalfBtn: 'डॉक्टरांची वेळ नोंदवा',
    tokenBookedSuccess: 'टोकन यशस्वीरीत्या तयार केले गेले.',
    referralDestination: 'रेफरल दवाखाना',
    referralReason: 'रेफरलचे कारण',
    sendReferralBtn: 'अधिकृत रेफरल पाठवा',
    referralSentSuccess: 'रेफरल आरोग्य केंद्राला पाठवले गेले आहे.',

    doctorTitle: 'डॉक्टर सल्लागार कार्यस्थळ',
    doctorSubtitle: 'राष्ट्रीय वैद्यकीय आयोग प्रमाणित क्लिनिकल कन्सोल.',
    opdStatusOnline: 'ऑनलाइन सल्ल्यासाठी उपलब्ध',
    opdStatusConsult: 'तपासणी सुरू आहे',
    opdStatusOffline: 'ऑफलाइन',
    unverifiedDoctorAlert: 'जिल्हा आरोग्य प्रशासनाकडून पडताळणी प्रलंबित',
    unverifiedDoctorDesc: 'तुमच्या वैद्यकीय प्रमाणपत्रांची पडताळणी जिल्हा आरोग्य प्रशासनाद्वारे सुरू आहे. पडताळणी पूर्ण होईपर्यंत तुम्हाला तपासणी करण्याचा किंवा औषधे देण्याचा अधिकार नाही.',
    opdPatientQueue: 'तपासणी रांगेतील रुग्ण',
    tokenNumber: 'टोकन क्रमांक',
    startConsultationBtn: 'तपासणी सुरू करा',
    clinicalWorkspace: 'वैद्यकीय तपासणी कार्यस्थळ',
    provisionalDiagnosisLabel: 'प्राथमिक रोग निदान',
    icdCodeLabel: 'आयसीडी कोड',
    clinicalAdviceLabel: 'औषध व जीवनशैली संबंधी सूचना',
    addMedicine: 'औषध जोडा',
    medicineName: 'औषधाचे नाव',
    genericSubstitute: 'जन औषधी स्वस्त पर्याय',
    dosageFrequency: 'औषध घेण्याची वेळ',
    issuePrescriptionBtn: 'स्वाक्षरी करून चिठ्ठी द्या',
    prescriptionSuccess: 'औषध चिठ्ठी रुग्णाच्या आभा लॉकरमध्ये पाठवली गेली आहे.',
    orderDiagnosticTestLabel: 'प्रयोगशाळा तपासणी सुचवा',
    submitOrderBtn: 'तपासणी आदेश पाठवा',

    adminTitle: 'जिल्हा आरोग्य प्रशासन आणि नियामक कन्सोल',
    adminSubtitle: 'जिल्हा आरोग्य यंत्रणेवर देखरेख, प्रमाणीकरण आणि सुरक्षा तपासणी.',
    systemHealthUptime: 'यंत्रणा स्थिती: सुरळीत सुरू आहे',
    tabOverview: 'जिल्हा आरोग्य आढावा',
    tabDoctorVerification: 'डॉक्टर पडताळणी',
    tabFhwManagement: 'आरोग्य कर्मचारी व्यवस्थापन',
    tabAuditLogs: 'सुरक्षा आणि ऑडिट लॉग',
    kpiRuralCitizens: 'नोंदणीकृत ग्रामीण नागरिक',
    kpiConsultations: 'पूर्ण झालेले टेलि-सल्ले',
    kpiJanAushadhiSaved: 'जन औषधी वापर प्रमाण',
    kpiHighRiskMonitored: 'देखरेखीखालील गंभीर रुग्ण',
    doctorVerificationTitle: 'डॉक्टर परवाना पडताळणी',
    nmcRegNo: 'एनएमसी नोंदणी क्रमांक',
    medicalCouncil: 'राज्य वैद्यकीय परिषद',
    verifyBtn: 'पडताळणी करून मंजुरी द्या',
    suspendBtn: 'परवानगी स्थगित करा',
    doctorVerifiedStatus: 'सराव करण्यासाठी अधिकृत',
    doctorPendingStatus: 'पडताळणी प्रलंबित',
    fhwSyncStatus: 'डेटा सिंक स्थिती',
    subCentre: 'उप-आरोग्य केंद्र',
    lastSync: 'शेवटचा सिंक वेळ',
    activeCaseload: 'सध्याचा कार्यभार',
    auditLogTitle: 'नियामक आणि सुरक्षा ऑडिट नोंदी',

    ambulance108: 'मोफत २४ तास ग्रामीण रुग्णवाहिका',
    healthHelpline104: 'आरोग्य सल्ला आणि रक्तपेढी',
    janAushadhiHelpline: 'स्वस्त जन औषधी उपलब्धता',
    pmjayHelpline: 'आयुष्मान भारत योजना मदत',
    footerTitle: 'निश्चिंत सेवा ग्रामीण आरोग्य नेटवर्क',
    footerSubtitle: 'आयुष्मान भारत डिजिटल मिशन मानकांनुसार विकसित.',
    prototypeNotice: 'प्रात्यक्षिक प्रोटोटाइप - टेलि-ओपीडी आणि आभा लॉकर सिमुलेशन',

    // Role-based Language Selection
    chooseYourLanguage: 'आपली भाषा निवडा',
    selectLanguageSubtitle: 'कृपया आपली पसंतीची भाषा निवडा. सर्व वैद्यकीय सेवा, सल्ला आणि औषध माहिती याच भाषेत मिळेल.',
    teluguLangName: 'తెలుగు (Telugu)',
    teluguLangDesc: 'గ్రామీణ ఆరోగ్య సేవలు, వైద్యుల సంప్రదింపులు తెలుగులో',
    hindiLangName: 'हिन्दी (Hindi)',
    hindiLangDesc: 'ग्रामीण स्वास्थ्य सेवाएँ, डॉक्टर परामर्श और दवाइयों की पर्ची हिन्दी में',
    englishLangName: 'English (English)',
    englishLangDesc: 'ग्रामीण आरोग्य सेवा आणि वैद्यकीय नोंदी इंग्रजीत',
    marathiLangName: 'मराठी (Marathi)',
    marathiLangDesc: 'ग्रामीण आरोग्य सेवा, डॉक्टरांचा सल्ला आणि औषधे मराठीत',
    bengaliLangName: 'বাংলা (Bengali)',
    bengaliLangDesc: 'গ্রামীণ স্বাস্থ্যসেবা ও ডাক্তার পরামর্শ বাংলায়',
    continueWithLanguage: 'निवडलेल्या भाषेत पुढे जा',
    changeLanguage: 'भाषा बदला',
    preferredLanguage: 'पसंतीची भाषा',

    // Single-Language Tele-OPD & Patient UI
    joinConsultationRoom: 'तपासणी कक्षात सामील व्हा',
    describeComplaint: 'आपला त्रास किंवा लक्षणे सांगा',
    confirmToken: 'टोकन निश्चित करा',
    token: 'टोकन',
    liveOpdQueueStatus: 'थेट ओपीडी रांग स्थिती',
    priority: 'प्राधान्य',
    appointmentWith: 'सल्ला देणारे डॉक्टर',
    nowServingToken: 'सध्याचा टोकन #11 (आपला नंबर लवकरच येत आहे)',
    approxWait: 'अंदाजे वेळ: १२-१५ मिनिटे',
    filterBySpecialty: 'तज्ज्ञतेनुसार डॉक्टर शोधा:',
    availableNow: '● उपलब्ध आहेत',
    inConsultation: '● तपासणी सुरू आहे',
    registration: 'नोंदणी',
    experience: 'अनुभव',
    years: 'वर्षे',
    languages: 'भाषा',
    currentQueue: 'सध्याची रांग',
    patientsWaiting: 'रुग्ण प्रतीक्षेत',
    getTokenWithDoctor: 'डॉक्टरांचा तपासणी टोकन मिळवा',
    doctorLabel: 'डॉक्टर',
    patientLabel: 'रुग्ण',
    villageLabel: 'गाव',
    ageLabel: 'वय',
    complaintPlaceholder: 'उदा. चक्कर येणे, रक्तदाब वाढणे, २ दिवसांपासून अशक्तपणा...',
    you: 'तुम्ही',
    connected: 'जोडले गेले',
    audioSpeechGuidance: 'आवाज मार्गदर्शन सुरू करा',
    doctorVideoGreeting: 'नमस्कार! आशा ताईंनी पाठवलेल्या आपल्या रक्तदाब नोंदी मी पाहत आहे. आज आपल्याला कसे वाटत आहे?',
    vitalsSyncedNotice: 'आशा ताईंकडून प्राप्त नोंदी: बीपी 140/90 mmHg • SpO2 98% • नाडी 76 bpm',
    mute: 'माइक म्यूट करा',
    unmute: 'माइक सुरू करा',

    // Facilities
    callCentre: 'कॉल करा',
    showingNearbyLocations: 'जवळपासची आरोग्य केंद्रे व औषधालये',
    callingFacility: 'कॉल जोडला जात आहे...',
    kmAway: 'किमी अंतरावर',
    open24x7: '२४ तास तातडीची सेवा सुरू',
    ambulanceAvailable: 'रुग्णवाहिका उपलब्ध',
    doctorsOnDuty: 'डॉक्टर उपस्थित',
    medicineSubsidy: '५०%-९०% स्वस्त जन औषधी',
    viewMapRoute: 'रस्ता पाहा',

    // Prescriptions & Records
    prescriptionsAutoAppear: 'टेलि-ओपीडी किंवा प्राथमिक आरोग्य केंद्रात दिलेल्या चिठ्ठ्या येथे दिसतील.',
    teleOpdPrescriptionHeader: 'टेलि-ओपीडी डिजिटल औषध चिठ्ठी',
    prescribedBy: 'सल्लागार डॉक्टर',
    printSlip: 'चिठ्ठी डाउनलोड करा',
    prescriptionDownloadSuccess: 'औषध चिठ्ठी डाउनलोड झाली (PDF)',
    janAushadhiGeneric: 'जन औषधी स्वस्त जेनेरिक औषध',
    tablet: 'गोळी (टॅबलेट)',
    nextReviewDate: 'पुढील तपासणी तारीख',
    availableAtJanAushadhi: 'रामपूर जन औषधी केंद्रात उपलब्ध (२.४ किमी)',
    govIndiaNha: 'भारत सरकार • राष्ट्रीय आरोग्य प्राधिकरण (NHA)',
    abhaNumber: 'आभा क्रमांक',
    abhaAddress: 'आभा पत्ता',
    genderAge: 'लिंग / वय',
    villageDistrict: 'गाव आणि जिल्हा',
    scanForAbhaEhr: 'आभा रेकॉर्डसाठी स्कॅन करा',
    consentActiveAadhaar: 'रुग्ण संमती सक्रिय • आधार द्वारे ई-केवायसी प्रमाणित',
    pmjayScheme: 'आयुष्मान भारत योजना',
    pmjayActive: 'सक्रिय / पात्र (वार्षिक ₹५ लाख संरक्षण)',
    pmjayNotLinked: 'जोडलेले नाही',
    diagnosticSamplesSubtitle: 'आशा ताईंनी घेतलेले नमुने किंवा प्राथमिक आरोग्य केंद्रातील चाचण्या',
    recordsCount: 'नोंदी',
    noDiagnosticOrders: 'कोणत्याही प्रलंबित चाचण्या नाहीत.',
    resultLabel: 'चाचणी निकाल',
    flaggedForReview: 'डॉक्टरांचे लक्ष आवश्यक',
    uploadPhysicalRecord: 'कागदी आरोग्य नोंदी अपलोड करा',
    uploadPhysicalRecordDesc: 'जुन्या औषध चिठ्ठीचा किंवा लॅब रिपोर्टचा फोटो आभा लॉकरमध्ये सुरक्षित ठेवा.',
    uploadSuccessMessage: 'दस्तऐवज यशस्वीरीत्या आभा लॉकरमध्ये जोडला गेला!',

    // AI Assistant & Badges
    anemiaNutrition: 'अशक्तपणा आणि पोषण',
    cleanDrinkingWater: 'स्वच्छ पिण्याचे पाणी',
    checkWithAsha: 'आशा ताईंकडून तपासून घ्या',
    minutes: 'मिनिटे',
    teleOpdBadge: 'टेलि-ओपीडी',
    voiceBadge: 'आवाज',
    triageBadge: 'प्राथमिक तपासणी',
    janAushadhiBadge: 'जन औषधी',
    abhaEhrBadge: 'आभा नोंदी',
    kmBadge: 'किमी',
    aiGuidanceBadge: 'एआय मार्गदर्शन',

    // Symptom Triage Full Localization
    triageDurationLabel: 'ही लक्षणे किती दिवसांपासून आहेत?',
    triageSeverityLabel: 'लक्षणांची तीव्रता',
    redFlagsLabel: 'तातडीचे धोक्याचे संकेत',
    redFlagChestPain: 'छातीत असह्य वेदना किंवा जडपणा',
    redFlagBlueLips: 'ओठ निळे पडणे किंवा बोटे गार पडणे',
    redFlagUnconscious: 'गुंगी, बेशुद्धी किंवा प्रतिसाद न देणे',
    redFlagBloodInStool: 'उलटी किंवा शौचातून रक्त पडणे',
    calculateTriageBtn: 'तीव्रता मोजा',
    decisionSupportSystem: 'क्लिनिकल निर्णय सहाय्य',
    recommendedLevelOfCare: 'शिफारस केलेली आरोग्य सेवा',
    homeCareGuidance: 'तातडीची घरगुती काळजी',
    proceedToDoctorBtn: 'प्राधान्याने डॉक्टरांचा सल्ला घ्या',
    closeTriageBtn: 'बंद करा',
    durationTodayMorning: 'आज सकाळपासून',
    duration2to3Days: '२ - ३ दिवस',
    duration1Week: 'सुमारे १ आठवडा',
    duration2WeeksPlus: '२ आठवड्यांपेक्षा जास्त',
    severityMild: 'कमी',
    severityModerate: 'मध्यम',
    severitySevere: 'तीव्र',

    // Referral Status & Tracking
    referralStatusTitle: 'रेफरल स्थिती',
    referralStatusSubtitle: 'आपला रेफरल प्रवास आणि आरोग्य सेवेची प्रगती तपासा',
    activeReferralBadge: 'सक्रिय रेफरल',
    viewReferralProgress: 'रेफरल प्रगती पाहा',
    referralIdLabel: 'रेफरल आयडी',
    referredByLabel: 'कोणी संदर्भित केले',
    originFacilityLabel: 'मूळ आरोग्य केंद्र',
    destinationFacilityLabel: 'गंतव्य रुग्णालय',
    specialtyRequired: 'आवश्यक तज्ज्ञ विभाग',
    referralReasonLabel: 'रेफरलचे कारण',
    priorityLevel: 'प्राधान्य स्तर',
    nextStepLabel: 'पुढील पायरी',
    referralTimelineTitle: 'आरोग्य प्रवास आणि रेफरल वेळापत्रक',
    acknowledgeReferralBtn: 'रेफरल सूचना मान्य करा',
    acknowledgedNotice: 'रुग्णाने रेफरल सूचनांची खात्री केली',
    simulateStageAdvance: 'पुढील टप्पा सिम्युलेट करा',
    simulateReset: 'सुरुवातीच्या टप्प्यावर रीसेट करा',
    referralNotificationsTitle: 'रेफरल अपडेट्स आणि सूचना',
    backToDashboard: 'डॅशबोर्डवर परत जा',
    referralStageCreated: 'रेफरल तयार केले',
    referralStageSent: 'रेफरल पाठवले',
    referralStageAccepted: 'रेफरल स्वीकारले',
    referralStageDestinationConfirmed: 'गंतव्य रुग्णालय निश्चित',
    referralStageCheckedIn: 'रुग्ण पोहोचले / चेक-इन',
    referralStageConsultation: 'डॉक्टरांचा सल्ला',
    referralStageInvestigation: 'तपासण्या व चाचण्या',
    referralStageTreatment: 'उपचार व काळजी',
    referralStageCompleted: 'रेफरल पूर्ण झाले',

    // Upgraded Nearby Care
    nearbyCareQuestion: 'तुम्ही कोणत्या प्रकारची आरोग्य सेवा शोधत आहात?',
    nearbyCareSelectCategory: 'आपल्या गावाजवळील सत्यापित केंद्रांसाठी वर्गवारी निवडा:',
    catHospitals: 'रुग्णालये',
    catHospitalsSub: 'प्राथमिक, ग्रामीण व जिल्हा रुग्णालये',
    catPharmacies: 'औषध दुकाने / फार्मसी',
    catPharmaciesSub: 'जन औषधी केंद्र आणि जेनेरिक औषधे',
    catDiagnostics: 'निदान केंद्रे / लॅब',
    catDiagnosticsSub: 'रक्त तपासणी, एक्स-रे आणि स्कॅन',
    catOther: 'इतर आरोग्य केंद्रे',
    catOtherSub: 'उप-केंद्रे व आरोग्य क्लिनिक',
    catAll: 'सर्व जवळील केंद्रे',
    catAllSub: 'जवळील सर्व आरोग्य सुविधा पाहा',
    changeCategory: 'वर्गवारी बदला',
    callToCheckMedicine: 'औषध उपलब्ध आहे का विचारण्यासाठी कॉल करा',
    bookAppointment: 'अपॉइंटमेंट बुक / विनंती करा',
    viewServices: 'उपलब्ध सेवा पाहा',
    medicineAvailabilityCheck: 'औषध उपलब्धता तपासा',
    medicineInStock: 'जन औषधी केंद्रात उपलब्ध',
    checkStockBtn: 'स्टॉक तपासा',
    approxTravel: 'प्रवास माहिती',

    // AI-Powered Meet a Doctor
    howAreYouFeeling: 'आज तुम्हाला कसे वाटत आहे?',
    tellUsWhatIsHappening: 'सांगा काय त्रास होत आहे. तुम्ही टाईप करू शकता किंवा बोलू शकता.',
    typeSymptomsPlaceholder: 'तुमची लक्षणे लिहा (उदा: छातीत दुखणे, चक्कर येणे, ताप)...',
    speakSymptoms: 'बोलून लक्षणे सांगा',
    listening: 'ऐकत आहोत... कृपया बोला',
    stopListening: 'रेकॉर्डिंग थांबवा',
    speechNotSupported: 'या ब्राउझरमध्ये व्हॉइस सपोर्ट नाही. टाईप करा किंवा खालीलपैकी निवडा.',
    commonSymptomsSuggestions: 'लक्षण सूचना:',
    analyzingSymptoms: 'एआय क्लिनिकल विश्लेषण सुरू आहे...',
    understoodSymptoms: 'मी ही लक्षणे समजून घेतली:',
    isThisCorrect: 'हे योग्य आहे का?',
    yesContinue: 'होय, पुढे जा',
    editSymptoms: 'बदल करा',
    followUpQuestionsTitle: 'काही संक्षिप्त प्रश्न:',
    possibleEmergencyTitle: 'तातडीची आणीबाणी परिस्थिती असू शकते',
    possibleEmergencyDesc: 'आपल्या लक्षणांसाठी त्वरित वैद्यकीय उपचारांची गरज असू शकते. सामान्य ओपीडीची वाट पाहू नका.',
    call108Action: 'तातडीने १०८ रुग्णवाहिकेला कॉल करा',
    findEmergencyHospital: 'जवळचे आपत्कालीन रुग्णालय शोधा',
    recommendedSpecialist: 'शिफारस केलेले तज्ज्ञ डॉक्टर',
    specialistRecommendationReason: 'आपण वर्णन केलेल्या लक्षणांनुसार, हा सल्ला योग्य ठरेल.',
    doctorsSuitableForYou: 'आपल्यासाठी योग्य डॉक्टर',
    bookTeleconsultation: 'टेलि-सल्ला बुक करा',
    bookInPerson: 'रुग्णालयात प्रत्यक्ष भेट द्या',
    inPersonConsultation: 'रुग्णालयात प्रत्यक्ष भेट',
    teleconsultationOption: 'ऑनलाइन व्हिडिओ तपासणी',
    teleconsultAvailable: 'ऑनलाइन व्हिडिओ ओपीडी उपलब्ध',
    inPersonFacilityVisit: 'रुग्णालयात जाऊन दाखवा',
    skipToAllDoctors: 'लक्षण तपासणी वगळा आणि सर्व डॉक्टर पाहा',
    recheckSymptoms: 'दुसऱ्या लक्षणांची तपासणी करा',
  },

  bn: {
    appName: 'নিশ্চিন্ত সেবা',
    appTagline: 'গ্রামীণ স্বাস্থ্যসেবা ও আশা দিদি সহায়তা মঞ্চ',
    safetyNotice: 'এই তথ্যটি সাধারণ নির্দেশনার জন্য, এটি চিকিৎসকের বিকল্প নয়।',
    mockDataNotice: 'ডেমো প্রোটোটাইপ - সরকারি রেজিস্ট্রি যুক্ত নয়',
    lowBandwidthMode: 'কম ইন্টারনেট গতি মোড (2G/3G) সক্রিয়',
    normalBandwidth: 'সাধারণ নেটওয়ার্ক',
    listenAudio: 'বাংলায় শুনুন',
    welcomeBack: 'নমস্কার',

    selectRoleTitle: 'আপনার পোর্টাল নির্বাচন করুন',
    selectRoleSubtitle: 'গ্রামীণ নাগরিক, আশা কর্মী, চিকিৎসক ও স্বাস্থ্য কর্মকর্তাদের জন্য নিরাপদ সেবা।',
    patientRoleTitle: 'রোগী পোর্টাল',
    patientRoleDesc: 'টেলি-পরামর্শ, স্বাস্থ্য রেকর্ড, ডিজিটাল প্রেসক্রিপশন ও জরুরি সেবা।',
    fhwRoleTitle: 'স্বাস্থ্য কর্মী (আশা / এএনএম)',
    fhwRoleDesc: 'বাড়ি বাড়ি সমীক্ষা, প্রাথমিক পরীক্ষা এবং ডাক্তারের অ্যাপয়েন্টমেন্ট বুকিং।',
    doctorRoleTitle: 'যাচাইকৃত চিকিৎসক',
    doctorRoleDesc: 'অনলাইন পরামর্শ, রোগীর ইতিহাস পর্যবেক্ষণ এবং জন ঔষধি প্রেসক্রিপশন।',
    adminRoleTitle: 'জেলা স্বাস্থ্য প্রশাসন',
    adminRoleDesc: 'ডাক্তার যাচাইকরণ, স্বাস্থ্যকর্মী তদারকি, হাসপাতাল ও অডিট লগ।',
    loginTitle: 'পোর্টালে প্রবেশ করুন',
    loginSubtitle: 'আপনার তথ্য লিখুন অথবা নিচের ডেমো অ্যাকাউন্ট নির্বাচন করুন।',
    patientLoginPlaceholder: '১৪ সংখ্যার আভা নম্বর বা মোবাইল নম্বর দিন',
    doctorLoginPlaceholder: 'এনএমসি রেজিস্ট্রেশন নম্বর বা ইমেল দিন',
    fhwLoginPlaceholder: 'স্বাস্থ্য কর্মী আইডি বা ফোন নম্বর দিন',
    adminLoginPlaceholder: 'জেলা কর্মকর্তা আইডি দিন',
    enterPassword: 'পাসওয়ার্ড দিন',
    enterMpin: '৪ সংখ্যার এমপিন দিন',
    enterOtp: '৬ সংখ্যার ওটিপি দিন',
    loginBtn: 'লগইন করুন',
    logoutBtn: 'লগ আউট',
    backToRoles: 'ভূমিকা নির্বাচনে ফিরে যান',
    demoAccountsTitle: 'পরীক্ষার জন্য ডেমো অ্যাকাউন্ট',
    demoAccountsNote: 'সরাসরি প্রবেশ করতে নিচের যে কোনো অ্যাকাউন্টে ক্লিক করুন।',
    securityNoteRls: 'ভূমিকাভিত্তিক সুরক্ষা নীতি এবং এনক্রিপ্ট করা রেকর্ডের মাধ্যমে সুরক্ষিত।',
    loggedInAs: 'বর্তমান ব্যবহারকারী',

    home: 'মূল পাতা',
    talkToDoctor: 'ডাক্তারের পরামর্শ',
    myPrescriptions: 'আমার ওষুধপত্র',
    healthRecords: 'স্বাস্থ্য রেকর্ড',
    nearbyFacilities: 'নিকটবর্তী হাসপাতাল',
    patientProfile: 'আমার প্রোফাইল',

    emergencyTitle: 'জরুরি সহায়তা (108)',
    emergencyBtn: 'জরুরি 108',
    emergencyDesc: '108 অ্যাম্বুলেন্স, আশা কর্মী এবং নিকটস্থ স্বাস্থ্য কেন্দ্রে সরাসরি বার্তা।',
    criticalEmergencyBanner: 'জরুরি চিকিৎসা সংক্রান্ত সতর্কতা',
    dial108Now: 'অবিলম্বে 108 নম্বরে ফোন করুন',
    firstAidTitle: 'জরুরি প্রাথমিক চিকিৎসার নির্দেশিকা',
    ambulanceDispatched: 'অ্যাম্বুলেন্সের অনুরোধ পাঠানো হয়েছে।',
    calling108Simulated: '108 নিয়ন্ত্রণ কক্ষে সংযোগ স্থাপন করা হচ্ছে...',
    firstAidChestPain: 'রোগীকে সোজা বসিয়ে রাখুন। পোশাক ঢিলে করে দিন। শান্তভাবে শ্বাস নিতে সাহায্য করুন।',
    firstAidBreathing: 'খোলা বাতাসে বসান। ইনহেলার থাকলে ব্যবহার করুন। শুইয়ে রাখবেন না।',
    firstAidSnakebite: 'ক্ষতস্থান নাড়াচাড়া করবেন না। শক্ত করে বাঁধবেন না বা কাটবেন না। অবিলম্বে হাসপাতালে নিয়ে যান।',

    gramPanchayat: 'গ্রাম পঞ্চায়েত',
    abhaIdLabel: 'আভা স্বাস্থ্য নম্বর',
    pmjayCardLabel: 'আয়ুষ্মান ভারত কার্ড',
    latestVitals: 'সর্বশেষ শারীরিক পরীক্ষা',
    bloodPressure: 'রক্তচাপ',
    oxygenLevel: 'অক্সিজেন মাত্রা',
    pulseRate: 'নাড়ির স্পন্দন',
    randomSugar: 'রক্তের শর্করা',
    temperature: 'শরীরের তাপমাত্রা',
    activeTokenNotice: 'আজ আপনার ডাক্তারের অ্যাপয়েন্টমেন্ট টোকেন রয়েছে',
    activeQueue: 'বর্তমান পরামর্শের ক্রম',
    chiefComplaint: 'মূল সমস্যা',
    estimatedWait: 'আনুমানিক অপেক্ষার সময়',
    enterConsultationRoom: 'পরামর্শ কক্ষে প্রবেশ করুন',
    followUpAlert: 'পরবর্তী পরীক্ষার সময়সূচী',
    markDone: 'সম্পন্ন চিহ্নিত করুন',
    healthcareServices: 'স্বাস্থ্যসেবাসমূহ',
    touchToOpen: 'খোলার জন্য স্পর্শ করুন',
    activeTeleOpd: 'সক্রিয় টেলি-ওপিডি',
    healthAssistant: 'স্বাস্থ্য সহকারী',
    healthAssistantSub: 'সহজ ভাষায় স্বাস্থ্য সচেতনতা ও প্রাথমিক পরামর্শ',
    symptomCheck: 'লক্ষণ পরীক্ষা',
    symptomCheckSub: 'লক্ষণ বিশ্লেষণ ও সঠিক সিদ্ধান্ত সহায়তা',
    myPrescriptionsSub: 'ওষুধের সময়সূচী ও সাশ্রয়ী জন ঔষধি বিকল্প',
    healthRecordsSub: 'আভা কার্ড, ল্যাব রিপোর্ট ও চিকিৎসার ইতিহাস',
    nearbyFacilitiesSub: 'স্বাস্থ্য কেন্দ্র, হাসপাতাল ও ওষুধের দোকান',
    talkToDoctorSub: 'ভিডিও পরামর্শ ও টোকেন ক্রম',

    teleOpdTitle: 'টেলি-ওপিডি ও ডাক্তারের পরামর্শ',
    teleOpdSubtitle: 'সরকারি ও বিশেষজ্ঞ চিকিৎসকদের কাছ থেকে বিনামূল্যে গ্রামীণ চিকিৎসা পরামর্শ।',
    audioOptimized: 'কম নেটওয়ার্ক অডিও মোড',
    hdVideoStream: 'উচ্চ মানের ভিডিও প্রবাহ',
    allSpecialties: 'সকল বিশেষজ্ঞ',
    generalPhysician: 'সাধারণ চিকিৎসক',
    maternalGynae: 'মাতৃ ও স্ত্রীরোগ বিশেষজ্ঞ',
    childHealth: 'শিশু রোগ বিশেষজ্ঞ',
    doctorAvailable: 'পরামর্শের জন্য উপলব্ধ',
    doctorInConsult: 'পরামর্শে ব্যস্ত',
    doctorOffline: 'বর্তমানে অফলাইনে আছেন',
    experienceYears: 'বছরের অভিজ্ঞতা',
    rating: 'রেটিং',
    verifiedDoctor: 'যাচাইকৃত চিকিৎসক',
    unverifiedDoctorBadge: 'যাচাইকরণ বাকি রয়েছে',
    bookConsultationToken: 'পরামর্শের টোকেন নিন',
    enterSymptomsPlaceholder: 'আপনার সমস্যা বা লক্ষণগুলো এখানে লিখুন...',
    cancel: 'বাতিল করুন',
    confirmBooking: 'টোকেন নিশ্চিত করুন',
    teleConsultationRoom: 'টেলি-পরামর্শ কক্ষ',
    micOn: 'মাইক চালু',
    micOff: 'মাইক বন্ধ',
    videoOn: 'ক্যামেরা চালু',
    videoOff: 'ক্যামেরা বন্ধ',
    endConsultation: 'পরামর্শ শেষ করুন',

    prescriptionsTitle: 'আমার প্রেসক্রিপশন ও ওষুধপত্র',
    prescriptionsSubtitle: 'ওষুধ খাওয়ার সময়সূচী ও সাশ্রয়ী জন ঔষধি তালিকা।',
    totalPrescriptions: 'মোট প্রেসক্রিপশন',
    noPrescriptions: 'এই রোগীর জন্য কোনো প্রেসক্রিপশন পাওয়া যায়নি।',
    dosageSchedule: 'দৈনিক ওষুধের সময়সূচী',
    morning: 'সকাল',
    afternoon: 'দুপুর',
    night: 'রাত',
    withFoodBefore: 'খাওয়ার আগে',
    withFoodAfter: 'খাওয়ার পরে',
    withFoodWith: 'খাওয়ার সাথে',
    durationDays: 'সময়কাল (দিন)',
    genericJanAushadhiNotice: 'জন ঔষধি সাশ্রয়ী ওষুধ',
    doctorRegNo: 'ডাক্তারের নিবন্ধন নম্বর',
    provisionalDiagnosis: 'প্রাথমিক রোগ নির্ণয়',
    clinicalAdvice: 'চিকিৎসকের পরামর্শ ও সতর্কতা',
    followUpDate: 'পরবর্তী সাক্ষাতের তারিখ',
    downloadPrescription: 'প্রেসক্রিপশন ডাউনলোড করুন',

    recordsTitle: 'স্বাস্থ্য রেকর্ড ও আভা লকার',
    recordsSubtitle: 'আয়ুষ্মান ভারত হেলথ অ্যাকাউন্ট, ল্যাব রিপোর্ট এবং পূর্ববর্তী ইতিহাস।',
    uploadPaperRecord: 'কাগজের রেকর্ড আপলোড করুন',
    abhaCardTitle: 'অফিসিয়াল আভা স্বাস্থ্য কার্ড',
    abhaCardDesc: 'জাতীয় ডিজিটাল স্বাস্থ্য পরিচয়পত্র',
    downloadAbhaCard: 'আভা কার্ড ডাউনলোড করুন',
    diagnosticLabReports: 'ল্যাবরেটরি পরীক্ষার রিপোর্ট',
    testStatus: 'অবস্থা',
    sampleCollected: 'নমুনা সংগৃহীত',
    testCompleted: 'সম্পন্ন হয়েছে',
    abnormalResult: 'বিশেষ যত্ন প্রয়োজন',
    normalResult: 'স্বাভাবিক সীমার মধ্যে',
    uploadModalTitle: 'মেডিকেল রেকর্ড আপলোড করুন',
    documentName: 'নথির নাম',
    documentCategory: 'নথির বিভাগ',
    uploadBtn: 'আভা লকারে সংরক্ষণ করুন',
    recordSavedSuccess: 'নথিটি সফলভাবে আভা লকারে সংরক্ষিত হয়েছে।',

    facilitiesTitle: 'নিকটবর্তী স্বাস্থ্য কেন্দ্র ও ফার্মেসি',
    facilitiesSubtitle: 'প্রাথমিক স্বাস্থ্য কেন্দ্র, জন ঔষধি কেন্দ্র এবং ডায়াগনস্টিক ল্যাব।',
    filterAll: 'সকল কেন্দ্র',
    filterJanAushadhi: 'জন ঔষধি কেন্দ্র',
    filterPhcChc: 'প্রাথমিক ও গ্রামীণ স্বাস্থ্য কেন্দ্র',
    filterEmergency24x7: '২৪ ঘণ্টা জরুরি সেবা কেন্দ্র',
    availableDoctors: 'উপস্থিত ডাক্তার',
    ambulanceReady: 'অ্যাম্বুলেন্স প্রস্তুত',
    distanceKm: 'দূরত্ব',
    callFacility: 'কেন্দ্রে ফোন করুন',
    callingSimulated: 'স্বাস্থ্য কেন্দ্রের সাথে সংযোগ করা হচ্ছে...',

    profileTitle: 'রোগীর প্রোফাইল ও স্বাস্থ্য পরিচিতি',
    profileSubtitle: 'যাচাইকৃত আভা তথ্য, সরকারি প্রকল্প এবং শারীরিক পরীক্ষার ইতিহাস।',
    bloodGroup: 'রক্তের গ্রুপ',
    contactNumber: 'মোবাইল নম্বর',
    emergencyContact: 'জরুরি যোগাযোগের নম্বর',
    chronicConditions: 'পুরোনো রোগসমূহ',
    noChronicConditions: 'কোনো দীর্ঘস্থায়ী রোগ নথিবদ্ধ নেই।',
    drugAllergies: 'ওষুধ ও খাবারে অ্যালার্জি',
    noAllergies: 'কোনো অ্যালার্জির তথ্য নেই।',
    vitalsMonitoringLog: 'শারীরিক পরীক্ষার ইতিহাস',
    noVitalsRecorded: 'এখনও কোনো পরীক্ষার তথ্য নেই।',

    fhwTitle: 'স্বাস্থ্য কর্মী পোর্টাল (আশা / এএনএম)',
    fhwSubtitle: 'গ্রামীণ স্বাস্থ্য পর্যবেক্ষণ, পরিবার সমীক্ষা এবং পরীক্ষার তথ্য নথিভুক্তকরণ।',
    assignedVillages: 'দায়িত্বপ্রাপ্ত গ্রামসমূহ',
    familiesCovered: 'দায়িত্বপ্রাপ্ত পরিবার',
    highRiskCases: 'ঝুঁকিপূর্ণ রোগী',
    vaccinesDue: 'টিকা বাকি রয়েছে',
    tabAssignedPatients: 'দায়িত্বপ্রাপ্ত রোগী',
    tabRecordVitals: 'পরীক্ষার তথ্য লিখুন',
    tabBookDoctor: 'ডাক্তারের অ্যাপয়েন্টমেন্ট',
    tabRegisterPatient: 'নতুন রোগী নিবন্ধন',
    tabReferrals: 'রেফারেল ও ট্র্যাকিং',
    searchPatientPlaceholder: 'রোগীর নাম, আভা নম্বর বা গ্রাম দিয়ে খুঁজুন...',
    filterHighRiskOnly: 'কেবলমাত্র ঝুঁকিপূর্ণ রোগী ও গর্ভবতী মায়েরা',
    registerNewPatientBtn: 'নতুন রোগী নিবন্ধন করুন',
    patientName: 'সম্পূর্ণ নাম',
    age: 'বয়স',
    gender: 'লিঙ্গ',
    female: 'মহিলা',
    male: 'পুরুষ',
    other: 'অন্যান্য',
    phoneNumber: 'মোবাইল নম্বর',
    village: 'গ্রাম',
    consentCaptured: 'রোগীর মৌখিক সম্মতি নেওয়া হয়েছে',
    registerSubmitBtn: 'আভা আইডি তৈরি ও নিবন্ধন করুন',
    recordVitalsBtn: 'পরীক্ষার তথ্য সংরক্ষণ করুন',
    vitalsRecordedSuccess: 'পরীক্ষার তথ্য সফলভাবে সংরক্ষিত হয়েছে।',
    selectPatient: 'রোগী নির্বাচন করুন',
    bookOnBehalfBtn: 'অ্যাপয়েন্টমেন্ট বুক করুন',
    tokenBookedSuccess: 'টোকেন সফলভাবে তৈরি হয়েছে।',
    referralDestination: 'রেফারেল হাসপাতাল',
    referralReason: 'রেফারেলের কারণ',
    sendReferralBtn: 'রেফারেল পাঠান',
    referralSentSuccess: 'রেফারেল স্বাস্থ্য কেন্দ্রে পাঠানো হয়েছে।',

    doctorTitle: 'ডাক্তারের পরামর্শের স্থান',
    doctorSubtitle: 'জাতীয় চিকিৎসা কমিশন স্বীকৃত ক্লিনিক্যাল কনসোল।',
    opdStatusOnline: 'পরামর্শের জন্য উপলব্ধ',
    opdStatusConsult: 'পরামর্শ চলছে',
    opdStatusOffline: 'অফলাইন',
    unverifiedDoctorAlert: 'জেলা স্বাস্থ্য প্রশাসনের যাচাইকরণ প্রক্রিয়াধীন',
    unverifiedDoctorDesc: 'আপনার চিকিৎসা যোগ্যতার প্রমাণপত্র জেলা স্বাস্থ্য প্রশাসন দ্বারা পর্যালোচনা করা হচ্ছে। অনুমোদন সম্পন্ন না হওয়া পর্যন্ত আপনি পরামর্শ দেওয়া বা ওষুধ লেখার জন্য অনুমোদিত নন।',
    opdPatientQueue: 'রোগীদের অপেক্ষমাণ তালিকা',
    tokenNumber: 'টোকেন নম্বর',
    startConsultationBtn: 'পরামর্শ শুরু করুন',
    clinicalWorkspace: 'চিকিৎসা কার্যক্ষেত্র',
    provisionalDiagnosisLabel: 'প্রাথমিক রোগ নির্ণয়',
    icdCodeLabel: 'আইসিডি কোড',
    clinicalAdviceLabel: 'ওষুধ ও জীবনযাত্রা সংক্রান্ত নির্দেশ',
    addMedicine: 'ওষুধ যোগ করুন',
    medicineName: 'ওষুধের নাম',
    genericSubstitute: 'জন ঔষধি সাশ্রয়ী বিকল্প',
    dosageFrequency: 'খাওয়ার সময়',
    issuePrescriptionBtn: 'প্রেসক্রিপশন ইস্যু করুন',
    prescriptionSuccess: 'প্রেসক্রিপশন রোগীর আভা লকারে পাঠানো হয়েছে।',
    orderDiagnosticTestLabel: 'ল্যাব পরীক্ষার নির্দেশ দিন',
    submitOrderBtn: 'পরীক্ষার নির্দেশ পাঠান',

    adminTitle: 'জেলা স্বাস্থ্য প্রশাসন ও নিয়ন্ত্রণ ব্যবস্থা',
    adminSubtitle: 'জেলা স্বাস্থ্য ব্যবস্থার সার্বিক তদারকি, অনুমোদন ও নিরাপত্তা নিরীক্ষা।',
    systemHealthUptime: 'সিস্টেম অবস্থা: পুরোপুরি সক্রিয়',
    tabOverview: 'জেলা স্বাস্থ্য সার্বিক চিত্র',
    tabDoctorVerification: 'ডাক্তার অনুমোদন',
    tabFhwManagement: 'স্বাস্থ্য কর্মী ব্যবস্থাপনা',
    tabAuditLogs: 'নিরাপত্তা ও অডিট লগ',
    kpiRuralCitizens: 'নিবন্ধিত গ্রামীণ নাগরিক',
    kpiConsultations: 'সম্পন্ন টেলি-পরামর্শ',
    kpiJanAushadhiSaved: 'জন ঔষধি ওষুধের ব্যবহার হার',
    kpiHighRiskMonitored: 'নজরদারিতে থাকা ঝুঁকিপূর্ণ রোগী',
    doctorVerificationTitle: 'ডাক্তার লাইসেন্স অনুমোদন',
    nmcRegNo: 'এনএমসি রেজিস্ট্রেশন নম্বর',
    medicalCouncil: 'রাজ্য মেডিকেল কাউন্সিল',
    verifyBtn: 'অনুমোদন দিন',
    suspendBtn: 'অনুমোদন স্থগিত করুন',
    doctorVerifiedStatus: 'চিকিৎসা করার অনুমতি রয়েছে',
    doctorPendingStatus: 'অনুমোদন প্রক্রিয়াধীন',
    fhwSyncStatus: 'মাঠ পর্যায়ের ডেটা সিঙ্ক অবস্থা',
    subCentre: 'উপ-স্বাস্থ্য কেন্দ্র',
    lastSync: 'সর্বশেষ সিঙ্ক সময়',
    activeCaseload: 'বর্তমান দায়িত্ব',
    auditLogTitle: 'আইনগত ও নিরাপত্তা অডিট লগ',

    ambulance108: 'বিনামূল্যে ২৪ ঘণ্টা গ্রামীণ অ্যাম্বুলেন্স',
    healthHelpline104: 'স্বাস্থ্য পরামর্শ ও ব্লাড ব্যাংক',
    janAushadhiHelpline: 'সাশ্রয়ী জন ঔষধি ওষুধের তথ্য',
    pmjayHelpline: 'আয়ুষ্মান ভারত প্রকল্প সহায়তা',
    footerTitle: 'নিশ্চিন্ত সেবা গ্রামীণ স্বাস্থ্য সুরক্ষা মঞ্চ',
    footerSubtitle: 'আয়ুষ্মান ভারত ডিজিটাল মিশন মানদণ্ড অনুসারে তৈরি।',
    prototypeNotice: 'ডেমো প্রোটোটাইপ - টেলি-ওপিডি এবং আভা হেলথ লকার সিমুলেশন',

    // Role-based Language Selection
    chooseYourLanguage: 'আপনার ভাষা বেছে নিন',
    selectLanguageSubtitle: 'অনুগ্রহ করে আপনার পছন্দের ভাষা নির্বাচন করুন। সমস্ত চিকিৎসা সেবা, পরামর্শ ও প্রেসক্রিপশন এই ভাষায় প্রদর্শিত হবে।',
    teluguLangName: 'తెలుగు (Telugu)',
    teluguLangDesc: 'గ్రామీణ ఆరోగ్య సేవలు, వైద్యుల సంప్రదింపులు తెలుగులో',
    hindiLangName: 'हिन्दी (Hindi)',
    hindiLangDesc: 'ग्रामीण स्वास्थ्य सेवाएँ, डॉक्टर परामर्श और दवाइयों की पर्ची हिन्दी में',
    englishLangName: 'English (English)',
    englishLangDesc: 'গ্রামীণ স্বাস্থ্যসেবা ও চিকিৎসা রেকর্ড ইংরেজিতে',
    marathiLangName: 'मराठी (Marathi)',
    marathiLangDesc: 'ग्रामीण आरोग्य सेवा आणि आशा ताई सल्ला मराठीत',
    bengaliLangName: 'বাংলা (Bengali)',
    bengaliLangDesc: 'গ্রামীণ স্বাস্থ্যসেবা, ডাক্তারের পরামর্শ ও প্রেসক্রিপশন বাংলায়',
    continueWithLanguage: 'নির্বাচিত ভাষায় এগিয়ে যান',
    changeLanguage: 'ভাষা পরিবর্তন করুন',
    preferredLanguage: 'পছন্দের ভাষা',

    // Single-Language Tele-OPD & Patient UI
    joinConsultationRoom: 'পরামর্শ কক্ষে যোগ দিন',
    describeComplaint: 'আপনার স্বাস্থ্য সমস্যা বা লক্ষণ বর্ণনা করুন',
    confirmToken: 'অ্যাপয়েন্টমেন্ট টোকেন নিশ্চিত করুন',
    token: 'টোকেন',
    liveOpdQueueStatus: 'লাইভ ওপিডি লাইনের অবস্থা',
    priority: 'অগ্রাধিকার',
    appointmentWith: 'পরামর্শদাতা চিকিৎসক',
    nowServingToken: 'বর্তমান টোকেন #11 (শীঘ্রই আপনার পালা আসবে)',
    approxWait: 'আনুমানিক অপেক্ষার সময়: ১২-১৫ মিনিট',
    filterBySpecialty: 'বিশেষজ্ঞতা অনুযায়ী ডাক্তার খুঁজুন:',
    availableNow: '● উপলব্ধ আছেন',
    inConsultation: '● পরামর্শ চলছে',
    registration: 'নিবন্ধন',
    experience: 'অভিজ্ঞতা',
    years: 'বছর',
    languages: 'ভাষা',
    currentQueue: 'বর্তমান অপেক্ষমাণ তালিকা',
    patientsWaiting: 'রোগী অপেক্ষারত',
    getTokenWithDoctor: 'ডাক্তারের পরামর্শ টোকেন নিন',
    doctorLabel: 'চিকিৎসক',
    patientLabel: 'রোগী',
    villageLabel: 'গ্রাম',
    ageLabel: 'বয়স',
    complaintPlaceholder: 'যেমন: সকালে মাথা ঘোরা, রক্তচাপ বৃদ্ধি, ২ দিন ধরে দুর্বলতা...',
    you: 'আপনি',
    connected: 'সংযুক্ত হয়েছে',
    audioSpeechGuidance: 'ভয়েস নির্দেশিকা চালু করুন',
    doctorVideoGreeting: 'নমস্কার! আশা কর্মীর পাঠানো আপনার সাম্প্রতিক রক্তচাপের তথ্য আমি দেখছি। আজ আপনি কেমন অনুভব করছেন?',
    vitalsSyncedNotice: 'আশা দিদির পাঠানো তথ্য: বিপি 140/90 mmHg • SpO2 98% • নাড়ির গতি 76 bpm',
    mute: 'মাইক্রোফোন বন্ধ করুন',
    unmute: 'মাইক্রোফোন চালু করুন',

    // Facilities
    callCentre: 'কল করুন',
    showingNearbyLocations: 'নিকটবর্তী স্বাস্থ্য কেন্দ্র ও ওষুধের দোকান',
    callingFacility: 'কল সংযুক্ত করা হচ্ছে...',
    kmAway: 'কিমি দূরে',
    open24x7: '২৪ ঘণ্টা জরুরি সেবা চালু',
    ambulanceAvailable: 'অ্যাম্বুলেন্স উপলব্ধ',
    doctorsOnDuty: 'ডাক্তার উপস্থিত',
    medicineSubsidy: '৫০%-৯০% কম দামে জন ঔষধি',
    viewMapRoute: 'পথ নির্দেশ দেখুন',

    // Prescriptions & Records
    prescriptionsAutoAppear: 'টেলি-ওপিডি বা প্রাথমিক স্বাস্থ্য কেন্দ্রে দেওয়া প্রেসক্রিপশন এখানে দেখা যাবে।',
    teleOpdPrescriptionHeader: 'টেলি-ওপিডি ডিজিটাল প্রেসক্রিপশন',
    prescribedBy: 'পরামর্শদাতা ডাক্তার',
    printSlip: 'প্রেসক্রিপশন ডাউনলোড করুন',
    prescriptionDownloadSuccess: 'প্রেসক্রিপশন সফলভাবে ডাউনলোড হয়েছে (PDF)',
    janAushadhiGeneric: 'জন ঔষধি সাশ্রয়ী জেনেরিক বিকল্প',
    tablet: 'ট্যাবলেট',
    nextReviewDate: 'পরবর্তী সাক্ষাতের তারিখ',
    availableAtJanAushadhi: 'রামপুর জন ঔষধি কেন্দ্রে উপলব্ধ (২.৪ কিমি দূরে)',
    govIndiaNha: 'ভারত সরকার • জাতীয় স্বাস্থ্য কর্তৃপক্ষ (NHA)',
    abhaNumber: 'আভা নম্বর',
    abhaAddress: 'আভা ঠিকানা',
    genderAge: 'লিঙ্গ / বয়স',
    villageDistrict: 'গ্রাম ও জেলা',
    scanForAbhaEhr: 'আভা রেকর্ডের জন্য স্ক্যান করুন',
    consentActiveAadhaar: 'রোগীর সম্মতি সক্রিয় • আধারের মাধ্যমে ই-কেওয়াইসি যাচাইকৃত',
    pmjayScheme: 'আয়ুষ্মান ভারত যোজনা',
    pmjayActive: 'সক্রিয় / উপযুক্ত (বার্ষিক ৫ লক্ষ টাকার কভার)',
    pmjayNotLinked: 'যুক্ত নয়',
    diagnosticSamplesSubtitle: 'আশা কর্মীর সংগৃহীত নমুনা বা স্বাস্থ্য কেন্দ্রের পরীক্ষার ফলাফল',
    recordsCount: 'রেকর্ড',
    noDiagnosticOrders: 'কোনো অপেক্ষমাণ পরীক্ষা নেই।',
    resultLabel: 'পরীক্ষার ফল',
    flaggedForReview: 'ডাক্তারের পর্যালোচনা প্রয়োজন',
    uploadPhysicalRecord: 'কাগজের স্বাস্থ্য রেকর্ড আপলোড করুন',
    uploadPhysicalRecordDesc: 'পুরোনো প্রেসক্রিপশন বা ল্যাব রিপোর্টের ছবি তুলে আভা লকারে নিরাপদে রাখুন।',
    uploadSuccessMessage: 'নথিটি সফলভাবে স্ক্যান করে আভা লকারে যোগ করা হয়েছে!',

    // AI Assistant & Badges
    anemiaNutrition: 'রক্তস্বল্পতা ও পুষ্টি',
    cleanDrinkingWater: 'বিশুদ্ধ পানীয় জল',
    checkWithAsha: 'আশা দিদির সাথে কথা বলুন',
    minutes: 'মিনিট',
    teleOpdBadge: 'টেলি-ওপিডি',
    voiceBadge: 'ভয়েস',
    triageBadge: 'প্রাথমিক পরীক্ষা',
    janAushadhiBadge: 'জন ঔষধি',
    abhaEhrBadge: 'আভা রেকর্ড',
    kmBadge: 'কিমি',
    aiGuidanceBadge: 'এআই সহায়তা',

    // Symptom Triage Full Localization
    triageDurationLabel: 'এই লক্ষণগুলি কতদিন ধরে আছে?',
    triageSeverityLabel: 'লক্ষণের তীব্রতা',
    redFlagsLabel: 'জরুরি বিপদ সংকেত',
    redFlagChestPain: 'বুকে তীব্র যন্ত্রণা বা অতিরিক্ত চাপ',
    redFlagBlueLips: 'ঠোঁট নীল হয়ে যাওয়া বা আঙুল ঠান্ডা হওয়া',
    redFlagUnconscious: 'অচৈতন্য ভাব, অসাড়তা বা সাড়া না দেওয়া',
    redFlagBloodInStool: 'বমি বা মলের সাথে রক্ত যাওয়া',
    calculateTriageBtn: 'ঝুঁকি পরিমাপ করুন',
    decisionSupportSystem: 'ক্লিনিক্যাল সিদ্ধান্ত সহায়তা',
    recommendedLevelOfCare: 'প্রস্তাবিত স্বাস্থ্যসেবা স্তর',
    homeCareGuidance: 'জরুরি ঘরোয়া যত্ন নির্দেশিকা',
    proceedToDoctorBtn: 'অগ্রাধিকারে ডাক্তারের পরামর্শ নিন',
    closeTriageBtn: 'বন্ধ করুন',
    durationTodayMorning: 'আজ সকাল থেকে',
    duration2to3Days: '২ - ৩ দিন ধরে',
    duration1Week: 'প্রায় ১ সপ্তাহ ধরে',
    duration2WeeksPlus: '২ সপ্তাহের বেশি',
    severityMild: 'স্বল্প',
    severityModerate: 'মাঝারি',
    severitySevere: 'তীব্র',

    // Referral Status & Tracking
    referralStatusTitle: 'রেফারাল অবস্থা',
    referralStatusSubtitle: 'আপনার রেফারাল যাত্রা এবং চিকিৎসার অগ্রগতি দেখুন',
    activeReferralBadge: 'সক্রিয় রেফারাল',
    viewReferralProgress: 'রেফারাল অগ্রগতি দেখুন',
    referralIdLabel: 'রেফারাল আইডি',
    referredByLabel: 'রেফার করেছেন যিনি',
    originFacilityLabel: 'উৎস স্বাস্থ্য কেন্দ্র',
    destinationFacilityLabel: 'গন্তব্য হাসপাতাল',
    specialtyRequired: 'প্রয়োজনীয় বিশেষজ্ঞ বিভাগ',
    referralReasonLabel: 'রেফারালের কারণ',
    priorityLevel: 'অগ্রাধিকার স্তর',
    nextStepLabel: 'পরবর্তী পদক্ষেপ',
    referralTimelineTitle: 'চিকিৎসা যাত্রা ও রেফারাল সময়ক্রম',
    acknowledgeReferralBtn: 'রেফারাল নির্দেশ স্বীকার করুন',
    acknowledgedNotice: 'রোগী রেফারাল নির্দেশাবলী নিশ্চিত করেছেন',
    simulateStageAdvance: 'পরবর্তী ধাপ সিমুলেট করুন',
    simulateReset: 'শুরুর ধাপে ফিরিয়ে আনুন',
    referralNotificationsTitle: 'রেফারাল আপডেট ও বিজ্ঞপ্তি',
    backToDashboard: 'ড্যাশবোর্ডে ফিরে যান',
    referralStageCreated: 'রেফারাল তৈরি হয়েছে',
    referralStageSent: 'রেফারাল পাঠানো হয়েছে',
    referralStageAccepted: 'রেফারাল গৃহীত হয়েছে',
    referralStageDestinationConfirmed: 'গন্তব্য হাসপাতাল নিশ্চিত',
    referralStageCheckedIn: 'রোগী উপস্থিত / চেক-ইন',
    referralStageConsultation: 'ডাক্তারের পরামর্শ',
    referralStageInvestigation: 'পরীক্ষা ও টেস্ট',
    referralStageTreatment: 'চিকিৎসা ও যত্ন',
    referralStageCompleted: 'রেফারাল সমাপ্ত',

    // Upgraded Nearby Care
    nearbyCareQuestion: 'আপনি কি ধরনের স্বাস্থ্যসেবা খুঁজছেন?',
    nearbyCareSelectCategory: 'আপনার গ্রামের কাছের যাচাইকৃত কেন্দ্র দেখতে বিভাগ নির্বাচন করুন:',
    catHospitals: 'হাসপাতাল',
    catHospitalsSub: 'পিএইচসি, সিএইচসি এবং জেলা হাসপাতাল',
    catPharmacies: 'ওষুধের দোকান / ফার্মেসি',
    catPharmaciesSub: 'জন ঔষধি কেন্দ্র ও জেনেরিক ওষুধ',
    catDiagnostics: 'ডায়াগনস্টিক কেন্দ্র / ল্যাব',
    catDiagnosticsSub: 'রক্ত পরীক্ষা, এক্স-রে ও স্ক্যান',
    catOther: 'অন্যান্য স্বাস্থ্য কেন্দ্র',
    catOtherSub: 'উপ-স্বাস্থ্য কেন্দ্র ও ওয়েলনেস ক্লিনিক',
    catAll: 'নিকটবর্তী সকল কেন্দ্র',
    catAllSub: 'আশেপাশের সমস্ত স্বাস্থ্যসেবা কেন্দ্র দেখুন',
    changeCategory: 'বিভাগ পরিবর্তন করুন',
    callToCheckMedicine: 'ওষুধ আছে কিনা জানতে কল করুন',
    bookAppointment: 'অ্যাপয়েন্টমেন্ট বুক / অনুরোধ করুন',
    viewServices: 'উপলব্ধ সেবাসমূহ দেখুন',
    medicineAvailabilityCheck: 'ওষুধের প্রাপ্যতা পরীক্ষা',
    medicineInStock: 'জন ঔষধি কেন্দ্রে উপলব্ধ',
    checkStockBtn: 'স্টক পরীক্ষা করুন',
    approxTravel: 'যাতায়াত তথ্য',

    // AI-Powered Meet a Doctor
    howAreYouFeeling: 'আজ আপনার কেমন লাগছে?',
    tellUsWhatIsHappening: 'আপনার কি সমস্যা হচ্ছে বলুন। আপনি টাইপ করতে পারেন বা মুখে বলতে পারেন।',
    typeSymptomsPlaceholder: 'আপনার লক্ষণগুলি লিখুন (যেমন: বুকে অস্বস্তি, সকালে মাথা ঘোরা, প্রচণ্ড জ্বর)...',
    speakSymptoms: 'মুখে বলে লক্ষণ জানান',
    listening: 'শুনছি... দয়া করে কথা বলুন',
    stopListening: 'রেকর্ডিং বন্ধ করুন',
    speechNotSupported: 'এই ব্রাউজারে ভয়েস সমর্থন সক্রিয় নেই। টাইপ করুন বা নিচের তালিকা থেকে বেছে নিন।',
    commonSymptomsSuggestions: 'লক্ষণ সংক্রান্ত পরামর্শ:',
    analyzingSymptoms: 'এআই ক্লিনিক্যাল ম্যাচিং বিশ্লেষণ চলছে...',
    understoodSymptoms: 'আমি এই লক্ষণগুলি বুঝতে পেরেছি:',
    isThisCorrect: 'এটি কি সঠিক?',
    yesContinue: 'হ্যাঁ, এগিয়ে যান',
    editSymptoms: 'সম্পাদনা করুন',
    followUpQuestionsTitle: 'কয়েকটি সংক্ষিপ্ত প্রশ্ন:',
    possibleEmergencyTitle: 'সম্ভাব্য জরুরি পরিস্থিতি',
    possibleEmergencyDesc: 'আপনার লক্ষণগুলিতে অবিলম্বে জরুরি চিকিৎসার প্রয়োজন হতে পারে। সাধারণ ওপিডির জন্য অপেক্ষা করবেন না।',
    call108Action: 'তৎক্ষণাৎ ১০৮ অ্যাম্বুলেন্সে কল করুন',
    findEmergencyHospital: 'নিকটস্থ জরুরি হাসপাতাল খুঁজুন',
    recommendedSpecialist: 'সুপারিশকৃত বিশেষজ্ঞ চিকিৎসক',
    specialistRecommendationReason: 'আপনার বর্ণিত লক্ষণগুলির ভিত্তিতে এই পরামর্শটি উপযুক্ত হতে পারে।',
    doctorsSuitableForYou: 'আপনার জন্য উপযুক্ত ডাক্তার',
    bookTeleconsultation: 'টেলি-পরামর্শ বুক করুন',
    bookInPerson: 'হাসপাতালে গিয়ে পরামর্শ নিন',
    inPersonConsultation: 'হাসপাতালে সরাসরি সাক্ষাৎ',
    teleconsultationOption: 'অনলাইন ভিডিও পরামর্শ',
    teleconsultAvailable: 'অনলাইন ভিডিও ওপিডি উপলব্ধ',
    inPersonFacilityVisit: 'সরাসরি হাসপাতালে যান',
    skipToAllDoctors: 'লক্ষণ পরীক্ষা এড়িয়ে সব ডাক্তার দেখুন',
    recheckSymptoms: 'অন্য লক্ষণের পরীক্ষা করুন',
  },
};
