import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Discover listings, services, and opportunities',
    description: slot4BrandConfig.description,
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
    logo: slot4BrandConfig.logo,
  },
  nav: {
    tagline: slot4BrandConfig.tagline,
    primaryLinks: [
      { label: 'News', href: '/article' },
      { label: 'Classifieds', href: '/classified' },
      { label: 'Directory', href: '/listing' },
      { label: 'Gallery', href: '/image' },
    ],
    actions: {
      primary: { label: 'Sign-up', href: '/signup' },
      secondary: { label: 'Contact', href: '/contact' },
    },
  },
  footer: {
    tagline: slot4BrandConfig.tagline,
    description: slot4BrandConfig.description,
    columns: [
      {
        title: 'Marketplace',
        links: [
          { label: 'Classifieds', href: '/classified' },
          { label: 'Business Listings', href: '/listing' },
          { label: 'Profiles', href: '/profile' },
          { label: 'Documents', href: '/pdf' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
          { label: 'Comments', href: '/comments' },
        ],
      },
    ],
    bottomNote: slot4BrandConfig.description,
  },
  commonLabels: {
    readMore: 'Open details',
    viewAll: 'View all',
    explore: 'Explore now',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const

// redesigned-ui-2026-05-28
