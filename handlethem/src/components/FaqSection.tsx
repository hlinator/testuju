'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQS = [
  {
    q: 'Jak funguje Skill Decay?',
    a: 'Po 3 dnech bez aktivity začíná mírný pokles ELO — stejně jako forma v reálném sportu. Decay je nastavený přiměřeně: motivuje bez frustrace. Čím déle bez tréninku, tím rychlejší pokles. Jednou stisknout start a série se obnoví.',
  },
  {
    q: 'Kolik času denně potřebuji?',
    a: 'HandleThem je navržen pro krátké 10minutové bloky. Věda dokazuje, že pravidelné krátké tréninky jsou efektivnější než nepravidelné dlouhé sezení. Samozřejmě trénovat déle je vždy možné.',
  },
  {
    q: 'Jak funguje hlasové ovládání neurovizuálních her?',
    a: 'Hra využívá Web Speech API dostupné v Chrome a Edge. Hráč mluví do mikrofonu zařízení. Hra zobrazí podnět (barvu, číslo, šipku) a hráč zakřičí odpověď — aniž by musel uvolnit florbalku. Bez mikrofonu jsou k dispozici tlačítka.',
  },
  {
    q: 'Je platforma vhodná pro děti?',
    a: 'Ano! HandleThem je navržen pro hráče všech věkových kategorií. Pro mladší hráče jsou videa a hry přizpůsobeny věku a úrovni. Rodiče mohou vytvořit rodinný účet a sledovat pokrok dítěte.',
  },
  {
    q: 'Jaký sport platforma podporuje?',
    a: 'Aktuálně hokej a florbal s plnohodnotným obsahem. V plánu jsou další lední a halové sporty.',
  },
  {
    q: 'Mohu zrušit předplatné kdykoliv?',
    a: 'Absolutně. Žádné závazky, žádné poplatky za zrušení. Zrušit lze jedním kliknutím v nastavení. Po zrušení přejdeš na Starter (bezplatný) plán s uchovanými daty.',
  },
]

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 bg-bg1">
      <div className="max-w-[720px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-tag">FAQ</span>
          <h2 className="font-display font-bold text-[clamp(1.8rem,3vw,2.4rem)] tracking-tight mt-4">Časté otázky</h2>
        </motion.div>

        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }} transition={{ delay: i * 0.05 }}
              className={`border rounded-xl overflow-hidden transition-colors duration-200 ${open === i ? 'border-orange/30 bg-fire/4' : 'border-border bg-card hover:border-orange/15'}`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
              >
                <span className="font-semibold text-sm">{faq.q}</span>
                <span className={`text-text3 transition-transform duration-300 text-base flex-shrink-0 ${open === i ? 'rotate-180 text-orange' : ''}`}>▼</span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-text3 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
