import { useState } from 'react'

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
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-bg/90 px-5 py-5 backdrop-blur-md sm:px-8">
      <a href="#top" className="flex items-center gap-2 font-display text-base font-semibold tracking-tight text-ink">
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-ink font-mono text-[0.65rem] font-bold">
          AS
        </span>
        <span className="hidden sm:inline">Aneeq Shaffy</span>
      </a>

      <nav className="hidden gap-8 text-sm text-ink-dim sm:flex">
        {NAV_ITEMS.map((item) => (
          <a key={item.href} href={item.href} className="whitespace-nowrap transition-colors hover:text-ink">
            {item.label}
          </a>
        ))}
      </nav>

      <a
        href="#contact"
        className="group hidden items-center gap-2 border-b border-ink pb-0.5 font-mono text-xs uppercase tracking-wide text-ink sm:flex"
      >
        Get In Touch
        <span className="transition-transform group-hover:translate-x-1">↗</span>
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
          <a href="#contact" onClick={() => setOpen(false)} className="font-mono text-xs uppercase tracking-wide text-ink">
            Get In Touch ↗
          </a>
        </nav>
      )}
    </header>
  )
}
