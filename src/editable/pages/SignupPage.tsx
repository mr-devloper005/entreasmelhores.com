import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: 'Create an account for this public site.' })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white text-[#160022]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[1120px] gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.95fr_1fr] lg:px-8">
          <div>
            <h1 className="editable-section-heading">{pagesContent.signup.title}</h1>
            <p className="mt-8 max-w-xl text-4xl font-black leading-tight text-[#340055]">{pagesContent.signup.subtitle}</p>
            <ul className="mt-8 grid gap-3 border-t border-[#7825c7] pt-6 text-base font-semibold leading-7 text-[#5c4a68]">
              {pagesContent.signup.points.map((point) => <li key={point}>- {point}</li>)}
            </ul>
          </div>
          <div className="border border-[#7825c7] p-6 sm:p-8">
            <EditableLocalSignupForm />
            <p className="mt-5 text-sm text-[#5c4a68]">Already have an account? <Link href="/login" className="font-black text-[#7825c7] underline-offset-4 hover:underline">Login</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

// redesigned-ui-2026-05-28
