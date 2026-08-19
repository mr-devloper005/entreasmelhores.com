import { siteIdentity } from '@/config/site.identity'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'

const { recipe } = getFactoryState()
const productKind = getProductKind(recipe)

export const slot4BrandConfig = {
  siteName: siteIdentity.name,
  tagline: siteIdentity.tagline,
  description: siteIdentity.description,
  domain: siteIdentity.domain,
  baseUrl: siteIdentity.url,
  logo: (siteIdentity as { logo?: string }).logo ?? '/logo.png',
  productKind,
  ogImage: siteIdentity.ogImage,
  accents:
    productKind === 'visual'
      ? { primary: '#7825c7', surface: '#340055' }
      : productKind === 'editorial'
        ? { primary: '#7825c7', surface: '#ffffff' }
        : productKind === 'directory'
          ? { primary: '#7825c7', surface: '#ffffff' }
          : { primary: '#7825c7', surface: '#ffffff' },
} as const

// redesigned-ui-2026-05-28
