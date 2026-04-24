import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

const LANGUAGES = [
  { code: 'pt', label: 'PT', flag: '🇧🇷', full: 'Português' },
  { code: 'en', label: 'EN', flag: '🇺🇸', full: 'English' },
  { code: 'es', label: 'ES', flag: '🇪🇸', full: 'Español' },
  { code: 'de', label: 'DE', flag: '🇩🇪', full: 'Deutsch' },
  { code: 'fr', label: 'FR', flag: '🇫🇷', full: 'Français' },
]

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const [langOpen, setLangOpen]     = useState(false)
  const [activeLang, setActiveLang] = useState(LANGUAGES[0])
  const location = useLocation()

  const isHome      = location.pathname === '/'
  const transparent = isHome && !scrolled

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
    setLangOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!langOpen) return
    const close = (e) => { if (!e.target.closest('.lang-switcher')) setLangOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [langOpen])

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/empresa', label: 'A Empresa' },
    { to: '/servicos', label: 'Serviços' },
    { to: '/frota', label: 'Nossa Frota' },
    { to: '/contato', label: 'Contato' },
  ]

  return (
    <>
      <header className={`navbar${scrolled ? ' scrolled' : ''}${transparent ? ' navbar--transparent' : ''}`}>
        <div className="container nav-content">

          <Link to="/" className="brand">
            <img src="/img/SARENS_LOGO.png" alt="Sarens Logo" className="logo-img" />
          </Link>

          <nav className="nav-links">
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to} className={location.pathname === to ? 'active' : ''}>
                {label}
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
            {/* ── Seletor de idioma ── */}
            <div className={`lang-switcher${langOpen ? ' open' : ''}${transparent ? ' lang-switcher--transparent' : ''}`}>
              <button
                className="lang-trigger"
                onClick={() => setLangOpen(v => !v)}
                aria-label="Selecionar idioma"
              >
                <span className="lang-flag">{activeLang.flag}</span>
                <span className="lang-code">{activeLang.label}</span>
                <svg className="lang-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {langOpen && (
                <ul className="lang-dropdown">
                  {LANGUAGES.map(lang => (
                    <li key={lang.code}>
                      <button
                        className={`lang-option${activeLang.code === lang.code ? ' active' : ''}`}
                        onClick={() => { setActiveLang(lang); setLangOpen(false) }}
                      >
                        <span className="lang-flag">{lang.flag}</span>
                        <span className="lang-option-label">
                          <strong>{lang.label}</strong>
                          <small>{lang.full}</small>
                        </span>
                        {activeLang.code === lang.code && (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2 7L5.5 10.5L12 3.5" stroke="#C0392B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link to="/contato" className="btn btn-primary" style={{ marginTop: 0 }}>
              Solicitar Orçamento
            </Link>
          </div>

          <button className="mobile-menu-btn" onClick={() => setMenuOpen(true)} aria-label="Abrir menu">
            <i className="ph ph-list"></i>
          </button>
        </div>
      </header>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <button className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Fechar menu">
          <i className="ph ph-x"></i>
        </button>
        <nav className="mobile-nav">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to} to={to}
              className={location.pathname === to ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Idiomas no mobile */}
        <div className="mobile-lang">
          <p className="mobile-lang-title">Idioma</p>
          <div className="mobile-lang-grid">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                className={`mobile-lang-btn${activeLang.code === lang.code ? ' active' : ''}`}
                onClick={() => setActiveLang(lang)}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </div>

        <Link
          to="/contato"
          className="btn btn-primary btn-block"
          style={{ marginTop: 'auto' }}
          onClick={() => setMenuOpen(false)}
        >
          Solicitar Orçamento
        </Link>
      </div>

      <div className={`mobile-overlay${menuOpen ? ' show' : ''}`} onClick={() => setMenuOpen(false)} />
    </>
  )
}