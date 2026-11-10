import { motion } from 'motion/react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

export default function Education() {
  return (
    <section className="mx-auto flex h-full max-w-[1280px] flex-col justify-center px-5 py-16 sm:px-8">
      <SectionHeading label="Education" title="Academic background" subtitle="Qualifications & coursework" />

      <Reveal className="relative max-w-2xl rounded-md border border-border bg-bg-elevated p-7">
        <div className="mb-2 font-mono text-sm text-ink-faint">Feb 2021 — 2026</div>
        <h3 className="mb-1 font-display text-lg font-semibold">BSc (Hons) in Information Technology</h3>
        <div className="mb-4 text-sm text-ink-dim">Sri Lanka Institute of Information Technology, Malabe</div>
        <ul className="flex list-disc flex-col gap-2 pl-5 text-sm text-ink-dim">
          <li>
            Volunteered as Batch Representative, liaising between 150+ students and faculty to
            resolve academic issues.{' '}
            <a
              href="/assets/batch-rep-cert.png"
              target="_blank"
              rel="noopener"
              className="font-mono text-ink hover:underline"
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
            {[
              'OOP',
              'Database Management Systems',
              'Data Structures & Algorithms',
              'Programming Applications & Frameworks',
              'Probability & Statistics',
            ].map((item) => (
              <motion.span
                key={item}
                whileHover={{ scale: 1.05, borderColor: 'var(--color-ink)' }}
                className="rounded-full border border-border px-3 py-1 text-sm text-ink-dim"
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
