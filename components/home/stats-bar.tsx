'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { Container } from '@/components/shared/container'
import { STATS } from '@/lib/constants'

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1400
    const steps = 50
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
    <span ref={ref} className="text-6xl font-display font-bold text-shimmer-gold sm:text-7xl">
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export function StatsBar() {
  return (
    <section className="relative border-y border-gold-500/20 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 py-14 overflow-hidden">
      {/* Decorative top/bottom gold lines */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
      {/* Faint mandala backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-[0.04] bg-mandala-center pointer-events-none" />

      <Container className="relative z-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
        {STATS.map((stat, i) => (
          <div key={stat.label} className="text-center group">
            {/* Glowing dot accent */}
            <div className="w-1.5 h-1.5 rounded-full bg-gold-400/60 mx-auto mb-3 animate-gentle-pulse" />
            <CountUp value={stat.value} suffix={stat.suffix} />
            <p className="mt-2 text-lg font-semibold text-white/80 font-display">{stat.label}</p>
            <p className="text-sm font-bold text-white/40 mt-1 uppercase tracking-wider">{stat.sublabel}</p>
            {/* Bottom gold separator (not on last item) */}
            {i < STATS.length - 1 && (
              <div className="hidden sm:block absolute top-1/2 -right-4 w-[1px] h-12 bg-gradient-to-b from-transparent via-gold-500/30 to-transparent -translate-y-1/2" />
            )}
          </div>
        ))}
      </Container>
    </section>
  )
}
