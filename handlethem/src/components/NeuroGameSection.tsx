'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type GameState = 'idle' | 'countdown' | 'showing' | 'listening' | 'result' | 'gameover'
type GameMode = 'color' | 'stroop' | 'direction' | 'number'

interface Round {
  mode: GameMode
  display: string
  displayStyle: { background?: string; color?: string }
  answers: string[]
  options: string[]
  label: string
}

const COLOR_ROUNDS: () => Round[] = () => {
  const colors = [
    { cs: ['červená','červena','red'], en: 'red', bg: '#FF2200', label: 'ČERVENÁ' },
    { cs: ['modrá','modrá','blue'], en: 'blue', bg: '#0088FF', label: 'MODRÁ' },
    { cs: ['zelená','zelena','green'], en: 'green', bg: '#22DD88', label: 'ZELENÁ' },
    { cs: ['žlutá','zluta','yellow'], en: 'yellow', bg: '#FFD700', label: 'ŽLUTÁ' },
    { cs: ['oranžová','oranzova','orange'], en: 'orange', bg: '#FF6B35', label: 'ORANŽOVÁ' },
  ]
  return colors.map(c => ({
    mode: 'color' as GameMode,
    display: '■',
    displayStyle: { color: c.bg },
    answers: [...c.cs, c.en],
    options: ['ČERVENÁ','MODRÁ','ZELENÁ','ŽLUTÁ','ORANŽOVÁ'].filter(l => l !== c.label).slice(0,3).concat([c.label]).sort(() => Math.random() - .5),
    label: c.label,
  }))
}

const DIRECTION_ROUNDS: () => Round[] = () => {
  const dirs = [
    { arrows: ['↑'], answers: ['nahoru','up','nahor'], label: '↑', opts: ['↑','↓','←','→'] },
    { arrows: ['↓'], answers: ['dolů','dolu','down'], label: '↓', opts: ['↑','↓','←','→'] },
    { arrows: ['←'], answers: ['doleva','left','vlevo'], label: '←', opts: ['↑','↓','←','→'] },
    { arrows: ['→'], answers: ['doprava','right','vpravo'], label: '→', opts: ['↑','↓','←','→'] },
  ]
  return dirs.map(d => ({
    mode: 'direction' as GameMode,
    display: d.arrows[0],
    displayStyle: { color: '#00CFFF' },
    answers: d.answers,
    options: d.opts,
    label: d.label,
  }))
}

const NUMBER_ROUNDS: () => Round[] = () =>
  Array.from({ length: 6 }, () => {
    const n = Math.floor(Math.random() * 9) + 1
    const opts = new Set<number>([n])
    while (opts.size < 4) opts.add(Math.floor(Math.random() * 9) + 1)
    return {
      mode: 'number' as GameMode,
      display: String(n),
      displayStyle: { color: '#FFD700' },
      answers: [String(n), ['nula','jedna','dvě','tři','čtyři','pět','šest','sedm','osm','devět'][n] ?? String(n)],
      options: Array.from(opts).map(String),
      label: String(n),
    }
  })

const STROOP_ROUNDS: () => Round[] = () => {
  const items = [
    { word: 'MODRÁ', displayColor: '#FF2200', answers: ['červená','red'] },
    { word: 'ČERVENÁ', displayColor: '#22DD88', answers: ['zelená','green'] },
    { word: 'ZELENÁ', displayColor: '#FFD700', answers: ['žlutá','yellow'] },
    { word: 'ŽLUTÁ', displayColor: '#0088FF', answers: ['modrá','blue'] },
  ]
  return items.map(s => ({
    mode: 'stroop' as GameMode,
    display: s.word,
    displayStyle: { color: s.displayColor },
    answers: s.answers,
    options: ['ČERVENÁ','MODRÁ','ZELENÁ','ŽLUTÁ'],
    label: s.answers[0].toUpperCase(),
  }))
}

function buildRounds(): Round[] {
  const r = [...COLOR_ROUNDS(), ...DIRECTION_ROUNDS().slice(0,2), ...NUMBER_ROUNDS().slice(0,2), ...STROOP_ROUNDS()]
  return r.sort(() => Math.random() - .5).slice(0, 8)
}

