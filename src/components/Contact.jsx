import SectionHeading from './SectionHeading.jsx'

const ROWS = [
  { k: 'Email', v: 'aneeqshaffy7@gmail.com', href: 'mailto:aneeqshaffy7@gmail.com?subject=Let%27s%20Connect' },
  { k: 'Phone', v: '+94 76 284 4725', href: 'tel:+94762844725' },
  { k: 'Location', v: 'Kalubowila, Colombo, Sri Lanka' },
  { k: 'LinkedIn', v: 'linkedin.com/in/aneeq-shaffy', href: 'https://www.linkedin.com/in/aneeq-shaffy' },
  { k: 'GitHub', v: 'github.com/aneeq-shaffy', href: 'https://github.com/aneeq-shaffy' },
]

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-[1180px] border-b border-border px-5 py-16 sm:px-8 sm:py-24">
      <SectionHeading
        label="06 / CONTACT"
        title="Get In Touch"
        subtitle="Let's connect and build something worth shipping"
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          {ROWS.map((row) => (
            <div
              key={row.k}
              className="flex flex-wrap items-center justify-between gap-2 border-t border-border py-4 text-sm"
            >
              <span className="font-mono text-xs text-ink-faint">{row.k}</span>
              {row.href ? (
                <a
                  href={row.href}
                  target={row.href.startsWith('http') ? '_blank' : undefined}
                  rel={row.href.startsWith('http') ? 'noopener' : undefined}
                  className="hover:text-accent"
                >
                  {row.v}
                </a>
              ) : (
                <span>{row.v}</span>
              )}
            </div>
          ))}
        </div>

        <div className="rounded-md border border-border bg-bg-elevated p-8">
          <h3 className="mb-4 text-xl font-semibold">Let's collaborate</h3>
          <p className="mb-7 text-sm text-ink-dim">
            Open to full-time, freelance, and contract work — frontend, backend, or full-stack.
            Comfortable across React, Next.js, Node.js, and modern development practices. Usually
            replies within 24 hours — call for anything urgent.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:aneeqshaffy7@gmail.com?subject=Let%27s%20Connect&body=Hi%20Aneeq%2C"
              className="rounded-sm bg-accent px-6 py-3 font-mono text-sm font-bold tracking-wide text-bg transition-colors hover:bg-accent-dim"
            >
              Email Me
            </a>
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener"
              className="rounded-sm border border-border px-6 py-3 font-mono text-sm font-bold tracking-wide transition-colors hover:border-accent hover:text-accent"
            >
              View CV
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
