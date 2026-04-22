import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/empresa', label: 'A Empresa' },
    { to: '/servicos', label: 'Serviços' },
    { to: '/frota', label: 'Nossa Frota' },
    { to: '/contato', label: 'Contato' },
  ]

  return (
    <>
      <header className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
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
            <Link to="/contato" className="btn btn-primary" style={{ marginTop: 0 }}>
              Solicitar Orçamento
            </Link>
          </div>
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(true)}>
            <i className="ph ph-list"></i>
          </button>
        </div>
      </header>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <button className="mobile-close" onClick={() => setMenuOpen(false)}>
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
      </div>
      <div className={`mobile-overlay${menuOpen ? ' show' : ''}`} onClick={() => setMenuOpen(false)} />
    </>
  )
}