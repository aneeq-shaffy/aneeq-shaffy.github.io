import SectionHeading from './SectionHeading.jsx'

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
    <section id="skills" className="mx-auto max-w-[1180px] border-b border-border px-5 py-16 sm:px-8 sm:py-24">
      <SectionHeading
        label="05 / SKILLS"
        title="Technical Skills"
        subtitle="Technologies I use daily — and a few I'm still leveling up on"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {BLOCKS.map((block) => (
          <div key={block.code} className="rounded-md border border-border bg-bg-elevated p-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="rounded-sm border border-accent px-1.5 py-0.5 font-mono text-xs text-accent">
                {block.code}
              </span>
              <h3 className="flex-1 text-lg font-semibold">{block.title}</h3>
              <span className="font-mono text-sm text-ink-faint">{block.items.length}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {block.items.map((item) => (
                <span key={item} className="rounded-full border border-border px-3 py-1 text-sm text-ink-dim">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
