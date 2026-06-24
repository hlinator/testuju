'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CHALLENGE_MODES = [
  { id: 'color', icon: '🎨', label: 'Color Shout', desc: 'Kdo má lepší reakci na barvy' },
  { id: 'stroop', icon: '🧠', label: 'Stroop Battle', desc: 'Kognitivní výzva — Stroop efekt' },
  { id: 'elo', icon: '🏆', label: 'ELO Match', desc: 'Vsaď ELO a soupeř o ranking' },
]

export default function ChallengeSection() {
  const [selectedMode, setSelectedMode] = useState(0)
  const [challenged, setChallenged] = useState(false)

  return (
    <section className="py-24 bg-bg0 relative overflow-hidden" id="challenge">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-60" />

      <div className="max-w-[1180px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-tag">1v1 Challenge</span>
          <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.8rem)] tracking-tight mt-4 mb-4">
            Vyzvi kamaráda.<br /><span className="fire-text">Dokaž, kdo je lepší.</span>
          </h2>
          <p className="text-text2 max-w-[520px] mx-auto">
            Pošli výzvu příteli, zahrajte stejnou hru každý zvlášť a systém porovná vaše výsledky. Vsaď ELO a přidej adrenalín.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-6 items-center max-w-3xl mx-auto">

          {/* Player 1 */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65 }}
            className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-fire to-gold flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-fire/30">
              TY
            </div>
            <div className="text-center">
              <div className="font-display font-bold text-lg">Jan Hráč</div>
              <div className="text-xs text-text3 mt-0.5">🏒 Místní tým</div>
            </div>
            <div className="w-full bg-bg0 rounded-xl p-3 text-center border border-border">
              <div className="text-2xl font-display font-bold fire-text">1 240</div>
              <div className="text-xs text-text3">ELO Rating</div>
            </div>
            <div className="flex gap-2 w-full">
              <div className="flex-1 bg-bg0 rounded-lg p-2 text-center border border-border">
                <div className="text-sm font-bold text-ice">187ms</div>
                <div className="text-[0.6rem] text-text3">Reakce</div>
              </div>
              <div className="flex-1 bg-bg0 rounded-lg p-2 text-center border border-border">
                <div className="text-sm font-bold text-orange">84%</div>
                <div className="text-[0.6rem] text-text3">Přesnost</div>
              </div>
            </div>
          </motion.div>

          {/* VS Center */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="font-display font-black text-4xl fire-text text-glow">VS</div>
            <div className="w-px h-12 forge-line-v" />
            {/* Wager */}
            <div className="bg-card border border-fire/30 rounded-xl px-4 py-2 text-center shadow-lg shadow-fire/10">
              <div className="text-xs text-text3 uppercase tracking-wider">Sázka</div>
              <div className="font-display font-bold text-orange text-lg">50 ELO</div>
            </div>
            <div className="w-px h-12 forge-line-v" />
          </motion.div>

          {/* Player 2 */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65 }}
            className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ice to-blue-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-ice/30">
              MK
            </div>
            <div className="text-center">
              <div className="font-display font-bold text-lg">Marek K.</div>
              <div className="text-xs text-text3 mt-0.5">🏒 HC Sparta Praha</div>
            </div>
            <div className="w-full bg-bg0 rounded-xl p-3 text-center border border-border">
              <div className="text-2xl font-display font-bold ice-text">2 280</div>
              <div className="text-xs text-text3">ELO Rating</div>
            </div>
            <div className="flex gap-2 w-full">
              <div className="flex-1 bg-bg0 rounded-lg p-2 text-center border border-border">
                <div className="text-sm font-bold text-ice">142ms</div>
                <div className="text-[0.6rem] text-text3">Reakce</div>
              </div>
              <div className="flex-1 bg-bg0 rounded-lg p-2 text-center border border-border">
                <div className="text-sm font-bold text-orange">96%</div>
                <div className="text-[0.6rem] text-text3">Přesnost</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mode selector */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 max-w-xl mx-auto"
        >
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-text3 mb-4">Vyber herní mód</p>
          <div className="flex gap-3 justify-center flex-wrap">
            {CHALLENGE_MODES.map((m, i) => (
              <button key={m.id} onClick={() => setSelectedMode(i)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${selectedMode === i ? 'border-fire/60 bg-fire/10 text-orange' : 'border-border bg-card text-text3 hover:border-orange/30'}`}>
                <span>{m.icon}</span> {m.label}
              </button>
            ))}
          </div>
          <p className="text-center text-xs text-text3 mt-2">{CHALLENGE_MODES[selectedMode].desc}</p>

          <div className="mt-6 text-center">
            <AnimatePresence mode="wait">
              {!challenged ? (
                <motion.button key="challenge"
                  initial={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setChallenged(true)}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-fire to-orange shadow-lg shadow-fire/35 hover:shadow-fire/55 hover:-translate-y-0.5 transition-all duration-200">
                  ⚔️ Vyzvat kamaráda
                </motion.button>
              ) : (
                <motion.div key="sent"
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex flex-col items-center gap-2">
                  <div className="text-2xl">📩</div>
                  <div className="text-sm font-semibold text-[#22DD88]">Výzva odeslána!</div>
                  <div className="text-xs text-text3">Marek K. má 24h na přijetí</div>
                  <button onClick={() => setChallenged(false)} className="text-xs text-text3 underline mt-1">Reset demo</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="text-center text-xs text-text3 mt-6">
            Funkce dostupná od plánu <span className="text-orange font-semibold">Pro Hráč</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
