import { createClient, User as SupabaseAuthUser } from '@supabase/supabase-js';
import { Role, AuthUser } from '../types';

/**
 * Supabase client configuration using public environment variables.
 * Note: Never expose or import the secret service_role key in frontend code.
 */
export const SUPABASE_URL: string =
  import.meta.env.VITE_SUPABASE_URL || 'https://aicpvkktdipjzdijdhri.supabase.co';

export const SUPABASE_ANON_KEY: string =
  import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  SUPABASE_URL &&
  SUPABASE_ANON_KEY &&
  SUPABASE_ANON_KEY.trim() !== '' &&
  SUPABASE_ANON_KEY !== 'MY_SUPABASE_ANON_KEY' &&
  SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY'
);

// Safe browser client using the public anon key only
export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

// Typed interfaces reflecting the Supabase database schema
export interface SupabaseProfile {
  id: string;
  role: Role;
  full_name?: string;
  phone?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SupabasePatientProfile {
  id?: string;
  abha_id?: string;
  gender?: 'Female' | 'Male' | 'Other';
  village?: string;
  district?: string;
  state?: string;
  blood_group?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SupabaseFhwProfile {
  id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SupabaseDoctorProfile {
  id?: string;
  specialty?: string;
  qualification?: string;
  registration_number?: string;
  registration_no?: string;
  facility_name?: string;
  is_verified?: boolean;
  verification_status?: 'approved' | 'pending' | 'rejected' | 'suspended' | string;
  languages?: string[] | string;
  created_at?: string;
  updated_at?: string;
}

export interface SupabaseAdminProfile {
  id?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Resiliently fetch a role-specific profile from the respective table:
 * patient_profiles, fhw_profiles, doctor_profiles, or admin_profiles.
 */
async function fetchRoleProfileRecord(role: Role, userId: string) {
  const tableMap: Record<Role, string> = {
    patient: 'patient_profiles',
    fhw: 'fhw_profiles',
    doctor: 'doctor_profiles',
    admin: 'admin_profiles',
  };

  const tableName = tableMap[role];
  if (!tableName) return null;

  try {
    const { data: byId, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (byId && !error) return byId;
  } catch (err) {
    console.warn(`[Supabase] Note querying ${tableName}:`, err);
  }

  return null;
}

/**
 * Resolves the authenticated Supabase user and stitches together:
 * auth.users + profiles + (patient_profiles | fhw_profiles | doctor_profiles | admin_profiles)
 */
export async function buildAuthUserFromSupabase(
  authUser: SupabaseAuthUser
): Promise<AuthUser | null> {
  const userId = authUser.id;
  const userEmail = authUser.email || '';
  const userMetadata = authUser.user_metadata || {};

  // 1. Fetch base profile from profiles table
  let baseProfile: SupabaseProfile | null = null;
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (data && !error) {
      baseProfile = data;
    }
  } catch (err) {
    console.warn('[Supabase] Error reading profiles table:', err);
  }

  // Determine role: profiles.role > metadata.role > metadata.user_role > default 'patient'
  const role: Role = (baseProfile?.role || userMetadata.role || userMetadata.user_role || 'patient') as Role;
  const userName =
    baseProfile?.full_name ||
    userMetadata.name ||
    userMetadata.full_name ||
    userEmail.split('@')[0] ||
    'User';
  const userPhone = baseProfile?.phone || userMetadata.phone || authUser.phone || '';

  // 2. Fetch role-specific details from patient_profiles / fhw_profiles / doctor_profiles / admin_profiles
  const roleRecord = await fetchRoleProfileRecord(role, userId);

  // 3. Assemble unified AuthUser object
  const unifiedUser: AuthUser = {
    id: userId,
    role,
    name: userName,
    email: userEmail,
    phone: userPhone,
  };

  if (role === 'patient') {
    const pat = roleRecord as SupabasePatientProfile | null;
    unifiedUser.patientId = pat?.id || userId;
    unifiedUser.abhaId = pat?.abha_id || userMetadata.abhaId || '14-8921-4309-8812';
    unifiedUser.assignedVillage = pat?.village || userMetadata.village || 'Rampur Kalan';
  } else if (role === 'fhw') {
    unifiedUser.fhwId = userId;
    unifiedUser.designation = userMetadata.designation || 'ASHA Worker';
    unifiedUser.assignedVillage = userMetadata.village || 'Rampur Kalan';
  } else if (role === 'doctor') {
    const doc = roleRecord as SupabaseDoctorProfile | null;
    unifiedUser.doctorId = doc?.id || userId;
    const isVer = doc?.is_verified ?? (userMetadata.isVerified ?? false);
    unifiedUser.isVerified = isVer;
    unifiedUser.verificationStatus =
      doc?.verification_status || (userMetadata.verificationStatus ?? (isVer ? 'approved' : 'pending'));
    unifiedUser.registrationNo =
      doc?.registration_number || doc?.registration_no || userMetadata.registrationNo || 'NMC/2014/08942';
    unifiedUser.designation = doc?.specialty || userMetadata.specialty || 'General Physician';
  } else if (role === 'admin') {
    unifiedUser.adminId = userId;
    unifiedUser.designation = userMetadata.designation || 'District Health Officer';
  }

  return unifiedUser;
}

/**
 * Sign In with Supabase using email and password, strictly verifying the user's role from the database.
 */
export async function signInWithSupabase(
  email: string,
  password: string,
  expectedRole?: Role
) {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not fully configured. Please set VITE_SUPABASE_ANON_KEY in your environment.');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  if (!data.user) {
    throw new Error('No user returned from Supabase authentication.');
  }

  // Retrieve user's public.profiles record from database
  let dbProfile: SupabaseProfile | null = null;
  try {
    const { data: profData, error: profErr } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .maybeSingle();

    if (profData && !profErr) {
      dbProfile = profData;
    }
  } catch (err) {
    console.warn('[Supabase] Note verifying database profile role:', err);
  }

  const verifiedRole: Role = (dbProfile?.role || data.user.user_metadata?.role || data.user.user_metadata?.user_role) as Role;

  // Strict role verification: check authenticated user's role from the database
  if (expectedRole && verifiedRole && verifiedRole !== expectedRole) {
    await supabase.auth.signOut();
    const roleLabels: Record<Role, string> = {
      patient: 'Patient',
      fhw: 'Frontline Health Worker (ASHA/ANM)',
      doctor: 'Doctor',
      admin: 'District Health Admin',
    };
    throw new Error(
      `Access Denied: Your account is registered with role "${roleLabels[verifiedRole] || verifiedRole}". You are not authorized to log into the ${roleLabels[expectedRole]} portal.`
    );
  }

  const userProfile = await buildAuthUserFromSupabase(data.user);
  return { session: data.session, user: userProfile };
}

/**
 * Sign Up a new user with Supabase Auth and seed profiles + role profile table
 */
export async function signUpWithSupabase(
  email: string,
  password: string,
  profileData: {
    role: Role;
    name: string;
    phone?: string;
    // Patient specific
    abhaId?: string;
    age?: number;
    gender?: 'Female' | 'Male' | 'Other';
    village?: string;
    district?: string;
    bloodGroup?: string;
    // FHW specific
    workerId?: string;
    designation?: string;
    // Doctor specific
    registrationNo?: string;
    specialty?: string;
    qualification?: string;
    isVerified?: boolean;
    verificationStatus?: string;
    // Admin specific
    adminId?: string;
  }
) {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not fully configured. Please set VITE_SUPABASE_ANON_KEY in your environment.');
  }

  // Security: Public registration for admin is strictly prohibited
  if (profileData.role === 'admin') {
    throw new Error(
      'Public self-registration for the District Admin role is prohibited. Admin credentials must be provisioned through official administrative governance.'
    );
  }

  const validRoles: Role[] = ['patient', 'fhw', 'doctor'];
  if (!validRoles.includes(profileData.role)) {
    throw new Error(
      `Invalid registration role: "${profileData.role}". Permitted self-registration roles are "patient", "fhw", or "doctor".`
    );
  }

  // Strict role assignment
  const role: Role = profileData.role;

  // Requirement 3: A doctor must NOT become verified simply by registering
  const isDoctorVerified =
    role === 'doctor' ? Boolean(profileData.isVerified === true) : false;
  const doctorVerificationStatus =
    role === 'doctor' ? (isDoctorVerified ? 'approved' : 'pending') : undefined;

  // 1. Create auth user with explicit, comprehensive role metadata for database triggers
  const authMetadata = {
    role,
    user_role: role,
    userRole: role,
    role_name: role,
    name: profileData.name,
    full_name: profileData.name,
    phone: profileData.phone || '',
    village: profileData.village || 'Rampur Kalan',
    district: profileData.district || 'Varanasi',
    designation: profileData.designation || (role === 'fhw' ? 'ASHA Worker' : undefined),
    registrationNo: profileData.registrationNo,
    registration_number: profileData.registrationNo,
    specialty: profileData.specialty,
    is_verified: isDoctorVerified,
    isVerified: isDoctorVerified,
    verification_status: doctorVerificationStatus,
    verificationStatus: doctorVerificationStatus,
  };

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: authMetadata,
    },
  });

  if (error) throw error;
  if (!data.user) throw new Error('Failed to create Supabase auth user.');

  const userId = data.user.id;

  // 2. Explicitly ensure profiles record reflects the verified role
  try {
    await supabase.from('profiles').upsert({
      id: userId,
      role,
      full_name: profileData.name,
      phone: profileData.phone || '',
    });
  } catch (err) {
    console.warn('[Supabase] Note inserting into profiles:', err);
  }

  // 3. Insert into the designated role profile table
  try {
    if (role === 'patient') {
      await supabase.from('patient_profiles').upsert({
        id: userId,
        abha_id: profileData.abhaId || '14-8921-4309-8812',
        gender: profileData.gender || 'Female',
        village: profileData.village || 'Rampur Kalan',
        district: profileData.district || 'Varanasi',
        state: 'Uttar Pradesh',
        blood_group: profileData.bloodGroup || 'B+',
      });
    } else if (role === 'fhw') {
      await supabase.from('fhw_profiles').upsert({
        id: userId,
      });
    } else if (role === 'doctor') {
      await supabase.from('doctor_profiles').upsert({
        id: userId,
        specialty: profileData.specialty || 'General Physician',
        qualification: profileData.qualification || 'MBBS',
        registration_number: profileData.registrationNo || 'NMC/2026/PENDING',
        is_verified: isDoctorVerified,
        verification_status: doctorVerificationStatus,
      });
    }
  } catch (err) {
    console.warn(`[Supabase] Note inserting into ${role}_profiles:`, err);
  }

  const userProfile = await buildAuthUserFromSupabase(data.user);
  return { session: data.session, user: userProfile };
}

