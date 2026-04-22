import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Empresa() {
  // Counter animation
  useEffect(() => {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const el = entry.target
        const target = parseInt(el.dataset.target)
        const start = performance.now()
        const update = (now) => {
          const progress = Math.min((now - start) / 2000, 1)
          const eased = 1 - Math.pow(1 - progress, 4)
          el.textContent = Math.floor(eased * target).toLocaleString('pt-BR')
          if (progress < 1) requestAnimationFrame(update)
          else el.textContent = target.toLocaleString('pt-BR')
        }
        requestAnimationFrame(update)
        observer.unobserve(el)
      })
    }, { threshold: 0.5 })
    statNumbers.forEach(n => observer.observe(n))
    return () => observer.disconnect()
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

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-bg page-hero-empresa"></div>
        <div className="page-hero-overlay"></div>
        <div className="container page-hero-content" data-aos="fade-up">
          <div className="eyebrow-tag"><span className="eyebrow-dot"></span> Quem somos</div>
          <h1>A <span className="text-accent">SARENS</span></h1>
          <p>Tradição, inovação e comprometimento com a excelência operacional.</p>
        </div>
      </section>

      <div className="breadcrumb-bar">
        <div className="container">
          <Link to="/">Home</Link>
          <i className="ph ph-caret-right"></i>
          <span>A Empresa</span>
        </div>
      </div>

      {/* História */}
      <section className="inner-section">
        <div className="container about-full-grid">
          <div className="about-full-text" data-aos="fade-right">
            <div className="eyebrow-tag"><span className="eyebrow-dot"></span> Nossa história</div>
            <h2 className="section-title">Mais de <span className="text-accent">20 anos</span><br />de força e precisão.</h2>
            <p>A SARENS nasceu da visão de profissionais apaixonados por engenharia pesada, comprometidos com a excelência em cada içamento, em cada movimentação, em cada projeto. Ao longo de mais de duas décadas, construímos uma reputação sólida, baseada na confiança dos nossos clientes e na capacidade técnica da nossa equipe.</p>
            <p>Hoje, somos referência nacional em locação de guindastes e equipamentos pesados, atendendo indústrias de energia, construção civil, petroquímica, siderurgia e infraestrutura em todo o território nacional.</p>
            <p>Fazemos parte do Grupo Maxpesa, uma das maiores empresas de movimentação logística do Brasil, o que nos permite oferecer soluções ainda mais completas e integradas aos nossos clientes.</p>
          </div>
          <div className="about-full-visual" data-aos="fade-left">
            <div className="about-full-img">
              <img src="/img/maxpesa-img.png" alt="Funcionário operando" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container stats-grid">
          {[
            { target: 20, plus: '+', label: 'Anos de Experiência' },
            { target: 1500, plus: '+', label: 'Projetos Entregues' },
            { target: 500, plus: 't', label: 'Capacidade Máxima' },
            { target: 100, plus: '%', label: 'Foco em Segurança' },
          ].map((s, i) => (
            <div className="stat-card" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
              <span className="stat-number" data-target={s.target}>0</span>
              <span className="stat-plus">{s.plus}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* MVV */}
      <section className="mvv-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <div className="eyebrow-tag centered"><span className="eyebrow-dot"></span> Nossa essência</div>
            <h2 className="section-title">Missão, Visão<br />e <span className="text-accent">Valores</span></h2>
          </div>
          <div className="mvv-grid">
            <div className="mvv-card" data-aos="fade-up" data-aos-delay="0">
              <div className="mvv-icon"><i className="ph ph-target"></i></div>
              <h3>Missão</h3>
              <p>Prover soluções completas e seguras em locação de guindastes e içamentos, agregando valor aos projetos dos nossos clientes com excelência técnica, agilidade e comprometimento.</p>
            </div>
            <div className="mvv-card" data-aos="fade-up" data-aos-delay="100">
              <div className="mvv-icon"><i className="ph ph-eye"></i></div>
              <h3>Visão</h3>
              <p>Ser a empresa referência em equipamentos pesados e movimentação industrial no Brasil, reconhecida pela inovação, segurança e excelência em cada operação realizada.</p>
            </div>
            <div className="mvv-card" data-aos="fade-up" data-aos-delay="200">
              <div className="mvv-icon"><i className="ph ph-sparkle"></i></div>
              <h3>Valores</h3>
              <ul>
                {['Segurança acima de tudo','Ética e transparência','Excelência técnica','Comprometimento com prazos','Responsabilidade ambiental'].map((v, i) => (
                  <li key={i}><i className="ph ph-check-circle"></i> {v}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Certs */}
      <div className="parallax-divider" id="parallaxDivider">
        <div className="parallax-divider-bg empresa-parallax"></div>
        <div className="parallax-divider-overlay"></div>
        <div className="parallax-divider-content" data-aos="fade-up">
          <h2>Certificações que<br />garantem <span className="text-accent">confiança</span><br />em cada içamento.</h2>
          <div className="cert-badges">
            {['ISO 9001','NR-11','NR-12','OHSAS'].map((c) => (
              <div className="cert-badge" key={c}><i className="ph ph-seal-check"></i> {c}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Equipe */}
      <section className="team-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <div className="eyebrow-tag centered"><span className="eyebrow-dot"></span> Quem opera</div>
            <h2 className="section-title">Profissionais <span className="text-accent">Certificados</span></h2>
            <p className="section-sub">Nossa equipe é composta por engenheiros, técnicos de segurança e operadores de guindaste com vasta experiência em projetos complexos.</p>
          </div>
          <div className="team-features">
            {[
              { icon: 'ph-hard-hat', title: 'Operadores Certificados', text: 'Todos os operadores possuem habilitação e treinamento específico para cada tipo de equipamento.' },
              { icon: 'ph-chart-line-up', title: 'Engenharia Especializada', text: 'Equipe de engenheiros responsáveis pelo planejamento e cálculo estrutural de cada içamento.' },
              { icon: 'ph-first-aid-kit', title: 'Segurança do Trabalho', text: 'Técnicos de segurança presentes em todas as operações, garantindo conformidade com as NRs.' },
              { icon: 'ph-headset', title: 'Suporte Técnico 24h', text: 'Atendimento especializado a qualquer hora para planejamento, orçamentos e emergências operacionais.' },
            ].map((f, i) => (
              <div className="team-feature" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="team-feature-icon"><i className={`ph ${f.icon}`}></i></div>
                <h4>{f.title}</h4>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" data-aos="fade-up">
        <div className="container cta-wrapper">
          <div className="cta-text">
            <h2>Vamos trabalhar<br /><span className="text-accent">juntos</span>?</h2>
            <p>Solicite uma proposta técnica e descubra como a SARENS pode transformar o seu projeto.</p>
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