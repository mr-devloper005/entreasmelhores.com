import { slot4BrandConfig } from './brand.config'

export type Slot4VisualPreset =
  | 'luxury-directory'
  | 'editorial-classified'
  | 'clean-magazine'
  | 'dark-premium'

export const visualPresets = {
  'luxury-directory': {
    label: 'Purple Newsstand',
    mood: 'clean headline grid for classifieds and discovery',
    fontDirection: 'bold geometric sans for headlines and compact metadata',
    colors: {
      background: '#ffffff',
      foreground: '#160022',
      muted: '#5c4a68',
      primary: '#340055',
      accent: '#7825c7',
      surface: '#ffffff',
    },
    shape: 'flat cards, thick purple rules, wide editorial spacing',
  },
  'editorial-classified': {
    label: 'Editorial Classified',
    mood: 'newsroom clarity with listing speed',
    fontDirection: 'modern serif heads and clean sans body',
    colors: {
      background: '#ffffff',
      foreground: '#160022',
      muted: '#5c4a68',
      primary: '#340055',
      accent: '#7825c7',
      surface: '#ffffff',
    },
    shape: 'framed sections with soft rails',
  },
  'clean-magazine': {
    label: 'Clean Magazine',
    mood: 'airy discovery with high contrast calls to action',
    fontDirection: 'wide display headers and readable system sans',
    colors: {
      background: '#ffffff',
      foreground: '#160022',
      muted: '#5c4a68',
      primary: '#340055',
      accent: '#7825c7',
      surface: '#ffffff',
    },
    shape: 'modular layout blocks and image-first grids',
  },
  'dark-premium': {
    label: 'Dark Premium',
    mood: 'high-end catalog with bold neon accents',
    fontDirection: 'condensed headline + mono metadata',
    colors: {
      background: '#120b1f',
      foreground: '#f7f1ff',
      muted: '#b9a4d1',
      primary: '#792ca2',
      accent: '#e05454',
      surface: '#201431',
    },
    shape: 'glassmorphism and cinematic cards',
  },
} as const

export const visualSystem = {
  productKind: slot4BrandConfig.productKind,
  recommendedPreset: 'luxury-directory',
  radius: {
    sm: '0.75rem',
    md: '1.25rem',
    lg: '1.75rem',
    xl: '2.5rem',
  },
  motion: {
    pageLoad: 'animate-in fade-in duration-500',
    cardHover: 'transition duration-300 hover:-translate-y-1 hover:shadow-2xl',
    softHover: 'transition duration-300 hover:opacity-90',
    reduceMotionSafe: 'motion-reduce:transform-none motion-reduce:transition-none',
  },
  typography: {
    eyebrow: 'text-xs font-bold uppercase tracking-[0.2em]',
    heroTitle: 'text-5xl font-black tracking-[-0.05em] sm:text-6xl lg:text-7xl',
    sectionTitle: 'text-3xl font-black tracking-[-0.04em] sm:text-4xl',
    body: 'text-base leading-8',
    caption: 'text-xs font-semibold uppercase tracking-[0.16em]',
  },
  surfaces: {
    glass: 'border border-white/15 bg-white/10 backdrop-blur-xl',
    paper: 'border border-black/10 bg-white shadow-[0_18px_54px_rgba(59,35,92,0.12)]',
    quiet: 'border border-black/8 bg-black/[0.03]',
    dark: 'border border-white/10 bg-black/30 shadow-[0_24px_70px_rgba(0,0,0,0.28)]',
  },
  layout: {
    page: 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
    sectionY: 'py-12 sm:py-16 lg:py-20',
    cardGrid: 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3',
  },
} as const

export function getVisualPreset(name: Slot4VisualPreset = visualSystem.recommendedPreset as Slot4VisualPreset) {
  return visualPresets[name]
}

// redesigned-ui-2026-05-28
