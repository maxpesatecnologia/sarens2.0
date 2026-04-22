import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="brand brand-light">
            <span className="brand-s">S</span><span className="brand-arens">ARENS</span>
          </Link>
          <p>Excelência e precisão em guindastes, içamentos e equipamentos pesados para os maiores projetos industriais do Brasil.</p>
          <div className="footer-social">
            <a href="#"><i className="ph ph-linkedin-logo"></i></a>
            <a href="#"><i className="ph ph-instagram-logo"></i></a>
            <a href="#"><i className="ph ph-whatsapp-logo"></i></a>
          </div>
        </div>
        <div className="footer-col">
          <h5>Navegação</h5>
          <Link to="/">Home</Link>
          <Link to="/empresa">A Empresa</Link>
          <Link to="/servicos">Serviços</Link>
          <Link to="/frota">Nossa Frota</Link>
          <Link to="/contato">Contato</Link>
        </div>
        <div className="footer-col">
          <h5>Serviços</h5>
          <Link to="/servicos">Locação de Guindastes</Link>
          <Link to="/servicos">Movimentação Industrial</Link>
          <Link to="/servicos">Caminhões Munck</Link>
          <Link to="/servicos">Linha Amarela</Link>
        </div>
        <div className="footer-col">
          <h5>Contato</h5>
          <p><i className="ph ph-map-pin"></i>Av. Primavera, 156 - Jardim Primavera<br />Duque de Caxias - RJ, 25215-255</p>
          <p><i className="ph ph-phone"></i> 0800 629 7372</p>
          <p><i className="ph ph-envelope-simple"></i> contato@sarens.com.br</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 SARENS. Todos os direitos reservados. Grupo Maxpesa.</p>
      </div>
    </footer>
  )
}