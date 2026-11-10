import { motion } from 'motion/react'
import SectionHeading from './SectionHeading.jsx'
import Reveal, { RevealGroup, revealItem } from './Reveal.jsx'

const BULLETS = [
  'Build and maintain features across two multi-tenant PHP platforms — a flight-club management SaaS (reservations, fleet, billing, training records) and a property-management platform built on an in-house PHP MVC framework.',
  'Work the full stack: PHP services and MySQL-backed repositories on the backend, Bootstrap/SCSS-driven UI and jQuery-based interactivity on the front end.',
  'Collaborate with senior engineers on feature work, debugging, and performance tuning inside large, long-lived codebases.',
  'Picking up practical experience with multi-tenant architecture, e-invoicing, SEPA payment workflows, and CI testing.',
]

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-[1280px] border-t border-border px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading
        label="Experience"
        title="Where I've worked"
        subtitle="Professional work history & accomplishments"
      />

      <div className="grid grid-cols-1 gap-2 border-t border-border py-7 sm:grid-cols-[220px_1fr] sm:gap-8">
        <div className="pt-1 font-mono text-sm text-ink-faint">May 2025 — Present</div>
        <div>
          <Reveal className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-xl font-semibold">Software Engineer Intern</h3>
            <span className="rounded-full border border-ink/30 px-2.5 py-0.5 font-mono text-[0.68rem] uppercase tracking-wide text-ink-dim">
              Internship
            </span>
          </Reveal>
          <Reveal delay={0.05} className="mb-4 mt-1 text-sm text-ink-dim">
            Baylanka &middot; Remote
          </Reveal>
          <RevealGroup as="ul" className="flex list-disc flex-col gap-2 pl-5 text-sm text-ink-dim" stagger={0.08}>
            {BULLETS.map((b) => (
              <motion.li key={b} variants={revealItem}>
                {b}
              </motion.li>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}
