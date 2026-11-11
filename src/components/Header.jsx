import { useState } from 'react'
import Logo from './Logo.jsx'

const NAV_ITEMS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#skills', label: 'Skills' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-ink bg-accent">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <a href="#top" className="flex items-center gap-3 text-ink">
          <Logo size={40} />
          <span className="hidden font-display text-lg font-bold uppercase tracking-wide sm:inline">Aneeq Shaffy</span>
        </a>

        <nav className="hidden items-center gap-1 sm:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap border-[3px] border-transparent px-4 py-2.5 font-display text-sm font-bold uppercase tracking-wide text-ink transition-all duration-150 hover:-rotate-3 hover:border-ink hover:bg-bg-elevated"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="/cv.pdf"
          target="_blank"
          rel="noopener"
          className="hidden items-center gap-2 bg-ink px-4 py-2.5 font-display text-sm font-bold uppercase text-bg-elevated transition-transform duration-150 hover:rotate-2 hover:text-accent sm:flex"
        >
          CV
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" style={{ stroke: 'currentColor', strokeWidth: 2.5, strokeLinecap: 'square' }}>
            <path d="M12 3v12M6 10l6 6 6-6M4 21h16" />
          </svg>
        </a>

        <button
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-1.5 border-[3px] border-ink bg-bg-elevated p-2.5 sm:hidden"
        >
          <span className="h-0.5 w-5 bg-ink" />
          <span className="h-0.5 w-5 bg-ink" />
          <span className="h-0.5 w-5 bg-ink" />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t-[3px] border-ink bg-bg-elevated px-5 pb-6 pt-4 sm:hidden">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-[3px] border-transparent px-3 py-2.5 font-display text-sm font-bold uppercase tracking-wide text-ink hover:border-ink hover:bg-accent"
            >
              {item.label}
            </a>
          ))}
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex w-max items-center gap-2 bg-ink px-4 py-2.5 font-display text-sm font-bold uppercase text-bg-elevated"
          >
            CV ↓
          </a>
        </nav>
      )}
    </header>
  )
}
