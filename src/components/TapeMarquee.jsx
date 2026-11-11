const PHRASES = ['Open to work', 'Intern SE', 'Colombo', 'Ships tests']
const SKILLS = ['Java', 'TypeScript', 'React', 'Node.js', 'SQL', 'Git']

function Strip({ items, variant, reverse = false, rotate = -5 }) {
  const track = [...items, ...items]
  const orange = variant === 'orange'
  return (
    <div
      className={`border-y-[3px] border-ink py-3 ${orange ? 'bg-accent' : 'bg-bg-elevated'}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div
        className="flex w-max items-center gap-8 whitespace-nowrap"
        style={{ animation: `${reverse ? 'marquee-rtl' : 'marquee-ltr'} 22s linear infinite` }}
      >
        {track.map((word, i) => (
          <span key={`${word}-${i}`} className="flex items-center gap-8">
            {orange ? (
              <span className="font-display text-4xl font-bold uppercase leading-none tracking-tight text-ink sm:text-5xl">
                {word}
              </span>
            ) : (
              <span className="font-tag text-4xl leading-none text-ink sm:text-5xl">{word}</span>
            )}
            {orange ? (
              <span className="font-tag text-3xl text-ink">✶</span>
            ) : (
              <span className="h-3 w-3 border-2 border-ink bg-accent" />
            )}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function TapeMarquee() {
  return (
    <div className="overflow-hidden bg-wall py-16">
      <div className="flex flex-col gap-7 overflow-hidden">
        <Strip items={PHRASES} variant="orange" rotate={-5} />
        <Strip items={SKILLS} variant="paper" rotate={4} reverse />
      </div>
    </div>
  )
}
