import { motion } from 'motion/react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import Timeline from './Timeline.jsx'

const COURSEWORK = [
  'OOP',
  'Database Management Systems',
  'Data Structures & Algorithms',
  'Programming Applications & Frameworks',
  'Probability & Statistics',
]

export default function Education() {
  return (
    <section id="education" className="mx-auto max-w-[1280px] border-t-[3px] border-ink px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading index="04" label="Education" title="Academic background" subtitle="Qualifications & coursework" />

      <Timeline
        items={[
          {
            year: '2021',
            kicker: 'Feb 2021 — 2026 · SLIIT, Malabe',
            title: 'BSc (Hons) in Information Technology',
          },
        ]}
      />

      <Reveal delay={0.1} className="hard relative mt-7 max-w-2xl bg-bg-elevated p-7 shadow-[6px_6px_0_var(--color-ink)]">
        <ul className="flex list-disc flex-col gap-2 pl-5 text-sm text-ink-dim">
          <li>
            Volunteered as Batch Representative, liaising between 150+ students and faculty to
            resolve academic issues.{' '}
            <a
              href="/assets/batch-rep-cert.png"
              target="_blank"
              rel="noopener"
              className="font-mono font-bold text-ink hover:underline"
            >
              View cert →
            </a>
          </li>
          <li>Led 5 semester-long group projects, delegating tasks and achieving 100% on-time delivery.</li>
        </ul>
        <div className="mt-5">
          <span className="mb-2 block font-mono text-[0.68rem] uppercase tracking-wide text-ink-faint">
            Relevant coursework
          </span>
          <div className="flex flex-wrap gap-2">
            {COURSEWORK.map((item) => (
              <motion.span
                key={item}
                whileHover={{ scale: 1.04, backgroundColor: 'var(--color-accent)' }}
                className="border-2 border-ink px-3 py-1 font-display text-xs font-bold uppercase tracking-wide"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
