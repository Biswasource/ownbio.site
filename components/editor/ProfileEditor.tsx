'use client'

import React, { useState } from 'react'
import { ProfileData, LinkItem, SocialLink, THEMES } from '@/types/linktree'
import { AVATAR_PRESETS, BANNER_PRESETS } from '@/lib/storage'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { PlatformIcon } from '../preview/PlatformIcon'
import {
  Plus,
  Trash2,
  Sparkles,
  Link2,
  User,
  Palette,
  ArrowUp,
  ArrowDown,
  Check,
  RotateCcw,
  Share2,
  Layers,
  Image as ImageIcon,
  Smartphone,
  Monitor,
  ExternalLink,
  Copy,
  Layout
} from 'lucide-react'

interface ProfileEditorProps {
  profile: ProfileData
  onChange: (updated: ProfileData) => void
  onReset: () => void
  previewMode?: 'mobile' | 'desktop'
  onPreviewModeChange?: (mode: 'mobile' | 'desktop') => void
  onCopyLink?: () => void
  copied?: boolean
}

const ICON_OPTIONS = [
  'globe',
  'sparkles',
  'youtube',
  'twitter',
  'github',
  'instagram',
  'linkedin',
  'spotify',
  'shopping-bag',
  'heart',
  'mail',
  'discord'
]

