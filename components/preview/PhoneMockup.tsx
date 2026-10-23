'use client'

import React from 'react'
import { ProfileData, THEMES } from '@/types/linktree'
import { ProfileView } from './ProfileView'
import { Wifi, Battery } from 'lucide-react'

interface PhoneMockupProps {
  profile: ProfileData
  previewMode?: 'mobile' | 'desktop'
}

export function PhoneMockup({ profile, previewMode = 'mobile' }: PhoneMockupProps) {
  const currentTheme = THEMES.find((t) => t.id === profile.theme) || THEMES[0]

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full select-none">
      {/* Subtle ambient glow behind the mockup matching current theme */}
      <div
        className="absolute -inset-4 rounded-full opacity-25 blur-3xl transition-all duration-700 pointer-events-none -z-10"
        style={{ backgroundColor: currentTheme.accentColor }}
      />

      {previewMode === 'mobile' ? (
        /* Perfectly Centered Smartphone Device Frame with Decreased Width */
        <div className="relative w-[278px] sm:w-[298px] h-[540px] sm:h-[570px] max-h-[calc(100vh-4.5rem)] bg-zinc-950 rounded-[42px] p-2.5 shadow-2xl border-[4px] border-zinc-700/80 ring-1 ring-black/40 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden transition-all">
          {/* Dynamic Island / Notch */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 w-22 h-4.5 bg-black rounded-full flex items-center justify-between px-2.5 border border-zinc-800 shadow-inner">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-blue-950" />
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          {/* Status Bar */}
          <div className="relative z-20 flex items-center justify-between px-5 pt-1 pb-0.5 text-[10.5px] font-semibold text-zinc-400 select-none">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <Wifi className="w-3 h-3 text-zinc-400" />
              <Battery className="w-3.5 h-3.5 text-zinc-400" />
            </div>
          </div>

          {/* Screen Content Wrapper */}
          <div className="relative flex-1 w-full rounded-[32px] overflow-hidden overflow-y-auto no-scrollbar border border-zinc-800/40">
            <ProfileView profile={profile} interactive={true} compact={true} />
          </div>

          {/* Home indicator bar */}
          <div className="relative z-20 flex justify-center py-1 select-none">
            <div className="w-22 h-1 bg-zinc-600/60 rounded-full" />
          </div>
        </div>
      ) : (
        /* Perfectly Centered Desktop Web Mockup with Increased Size */
        <div className="w-full max-w-[360px] sm:max-w-[400px] h-[550px] sm:h-[585px] max-h-[calc(100vh-4.5rem)] rounded-2xl border border-border bg-card overflow-hidden shadow-2xl flex flex-col transition-all">
          {/* Browser Top Bar */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/80 border-b border-border shrink-0">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500/80" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
              <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
            </div>
            <div className="flex-1 bg-background text-muted-foreground text-[10px] px-2 py-0.5 rounded-md border border-border text-center truncate font-mono">
              ownbio.com/{profile.handle || 'username'}
            </div>
          </div>
          {/* Scrollable Desktop Preview */}
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <ProfileView profile={profile} interactive={true} compact={false} />
          </div>
        </div>
      )}
    </div>
  )
}
