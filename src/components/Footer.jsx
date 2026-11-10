import { useEffect, useRef } from 'react'
import { animate, utils } from 'animejs'

const NAV = [
  { label: 'about', index: 0 },
  { label: 'experience', index: 1 },
  { label: 'projects', index: 2 },
  { label: 'education', index: 3 },
  { label: 'skills', index: 4 },
]

function LetterLink({ label, index, onNavigate }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const letters = ref.current.querySelectorAll('.nav-letter')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(letters, {
            translateY: [10, 0],
            opacity: [0, 1],
            duration: 500,
            delay: utils.stagger(18),
            ease: 'outQuad',
          })
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <button
      onClick={() => onNavigate(index)}
      className="block w-max text-left font-display text-2xl font-semibold uppercase text-ink transition-colors hover:text-ink-dim sm:text-3xl"
    >
      <span ref={ref} aria-label={label}>
        {label.split('').map((ch, i) => (
          <span key={i} aria-hidden className="nav-letter inline-block opacity-0">
            {ch === ' ' ? ' ' : ch}
          </span>
        ))}
      </span>
    </button>
  )
}

export default function Footer({ onNavigate = () => {} }) {
  return (
    <section className="mx-auto max-w-[1280px] border-t border-border px-5 py-16 sm:px-8 sm:py-20">
      <div className="flex flex-col gap-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <nav aria-label="Primary" className="flex flex-col gap-3">
            {NAV.map((item) => (
              <LetterLink key={item.index} {...item} onNavigate={onNavigate} />
            ))}
          </nav>

          <div className="text-right">
            <h2 className="font-display text-3xl font-bold uppercase leading-[0.95] text-ink sm:text-5xl">
              Keep
              <br />
              Building<span className="text-ink-faint">.</span>
            </h2>
            <p className="mt-4 max-w-[26ch] text-sm text-ink-dim sm:ml-auto">
              Open to full-time, freelance, and the occasional 1am debugging war story.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-border pt-6 font-mono text-xs text-ink-faint sm:flex-row sm:items-center">
          <span>© 2026 Aneeq Shaffy. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/in/aneeq-shaffy" target="_blank" rel="noopener" className="hover:text-ink">
              LinkedIn
            </a>
            <a href="https://github.com/aneeq-shaffy" target="_blank" rel="noopener" className="hover:text-ink">
              GitHub
            </a>
            <a href="mailto:aneeqshaffy7@gmail.com" className="hover:text-ink">
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
