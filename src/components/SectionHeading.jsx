export default function SectionHeading({ label, title, subtitle }) {
  return (
    <>
      <div className="mb-4 font-mono text-xs tracking-[0.1em] text-accent">{label}</div>
      <h2 className="mb-1 text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
      <p className="mb-10 text-ink-dim">{subtitle}</p>
    </>
  )
}
