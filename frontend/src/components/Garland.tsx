'use client'
import Image from 'next/image'

const colors = ['#facc15', '#ec4899', '#60a5fa', '#a78bfa', '#fb923c', '#ef4444']

const bulbs = [
  { x: 120, y: 70 },
  { x: 300, y: 75 },
  { x: 520, y: 65 },
  { x: 740, y: 75 },
  { x: 960, y: 68 },
  { x: 1180, y: 75 },
  { x: 1400, y: 65 },
  { x: 1620, y: 75 },
]

export default function Garland() {
  return (
    <div className="garland">
      {/* Провод */}
      <Image
        src="/image/Rope.svg"
        alt="Garland wire"
        width={1920}
        height={82}
        priority
        style={{ position: 'relative', zIndex: 1 }}
      />

      {/* Шары */}
      <svg
        viewBox="0 0 1920 120"
        width="100%"
        height="120"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <defs>
          <radialGradient id="glassGradient" cx="30%" cy="30%">
            <stop offset="0%" stopColor="rgba(255,255,255,.9)" />
            <stop offset="40%" stopColor="currentColor" />
            <stop offset="100%" stopColor="rgba(0,0,0,.4)" />
          </radialGradient>

          <pattern
            id="stripes"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <rect width="4" height="8" fill="rgba(255,255,255,.35)" />
          </pattern>
        </defs>

        {bulbs.map((b, i) => (
          <g
            key={i}
            className="bulb"
            style={{
              color: colors[i % colors.length],
              animationDelay: `${i * 0.4}s`,
            }}
          >
            {/* тело */}
            <circle
              cx={b.x}
              cy={b.y}
              r="28"
              fill="url(#glassGradient)"
            />

            {/* полоски */}
            <circle
              cx={b.x}
              cy={b.y}
              r="28"
              fill="url(#stripes)"
            />

            {/* блик */}
            <circle
              cx={b.x - 8}
              cy={b.y - 10}
              r="8"
              fill="rgba(255,255,255,.35)"
            />
          </g>
        ))}
      </svg>
    </div>
  )
}
