import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const logo = typeof content.logo === 'string' ? content.logo : ''
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

export function EditorialFeatureCard({ post, href, label = 'Top Story' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className="group block min-w-0">
      <article>
        <div className="relative aspect-[16/10] overflow-hidden bg-[#f4f1f7]">
          <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
        </div>
        <p className="editable-kicker mt-3">{label}</p>
        <h3 className="editable-title-link mt-5 max-w-[760px] text-3xl font-black leading-tight sm:text-[2rem]">{post.title}</h3>
      </article>
    </Link>
  )
}

export function RailPostCard({ post, href }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group block min-w-0">
      <article>
        <div className="relative aspect-[16/9] overflow-hidden bg-[#f4f1f7]">
          <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
        </div>
        <p className="editable-kicker mt-2">{getEditableCategory(post)}</p>
        <h3 className="editable-title-link mt-2 line-clamp-3 text-base font-black leading-snug">{post.title}</h3>
      </article>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group flex min-w-0 gap-4">
      <span className="mt-1 text-2xl font-black text-[#7825c7]">{String(index + 1).padStart(2, '0')}</span>
      <article className="min-w-0">
        <p className="editable-kicker">{getEditableCategory(post)}</p>
        <h3 className="editable-title-link mt-2 line-clamp-3 text-lg font-black leading-tight">{post.title}</h3>
      </article>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid min-w-0 gap-5 sm:grid-cols-[110px_minmax(0,1fr)]">
      <div className="relative aspect-square overflow-hidden bg-[#f4f1f7]">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
      </div>
      <article className="min-w-0">
        <p className="editable-kicker">Story {String(index + 1).padStart(2, '0')}</p>
        <h2 className="editable-title-link mt-2 line-clamp-2 text-lg font-black leading-tight">{post.title}</h2>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#5c4a68]">{getEditableExcerpt(post, 125)}</p>
        <span className="mt-2 inline-flex items-center gap-1 text-xs font-black text-[#7825c7]">Read more <ArrowRight className="h-3.5 w-3.5" /></span>
      </article>
    </Link>
  )
}

// redesigned-ui-2026
