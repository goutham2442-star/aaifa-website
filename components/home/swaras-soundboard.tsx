'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Volume2, Sparkles, Music } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { SectionHeading } from '@/components/shared/section-heading'

// Ragas and their respective swara frequency ratios (based on a base C4 frequency of ~261.63 Hz)
const BASE_FREQ = 261.63 // C4 (Sa)

interface Swara {
  name: string;
  fullName: string;
  // Frequency ratio relative to base Sa
  ratio: number;
}

const RAGAS = [
  {
    name: 'Mayamalavagowla',
    description: 'The primary scale of Carnatic instruction. Represents a peaceful morning mood.',
    color: '#B91C1C', // Crimson tint
    swaras: [
      { name: 'Sa', fullName: 'Shadjama', ratio: 1.0 },
      { name: 'Ri', fullName: 'Suddha Rishabha', ratio: 1.0667 }, // Flat 2nd
      { name: 'Ga', fullName: 'Antara Gandhara', ratio: 1.25 },    // Major 3rd
      { name: 'Ma', fullName: 'Suddha Madhyama', ratio: 1.3333 },  // Perfect 4th
      { name: 'Pa', fullName: 'Panchama', ratio: 1.5 },          // Perfect 5th
      { name: 'Dha', fullName: 'Suddha Dhaivata', ratio: 1.6 },   // Flat 6th
      { name: 'Ni', fullName: 'Kakali Nishada', ratio: 1.875 },   // Major 7th
      { name: 'Sa\'', fullName: 'Shadjama (Octave)', ratio: 2.0 },
    ]
  },
  {
    name: 'Kalyani',
    description: 'A majestic, auspicious scale full of light, grace, and energy.',
    color: '#D97706', // Gold tint
    swaras: [
      { name: 'Sa', fullName: 'Shadjama', ratio: 1.0 },
      { name: 'Ri', fullName: 'Chatusruti Rishabha', ratio: 1.125 }, // Major 2nd
      { name: 'Ga', fullName: 'Antara Gandhara', ratio: 1.25 },     // Major 3rd
      { name: 'Ma', fullName: 'Prati Madhyama', ratio: 1.4063 },     // Sharp 4th
      { name: 'Pa', fullName: 'Panchama', ratio: 1.5 },           // Perfect 5th
      { name: 'Dha', fullName: 'Chatusruti Dhaivata', ratio: 1.6875 }, // Major 6th
      { name: 'Ni', fullName: 'Kakali Nishada', ratio: 1.875 },     // Major 7th
      { name: 'Sa\'', fullName: 'Shadjama (Octave)', ratio: 2.0 },
    ]
  },
  {
    name: 'Sankarabharanam',
    description: 'Equivalent to the Western Major scale. Expresses grandeur, joy, and peace.',
    color: '#0D9488', // Teal tint
    swaras: [
      { name: 'Sa', fullName: 'Shadjama', ratio: 1.0 },
      { name: 'Ri', fullName: 'Chatusruti Rishabha', ratio: 1.125 }, // Major 2nd
      { name: 'Ga', fullName: 'Antara Gandhara', ratio: 1.25 },     // Major 3rd
      { name: 'Ma', fullName: 'Suddha Madhyama', ratio: 1.3333 },   // Perfect 4th
      { name: 'Pa', fullName: 'Panchama', ratio: 1.5 },           // Perfect 5th
      { name: 'Dha', fullName: 'Chatusruti Dhaivata', ratio: 1.6875 }, // Major 6th
      { name: 'Ni', fullName: 'Kakali Nishada', ratio: 1.875 },     // Major 7th
      { name: 'Sa\'', fullName: 'Shadjama (Octave)', ratio: 2.0 },
    ]
  }
]