export default function NeuroGameSection() {
  const [gameState, setGameState] = useState<GameState>('idle')
  const [rounds, setRounds] = useState<Round[]>([])
  const [roundIdx, setRoundIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(1)
  const [countdown, setCountdown] = useState(3)
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null)
  const [reactionMs, setReactionMs] = useState<number | null>(null)
  const [avgReaction, setAvgReaction] = useState<number[]>([])
  const [hasVoice, setHasVoice] = useState(false)
  const [selectedMode, setSelectedMode] = useState<GameMode>('color')
  const [showModePicker, setShowModePicker] = useState(false)

  const showStartRef = useRef<number>(0)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const MODES: { id: GameMode; label: string; icon: string; desc: string }[] = [
    { id: 'color', label: 'Color Shout', icon: '🎨', desc: 'Zakřičte barvu, kterou vidíte' },
    { id: 'direction', label: 'Direction Call', icon: '🧭', desc: 'Zakřičte směr šipky' },
    { id: 'number', label: 'Number Flash', icon: '🔢', desc: 'Zakřičte číslo (záblesk 0.6s)' },
    { id: 'stroop', label: 'Stroop Challenge', icon: '🧠', desc: 'Zakřičte BARVU PÍSMA, ne text!' },
  ]

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasVoice(!!SR)
  }, [])

  const stopRecognition = useCallback(() => {
    recognitionRef.current?.stop()
    recognitionRef.current = null
  }, [])

  const goToNext = useCallback(() => {
    const nextIdx = roundIdx + 1
    if (nextIdx >= rounds.length) {
      setGameState('gameover')
    } else {
      setRoundIdx(nextIdx)
      setLastCorrect(null)
      setGameState('showing')
      showStartRef.current = performance.now()
      const isNumber = rounds[nextIdx].mode === 'number'
      const showDur = isNumber ? 650 : 1100
      timerRef.current = setTimeout(() => {
        setGameState('listening')
      }, showDur)
    }
  }, [roundIdx, rounds])

  const handleAnswer = useCallback((answer: string) => {
    stopRecognition()
    if (timerRef.current) clearTimeout(timerRef.current)
    const current = rounds[roundIdx]
    if (!current) return
    const normalised = answer.toLowerCase().trim()
    const correct = current.answers.some(a => normalised.includes(a.toLowerCase()))
    const rtt = Math.round(performance.now() - showStartRef.current)
    setReactionMs(rtt)
    setAvgReaction(prev => [...prev, rtt])
    setLastCorrect(correct)
    if (correct) {
      setScore(s => s + 10 * combo)
      setCombo(c => Math.min(c + 1, 8))
    } else {
      setCombo(1)
    }
    setGameState('result')
    timerRef.current = setTimeout(() => goToNext(), 1100)
  }, [rounds, roundIdx, combo, stopRecognition, goToNext])

  const startListeningVoice = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SR) return
    const rec = new SR()
    rec.lang = 'cs-CZ'
    rec.continuous = false
    rec.interimResults = false
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (e: any) => {
      const spoken = e.results[0][0].transcript
      handleAnswer(spoken)
    }
    rec.onerror = () => stopRecognition()
    recognitionRef.current = rec
    rec.start()
  }, [handleAnswer, stopRecognition])

  useEffect(() => {
    if (gameState === 'listening' && hasVoice) {
      startListeningVoice()
      timerRef.current = setTimeout(() => {
        stopRecognition()
        setLastCorrect(false)
        setCombo(1)
        setGameState('result')
        timerRef.current = setTimeout(() => goToNext(), 1000)
      }, 3000)
    }
  }, [gameState, hasVoice, startListeningVoice, stopRecognition, goToNext])

  const startGame = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    const newRounds = buildRounds()
    setRounds(newRounds)
    setRoundIdx(0)
    setScore(0)
    setCombo(1)
    setLastCorrect(null)
    setAvgReaction([])
    setCountdown(3)
    setGameState('countdown')
    let c = 3
    const tick = setInterval(() => {
      c--
      setCountdown(c)
      if (c <= 0) {
        clearInterval(tick)
        setGameState('showing')
        showStartRef.current = performance.now()
        timerRef.current = setTimeout(() => {
          setGameState('listening')
        }, newRounds[0].mode === 'number' ? 650 : 1100)
      }
    }, 1000)
  }

  const current = rounds[roundIdx]
  const avgMs = avgReaction.length ? Math.round(avgReaction.reduce((a,b) => a+b,0) / avgReaction.length) : 0

  return (
    <section className="py-24 bg-bg1 relative overflow-hidden" id="neuro">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* ── LEFT ─── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <span className="section-tag">Neurovizuální trénink</span>
            <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.8rem)] tracking-tight">
              Trénuj mozek,<br /><span className="ice-text">ne jen tělo</span>
            </h2>
            <p className="text-text2 leading-relaxed">
              Hráč drží florbalku — žádné klikání. Hra zobrazuje barvy, čísla a šipky. Hráč zakřičí odpověď. Systém zachytí hlas a připíše body.
            </p>

            <div className="flex flex-col gap-4">
              {[
                { icon: '🎤', title: 'Hlasové ovládání', desc: 'Web Speech API — záblesk podnětu, hráč zakřičí odpověď. Funguje v Chrome/Edge.' },
                { icon: '🧠', title: 'Stroop Challenge', desc: 'Slovo MODRÁ zobrazeno červeně → zakřič ČERVENOU. Extrémní kognitivní tlak.' },
                { icon: '⚡', title: 'Number Flash', desc: 'Číslo se zobrazí jen 0.6 vteřiny — testuje krátkodobou vizuální paměť.' },
                { icon: '📊', title: 'Reakční statistiky', desc: 'Průměrná reakce v ms, přesnost, porovnání s ostatními hráči.' },
              ].map(b => (
                <div key={b.icon} className="flex gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-ice/12 border border-ice/20 flex items-center justify-center text-base flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                    {b.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-0.5">{b.title}</h4>
                    <p className="text-xs text-text3 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mode picker */}
            <div>
              <button onClick={() => setShowModePicker(v => !v)}
                className="text-sm text-text3 flex items-center gap-1.5 hover:text-text2 transition-colors">
                <span>Vybrat herní mód ▾</span>
              </button>
              <AnimatePresence>
                {showModePicker && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mt-2 grid grid-cols-2 gap-2"
                  >
                    {MODES.map(m => (
                      <button key={m.id} onClick={() => setSelectedMode(m.id)}
                        className={`p-3 rounded-xl border text-left transition-all ${selectedMode === m.id ? 'border-ice/50 bg-ice/10' : 'border-border bg-card hover:border-ice/25'}`}>
                        <div className="text-base mb-1">{m.icon}</div>
                        <div className="text-xs font-semibold text-text1">{m.label}</div>
                        <div className="text-[0.65rem] text-text3 mt-0.5">{m.desc}</div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── RIGHT – GAME ARENA ─── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7 }}
          >
            <div className="rounded-2xl border border-ice/25 overflow-hidden shadow-2xl glow-ice">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-card border-b border-border">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <div className="w-2 h-2 rounded-full bg-[#22DD88] animate-pulse-slow" />
                  NeuroReact Demo
                </div>
                <div className="flex gap-5 text-right">
                  <div>
                    <div className="text-orange font-display font-bold text-sm">{score}</div>
                    <div className="text-[0.62rem] text-text3">Skóre</div>
                  </div>
                  <div>
                    <div className="text-ice font-display font-bold text-sm">{avgMs > 0 ? `${avgMs}ms` : '—'}</div>
                    <div className="text-[0.62rem] text-text3">Reakce</div>
                  </div>
                  <div>
                    <div className="font-display font-bold text-sm text-text1">x{combo}</div>
                    <div className="text-[0.62rem] text-text3">Combo</div>
                  </div>
                </div>
              </div>

              {/* Game canvas */}
              <div className="relative bg-bg0 aspect-[4/3] flex items-center justify-center overflow-hidden grid-bg-fire">
                {/* Background radial */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,207,255,.04), transparent 70%)' }} />

                <AnimatePresence mode="wait">
                  {gameState === 'idle' && (
                    <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="text-center flex flex-col items-center gap-4">
                      <div className="text-5xl opacity-30">🧠</div>
                      <p className="text-text3 text-sm">Stiskni start a reaguj hlasem nebo tlačítkem</p>
                      {!hasVoice && (
                        <p className="text-xs text-orange bg-orange/10 border border-orange/20 rounded-lg px-3 py-1.5">
                          Mikrofon nedostupný — použij tlačítka níže
                        </p>
                      )}
                    </motion.div>
                  )}

                  {gameState === 'countdown' && (
                    <motion.div key={`cd-${countdown}`}
                      initial={{ scale: 1.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="font-display font-bold text-8xl fire-text text-glow">
                      {countdown > 0 ? countdown : '▶'}
                    </motion.div>
                  )}

                  {(gameState === 'showing' || gameState === 'listening') && current && (
                    <motion.div key={`show-${roundIdx}`}
                      initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 1.3, opacity: 0 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
                      className="flex flex-col items-center gap-4"
                    >
                      {/* Listening ring */}
                      {gameState === 'listening' && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-44 h-44 rounded-full border-2 border-ice/40 animate-pulse-slow" />
                          <div className="absolute w-52 h-52 rounded-full border border-ice/20 animate-pulse-slow" style={{ animationDelay: '0.3s' }} />
                        </div>
                      )}
                      <div
                        className="font-display font-black leading-none select-none"
                        style={{
                          fontSize: current.mode === 'number' ? '8rem' : current.mode === 'direction' ? '7rem' : '3.5rem',
                          ...current.displayStyle,
                          textShadow: `0 0 40px ${current.displayStyle.color}88`,
                          letterSpacing: '-0.03em',
                        }}
                      >
                        {current.display}
                      </div>
                      {current.mode === 'stroop' && (
                        <p className="text-xs text-ice/60 font-semibold uppercase tracking-widest">Zakřič BARVU PÍSMA</p>
                      )}
                      {gameState === 'listening' && (
                        <div className="flex items-center gap-2 text-xs text-ice/70">
                          <span className="w-2 h-2 rounded-full bg-ice animate-blink" />
                          {hasVoice ? 'Poslouchám...' : 'Vyber níže'}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {gameState === 'result' && (
                    <motion.div key="result"
                      initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-2">
                      <div className={`text-6xl font-display font-black ${lastCorrect ? 'text-[#22DD88]' : 'text-fire'}`}>
                        {lastCorrect ? '✓' : '✕'}
                      </div>
                      {reactionMs && <div className="text-sm text-text2 font-semibold">{reactionMs}ms</div>}
                      {lastCorrect && <div className="text-xs text-orange">+{10 * combo} bodů · x{combo} combo</div>}
                    </motion.div>
                  )}

                  {gameState === 'gameover' && (
                    <motion.div key="gameover" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      className="text-center flex flex-col items-center gap-3">
                      <div className="text-5xl">🏆</div>
                      <div className="font-display font-bold text-3xl fire-text">{score} bodů</div>
                      {avgMs > 0 && <div className="text-sm text-text2">Průměrná reakce: <span className="text-ice font-bold">{avgMs}ms</span></div>}
                      <div className="text-xs text-text3 max-w-[200px]">Zaregistruj se a sleduj svůj progres</div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Progress bar */}
                {gameState !== 'idle' && gameState !== 'gameover' && (
                  <div className="absolute bottom-0 inset-x-0 h-1 bg-bg2">
                    <div className="h-full bg-gradient-to-r from-fire to-gold transition-all duration-300"
                      style={{ width: `${(roundIdx / rounds.length) * 100}%` }} />
                  </div>
                )}
              </div>

              {/* Footer – keyboard fallback */}
              <div className="px-5 py-4 bg-card border-t border-border flex flex-col gap-3">
                {/* Option buttons (keyboard fallback when listening) */}
                {(gameState === 'listening' || gameState === 'showing') && current && (
                  <div className="grid grid-cols-4 gap-2">
                    {current.options.map(opt => (
                      <button key={opt} onClick={() => handleAnswer(opt)}
                        className="py-2 px-1 rounded-lg text-xs font-bold border border-border bg-bg0 hover:border-ice/50 hover:bg-ice/8 text-text2 hover:text-ice transition-all duration-150 active:scale-95">
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {/* Combo bar */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-text3 uppercase tracking-wider flex-shrink-0">Combo</span>
                  <div className="flex-1 h-1.5 bg-bg0 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-fire to-gold transition-all duration-300"
                      style={{ width: `${Math.min(100, (combo / 8) * 100)}%` }} />
                  </div>
                  <button
                    onClick={gameState === 'idle' || gameState === 'gameover' ? startGame : undefined}
                    disabled={!(gameState === 'idle' || gameState === 'gameover')}
                    className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-fire to-orange disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:opacity-90 transition-opacity flex-shrink-0">
                    {gameState === 'gameover' ? '↺ Znovu' : gameState === 'idle' ? '▶ Start' : '…'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
