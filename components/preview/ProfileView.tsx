'use client'

import React from 'react'
import { ProfileData, THEMES } from '@/types/linktree'
import { PlatformIcon } from './PlatformIcon'
import { ExternalLink, Sparkles, CheckCheck } from 'lucide-react'

interface ProfileViewProps {
  profile: ProfileData
  interactive?: boolean
  showPoweredBy?: boolean
  compact?: boolean
}

export function ProfileView({
  profile,
  interactive = true,
  showPoweredBy = true,
  compact = false
}: ProfileViewProps) {
  const currentTheme = THEMES.find((t) => t.id === profile.theme) || THEMES[0]
  const layout = profile.layout || 'classic'
  const shape = profile.avatarShape || 'circle'

  const getButtonRadius = () => {
    switch (profile.buttonStyle) {
      case 'pill':
        return 'rounded-full'
      case 'rounded':
        return compact ? 'rounded-lg' : 'rounded-2xl'
      case 'square':
        return 'rounded-md'
      case 'glass':
        return compact ? 'rounded-lg backdrop-blur-xl' : 'rounded-2xl backdrop-blur-xl'
      default:
        return 'rounded-full'
    }
  }

  const getShapeClasses = () => {
    switch (shape) {
      case 'squircle':
        return 'rounded-[26%]'
      case 'square':
        return 'rounded-2xl'
      case 'blob':
        return 'rounded-[60%_40%_30%_70%/60%_30%_70%_40%]'
      case 'diamond':
        return 'rotate-45'
      case 'circle':
      default:
        return 'rounded-full'
    }
  }

  const enabledLinks = (profile.links || []).filter((l) => l.enabled)
  const bannerImg = profile.bannerUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'

  return (
    <div
      className={`@container min-h-full w-full flex flex-col items-center justify-between transition-colors duration-500 no-scrollbar ${
        compact ? 'pb-3' : 'pb-6'
      } ${currentTheme.background}`}
    >
      <div className={`w-full flex flex-col items-center text-center ${compact ? 'max-w-[280px]' : 'max-w-md'}`}>
        
        {/* ========================================================================= */}
        {/* LAYOUT 1: BANNER LAYOUT */}
        {/* ========================================================================= */}
        {layout === 'banner' && (
          <div className="w-full flex flex-col items-center mb-2">
            {/* Cover Banner */}
            <div className={`relative w-full overflow-hidden ${compact ? 'h-20 rounded-t-[24px]' : 'h-28 sm:h-36 rounded-2xl'} bg-zinc-800`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={bannerImg} alt="Cover Banner" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
            </div>

            {/* Overlapping Avatar */}
            <div className={`relative ${compact ? '-mt-8 mb-1.5' : '-mt-11 mb-2'} group`}>
              <div
                className={`relative overflow-hidden border-4 border-background shadow-xl bg-zinc-800 ${getShapeClasses()} ${
                  compact ? 'w-15 h-15' : 'w-20 h-20 sm:w-22 sm:h-22'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className={`w-full h-full object-cover ${shape === 'diamond' ? '-rotate-45 scale-125' : ''}`}
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LAYOUT 2: HERO LAYOUT */}
        {/* ========================================================================= */}
        {layout === 'hero' && (
          <div className={`relative w-full overflow-hidden mb-3 ${compact ? 'h-36 rounded-2xl' : 'h-48 sm:h-56 rounded-3xl'} shadow-2xl`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={bannerImg || profile.avatarUrl} alt="Hero Portrait" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent flex flex-col justify-end p-3 text-left">
              <div className="flex items-center gap-1.5">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-white/40 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <h1 className={`font-bold tracking-tight text-white line-clamp-1 ${compact ? 'text-sm' : 'text-lg'}`}>
                      {profile.name}
                    </h1>
                    <span className="w-3 h-3 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0">
                      <CheckCheck className="w-2 h-2" />
                    </span>
                  </div>
                  <p className="text-[10px] text-white/80 font-mono">@{profile.handle}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LAYOUT 3: CUTOUT CARD LAYOUT */}
        {/* ========================================================================= */}
        {layout === 'cutout' && (
          <div className={`w-full ${compact ? 'mt-4 mb-3' : 'mt-4 mb-3'} p-3.5 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col items-center`}>
            <div
              className="absolute -top-10 -right-10 w-28 h-28 rounded-full opacity-30 blur-2xl pointer-events-none"
              style={{ backgroundColor: currentTheme.accentColor }}
            />
            {/* Floating Cutout Avatar Badge */}
            <div className="relative mb-2">
              <div
                className={`relative overflow-hidden border-2 border-white/40 shadow-xl bg-zinc-800 ${getShapeClasses()} ${
                  compact ? 'w-16 h-16' : 'w-20 h-20'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className={`w-full h-full object-cover ${shape === 'diamond' ? '-rotate-45 scale-125' : ''}`}
                />
              </div>
            </div>
            <div className="flex items-center gap-1">
              <h1 className={`font-bold tracking-tight font-sans ${currentTheme.textColor} ${compact ? 'text-sm' : 'text-lg'}`}>
                {profile.name || 'Your Name'}
              </h1>
              <span className="w-3 h-3 rounded-full bg-blue-500 text-white flex items-center justify-center">
                <CheckCheck className="w-2 h-2" />
              </span>
            </div>
            <p className={`font-mono text-[10px] mt-0.5 ${currentTheme.subTextColor}`}>
              @{profile.handle ? profile.handle.replace(/^@/, '') : 'username'}
            </p>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LAYOUT 4 & 5: CLASSIC & SHAPE LAYOUTS */}
        {/* ========================================================================= */}
        {(layout === 'classic' || layout === 'shape') && (
          <div className="flex flex-col items-center">
            {/* Profile Avatar with Custom Shape */}
            <div className={`relative group ${compact ? 'mb-2 mt-5.5' : 'mb-3.5 mt-4'}`}>
              <div
                className={`absolute -inset-1 opacity-60 blur-md transition duration-500 group-hover:opacity-100 animate-pulse ${
                  shape === 'diamond' ? 'rotate-45 rounded-lg' : 'rounded-full'
                }`}
                style={{ backgroundColor: currentTheme.accentColor }}
              />
              <div
                className={`relative overflow-hidden border-2 border-white/30 shadow-xl bg-zinc-800 ${getShapeClasses()} ${
                  compact ? 'w-16 h-16' : 'w-20 h-20 sm:w-22 sm:h-22'
                }`}
              >
                {profile.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                      shape === 'diamond' ? '-rotate-45 scale-125' : ''
                    }`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-lg sm:text-2xl font-bold text-white bg-zinc-700">
                    {profile.name?.charAt(0) || 'U'}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Name and Handle (Rendered for Classic, Banner, and Shape) */}
        {layout !== 'cutout' && layout !== 'hero' && (
          <div className={compact ? 'mb-1' : 'mb-2'}>
            <div className="flex items-center justify-center gap-1.5">
              <h1
                className={`font-bold tracking-tight font-sans ${currentTheme.textColor} ${
                  compact ? 'text-sm sm:text-base leading-snug' : 'text-lg sm:text-xl'
                }`}
              >
                {profile.name || 'Your Name'}
              </h1>
              <span
                className={`inline-flex items-center justify-center rounded-full bg-blue-500 text-white ${
                  compact ? 'w-3 h-3' : 'w-3.5 h-3.5'
                }`}
                title="Verified Creator"
              >
                <CheckCheck className={compact ? 'w-2 h-2' : 'w-2.5 h-2.5'} />
              </span>
            </div>
            <p
              className={`font-medium tracking-wide font-mono mt-0.5 ${currentTheme.subTextColor} ${
                compact ? 'text-[10px]' : 'text-xs'
              }`}
            >
              @{profile.handle ? profile.handle.replace(/^@/, '') : 'username'}
            </p>
          </div>
        )}

        {/* Bio Text */}
        {profile.bio && (
          <p
            className={`leading-relaxed font-normal ${currentTheme.subTextColor} ${
              compact
                ? 'text-[11px] max-w-[240px] mb-2.5 leading-snug line-clamp-3'
                : 'text-xs sm:text-sm max-w-sm mb-4'
            }`}
          >
            {profile.bio}
          </p>
        )}

        {/* Social Icons Bar */}
        {profile.socials && profile.socials.length > 0 && (
          <div className={`flex flex-wrap items-center justify-center ${compact ? 'gap-2 mb-3.5 px-1' : 'gap-2.5 mb-5'}`}>
            {profile.socials.map((social, idx) => (
              <a
                key={idx}
                href={interactive && social.url ? social.url : '#'}
                target={interactive ? '_blank' : undefined}
                rel="noreferrer"
                className={`rounded-full transition-all duration-200 border border-white/10 ${currentTheme.cardBg} ${currentTheme.cardHover} ${currentTheme.textColor} hover:scale-110 shadow-sm flex items-center justify-center shrink-0 ${
                  compact ? 'w-8 h-8' : 'w-9 h-9'
                }`}
                title={social.platform}
                onClick={(e) => {
                  if (!interactive) e.preventDefault()
                }}
              >
                <PlatformIcon name={social.platform} className={compact ? 'w-4 h-4' : 'w-4 h-4'} />
              </a>
            ))}
          </div>
        )}

        {/* Links List */}
        <div className={`w-full ${compact ? 'px-2.5 space-y-2' : 'px-4 space-y-2.5'}`}>
          {enabledLinks.length === 0 ? (
            <div
              className={`border border-dashed rounded-xl text-center opacity-70 ${
                compact ? 'p-3 text-[11px]' : 'p-5 text-xs'
              } ${currentTheme.textColor}`}
            >
              No links active. Add links in the editor.
            </div>
          ) : (
            enabledLinks.map((link) => {
              const radiusClass = getButtonRadius()
              const isHighlight = link.highlight

              return (
                <a
                  key={link.id}
                  href={interactive && link.url ? link.url : '#'}
                  target={interactive ? '_blank' : undefined}
                  rel="noreferrer"
                  onClick={(e) => {
                    if (!interactive) e.preventDefault()
                  }}
                  className={`group relative flex items-center justify-between w-full border transition-all duration-300 ${radiusClass} ${currentTheme.cardBg} ${currentTheme.cardBorder} ${currentTheme.cardHover} ${
                    isHighlight ? 'ring-2 ring-offset-1 ring-offset-transparent shadow-lg' : ''
                  } ${compact ? 'px-2 py-2' : 'px-3.5 py-2.5 sm:py-3'}`}
                  style={{
                    borderColor: isHighlight ? currentTheme.accentColor : undefined
                  }}
                >
                  {/* Left: Icon */}
                  <div
                    className={`flex items-center justify-center rounded-full shrink-0 ${
                      isHighlight ? 'bg-white/20' : 'bg-white/10'
                    } ${currentTheme.textColor} transition-transform group-hover:scale-110 ${
                      compact ? 'w-5.5 h-5.5' : 'w-7.5 h-7.5'
                    }`}
                  >
                    <PlatformIcon name={link.icon || link.title} className={compact ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
                  </div>

                  {/* Center: Title */}
                  <div className={`flex-1 min-w-0 ${compact ? 'px-1' : 'px-2'} text-center`}>
                    <span
                      className={`font-semibold tracking-tight line-clamp-1 ${currentTheme.textColor} ${
                        compact ? 'text-[11.5px] sm:text-xs' : 'text-xs sm:text-sm'
                      }`}
                    >
                      {link.title || 'Untitled Link'}
                    </span>
                  </div>

                  {/* Right: Sparkle Badge or External Link Arrow */}
                  <div
                    className={`flex items-center justify-center opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ${
                      currentTheme.textColor
                    } ${compact ? 'w-5.5 h-5.5' : 'w-7.5 h-7.5'}`}
                  >
                    {isHighlight ? (
                      <Sparkles
                        className={compact ? 'w-3 h-3' : 'w-3.5 h-3.5'}
                        style={{ color: currentTheme.accentColor }}
                      />
                    ) : (
                      <ExternalLink className={compact ? 'w-2.5 h-2.5' : 'w-3 h-3'} />
                    )}
                  </div>
                </a>
              )
            })
          )}
        </div>
      </div>

      {/* Powered by ownbio.com footer */}
      {showPoweredBy && (
        <div className={compact ? 'mt-3 pt-1 flex flex-col items-center' : 'mt-4 pt-2 flex flex-col items-center'}>
          <a
            href="/"
            className={`inline-flex items-center gap-1 rounded-full font-semibold tracking-wider text-white/70 bg-black/30 border border-white/10 hover:text-white hover:bg-black/50 transition-all backdrop-blur-md ${
              compact ? 'px-2 py-0.5 text-[9px]' : 'px-2.5 py-0.5 text-[10px]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>ownbio.com</span>
            <span className="text-white/40">•</span>
            <span className="text-white/60">Create yours</span>
          </a>
        </div>
      )}
    </div>
  )
}
