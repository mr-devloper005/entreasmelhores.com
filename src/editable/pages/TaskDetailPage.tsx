import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Download, ExternalLink, Mail, MessageCircle, Phone } from 'lucide-react'
import { buildPostMetadata, buildTaskMetadata } from '@/lib/seo'
import { buildPostUrl, fetchArticleComments, fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { getEditableCategory, getEditablePostImage } from '@/editable/cards/PostCards'

export const revalidate = 3

export async function generateEditableDetailMetadata(task: TaskKey, params: Promise<{ slug?: string; username?: string }>) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  return post ? await buildPostMetadata(task, post) : await buildTaskMetadata(task)
}

export async function EditableTaskDetailRoute({ task, params }: { task: TaskKey; params: Promise<{ slug?: string; username?: string }> }) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  if (!post) notFound()
  const related = (await fetchTaskPosts(task, 7)).filter((item) => item.slug !== post.slug).slice(0, 6)
  const comments = task === 'article' ? await fetchArticleComments(post.slug, 50) : []
  return <TaskDetailView task={task} post={post} related={related} comments={comments} />
}

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const singleImages = ['image', 'featuredImage', 'thumbnail', 'logo', 'avatar'].map((key) => asText(content[key])).filter((url) => url && isUrl(url))
  return [...media, ...images, ...singleImages].filter(Boolean).slice(0, 12)
}

const getBody = (post: SitePost) => {
  const content = getContent(post)
  return asText(content.body) || asText(content.description) || asText(content.details) || post.summary || 'Details will appear here once available.'
}

const formatPlainText = (raw: string) => {
  if (/<[a-z][\s\S]*>/i.test(raw)) return raw.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
  return raw.split(/\n{2,}/).map((part) => `<p>${part.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>`).join('')
}

export function TaskDetailView({ task, post, related, comments = [] }: { task: TaskKey; post: SitePost; related: SitePost[]; comments?: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  const taskConfig = getTaskConfig(task)
  const images = getImages(post)
  const primaryImage = images[0] || getEditablePostImage(post)
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  const condition = getField(post, ['condition', 'availability', 'type'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const email = getField(post, ['email'])
  const website = getField(post, ['website', 'url', 'link', 'fileUrl', 'pdfUrl', 'documentUrl'])

  return (
    <EditableSiteShell>
      <main className="bg-white text-[#160022]">
        <article className="mx-auto max-w-[1120px] px-4 pb-16 pt-20 sm:px-6 lg:px-8">
          <Link href={taskConfig?.route || '/'} className="inline-flex items-center gap-2 text-sm font-black text-[#7825c7]"><ArrowLeft className="h-4 w-4" /> Back to {taskConfig?.label || 'posts'}</Link>
          <h1 className="mt-10 max-w-[980px] text-4xl font-black uppercase leading-tight text-[#340055] sm:text-5xl">{post.title}</h1>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-base font-black">
            <span className="editable-kicker">{getEditableCategory(post)}</span>
          </div>

          <img src={primaryImage} alt={post.title} className="mt-4 max-h-[680px] w-full object-cover" />

          <MetaStrip price={price} location={location} condition={condition} />

          <div className="article-content mt-8 text-base font-medium leading-8 text-[#160022]" dangerouslySetInnerHTML={{ __html: formatPlainText(getBody(post)) }} />

          <ContactActions task={task} website={website} phone={phone} email={email} />

          {images.length > 1 ? (
            <section className="mt-14">
              <h2 className="editable-section-heading">More Images</h2>
              <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {images.slice(1, 9).map((image, index) => <img key={`${image}-${index}`} src={image} alt="" className="aspect-[16/10] w-full object-cover" />)}
              </div>
            </section>
          ) : null}

          <RelatedStories task={task} related={related} />
          {task === 'article' ? <EditableComments slug={post.slug} comments={comments} /> : null}
        </article>
      </main>
    </EditableSiteShell>
  )
}

function MetaStrip({ price, location, condition }: { price?: string; location?: string; condition?: string }) {
  const items = [['Price', price], ['Location', location], ['Info', condition]].filter(([, value]) => value)
  if (!items.length) return null
  return (
    <div className="mt-7 grid gap-3 border-y border-[#7825c7] py-4 sm:grid-cols-3">
      {items.map(([label, value]) => (
        <div key={label} className="min-w-0">
          <p className="text-xs font-black uppercase text-[#7825c7]">{label}</p>
          <p className="mt-1 break-words text-base font-black">{value}</p>
        </div>
      ))}
    </div>
  )
}

function ContactActions({ task, website, phone, email }: { task: TaskKey; website?: string; phone?: string; email?: string }) {
  if (!website && !phone && !email) return null
  const websiteLabel = task === 'pdf' ? 'Download' : task === 'sbm' ? 'Open saved resource' : 'Visit website'
  return (
    <div className="mt-10 flex flex-wrap justify-center gap-3">
      {website ? <Link href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-[#a22df0] px-8 py-3 text-base font-black text-white">{websiteLabel} {task === 'pdf' ? <Download className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}</Link> : null}
      {phone ? <a href={`tel:${phone}`} className="inline-flex items-center gap-2 border border-[#7825c7] px-6 py-3 text-sm font-black"><Phone className="h-4 w-4" /> Call</a> : null}
      {email ? <a href={`mailto:${email}`} className="inline-flex items-center gap-2 border border-[#7825c7] px-6 py-3 text-sm font-black"><Mail className="h-4 w-4" /> Email</a> : null}
    </div>
  )
}

function RelatedStories({ task, related }: { task: TaskKey; related: SitePost[] }) {
  if (!related.length) return null
  return (
    <section className="mt-24">
      <h2 className="editable-section-heading">Related</h2>
      <div className="mt-7 grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {related.map((post) => (
          <Link key={post.id || post.slug} href={buildPostUrl(task, post.slug)} className="group block">
            <img src={getEditablePostImage(post)} alt={post.title} className="aspect-[16/10] w-full object-cover transition duration-300 group-hover:opacity-85" />
            <p className="editable-kicker mt-2">{getEditableCategory(post)}</p>
            <h3 className="editable-title-link mt-2 line-clamp-3 text-base font-black leading-tight">{post.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  )
}

function EditableComments({ slug, comments }: { slug: string; comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  return (
    <section className="mt-16 border-t border-[#7825c7] pt-8">
      <div className="flex items-center gap-2 text-lg font-black"><MessageCircle className="h-5 w-5" /> Comments</div>
      <div className="mt-5 grid gap-3">
        {comments.slice(0, 5).map((comment) => (
          <div key={comment.id} className="border border-[#e4d7ef] bg-white p-4">
            <p className="text-sm font-black">{comment.name}</p>
            <p className="mt-2 text-sm leading-6 text-[#5c4a68]">{comment.comment}</p>
          </div>
        ))}
        {!comments.length ? <p className="text-sm text-[#5c4a68]">No comments yet for {slug}.</p> : null}
      </div>
    </section>
  )
}

// redesigned-ui-2026-05-28
