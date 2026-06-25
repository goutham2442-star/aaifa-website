'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProgramCard } from '@/components/programs/program-card'
import { PROGRAMS } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { X, Sparkles, Clock, Globe, Award, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

type ProgramItem = (typeof PROGRAMS)[number]

const CATEGORIES = [
  { id: 'all', label: 'All Programs' },
  { id: 'classical', label: 'Classical Dance & Vocal' },
  { id: 'visual', label: 'Fine & Visual Arts' },
  { id: 'academic', label: 'Workshops & Exam Prep' },
]

export function ProgramsListingClient() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null)

  const getCategory = (slug: string) => {
    if (slug === 'bharatanatyam' || slug === 'carnatic-music' || slug === 'mridangam') {
      return 'classical'
    }
    if (slug === 'drawing-painting') {
      return 'visual'
    }
    return 'academic'
  }

  const filteredPrograms = PROGRAMS.filter((program) => {
    if (activeCategory === 'all') return true
    return getCategory(program.slug) === activeCategory
  })

  return (
    <>
      {/* Dynamic Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-2xl mx-auto">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id)
                setSelectedProgram(null)
              }}
              className={`relative px-6 py-3 rounded-full text-sm md:text-base font-semibold tracking-wide uppercase transition-all duration-300 ${
                isActive 
                  ? 'text-white shadow-lg' 
                  : 'text-muted-foreground hover:text-foreground bg-white/50 border border-gold-200/20'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute inset-0 bg-gradient-to-r from-crimson to-crimson-600 rounded-full -z-10 shadow-lg shadow-crimson-500/20"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Interactive Grid Showcase */}
      <motion.div 
        layout
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredPrograms.map((program, i) => (
            <motion.div
              key={program.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => {
                // Ignore clicks on buttons/links so they proceed naturally
                const target = e.target as HTMLElement
                if (target.closest('a') || target.closest('button')) return
                e.preventDefault()
                setSelectedProgram(program)
              }}
              className="cursor-pointer"
            >
              <ProgramCard program={program} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Hint banner */}
      <p className="text-center text-sm text-muted-foreground/80 mt-10 italic font-medium">
        💡 Click on any card for an interactive quick preview of the syllabus, schedule, and certification details.
      </p>

      {/* Dynamic Detail Overlay (Modal Drawer) */}
      <AnimatePresence>
        {selectedProgram && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProgram(null)}
              className="absolute inset-0"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', stiffness: 260, damping: 25 }}
              className="relative w-full max-w-2xl bg-white/95 rounded-3xl border border-white/80 p-6 md:p-8 shadow-2xl overflow-hidden z-10 backdrop-blur-md max-h-[90vh] overflow-y-auto"
            >
              <div className="absolute right-0 top-0 w-48 h-48 opacity-[0.04] text-gold-600 bg-mandala-center pointer-events-none" />

              <button
                onClick={() => setSelectedProgram(null)}
                className="absolute right-6 top-6 p-2 rounded-full bg-surface-alt hover:bg-gold-50 border border-gold-200/20 text-foreground transition-colors duration-300"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border"
                  style={{ 
                    backgroundColor: `${selectedProgram.color}15`, 
                    borderColor: `${selectedProgram.color}30` 
                  }}
                >
                  <Sparkles className="h-7 w-7" style={{ color: selectedProgram.color }} />
                </div>
                <div>
                  <span className="text-xs font-bold text-crimson tracking-wider uppercase">
                    {selectedProgram.subtitle}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-0.5">
                    {selectedProgram.title}
                  </h3>
                </div>
              </div>

              <p className="text-base text-foreground/80 leading-relaxed mb-6 font-body">
                {selectedProgram.description}
              </p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-surface rounded-xl p-3 border border-gold-200/10 text-center">
                  <Clock className="h-5 w-5 mx-auto mb-1 text-gold-500" />
                  <span className="block text-xs uppercase font-bold text-muted-foreground">Min Age</span>
                  <span className="text-sm font-semibold text-foreground">{selectedProgram.minAge}</span>
                </div>
                <div className="bg-surface rounded-xl p-3 border border-gold-200/10 text-center">
                  <Globe className="h-5 w-5 mx-auto mb-1 text-gold-500" />
                  <span className="block text-xs uppercase font-bold text-muted-foreground">Mode</span>
                  <span className="text-sm font-semibold text-foreground uppercase">{selectedProgram.mode}</span>
                </div>
                <div className="bg-surface rounded-xl p-3 border border-gold-200/10 text-center">
                  <Award className="h-5 w-5 mx-auto mb-1 text-gold-500" />
                  <span className="block text-xs uppercase font-bold text-muted-foreground">Syllabus</span>
                  <span className="text-xs font-semibold text-foreground text-center block leading-tight">Bir Tikendrajit University Affiliated</span>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-sm font-bold uppercase tracking-widest text-gold-600 mb-3 flex items-center gap-1.5">
                  <Sparkles className="h-4.5 w-4.5 text-gold-500" /> What You'll Learn
                </h4>
                <div className="grid sm:grid-cols-2 gap-2">
                  {selectedProgram.highlights.map((highlight) => (
                    <div key={highlight} className="flex items-start gap-2 bg-surface-alt/50 p-2.5 rounded-lg border border-gold-200/5">
                      <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span className="text-xs font-medium text-foreground/80">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-border/40">
                <Button
                  onClick={() => setSelectedProgram(null)}
                  variant="ghost"
                  className="w-full sm:w-auto text-sm font-bold uppercase tracking-wider text-muted-foreground hover:bg-gold-50 rounded-full"
                >
                  Close Preview
                </Button>
                <Button
                  asChild
                  className="w-full sm:w-auto bg-crimson hover:bg-crimson-700 text-white rounded-full text-sm font-bold uppercase tracking-wider py-6 px-8 shadow-md hover:shadow-crimson-500/10"
                >
                  <Link href="/contact" onClick={() => setSelectedProgram(null)}>
                    Register / Inquiry <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full sm:w-auto border-gold-400 text-gold-600 hover:bg-gold-50 rounded-full text-sm font-bold uppercase tracking-wider py-6 px-8"
                >
                  <Link href={`/programs/${selectedProgram.slug}`} onClick={() => setSelectedProgram(null)}>
                    Read Full Details
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
