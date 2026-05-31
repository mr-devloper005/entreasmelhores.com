import Link from 'next/link'
import type { CSSProperties } from 'react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'

export function EditableFooter() {
  const footerVars = { '--editable-footer-bg': '#210037', '--editable-footer-text': '#f8f2ff', '--editable-container': '1440px' } as CSSProperties
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled).slice(0, 6)
  const year = new Date().getFullYear()

  return (
    <footer style={footerVars} className="border-t-[8px] border-[#340055] bg-[linear-gradient(180deg,#340055_0%,#08000d_100%)] text-[var(--editable-footer-text)]">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1fr_180px_240px] lg:px-8 lg:py-24">
        <Link href="/" className="inline-flex items-start gap-3">
          <img src={globalContent.site.logo} alt={globalContent.site.name} className="mt-1 h-14 w-14 object-contain" />
          <span className="max-w-[180px] text-2xl font-black uppercase leading-none text-white">{globalContent.site.name}</span>
        </Link>

        <div>
          <h3 className="text-base font-black text-white">Quick Links</h3>
          <div className="mt-7 grid gap-5">
            {taskLinks.map((task) => (
              <Link key={task.key} href={task.route} className="text-base font-medium text-white/78 hover:text-white">{task.label}</Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-base font-black text-white">Contact Us</h3>
          <div className="mt-7 grid gap-5">
            <Link href="/about" className="text-base font-medium text-white/78 hover:text-white">About Us</Link>
            <Link href="/contact" className="text-base font-medium text-white/78 hover:text-white">Contact</Link>
            <Link href="/search" className="text-base font-medium text-white/78 hover:text-white">Search</Link>
            <Link href="/comments" className="text-base font-medium text-white/78 hover:text-white">Comments</Link>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1100px] border-t border-white/70 px-4 py-6 text-center text-base font-medium text-white/80">
        Copyright (c) {year} {globalContent.site.name} | All Rights Reserved
      </div>
    </footer>
  )
}

// redesigned-ui-2026-05-28
