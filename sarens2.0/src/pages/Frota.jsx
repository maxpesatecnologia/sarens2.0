import { useState } from 'react'
import { Link } from 'react-router-dom'

const fleetItems = [
  { category: 'guindastes', img: 'fleet-item-img-1', tag: 'Guindaste', tagClass: '', title: 'Guindaste AT 100t', desc: 'Guindaste todo-terreno com capacidade de 100 toneladas, ideal para içamentos em locais de difícil acesso e terrenos irregulares.', specs: [{ label: 'Capacidade', value: '100 ton' }, { label: 'Lança máx.', value: '52 m' }, { label: 'Raio máx.', value: '36 m' }], query: 'guindastes&subcategoria=at-100' },
  { category: 'guindastes', img: 'fleet-item-img-2', tag: 'Guindaste', tagClass: '', title: 'Guindaste RT 200t', desc: 'Guindaste sobre pneus de 200 toneladas, alta mobilidade e performance para obras industriais e projetos de infraestrutura.', specs: [{ label: 'Capacidade', value: '200 ton' }, { label: 'Lança máx.', value: '72 m' }, { label: 'Raio máx.', value: '54 m' }], query: 'guindastes&subcategoria=rt-200' },
  { category: 'guindastes', img: 'fleet-item-img-7', tag: 'Guindaste', tagClass: '', title: 'Guindaste Treliçado 500t', desc: 'Guindaste de lança treliçada para os içamentos mais exigentes, com capacidade máxima de 500 toneladas e alcance de exceção.', specs: [{ label: 'Capacidade', value: '500 ton' }, { label: 'Lança máx.', value: '108 m' }, { label: 'Raio máx.', value: '80 m' }], query: 'guindastes&subcategoria=tre-500' },
  { category: 'munck', img: 'fleet-item-img-4', tag: 'Munck', tagClass: 'fleet-tag-munck', title: 'Caminhão Munck 10t', desc: 'Caminhão com guindaste articulado de 10 toneladas, versátil para operações em obras, indústrias e logística especializada.', specs: [{ label: 'Capacidade', value: '10 ton' }, { label: 'Alcance', value: '14 m' }, { label: 'Tipo', value: 'Articulado' }], query: 'munck&subcategoria=munck-10' },
  { category: 'munck', img: 'fleet-item-img-1', tag: 'Munck', tagClass: 'fleet-tag-munck', title: 'Caminhão Munck 20t', desc: 'Versão pesada com 20 toneladas de capacidade, ideal para projetos de maior porte e operações industriais complexas.', specs: [{ label: 'Capacidade', value: '20 ton' }, { label: 'Alcance', value: '18 m' }, { label: 'Tipo', value: 'Articulado' }], query: 'munck&subcategoria=munck-20' },
  { category: 'empilhadeira', img: 'fleet-item-img-6', tag: 'Empilhadeira', tagClass: 'fleet-tag-empilhadeira', title: 'Empilhadeira 8t', desc: 'Empilhadeira a gás ou diesel com capacidade de 8 toneladas para movimentação de cargas pesadas em armazéns e pátios industriais.', specs: [{ label: 'Capacidade', value: '8 ton' }, { label: 'Elevação', value: '6 m' }, { label: 'Motor', value: 'GLP/Diesel' }], query: 'empilhadeira&subcategoria=empilh-8' },
  { category: 'linha-amarela', img: 'fleet-item-img-3', tag: 'Linha Amarela', tagClass: 'fleet-tag-amarela', title: 'Escavadeira Hidráulica 30t', desc: 'Escavadeira de 30 toneladas para movimentação de volumes elevados de terra, demolição e escavação em canteiros industriais.', specs: [{ label: 'Peso Op.', value: '30 ton' }, { label: 'Caçamba', value: '1.6 m³' }, { label: 'Alcance', value: '9.8 m' }], query: 'linha-amarela&subcategoria=escav-30' },
  { category: 'linha-amarela', img: 'fleet-item-img-5', tag: 'Linha Amarela', tagClass: 'fleet-tag-amarela', title: 'Pá Carregadeira', desc: 'Pá carregadeira de alta produção para movimentação de materiais a granel em obras de grande porte e mineração.', specs: [{ label: 'Caçamba', value: '3.2 m³' }, { label: 'Peso Op.', value: '20 ton' }, { label: 'Motor', value: '220 cv' }], query: 'linha-amarela&subcategoria=pa-carg' },
]

const filters = [
  { value: 'all', label: 'Todos' },
  { value: 'guindastes', label: 'Guindastes' },
  { value: 'munck', label: 'Caminhões Munck' },
  { value: 'empilhadeira', label: 'Empilhadeiras' },
  { value: 'linha-amarela', label: 'Linha Amarela' },
]

export default function Frota() {
  const [activeFilter, setActiveFilter] = useState('all')

  const visible = fleetItems.filter(
    item => activeFilter === 'all' || item.category === activeFilter
  )

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-bg page-hero-frota"></div>
        <div className="page-hero-overlay"></div>
        <div className="container page-hero-content" data-aos="fade-up">
          <div className="eyebrow-tag"><span className="eyebrow-dot"></span> Equipamentos</div>
          <h1>Nossa <span className="text-accent">Frota</span></h1>
          <p>Equipamentos de última geração, certificados e prontos para qualquer desafio operacional.</p>
        </div>
      </section>

      <div className="breadcrumb-bar">
        <div className="container">
          <Link to="/">Home</Link>
          <i className="ph ph-caret-right"></i>
          <span>Nossa Frota</span>
        </div>
      </div>

      <section className="fleet-section">
        <div className="container">
          <div className="fleet-filter" data-aos="fade-up">
            {filters.map(f => (
              <button
                key={f.value}
                className={`filter-btn${activeFilter === f.value ? ' active' : ''}`}
                onClick={() => setActiveFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="fleet-items">
            {visible.map((item, i) => (
              <div className="fleet-item-card" key={item.title} data-aos="fade-up" data-aos-delay={(i % 3) * 50}>
                <div className={`fleet-item-img ${item.img}`}></div>
                <div className="fleet-item-body">
                  <span className={`fleet-item-tag ${item.tagClass}`}>{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <div className="fleet-specs">
                    {item.specs.map(s => (
                      <div className="fleet-spec" key={s.label}>
                        <strong>{s.label}</strong>
                        <span>{s.value}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to={`/contato?categoria=${item.query}`}
                    className="btn btn-primary"
                    style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}
                  >
                    Solicitar este equipamento
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section" data-aos="fade-up">
        <div className="container cta-wrapper">
          <div className="cta-text">
            <h2>Não encontrou o<br />equipamento <span className="text-accent">ideal</span>?</h2>
            <p>Fale com nossa equipe. Temos soluções personalizadas para cada tipo de projeto.</p>
          </div>
          <div className="cta-actions">
            <Link to="/contato" className="btn btn-primary btn-lg">Consultar especialista</Link>
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