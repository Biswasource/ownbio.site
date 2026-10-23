'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { ProfileData, DEFAULT_PROFILE, THEMES } from '@/types/linktree'
import { getProfileByHandle, getStoredProfile } from '@/lib/storage'
import { ProfileView } from '@/components/preview/ProfileView'
import Link from 'next/link'
import { ArrowLeft, Share2, Check } from 'lucide-react'

function UserProfileInner() {
  const params = useParams()
  const rawHandle = typeof params?.handle === 'string' ? params.handle : Array.isArray(params?.handle) ? params.handle[0] : 'user'
  
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Try to load saved profile for this handle
    const found = getProfileByHandle(rawHandle)
    if (found) {
      setProfile(found)
    } else {
      // Fallback to active stored profile or dynamic profile
      const current = getStoredProfile()
      if (current.handle && current.handle.replace(/^@/, '').toLowerCase() === rawHandle.toLowerCase()) {
        setProfile(current)
      } else {
        setProfile({
          ...DEFAULT_PROFILE,
          handle: rawHandle,
          name: rawHandle.charAt(0).toUpperCase() + rawHandle.slice(1)
        })
      }
    }
  }, [rawHandle])

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-foreground">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-muted-foreground">Loading Profile...</span>
        </div>
      </div>
    )
  }

  const currentTheme = THEMES.find((t) => t.id === profile.theme) || THEMES[0]

  return (
    <div className={`min-h-screen w-full relative flex flex-col items-center justify-between transition-colors duration-500 overflow-x-hidden overflow-y-auto no-scrollbar ${currentTheme.background}`}>
      {/* Top Floating Action Bar */}
      <header className="fixed top-3.5 left-4 right-4 max-w-md mx-auto z-40 flex items-center justify-between pointer-events-none">
        <Link
          href="/create"
          className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-950/60 hover:bg-zinc-950/80 text-white/90 hover:text-white border border-white/15 text-xs font-medium backdrop-blur-xl shadow-lg transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Edit OwnBio</span>
        </Link>

        <button
          type="button"
          onClick={handleShare}
          className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-950/60 hover:bg-zinc-950/80 text-white/90 hover:text-white border border-white/15 text-xs font-medium backdrop-blur-xl shadow-lg transition-all"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </>
          )}
        </button>
      </header>

      {/* Main Full-page Profile View */}
      <main className="w-full flex-1 flex flex-col items-center justify-between pt-12 pb-4 no-scrollbar">
        <ProfileView profile={profile} interactive={true} showPoweredBy={true} compact={false} />
      </main>
    </div>
  )
}

export default function UserProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center text-foreground">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-muted-foreground">Loading Profile...</span>
          </div>
        </div>
      }
    >
      <UserProfileInner />
    </Suspense>
  )
}
