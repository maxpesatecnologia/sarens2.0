import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { animate, scroll } from 'motion'

export default function Home() {
  // Parallax hero
  useEffect(() => {
    const el = document.getElementById('heroParallax')
    if (!el) return
    const onScroll = () => { el.style.transform = `translateY(${window.scrollY * 0.35}px)` }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Parallax divider 
  useEffect(() => {
    const bgs = document.querySelectorAll('.parallax-divider-bg')
    if (!bgs.length) return
    const onScroll = () => {
      bgs.forEach(bg => {
        const section = bg.closest('.parallax-divider')
        if (!section) return
        const rect = section.getBoundingClientRect()
        const progress = -rect.top / (rect.height + window.innerHeight)
        bg.style.transform = `translateY(${progress * 80}px) scale(1.15)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Motion scroll gallery
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return
    const items = document.querySelectorAll('.svc-gallery-item')
    const container = document.querySelector('.svc-gallery-container')
    if (!items.length || !container) return
    scroll(
      animate('.svc-gallery-list', { transform: ['none', `translateX(-${(items.length - 1) * 100}vw)`] }),
      { target: container }
    )
    scroll(
      animate('.svc-progress-bar', { scaleX: [0, 1] }),
      { target: container }
    )
  }, [])

  return (
    <>
      {/* Hero */}
      <section id="home" className="hero">
        <div className="hero-parallax" id="heroParallax"></div>
        <div className="hero-overlay"></div>
        <div className="hero-noise"></div>
        <div className="container hero-content">
          <div className="hero-eyebrow" data-aos="fade-down" data-aos-duration="800">
            <span className="eyebrow-dot"></span>
            Excelência em Guindastes e Içamentos
          </div>
          <h1 className="hero-title" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
            Elevamos<br />
            <span className="hero-title-outline">o Impossível</span><br />
            ao Alcançável.
          </h1>
          <p className="hero-subtitle" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
            Locação de guindastes e equipamentos pesados com engenharia de precisão, segurança máxima e operadores certificados para os maiores desafios industriais do Brasil.
          </p>
          <div className="hero-buttons" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
            <Link to="/servicos" className="btn btn-primary btn-lg">
              Ver Serviços <i className="ph ph-arrow-right"></i>
            </Link>
            <Link to="/frota" className="btn btn-ghost btn-lg">
              <i className="ph ph-play-circle"></i> Nossa Frota
            </Link>
          </div>
        </div>
        <div className="hero-stats" data-aos="fade-up" data-aos-delay="500">
          <div className="hero-stat">
            <span className="hero-stat-number">500t</span>
            <span className="hero-stat-label">Capacidade máx.</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="hero-stat-number">1.5k+</span>
            <span className="hero-stat-label">Projetos entregues</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="hero-stat-number">24h</span>
            <span className="hero-stat-label">Disponibilidade</span>
          </div>
        </div>
      </section>

      {/* Strip */}
      <section className="strip">
        <div className="container strip-grid">
          {[
            { icon: 'ph-shield-check', title: 'Segurança Máxima', text: 'Certificações ISO e NR-11 rigorosas em toda operação.' },
            { icon: 'ph-crane', title: 'Frota Premium', text: 'Guindastes de última geração, revisados e certificados.' },
            { icon: 'ph-clock-clockwise', title: 'Atendimento 24h', text: 'Plantão permanente para urgências e projetos críticos.' },
            { icon: 'ph-users-three', title: 'Equipe Especializada', text: 'Operadores e engenheiros de içamento altamente treinados.' },
          ].map((item, i) => (
            <div className="strip-item" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
              <div className="strip-icon"><i className={`ph ${item.icon}`}></i></div>
              <div><h4>{item.title}</h4><p>{item.text}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* About Preview */}
      <section className="about-preview">
        <div className="container about-grid">
          <div className="about-visual" data-aos="fade-right">
            <div className="about-img-wrap">
              <div className="about-img-main">
                <img src="/img/sarens-logo-original.png" alt="Sarens Logo" />
              </div>
              <div className="about-img-accent"></div>
            </div>
            <div className="about-badge">
              <i className="ph ph-medal"></i>
              <span>+20 anos de<br />Excelência</span>
            </div>
          </div>
          <div className="about-text" data-aos="fade-left">
            <div className="eyebrow-tag"><span className="eyebrow-dot"></span> Nossa História</div>
            <h2 className="section-title">Mais de duas décadas<br />de <span className="text-accent">Precisão</span> em<br />Içamentos.</h2>
            <p>A SARENS é referência nacional na locação de guindastes e realização de içamentos de cargas especiais. Com engenharia avançada e uma frota rigorosamente mantida, transformamos os maiores desafios industriais em soluções seguras e eficientes.</p>
            <p>Atendemos indústrias, energia, construção civil e petroquímica com agilidade, responsabilidade técnica e total foco em resultados.</p>
            <Link to="/empresa" className="btn btn-primary" style={{ marginTop: '2rem' }}>
              Conheça a Empresa <i className="ph ph-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Serviços Gallery */}
      <section id="servicos-section">
        <div className="svc-gallery-header" data-aos="fade-up">
          <div className="container">
            <div className="eyebrow-tag centered"><span className="eyebrow-dot"></span> O que fazemos</div>
            <h2 className="section-title">Soluções <span className="text-accent">Completas</span><br />em Equipamentos</h2>
            <p className="section-sub">Do planejamento à execução, entregamos cada projeto com máxima eficiência e segurança certificada.</p>
          </div>
        </div>
        <div className="svc-gallery-container">
          <div>
            <ul className="svc-gallery-list">
              {[
                { img: 'img-guindastes', icon: 'ph-crane', title: 'Locação de Guindastes', text: 'Frota completa de guindastes AT/RT e treliçados com capacidade de 30 a 500 toneladas para qualquer tipo de içamento.' },
                { img: 'img-movimentacao', icon: 'ph-arrows-out-line-horizontal', title: 'Movimentação Industrial', text: 'Relocação de maquinários pesados, montagem industrial e rigging especializado com engenharia de precisão milimétrica.' },
                { img: 'img-munck', icon: 'ph-truck', title: 'Caminhões Munck', text: 'Versatilidade máxima para carga e descarga com guincho articulado, ideal para obras, indústrias e confinados.' },
                { img: 'img-escavadeira', icon: 'ph-gear-six', title: 'Linha Amarela', text: 'Escavadeiras, pás carregadeiras e retroescavadeiras de alta performance para terraplanagem e movimentação de materiais.' },
              ].map((svc, i) => (
                <li className="svc-gallery-item" key={i}>
                  <div className="svc-gallery-card">
                    <div className={`svc-gallery-img ${svc.img}`}></div>
                    <div className="svc-gallery-body">
                      <div className="svc-gallery-icon"><i className={`ph ${svc.icon}`}></i></div>
                      <h3>{svc.title}</h3>
                      <p>{svc.text}</p>
                      <Link to="/servicos" className="service-link">Ver detalhes <i className="ph ph-arrow-right"></i></Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="svc-progress-bar"></div>
        </div>
        <div className="svc-gallery-cta">
          <Link to="/servicos" className="btn btn-outline-dark">Ver todos os serviços <i className="ph ph-arrow-right"></i></Link>
        </div>
      </section>

      {/* Parallax Divider */}
      <div className="parallax-divider" id="parallaxDivider">
        <div className="parallax-divider-bg" id="parallaxDividerBg"></div>
        <div className="parallax-divider-overlay"></div>
        <div className="parallax-divider-content" data-aos="fade-up">
          <h2>"Cada tonelada içada<br />é uma prova de<br /><span className="text-accent">confiança e técnica.</span>"</h2>
          <Link to="/contato" className="btn btn-primary btn-lg">Solicite um Orçamento</Link>
        </div>
      </div>

      {/* Fleet Preview */}
      <section className="fleet-preview">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <div className="eyebrow-tag centered"><span className="eyebrow-dot"></span> Equipamentos</div>
            <h2 className="section-title">Frota de <span className="text-accent">Ponta</span></h2>
            <p className="section-sub">Equipamentos modernos para os maiores desafios operacionais.</p>
          </div>
          <div className="fleet-grid">
            <div className="fleet-card fleet-card-large" data-aos="fade-right">
              <div className="fleet-card-bg fleet-bg-1"></div>
              <div className="fleet-card-overlay"></div>
              <div className="fleet-card-content">
                <span className="fleet-tag">Destaque</span>
                <h3>Guindastes Táticos AT/RT</h3>
                <p>30 a 500 toneladas de capacidade</p>
                <Link to="/frota" className="fleet-link">Ver frota <i className="ph ph-arrow-right"></i></Link>
              </div>
            </div>
            <div className="fleet-cards-column">
              <div className="fleet-card" data-aos="fade-left" data-aos-delay="100">
                <div className="fleet-card-bg fleet-bg-2"></div>
                <div className="fleet-card-overlay"></div>
                <div className="fleet-card-content">
                  <h3>Caminhões Munck</h3>
                  <p>Alta versatilidade operacional</p>
                  <Link to="/frota" className="fleet-link">Ver frota <i className="ph ph-arrow-right"></i></Link>
                </div>
              </div>
              <div className="fleet-card" data-aos="fade-left" data-aos-delay="200">
                <div className="fleet-card-bg fleet-bg-3"></div>
                <div className="fleet-card-overlay"></div>
                <div className="fleet-card-content">
                  <h3>Empilhadeiras Pesadas</h3>
                  <p>3 a 16 toneladas de capacidade</p>
                  <Link to="/frota" className="fleet-link">Ver frota <i className="ph ph-arrow-right"></i></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="clients">
        <div className="container">
          <div className="clients-header" data-aos="fade-up">
            <p>Empresas e indústrias líderes que confiam na SARENS</p>
          </div>
          <div className="clients-track-wrap">
            <div className="clients-track">
              {['Votorantim','CSN Aços','Renováveis SA','Construtora Líder','Energias BR','Petroquímica SP',
                'Votorantim','CSN Aços','Renováveis SA','Construtora Líder','Energias BR','Petroquímica SP'].map((c, i) => (
                <div className="client-logo" key={i}>
                  <i className="ph ph-buildings"></i><span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" data-aos="fade-up">
        <div className="container cta-wrapper">
          <div className="cta-text">
            <h2>Pronto para o seu<br /><span className="text-accent">próximo projeto</span>?</h2>
            <p>Entre em contato agora e receba uma proposta técnica personalizada em até 24 horas.</p>
          </div>
          <div className="cta-actions">
            <Link to="/contato" className="btn btn-primary btn-lg">Fale com um especialista</Link>
            <a href="tel:08006297372" className="cta-phone">
              <i className="ph ph-phone"></i>
              <div><small>Plantão 24h</small><strong>0800 629 7372</strong></div>
            </a>
          </div>
        </div>
      </section>
    </>
  )
} 