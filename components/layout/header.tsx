'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Logo } from '@/components/shared/logo'
import { Container } from '@/components/shared/container'
import { Button } from '@/components/ui/button'
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        isScrolled
          ? 'bg-surface/95 shadow-md backdrop-blur-sm'
          : 'bg-surface/70 backdrop-blur-sm'
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative text-base font-semibold tracking-wide transition-colors hover:text-crimson',
                  isActive ? 'text-crimson' : 'text-foreground/90'
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-2 left-0 h-0.5 w-full bg-gold-500"
                  />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={SITE_CONFIG.contact.phoneTel}
            className="flex items-center gap-2 text-base font-semibold text-foreground/90 hover:text-crimson"
          >
            <Phone className="h-4.5 w-4.5" />
            {SITE_CONFIG.contact.phone}
          </a>
          <Button asChild className="bg-crimson hover:bg-crimson-700">
            <Link href="/contact">Enroll Now</Link>
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setIsOpen((v) => !v)}
          className="rounded-md p-2 text-foreground lg:hidden"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-border bg-surface lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-3 text-base font-medium text-foreground/90 hover:bg-accent hover:text-crimson"
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="mt-2 w-full bg-crimson hover:bg-crimson-700">
                <Link href="/contact">Enroll Now</Link>
              </Button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
