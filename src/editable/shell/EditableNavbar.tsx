'use client'

import { useMemo, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, UserRound, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const navVars = {
    '--editable-nav-bg': '#340055',
    '--editable-nav-text': '#ffffff',
    '--editable-search-bg': '#ffffff',
    '--editable-border': 'rgba(255,255,255,0.18)',
    '--editable-container': '1440px',
  } as CSSProperties

  const navItems = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({ label: task.label, href: task.route })),
    []
  )

  return (
    <header style={navVars} className="sticky top-0 z-50 bg-[var(--editable-nav-bg)] text-[var(--editable-nav-text)]">
      <nav className="mx-auto flex min-h-[74px] w-full max-w-[var(--editable-container)] items-center gap-5 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <img src={globalContent.site.logo} alt={globalContent.site.name} className="h-12 w-12 object-contain" />
          <span className="hidden max-w-[170px] text-lg font-black uppercase leading-[0.95] text-white sm:block">{globalContent.site.name}</span>
        </Link>

        <div className="hidden min-w-0 flex-1 items-center justify-center gap-7 lg:flex">
          {navItems.slice(0, 9).map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link key={item.href} href={item.href} className={`text-sm font-bold transition hover:text-white/70 ${active ? 'text-white/70' : 'text-white'}`}>
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          <form action="/search" className="hidden xl:block">
            <label className="flex h-9 w-48 items-center gap-2 bg-white/10 px-3 text-white">
              <Search className="h-4 w-4" />
              <input name="q" type="search" placeholder="Search" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-white/60" />
            </label>
          </form>
          <Link href="/signup" className="hidden min-w-[124px] rounded-md bg-[#f0eeff] px-6 py-2.5 text-center text-sm font-medium text-[#160022] sm:block">Sign-up</Link>
          <Link href="/login" aria-label="Login" className="hidden p-2 text-white sm:block"><UserRound className="h-7 w-7 stroke-[1.6]" /></Link>
          <button type="button" onClick={() => setOpen((value) => !value)} className="border border-white/20 p-2 text-white lg:hidden" aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-white/15 bg-[var(--editable-nav-bg)] px-4 py-4 lg:hidden">
          <form action="/search" className="mb-4 flex border border-white/20 bg-white/10 px-3 py-2">
            <Search className="mt-1 h-4 w-4 opacity-70" />
            <input name="q" type="search" placeholder="Search posts" className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-white/60" />
          </form>
          <div className="grid gap-2">
            {[{ label: 'Home', href: '/' }, ...navItems, { label: 'Contact', href: '/contact' }].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="border border-white/15 px-4 py-3 text-sm font-black text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}

// redesigned-ui-2026-05-28
