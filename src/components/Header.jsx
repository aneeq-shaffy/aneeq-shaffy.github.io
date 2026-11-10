import { useState } from 'react'

const NAV_ITEMS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#skills', label: 'Skills' },
]

function Mark() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden>
      <path
        d="M12 2 L21 7.5 L21 16.5 L12 22 L3 16.5 L3 7.5 Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path d="M12 2 V22 M3 7.5 L21 16.5 M21 7.5 L3 16.5" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
    </svg>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="relative z-50 mx-auto flex max-w-[1280px] items-center justify-between px-5 py-7 sm:px-8">
      <a href="#top" className="flex items-center gap-2 text-ink">
        <Mark />
      </a>

      <nav className="hidden items-center gap-9 text-[0.95rem] text-ink sm:flex">
        {NAV_ITEMS.map((item) => (
          <a key={item.href} href={item.href} className="whitespace-nowrap text-ink-dim transition-colors hover:text-ink">
            {item.label}
          </a>
        ))}
      </nav>

      <a href="#contact" className="hidden items-center gap-1.5 border-b border-ink pb-0.5 text-[0.95rem] text-ink sm:flex">
        Get in touch <span className="text-sm">↗</span>
      </a>

      <button
        aria-label="Toggle navigation"
        onClick={() => setOpen((v) => !v)}
        className="flex flex-col gap-1.5 p-2 sm:hidden"
      >
        <span className="h-0.5 w-[22px] bg-ink" />
        <span className="h-0.5 w-[22px] bg-ink" />
        <span className="h-0.5 w-[22px] bg-ink" />
      </button>

      {open && (
        <nav className="absolute inset-x-0 top-full flex flex-col gap-4 border-b border-border bg-bg px-5 pb-6 pt-4 text-sm text-ink-dim sm:hidden">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="transition-colors hover:text-ink">
              {item.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="text-ink">
            Get in touch ↗
          </a>
        </nav>
      )}
    </header>
  )
}
