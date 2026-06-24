'use client'

import { motion } from 'framer-motion'

const PARTNERS = [
  { name: 'HC Sparta Praha', abbr: 'HC SPARTA', sport: '🏒' },
  { name: 'HC Kometa Brno', abbr: 'HC KOMETA', sport: '🏒' },
  { name: 'FbC Sokol Praha', abbr: 'FbC SOKOL', sport: '🏑' },
  { name: 'HC Oceláři Třinec', abbr: 'HC TŘINEC', sport: '🏒' },
  { name: 'FbC Florbal Olomouc', abbr: 'FbC OLOMOUC', sport: '🏑' },
  { name: 'HC Motor České Budějovice', abbr: 'HC MOTOR', sport: '🏒' },
  { name: 'FbC Ostrava', abbr: 'FbC OSTRAVA', sport: '🏑' },
  { name: 'HC Dynamo Pardubice', abbr: 'HC DYNAMO', sport: '🏒' },
]

function PartnerItem({ p }: { p: typeof PARTNERS[0] }) {
  return (
    <div className="flex items-center gap-2.5 px-8 py-1 whitespace-nowrap select-none">
      <span className="text-base opacity-60">{p.sport}</span>
      <span className="font-display font-semibold text-sm tracking-widest text-text3 uppercase hover:text-text2 transition-colors">
        {p.abbr}
      </span>
    </div>
  )
}

export default function PartnerBar() {
  const doubled = [...PARTNERS, ...PARTNERS]

  return (
    <div className="border-y border-border bg-bg1 py-5 overflow-hidden">
      <div className="max-w-[1180px] mx-auto px-6 mb-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-text3"
        >
          Ve spolupráci s
        </motion.p>
      </div>
      {/* Marquee */}
      <div className="relative">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, var(--color-bg1), transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(-90deg, var(--color-bg1), transparent)' }} />

        <div className="flex animate-marquee">
          {doubled.map((p, i) => (
            <PartnerItem key={`${p.abbr}-${i}`} p={p} />
          ))}
        </div>
      </div>
    </div>
  )
}
