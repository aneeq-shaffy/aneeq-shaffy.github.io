import { motion } from 'motion/react'
import SectionHeading from './SectionHeading.jsx'
import { RevealGroup, revealItem } from './Reveal.jsx'
import CircuitTrace from './CircuitTrace.jsx'

const BLOCKS = [
  {
    code: 'FR',
    title: 'Frontend',
    items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Angular', 'Ionic'],
  },
  {
    code: 'BA',
    title: 'Backend',
    items: ['Node.js', 'MongoDB', 'PostgreSQL', 'MySQL', 'Drizzle ORM', 'Sequelize'],
  },
  {
    code: 'TO',
    title: 'Tools & DevOps',
    items: ['Docker', 'Git', 'Postman', 'Android Studio'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-[1180px] overflow-hidden border-b border-border px-5 py-16 sm:px-8 sm:py-24">
      <CircuitTrace className="opacity-80" />
      <SectionHeading
        label="05 / SKILLS"
        title="Technical Skills"
        subtitle="Technologies I use daily — and a few I'm still leveling up on"
      />

      <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
        {BLOCKS.map((block) => (
          <motion.div key={block.code} variants={revealItem} className="rounded-md border border-border bg-bg-elevated p-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="rounded-sm border border-accent px-1.5 py-0.5 font-mono text-xs text-accent">
                {block.code}
              </span>
              <h3 className="flex-1 text-lg font-semibold">{block.title}</h3>
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
                  whileHover={{ scale: 1.08, borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}
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