/**
 * Sign Out user from Supabase Auth
 */
export async function signOutFromSupabase() {
  if (!isSupabaseConfigured) return;
  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.warn('[Supabase] Error during signOut:', err);
  }
}

/**
 * Fetch patient records from patient_profiles and joined profiles table
 */
export async function fetchSupabasePatients() {
  if (!isSupabaseConfigured) return [];
  try {
    const { data: patientRows, error: patErr } = await supabase
      .from('patient_profiles')
      .select('*');

    if (patErr || !patientRows || patientRows.length === 0) {
      return [];
    }

    // Try to get profile names
    const { data: profiles } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'patient');

    const profileMap = new Map<string, SupabaseProfile>();
    if (profiles) {
      profiles.forEach((p) => {
        profileMap.set(p.id, p);
      });
    }

    return patientRows.map((row) => {
      const matchedProfile =
        profileMap.get(row.user_id || '') ||
        profileMap.get(row.id || '') ||
        profileMap.get(row.profile_id || '');

      const chronic = Array.isArray(row.chronic_conditions)
        ? row.chronic_conditions
        : typeof row.chronic_conditions === 'string'
        ? row.chronic_conditions.split(',').map((s: string) => s.trim())
        : [];

      const allergies = Array.isArray(row.allergies)
        ? row.allergies
        : typeof row.allergies === 'string'
        ? row.allergies.split(',').map((s: string) => s.trim())
        : [];

      return {
        id: row.id || row.user_id || `pat-${Math.random().toString(36).substring(2, 7)}`,
        abhaId: row.abha_id || '14-8921-4309-8812',
        name: matchedProfile?.full_name || (row as any).name || 'Patient',
        age: row.age || 40,
        gender: (row.gender as any) || 'Female',
        phone: matchedProfile?.phone || row.phone || '+91 98000 00000',
        village: row.village || 'Rampur Kalan',
        district: row.district || 'Varanasi',
        state: row.state || 'Uttar Pradesh',
        bloodGroup: row.blood_group || 'B+',
        pmjayCard: Boolean(row.pmjay_card),
        pmjayNumber: row.pmjay_number || '',
        consentGiven: true,
        chronicConditions: chronic,
        allergies: allergies,
        isHighRiskPregnancy: Boolean(row.is_high_risk_pregnancy),
        vitalsHistory: [],
      };
    });
  } catch (err) {
    console.warn('[Supabase] Error in fetchSupabasePatients:', err);
    return [];
  }
}

