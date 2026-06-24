'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const PLANS = [
  {
    name: 'Starter',
    tagline: 'Pro začátek',
    monthlyPrice: 0,
    yearlyPrice: 0,
    cta: 'Začít zdarma',
    ctaStyle: 'border',
    features: [
      { text: '10 tréninkových videí', ok: true },
      { text: '2 neurovizuální minihry', ok: true },
      { text: 'ELO ranking (globální)', ok: true },
      { text: 'Denní výzvy', ok: true },
      { text: 'AI personalizovaný program', ok: false },
      { text: 'Skill decay analytika', ok: false },
      { text: '1v1 Challenge', ok: false },
    ],
  },
  {
    name: 'Pro Hráč',
    tagline: 'Maximální rozvoj',
    monthlyPrice: 249,
    yearlyPrice: 175,
    popular: true,
    cta: 'Začít 14 dní zdarma',
    ctaStyle: 'primary',
    features: [
      { text: 'Všechna videa (480+)', ok: true },
      { text: 'Všechny neurovizuální hry', ok: true },
      { text: 'AI personalizovaný program', ok: true },
      { text: 'ELO + Skill decay analytika', ok: true },
      { text: 'Přátelé & soukromé ligy', ok: true },
      { text: '1v1 Challenge', ok: true },
      { text: 'Trenérský mód', ok: false },
    ],
  },
  {
    name: 'Trenér / Tým',
    tagline: 'Pro celý tým',
    monthlyPrice: 790,
    yearlyPrice: 553,
    cta: 'Kontaktovat nás',
    ctaStyle: 'secondary',
    features: [
      { text: 'Vše z Pro Hráč plánu', ok: true },
      { text: 'Trenérský dashboard', ok: true },
      { text: 'Interaktivní skills session', ok: true },
      { text: 'Exkluzivní trenérská videa', ok: true },
      { text: 'Až 25 hráčů v týmu', ok: true },
      { text: 'Týmové statistiky & reporty', ok: true },
      { text: 'Prioritní podpora', ok: true },
    ],
  },
]

export default function PricingSection() {
  const [yearly, setYearly] = useState(false)

  return (
    <section className="py-24 bg-bg1" id="pricing">
      <div className="max-w-[1180px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-tag">Ceník</span>
          <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.8rem)] tracking-tight mt-4 mb-4">
            Investice, která se vyplatí
          </h2>
          <p className="text-text2 max-w-[480px] mx-auto mb-8">Žádné skryté poplatky. Zrušení kdykoliv. 14 dní zdarma bez kreditní karty.</p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-card border border-border rounded-full px-4 py-2">
            <span className={`text-sm font-semibold ${!yearly ? 'text-text1' : 'text-text3'}`}>Měsíčně</span>
            <button onClick={() => setYearly(v => !v)}
              className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${yearly ? 'bg-gradient-to-r from-fire to-orange' : 'bg-surface'}`}>
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${yearly ? 'translate-x-6' : ''}`} />
            </button>
            <span className={`text-sm font-semibold ${yearly ? 'text-text1' : 'text-text3'}`}>Ročně</span>
            <span className="text-xs font-bold text-[#22DD88] bg-[#22DD88]/12 border border-[#22DD88]/25 px-2 py-0.5 rounded-full">−30%</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className={`relative rounded-2xl border p-7 flex flex-col hover:-translate-y-1 transition-all duration-300 ${
                plan.popular
                  ? 'border-fire/50 bg-gradient-to-b from-fire/6 to-card shadow-xl shadow-fire/15'
                  : 'border-border bg-card hover:border-orange/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-fire to-orange whitespace-nowrap shadow-lg">
                  ⭐ Nejoblíbenější
                </div>
              )}

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-text3 mb-2">{plan.name}</p>
                <div className="flex items-end gap-1 mb-1">
                  {plan.monthlyPrice === 0 ? (
                    <span className="font-display font-bold text-4xl tracking-tight">Zdarma</span>
                  ) : (
                    <>
                      <span className="text-text2 text-lg self-start mt-2">Kč</span>
                      <span className="font-display font-bold text-4xl tracking-tight fire-text">
                        {yearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-text3 text-sm mb-1">/měs</span>
                    </>
                  )}
                </div>
                {plan.monthlyPrice > 0 && yearly && (
                  <p className="text-xs text-[#22DD88]">Fakturováno ročně (Kč {plan.yearlyPrice * 12}/rok)</p>
                )}
                {plan.monthlyPrice === 0 && <p className="text-xs text-text3">Navždy</p>}
              </div>

              <div className="h-px bg-border my-5" />

              <ul className="flex flex-col gap-2.5 flex-1 mb-7">
                {plan.features.map(f => (
                  <li key={f.text} className={`flex items-start gap-2.5 text-sm ${f.ok ? '' : 'opacity-35'}`}>
                    <span className={`mt-0.5 flex-shrink-0 ${f.ok ? 'text-orange' : 'text-text3'}`}>
                      {f.ok ? '✦' : '✕'}
                    </span>
                    <span className={f.ok ? 'text-text2' : 'text-text3'}>{f.text}</span>
                  </li>
                ))}
              </ul>

              <a href="#"
                className={`w-full py-3 rounded-xl text-sm font-semibold text-center transition-all duration-200 ${
                  plan.ctaStyle === 'primary'
                    ? 'text-white bg-gradient-to-r from-fire to-orange shadow-lg shadow-fire/30 hover:opacity-90'
                    : plan.ctaStyle === 'secondary'
                    ? 'text-text1 bg-surface border border-border hover:border-orange/30'
                    : 'text-text1 border border-border hover:border-orange/30'
                }`}>
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-text3 mt-6">
          ✓ Žádná kreditní karta &nbsp;·&nbsp; ✓ Zrušení kdykoliv &nbsp;·&nbsp; ✓ 14 dní zdarma na Pro plánu
        </p>
      </div>
    </section>
  )
}
