import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: 'Sign in to this public site.' })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white text-[#160022]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[1120px] gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
          <div>
            <h1 className="editable-section-heading">{pagesContent.login.title}</h1>
            <p className="mt-8 max-w-xl text-xl font-semibold leading-8 text-[#5c4a68]">{pagesContent.login.subtitle}</p>
            <ul className="mt-8 grid gap-3 border-t border-[#7825c7] pt-6 text-base font-semibold leading-7 text-[#5c4a68]">
              {pagesContent.login.points.map((point) => <li key={point}>- {point}</li>)}
            </ul>
          </div>
          <div className="border border-[#7825c7] p-6 sm:p-8">
            <h2 className="text-2xl font-black text-[#340055]">Login</h2>
            <EditableLocalLoginForm />
            <p className="mt-5 text-sm text-[#5c4a68]">New here? <Link href="/signup" className="font-black text-[#7825c7] underline-offset-4 hover:underline">Create an account</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

// redesigned-ui-2026
