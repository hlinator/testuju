'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { href: '#features', label: 'Funkce' },
  { href: '#science', label: 'Věda' },
  { href: '#ranking', label: 'Ranking' },
  { href: '#neuro', label: 'NeuroHry' },
  { href: '#challenge', label: '1v1' },
  { href: '#pricing', label: 'Ceny' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
  }

  const handleNav = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(6,6,14,0.82)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,.07)' : '1px solid transparent',
        }}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      >
        <div className="max-w-[1180px] mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 font-display font-bold text-xl text-text1 hover:opacity-90 transition-opacity">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-fire to-orange flex items-center justify-center text-sm animate-glow-pulse shadow-lg">
              🔥
            </span>
            <span className="tracking-tight">HandleThem</span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <button key={link.href} onClick={() => handleNav(link.href)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-text2 hover:text-text1 hover:bg-surface transition-all duration-200">
                {link.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            <button onClick={toggleTheme}
              className="w-9 h-9 rounded-lg border border-border bg-surface text-text2 hover:text-orange hover:border-orange/40 transition-all duration-200 flex items-center justify-center text-base">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button onClick={() => handleNav('#pricing')}
              className="hidden sm:flex px-4 py-2 rounded-lg text-sm font-semibold text-text2 border border-border bg-surface hover:border-orange/40 transition-all duration-200">
              Přihlásit se
            </button>
            <button onClick={() => handleNav('#pricing')}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-fire to-orange hover:opacity-90 transition-opacity shadow-lg shadow-fire/30">
              Začít zdarma
            </button>
            {/* Hamburger */}
            <button className="lg:hidden w-9 h-9 rounded-lg border border-border bg-surface flex flex-col items-center justify-center gap-1.5"
              onClick={() => setMenuOpen(v => !v)}>
              <span className={`block w-5 h-0.5 bg-text1 transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-text1 transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-text1 transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 inset-x-0 z-40 bg-bg1 border-b border-border px-6 py-4 flex flex-col gap-1 lg:hidden"
          >
            {NAV_LINKS.map(link => (
              <button key={link.href} onClick={() => handleNav(link.href)}
                className="py-3 px-3 rounded-lg text-base font-medium text-text2 hover:text-text1 hover:bg-surface text-left transition-all">
                {link.label}
              </button>
            ))}
            <div className="mt-3 pt-3 border-t border-border flex flex-col gap-2">
              <button onClick={() => handleNav('#pricing')}
                className="py-3 px-3 rounded-lg text-base font-semibold text-white bg-gradient-to-r from-fire to-orange">
                Začít zdarma →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