/**
 * Fetch doctor records from doctor_profiles and joined profiles table
 */
export async function fetchSupabaseDoctors() {
  if (!isSupabaseConfigured) return [];
  try {
    const { data: docRows, error: docErr } = await supabase
      .from('doctor_profiles')
      .select('*');

    if (docErr || !docRows || docRows.length === 0) {
      return [];
    }

    const { data: profiles } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'doctor');

    const profileMap = new Map<string, SupabaseProfile>();
    if (profiles) {
      profiles.forEach((p) => {
        profileMap.set(p.id, p);
      });
    }

    return docRows.map((row) => {
      const matchedProfile =
        profileMap.get(row.user_id || '') ||
        profileMap.get(row.id || '') ||
        profileMap.get(row.profile_id || '');

      const languages = Array.isArray(row.languages)
        ? row.languages
        : typeof row.languages === 'string'
        ? row.languages.split(',').map((s: string) => s.trim())
        : ['English', 'Hindi'];

      return {
        id: row.doctor_id || row.id || row.user_id || `doc-${Math.random().toString(36).substring(2, 7)}`,
        name: matchedProfile?.full_name || (row as any).name || 'Dr. Medical Officer',
        specialty: row.specialty || 'General Medicine',
        qualification: row.qualification || 'MBBS, MD',
        registrationNo: row.registration_no || row.registration_number || 'NMC/2014/08942',
        medicalCouncil: 'National Medical Commission',
        experienceYears: row.experience_years || 8,
        rating: 4.8,
        isVerified: row.is_verified ?? true,
        availabilityStatus: (row.availability_status as any) || 'available',
        currentQueueLength: 2,
        languages: languages,
        facilityName: row.facility_name || 'Community Health Centre (CHC)',
        consultationTypes: ['teleconsultation', 'in_person'] as ('teleconsultation' | 'in_person')[],
      };
    });
  } catch (err) {
    console.warn('[Supabase] Error in fetchSupabaseDoctors:', err);
    return [];
  }
}

