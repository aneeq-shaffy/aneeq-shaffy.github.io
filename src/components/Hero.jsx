import { useEffect, useRef } from 'react'
import { createTimeline, stagger } from 'animejs'
import Button from './Button.jsx'
import IconButton from './IconButton.jsx'
import TagReveal from './TagReveal.jsx'
import { ICON_PATHS } from '../lib/icons.js'

function SplitLine({ text, lineRef }) {
  return (
    <span className="block overflow-hidden">
      <span ref={lineRef} className="block" style={{ transform: 'translateY(105%)' }}>
        {text}
      </span>
    </span>
  )
}

export default function Hero() {
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const chipsRef = useRef(null)
  const stickerRef = useRef(null)
  const stickerImgRef = useRef(null)
  const ctasRef = useRef(null)
  const socialsRef = useRef(null)
  const bioRef = useRef(null)
  const noteRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      ;[line1Ref, line2Ref].forEach((r) => r.current && (r.current.style.transform = 'translateY(0)'))
      if (chipsRef.current) chipsRef.current.style.opacity = '1'
      if (stickerRef.current) stickerRef.current.style.transform = 'rotate(-7deg) scale(1)'
      if (ctasRef.current) Array.from(ctasRef.current.children).forEach((c) => (c.style.transform = 'scale(1)'))
      if (socialsRef.current) Array.from(socialsRef.current.children).forEach((c) => (c.style.transform = 'scale(1)'))
      if (bioRef.current) bioRef.current.style.opacity = '1'
      if (noteRef.current) noteRef.current.style.opacity = '1'
      return
    }

    const tl = createTimeline({ defaults: { ease: 'outExpo' } })
    tl.add([line1Ref.current, line2Ref.current], { translateY: ['105%', '0%'], duration: 750, delay: stagger(100) }, 0)
      .add(chipsRef.current, { opacity: [0, 1], translateY: [10, 0], duration: 500 }, 500)
      .add(noteRef.current, { opacity: [0, 1], translateY: [10, 0], duration: 500 }, 600)
      .add(bioRef.current, { opacity: [0, 1], translateY: [12, 0], duration: 550 }, 680)
      .add(
        stickerRef.current,
        { scale: [1.7, 1], rotate: [-24, -7], duration: 650, ease: 'outBack' },
        500,
      )
      .add(
        stickerImgRef.current,
        {
          onUpdate: (self) => {
            const p = self.progress
            stickerImgRef.current.style.filter = `drop-shadow(${p * 10}px ${p * 12}px 0 #121311)`
          },
          duration: 400,
        },
        900,
      )
      .add(
        Array.from(ctasRef.current.children),
        { scale: [0, 1], rotate: [0, 0], duration: 450, ease: 'outBack', delay: stagger(120) },
        950,
      )
      .add(
        Array.from(socialsRef.current.children),
        { scale: [0, 1], duration: 400, ease: 'outBack', delay: stagger(80) },
        1150,
      )

    return () => tl.pause()
  }, [])

  return (
    <section id="about" className="relative overflow-hidden border-b-[3px] border-ink bg-accent">
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <div className="mb-5 font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink">
              Aneeq Shaffy — Portfolio 2026
            </div>

            <h1 className="font-display text-[14vw] font-bold uppercase leading-[0.85] tracking-tight text-ink sm:text-[6.5rem] lg:text-[5.5rem]">
              <SplitLine text="Software" lineRef={line1Ref} />
              <SplitLine text="Developer" lineRef={line2Ref} />
            </h1>

            <div ref={noteRef} className="mt-5 max-w-[42ch] font-marker text-2xl text-accent-dim opacity-0" style={{ transform: 'rotate(-3deg)' }}>
              fresh build. ready to ship →
            </div>

            <div ref={chipsRef} className="mt-7 flex flex-wrap gap-3 opacity-0">
              <StatChip value="+3" label="Projects shipped" />
              <StatChip value="+1" label="Internship live" />
              <StatChip value="#1" label="Debugging enthusiast" />
            </div>

            <p ref={bioRef} className="mt-7 max-w-[52ch] text-[17px] leading-[1.55] text-ink opacity-0">
              Currently a Software Engineer Intern at{' '}
              <a href="https://baylanka.net" target="_blank" rel="noopener" className="font-bold underline underline-offset-2">
                Baylanka
              </a>
              , a German-Sri Lankan custom software studio. I build on two real products —{' '}
              <strong className="font-bold">Onres24</strong>, a flight-school management platform, and{' '}
              <strong className="font-bold">Woblu Maintenance</strong>, a property-management system for insurance
              agencies. PHP, MySQL, jQuery, and Bootstrap, day in and day out.
            </p>

            <div ref={ctasRef} className="mt-8 flex flex-wrap items-center gap-5">
              <span className="inline-flex origin-left" style={{ transform: 'scale(0)' }}>
                <Button href="mailto:aneeqshaffy7@gmail.com?subject=Let%27s%20Connect" variant="secondary" shadowColor="var(--color-ink)">
                  See the work
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" style={{ stroke: 'currentColor', strokeWidth: 2.5, strokeLinecap: 'square' }}>
                    <path d={ICON_PATHS['arrow-right']} />
                  </svg>
                </Button>
              </span>
              <span className="inline-flex origin-left" style={{ transform: 'scale(0)' }}>
                <Button href="/cv.pdf" target="_blank" variant="outline">
                  Download CV
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" style={{ stroke: 'currentColor', strokeWidth: 2.5, strokeLinecap: 'square' }}>
                    <path d={ICON_PATHS.download} />
                  </svg>
                </Button>
              </span>
            </div>

            <div ref={socialsRef} className="mt-6 flex gap-3">
              <span style={{ transform: 'scale(0)' }} className="inline-flex">
                <IconButton href="https://github.com/aneeq-shaffy" target="_blank" label="GitHub" path={ICON_PATHS.github} />
              </span>
              <span style={{ transform: 'scale(0)' }} className="inline-flex">
                <IconButton href="https://www.linkedin.com/in/aneeq-shaffy" target="_blank" label="LinkedIn" path={ICON_PATHS.linkedin} />
              </span>
              <span style={{ transform: 'scale(0)' }} className="inline-flex">
                <IconButton href="mailto:aneeqshaffy7@gmail.com" label="Email" path={ICON_PATHS.mail} />
              </span>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-[340px] items-center justify-center">
            <div
              ref={stickerRef}
              className="relative w-full"
              style={{ transform: 'rotate(-24deg) scale(1.7)' }}
            >
              <img
                ref={stickerImgRef}
                src="/assets/orange/me-sticker.png"
                alt="Aneeq Shaffy"
                className="w-full"
                style={{ filter: 'drop-shadow(0px 0px 0 #121311)' }}
              />
              <div className="absolute -bottom-4 -right-6 sm:-bottom-6 sm:-right-10">
                <TagReveal text="Aneeq" trigger="mount" delay={1000} rotate={-8} stroke className="text-[14vw] sm:text-7xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatChip({ value, label }) {
  return (
    <div className="flex items-center gap-2.5 border-2 border-ink bg-bg-elevated px-3.5 py-2">
      <span className="font-display text-xl font-bold leading-none text-ink">{value}</span>
      <span className="font-mono text-[11px] uppercase leading-tight tracking-wide text-ink-dim">{label}</span>
    </div>
  )
}