export function SwarasSoundboard() {
  const [selectedRagaIdx, setSelectedRagaIdx] = useState(0)
  const [activeSwaraIdx, setActiveSwaraIdx] = useState<number | null>(null)
  const currentRaga = RAGAS[selectedRagaIdx]
  
  const audioCtxRef = useRef<AudioContext | null>(null)

  // Web Audio Synth to generate a beautiful plucked string (Veena-like) tone
  const playNote = (frequency: number, index: number) => {
    setActiveSwaraIdx(index)
    setTimeout(() => setActiveSwaraIdx(null), 800)

    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }
      
      const ctx = audioCtxRef.current
      if (ctx.state === 'suspended') {
        ctx.resume()
      }

      // Master gain
      const masterGain = ctx.createGain()
      masterGain.gain.setValueAtTime(0.25, ctx.currentTime)
      masterGain.connect(ctx.destination)

      // Create fundamental oscillator (sine wave for warmth)
      const osc1 = ctx.createOscillator()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(frequency, ctx.currentTime)

      // Create primary harmonic (triangle wave for Veena body resonance)
      const osc2 = ctx.createOscillator()
      osc2.type = 'triangle'
      osc2.frequency.setValueAtTime(frequency * 2, ctx.currentTime)

      // Create high harmonic (sawtooth wave for string buzz - Javari effect)
      const osc3 = ctx.createOscillator()
      osc3.type = 'sine'
      osc3.frequency.setValueAtTime(frequency * 3, ctx.currentTime)

      // Gains for harmonics
      const g1 = ctx.createGain()
      const g2 = ctx.createGain()
      const g3 = ctx.createGain()

      // Envelope configuration for natural pluck & decay
      const now = ctx.currentTime
      
      g1.gain.setValueAtTime(0, now)
      g1.gain.linearRampToValueAtTime(0.8, now + 0.02) // Rapid pluck
      g1.gain.exponentialRampToValueAtTime(0.001, now + 1.2) // Long string decay

      g2.gain.setValueAtTime(0, now)
      g2.gain.linearRampToValueAtTime(0.4, now + 0.02)
      g2.gain.exponentialRampToValueAtTime(0.001, now + 0.8) // Resonance decay

      g3.gain.setValueAtTime(0, now)
      g3.gain.linearRampToValueAtTime(0.15, now + 0.01)
      g3.gain.exponentialRampToValueAtTime(0.001, now + 0.4) // Buzz decay

      // Connect nodes
      osc1.connect(g1).connect(masterGain)
      osc2.connect(g2).connect(masterGain)
      osc3.connect(g3).connect(masterGain)

      // Start & Stop
      osc1.start(now)
      osc2.start(now)
      osc3.start(now)

      osc1.stop(now + 1.5)
      osc2.stop(now + 1.5)
      osc3.stop(now + 1.5)
    } catch (e) {
      console.warn('Audio Context not allowed/supported yet:', e)
    }
  }

  return (
    <section className="section-padding bg-surface relative overflow-hidden bg-floral-right">
      <div className="absolute left-0 top-0 bottom-0 w-[150px] opacity-[0.04] bg-floral-left pointer-events-none" />
      
      <Container className="relative z-10">
        <SectionHeading
          eyebrow="Interactive Fine Arts"
          title="Carnatic Swara Soundboard"
          subtitle="Explore the fundamental scales of traditional music. Select a Raga below and tap the keys to play the Swaras (notes) synthesized in a classic plucked tone."
        />

        <div className="mx-auto max-w-4xl rounded-3xl border border-gold-200/50 bg-white/60 p-6 shadow-xl backdrop-blur-md md:p-10">
          
          {/* Raga Selectors */}
          <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row border-b border-gold-200/30 pb-6">
            <div className="flex flex-col gap-1.5 text-center md:text-left">
              <span className="text-sm uppercase font-bold tracking-[0.2em] text-gold-600 flex items-center gap-2 justify-center md:justify-start">
                <Music className="h-4 w-4 text-crimson" /> Active Raga Scale
              </span>
              <h3 className="font-display text-3xl font-bold text-foreground">
                Raga {currentRaga.name}
              </h3>
              <p className="text-base text-muted-foreground max-w-md leading-relaxed">
                {currentRaga.description}
              </p>
            </div>
            
            <div className="flex gap-2.5 flex-wrap justify-center">
              {RAGAS.map((raga, idx) => (
                <button
                  key={raga.name}
                  onClick={() => setSelectedRagaIdx(idx)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                    selectedRagaIdx === idx
                      ? 'text-white shadow-md'
                      : 'bg-white/70 text-muted-foreground hover:text-foreground hover:bg-white border border-gold-100'
                  }`}
                  style={{
                    backgroundColor: selectedRagaIdx === idx ? raga.color : undefined
                  }}
                >
                  {raga.name}
                </button>
              ))}
            </div>
          </div>

          {/* Soundboard Keys Grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
            {currentRaga.swaras.map((swara, index) => {
              const frequency = BASE_FREQ * swara.ratio
              const isActive = activeSwaraIdx === index
              
              return (
                <motion.button
                  key={swara.name}
                  onClick={() => playNote(frequency, index)}
                  whileHover={{ y: -4, scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  className={`relative flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-500 overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-br from-gold-50 to-gold-100 border-gold-400 shadow-lg'
                      : 'bg-white border-gold-200/40 hover:border-gold-300 shadow-sm hover:shadow-md'
                  }`}
                >
                  {/* Subtle Expanding Aura Animation */}
                  {isActive && (
                    <motion.div
                      layoutId="pulseAura"
                      className="absolute inset-0 bg-gold-400/10 pointer-events-none rounded-2xl"
                      initial={{ scale: 0.8, opacity: 0.8 }}
                      animate={{ scale: 1.3, opacity: 0 }}
                      transition={{ duration: 0.8 }}
                    />
                  )}
                                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    {swara.fullName}
                  </span>
                  
                  <span className="mt-2 text-5xl font-display font-bold text-foreground">
                    {swara.name}
                  </span>

                  <span className="mt-3 text-xs text-gold-600/80 font-mono tracking-wider flex items-center gap-1">
                    <Volume2 className="h-3 w-3" /> {Math.round(frequency)} Hz
                  </span>
                  
                  {/* Key bottom accent stripe */}
                  <div 
                    className={`absolute bottom-0 inset-x-0 h-1 transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-20'
                    }`} 
                    style={{ backgroundColor: currentRaga.color }}
                  />
                </motion.button>
              )
            })}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2.5 text-sm text-muted-foreground italic bg-gold-50/40 p-4.5 rounded-xl border border-gold-100/50">
            <Sparkles className="h-4.5 w-4.5 text-gold-500 shrink-0" />
            <span>Interactive Feature: Tap the notes to hear real pitch relationships. Modern browsers block auto-audio; click any card to enable synth soundboard.</span>
          </div>

        </div>
      </Container>
    </section>
  )
}
