import { motion } from 'motion/react'
import SectionHeading from './SectionHeading.jsx'
import Reveal, { RevealGroup, revealItem } from './Reveal.jsx'
import useTilt from '../hooks/useTilt.js'

const PROJECTS = [
  {
    index: '01',
    name: 'Onres24 Dashboard',
    tagline: 'Flight-school & club management platform',
    image: '/assets/onres24-dashboard.png',
    link: 'https://baylanka.net/onres24-dashboard/',
    description:
      'A multi-tenant platform for aviation organisations — reservations, fleet management, flight-instructor billing, a fuel-station module with tank analyses, a digital flight log, SEPA-based billing, and instructor availability tracking.',
    tech: ['PHP', 'MySQL', 'Bootstrap', 'jQuery', 'Multi-tenant'],
  },
  {
    index: '02',
    name: 'Onres24 Tracker',
    tagline: 'Companion app for pilots',
    image: '/assets/onres24-tracker.png',
    link: 'https://baylanka.net/oners24-tracker/',
    description:
      'The field-side companion to the Dashboard: pilots record and upload flight data in real time, with live location tracking, flight-path mapping, in-transit encryption, and user-controlled data deletion.',
    tech: ['Mobile', 'Real-time GPS', 'REST API'],
  },
  {
    index: '03',
    name: 'Woblu Maintenance',
    tagline: 'Property-management platform for insurance agencies',
    image: '/assets/woblu-maintenance.png',
    link: 'https://baylanka.net/woblu-maintenance/',
    description:
      'A multi-tenant platform built on an in-house PHP MVC framework, mirroring external ERP data (properties, units, contracts) and layering a ticketing system plus email/WhatsApp communication on top.',
    tech: ['PHP', 'MySQL', 'Multi-tenant', 'Ticketing'],
  },
]

function ProjectCard({ p }) {
  const tilt = useTilt(6)

  return (
    <motion.article
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: 'preserve-3d' }}
      variants={revealItem}
      className="group flex flex-col overflow-hidden rounded-md border border-border bg-bg-elevated transition-colors hover:border-ink"
    >
      <a href={p.link} target="_blank" rel="noopener" className="block aspect-video overflow-hidden border-b border-border">
        <img
          src={p.image}
          alt={`${p.name} product screenshot`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </a>

      <div className="flex flex-1 flex-col p-7" style={{ transform: 'translateZ(20px)' }}>
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-sm text-ink-faint">{p.index}</span>
          <span className="font-mono text-[0.68rem] uppercase tracking-wide text-ink-faint">Baylanka</span>
        </div>
        <h3 className="mb-1 font-display text-xl font-semibold">{p.name}</h3>
        <p className="mb-4 text-sm text-ink-dim">{p.tagline}</p>
        <p className="mb-5 flex-1 text-sm text-ink-dim">{p.description}</p>

        <div className="mb-5 flex flex-wrap gap-1.5">
          {p.tech.map((t) => (
            <span key={t} className="rounded-sm border border-border bg-bg px-2 py-1 font-mono text-[0.7rem] text-ink-dim">
              {t}
            </span>
          ))}
        </div>

        <a href={p.link} target="_blank" rel="noopener" className="font-mono text-sm font-bold text-ink hover:underline">
          View Project →
        </a>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-[1280px] border-t border-border px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading
        label="Projects"
        title="Things I've shipped"
        subtitle="Real products I've worked on at Baylanka — not side projects"
      />

      <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.12} style={{ perspective: 1200 }}>
        {PROJECTS.map((p) => (
          <ProjectCard key={p.index} p={p} />
        ))}
      </RevealGroup>

      <Reveal delay={0.1} className="mt-12 rounded-md border border-border bg-bg-elevated p-10 text-center">
        <p className="mb-5 font-display text-xl font-semibold">Interested in collaborating?</p>
        <a
          href="#contact"
          className="inline-block rounded-sm bg-accent px-6 py-3 font-mono text-sm font-bold uppercase tracking-wide text-bg transition-colors hover:bg-accent-dim"
        >
          Get In Touch
        </a>
      </Reveal>
    </section>
  )
}
