// Orange Field button grammar (C): a solid orange primary, an ink-on-paper
// secondary, and a paper outline — each with a hard offset shadow that
// grows on hover and slams flat on press. `shadowColor` lets a caller swap
// the shadow for one that still reads against its background (an orange
// shadow disappears on an orange wall).
const BASE =
  'inline-flex items-center gap-2.5 border-[3px] border-ink px-6 py-3.5 font-display text-lg font-bold uppercase transition-[transform,box-shadow] duration-150 ease-out shadow-[6px_6px_0_var(--btn-shadow)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_var(--btn-shadow)] active:translate-x-1.5 active:translate-y-1.5 active:shadow-none'

const VARIANTS = {
  primary: { classes: 'bg-accent text-ink', shadow: 'var(--color-ink)' },
  secondary: { classes: 'bg-ink text-bg-elevated', shadow: 'var(--color-accent)' },
  outline: { classes: 'bg-bg-elevated text-ink', shadow: 'var(--color-ink)' },
}

export default function Button({ href, children, variant = 'primary', target, rel, className = '', onClick, style, shadowColor }) {
  const isExternal = target === '_blank'
  const { classes, shadow } = VARIANTS[variant] || VARIANTS.primary

  if (variant === 'link') {
    return (
      <a
        href={href}
        target={target}
        rel={isExternal ? rel || 'noopener' : rel}
        onClick={onClick}
        style={style}
        className={`group inline-flex items-center gap-2 border-b-[3px] border-ink pb-1 font-display text-lg font-bold uppercase text-ink transition-colors duration-150 hover:border-accent hover:text-accent-dim ${className}`}
      >
        {children}
      </a>
    )
  }

  return (
    <a
      href={href}
      target={target}
      rel={isExternal ? rel || 'noopener' : rel}
      onClick={onClick}
      style={{ ...style, '--btn-shadow': shadowColor || shadow }}
      className={`${BASE} ${classes} ${className}`}
    >
      {children}
    </a>
  )
}
