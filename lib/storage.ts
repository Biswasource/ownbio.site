import { ProfileData, DEFAULT_PROFILE } from '@/types/linktree'

const STORAGE_KEY = 'ownbio_profile_data'

export function getStoredProfile(): ProfileData {
  if (typeof window === 'undefined') {
    return DEFAULT_PROFILE
  }
  try {
    const item = window.localStorage.getItem(STORAGE_KEY) || window.localStorage.getItem('linktri_profile_data')
    if (!item) return DEFAULT_PROFILE
    const parsed = JSON.parse(item)
    return { ...DEFAULT_PROFILE, ...parsed }
  } catch (error) {
    console.error('Error reading stored profile:', error)
    return DEFAULT_PROFILE
  }
}

export function saveStoredProfile(profile: ProfileData): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
    // Also save by handle so dynamic routes like /[handle] can read it
    if (profile.handle) {
      const cleanHandle = profile.handle.replace(/^@/, '').toLowerCase().trim()
      window.localStorage.setItem(`ownbio_profile_${cleanHandle}`, JSON.stringify(profile))
    }
  } catch (error) {
    console.error('Error saving profile:', error)
  }
}

export function getProfileByHandle(handle: string): ProfileData | null {
  if (typeof window === 'undefined') return null
  const cleanHandle = handle.replace(/^@/, '').toLowerCase().trim()
  try {
    const item = window.localStorage.getItem(`ownbio_profile_${cleanHandle}`) || window.localStorage.getItem(`linktri_profile_${cleanHandle}`)
    if (item) return JSON.parse(item)
    const current = getStoredProfile()
    if (current.handle.replace(/^@/, '').toLowerCase().trim() === cleanHandle) {
      return current
    }
  } catch (e) {
    console.error(e)
  }
  return null
}

export const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80'
]

export const BANNER_PRESETS = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
]
