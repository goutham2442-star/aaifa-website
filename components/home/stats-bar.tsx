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
    const duration = 1200
    const steps = 40
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
    <span ref={ref} className="text-4xl font-display font-bold text-crimson sm:text-5xl">
      {count}
      {suffix}
    </span>
  )
}

export function StatsBar() {
  return (
    <section className="border-y border-border bg-surface-alt py-12">
      <Container className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <CountUp value={stat.value} suffix={stat.suffix} />
            <p className="mt-1 text-sm font-medium text-foreground">{stat.label}</p>
            <p className="text-xs text-muted-foreground">{stat.sublabel}</p>
          </div>
        ))}
      </Container>
    </section>
  )
}
