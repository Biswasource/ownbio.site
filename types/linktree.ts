export interface LinkItem {
  id: string
  title: string
  url: string
  icon?: string
  enabled: boolean
  highlight?: boolean
  clicks?: number
}

export interface SocialLink {
  platform: 'twitter' | 'github' | 'instagram' | 'youtube' | 'linkedin' | 'twitch' | 'discord' | 'spotify' | 'mail'
  url: string
}

export interface ThemeConfig {
  id: string
  name: string
  background: string
  cardBg: string
  cardBorder: string
  cardHover: string
  textColor: string
  subTextColor: string
  accentColor: string
  previewColor: string
}

export type ProfileLayout = 'classic' | 'hero' | 'banner' | 'cutout' | 'shape'
export type AvatarShape = 'circle' | 'squircle' | 'hexagon' | 'diamond' | 'blob' | 'square'

export interface ProfileData {
  name: string
  handle: string
  bio: string
  avatarUrl: string
  bannerUrl?: string
  layout: ProfileLayout
  avatarShape: AvatarShape
  theme: string
  buttonStyle: 'pill' | 'rounded' | 'square' | 'glass'
  links: LinkItem[]
  socials: SocialLink[]
}

export const THEMES: ThemeConfig[] = [
  {
    id: 'midnight',
    name: 'Midnight Glow',
    background: 'bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900',
    cardBg: 'bg-slate-900/80 backdrop-blur-md',
    cardBorder: 'border-purple-500/30 hover:border-purple-400/60 shadow-[0_0_20px_rgba(168,85,247,0.15)]',
    cardHover: 'hover:bg-purple-950/50 hover:scale-[1.02]',
    textColor: 'text-white',
    subTextColor: 'text-purple-200/70',
    accentColor: '#a855f7',
    previewColor: 'from-slate-950 to-purple-900'
  },
  {
    id: 'emerald',
    name: 'Emerald Luxe',
    background: 'bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950',
    cardBg: 'bg-emerald-950/60 backdrop-blur-md',
    cardBorder: 'border-emerald-500/30 hover:border-emerald-400/60 shadow-[0_0_20px_rgba(16,185,129,0.15)]',
    cardHover: 'hover:bg-emerald-900/40 hover:scale-[1.02]',
    textColor: 'text-white',
    subTextColor: 'text-emerald-200/70',
    accentColor: '#10b981',
    previewColor: 'from-emerald-950 to-teal-900'
  },
  {
    id: 'sunset',
    name: 'Sunset Mirage',
    background: 'bg-gradient-to-tr from-rose-950 via-purple-950 to-amber-950',
    cardBg: 'bg-rose-950/60 backdrop-blur-md',
    cardBorder: 'border-rose-500/30 hover:border-amber-400/60 shadow-[0_0_20px_rgba(244,63,94,0.15)]',
    cardHover: 'hover:bg-rose-900/40 hover:scale-[1.02]',
    textColor: 'text-white',
    subTextColor: 'text-rose-200/70',
    accentColor: '#f43f5e',
    previewColor: 'from-rose-900 to-amber-700'
  },
  {
    id: 'glass',
    name: 'Frosted Glass',
    background: 'bg-gradient-to-br from-zinc-900 via-zinc-950 to-black',
    cardBg: 'bg-white/10 backdrop-blur-xl',
    cardBorder: 'border-white/20 hover:border-white/40 shadow-xl',
    cardHover: 'hover:bg-white/15 hover:scale-[1.02]',
    textColor: 'text-white',
    subTextColor: 'text-zinc-400',
    accentColor: '#38bdf8',
    previewColor: 'from-zinc-800 to-zinc-950'
  },
  {
    id: 'cyber',
    name: 'Cyberpunk Neon',
    background: 'bg-[#0a0a0f]',
    cardBg: 'bg-[#12121e]',
    cardBorder: 'border-yellow-400/40 hover:border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.2)]',
    cardHover: 'hover:bg-yellow-400/10 hover:scale-[1.02]',
    textColor: 'text-yellow-300 font-mono',
    subTextColor: 'text-yellow-500/80',
    accentColor: '#facc15',
    previewColor: 'from-neutral-950 to-yellow-950'
  },
  {
    id: 'pure-light',
    name: 'Clean Silk',
    background: 'bg-gradient-to-br from-zinc-50 via-white to-zinc-100',
    cardBg: 'bg-white/90 shadow-sm border border-zinc-200',
    cardBorder: 'border-zinc-200 hover:border-zinc-400 hover:shadow-md',
    cardHover: 'hover:bg-zinc-50 hover:scale-[1.02]',
    textColor: 'text-zinc-900',
    subTextColor: 'text-zinc-500',
    accentColor: '#18181b',
    previewColor: 'from-zinc-100 to-zinc-300'
  }
]

export const DEFAULT_PROFILE: ProfileData = {
  name: 'Alex Rivera',
  handle: 'alexrivera',
  bio: 'Product Designer & Creative Technologist. Crafting minimal, interactive web experiences ✨',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  bannerUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  layout: 'classic',
  avatarShape: 'circle',
  theme: 'midnight',
  buttonStyle: 'pill',
  links: [
    {
      id: '1',
      title: '🚀 Check Out My New SaaS Project',
      url: 'https://github.com',
      icon: 'sparkles',
      enabled: true,
      highlight: true,
      clicks: 1420
    },
    {
      id: '2',
      title: '🎨 Design Portfolio & Case Studies',
      url: 'https://dribbble.com',
      icon: 'globe',
      enabled: true,
      clicks: 894
    },
    {
      id: '3',
      title: '🎥 YouTube: Modern UI/UX Tutorials',
      url: 'https://youtube.com',
      icon: 'youtube',
      enabled: true,
      clicks: 642
    },
    {
      id: '4',
      title: '📦 Free UI Kit on Figma',
      url: 'https://figma.com',
      icon: 'shopping-bag',
      enabled: true,
      clicks: 310
    },
    {
      id: '5',
      title: '☕ Support My Work (Buy Me a Coffee)',
      url: 'https://buymeacoffee.com',
      icon: 'heart',
      enabled: true,
      clicks: 195
    }
  ],
  socials: [
    { platform: 'twitter', url: 'https://twitter.com' },
    { platform: 'github', url: 'https://github.com' },
    { platform: 'instagram', url: 'https://instagram.com' },
    { platform: 'youtube', url: 'https://youtube.com' },
    { platform: 'linkedin', url: 'https://linkedin.com' }
  ]
}
