import Reveal from './Reveal.jsx'

export default function SectionHeading({ label, title, subtitle }) {
  return (
    <>
      <Reveal delay={0} className="mb-4 font-mono text-xs tracking-[0.1em] text-accent">
        {label}
      </Reveal>
      <Reveal delay={0.08} as="h2" className="mb-1 text-3xl font-extrabold tracking-tight sm:text-4xl">
        {title}
      </Reveal>
      <Reveal delay={0.14} as="p" className="mb-10 text-ink-dim">
        {subtitle}
      </Reveal>
    </>
  )
}
