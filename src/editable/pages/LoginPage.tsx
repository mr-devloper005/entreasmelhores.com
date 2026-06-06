import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white text-[var(--slot4-page-text)]">
        <section className="mx-auto min-h-[calc(100vh-12rem)] max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="border-t border-[#7825c7] pt-8">
            <div className="grid items-start gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
              <div className="lg:pt-8">
                <p className="editable-kicker">{pagesContent.auth.login.badge}</p>
                <h1 className="mt-6 max-w-2xl text-4xl font-black leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                  {pagesContent.auth.login.title}
                </h1>
                <p className="mt-6 max-w-xl text-base leading-8 text-[var(--slot4-muted-text)]">
                  {pagesContent.auth.login.description}
                </p>
                <div className="mt-10 h-3 w-28 bg-[#7825c7]" />
              </div>

              <div className="border border-[#7825c7] bg-white p-6 sm:p-8 lg:p-10">
                <p className="text-sm font-black text-[#7825c7]">Account access</p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.03em]">{pagesContent.auth.login.formTitle}</h2>
                <EditableLocalLoginForm />
                <p className="mt-6 border-t border-[#e7d8f5] pt-5 text-sm text-[var(--slot4-muted-text)]">
                  New here?{' '}
                  <Link href="/signup" className="font-black text-[#7825c7] underline-offset-4 hover:underline">
                    {pagesContent.auth.login.createCta}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
