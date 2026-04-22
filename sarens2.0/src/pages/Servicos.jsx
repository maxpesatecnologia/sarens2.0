import { Link } from 'react-router-dom'

const services = [
  {
    num: '01', tag: 'Locação', img: 'service-detail-img-1',
    title: 'Guindastes', accent: 'AT/RT', sub: 'e Treliçados',
    desc: 'Nossa frota conta com guindastes de todos terrenos (AT) e de pneus (RT), além de guindastes treliçados de alta capacidade, com alcance de 30 a 500 toneladas. Cada equipamento é rigorosamente revisado e disponibilizado com operador habilitado e documentação completa.',
    features: ['Capacidade de 30 a 500 toneladas','Operador certificado incluso','Documentação e ART de içamento','Disponibilidade 24h'],
    reverse: false,
  },
  {
    num: '02', tag: 'Industrial', img: 'service-detail-img-2',
    title: 'Movimentação', accent: 'Industrial', sub: 'e Rigging',
    desc: 'Realizamos a relocação e instalação de maquinários pesados com engenharia de rigging especializada. Cada projeto passa por planejamento técnico rigoroso, com cálculo de cargas, definição de acessórios e execução com precisão milimétrica.',
    features: ['Planejamento técnico completo','Engenharia de rigging certificada','Acessórios de içamento inclusos','Laudo e relatório pós-operação'],
    reverse: true,
  },
  {
    num: '03', tag: 'Locação', img: 'service-detail-img-3',
    title: 'Caminhões', accent: 'Munck', sub: '',
    desc: 'Nossos caminhões munck oferecem versatilidade máxima para operações de carga e descarga em ambientes de difícil acesso. Com guinchos articulados e capacidade variada, são a solução ideal para obras, indústrias e montagens em espaços confinados.',
    features: ['Alcance de até 18 metros','Ideal para espaços confinados','Motorista e operador inclusos','Frotas leve e pesada disponíveis'],
    reverse: false,
  },
  {
    num: '04', tag: 'Linha Amarela', img: 'service-detail-img-4',
    title: 'Equipamentos de', accent: 'Terraplanagem', sub: '',
    desc: 'Disponibilizamos escavadeiras, pás carregadeiras e retroescavadeiras de alta performance para movimentação de terra e materiais em obras e canteiros industriais. Nossa frota amarela está sempre pronta para os maiores volumes e as condições mais adversas.',
    features: ['Escavadeiras 20 a 50 toneladas','Pás carregadeiras de alta produção','Retroescavadeiras compactas','Operador certificado disponível'],
    reverse: true,
  },
]

export default function Servicos() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-bg page-hero-servicos"></div>
        <div className="page-hero-overlay"></div>
        <div className="container page-hero-content" data-aos="fade-up">
          <div className="eyebrow-tag"><span className="eyebrow-dot"></span> O que oferecemos</div>
          <h1>Nossos <span className="text-accent">Serviços</span></h1>
          <p>Soluções completas para movimentação, içamento e locação de equipamentos industriais.</p>
        </div>
      </section>

      <div className="breadcrumb-bar">
        <div className="container">
          <Link to="/">Home</Link>
          <i className="ph ph-caret-right"></i>
          <span>Serviços</span>
        </div>
      </div>

      <section className="inner-section inner-section-sm">
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <p className="intro-text" data-aos="fade-up">
            Na SARENS, cada serviço é planejado com engenharia de precisão e executado por profissionais certificados. Oferecemos soluções completas para os mais complexos desafios industriais, com máxima segurança e agilidade.
          </p>
        </div>
      </section>

      {services.map((svc) => (
        <section key={svc.num} className={`service-detail${svc.reverse ? ' service-detail-reverse' : ''}`} data-aos="fade-up">
          <div className="container service-detail-grid">
            {!svc.reverse && <div className={`service-detail-img ${svc.img}`}></div>}
            <div className="service-detail-text">
              <div className="service-detail-number">{svc.num}</div>
              <div className="eyebrow-tag"><span className="eyebrow-dot"></span> {svc.tag}</div>
              <h2 className="section-title">{svc.title} <span className="text-accent">{svc.accent}</span>{svc.sub && <><br />{svc.sub}</>}</h2>
              <p>{svc.desc}</p>
              <ul className="service-features">
                {svc.features.map((f) => (
                  <li key={f}><i className="ph ph-check-circle"></i> {f}</li>
                ))}
              </ul>
              <Link to="/contato" className="btn btn-primary" style={{ marginTop: '2rem' }}>
                Solicitar Orçamento <i className="ph ph-arrow-right"></i>
              </Link>
            </div>
            {svc.reverse && <div className={`service-detail-img ${svc.img}`}></div>}
          </div>
        </section>
      ))}

      {/* Process */}
      <section className="process-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <div className="eyebrow-tag centered"><span className="eyebrow-dot"></span> Como trabalhamos</div>
            <h2 className="section-title">Do pedido à <span className="text-accent">execução</span></h2>
          </div>
          <div className="process-steps">
            {[
              { num: '01', title: 'Consulta Inicial', text: 'Entre em contato e apresente o seu projeto. Nossa equipe técnica analisa os requisitos rapidamente.' },
              { num: '02', title: 'Proposta Técnica', text: 'Desenvolvemos uma proposta detalhada com equipamentos, operadores, prazo e investimento.' },
              { num: '03', title: 'Planejamento', text: 'Nossos engenheiros realizam visita técnica e elaboram todo o plano de içamento e segurança.' },
              { num: '04', title: 'Execução', text: 'Mobilização dos equipamentos e equipe para execução com máxima segurança e precisão.' },
            ].map((step, i, arr) => (
              <>
                <div className="process-step" key={step.num} data-aos="fade-up" data-aos-delay={i * 100}>
                  <div className="process-step-num">{step.num}</div>
                  <h4>{step.title}</h4>
                  <p>{step.text}</p>
                </div>
                {i < arr.length - 1 && (
                  <div className="process-arrow" key={`arrow-${i}`}><i className="ph ph-arrow-right"></i></div>
                )}
              </>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section" data-aos="fade-up">
        <div className="container cta-wrapper">
          <div className="cta-text">
            <h2>Precisa de um<br /><span className="text-accent">orçamento</span> rápido?</h2>
            <p>Nossa equipe responde em até 2 horas com uma proposta técnica personalizada.</p>
          </div>
          <div className="cta-actions">
            <Link to="/contato" className="btn btn-primary btn-lg">Solicitar agora</Link>
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