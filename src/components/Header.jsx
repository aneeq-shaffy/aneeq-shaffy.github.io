import { useState } from 'react'

const NAV_ITEMS = [
  { href: '#about', label: '01 / ABOUT' },
  { href: '#experience', label: '02 / EXPERIENCE' },
  { href: '#projects', label: '03 / PROJECTS' },
  { href: '#education', label: '04 / EDUCATION' },
  { href: '#skills', label: '05 / SKILLS' },
  { href: '#contact', label: '06 / CONTACT' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-bg/85 px-5 py-4 backdrop-blur-md sm:px-8">
      <a href="#top" className="font-mono text-sm font-bold tracking-wide">
        ANEEQ<span className="text-accent">/</span>SHAFFY
      </a>

      <nav className="hidden gap-4 font-mono text-xs tracking-wide text-ink-dim sm:flex lg:gap-7">
        {NAV_ITEMS.map((item) => (
          <a key={item.href} href={item.href} className="whitespace-nowrap transition-colors hover:text-accent">
            {item.label}
          </a>
        ))}
      </nav>

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
        <nav className="absolute inset-x-0 top-full flex flex-col gap-4 border-b border-border bg-bg px-5 pb-6 pt-4 font-mono text-xs tracking-wide text-ink-dim sm:hidden">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="transition-colors hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
