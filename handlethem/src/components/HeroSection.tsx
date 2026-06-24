'use client'

import { motion } from 'framer-motion'

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } } }
const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } } }

function FloatCard({ className, children, style }: { className?: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div className={`absolute bg-card/90 border border-border backdrop-blur-xl rounded-xl px-3.5 py-2.5 shadow-2xl flex items-center gap-2.5 ${className}`} style={style}>
      {children}
    </div>
  )
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden" id="hero">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-32 w-[700px] h-[700px] rounded-full bg-fire/10 blur-[120px] animate-float" />
        <div className="absolute -bottom-40 -left-32 w-[500px] h-[500px] rounded-full bg-ice/8 blur-[100px] animate-float2" />
        <div className="absolute inset-0 grid-bg" />
      </div>

      <div className="max-w-[1180px] mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 xl:gap-20 items-center">

          {/* ── LEFT CONTENT ─── */}
          <motion.div className="flex flex-col gap-7" variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="flex items-center gap-3 flex-wrap">
              <span className="section-tag">Nová éra sportovního tréninku</span>
              <div className="flex gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-surface border border-border text-text2">🏒 Hokej</span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-surface border border-border text-text2">🏑 Florbal</span>
              </div>
            </motion.div>

            <motion.h1 variants={fadeUp}
              className="font-display font-bold tracking-tight leading-[1.05] text-[clamp(2.8rem,6vw,4.8rem)]">
              Vykuj svůj<br />
              <span className="fire-text text-glow">potenciál.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-[1.05rem] text-text2 leading-relaxed max-w-[500px]">
              Instruktážní videa, neurovizuální minihry a AI‑driven ELO systém —
              vše co potřebuješ k rozvoji. Stačí <strong className="text-text1">10 minut denně.</strong>
            </motion.p>

            <motion.div variants={fadeUp} className="flex gap-3 flex-wrap">
              <a href="#pricing"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-fire to-orange shadow-lg shadow-fire/35 hover:shadow-fire/55 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
                Začít zdarma
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <a href="#neuro"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-text1 bg-surface border border-border hover:border-orange/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
                <span className="text-fire">▶</span> Vyzkoušet demo
              </a>
            </motion.div>

            {/* Social proof */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 flex-wrap">
              <div className="flex">
                {['MK','JP','TN','RS'].map((initials, i) => (
                  <div key={initials}
                    style={{ marginLeft: i === 0 ? 0 : -10, zIndex: 4 - i }}
                    className="relative w-8 h-8 rounded-full border-2 border-bg0 bg-gradient-to-br from-fire to-gold flex items-center justify-center text-[0.6rem] font-bold text-white">
                    {initials}
                  </div>
                ))}
                <div style={{ marginLeft: -10, zIndex: 0 }}
                  className="relative w-8 h-8 rounded-full border-2 border-bg0 bg-surface flex items-center justify-center text-xs font-bold text-text2">
                  +
                </div>
              </div>
              <p className="text-sm text-text2">
                <span className="text-text1 font-semibold">2 400+</span> hráčů aktivně trénuje
              </p>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => <span key={i} className="text-gold text-xs">★</span>)}
                <span className="text-xs text-text2 ml-1">4.9 / 5</span>
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT – APP MOCKUP ─── */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotateY: -8 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.3 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Main mockup card */}
            <div className="relative w-full max-w-[480px] rounded-2xl border border-border shadow-2xl shadow-black/60 overflow-hidden animate-float"
              style={{ background: 'var(--color-bg1)' }}>

              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                </div>
                <span className="text-xs text-text3 mx-auto font-medium">HandleThem Dashboard</span>
              </div>

              {/* Dashboard body */}
              <div className="flex" style={{ minHeight: 280 }}>
                {/* Sidebar */}
                <div className="w-12 bg-bg0 border-r border-border flex flex-col items-center py-4 gap-4">
                  {['🏠','📹','🧠','📊','🏆'].map((icon, i) => (
                    <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center text-base transition-all ${i === 0 ? 'bg-fire/20 text-fire' : 'text-text3 hover:bg-surface'}`}>
                      {icon}
                    </div>
                  ))}
                </div>

                {/* Main content */}
                <div className="flex-1 p-4 flex flex-col gap-3">
                  {/* Video area with photo background */}
                  <div className="relative rounded-xl overflow-hidden aspect-video cursor-pointer group">
                    {/* Sport photo background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0A0820] via-[#120A30] to-[#06101A]" />
                    {/* Ice rink light effect */}
                    <div className="absolute inset-0"
                      style={{ background: 'radial-gradient(ellipse 100% 50% at 50% 100%, rgba(0,180,255,.18) 0%, transparent 65%)' }} />
                    <div className="absolute inset-0"
                      style={{ background: 'radial-gradient(ellipse 60% 60% at 30% 40%, rgba(255,69,0,.2) 0%, transparent 55%)' }} />
                    {/* Grid lines */}
                    <div className="absolute inset-0 opacity-20 grid-bg-fire" />
                    {/* Player silhouette SVG */}
                    <svg className="absolute inset-0 w-full h-full opacity-[0.12]" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid meet" aria-hidden>
                      <g fill="white">
                        <ellipse cx="185" cy="68" rx="14" ry="16" />
                        <path d="M172 82 Q165 95 162 115 Q185 118 195 115 Q198 95 198 82Z" />
                        <path d="M172 88 Q155 92 140 102 Q138 95 145 89 Q160 80 172 84Z" />
                        <path d="M198 88 Q215 82 245 75 Q248 82 243 85 Q215 92 198 94Z" />
                        <rect x="240" y="73" width="2.5" height="50" transform="rotate(12,240,73)" />
                        <path d="M236 118 Q228 125 226 128 Q230 132 238 126Z" />
                        <path d="M162 115 Q158 125 155 132 Q160 135 165 128Z" />
                        <path d="M192 115 Q198 125 202 130 Q207 127 204 121Z" />
                      </g>
                    </svg>
                    {/* Scanline effect */}
                    <div className="absolute inset-0"
                      style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,.08) 3px,rgba(0,0,0,.08) 4px)' }} />
                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-fire/90 flex items-center justify-center text-white text-xl shadow-lg shadow-fire/60 group-hover:scale-110 transition-transform animate-glow-pulse">
                        ▶
                      </div>
                    </div>
                    {/* Label */}
                    <div className="absolute bottom-2 left-3 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#22DD88] animate-pulse-slow" />
                      <span className="text-[0.6rem] font-semibold text-white/70 uppercase tracking-widest">Vedení puku · Lv. 3</span>
                    </div>
                    {/* Progress */}
                    <div className="absolute bottom-0 inset-x-0 h-1 bg-black/30">
                      <div className="h-full w-[38%] bg-gradient-to-r from-fire to-gold" />
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'ELO', value: '1 840', icon: '🔥', up: true },
                      { label: 'Série', value: '14 dní', icon: '⚡', up: true },
                      { label: 'Rank', value: '#23', icon: '🏆', up: false },
                    ].map(s => (
                      <div key={s.label} className="bg-bg0 rounded-lg p-2 border border-border">
                        <div className="text-base leading-none">{s.icon}</div>
                        <div className="font-display font-bold text-sm text-text1 mt-1">{s.value}</div>
                        <div className="text-[0.62rem] text-text3 mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating stat cards */}
            <FloatCard className="animate-float2 -bottom-4 -left-10">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fire to-orange flex items-center justify-center text-sm">📈</div>
              <div>
                <div className="text-sm font-bold font-display text-text1">+140 ELO</div>
                <div className="text-[0.65rem] text-text3">Tento měsíc</div>
              </div>
            </FloatCard>

            <FloatCard className="animate-float top-4 -right-8">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#22DD88] to-[#008855] flex items-center justify-center text-sm">🎯</div>
              <div>
                <div className="text-sm font-bold font-display text-text1">Reakce: 187ms</div>
                <div className="text-[0.65rem] text-text3">Top 12 % hráčů</div>
              </div>
            </FloatCard>

            <FloatCard className="animate-float -right-6" style={{ top: '42%' }}>
              <div className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-fire to-gold text-xs font-bold font-display text-white">💎 Platinum II</div>
            </FloatCard>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(0deg, var(--color-bg0), transparent)' }} />
    </section>
  )
}
