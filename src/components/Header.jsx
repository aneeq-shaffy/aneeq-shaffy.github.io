function Mark() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden>
      <path
        d="M12 2 L21 7.5 L21 16.5 L12 22 L3 16.5 L3 7.5 Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path d="M12 2 V22 M3 7.5 L21 16.5 M21 7.5 L3 16.5" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
    </svg>
  )
}

export default function Header({ slides, activeIndex, onNavigate }) {
  const contactIndex = slides.length - 1

  return (
    <header className="relative z-50 mx-auto flex w-full max-w-[1280px] items-center justify-between px-5 py-6 sm:px-8">
      <button onClick={() => onNavigate(0)} className="flex items-center gap-2 text-ink">
        <Mark />
      </button>

      <nav className="hidden items-center gap-8 text-[0.9rem] sm:flex">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => onNavigate(i)}
            className={`whitespace-nowrap transition-colors ${i === activeIndex ? 'text-ink' : 'text-ink-dim hover:text-ink'}`}
          >
            {s.label}
          </button>
        ))}
      </nav>

      <button
        onClick={() => onNavigate(contactIndex)}
        className="hidden items-center gap-1.5 border-b border-ink pb-0.5 text-[0.9rem] text-ink sm:flex"
      >
        Get in touch <span className="text-sm">↗</span>
      </button>

      <span className="font-mono text-xs text-ink-faint sm:hidden">
        {String(activeIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </span>
    </header>
  )
}
