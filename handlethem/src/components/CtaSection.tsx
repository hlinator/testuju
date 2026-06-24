'use client'

import { motion } from 'framer-motion'

const STATS = [
  { num: '2 400+', label: 'Aktivních hráčů' },
  { num: '480+', label: 'Tréninkových videí' },
  { num: '94%', label: 'Hráčů se zlepšilo' },
  { num: '14 dní', label: 'Zdarma vyzkoušení' },
]

export default function CtaSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-bg0" id="contact">
      {/* Fire background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-24 w-[600px] h-[600px] rounded-full opacity-15 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #FF4500, transparent 70%)' }} />
        <div className="absolute -bottom-32 -left-24 w-[500px] h-[500px] rounded-full opacity-10 blur-[80px]"
          style={{ background: 'radial-gradient(circle, #5500FF, transparent 70%)' }} />
        <div className="absolute inset-0 grid-bg opacity-50" />
      </div>

      <div className="max-w-[900px] mx-auto px-6 relative z-10">
        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16"
        >
          {STATS.map(s => (
            <div key={s.num} className="text-center">
              <div className="font-display font-bold text-2xl fire-text">{s.num}</div>
              <div className="text-xs text-text3 mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65, delay: 0.1 }}
          className="text-center flex flex-col items-center gap-7"
        >
          <span className="section-tag">Začni dnes</span>
          <h2 className="font-display font-bold text-[clamp(2rem,4vw,3.2rem)] tracking-tight">
            Připraven vykovat<br />
            <span className="fire-text text-glow">svůj potenciál?</span>
          </h2>
          <p className="text-text2 text-[1.05rem] max-w-[500px] leading-relaxed">
            Přidej se ke 2 400+ hráčům, kteří trénují chytřeji, ne jen tvrdě. 14 dní zdarma — kreditní karta nepotřeba.
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <a href="#pricing"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base bg-gradient-to-r from-fire to-orange shadow-xl shadow-fire/40 hover:shadow-fire/60 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
              Začít zdarma
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="mailto:info@handlethem.cz"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-text1 text-base border border-border hover:border-orange/40 transition-all duration-200">
              Kontaktovat nás
            </a>
          </div>

          <p className="text-xs text-text3">
            ✓ Žádná kreditní karta &nbsp;·&nbsp; ✓ Zrušení kdykoliv &nbsp;·&nbsp; ✓ 14 dní zdarma
          </p>
        </motion.div>
      </div>
    </section>
  )
}
