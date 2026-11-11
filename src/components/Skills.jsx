import { motion } from 'motion/react'
import SectionHeading from './SectionHeading.jsx'
import { RevealGroup, revealItem } from './Reveal.jsx'
import DecodeText from './DecodeText.jsx'

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
    <section id="skills" className="mx-auto max-w-[1280px] border-t-[3px] border-ink px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading
        index="05"
        label="Skills"
        title="Technical skills"
        subtitle="Work stack and side-project stack — what I actually ship with"
      />

      <div className="mb-8 hard bg-ink px-5 py-3 font-mono text-sm text-accent">
        <DecodeText text="$ ./whoami --stack" />
      </div>

      <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
        {BLOCKS.map((block) => (
          <motion.div key={block.code} variants={revealItem} className="hard relative bg-bg-elevated p-7 shadow-[6px_6px_0_var(--color-ink)]">
            <div className="mb-5 flex items-center gap-3">
              <span className="border-2 border-ink px-1.5 py-0.5 font-mono text-[0.65rem] font-bold uppercase tracking-wide">
                {block.code}
              </span>
              <h3 className="flex-1 font-display text-lg font-bold uppercase">{block.title}</h3>
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
                  whileHover={{ scale: 1.05, backgroundColor: 'var(--color-accent)' }}
                  className="border-2 border-ink px-3 py-1 font-display text-sm font-bold uppercase"
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
