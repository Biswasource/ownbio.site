'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ProfileData, DEFAULT_PROFILE } from '@/types/linktree'
import { getStoredProfile, saveStoredProfile } from '@/lib/storage'
import { ProfileEditor } from '@/components/editor/ProfileEditor'
import { PhoneMockup } from '@/components/preview/PhoneMockup'
import { ThemeToggle } from '@/components/ThemeToggle'
import { HoverSidebar } from '@/components/navigation/HoverSidebar'
import { Button } from '@/components/ui/button'
import {
  Link2,
  ExternalLink,
  Copy,
  Check,
  Eye
} from 'lucide-react'

export default function CreatePage() {
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE)
  const [isLoaded, setIsLoaded] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'dirty'>('saved')
  const [copied, setCopied] = useState(false)
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor')
  const [previewMode, setPreviewMode] = useState<'mobile' | 'desktop'>('mobile')

  // Load stored profile upon hydration
  useEffect(() => {
    const saved = getStoredProfile()
    setProfile(saved)
    setIsLoaded(true)
  }, [])

  // Auto-save changes to localStorage with slight debounce
  const handleProfileChange = (newProfile: ProfileData) => {
    setProfile(newProfile)
    setSaveStatus('dirty')
    saveStoredProfile(newProfile)
    setTimeout(() => {
      setSaveStatus('saved')
    }, 400)
  }

  const handleReset = () => {
    if (confirm('Are you sure you want to reset your OwnBio to default demo values?')) {
      handleProfileChange(DEFAULT_PROFILE)
    }
  }

  const handleCopyLink = () => {
    const cleanHandle = profile.handle ? profile.handle.replace(/^@/, '') : 'user'
    const fullUrl = `${window.location.origin}/${cleanHandle}`
    navigator.clipboard.writeText(fullUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isLoaded) {
    return (
      <div className="h-screen w-screen bg-background flex items-center justify-center text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">Loading OwnBio Studio...</span>
        </div>
      </div>
    )
  }

  const cleanHandle = profile.handle ? profile.handle.replace(/^@/, '') : 'user'

  return (
    <div className="h-screen max-h-screen w-screen overflow-hidden bg-background text-foreground flex flex-col selection:bg-emerald-500/30 transition-colors duration-200 no-scrollbar md:pl-14">
      {/* Floating Expandable Hover Sidebar */}
      <HoverSidebar profile={profile} />

      {/* Top Studio Navbar - Clean SaaS Breadcrumb & Controls */}
      <header className="shrink-0 z-30 w-full border-b border-border bg-background/80 backdrop-blur-xl h-13 px-4 sm:px-6 flex items-center justify-between">
        <div className="max-w-6xl w-full mx-auto flex items-center justify-between gap-3">
          {/* Left: Contextual Breadcrumb & Live Handle */}
          <div className="flex items-center gap-2.5">
            {/* Mobile Logo Only */}
            <Link
              href="/"
              className="flex md:hidden items-center gap-1.5 group transition-opacity hover:opacity-90"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-400 flex items-center justify-center shadow-sm">
                <Link2 className="w-3.5 h-3.5 text-zinc-950 stroke-[2.5]" />
              </div>
              <span className="text-sm font-bold font-sans">own<span className="text-emerald-500">bio</span></span>
            </Link>

            {/* Desktop Breadcrumb */}
            <div className="hidden md:flex items-center gap-2 text-xs">
              <span className="font-semibold text-muted-foreground">Studio</span>
              <span className="text-muted-foreground/40">/</span>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-muted/80 border border-border">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-foreground font-medium">ownbio.com/{cleanHandle}</span>
              </div>
            </div>
          </div>

          {/* Right: Theme Toggle, Save Dot, Share, View Live */}
          <div className="flex items-center gap-2">
            {/* Auto-save status */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground mr-1">
              <span className={`w-2 h-2 rounded-full ${saveStatus === 'saved' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
              <span className="text-[11px]">{saveStatus === 'saved' ? 'Saved' : 'Saving...'}</span>
            </div>

            {/* Light / Dark Mode Toggle */}
            <ThemeToggle />

            {/* Quick Share Link */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              className="border-border text-foreground text-xs rounded-lg h-8 px-2.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                  <span className="text-emerald-500 font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1" />
                  <span>Share</span>
                </>
              )}
            </Button>

            {/* View Live Page */}
            <Link
              href={`/${cleanHandle}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm h-8"
            >
              <span>View Live</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile View Toggle Bar */}
      <div className="lg:hidden shrink-0 flex border-b border-border bg-background">
        <button
          type="button"
          onClick={() => setMobileTab('editor')}
          className={`flex-1 py-1.5 text-xs font-semibold text-center border-b-2 transition-all ${
            mobileTab === 'editor'
              ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-muted/50'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Editor
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('preview')}
          className={`flex-1 py-1.5 text-xs font-semibold text-center border-b-2 transition-all flex items-center justify-center gap-1.5 ${
            mobileTab === 'preview'
              ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-muted/50'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          Live Preview
        </button>
      </div>

      {/* Main Studio Body: Locked to viewport height, no window scrollbar */}
      <main className="flex-1 overflow-hidden max-w-6xl w-full mx-auto px-4 sm:px-6 py-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-start">
          {/* Left Column: Editor with independent hidden-scrollbar scrolling */}
          <div className={`lg:col-span-7 xl:col-span-7 h-full overflow-y-auto no-scrollbar pb-10 pr-1 ${mobileTab === 'editor' ? 'block' : 'hidden lg:block'}`}>
            <ProfileEditor
              profile={profile}
              onChange={handleProfileChange}
              onReset={handleReset}
              previewMode={previewMode}
              onPreviewModeChange={setPreviewMode}
              onCopyLink={handleCopyLink}
              copied={copied}
            />
          </div>

          {/* Right Column: Centered Preview Mockup perfectly framed */}
          <div className={`lg:col-span-5 xl:col-span-5 h-full flex flex-col items-center justify-center overflow-hidden ${mobileTab === 'preview' ? 'block' : 'hidden lg:block'}`}>
            <PhoneMockup profile={profile} previewMode={previewMode} />
          </div>
        </div>
      </main>
    </div>
  )
}
