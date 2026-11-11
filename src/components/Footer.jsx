import TagReveal from './TagReveal.jsx'
import Drips from './Drips.jsx'
import IconButton from './IconButton.jsx'
import { ICON_PATHS } from '../lib/icons.js'

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/aneeq-shaffy', path: ICON_PATHS.github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aneeq-shaffy', path: ICON_PATHS.linkedin },
  { label: 'Email', href: 'mailto:aneeqshaffy7@gmail.com', path: ICON_PATHS.mail },
]

const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
]

export default function Footer() {
  return (
    <section className="border-t-[3px] border-ink bg-wall px-5 py-16 text-bg-elevated sm:px-8 sm:py-20">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-16">
        <div className="flex flex-col items-start gap-10 sm:flex-row sm:items-end sm:justify-between">
          <nav aria-label="Primary" className="flex flex-wrap gap-2">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="border-[3px] border-transparent px-3 py-2 font-display text-sm font-bold uppercase tracking-wide transition-all duration-150 hover:-rotate-2 hover:border-bg-elevated"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="text-left sm:text-right">
            <TagReveal text="Keep Building" rotate={-4} className="text-5xl sm:text-7xl" />
            <Drips className="ml-auto mt-1 w-40" delay={400} />
            <p className="mt-2 max-w-[30ch] font-mono text-xs text-sand sm:ml-auto">
              Open to full-time, freelance, and the occasional 1am debugging war story.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-6 border-t-[3px] border-bg-elevated/15 pt-6 font-mono text-xs sm:flex-row sm:items-center">
          <span className="text-sand">© 2026 Aneeq Shaffy. All rights reserved.</span>
          <div className="flex gap-3">
            {SOCIALS.map((s) => (
              <IconButton key={s.label} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} label={s.label} path={s.path} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
