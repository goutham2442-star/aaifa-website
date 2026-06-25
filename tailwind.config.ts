import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        // AAIFA Brand Colors
        crimson: {
          50:  '#FFF1F1',
          100: '#FFE1E1',
          200: '#FFC7C7',
          300: '#FFA0A0',
          400: '#FF6B6B',
          500: '#F83B3B',
          600: '#E51F1F',
          700: '#C11414',
          DEFAULT: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
        gold: {
          50:  '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          DEFAULT: '#D97706',
          500: '#D97706',
          600: '#B45309',
          700: '#92400E',
          800: '#78350F',
        },
        surface: {
          DEFAULT: '#FFFBF5',
          alt:     '#FDF6EE',
          dark:    '#0F0F0F',
        },
        ivory: '#FEF9F0',
        // shadcn/ui compatible tokens
        border:      'hsl(var(--border))',
        input:       'hsl(var(--input))',
        ring:        'hsl(var(--ring))',
        background:  'hsl(var(--background))',
        foreground:  'hsl(var(--foreground))',
        primary: {
          DEFAULT:    'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT:    'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT:    'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT:    'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero':    ['clamp(2.5rem, 6vw, 5rem)',   { lineHeight: '1.1' }],
        'display': ['clamp(2rem, 4vw, 3.5rem)',    { lineHeight: '1.15' }],
        'title':   ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.2' }],
      },
      borderRadius: {
        lg:  'var(--radius)',
        md:  'calc(var(--radius) - 2px)',
        sm:  'calc(var(--radius) - 4px)',
      },
      animation: {
        'float':         'float 6s ease-in-out infinite',
        'glow-gold':     'glowGold 2s ease-in-out infinite alternate',
        'glow-crimson':  'glowCrimson 2s ease-in-out infinite alternate',
        'beat-pulse':    'beatPulse 0.4s ease-out',
        'slide-up':      'slideUp 0.6s ease-out forwards',
        'fade-in':       'fadeIn 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'accordion-down':'accordion-down 0.2s ease-out',
        'accordion-up':  'accordion-up 0.2s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        glowGold: {
          from: { boxShadow: '0 0 5px #D97706, 0 0 10px #D97706' },
          to:   { boxShadow: '0 0 15px #D97706, 0 0 30px #FBBF24' },
        },
        glowCrimson: {
          from: { boxShadow: '0 0 5px #B91C1C' },
          to:   { boxShadow: '0 0 20px #B91C1C, 0 0 40px #E51F1F' },
        },
        beatPulse: {
          '0%':   { transform: 'scale(1)', opacity: '1' },
          '50%':  { transform: 'scale(1.2)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-30px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(ellipse at center, rgba(185,28,28,0.15) 0%, rgba(15,15,15,0.95) 70%)',
        'gold-shimmer':
          'linear-gradient(135deg, #D97706 0%, #FBBF24 50%, #D97706 100%)',
        'crimson-fade':
          'linear-gradient(180deg, transparent 0%, rgba(185,28,28,0.05) 100%)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
}

export default config
