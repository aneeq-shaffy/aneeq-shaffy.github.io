import SectionHeading from './SectionHeading.jsx'

const BULLETS = [
  'Build responsive web applications using React.js, Node.js, and modern JavaScript tooling.',
  'Collaborate with senior engineers and cross-functional teams on feature work, debugging, and performance tuning.',
  'Take part in code reviews, write clean, maintainable code, and work within a Git-based workflow.',
  'Picking up full-stack, database, and deployment experience in a production environment.',
]

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-[1180px] border-b border-border px-5 py-16 sm:px-8 sm:py-24">
      <SectionHeading
        label="02 / EXPERIENCE"
        title="Experience"
        subtitle="Professional work history & accomplishments"
      />

      <div className="grid grid-cols-1 gap-2 border-t border-border py-7 sm:grid-cols-[220px_1fr] sm:gap-8">
        <div className="pt-1 font-mono text-sm text-ink-faint">May 2025 — Present</div>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-xl font-semibold">Software Engineer Intern</h3>
            <span className="rounded-full border border-accent px-2.5 py-0.5 font-mono text-[0.68rem] tracking-wide text-accent">
              Internship
            </span>
          </div>
          <div className="mb-4 mt-1 text-sm text-ink-dim">Baylanka &middot; Remote</div>
          <ul className="flex list-disc flex-col gap-2 pl-5 text-sm text-ink-dim">
            {BULLETS.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
