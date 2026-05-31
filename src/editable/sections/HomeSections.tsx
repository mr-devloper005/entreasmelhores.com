import Link from 'next/link'
import { Search } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { getEditableCategory, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="editable-section-heading">{children}</h2>
}

function Source({ post }: { post: SitePost }) {
  return <p className="editable-kicker">{getEditableCategory(post)}</p>
}

function SmallImageCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group block min-w-0">
      <div className="aspect-[16/9] overflow-hidden bg-[#f4f1f7]">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
      </div>
      <Source post={post} />
      <h3 className="editable-title-link mt-2 line-clamp-3 text-base font-black leading-snug">{post.title}</h3>
    </Link>
  )
}

function ListCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group grid min-w-0 grid-cols-[76px_minmax(0,1fr)] gap-5">
      <img src={getEditablePostImage(post)} alt={post.title} className="h-[76px] w-[76px] object-cover" />
      <div className="min-w-0">
        <Source post={post} />
        <h3 className="editable-title-link mt-2 line-clamp-2 text-base font-black leading-tight">{post.title}</h3>
      </div>
    </Link>
  )
}

function LeadPair({ posts, primaryTask, primaryRoute }: { posts: SitePost[]; primaryTask: TaskKey; primaryRoute: string }) {
  const [lead, ...side] = posts
  if (!lead) return null
  return (
    <div className="grid gap-3 lg:grid-cols-[1.55fr_0.78fr]">
      <Link href={postHref(primaryTask, lead, primaryRoute)} className="group block">
        <img src={getEditablePostImage(lead)} alt={lead.title} className="aspect-[16/10] w-full object-cover transition duration-300 group-hover:opacity-90" />
        <Source post={lead} />
        <h3 className="editable-title-link mt-5 max-w-3xl text-3xl font-black leading-tight sm:text-[2rem]">{lead.title}</h3>
      </Link>
      <div className="grid gap-8">
        {side.slice(0, 2).map((post, index) => (
          <Link key={post.id || post.slug || index} href={postHref(primaryTask, post, primaryRoute)} className="group block">
            <img src={getEditablePostImage(post)} alt={post.title} className="aspect-[16/9] w-full object-cover transition duration-300 group-hover:opacity-90" />
            <Source post={post} />
            <h3 className="editable-title-link mt-3 line-clamp-3 text-xl font-black leading-tight">{post.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}

function CategoryBlock({ title, posts, primaryTask, primaryRoute }: { title: string; posts: SitePost[]; primaryTask: TaskKey; primaryRoute: string }) {
  const [lead, ...rest] = posts
  if (!lead) return null
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
      <SectionTitle>{title}</SectionTitle>
      <div className="mt-5 grid gap-3 lg:grid-cols-[1.35fr_0.68fr]">
        <Link href={postHref(primaryTask, lead, primaryRoute)} className="group block">
          <img src={getEditablePostImage(lead)} alt={lead.title} className="aspect-[16/9] w-full object-cover transition duration-300 group-hover:opacity-90" />
          <Source post={lead} />
          <h3 className="editable-title-link mt-5 max-w-3xl text-3xl font-black leading-tight">{lead.title}</h3>
        </Link>
        <div className="grid gap-6">
          {rest.slice(0, 2).map((post, index) => <SmallImageCard key={post.id || post.slug || index} post={post} href={postHref(primaryTask, post, primaryRoute)} />)}
        </div>
      </div>
      <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {rest.slice(2, 8).map((post, index) => <SmallImageCard key={post.id || post.slug || index} post={post} href={postHref(primaryTask, post, primaryRoute)} />)}
      </div>
    </section>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  if (!posts.length) {
    return (
      <section className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle>Top Stories</SectionTitle>
        <div className="mt-8 border border-dashed border-[#7825c7] p-10 text-center">
          <h1 className="text-3xl font-black text-[#160022]">Fresh listings are on the way</h1>
          <p className="mt-3 text-[#5c4a68]">Check back soon for offers, services, and useful local pages.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-[1440px] px-4 pb-10 pt-24 sm:px-6 lg:px-8">
      <SectionTitle>Top Stories</SectionTitle>
      <div className="mt-5">
        <LeadPair posts={posts.slice(0, 3)} primaryTask={primaryTask} primaryRoute={primaryRoute} />
      </div>
      <div className="mt-10 border-b border-[#7825c7]" />
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const railPosts = posts.slice(3, 9)
  if (!railPosts.length) return null
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {railPosts.map((post, index) => <SmallImageCard key={post.id || post.slug || index} post={post} href={postHref(primaryTask, post, primaryRoute)} />)}
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const breaking = posts.slice(9, 21)
  if (!breaking.length) return null
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
      <SectionTitle>Breaking News</SectionTitle>
      <div className="mt-8 grid gap-x-16 gap-y-10 lg:grid-cols-3">
        {breaking.slice(0, 12).map((post, index) => <ListCard key={post.id || post.slug || index} post={post} href={postHref(primaryTask, post, primaryRoute)} />)}
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = timeSections.flatMap((section) => section.posts).length ? timeSections.flatMap((section) => section.posts) : posts
  const labels = ['Entertainment', 'Finance', 'Sports', 'Lifestyle', 'Health']
  return (
    <>
      {labels.map((label, index) => (
        <CategoryBlock
          key={label}
          title={label}
          posts={pool.slice(index * 8, index * 8 + 9)}
          primaryTask={primaryTask}
          primaryRoute={primaryRoute}
        />
      ))}
    </>
  )
}

export function EditableHomeCta() {
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8">
      <div className="border-t border-[#7825c7] pt-10">
        <form action="/search" className="mx-auto flex max-w-xl border border-[#7825c7] bg-white">
          <input name="q" placeholder="Search listings, services, and posts" className="min-w-0 flex-1 px-4 py-3 text-sm outline-none" />
          <button className="inline-flex items-center gap-2 bg-[#7825c7] px-5 py-3 text-sm font-black text-white"><Search className="h-4 w-4" /> Search</button>
        </form>
        <p className="mt-5 text-center text-sm font-semibold text-[#5c4a68]">{SITE_CONFIG.name} helps readers scan offers, local pages, and useful services quickly.</p>
      </div>
    </section>
  )
}

// redesigned-ui-2026-05-28
