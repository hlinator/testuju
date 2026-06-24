'use client'

import { motion } from 'framer-motion'

const STEPS = [
  {
    num: '01',
    icon: '🏒',
    title: 'Nastav svůj profil',
    desc: 'Vyber sport, pozici a aktuální úroveň. Systém ti přizpůsobí tréninkový program na míru.',
    color: 'from-fire to-orange',
  },
  {
    num: '02',
    icon: '📹',
    title: 'Trénuj s follow‑along videi',
    desc: 'Stovky videí s různou intenzitou. AI posiluje tvé slabé stránky a stupňuje obtížnost.',
    color: 'from-orange to-gold',
  },
  {
    num: '03',
    icon: '🧠',
    title: 'Hraj neurovizuální hry',
    desc: 'Hlasové minihry trénují reakce, periferní vidění a rychlé rozhodování — bez myši.',
    color: 'from-ice to-[#4499FF]',
  },
  {
    num: '04',
    icon: '🏆',
    title: 'Stoupej v rankingu',
    desc: 'Sbírej ELO, soupeř s přáteli a sleduj svůj skutečný herní přehled v reálném čase.',
    color: 'from-gold to-fire',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 bg-bg1 relative" id="how">
      <div className="max-w-[1180px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          className="text-center mb-16"
        >
          <span className="section-tag">Jak to funguje</span>
          <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.8rem)] tracking-tight mt-4 mb-4">
            Čtyři kroky ke špičkové formě
          </h2>
          <p className="text-text2 text-[1.02rem] max-w-[520px] mx-auto">
            Jednoduchý systém navržený tak, aby tě motivoval každý den — i při pouhých 10 minutách.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px">
            <div className="h-full bg-gradient-to-r from-fire/20 via-gold/40 to-fire/20" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative z-10">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl border border-border bg-card hover:border-orange/25 group transition-all duration-300"
              >
                {/* Number circle */}
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="font-display font-bold text-white text-lg">{step.num}</span>
                </div>
                <div className="text-3xl mb-3">{step.icon}</div>
                <h3 className="font-display font-semibold text-[1rem] mb-2 text-text1">{step.title}</h3>
                <p className="text-sm text-text3 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
