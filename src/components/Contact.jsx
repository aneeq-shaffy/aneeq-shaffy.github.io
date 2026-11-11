import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import SectionHeading from './SectionHeading.jsx'
import Reveal, { RevealGroup, revealItem } from './Reveal.jsx'
import Button from './Button.jsx'
import IconButton from './IconButton.jsx'
import SprayCursorPanel from './SprayCursorPanel.jsx'
import { ICON_PATHS } from '../lib/icons.js'

const ROWS = [
  { k: 'Email', v: 'aneeqshaffy7@gmail.com', href: 'mailto:aneeqshaffy7@gmail.com?subject=Let%27s%20Connect' },
  { k: 'Phone', v: '+94 76 284 4725', href: 'tel:+94762844725' },
  { k: 'Location', v: 'Kalubowila, Colombo, Sri Lanka' },
  { k: 'LinkedIn', v: 'linkedin.com/in/aneeq-shaffy', href: 'https://www.linkedin.com/in/aneeq-shaffy' },
  { k: 'GitHub', v: 'github.com/aneeq-shaffy', href: 'https://github.com/aneeq-shaffy' },
]

function CopyEmailButton() {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef(null)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText('aneeqshaffy7@gmail.com')
    } catch {
      // clipboard may be unavailable; the toast still confirms the attempt
    }
    setCopied(true)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="relative">
      <button
        onClick={copy}
        className="inline-flex items-center gap-2.5 border-[3px] border-ink bg-ink px-5 py-3 font-display text-sm font-bold uppercase text-bg-elevated shadow-[5px_5px_0_var(--color-accent)] transition-[transform,box-shadow] duration-150 active:translate-x-1 active:translate-y-1 active:shadow-none"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" style={{ stroke: 'currentColor', strokeWidth: 2.5, strokeLinecap: 'square' }}>
          <path d={ICON_PATHS.copy} />
        </svg>
        Copy email
      </button>
      <div
        className="pointer-events-none absolute right-0 top-full z-10 mt-3 flex items-center gap-2 border-[3px] border-ink bg-accent px-4 py-2.5 font-display text-sm font-bold uppercase transition-transform duration-[380ms] ease-[cubic-bezier(0.3,1.6,0.5,1)]"
        style={{
          transformOrigin: 'right top',
          transform: copied ? 'scale(1) rotate(-4deg)' : 'scale(0) rotate(12deg)',
          opacity: copied ? 1 : 0,
        }}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" style={{ stroke: 'currentColor', strokeWidth: 3, strokeLinecap: 'square' }}>
          <path d={ICON_PATHS.check} />
        </svg>
        Copied!
      </div>
    </div>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-[1280px] border-t-[3px] border-ink px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading
        index="06"
        label="Contact"
        title="Get in touch"
        subtitle="Let's connect and build something worth shipping"
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <RevealGroup stagger={0.07}>
          {ROWS.map((row) => (
            <motion.div
              key={row.k}
              variants={revealItem}
              className="flex flex-wrap items-center justify-between gap-2 border-t-2 border-ink/15 py-4 text-sm"
            >
              <span className="font-mono text-xs uppercase tracking-wide text-ink-faint">{row.k}</span>
              {row.href ? (
                <a
                  href={row.href}
                  target={row.href.startsWith('http') ? '_blank' : undefined}
                  rel={row.href.startsWith('http') ? 'noopener' : undefined}
                  className="font-bold hover:text-accent-dim"
                >
                  {row.v}
                </a>
              ) : (
                <span className="font-bold">{row.v}</span>
              )}
            </motion.div>
          ))}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <IconButton href="https://github.com/aneeq-shaffy" target="_blank" label="GitHub" path={ICON_PATHS.github} />
            <IconButton href="https://www.linkedin.com/in/aneeq-shaffy" target="_blank" label="LinkedIn" path={ICON_PATHS.linkedin} />
            <IconButton href="mailto:aneeqshaffy7@gmail.com" label="Email" path={ICON_PATHS.mail} />
            <CopyEmailButton />
          </div>
        </RevealGroup>

        <Reveal delay={0.1} className="hard relative bg-bg-elevated p-8 shadow-[6px_6px_0_var(--color-ink)]">
          <h3 className="mb-4 font-display text-xl font-bold uppercase">Let's collaborate</h3>
          <p className="mb-7 text-sm text-ink-dim">
            Open to full-time, freelance, and contract work. Comfortable in PHP/Bootstrap/jQuery as
            much as React/Next.js — whatever the stack calls for. Usually replies within 24 hours —
            call for anything urgent.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="mailto:aneeqshaffy7@gmail.com?subject=Let%27s%20Connect&body=Hi%20Aneeq%2C" variant="primary">
              Email Me
            </Button>
            <Button href="/cv.pdf" target="_blank" variant="secondary">
              View CV
            </Button>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.15} className="mt-10">
        <SprayCursorPanel className="h-[280px] w-full" />
      </Reveal>
    </section>
  )
}
