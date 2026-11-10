export default function Hero() {
  return (
    <section id="about" className="mx-auto max-w-[1180px] border-b border-border px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-28">
      <div className="mb-4 font-mono text-xs tracking-[0.1em] text-accent">01 / PROFILE</div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div>
          <h1 className="font-mono text-4xl font-extrabold tracking-tight sm:text-6xl">ANEEQ SHAFFY</h1>
          <h2 className="mb-6 mt-1 text-xl font-semibold text-accent sm:text-2xl">Software Developer</h2>

          <p className="mb-4 max-w-[60ch] text-ink-dim">
            I build full-stack web apps — frontend, backend, and whatever's in between — and I'm
            currently doing that as a Software Engineer Intern at{' '}
            <a
              href="https://baylanka.net"
              target="_blank"
              rel="noopener"
              className="text-ink underline decoration-border underline-offset-4 hover:text-accent hover:decoration-accent"
            >
              Baylanka
            </a>
            . React, Next.js, Node.js, and a steadily growing tolerance for debugging other
            people's CSS at 1am.
          </p>
          <p className="mb-4 max-w-[60ch] text-ink-dim">
            Outside of shipping features, I'm into clean code, tidy git history, and figuring out
            why a bug that "shouldn't be possible" is, in fact, very possible. Based in Colombo,
            Sri Lanka — open to full-time, freelance, or just a good conversation about tech.
          </p>

          <div className="my-7 grid grid-cols-2 gap-x-8 gap-y-3 rounded border border-border bg-bg-elevated p-5">
            <MetaItem k="AGE" v="23" />
            <MetaItem k="LOCATION" v="Colombo, LK" />
            <MetaItem k="ROLE" v="Intern" />
            <MetaItem k="COMPANY" v="Baylanka" />
          </div>

          <div className="mb-6 flex flex-wrap gap-4">
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener"
              className="rounded-sm bg-accent px-6 py-3 font-mono text-sm font-bold tracking-wide text-bg transition-colors hover:bg-accent-dim"
            >
              Download CV
            </a>
            <a
              href="mailto:aneeqshaffy7@gmail.com?subject=Let%27s%20Connect"
              className="rounded-sm border border-border px-6 py-3 font-mono text-sm font-bold tracking-wide transition-colors hover:border-accent hover:text-accent"
            >
              Get In Touch
            </a>
          </div>

          <div className="flex gap-6 font-mono text-sm text-ink-dim">
            <a href="https://www.linkedin.com/in/aneeq-shaffy" target="_blank" rel="noopener" className="hover:text-accent">
              LinkedIn
            </a>
            <a href="https://github.com/aneeq-shaffy" target="_blank" rel="noopener" className="hover:text-accent">
              GitHub
            </a>
            <a href="tel:+94762844725" className="hover:text-accent">
              +94 76 284 4725
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="aspect-[3/4] w-full max-w-[320px] overflow-hidden rounded-md border border-border bg-bg-elevated">
            <img
              src="/assets/aneeq.png"
              alt="Aneeq Shaffy - Software Developer"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function MetaItem({ k, v }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[0.68rem] tracking-wide text-ink-faint">{k}</span>
      <span className="text-sm font-semibold">{v}</span>
    </div>
  )
}
