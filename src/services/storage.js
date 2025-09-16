const PROFILE_KEY = 'nebet.profile.v1'

export async function saveProfile(profile) {
  // Mock network latency
  await new Promise(res => setTimeout(res, 400))
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
  return profile
}

export function getProfile() {
  const raw = localStorage.getItem(PROFILE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}
