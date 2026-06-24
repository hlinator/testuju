'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function SkillBar({ label, pct, delay = 0 }: { label: string; pct: number; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-text2">{label}</span>
        <span className="text-orange font-semibold">{pct}%</span>
      </div>
      <div className="h-1.5 bg-bg0 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-fire to-gold"
          initial={{ width: 0 }}
          animate={{ width: inView ? `${pct}%` : 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay }}
        />
      </div>
    </div>
  )
}

function VideoThumb({ label, gradient }: { label: string; gradient: string }) {
  return (
    <div className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer border border-border">
      <div className={`absolute inset-0 ${gradient} opacity-75`} />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
        <span className="text-white text-xl">▶</span>
      </div>
      <span className="absolute bottom-1.5 left-2 text-[0.62rem] font-semibold text-white/80 bg-black/50 px-1.5 py-0.5 rounded-full">{label}</span>
    </div>
  )
}

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
}

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-bg0" id="features">
      <div className="max-w-[1180px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-tag">Funkce platformy</span>
          <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.8rem)] tracking-tight mt-4 mb-4">
            Vše, co potřebuješ k dokonalosti
          </h2>
          <p className="text-text2 max-w-[520px] mx-auto">Kompletní ekosystém pro rozvoj hokejových a florbalistických dovedností.</p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {/* Card 1 – Video gallery (wide) */}
          <motion.div variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-2 bg-card border border-border rounded-2xl p-7 hover:border-orange/25 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-fire/15 border border-fire/25 flex items-center justify-center text-2xl mb-5 group-hover:scale-105 transition-transform">📹</div>
            <h3 className="font-display font-semibold text-[1.1rem] mb-2">Instruktážní galerie videí</h3>
            <p className="text-sm text-text3 leading-relaxed mb-5">
              Follow‑along cvičení: dribbling, střela, vedení puku/míčku, pohyb, kondice. Více videí s různou intenzitou — volíš si obtížnost.
            </p>
            <div className="grid grid-cols-3 gap-2.5">
              <VideoThumb label="Dribbling Lv.3" gradient="bg-gradient-to-br from-red-900 to-purple-950" />
              <VideoThumb label="Střela Lv.2" gradient="bg-gradient-to-br from-orange-900 to-blue-950" />
              <VideoThumb label="Pohyb Lv.4" gradient="bg-gradient-to-br from-yellow-900 to-green-950" />
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              {['Dribbling','Střela','Pohyb','Vedení puku','Kondice','Přihrávka'].map(t => (
                <span key={t} className="px-2.5 py-1 rounded-full text-xs font-medium bg-bg0 border border-border text-text3">{t}</span>
              ))}
            </div>
          </motion.div>

          {/* Card 2 – Skill bars */}
          <motion.div variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-7 hover:border-orange/25 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-fire/15 border border-fire/25 flex items-center justify-center text-2xl mb-5 group-hover:scale-105 transition-transform">📊</div>
            <h3 className="font-display font-semibold text-[1.1rem] mb-2">Personalizovaný AI trénink</h3>
            <p className="text-sm text-text3 leading-relaxed mb-5">
              Posiluje tvé slabé stránky a stupňuje intenzitu silných s důrazem na kvalitu provedení.
            </p>
            <div className="flex flex-col gap-3.5">
              <SkillBar label="Dribbling" pct={78} delay={0} />
              <SkillBar label="Střela" pct={54} delay={0.1} />
              <SkillBar label="Pohyb" pct={91} delay={0.2} />
              <SkillBar label="Reakce" pct={63} delay={0.3} />
            </div>
          </motion.div>

          {/* Card 3 – Neurovizual */}
          <motion.div variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.15 }}
            className="bg-card border border-border rounded-2xl p-7 hover:border-ice/25 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-ice/15 border border-ice/25 flex items-center justify-center text-2xl mb-5 group-hover:scale-105 transition-transform">🧠</div>
            <h3 className="font-display font-semibold text-[1.1rem] mb-2">Neurovizuální hlasové hry</h3>
            <p className="text-sm text-text3 leading-relaxed mb-4">
              Hráč drží florbalku — žádné klikání. Hry reagují na hlas. Color Shout, Stroop Challenge, Direction Call.
            </p>
            <div className="flex gap-2 flex-wrap">
              {['Reakce','Periferní vidění','Stroop','Hlasové ovládání'].map(t => (
                <span key={t} className="px-2 py-0.5 rounded-full text-[0.7rem] font-medium bg-ice/10 border border-ice/20 text-ice/80">{t}</span>
              ))}
            </div>
          </motion.div>

          {/* Card 4 – ELO + Decay */}
          <motion.div variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-7 hover:border-orange/25 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-fire/15 border border-fire/25 flex items-center justify-center text-2xl mb-5 group-hover:scale-105 transition-transform">🔥</div>
            <h3 className="font-display font-semibold text-[1.1rem] mb-2">ELO Ranking & Skill Decay</h3>
            <p className="text-sm text-text3 leading-relaxed mb-4">
              Bez tréninku dovednosti klesají — jako v reálu. Soupeř s přáteli a buď nejlepší ve svém okolí.
            </p>
            <div className="flex gap-2 flex-wrap">
              {['ELO systém','Skill decay','Ligy','Žebříček'].map(t => (
                <span key={t} className="px-2 py-0.5 rounded-full text-[0.7rem] font-medium bg-bg0 border border-border text-text3">{t}</span>
              ))}
            </div>
          </motion.div>

          {/* Card 5 – Coach mode */}
          <motion.div variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.25 }}
            className="bg-card border border-border rounded-2xl p-7 hover:border-orange/25 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-fire/15 border border-fire/25 flex items-center justify-center text-2xl mb-5 group-hover:scale-105 transition-transform">👥</div>
            <h3 className="font-display font-semibold text-[1.1rem] mb-2">Trenérský mód</h3>
            <p className="text-sm text-text3 leading-relaxed mb-4">
              Spusť minihru na laptopu při skills tréninku. Hráči vidí instrukce před střelou a reagují v reálném čase.
            </p>
            <div className="flex gap-2 flex-wrap">
              {['Skills session','Týmový trénink','Vizuální podněty'].map(t => (
                <span key={t} className="px-2 py-0.5 rounded-full text-[0.7rem] font-medium bg-bg0 border border-border text-text3">{t}</span>
              ))}
            </div>
          </motion.div>

          {/* Card 6 – Gamification (wide) */}
          <motion.div variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 lg:col-span-3 bg-gradient-to-r from-fire/8 to-transparent border border-border rounded-2xl p-7 flex flex-col sm:flex-row gap-6 hover:border-orange/25 transition-all duration-300 group">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-xl bg-fire/15 border border-fire/25 flex items-center justify-center text-2xl mb-0 group-hover:scale-105 transition-transform">🎮</div>
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold text-[1.1rem] mb-2">Gamifikace & Denní streaky — jako Duolingo pro sport</h3>
              <p className="text-sm text-text3 leading-relaxed">
                Denní výzvy, série, odznaky, ligový systém a 1v1 souboje s kamarády. Dopaminový feedback loop, který tě drží přikovaného k platformě — i v netréninkový den myslíš na to, abys neztratil ELO.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap items-start">
              {['🔥 14-denní série','🏅 Zlatý odznak','💎 Platinum liga','⚔️ 1v1 výzvy'].map(t => (
                <span key={t} className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-fire/12 border border-fire/20 text-orange whitespace-nowrap">{t}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
