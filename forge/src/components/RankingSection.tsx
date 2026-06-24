'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const TIERS = [
  { icon: '🥉', name: 'Bronze', range: '0 – 800', pct: 25, color: '#CD7F32' },
  { icon: '🥈', name: 'Silver', range: '800 – 1 200', pct: 45, color: '#C0C0D0' },
  { icon: '🥇', name: 'Gold', range: '1 200 – 1 600', pct: 65, color: '#FFD700' },
  { icon: '💎', name: 'Platinum', range: '1 600 – 2 000', pct: 82, color: '#88DDFF' },
  { icon: '👑', name: 'Elite', range: '2 000+', pct: 96, color: '#FF6B35' },
]

const LB_DATA = [
  { rank: 1, initials: 'MK', name: 'Marek Krejčí', club: 'HC Sparta Praha', elo: 2280, delta: +14, sport: '🏒' },
  { rank: 2, initials: 'JP', name: 'Jan Procházka', club: 'HC Kometa Brno', elo: 2140, delta: +7, sport: '🏒' },
  { rank: 3, initials: 'TN', name: 'Tomáš Novák', club: 'HC Oceláři Třinec', elo: 1990, delta: -3, sport: '🏒' },
  { rank: 4, initials: 'RS', name: 'Radim Sýkora', club: 'HC Motor ČB', elo: 1875, delta: +22, sport: '🏒' },
  { rank: 5, initials: 'LH', name: 'Lukáš Horák', club: 'HC Mountfield HK', elo: 1840, delta: +5, sport: '🏑' },
  { rank: 23, initials: 'TY', name: 'Ty (demo)', club: 'Místní tým', elo: 1240, delta: +48, sport: '🏒', isMe: true },
]

const FILTERS = ['Globální', 'Přátelé', 'Kraj']

export default function RankingSection() {
  const [filter, setFilter] = useState(0)

  return (
    <section className="py-24 bg-bg0 relative overflow-hidden" id="ranking">
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <div className="max-w-[1180px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-tag">ELO Systém</span>
          <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.8rem)] tracking-tight mt-4 mb-4">
            Soupeř. Stoupej. <span className="fire-text">Dominuj.</span>
          </h2>
          <p className="text-text2 max-w-[520px] mx-auto">Spravedlivý ELO ranking motivuje každého hráče. Skill decay zajišťuje, že forma odráží skutečný herní přehled.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left – Chart + Tiers */}
          <motion.div
            initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65 }}
            className="flex flex-col gap-5"
          >
            {/* ELO Chart */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-text3 mb-4">Vývoj ELO — 60 dní</p>
              <div className="relative h-44">
                {/* Decay zone */}
                <div className="absolute right-[18%] top-0 bottom-0 w-[22%] bg-fire/4 border-l border-dashed border-fire/25 rounded-r">
                  <span className="absolute top-2 left-2 text-[0.62rem] text-fire/70 whitespace-nowrap">bez tréninku</span>
                </div>
                <svg viewBox="0 0 420 160" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="eloGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#FF6B35" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,140 C30,130 60,110 90,92 C120,74 150,56 180,44 C210,32 235,36 255,50 C275,64 285,72 300,60 C320,46 350,36 420,28"
                    fill="none" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M0,140 C30,130 60,110 90,92 C120,74 150,56 180,44 C210,32 235,36 255,50 C275,64 285,72 300,60 C320,46 350,36 420,28 L420,160 L0,160Z"
                    fill="url(#eloGrad)" />
                  <circle cx="255" cy="50" r="5" fill="#FF2200" />
                  <circle cx="420" cy="28" r="5" fill="#FFD700" />
                </svg>
              </div>
              <div className="flex justify-between text-xs text-text3 mt-1">
                <span>Dnes - 60</span><span>Dnes - 30</span><span>Dnes</span>
              </div>
            </div>

            {/* Tier system */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-text3 mb-4">Tier systém</p>
              <div className="flex flex-col gap-2.5">
                {TIERS.map(t => (
                  <div key={t.name} className="flex items-center gap-3 py-2.5 px-3 rounded-xl border border-border bg-bg0 hover:border-orange/20 transition-colors group cursor-default">
                    <span className="text-xl w-7 text-center">{t.icon}</span>
                    <span className="font-display font-semibold text-sm flex-1">{t.name}</span>
                    <span className="text-xs text-text3 mr-3">{t.range}</span>
                    <div className="w-20 h-1.5 bg-bg2 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: t.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${t.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.0, delay: TIERS.indexOf(t) * 0.08 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right – Leaderboard */}
          <motion.div
            initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65 }}
            className="bg-card border border-border rounded-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <span className="font-display font-semibold">🏆 Žebříček</span>
              <div className="flex gap-1.5">
                {FILTERS.map((f, i) => (
                  <button key={f} onClick={() => setFilter(i)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${filter === i ? 'bg-gradient-to-r from-fire to-orange text-white' : 'bg-bg0 text-text3 hover:text-text2'}`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-border">
              {LB_DATA.map((row, i) => (
                <motion.div
                  key={row.rank}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.07 }}
                  className={`flex items-center gap-3.5 px-5 py-3.5 hover:bg-bg2 transition-colors ${row.isMe ? 'border-l-2 border-fire bg-fire/4' : ''}`}
                >
                  {/* Rank */}
                  <span className={`w-6 text-center font-display font-bold text-sm ${row.rank === 1 ? 'text-gold' : row.rank === 2 ? 'text-[#C0C0D0]' : row.rank === 3 ? 'text-[#CD7F32]' : 'text-text3'}`}>
                    {row.rank}
                  </span>
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-fire to-gold flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                    {row.initials}
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{row.name} {row.isMe && <span className="text-fire text-xs">(ty)</span>}</div>
                    <div className="text-xs text-text3">{row.sport} {row.club}</div>
                  </div>
                  {/* ELO */}
                  <div className="text-right">
                    <div className="font-display font-bold text-sm text-orange">{row.elo.toLocaleString('cs-CZ')}</div>
                    <div className={`text-xs font-semibold ${row.delta > 0 ? 'text-[#22DD88]' : 'text-fire'}`}>
                      {row.delta > 0 ? `↑+${row.delta}` : `↓${row.delta}`}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="px-5 py-4 border-t border-border">
              <a href="#pricing" className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-fire to-orange hover:opacity-90 transition-opacity">
                Připojit se a soupeřit →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
