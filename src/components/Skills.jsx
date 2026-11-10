import { motion } from 'motion/react'
import SectionHeading from './SectionHeading.jsx'
import { RevealGroup, revealItem } from './Reveal.jsx'

const BLOCKS = [
  {
    code: 'WORK',
    title: 'At Baylanka',
    items: ['PHP', 'MySQL', 'Bootstrap', 'jQuery', 'Vanilla JS', 'SCSS'],
  },
  {
    code: 'SIDE',
    title: 'Personal projects',
    items: ['React', 'Next.js', 'Spring Boot', 'MongoDB', 'JWT', 'OAuth 2.0'],
  },
  {
    code: 'TOOLS',
    title: 'Tools & Workflow',
    items: ['Git', 'Postman', 'Docker', 'Composer', 'Android Studio'],
  },
]

export default function Skills() {
  return (
    <section className="mx-auto flex h-full max-w-[1280px] flex-col justify-center px-5 py-16 sm:px-8">
      <SectionHeading
        label="Skills"
        title="Technical skills"
        subtitle="Work stack and side-project stack — what I actually ship with"
      />

      <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
        {BLOCKS.map((block) => (
          <motion.div key={block.code} variants={revealItem} className="rounded-md border border-border bg-bg-elevated p-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="rounded-sm border border-ink/30 px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-ink-dim">
                {block.code}
              </span>
              <h3 className="flex-1 font-display text-lg font-semibold">{block.title}</h3>
              <span className="font-mono text-sm text-ink-faint">{block.items.length}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {block.items.map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.03, duration: 0.3, ease: [0.2, 0, 0, 1] }}
                  whileHover={{ scale: 1.05, borderColor: 'var(--color-ink)' }}
                  className="rounded-full border border-border px-3 py-1 text-sm text-ink-dim"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </RevealGroup>
    </section>
  )
}
