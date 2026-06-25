'use client'

import Link from 'next/link'
import * as Icons from 'lucide-react'
import { motion } from 'framer-motion'
import { ArrowRight, Users, Star } from 'lucide-react'
import type { PROGRAMS } from '@/lib/constants'

type ProgramItem = (typeof PROGRAMS)[number]

// Images provided by institute owner — stored in /public/programs/
const PROGRAM_BACKGROUNDS: Record<string, { url: string; position: string }> = {
  'bharatanatyam':    { url: '/programs/bharatanatyam.jpg',    position: 'object-center' },
  'carnatic-music':   { url: '/programs/carnatic-music.jpg',   position: 'object-top' },
  'mridangam':        { url: '/programs/mridangam.jpg',        position: 'object-center' },
  'drawing-painting': { url: '/programs/drawing-painting.jpg', position: 'object-center' },
  'workshops':        { url: 'https://avighnaabhyasainstitute.in/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-22-at-13.40.41.jpeg', position: 'object-top' },
  'certification':    { url: '/programs/certification.jpg',    position: 'object-center' },
}

export function ProgramCard({ program, index }: { program: ProgramItem; index: number }) {
  const Icon = (Icons as any)[program.icon] ?? Icons.Sparkles
  const bgData = PROGRAM_BACKGROUNDS[program.slug] ?? PROGRAM_BACKGROUNDS['bharatanatyam']
  const bgImage = bgData.url
  const bgPosition = bgData.position

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.12, type: 'spring', stiffness: 70 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative h-full flex flex-col group"
    >
      {/* Card with dark photo background */}
      <div className="relative flex h-full min-h-[420px] flex-col rounded-2xl overflow-hidden shadow-xl border border-white/10 transition-all duration-500 group-hover:shadow-2xl group-hover:border-gold-400/40">

        {/* Background Photo Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src={bgImage}
            alt={program.title}
            className={`h-full w-full object-cover ${bgPosition} transition-transform duration-700 group-hover:scale-110`}
          />
          {/* Dark cinematic gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/30" />
          {/* Brand color tint on hover */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
            style={{ backgroundColor: program.color }}
          />
        </div>

        {/* Top area — icon badge */}
        <div className="relative z-10 p-6 flex items-start justify-between">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl backdrop-blur-sm border transition-transform duration-500 group-hover:scale-110"
            style={{ 
              backgroundColor: `${program.color}30`,
              borderColor: `${program.color}50`,
            }}
          >
            <Icon className="h-6 w-6" style={{ color: '#fcd34d' }} />
          </div>

          <span 
            className="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm border border-white/20"
            style={{ backgroundColor: `${program.color}40` }}
          >
            <Users className="h-3 w-3 opacity-70" /> Age {program.minAge}
          </span>
        </div>

        {/* Bottom content area */}
        <div className="relative z-10 mt-auto p-6 pt-0">

          {/* Mode badge */}
          <span className="inline-block mb-3 text-xs uppercase font-bold tracking-widest text-gold-300/90">
            {program.mode === 'hybrid' ? '🌐 Online + Offline' : '🏛 Offline Classes'}
          </span>

          <h3 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight group-hover:text-gold-200 transition-colors duration-300">
            {program.title}
          </h3>
          <p className="text-sm font-semibold text-gold-400/80 tracking-wide uppercase mt-1">
            {program.subtitle}
          </p>
          <p className="mt-3 text-base leading-relaxed text-white/75 line-clamp-2 font-body">
            {program.description}
          </p>

          {/* Key highlights as pills */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {program.highlights.slice(0, 3).map((h) => (
              <span
                key={h}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm"
              >
                <Star className="h-3 w-3 text-gold-400" /> {h}
              </span>
            ))}
          </div>

          {/* CTA footer */}
          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gold-300 transition-all duration-300 group-hover:text-white">
              Explore Program <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </span>
            {program.featured && (
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400 border border-gold-400/30 rounded-full px-2.5 py-0.5">
                Featured
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
