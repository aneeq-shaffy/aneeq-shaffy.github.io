import { motion } from 'motion/react'
import SectionHeading from './SectionHeading.jsx'
import Reveal, { RevealGroup } from './Reveal.jsx'
import useTilt from '../hooks/useTilt.js'
import Button from './Button.jsx'

const WORK_PROJECTS = [
  {
    index: '01',
    name: 'Onres24 Dashboard',
    tagline: 'Flight-school & club management platform',
    image: '/assets/onres24-dashboard.png',
    link: 'https://baylanka.net/onres24-dashboard/',
    linkLabel: 'View Project →',
    tag: 'Baylanka',
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
    linkLabel: 'View Project →',
    tag: 'Baylanka',
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
    linkLabel: 'View Project →',
    tag: 'Baylanka',
    description:
      'A multi-tenant platform built on an in-house PHP MVC framework, mirroring external ERP data (properties, units, contracts) and layering a ticketing system plus email/WhatsApp communication on top.',
    tech: ['PHP', 'MySQL', 'Multi-tenant', 'Ticketing'],
  },
]

const ROT_DIR = [-1, 1, -1]

function cardVariant(i) {
  const dir = ROT_DIR[i % ROT_DIR.length]
  return {
    hidden: { opacity: 0, y: 70, rotate: 8 * dir, scale: 0.9 },
    show: {
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] },
    },
  }
}

function ProjectCard({ p, i }) {
  const tilt = useTilt(4)

  return (
    <motion.article
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: 'preserve-3d' }}
      variants={cardVariant(i)}
      whileHover={{ y: -6, x: -4, rotate: -1.5 }}
      transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
      className="group hard flex flex-col bg-bg-elevated shadow-[6px_6px_0_var(--color-ink)]"
    >
      <a href={p.link} target="_blank" rel="noopener" className="relative block aspect-video overflow-hidden border-b-[3px] border-ink">
        <img
          src={p.image}
          alt={`${p.name} screenshot`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
          Fig. {p.index} · screenshot
        </div>
        <div className="absolute bottom-3 right-3 translate-y-[140%] bg-ink px-2.5 py-1.5 font-display text-xs font-bold uppercase text-bg-elevated transition-transform duration-[400ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover:translate-y-0">
          Case study →
        </div>
      </a>

      <div className="flex flex-1 flex-col p-7" style={{ transform: 'translateZ(20px)' }}>
        <div className="mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
          <span>{p.index} / Web app</span>
          <span>{p.tag}</span>
        </div>
        <div className="mb-1 flex items-center justify-between gap-3">
          <h3 className="font-display text-2xl font-bold uppercase leading-none">{p.name}</h3>
          <span className="shrink-0 text-xl transition-transform duration-[400ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover:translate-x-1 group-hover:-translate-y-1">
            ↗
          </span>
        </div>
        <p className="mb-4 text-sm text-ink-dim">{p.tagline}</p>
        <p className="mb-5 flex-1 text-sm text-ink-dim">{p.description}</p>

        <div className="mb-5 flex flex-wrap gap-1.5">
          {p.tech.map((t) => (
            <span key={t} className="border-2 border-ink px-2 py-1 font-display text-[0.7rem] font-bold uppercase">
              {t}
            </span>
          ))}
        </div>

        <a href={p.link} target="_blank" rel="noopener" className="font-mono text-sm font-bold text-ink hover:underline">
          {p.linkLabel}
        </a>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-[1280px] border-t-[3px] border-ink px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading
        index="03"
        label="Projects"
        title="Things I've shipped"
        subtitle="Real products I've worked on at Baylanka"
      />

      <RevealGroup className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3" stagger={0.14} style={{ perspective: 1200 }}>
        {WORK_PROJECTS.map((p, i) => (
          <ProjectCard key={`work-${p.index}`} p={p} i={i} />
        ))}
      </RevealGroup>

      <Reveal delay={0.1} className="hard mt-14 bg-bg-elevated p-10 text-center shadow-[6px_6px_0_var(--color-ink)]">
        <p className="mb-5 font-display text-xl font-bold uppercase">Interested in collaborating?</p>
        <Button href="#contact" variant="primary" className="mx-auto">
          Get In Touch
        </Button>
      </Reveal>
    </section>
  )
}
