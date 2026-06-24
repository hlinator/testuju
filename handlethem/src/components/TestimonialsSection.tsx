'use client'

import { motion } from 'framer-motion'

const TESTIMONIALS = [
  {
    stars: 5,
    text: '„Za 6 týdnů jsem zlepšil reakční čas o 28 ms. Trenér na mě řekl, že se viditelně zlepšil přehled na hřišti. HandleThem funguje."',
    name: 'Marek K., 17 let',
    role: '🏒 HC Sparta Praha, mládež',
    initials: 'MK',
    color: 'from-fire to-gold',
  },
  {
    stars: 5,
    text: '„Jako trenér jsem zavedl HandleThem na skills trénincích. Hráči reagují na vizuální signály z laptopu před střelou — úroveň rozhodování viditelně vzrostla."',
    name: 'Pavel V., trenér',
    role: '🏒 HC Kometa Brno B-tým',
    initials: 'PV',
    color: 'from-orange to-fire',
  },
  {
    stars: 5,
    text: '„ELO ranking mě drží u platformy každý den. Soupeřím s kamarády a nechci klesat. 10 minut večer — stačí. Doporučuji všem hráčům."',
    name: 'Tomáš L., 24 let',
    role: '🏑 FbC Sokol Praha',
    initials: 'TL',
    color: 'from-ice to-blue-600',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-bg0">
      <div className="max-w-[1180px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-tag">Recenze</span>
          <h2 className="font-display font-bold text-[clamp(1.8rem,3vw,2.4rem)] tracking-tight mt-4">Co říkají hráči</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-7 flex flex-col gap-5 hover:border-orange/20 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <span key={i} className="text-gold text-sm">★</span>
                ))}
              </div>
              <p className="text-sm text-text2 leading-relaxed flex-1 italic">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-text3">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
