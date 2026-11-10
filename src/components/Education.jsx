import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import SectionHeading from './SectionHeading.jsx'
import { RevealGroup, revealItem } from './Reveal.jsx'

export default function Education() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.75', 'end 0.4'],
  })
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1])
  const markerTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const markerRotate = useTransform(scrollYProgress, [0, 1], [0, 1800])

  return (
    <section
      ref={sectionRef}
      id="education"
      className="mx-auto max-w-[1280px] border-t border-border px-5 py-20 sm:px-8 sm:py-28"
    >
      <SectionHeading label="Education" title="Academic background" subtitle="Qualifications & coursework" />

      <div className="relative">
        {/* The progress rail: fills as the section crosses the viewport, with
            a marker that turns five times over the run, same as a career
            timeline's thread — just applied to two entries instead of seven. */}
        <div className="absolute -left-5 top-0 hidden h-full w-px bg-border lg:block" />
        <motion.div
          style={{ scaleY: railScale }}
          className="absolute -left-5 top-0 hidden h-full w-px origin-top bg-accent lg:block"
        />
        <motion.div
          style={{ top: markerTop, rotate: markerRotate }}
          className="absolute -left-[22px] hidden h-2.5 w-2.5 -translate-y-1/2 bg-accent lg:block"
        />

        <RevealGroup className="grid grid-cols-1 gap-6 lg:grid-cols-2" stagger={0.12}>
          <motion.div
            variants={revealItem}
            className="relative rounded-md border border-border bg-bg-elevated p-7"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%)' }}
          >
            <div className="mb-2 font-mono text-sm text-ink-faint">Feb 2021 — 2026</div>
            <h3 className="mb-1 font-display text-lg font-semibold">BSc (Hons) in Information Technology</h3>
            <div className="mb-4 text-sm text-accent">Sri Lanka Institute of Information Technology, Malabe</div>
            <ul className="flex list-disc flex-col gap-2 pl-5 text-sm text-ink-dim">
              <li>
                Volunteered as Batch Representative, liaising between 150+ students and faculty to
                resolve academic issues.{' '}
                <a
                  href="/assets/batch-rep-cert.png"
                  target="_blank"
                  rel="noopener"
                  className="font-mono text-accent hover:underline"
                >
                  View cert →
                </a>
              </li>
              <li>Led 5 semester-long group projects, delegating tasks and achieving 100% on-time delivery.</li>
            </ul>
            <div className="mt-5">
              <span className="mb-2 block font-mono text-[0.68rem] tracking-wide text-ink-faint">
                Relevant coursework
              </span>
              <PillRow
                items={[
                  'OOP',
                  'Database Management Systems',
                  'Data Structures & Algorithms',
                  'Programming Applications & Frameworks',
                  'Probability & Statistics',
                ]}
              />
            </div>
          </motion.div>

          <motion.div
            variants={revealItem}
            className="relative rounded-md border border-border bg-bg-elevated p-7"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%)' }}
          >
            <div className="mb-2 font-mono text-sm text-ink-faint">Sep 2017 — Mar 2019</div>
            <h3 className="mb-1 font-display text-lg font-semibold">Cambridge International A Level — Commerce</h3>
            <div className="mb-4 text-sm text-accent">Lyceum International School, Nugegoda</div>
            <div>
              <span className="mb-2 block font-mono text-[0.68rem] tracking-wide text-ink-faint">Subjects</span>
              <PillRow items={['Mathematics', 'Accounting', 'Economics', 'Business Studies']} />
            </div>
          </motion.div>
        </RevealGroup>
      </div>
    </section>
  )
}

function PillRow({ items }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="rounded-full border border-border px-3 py-1 text-sm text-ink-dim">
          {item}
        </span>
      ))}
    </div>
  )
}
