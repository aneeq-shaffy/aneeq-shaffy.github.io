// "AS" monogram mark (M · mark-as.svg): two overlapping squares, ink behind
// orange, with the initials stencilled through.
export default function Logo({ size = 40 }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden>
      <rect x="14" y="14" width="100" height="100" fill="var(--color-ink)" />
      <rect x="6" y="6" width="100" height="100" fill="var(--color-bg-elevated)" stroke="var(--color-ink)" strokeWidth="6" />
      <text x="56" y="82" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="58" letterSpacing="-4" fill="var(--color-ink)">
        AS
      </text>
    </svg>
  )
}
