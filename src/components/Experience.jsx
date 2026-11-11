import { motion } from 'motion/react'
import SectionHeading from './SectionHeading.jsx'
import { RevealGroup, revealItem } from './Reveal.jsx'
import Timeline from './Timeline.jsx'

const BULLETS = [
  'Build and maintain features across two multi-tenant PHP platforms — a flight-club management SaaS (reservations, fleet, billing, training records) and a property-management platform built on an in-house PHP MVC framework.',
  'Work the full stack: PHP services and MySQL-backed repositories on the backend, Bootstrap/SCSS-driven UI and jQuery-based interactivity on the front end.',
  'Collaborate with senior engineers on feature work, debugging, and performance tuning inside large, long-lived codebases.',
  'Picking up practical experience with multi-tenant architecture, e-invoicing, SEPA payment workflows, and CI testing.',
]

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-[1280px] border-t-[3px] border-ink px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading
        index="02"
        label="Experience"
        title="Where I've worked"
        subtitle="Professional work history & accomplishments"
      />

      <Timeline
        items={[
          {
            year: '2025',
            kicker: 'Internship · Baylanka · Remote',
            title: 'Software Engineer Intern',
          },
        ]}
      />

      <RevealGroup as="ul" className="mt-7 flex list-disc flex-col gap-2 pl-5 text-sm text-ink-dim" stagger={0.08}>
        {BULLETS.map((b) => (
          <motion.li key={b} variants={revealItem}>
            {b}
          </motion.li>
        ))}
      </RevealGroup>
    </section>
  )
}
