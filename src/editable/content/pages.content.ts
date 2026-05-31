import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Buy, Sell, Rent, and Discover Trusted Listings',
      description: 'Explore classifieds, business listings, profiles, resources, and local opportunities in one modern marketplace interface.',
      openGraphTitle: 'Buy, Sell, Rent, and Discover Trusted Listings',
      openGraphDescription: 'Find opportunities, services, offers, and useful resources through a bold, searchable marketplace experience.',
      keywords: ['classified marketplace', 'business listings', 'sell online', 'rent and promote'],
    },
    hero: {
      badge: 'Marketplace highlights',
      title: ['A smarter way to buy, sell,', 'rent, promote, and discover.'],
      description: 'Search across active classifieds, business services, visual highlights, and practical resources in one unified destination.',
      primaryCta: { label: 'Explore classifieds', href: '/classified' },
      secondaryCta: { label: 'Browse businesses', href: '/listing' },
      searchPlaceholder: 'Search products, services, rentals, jobs, and offers',
      focusLabel: 'Live',
      featureCardBadge: 'featured this week',
      featureCardTitle: 'Fresh listings and offers update your homepage every day.',
      featureCardDescription: 'New posts, promotions, and service updates stay visible with a clear browsing structure.',
    },
    intro: {
      badge: 'About the platform',
      title: 'Built for practical discovery and faster decisions.',
      paragraphs: [
        'This site brings together buying, selling, renting, and promotion journeys into a single interface that is easier to navigate.',
        'Instead of splitting marketplace actions across disconnected pages, the platform keeps categories, listings, and resources linked in one flow.',
        'Whether someone starts with a classified post, service profile, or resource page, they can continue exploring without losing context.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Search-first homepage with clear category pathways.',
        'Connected sections for classifieds, listings, visuals, and resources.',
        'Faster browsing rhythm with multiple card patterns for scanning.',
        'Mobile-first interaction and clean pagination behavior.',
      ],
      primaryLink: { label: 'Browse classifieds', href: '/classified' },
      secondaryLink: { label: 'See listings', href: '/listing' },
    },
    cta: {
      badge: 'Start now',
      title: 'List, discover, and connect with the right audience.',
      description: 'From local services to products and promotions, publish and explore opportunities through one polished platform.',
      primaryCta: { label: 'Browse Classifieds', href: '/classified' },
      secondaryCta: { label: 'Contact Support', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'About the platform',
    title: 'A trusted place to buy, sell, rent, and advertise online.',
    description: `${slot4BrandConfig.siteName} helps people and businesses connect through practical listings, offers, and service discovery.`,
    paragraphs: [
      'Our mission is to make online marketplace discovery simpler, safer, and more useful for everyone.',
      'From local products and rental opportunities to business services and profile pages, every section is designed for quick decisions.',
      'We focus on clear categories, easy scanning, and reliable navigation so users can move from search to action without friction.',
    ],
    values: [
      {
        title: 'Action-first experience',
        description: 'People arrive here to do something specific. Our layouts prioritize discovery, trust cues, and fast next steps.',
      },
      {
        title: 'Connected marketplace sections',
        description: 'Classifieds, business listings, visuals, documents, and profiles remain linked so users can compare and decide easily.',
      },
      {
        title: 'Clarity and reliability',
        description: 'We keep interfaces clean, mobile-friendly, and straightforward so visitors can trust what they are browsing.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Talk to our team about listings, advertising, and platform support.',
    description: 'Use this page to ask questions, request help, report an issue, or discuss promotions. We respond based on the type of request so you get help faster.',
    formTitle: 'Send your request',
  },
  login: {
    title: 'Welcome back',
    subtitle: 'Sign in to manage your ads, listings, saved pages, and account activity.',
    points: [
      'Track your active posts and responses in one place.',
      'Edit classified ads and listing details anytime.',
      'Save searches and revisit relevant opportunities faster.',
    ],
  },
  signup: {
    title: 'Create your account',
    subtitle: 'Start posting offers, promoting services, and connecting with buyers or clients.',
    points: [
      'Publish classifieds and business listings in minutes.',
      'Build profile trust with complete account details.',
      'Manage conversations and updates from one dashboard.',
    ],
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested articles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
