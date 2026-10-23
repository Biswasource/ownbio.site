'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Link2,
  Sparkles,
  ArrowRight,
  Smartphone,
  Palette,
  Share2,
  Zap,
  CheckCircle2,
  Layers,
  ShieldCheck,
  TrendingUp,
  ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { saveStoredProfile, getStoredProfile } from '@/lib/storage'

import { ThemeToggle } from '@/components/ThemeToggle'

export default function HomePage() {
  const router = useRouter()
  const [handle, setHandle] = useState('')

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault()
    const clean = handle.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '')
    if (clean) {
      const current = getStoredProfile()
      saveStoredProfile({ ...current, handle: clean })
    }
    router.push('/create')
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-emerald-500/30 overflow-hidden flex flex-col transition-colors duration-200">
      {/* Background ambient glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-emerald-600/15 via-purple-600/10 to-transparent blur-[120px] pointer-events-none -z-10" />

      {/* Navigation Header */}
      <nav className="w-full border-b border-border bg-background/70 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-400 flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <Link2 className="w-5 h-5 text-zinc-950 stroke-[2.5]" />
            </div>
            <span className="text-xl font-black tracking-tight font-sans">
              own<span className="text-emerald-500">bio</span><span className="text-emerald-400/70 text-sm font-semibold">.com</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/create"
              className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-muted hover:bg-muted/80 text-foreground border border-border transition-all"
            >
              Studio
            </Link>
            <Link
              href="/create"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition-all shadow-md shadow-emerald-500/20"
            >
              <span>Create your OwnBio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 sm:pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto w-full flex-1 flex flex-col items-center text-center">
        <Badge
          variant="outline"
          className="mb-6 px-3.5 py-1.5 rounded-full border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs sm:text-sm font-medium flex items-center gap-2 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>The Next Generation Bio Link for Creators</span>
        </Badge>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1] mb-6">
          Everything you are.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            In one simple link.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Join creators, artists, and builders sharing their social profiles, digital products, newsletters, and projects with a sleek personalized OwnBio page.
        </p>

        {/* Claim Handle Bar */}
        <form onSubmit={handleClaim} className="w-full max-w-md mx-auto mb-12">
          <div className="p-1.5 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl flex items-center gap-2 focus-within:border-emerald-500/60 transition-all">
            <div className="flex items-center pl-3 text-zinc-500 font-mono text-sm select-none">
              ownbio.com/
            </div>
            <Input
              type="text"
              placeholder="yourname"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              className="border-0 bg-transparent text-white placeholder:text-zinc-600 focus-visible:ring-0 text-sm h-10 px-1 font-medium"
            />
            <Button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-5 h-10 rounded-xl text-sm shrink-0 shadow-lg shadow-emerald-500/20"
            >
              Claim ownbio.com
            </Button>
          </div>
          <p className="text-xs text-zinc-500 mt-2">
            Free forever • Instant setup • No credit card required
          </p>
        </form>

        {/* Live Interactive Preview Teaser Card */}
        <div className="w-full max-w-4xl mx-auto rounded-3xl p-6 sm:p-8 bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl shadow-2xl relative overflow-hidden mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left items-center">
            <div className="md:col-span-2 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Live Studio Builder Included
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Left side controls, real-time live phone preview on the right.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Add and reorder links, customize themes (Midnight, Emerald, Sunset, Glassmorphism, Cyberpunk), toggle button shapes, and see changes in real-time.
              </p>
              <div className="pt-2">
                <Link
                  href="/create"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-zinc-950 font-bold text-sm hover:bg-zinc-200 transition-all shadow-md"
                >
                  <span>Launch Creator Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Mini preview illustration */}
            <div className="relative mx-auto w-48 sm:w-56 h-72 rounded-[32px] bg-zinc-950 border-4 border-zinc-700/60 p-2 shadow-2xl flex flex-col justify-between">
              <div className="w-16 h-3 bg-zinc-800 rounded-full mx-auto" />
              <div className="flex flex-col items-center gap-2 py-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 border border-white/20" />
                <div className="w-20 h-2.5 bg-zinc-700 rounded-full" />
                <div className="w-14 h-2 bg-zinc-800 rounded-full" />
                <div className="w-full space-y-1.5 mt-2 px-1">
                  <div className="w-full h-7 bg-zinc-800/80 rounded-xl border border-zinc-700/50 flex items-center justify-center text-[9px] text-zinc-300 font-medium">
                    🚀 SaaS Portfolio
                  </div>
                  <div className="w-full h-7 bg-zinc-800/80 rounded-xl border border-zinc-700/50 flex items-center justify-center text-[9px] text-zinc-300 font-medium">
                    🎥 YouTube Channel
                  </div>
                  <div className="w-full h-7 bg-zinc-800/80 rounded-xl border border-zinc-700/50 flex items-center justify-center text-[9px] text-zinc-300 font-medium">
                    📦 Digital Downloads
                  </div>
                </div>
              </div>
              <div className="w-16 h-1 bg-zinc-700 rounded-full mx-auto" />
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl text-left">
          <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-1">Mobile Optimized</h3>
            <p className="text-xs text-zinc-400">
              Looks flawless on all iOS and Android phones with ultra-responsive layout and snappy interactions.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-1">Curated Themes</h3>
            <p className="text-xs text-zinc-400">
              Select between Midnight Nebula, Frosted Glass, Cyberpunk, Emerald Zen, and more in 1 click.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-1">Instant Publishing</h3>
            <p className="text-xs text-zinc-400">
              Share your custom URL ownbio.com/yourhandle with zero build step or wait time.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 py-6 px-4 sm:px-6 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-300">ownbio.com</span>
            <span>• Linktree Alternative Studio</span>
          </div>
          <div>
            Built with Next.js, Tailwind CSS & shadcn/ui
          </div>
        </div>
      </footer>
    </div>
  )
}
