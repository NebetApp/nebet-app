const PATIENT_KEY = 'nebet.patient.v1'
const ORGANIZATION_KEY = 'nebet.organization.v1'
const CURRENT_ROLE_KEY = 'nebet.current_role'

// Funciones para pacientes
export async function savePatientProfile(profile) {
  // Mock network latency
  await new Promise(res => setTimeout(res, 400))
  const patientData = {
    ...profile,
    role: 'patient',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  localStorage.setItem(PATIENT_KEY, JSON.stringify(patientData))
  localStorage.setItem(CURRENT_ROLE_KEY, 'patient')
  return patientData
}

export function getPatientProfile() {
  const raw = localStorage.getItem(PATIENT_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export async function updatePatientProfile(updatedProfile) {
  // Mock network latency
  await new Promise(res => setTimeout(res, 400))
  const patientData = {
    ...updatedProfile,
    role: 'patient',
    updatedAt: new Date().toISOString()
  }
  localStorage.setItem(PATIENT_KEY, JSON.stringify(patientData))
  return patientData
}

// Funciones para organizaciones
export async function saveOrganizationProfile(profile) {
  // Mock network latency
  await new Promise(res => setTimeout(res, 200))
  const organizationData = {
    ...profile,
    role: 'organization',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  localStorage.setItem(ORGANIZATION_KEY, JSON.stringify(organizationData))
  localStorage.setItem(CURRENT_ROLE_KEY, 'organization')
  return organizationData
}

export function getOrganizationProfile() {
  const raw = localStorage.getItem(ORGANIZATION_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

// Funciones de rol actual
export function getCurrentRole() {
  return localStorage.getItem(CURRENT_ROLE_KEY)
}

export function setCurrentRole(role) {
  localStorage.setItem(CURRENT_ROLE_KEY, role)
}

// Función legacy para compatibilidad
export async function saveProfile(profile) {
  return await savePatientProfile(profile)
}

export function getProfile() {
  return getPatientProfile()
}

// Función para obtener todos los pacientes (para el dashboard de organización)
export function getAllPatients() {
  const patients = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith('nebet.patient.v1')) {
      try {
        const patientData = JSON.parse(localStorage.getItem(key))
        if (patientData && patientData.role === 'patient') {
          patients.push(patientData)
        }
      } catch (error) {
        console.error('Error parsing patient data:', error)
      }
    }
  }
  return patients
}
