import Link from 'next/link'
import { Building2, Download, FileText, Filter, Image as ImageIcon, MapPin, Megaphone, Search, UserRound } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts, buildPostUrl } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage } from '@/editable/cards/PostCards'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({ task, posts, pagination, category, basePath }: { task: TaskKey; posts: SitePost[]; pagination: SiteFeedPagination; category: string; basePath: string }) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const page = pagination.page || 1
  const label = taskConfig?.label || task
  const categoryLabel = category === 'all' ? 'All categories' : CATEGORY_OPTIONS.find((item) => item.slug === category)?.name || category

  return (
    <EditableSiteShell>
      <main className="bg-white text-[#160022]">
        <section className="mx-auto max-w-[1440px] px-4 pb-8 pt-20 sm:px-6 lg:px-8">
          <h1 className="editable-section-heading">{voice?.headline || `${label} Picks`}</h1>
          <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_320px] lg:items-end">
            <p className="max-w-3xl text-base font-semibold leading-8 text-[#5c4a68]">{voice?.description || SITE_CONFIG.description}</p>
            <form action={basePath} className="grid gap-2 border border-[#7825c7] p-3">
              <div className="flex items-center gap-2 text-xs font-black text-[#7825c7]"><Filter className="h-4 w-4" /> Filter stories</div>
              <select name="category" defaultValue={category} className="h-11 border border-[#e4d7ef] bg-white px-3 text-sm font-bold outline-none">
                <option value="all">All categories</option>
                {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
              </select>
              <button className="h-11 bg-[#7825c7] text-sm font-black text-white">Apply</button>
              <p className="text-xs font-bold text-[#5c4a68]">Showing: {categoryLabel}</p>
            </form>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-4 pb-16 sm:px-6 lg:px-8">
          {posts.length ? (
            <div className="grid gap-12">
              <ArchiveLead task={task} post={posts[0]} basePath={basePath} />
              <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                {posts.slice(1, 7).map((post, index) => <MagazineCard key={post.id || post.slug || index} task={task} post={post} basePath={basePath} index={index} />)}
              </div>
              <div className="grid gap-x-16 gap-y-10 lg:grid-cols-3">
                {posts.slice(7).map((post, index) => <ListArchiveCard key={post.id || post.slug || index} task={task} post={post} basePath={basePath} index={index} />)}
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-[#7825c7] p-10 text-center">
              <Search className="mx-auto h-8 w-8 text-[#7825c7]" />
              <h2 className="mt-4 text-3xl font-black">No posts found</h2>
              <p className="mt-2 text-sm text-[#5c4a68]">Try another category or check back after new posts are published.</p>
            </div>
          )}

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3 border-t border-[#7825c7] pt-8">
            {pagination.hasPrevPage ? <Link href={pageHref(basePath, category, page - 1)} className="border border-[#7825c7] px-5 py-3 text-sm font-black">Previous</Link> : null}
            <span className="bg-[#7825c7] px-5 py-3 text-sm font-black text-white">Page {page} of {pagination.totalPages || 1}</span>
            {pagination.hasNextPage ? <Link href={pageHref(basePath, category, page + 1)} className="border border-[#7825c7] px-5 py-3 text-sm font-black">Next</Link> : null}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function hrefFor(task: TaskKey, post: SitePost, basePath: string) {
  return post.slug ? `${basePath}/${post.slug}` : buildPostUrl(task, post.slug)
}

function TaskGlyph({ task, className = 'h-4 w-4' }: { task: TaskKey; className?: string }) {
  if (task === 'listing') return <Building2 className={className} />
  if (task === 'classified') return <Megaphone className={className} />
  if (task === 'image') return <ImageIcon className={className} />
  if (task === 'pdf') return <Download className={className} />
  if (task === 'profile') return <UserRound className={className} />
  return <FileText className={className} />
}

function ArchiveLead({ task, post, basePath }: { task: TaskKey; post?: SitePost; basePath: string }) {
  if (!post) return null
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  return (
    <Link href={hrefFor(task, post, basePath)} className="group grid gap-3 lg:grid-cols-[1.35fr_0.65fr]">
      <img src={getEditablePostImage(post)} alt={post.title} className="aspect-[16/9] w-full object-cover transition duration-300 group-hover:opacity-90" />
      <article className="flex min-w-0 flex-col justify-center border-y border-[#7825c7] py-6">
        <p className="editable-kicker"><TaskGlyph task={task} /> {price || getEditableCategory(post)}</p>
        <h2 className="editable-title-link mt-4 text-3xl font-black leading-tight sm:text-4xl">{post.title}</h2>
        <p className="mt-4 line-clamp-4 text-base font-semibold leading-8 text-[#5c4a68]">{getEditableExcerpt(post, 220)}</p>
        {location ? <p className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#7825c7]"><MapPin className="h-4 w-4" /> {location}</p> : null}
      </article>
    </Link>
  )
}

function MagazineCard({ task, post, basePath }: { task: TaskKey; post: SitePost; basePath: string; index: number }) {
  return (
    <Link href={hrefFor(task, post, basePath)} className="group block min-w-0">
      <img src={getEditablePostImage(post)} alt={post.title} className="aspect-[16/9] w-full object-cover transition duration-300 group-hover:opacity-90" />
      <p className="editable-kicker mt-2">{getEditableCategory(post)}</p>
      <h3 className="editable-title-link mt-2 line-clamp-3 text-base font-black leading-snug">{post.title}</h3>
    </Link>
  )
}

function ListArchiveCard({ task, post, basePath, index }: { task: TaskKey; post: SitePost; basePath: string; index: number }) {
  return (
    <Link href={hrefFor(task, post, basePath)} className="group grid min-w-0 grid-cols-[76px_minmax(0,1fr)] gap-5">
      <img src={getEditablePostImage(post)} alt={post.title} className="h-[76px] w-[76px] object-cover" />
      <article className="min-w-0">
        <p className="editable-kicker"><TaskGlyph task={task} /> {index + 1}</p>
        <h3 className="editable-title-link mt-2 line-clamp-2 text-base font-black leading-tight">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#5c4a68]">{getEditableExcerpt(post, 115)}</p>
      </article>
    </Link>
  )
}

// redesigned-ui-2026-05-28
