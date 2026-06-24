export default function Footer() {
  const cols = [
    {
      title: 'Platforma',
      links: [
        { label: 'Funkce', href: '#features' },
        { label: 'Vědecký základ', href: '#science' },
        { label: 'ELO Ranking', href: '#ranking' },
        { label: 'NeuroHry', href: '#neuro' },
        { label: '1v1 Challenge', href: '#challenge' },
        { label: 'Ceník', href: '#pricing' },
      ],
    },
    {
      title: 'Sporty',
      links: [
        { label: '🏒 Hokej', href: '#' },
        { label: '🏑 Florbal', href: '#' },
        { label: '👥 Týmy', href: '#' },
        { label: '🎓 Mládež', href: '#' },
      ],
    },
    {
      title: 'Firma',
      links: [
        { label: 'O nás', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Kariéra', href: '#' },
        { label: 'Kontakt', href: 'mailto:info@forge.gg' },
        { label: 'Press kit', href: '#' },
      ],
    },
  ]

  return (
    <footer className="bg-bg0 border-t border-border">
      <div className="max-w-[1180px] mx-auto px-6 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5 font-display font-bold text-xl">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-fire to-orange flex items-center justify-center text-sm animate-glow-pulse">🔥</span>
              <span>FORGE</span>
            </div>
            <p className="text-sm text-text3 max-w-[240px] leading-relaxed">
              Platforma nové generace pro rozvoj hokejových a florbalistických dovedností.
            </p>
            <div className="flex gap-2 mt-1">
              {[
                { icon: '📸', label: 'Instagram' },
                { icon: '🎵', label: 'TikTok' },
                { icon: '▶', label: 'YouTube' },
                { icon: '💬', label: 'Discord' },
              ].map(s => (
                <a key={s.label} href="#" aria-label={s.label}
                  className="w-9 h-9 rounded-lg border border-border bg-surface flex items-center justify-center text-sm text-text2 hover:border-orange/35 hover:text-orange transition-all duration-200">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {cols.map(col => (
            <div key={col.title}>
              <h4 className="text-xs font-bold uppercase tracking-[0.1em] text-text3 mb-4">{col.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map(link => (
                  <li key={link.label}>
                    <a href={link.href}
                      className="text-sm text-text3 hover:text-text1 transition-colors duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-7 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text3">© 2025 FORGE Sports Intelligence s.r.o. Všechna práva vyhrazena.</p>
          <div className="flex gap-5">
            {['Podmínky použití', 'Ochrana soukromí', 'Cookies'].map(l => (
              <a key={l} href="#" className="text-xs text-text3 hover:text-text1 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