export function ProfileEditor({
  profile,
  onChange,
  onReset,
  previewMode = 'mobile',
  onPreviewModeChange,
  onCopyLink,
  copied = false
}: ProfileEditorProps) {
  const [activeTab, setActiveTab] = useState<string>('links')

  const updateField = <K extends keyof ProfileData>(key: K, value: ProfileData[K]) => {
    onChange({
      ...profile,
      [key]: value
    })
  }

  // Handle addition of a new link
  const handleAddLink = () => {
    const newLink: LinkItem = {
      id: Date.now().toString(),
      title: 'New Link',
      url: 'https://',
      icon: 'globe',
      enabled: true,
      highlight: false,
      clicks: 0
    }
    updateField('links', [newLink, ...profile.links])
    setActiveTab('links')
  }

  // Handle update of a link
  const handleUpdateLink = (id: string, updates: Partial<LinkItem>) => {
    const updated = profile.links.map((link) => (link.id === id ? { ...link, ...updates } : link))
    updateField('links', updated)
  }

  // Handle delete of a link
  const handleDeleteLink = (id: string) => {
    updateField('links', profile.links.filter((link) => link.id !== id))
  }

  // Move link up/down
  const handleMoveLink = (index: number, direction: 'up' | 'down') => {
    const newLinks = [...profile.links]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= newLinks.length) return
    const temp = newLinks[index]
    newLinks[index] = newLinks[targetIndex]
    newLinks[targetIndex] = temp
    updateField('links', newLinks)
  }

  // Handle socials update
  const handleUpdateSocial = (platform: SocialLink['platform'], url: string) => {
    const existing = profile.socials.find((s) => s.platform === platform)
    let updatedSocials: SocialLink[]
    if (existing) {
      if (!url.trim()) {
        updatedSocials = profile.socials.filter((s) => s.platform !== platform)
      } else {
        updatedSocials = profile.socials.map((s) => (s.platform === platform ? { ...s, url } : s))
      }
    } else {
      if (url.trim()) {
        updatedSocials = [...profile.socials, { platform, url }]
      } else {
        updatedSocials = profile.socials
      }
    }
    updateField('socials', updatedSocials)
  }

  const getSocialValue = (platform: SocialLink['platform']) => {
    return profile.socials.find((s) => s.platform === platform)?.url || ''
  }

  return (
    <div className="space-y-4">
      {/* Top Banner / Heading */}
      <div className="flex flex-col gap-2.5 pb-3 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-foreground font-sans">
                OwnBio Studio
              </h1>
              <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-xs font-medium">
                Live
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Personalize your name, handle, bio, links, and styling.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onReset}
              className="text-xs border-border text-muted-foreground hover:text-foreground h-7.5 px-2.5"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Reset
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleAddLink}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-sm h-7.5 px-3"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add Link
            </Button>
          </div>
        </div>

        {/* Mobile & Desktop Preview Switcher, Copy, and Open Options on Left Side */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1 bg-muted/90 p-0.5 rounded-lg border border-border">
            <button
              type="button"
              onClick={() => onPreviewModeChange?.('mobile')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                previewMode === 'mobile'
                  ? 'bg-background text-foreground shadow-sm font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
            <button
              type="button"
              onClick={() => onPreviewModeChange?.('desktop')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                previewMode === 'desktop'
                  ? 'bg-background text-foreground shadow-sm font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onCopyLink}
              className="h-7.5 text-xs border-border text-foreground hover:bg-muted px-2.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                  <span className="text-emerald-500 font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1" />
                  <span>Copy Link</span>
                </>
              )}
            </Button>

            <a
              href={`/${profile.handle ? profile.handle.replace(/^@/, '') : 'user'}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm h-7.5"
            >
              <span>Open</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* SHADCN TABS COMPONENT */}
      <Tabs
        value={activeTab}
        onValueChange={(val) => {
          if (val) setActiveTab(val as string)
        }}
        className="w-full space-y-4"
      >
        <TabsList className="w-full grid grid-cols-4 h-10 p-1 bg-muted/80 rounded-xl border border-border">
          <TabsTrigger
            value="links"
            className="text-xs font-semibold gap-1.5 rounded-lg data-active:bg-background data-active:text-foreground data-active:shadow-sm"
          >
            <Link2 className="w-3.5 h-3.5 text-emerald-500" />
            <span className="truncate">Links ({profile.links.length})</span>
          </TabsTrigger>

          <TabsTrigger
            value="profile"
            className="text-xs font-semibold gap-1.5 rounded-lg data-active:bg-background data-active:text-foreground data-active:shadow-sm"
          >
            <User className="w-3.5 h-3.5 text-blue-500" />
            <span className="truncate">Profile</span>
          </TabsTrigger>

          <TabsTrigger
            value="appearance"
            className="text-xs font-semibold gap-1.5 rounded-lg data-active:bg-background data-active:text-foreground data-active:shadow-sm"
          >
            <Palette className="w-3.5 h-3.5 text-purple-500" />
            <span className="truncate">Themes</span>
          </TabsTrigger>

          <TabsTrigger
            value="socials"
            className="text-xs font-semibold gap-1.5 rounded-lg data-active:bg-background data-active:text-foreground data-active:shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5 text-amber-500" />
            <span className="truncate">Socials</span>
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: LINKS */}
        <TabsContent value="links" className="space-y-3 pt-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Manage Links ({profile.links.length})
            </span>
            <Button
              type="button"
              size="sm"
              onClick={handleAddLink}
              className="h-7 text-xs bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg"
            >
              <Plus className="w-3 h-3 mr-1" />
              Add Link
            </Button>
          </div>

          {profile.links.length === 0 ? (
            <div className="p-6 border border-dashed border-border rounded-xl text-center bg-card">
              <Link2 className="w-6 h-6 text-muted-foreground mx-auto mb-1.5" />
              <h3 className="text-xs font-semibold text-foreground">No links added yet</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5 mb-3">
                Add your social links, website, portfolio, or store.
              </p>
              <Button type="button" size="sm" onClick={handleAddLink} className="h-8 text-xs bg-emerald-600 hover:bg-emerald-500 text-white">
                <Plus className="w-3.5 h-3.5 mr-1" /> Create Link
              </Button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {profile.links.map((link, index) => (
                <div
                  key={link.id}
                  className="bg-card border border-border rounded-xl p-3.5 transition-all hover:border-muted-foreground/30 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2.5 mb-2.5">
                    {/* Reordering buttons & icon */}
                    <div className="flex items-center gap-1.5">
                      <div className="flex flex-col gap-0.5">
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() => handleMoveLink(index, 'up')}
                          className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent"
                          title="Move up"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          disabled={index === profile.links.length - 1}
                          onClick={() => handleMoveLink(index, 'down')}
                          className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent"
                          title="Move down"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center text-foreground">
                        <PlatformIcon name={link.icon || link.title} className="w-4 h-4 text-emerald-500" />
                      </div>
                    </div>

                    {/* Enable toggle and delete */}
                    <div className="flex items-center gap-2.5">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span>Show</span>
                        <Switch
                          checked={link.enabled}
                          onCheckedChange={(checked) => handleUpdateLink(link.id, { enabled: checked })}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteLink(link.id)}
                        className="p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                        title="Delete link"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Title & URL inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-2.5">
                    <div className="space-y-1">
                      <Label className="text-[11px] font-semibold text-muted-foreground">Link Title</Label>
                      <Input
                        value={link.title}
                        onChange={(e) => handleUpdateLink(link.id, { title: e.target.value })}
                        placeholder="e.g. My Portfolio"
                        className="bg-background border-input text-foreground rounded-lg text-xs h-8.5"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[11px] font-semibold text-muted-foreground">URL</Label>
                      <Input
                        value={link.url}
                        onChange={(e) => handleUpdateLink(link.id, { url: e.target.value })}
                        placeholder="https://"
                        className="bg-background border-input text-foreground rounded-lg text-xs h-8.5 font-mono"
                      />
                    </div>
                  </div>

                  {/* Icon Selector & Featured Highlight */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border text-xs">
                    <div className="flex items-center gap-1 overflow-x-auto py-0.5">
                      <span className="text-[10px] text-muted-foreground mr-1">Icon:</span>
                      {ICON_OPTIONS.map((iconName) => (
                        <button
                          key={iconName}
                          type="button"
                          onClick={() => handleUpdateLink(link.id, { icon: iconName })}
                          className={`p-1 rounded-md border transition-all ${
                            (link.icon || 'globe') === iconName
                              ? 'bg-muted border-emerald-500 text-emerald-500 scale-105'
                              : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted'
                          }`}
                          title={iconName}
                        >
                          <PlatformIcon name={iconName} className="w-3 h-3" />
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleUpdateLink(link.id, { highlight: !link.highlight })}
                      className={`flex items-center gap-1 px-2 py-0.5 rounded-md border text-xs font-medium transition-all ${
                        link.highlight
                          ? 'bg-purple-500/10 border-purple-500/50 text-purple-600 dark:text-purple-300'
                          : 'border-border text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Sparkles className="w-3 h-3 text-purple-500" />
                      <span>{link.highlight ? 'Highlighted' : 'Feature'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* TAB 2: PROFILE DETAILS */}
        <TabsContent value="profile" className="space-y-3.5 pt-1">
          {/* PROFILE HEADER LAYOUT SELECTOR */}
          <Card className="bg-card border-border text-card-foreground shadow-sm">
            <CardHeader className="pb-2 pt-3 px-3.5">
              <CardTitle className="text-xs sm:text-sm font-semibold flex items-center gap-1.5 font-sans">
                <Layout className="w-4 h-4 text-emerald-500" />
                Profile Header Layout
              </CardTitle>
              <CardDescription className="text-[11px] text-muted-foreground">
                Choose your layout style: Classic, Hero, Banner, Cutout, or Shape.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-3.5 pb-3.5 space-y-3">
              {/* 5 Layout Option Buttons */}
              <div className="grid grid-cols-5 gap-1.5">
                {[
                  {
                    id: 'classic',
                    label: 'Classic',
                    desc: 'Centered',
                    preview: (
                      <div className="w-5 h-5 rounded-full border-2 border-emerald-500 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      </div>
                    )
                  },
                  {
                    id: 'hero',
                    label: 'Hero',
                    desc: 'Portrait',
                    preview: (
                      <div className="w-7 h-5 rounded bg-gradient-to-t from-purple-600 to-indigo-500 flex items-end p-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>
                    )
                  },
                  {
                    id: 'banner',
                    label: 'Banner',
                    desc: 'Cover',
                    preview: (
                      <div className="w-7 h-5 flex flex-col items-center">
                        <div className="w-full h-2.5 rounded-t bg-cyan-600" />
                        <div className="w-2.5 h-2.5 rounded-full bg-white -mt-1 border border-black/40" />
                      </div>
                    )
                  },
                  {
                    id: 'cutout',
                    label: 'Cutout',
                    desc: 'Glass Card',
                    preview: (
                      <div className="w-6 h-5 rounded border border-dashed border-amber-500 flex items-center justify-center bg-amber-500/10">
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                      </div>
                    )
                  },
                  {
                    id: 'shape',
                    label: 'Shape',
                    desc: 'Geometry',
                    preview: (
                      <div className="w-4.5 h-4.5 rounded-sm rotate-45 border-2 border-pink-500 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 -rotate-45 bg-pink-500 rounded-xs" />
                      </div>
                    )
                  }
                ].map((item) => {
                  const isSelected = (profile.layout || 'classic') === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => updateField('layout', item.id as ProfileData['layout'])}
                      className={`flex flex-col items-center justify-center p-1.5 rounded-xl border transition-all text-center gap-1 ${
                        isSelected
                          ? 'bg-muted border-emerald-500 text-foreground font-semibold ring-2 ring-emerald-500/20 shadow-sm'
                          : 'bg-card border-border text-muted-foreground hover:text-foreground hover:bg-muted/40'
                      }`}
                    >
                      <div className="h-6 flex items-center justify-center">{item.preview}</div>
                      <span className="text-[11px] leading-tight font-medium">{item.label}</span>
                    </button>
                  )
                })}
              </div>

              {/* Cover Banner Image Input (Displayed when Banner or Hero is selected) */}
              {((profile.layout === 'banner') || (profile.layout === 'hero')) && (
                <div className="pt-2 border-t border-border space-y-2">
                  <Label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-cyan-500" />
                    Cover Banner Image URL
                  </Label>
                  <Input
                    placeholder="https://example.com/cover-banner.jpg"
                    value={profile.bannerUrl || ''}
                    onChange={(e) => updateField('bannerUrl', e.target.value)}
                    className="bg-background border-input text-foreground rounded-lg text-xs h-8 font-mono"
                  />
                  <div>
                    <span className="text-[10px] text-muted-foreground block mb-1">
                      Or select a curated cover banner:
                    </span>
                    <div className="grid grid-cols-5 gap-1.5">
                      {BANNER_PRESETS.map((banner, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => updateField('bannerUrl', banner)}
                          className={`relative h-9 rounded-lg overflow-hidden border-2 transition-all ${
                            profile.bannerUrl === banner
                              ? 'border-emerald-500 ring-2 ring-emerald-500/30 scale-105'
                              : 'border-border opacity-70 hover:opacity-100'
                          }`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={banner} alt={`Banner ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Avatar Border Shape Selector */}
              <div className="pt-2 border-t border-border space-y-1.5">
                <Label className="text-xs font-semibold text-foreground">
                  Avatar Border Shape
                </Label>
                <div className="grid grid-cols-5 gap-1.5">
                  {[
                    { id: 'circle', label: 'Circle', shapeClass: 'rounded-full' },
                    { id: 'squircle', label: 'Squircle', shapeClass: 'rounded-[28%]' },
                    { id: 'diamond', label: 'Diamond', shapeClass: 'rotate-45 rounded-xs scale-85' },
                    { id: 'blob', label: 'Blob', shapeClass: 'rounded-[60%_40%_30%_70%/60%_30%_70%_40%]' },
                    { id: 'square', label: 'Square', shapeClass: 'rounded-md' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => updateField('avatarShape', s.id as ProfileData['avatarShape'])}
                      className={`p-1.5 rounded-lg border text-center flex flex-col items-center gap-1 transition-all ${
                        (profile.avatarShape || 'circle') === s.id
                          ? 'bg-muted border-emerald-500 text-foreground font-semibold ring-2 ring-emerald-500/20'
                          : 'bg-card border-border text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-muted-foreground/30 border border-muted-foreground/60 ${s.shapeClass}`} />
                      <span className="text-[10px]">{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PROFILE IDENTITY CARD */}
          <Card className="bg-card border-border text-card-foreground shadow-sm">
            <CardHeader className="pb-2 pt-3 px-3.5">
              <CardTitle className="text-xs sm:text-sm font-semibold flex items-center gap-1.5 font-sans">
                <User className="w-4 h-4 text-blue-500" />
                Profile Identity
              </CardTitle>
              <CardDescription className="text-[11px] text-muted-foreground">
                Your name, handle username, and profile headline.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3.5 px-3.5 pb-3.5">
              {/* Display Name */}
              <div className="space-y-1.5">
                <Label htmlFor="display-name" className="text-xs font-semibold text-foreground">
                  Display Name
                </Label>
                <Input
                  id="display-name"
                  placeholder="e.g. Alex Rivera"
                  value={profile.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="bg-background border-input text-foreground rounded-lg h-9 text-xs"
                />
              </div>

              {/* Handle Name */}
              <div className="space-y-1.5">
                <Label htmlFor="handle-name" className="text-xs font-semibold text-foreground">
                  Username / Handle
                </Label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-xs font-medium text-muted-foreground select-none">
                    ownbio.com/
                  </span>
                  <Input
                    id="handle-name"
                    placeholder="yourhandle"
                    value={profile.handle.replace(/^@/, '')}
                    onChange={(e) => {
                      const sanitized = e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '')
                      updateField('handle', sanitized)
                    }}
                    className="pl-26 bg-background border-input text-foreground rounded-lg font-mono text-xs h-9"
                  />
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Public URL: <span className="text-emerald-500 font-mono">ownbio.com/{profile.handle || 'username'}</span>
                </p>
              </div>

              {/* Bio */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="bio-input" className="text-xs font-semibold text-foreground">
                    Bio / Headline
                  </Label>
                  <span className="text-[10px] text-muted-foreground">
                    {profile.bio.length} / 160
                  </span>
                </div>
                <Textarea
                  id="bio-input"
                  placeholder="Tell your visitors who you are and what you do..."
                  value={profile.bio}
                  maxLength={160}
                  rows={2}
                  onChange={(e) => updateField('bio', e.target.value)}
                  className="bg-background border-input text-foreground rounded-lg text-xs"
                />
              </div>

              {/* Avatar Presets */}
              <div className="space-y-2 pt-2 border-t border-border">
                <Label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-muted-foreground" />
                  Profile Photo URL & Presets
                </Label>
                <Input
                  placeholder="https://example.com/avatar.jpg"
                  value={profile.avatarUrl}
                  onChange={(e) => updateField('avatarUrl', e.target.value)}
                  className="bg-background border-input text-foreground rounded-lg text-xs h-8.5"
                />

                <div className="pt-1">
                  <span className="text-[10px] text-muted-foreground block mb-1.5">Or choose an avatar preset:</span>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {AVATAR_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => updateField('avatarUrl', preset)}
                        className={`relative w-9 h-9 rounded-full overflow-hidden border-2 transition-all shrink-0 ${
                          profile.avatarUrl === preset
                            ? 'border-emerald-500 ring-2 ring-emerald-500/30 scale-105'
                            : 'border-border opacity-70 hover:opacity-100'
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={preset} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: THEMES & STYLE */}
        <TabsContent value="appearance" className="space-y-4 pt-1">
          <Card className="bg-card border-border text-card-foreground shadow-sm">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-sm font-semibold flex items-center gap-2 font-sans">
                <Palette className="w-4 h-4 text-purple-500" />
                Theme Presets
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Select a visual theme for your profile links.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {THEMES.map((theme) => {
                  const isSelected = profile.theme === theme.id
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => updateField('theme', theme.id)}
                      className={`relative flex flex-col items-center p-2 rounded-xl border-2 transition-all text-left ${
                        isSelected
                          ? 'border-emerald-500 bg-muted/80 shadow-md ring-2 ring-emerald-500/20'
                          : 'border-border bg-card hover:border-muted-foreground/30'
                      }`}
                    >
                      <div className={`w-full h-12 rounded-lg bg-gradient-to-br ${theme.previewColor} mb-1.5 shadow-inner border border-white/10 flex items-center justify-center`}>
                        <div className="w-12 h-2.5 rounded-full bg-white/20 backdrop-blur-sm" />
                      </div>
                      <div className="w-full flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-foreground truncate">{theme.name}</span>
                        {isSelected && (
                          <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Button Style selector */}
          <Card className="bg-card border-border text-card-foreground shadow-sm">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-sm font-semibold flex items-center gap-2 font-sans">
                <Layers className="w-4 h-4 text-blue-500" />
                Button Corner Style
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'pill', label: 'Pill', radius: 'rounded-full' },
                  { id: 'rounded', label: 'Smooth', radius: 'rounded-lg' },
                  { id: 'glass', label: 'Glass', radius: 'rounded-lg border-white/30' },
                  { id: 'square', label: 'Box', radius: 'rounded-sm' }
                ].map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => updateField('buttonStyle', style.id as ProfileData['buttonStyle'])}
                    className={`p-2 rounded-lg border transition-all text-center flex flex-col items-center gap-1.5 ${
                      profile.buttonStyle === style.id
                        ? 'bg-muted border-blue-500 text-foreground font-semibold ring-2 ring-blue-500/20'
                        : 'bg-card border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <div className={`w-10 h-4.5 border border-muted-foreground/40 bg-muted ${style.radius}`} />
                    <span className="text-[11px]">{style.label}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 4: SOCIAL ICONS */}
        <TabsContent value="socials" className="space-y-3 pt-1">
          <Card className="bg-card border-border text-card-foreground shadow-sm">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-sm font-semibold flex items-center gap-2 font-sans">
                <Share2 className="w-4 h-4 text-amber-500" />
                Social Profiles Bar
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Add profile links to show clean social icons below your bio.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2.5 px-4 pb-4">
              {[
                { platform: 'twitter', label: 'X / Twitter', placeholder: 'https://x.com/username' },
                { platform: 'github', label: 'GitHub', placeholder: 'https://github.com/username' },
                { platform: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/username' },
                { platform: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/@channel' },
                { platform: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/username' },
                { platform: 'spotify', label: 'Spotify', placeholder: 'https://open.spotify.com/artist/...' },
                { platform: 'discord', label: 'Discord', placeholder: 'https://discord.gg/invite' },
                { platform: 'mail', label: 'Email', placeholder: 'mailto:you@example.com' }
              ].map(({ platform, placeholder }) => (
                <div key={platform} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center shrink-0 text-foreground">
                    <PlatformIcon name={platform} className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder={placeholder}
                      value={getSocialValue(platform as SocialLink['platform'])}
                      onChange={(e) => handleUpdateSocial(platform as SocialLink['platform'], e.target.value)}
                      className="bg-background border-input text-foreground rounded-lg text-xs h-8.5 font-mono"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
