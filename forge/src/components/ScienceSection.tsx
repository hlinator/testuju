'use client'

import { motion } from 'framer-motion'

const POINTS = [
  {
    num: '01',
    title: 'Deliberate Practice',
    desc: 'K. A. Ericsson prokázal, že expertní výkon vzniká záměrným opakovaným tréninkem konkrétních dovedností s okamžitou zpětnou vazbou — přesně tak funguje FORGE.',
  },
  {
    num: '02',
    title: 'Neurovizuální trénink & výkon',
    desc: 'Studie ukazují, že hlasový a vizuální reakční trénink zlepšuje čas reakce sportovce o 18–32 ms — na závodní úrovni klíčový rozdíl.',
  },
  {
    num: '03',
    title: 'Spaced Repetition',
    desc: 'Krátké denní 10minutové bloky s rozloženým opakováním vedou k lepší konsolidaci dovednostní paměti než nepravidelné dlouhé tréninky.',
  },
  {
    num: '04',
    title: 'Dopaminový feedback loop',
    desc: 'ELO systém a okamžité odměny aktivují dopaminové dráhy — stejný princip jako LoL, CS2 nebo Duolingo. Výsledek: hráč se sám vrací.',
  },
]

const STATS = [
  { num: '32ms', label: 'Zlepšení reakce' },
  { num: '18×', label: 'Lepší retence' },
  { num: '94%', label: 'Hráčů se zlepšilo' },
]

export default function ScienceSection() {
  return (
    <section className="py-24 bg-bg1 relative overflow-hidden" id="science">
      {/* Background orb */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8800FF, transparent 70%)' }} />

      <div className="max-w-[1180px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            className="flex flex-col gap-8"
          >
            <div>
              <span className="section-tag">Vědecký základ</span>
              <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.8rem)] tracking-tight mt-4 mb-4">
                Trénink postavený<br />
                <span className="fire-text">na vědě</span>
              </h2>
            </div>

            <div className="flex flex-col gap-5">
              {POINTS.map((p, i) => (
                <motion.div
                  key={p.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-4 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fire to-orange flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                    {p.num}
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-sm mb-1 text-text1">{p.title}</h4>
                    <p className="text-sm text-text3 leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex gap-6 pt-2 border-t border-border">
              {STATS.map(s => (
                <div key={s.num} className="flex-1">
                  <div className="font-display font-bold text-2xl fire-text">{s.num}</div>
                  <div className="text-xs text-text3 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right – Brain visualization */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            className="flex items-center justify-center"
          >
            <div className="relative w-72 h-72">
              {/* Outer orbit */}
              <div className="absolute inset-0 rounded-full border border-dashed border-fire/20 animate-spin-slow" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-orange shadow-lg shadow-orange/80"
                  style={{ transform: 'translateY(-140px)' }} />
              </div>

              {/* Inner orbit */}
              <div className="absolute inset-8 rounded-full border border-dashed border-purple-500/20"
                style={{ animation: 'spin 14s linear infinite reverse' }} />
              <div className="absolute inset-8 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-purple-400"
                  style={{ transform: 'translateX(100px)' }} />
              </div>

              {/* Center glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(255,69,0,.25) 0%, rgba(136,0,255,.12) 50%, transparent 80%)' }} />
              </div>

              {/* Core */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-fire to-purple-600 flex items-center justify-center text-5xl animate-glow-pulse shadow-2xl shadow-fire/40">
                  🧠
                </div>
              </div>

              {/* Floating labels */}
              {[
                { label: 'Reakce', pos: 'top-4 right-4', color: 'text-orange' },
                { label: 'Vidění', pos: 'bottom-4 right-8', color: 'text-ice' },
                { label: 'Rozhodování', pos: 'bottom-8 left-0', color: 'text-gold' },
                { label: 'Pohyb', pos: 'top-12 left-2', color: 'text-orange' },
              ].map(item => (
                <span key={item.label}
                  className={`absolute text-xs font-semibold font-display ${item.pos} ${item.color} opacity-70`}>
                  {item.label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
