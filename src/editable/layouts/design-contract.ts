import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#ffffff',
  '--slot4-page-text': '#160022',
  '--slot4-panel-bg': '#ffffff',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#4c355a',
  '--slot4-soft-muted-text': '#6a5873',
  '--slot4-accent': '#7b22c8',
  '--slot4-accent-fill': '#7825c7',
  '--slot4-accent-soft': '#f1e7ff',
  '--slot4-dark-bg': '#340055',
  '--slot4-dark-text': '#f7f3ff',
  '--slot4-media-bg': '#f4f1f7',
  '--slot4-cream': '#ffffff',
  '--slot4-warm': '#ffffff',
  '--slot4-lavender': '#ffffff',
  '--slot4-gray': '#ffffff',
  '--slot4-body-gradient': 'linear-gradient(180deg, #ffffff 0%, #ffffff 100%)',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[#7825c7]',
  darkBorder: 'border-white/18',
  shadow: 'shadow-[0_18px_58px_rgba(43,24,77,0.12)]',
  shadowStrong: 'shadow-[0_28px_90px_rgba(20,10,38,0.35)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(17,10,29,0.01),rgba(17,10,29,0.72))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen bg-white ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-12 sm:py-14 lg:py-16',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center',
    rail: 'grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
    minRailCard: 'min-w-0',
  },
  type: {
    eyebrow: 'text-xs font-extrabold tracking-[0.01em]',
    heroTitle: 'text-4xl font-black leading-[1.02] sm:text-5xl lg:text-[3.4rem]',
    sectionTitle: 'text-3xl font-black sm:text-4xl',
    body: 'text-base leading-relaxed',
  },
  surface: {
    card: `${editablePalette.surfaceBg}`,
    soft: `${editablePalette.surfaceBg}`,
    dark: `${editablePalette.darkBg} ${editablePalette.darkText}`,
  },
  button: {
    primary: `inline-flex items-center justify-center gap-2 rounded-md ${editablePalette.accentBg} px-8 py-3.5 text-sm font-bold text-white transition hover:bg-[#340055]`,
    secondary: `inline-flex items-center justify-center rounded-md border ${editablePalette.border} ${editablePalette.surfaceBg} px-8 py-3.5 text-sm font-bold ${editablePalette.surfaceText} transition hover:bg-[#f7f0ff]`,
    accent: `inline-flex items-center justify-center rounded-md ${editablePalette.accentBg} px-8 py-3.5 text-sm font-bold text-white transition hover:bg-[#340055]`,
  },
  media: {
    frame: `relative overflow-hidden ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/5]',
  },
  motion: {
    lift: 'transition duration-300 hover:opacity-80',
    fade: 'transition duration-300 hover:opacity-85',
  },
} as const

export const aiLayoutRules = [
  'Keep all redesign changes inside src/editable and preserve all current exported names.',
  'Use a purple masthead clean-magazine structure inspired by the provided news reference.',
  'Always render missing image, summary, and category using safe fallbacks.',
  'Mix featured, compact, horizontal, list, and image-first card styles in the same page.',
  'Keep routes and post data compatibility by using existing helper functions.',
] as const

// redesigned-ui-2026-05-28
