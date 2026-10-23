'use client'

import React, { useState } from 'react'
import {
  Settings,
  CreditCard,
  MessageSquare,
  Sparkles,
  Link2,
  Layers,
  Globe,
  CheckCircle2,
  X,
  ExternalLink,
  ChevronRight
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import { ProfileData } from '@/types/linktree'

interface HoverSidebarProps {
  profile?: ProfileData
}

export function HoverSidebar({ profile }: HoverSidebarProps) {
  const [activeModal, setActiveModal] = useState<'settings' | 'payments' | 'messages' | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  const cleanHandle = profile?.handle ? profile.handle.replace(/^@/, '') : 'user'

  return (
    <>
      {/* Floating Hover Expandable Sidebar */}
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed top-0 left-0 bottom-0 z-40 hidden md:flex flex-col justify-between py-3.5 px-2 bg-card/95 dark:bg-zinc-950/95 backdrop-blur-2xl border-r border-border shadow-2xl transition-all duration-300 ease-in-out select-none ${
          isHovered ? 'w-56 shadow-[0_20px_50px_rgba(0,0,0,0.6)] ring-1 ring-border/50' : 'w-14'
        }`}
      >
        {/* Top: Logo & Main Navigation Items */}
        <div className="flex flex-col gap-5">
          {/* Brand Icon & Name */}
          <div className="flex items-center gap-3 px-1 h-9 overflow-hidden">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-400 flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0">
              <Link2 className="w-4 h-4 text-zinc-950 stroke-[2.5]" />
            </div>
            <div className={`flex flex-col transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <span className="text-sm font-black tracking-tight font-sans text-foreground whitespace-nowrap">
                own<span className="text-emerald-500">bio</span><span className="text-emerald-400/70 text-xs font-semibold">.com</span>
              </span>
              <span className="text-[10px] text-muted-foreground font-mono -mt-0.5">Creator Studio</span>
            </div>
          </div>

          {/* Navigation Items: Studio, Messages, Payments, Settings */}
          <nav className="flex flex-col gap-1">
            {/* Active Studio View */}
            <div
              className={`group flex items-center gap-3 px-2 py-2 rounded-xl text-left overflow-hidden bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-semibold`}
              title="Studio Builder"
            >
              <div className="shrink-0 flex items-center justify-center w-6 h-6">
                <Layers className="w-4.5 h-4.5" />
              </div>
              <div className={`flex items-center justify-between flex-1 transition-opacity duration-200 whitespace-nowrap ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                <span className="text-xs font-semibold">Studio</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
            </div>

            {/* Messages Option */}
            <button
              type="button"
              onClick={() => setActiveModal('messages')}
              className={`group flex items-center gap-3 px-2 py-2 rounded-xl transition-all text-left overflow-hidden ${
                activeModal === 'messages'
                  ? 'bg-muted text-foreground font-semibold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/70'
              }`}
              title="Messages"
            >
              <div className="relative shrink-0 flex items-center justify-center w-6 h-6">
                <MessageSquare className="w-4.5 h-4.5 transition-transform group-hover:scale-110" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className={`flex items-center justify-between flex-1 transition-opacity duration-200 whitespace-nowrap ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                <span className="text-xs font-medium">Messages</span>
                <Badge variant="secondary" className="text-[10px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-0 h-4 px-1">
                  3 new
                </Badge>
              </div>
            </button>

            {/* Payments Option */}
            <button
              type="button"
              onClick={() => setActiveModal('payments')}
              className={`group flex items-center gap-3 px-2 py-2 rounded-xl transition-all text-left overflow-hidden ${
                activeModal === 'payments'
                  ? 'bg-muted text-foreground font-semibold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/70'
              }`}
              title="Payments & Tips"
            >
              <div className="shrink-0 flex items-center justify-center w-6 h-6">
                <CreditCard className="w-4.5 h-4.5 transition-transform group-hover:scale-110" />
              </div>
              <div className={`flex items-center justify-between flex-1 transition-opacity duration-200 whitespace-nowrap ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                <span className="text-xs font-medium">Payments</span>
                <span className="text-[10px] text-emerald-500 font-mono font-semibold">$1.4k</span>
              </div>
            </button>

            {/* Settings Option */}
            <button
              type="button"
              onClick={() => setActiveModal('settings')}
              className={`group flex items-center gap-3 px-2 py-2 rounded-xl transition-all text-left overflow-hidden ${
                activeModal === 'settings'
                  ? 'bg-muted text-foreground font-semibold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/70'
              }`}
              title="Settings"
            >
              <div className="shrink-0 flex items-center justify-center w-6 h-6">
                <Settings className="w-4.5 h-4.5 transition-transform group-hover:rotate-45" />
              </div>
              <div className={`flex items-center justify-between flex-1 transition-opacity duration-200 whitespace-nowrap ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                <span className="text-xs font-medium">Settings</span>
                <ChevronRight className="w-3 h-3 text-muted-foreground" />
              </div>
            </button>
          </nav>
        </div>

        {/* Bottom Profile Chip */}
        <div className="flex flex-col gap-2 pt-3 border-t border-border overflow-hidden">
          <div className="flex items-center gap-2.5 px-0.5">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-border shrink-0 bg-muted flex items-center justify-center">
              {profile?.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs font-bold text-foreground">
                  {profile?.name?.charAt(0) || 'U'}
                </span>
              )}
            </div>
            <div className={`flex flex-col min-w-0 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              <span className="text-xs font-semibold text-foreground truncate">
                {profile?.name || 'Creator'}
              </span>
              <span className="text-[10px] text-muted-foreground truncate font-mono">
                @{cleanHandle}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* MODAL 1: MESSAGES DIALOG */}
      <Dialog open={activeModal === 'messages'} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="sm:max-w-md bg-card border-border text-foreground">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base font-bold font-sans">
              <MessageSquare className="w-5 h-5 text-emerald-500" />
              Creator Inbox & Inquiries
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Messages and business inquiries submitted directly through your OwnBio page.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2.5 my-2">
            {[
              {
                sender: 'Elena Rostova',
                email: 'elena@designlab.io',
                time: '15m ago',
                subject: 'Sponsorship Collaboration',
                text: 'Loved your latest UI case study! Would you be open to featuring our design tool in your next tutorial?'
              },
              {
                sender: 'Marcus Chen',
                email: 'm.chen@venture.co',
                time: '2h ago',
                subject: 'Speaking invitation',
                text: 'We are hosting a developer roundtable next month and would love to have you as a guest speaker.'
              },
              {
                sender: 'Sophie Miller',
                email: 'sophie@community.xyz',
                time: '1d ago',
                subject: 'Coffee & quick question',
                text: 'Bought your UI kit yesterday—fantastic quality. Quick question regarding Figma tokens setup.'
              }
            ].map((msg, i) => (
              <div key={i} className="p-2.5 rounded-xl border border-border bg-muted/40 hover:bg-muted/70 transition-all">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-foreground">{msg.sender}</span>
                    <span className="text-[10px] text-muted-foreground font-mono">({msg.email})</span>
                  </div>
                  <span className="text-[10px] text-emerald-500 font-mono font-medium">{msg.time}</span>
                </div>
                <div className="text-xs font-medium text-foreground mb-0.5">{msg.subject}</div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{msg.text}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-border">
            <span className="text-xs text-muted-foreground">3 unread messages</span>
            <Button size="sm" onClick={() => setActiveModal(null)} className="h-8 text-xs bg-emerald-600 hover:bg-emerald-500 text-white">
              Mark all read
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* MODAL 2: PAYMENTS DIALOG */}
      <Dialog open={activeModal === 'payments'} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="sm:max-w-md bg-card border-border text-foreground">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base font-bold font-sans">
              <CreditCard className="w-5 h-5 text-purple-500" />
              Creator Payments & Tips
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Collect tips, sell digital products, and manage payouts directly through Stripe.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3.5 my-2">
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-purple-950/40 via-purple-900/20 to-zinc-900/50 border border-purple-500/30 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-purple-300 font-medium block">Available Balance</span>
                <span className="text-2xl font-black font-mono text-white">$1,480.00</span>
              </div>
              <Button size="sm" className="h-7.5 text-xs bg-purple-600 hover:bg-purple-500 text-white shadow-sm">
                Withdraw
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/40">
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-foreground block">Enable Tip Jar on OwnBio</span>
                <span className="text-[10px] text-muted-foreground block">Allow visitors to send tips with 1 click</span>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold text-muted-foreground">Payout Method</Label>
              <div className="flex items-center justify-between p-2 rounded-xl border border-border bg-background">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    S
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-foreground">Stripe Connect</span>
                    <span className="text-[10px] text-emerald-500">Connected • Ready</span>
                  </div>
                </div>
                <Badge variant="outline" className="text-[10px]">Instant</Badge>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-border">
            <Button size="sm" variant="outline" onClick={() => setActiveModal(null)} className="h-8 text-xs">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* MODAL 3: SETTINGS DIALOG */}
      <Dialog open={activeModal === 'settings'} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="sm:max-w-md bg-card border-border text-foreground">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base font-bold font-sans">
              <Settings className="w-5 h-5 text-blue-500" />
              Settings & Custom Domain
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Configure custom domain, SEO metadata, and indexing controls.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 my-2">
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-500" />
                Custom Domain
              </Label>
              <div className="flex gap-2">
                <Input placeholder="links.yourdomain.com" className="h-8 text-xs bg-background border-input" />
                <Button size="sm" variant="outline" className="h-8 text-xs shrink-0">
                  Connect
                </Button>
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold text-foreground">Page SEO Meta Title</Label>
              <Input placeholder="Page Meta Title" defaultValue="Alex Rivera • Creator & Designer Portfolio" className="h-8 text-xs bg-background border-input" />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold text-foreground">Meta Description</Label>
              <Input placeholder="Meta Description" defaultValue="Explore my projects, case studies, social channels, and latest digital products." className="h-8 text-xs bg-background border-input" />
            </div>

            <div className="space-y-2 pt-2 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground font-medium">Search Engine Indexing</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground font-medium">Analytics & Tracking</span>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <Button size="sm" onClick={() => setActiveModal(null)} className="h-8 text-xs bg-emerald-600 hover:bg-emerald-500 text-white">
              Save Settings
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