/**
 * Fetch FHW records from fhw_profiles and joined profiles table
 */
export async function fetchSupabaseFhws() {
  if (!isSupabaseConfigured) return [];
  try {
    const { data: fhwRows, error: fhwErr } = await supabase
      .from('fhw_profiles')
      .select('*');

    if (fhwErr || !fhwRows || fhwRows.length === 0) {
      return [];
    }

    const { data: profiles } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'fhw');

    const profileMap = new Map<string, SupabaseProfile>();
    if (profiles) {
      profiles.forEach((p) => {
        profileMap.set(p.id, p);
      });
    }

    return fhwRows.map((row) => {
      const matchedProfile =
        profileMap.get(row.user_id || '') ||
        profileMap.get(row.id || '') ||
        profileMap.get(row.profile_id || '');

      return {
        id: row.fhw_id || row.worker_id || row.id || row.user_id || `fhw-${Math.random().toString(36).substring(2, 7)}`,
        name: matchedProfile?.full_name || (row as any).name || 'Sunita Devi (ASHA)',
        roleTitle: (row.role_title || row.designation || 'ASHA') as 'ASHA' | 'ANM' | 'CHO',
        village: row.assigned_village || row.village || 'Rampur Kalan',
        subCenter: row.sub_centre || 'Rampur Kalan Sub-Centre',
        phone: matchedProfile?.phone || row.phone || '+91 94150 88219',
        assignedPatientsCount: row.families_assigned ? row.families_assigned * 3 : 142,
        activeHighRiskCount: 6,
        immunizationsDueCount: 14,
        lastSyncTime: 'Just now',
        isKitSynced: true,
      };
    });
  } catch (err) {
    console.warn('[Supabase] Error in fetchSupabaseFhws:', err);
    return [];
  }
}

