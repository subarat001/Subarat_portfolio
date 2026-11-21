const arrows = {
  downRight: { box: '0 0 80 60', line: 'M4 6 C 40 2, 70 14, 68 46', head: 'M58 38 L68 50 L77 38' },
  right: { box: '0 0 80 60', line: 'M4 52 C 6 20, 34 6, 72 14', head: 'M62 4 L74 14 L63 24' },
  down: { box: '0 0 60 80', line: 'M34 4 C 14 22, 48 38, 30 70', head: 'M20 60 L30 72 L40 60' },
  left: { box: '0 0 80 60', line: 'M76 44 C 74 16, 44 4, 10 16', head: 'M22 4 L9 16 L21 27' },
}

export function Arrow({ variant = 'downRight', className = '' }) {
  const a = arrows[variant]
  return (
    <svg
      viewBox={a.box}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      overflow="visible"
    >
      <path className="draw" d={a.line} />
      <path className="draw" d={a.head} />
    </svg>
  )
}

export function Sparkle({ className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path className="draw" d="M3 8 L9 2 M5 13 L13 5 M9 18 L17 10" />
    </svg>
  )
}

export function Ring({ className = '' }) {
  return (
    <svg
      viewBox="10 0 340 140"
      preserveAspectRatio="none"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      overflow="visible"
    >
      <path
        className="draw"
        d="M28 98
           C 8 72, 12 36, 56 20
           C 100 6, 230 4, 288 20
           C 330 32, 338 62, 304 88
           C 268 114, 150 124, 90 114
           C 46 106, 22 86, 30 62
           C 34 50, 44 42, 58 36"
      />
    </svg>
  )
}

export function Burst({ className = '', flip = false }) {
  return (
    <svg
      viewBox="0 0 56 44"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
    >
      <g transform={flip ? 'translate(56 0) scale(-1 1)' : undefined}>
        <path className="burst-line" d="M10 28 L6 13" />
        <path className="burst-line" d="M24 24 L32 11" />
        <path className="burst-line" d="M30 37 L48 33" />
      </g>
    </svg>
  )
}

export function Star({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 0C13 7 17 11 24 12C17 13 13 17 12 24C11 17 7 13 0 12C7 11 11 7 12 0Z" />
    </svg>
  )
}