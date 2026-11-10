import { motion } from 'motion/react'
import SectionHeading from './SectionHeading.jsx'
import Reveal, { RevealGroup, revealItem } from './Reveal.jsx'
import AnimatedIcon from './AnimatedIcon.jsx'
import { ICONS } from '../lib/icons.js'

const ROWS = [
  { k: 'Email', v: 'aneeqshaffy7@gmail.com', href: 'mailto:aneeqshaffy7@gmail.com?subject=Let%27s%20Connect', icon: ICONS.email },
  { k: 'Phone', v: '+94 76 284 4725', href: 'tel:+94762844725', icon: ICONS.phone },
  { k: 'Location', v: 'Kalubowila, Colombo, Sri Lanka', icon: ICONS.location },
  { k: 'LinkedIn', v: 'linkedin.com/in/aneeq-shaffy', href: 'https://www.linkedin.com/in/aneeq-shaffy', icon: ICONS.linkedin },
  { k: 'GitHub', v: 'github.com/aneeq-shaffy', href: 'https://github.com/aneeq-shaffy', icon: ICONS.github },
]

export default function Contact() {
  return (
    <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8">
      <SectionHeading
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
              className="flex flex-wrap items-center justify-between gap-2 border-t border-border py-4 text-sm"
            >
              <span className="flex items-center gap-2 font-mono text-xs text-ink-faint">
                <AnimatedIcon src={row.icon} size={18} />
                {row.k}
              </span>
              {row.href ? (
                <a
                  href={row.href}
                  target={row.href.startsWith('http') ? '_blank' : undefined}
                  rel={row.href.startsWith('http') ? 'noopener' : undefined}
                  className="hover:text-ink-dim"
                >
                  {row.v}
                </a>
              ) : (
                <span>{row.v}</span>
              )}
            </motion.div>
          ))}
        </RevealGroup>

        <Reveal delay={0.1} className="rounded-md border border-border bg-bg-elevated p-8">
          <h3 className="mb-4 font-display text-xl font-semibold">Let's collaborate</h3>
          <p className="mb-7 text-sm text-ink-dim">
            Open to full-time, freelance, and contract work. Comfortable in PHP/Bootstrap/jQuery as
            much as React/Next.js — whatever the stack calls for. Usually replies within 24 hours —
            call for anything urgent.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:aneeqshaffy7@gmail.com?subject=Let%27s%20Connect&body=Hi%20Aneeq%2C"
              className="rounded-sm bg-accent px-6 py-3 font-mono text-sm font-bold uppercase tracking-wide text-bg transition-colors hover:bg-accent-dim"
            >
              Email Me
            </a>
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener"
              className="rounded-sm border border-border px-6 py-3 font-mono text-sm font-bold uppercase tracking-wide transition-colors hover:border-ink"
            >
              View CV
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
