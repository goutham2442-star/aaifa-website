'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { STATS } from '@/lib/constants'

// Neon color map
const neonStyles: Record<string, { glow: string; text: string; border: string; dot: string }> = {
  'neon-purple': {
    glow:   'shadow-[0_0_30px_rgba(168,85,247,0.4)]',
    text:   'text-purple-400',
    border: 'border-purple-500/30',
    dot:    'bg-purple-400',
  },
  'neon-blue': {
    glow:   'shadow-[0_0_30px_rgba(59,130,246,0.4)]',
    text:   'text-blue-400',
    border: 'border-blue-500/30',
    dot:    'bg-blue-400',
  },
  'neon-emerald': {
    glow:   'shadow-[0_0_30px_rgba(16,185,129,0.4)]',
    text:   'text-emerald-400',
    border: 'border-emerald-500/30',
    dot:    'bg-emerald-400',
  },
  'neon-gold': {
    glow:   'shadow-[0_0_30px_rgba(251,191,36,0.4)]',
    text:   'text-yellow-400',
    border: 'border-yellow-500/30',
    dot:    'bg-yellow-400',
  },
}

function CountUp({ value, suffix, color }: { value: number; suffix: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [count, setCount] = useState(0)
  const neon = neonStyles[color] ?? neonStyles['neon-gold']

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <div ref={ref} className="flex items-end justify-center gap-0.5">
      <span
        className={`text-5xl sm:text-6xl font-black font-display tabular-nums tracking-tight drop-shadow-[0_0_12px_currentColor] ${neon.text}`}
        style={{ textShadow: '0 0 20px currentColor' }}
      >
        {count.toLocaleString()}
      </span>
      <span className={`text-3xl sm:text-4xl font-black mb-1 ${neon.text}`}>{suffix}</span>
    </div>
  )
}

export function StatsBar() {
  return (
    <section className="relative py-20 bg-black overflow-hidden">
      {/* Ambient background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Top/bottom edge glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-bold uppercase tracking-[0.2em] text-white/50">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Institute Stats
          </span>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat) => {
            const color = (stat as any).color ?? 'neon-gold'
            const neon = neonStyles[color] ?? neonStyles['neon-gold']
            return (
              <div
                key={stat.label}
                className={`
                  relative group rounded-2xl p-6 sm:p-8 text-center
                  bg-white/[0.03] backdrop-blur-md
                  border ${neon.border}
                  ${neon.glow}
                  hover:scale-105 transition-all duration-300
                  hover:bg-white/[0.06]
                `}
              >
                {/* Corner accent dots */}
                <div className={`absolute top-3 left-3 w-1.5 h-1.5 rounded-full ${neon.dot} opacity-60`} />
                <div className={`absolute top-3 right-3 w-1.5 h-1.5 rounded-full ${neon.dot} opacity-60`} />

                {/* Count-up number */}
                <CountUp value={stat.value} suffix={stat.suffix} color={color} />

                {/* Label */}
                <p className="mt-3 text-sm sm:text-base font-bold text-white/90 font-display tracking-wide">
                  {stat.label}
                </p>

                {/* Sublabel */}
                <p className={`mt-1 text-xs font-semibold uppercase tracking-widest ${neon.text} opacity-70`}>
                  {stat.sublabel}
                </p>

                {/* Bottom glow bar */}
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] rounded-full ${neon.dot} opacity-40 group-hover:opacity-80 transition-opacity`} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
