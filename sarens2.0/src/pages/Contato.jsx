import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const SUBCATEGORIAS = {
  guindastes: [
    { value: 'at-100', label: 'Guindaste AT 100t' },
    { value: 'rt-200', label: 'Guindaste RT 200t' },
    { value: 'tre-500', label: 'Guindaste Treliçado 500t' },
  ],
  munck: [
    { value: 'munck-10', label: 'Caminhão Munck 10t' },
    { value: 'munck-20', label: 'Caminhão Munck 20t' },
  ],
  empilhadeira: [{ value: 'empilh-8', label: 'Empilhadeira 8t' }],
  'linha-amarela': [
    { value: 'escav-30', label: 'Escavadeira Hidráulica 30t' },
    { value: 'pa-carg', label: 'Pá Carregadeira' },
  ],
  outro: [],
}

export default function Contato() {
  const [searchParams] = useSearchParams()
  const [form, setForm] = useState({
    nome: '', email: '', telefone: '', categoria: '', subcategoria: '', mensagem: '',
  })
  const [btnState, setBtnState] = useState({ text: 'Enviar Solicitação', disabled: false, style: {} })

  // pré-seleciona via query params (vindos da frota)
  useEffect(() => {
    const cat = searchParams.get('categoria')
    const sub = searchParams.get('subcategoria')
    if (cat) setForm(f => ({ ...f, categoria: cat, subcategoria: sub || '' }))
  }, [searchParams])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({
      ...f,
      [name]: value,
      ...(name === 'categoria' ? { subcategoria: '' } : {}),
    }))
  }

  // phone mask
  const handlePhone = (e) => {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/)
    const masked = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '')
    setForm(f => ({ ...f, telefone: masked }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRe.test(form.email)) {
      setBtnState({ text: '⚠ E-mail inválido', disabled: false, style: { background: '#EAB308' } })
      setTimeout(() => setBtnState({ text: 'Enviar Solicitação', disabled: false, style: {} }), 3000)
      return
    }
    if (form.telefone.replace(/\D/g, '').length < 10) {
      alert('Por favor, insira um telefone válido com DDD.')
      return
    }
    setBtnState({ text: 'Enviando...', disabled: true, style: {} })
    try {
      const res = await fetch('http://127.0.0.1:8000/api/contatos/enviar/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const result = await res.json()
      if (res.ok) {
        setBtnState({ text: '✓ Enviado com sucesso!', disabled: true, style: { background: '#16A34A' } })
        setForm({ nome: '', email: '', telefone: '', categoria: '', subcategoria: '', mensagem: '' })
        setTimeout(() => setBtnState({ text: 'Enviar Solicitação', disabled: false, style: {} }), 4000)
      } else throw new Error(result.mensagem || 'Erro no servidor')
    } catch {
      setBtnState({ text: '✗ Erro ao enviar', disabled: false, style: { background: '#DC2626' } })
      setTimeout(() => setBtnState({ text: 'Enviar Solicitação', disabled: false, style: {} }), 3000)
    }
  }

  const subcats = SUBCATEGORIAS[form.categoria] || []

  return (
    <>
      <section className="page-hero page-hero-sm">
        <div className="page-hero-bg page-hero-contato"></div>
        <div className="page-hero-overlay"></div>
        <div className="container page-hero-content" data-aos="fade-up">
          <div className="eyebrow-tag"><span className="eyebrow-dot"></span> Fale conosco</div>
          <h1><span className="text-accent">Contato</span></h1>
          <p>Solicite um orçamento ou tire dúvidas com nossa equipe especializada.</p>
        </div>
      </section>

      <div className="breadcrumb-bar">
        <div className="container">
          <Link to="/">Home</Link>
          <i className="ph ph-caret-right"></i>
          <span>Contato</span>
        </div>
      </div>

      <section className="contact-section" id="contact-section">
        <div className="container contact-grid">
          <div className="contact-info" data-aos="fade-right">
            <div className="eyebrow-tag"><span className="eyebrow-dot"></span> Informações</div>
            <h2 className="section-title">Vamos iniciar<br />o seu <span className="text-accent">projeto</span></h2>
            <p>Fale com nossos especialistas em locação de guindastes e equipamentos pesados. Solicite um orçamento ou esclareça dúvidas de forma rápida e eficiente.</p>
            <div className="contact-cards">
              {[
                { icon: 'ph-map-pin', title: 'Sede', text: 'Av. Primavera, 156 - Jardim Primavera\nDuque de Caxias - RJ, 25215-255' },
                { icon: 'ph-phone', title: 'Telefone — Plantão 24h', text: '0800 629 7372\n(11) 99999-9999' },
                { icon: 'ph-envelope-simple', title: 'E-mail', text: 'contato@sarens.com.br\ncomercial@sarens.com.br' },
                { icon: 'ph-whatsapp-logo', title: 'WhatsApp Comercial', text: '(11) 99999-9999' },
              ].map((c) => (
                <div className="contact-card" key={c.title}>
                  <div className="contact-card-icon"><i className={`ph ${c.icon}`}></i></div>
                  <div>
                    <h4>{c.title}</h4>
                    <p>{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-form-wrap" data-aos="fade-left">
            <div className="eyebrow-tag"><span className="eyebrow-dot"></span> Formulário</div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Nome completo ou empresa</label>
                <input name="nome" type="text" className="form-control" placeholder="Seu nome ou razão social" maxLength={150} required value={form.nome} onChange={handleChange} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">E-mail</label>
                  <input name="email" type="email" className="form-control" placeholder="seu@email.com" required value={form.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Telefone / WhatsApp</label>
                  <input name="telefone" type="text" className="form-control" placeholder="(11) 99999-9999" maxLength={15} required value={form.telefone} onChange={handlePhone} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Categoria</label>
                <select name="categoria" className="form-control" required value={form.categoria} onChange={handleChange}>
                  <option value="" disabled>Selecione uma categoria</option>
                  <option value="guindastes">Guindastes</option>
                  <option value="munck">Caminhões Munck</option>
                  <option value="empilhadeira">Empilhadeiras</option>
                  <option value="linha-amarela">Linha Amarela</option>
                  <option value="outro">Outro / Orçamento Personalizado</option>
                </select>
              </div>
              {subcats.length > 0 && (
                <div className="form-group">
                  <label className="form-label">Equipamento de interesse</label>
                  <select name="subcategoria" className="form-control" value={form.subcategoria} onChange={handleChange}>
                    <option value="" disabled>Selecione o equipamento</option>
                    {subcats.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
              )}
              <div className="form-group">
                <label className="form-label">Descreva sua necessidade</label>
                <textarea name="mensagem" className="form-control" rows={5} placeholder="Diga como podemos te ajudar!" maxLength={3000} required value={form.mensagem} onChange={handleChange}></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={btnState.disabled} style={btnState.style}>
                {btnState.text}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section className="map-section" data-aos="fade-up">
        <div className="container">
          <div className="map-header">
            <h3>Nossa <span className="text-accent">Localização</span></h3>
          </div>
          <div style={{ position: 'relative', borderRadius: 'var(--r-md)', overflow: 'hidden', border: '1px solid var(--border)', lineHeight: 0, boxShadow: '1px 1px 10px rgba(0,0,0,0.1)' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.334057639455!2d-43.274579423773195!3d-22.678604329688433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9979cebeb3a81b%3A0x42c39d6182df37be!2sAv.%20Primavera%2C%20156%20-%20Jardim%20Primavera%2C%20Duque%20de%20Caxias%20-%20RJ%2C%2025215-255!5e0!3m2!1spt-BR!2sbr!4v1709000000000!5m2!1spt-BR!2sbr"
              width="100%" height="450"
              style={{ border: 0, filter: 'grayscale(1) invert(0.92) contrast(1.2) sepia(0.1)' }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              title="Localização SARENS"
            ></iframe>
            <div style={{ position: 'absolute', bottom: 20, left: 20, maxWidth: 560, background: 'rgba(5,5,5,0.9)', padding: '1.5rem 2rem', borderRadius: 'var(--r-sm)', borderLeft: '4px solid var(--red)', zIndex: 2, textAlign: 'center' }}>
              <i className="ph ph-map-pin-area" style={{ color: 'var(--red)', fontSize: '2rem', marginBottom: '0.75rem', display: 'block' }}></i>
              <p style={{ color: '#fff', marginBottom: '1.25rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Av. Primavera, 156 - Jardim Primavera, Duque de Caxias - RJ, 25215-255
              </p>
              <a href="https://maps.app.goo.gl/dX9E9QN3KwKMjPfP8" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Abrir no Google Maps <i className="ph ph-arrow-square-out"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}