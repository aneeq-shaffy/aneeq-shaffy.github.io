import SectionHeading from './SectionHeading.jsx'

export default function Education() {
  return (
    <section id="education" className="mx-auto max-w-[1180px] border-b border-border px-5 py-16 sm:px-8 sm:py-24">
      <SectionHeading label="04 / EDUCATION" title="Education" subtitle="Academic background & qualifications" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-md border border-border bg-bg-elevated p-7">
          <div className="mb-2 font-mono text-sm text-ink-faint">Feb 2021 — 2026</div>
          <h3 className="mb-1 text-lg font-semibold">BSc (Hons) in Information Technology</h3>
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
        </div>

        <div className="rounded-md border border-border bg-bg-elevated p-7">
          <div className="mb-2 font-mono text-sm text-ink-faint">Sep 2017 — Mar 2019</div>
          <h3 className="mb-1 text-lg font-semibold">Cambridge International A Level — Commerce</h3>
          <div className="mb-4 text-sm text-accent">Lyceum International School, Nugegoda</div>
          <div>
            <span className="mb-2 block font-mono text-[0.68rem] tracking-wide text-ink-faint">Subjects</span>
            <PillRow items={['Mathematics', 'Accounting', 'Economics', 'Business Studies']} />
          </div>
        </div>
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
