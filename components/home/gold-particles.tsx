'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  maxOpacity: number;
  color: string;
}

export function GoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 120 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    const particleCount = 45

    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.clientWidth
        canvas.height = parent.clientHeight
      }
    }

    const colors = [
      'rgba(217, 119, 6, 0.45)',  // Gold 500
      'rgba(251, 191, 36, 0.35)', // Gold 400
      'rgba(253, 230, 138, 0.25)', // Gold 200
      'rgba(254, 243, 199, 0.2)'   // Gold 100
    ]

    const createParticle = (initY = false): Particle => {
      return {
        x: Math.random() * canvas.width,
        y: initY ? Math.random() * canvas.height : canvas.height + 10,
        size: Math.random() * 2.5 + 0.8,
        speedY: -(Math.random() * 0.4 + 0.15),
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: 0,
        maxOpacity: Math.random() * 0.6 + 0.15,
        color: colors[Math.floor(Math.random() * colors.length)]
      }
    }

    // Initialize particles
    resizeCanvas()
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(true))
    }

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, idx) => {
        // Drifting motion
        p.y += p.speedY
        p.x += p.speedX

        // Fade in when starting, fade out near the top
        if (p.opacity < p.maxOpacity && p.y > canvas.height * 0.2) {
          p.opacity += 0.01
        } else if (p.y < canvas.height * 0.2) {
          p.opacity -= 0.005
        }

        // Repelled by mouse interaction
        const dx = p.x - mouseRef.current.x
        const dy = p.y - mouseRef.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < mouseRef.current.radius) {
          const force = (mouseRef.current.radius - distance) / mouseRef.current.radius
          p.x += (dx / distance) * force * 1.5
          p.y += (dy / distance) * force * 1.5
        }

        // Draw particle
        if (p.opacity > 0) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${p.opacity})`)
          ctx.fill()
        }

        // Recycle particles that go off-screen or fade completely
        if (p.y < -10 || p.opacity <= 0) {
          particles[idx] = createParticle(false)
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    // Mouse handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000
      mouseRef.current.y = -1000
    }

    // Bind listeners
    window.addEventListener('resize', resizeCanvas)
    const parent = canvas.parentElement
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove)
      parent.addEventListener('mouseleave', handleMouseLeave)
    }

    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove)
        parent.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1] mix-blend-screen"
    />
  )
}
