import type { TaskKey } from '@/lib/site-config'

export type TaskPageVoice = {
  eyebrow: string
  headline: string
  description: string
  filterLabel: string
  secondaryNote: string
  chips: string[]
}

export const taskPageVoices = {
  article: {
    eyebrow: 'Insight hub',
    headline: 'Guides, updates, and practical reads in one stream.',
    description: 'Use this section to browse ideas, explainers, and trend-driven reads with clear navigation and quick scanning.',
    filterLabel: 'Choose topic',
    secondaryNote: 'Built for long reads with faster discovery.',
    chips: ['Editorial', 'Guides', 'Market trends'],
  },
  classified: {
    eyebrow: 'Live marketplace',
    headline: 'Buy, sell, rent, and find local deals fast.',
    description: 'Classified browsing should feel fast, direct, and practical, with clear categories, strong scan patterns, and quick next actions.',
    filterLabel: 'Filter category',
    secondaryNote: 'Prioritize urgency and clarity over extra decoration.',
    chips: ['Buy', 'Sell', 'Rent'],
  },
  sbm: {
    eyebrow: 'Useful links',
    headline: 'Curated bookmarks and reference collections.',
    description: 'Bookmark pages help people collect helpful sites, resources, and services in tidy, searchable groups.',
    filterLabel: 'Filter collection',
    secondaryNote: 'Quick access to practical resources.',
    chips: ['Collections', 'References', 'Utilities'],
  },
  profile: {
    eyebrow: 'People directory',
    headline: 'Profiles with clear identity and contact pathways.',
    description: 'Profile pages should make professionals, creators, and businesses easy to discover and compare.',
    filterLabel: 'Filter profiles',
    secondaryNote: 'Show trust cues and role information first.',
    chips: ['Identity', 'Contact', 'Discovery'],
  },
  pdf: {
    eyebrow: 'Document center',
    headline: 'Downloadable files, guides, and reports in one place.',
    description: 'Document pages should look like a useful file library with clear labels and quick access actions.',
    filterLabel: 'Filter files',
    secondaryNote: 'Organized for practical retrieval.',
    chips: ['PDF', 'Guides', 'Library'],
  },
  listing: {
    eyebrow: 'Business finder',
    headline: 'Explore companies, services, and trusted providers.',
    description: 'Listing pages should behave like a modern directory with location context, service cues, and clear call options.',
    filterLabel: 'Filter businesses',
    secondaryNote: 'Support compare-first decision making.',
    chips: ['Directory', 'Services', 'Local search'],
  },
  image: {
    eyebrow: 'Visual board',
    headline: 'Image-led updates with strong gallery browsing.',
    description: 'Image sections should be media-first and easy to skim, with supporting text kept short and useful.',
    filterLabel: 'Filter visuals',
    secondaryNote: 'Let visuals do the storytelling.',
    chips: ['Gallery', 'Media first', 'Highlights'],
  },
} satisfies Record<TaskKey, TaskPageVoice>
