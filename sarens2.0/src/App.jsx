import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import Home from './pages/Home'
import Empresa from './pages/Empresa'
import Servicos from './pages/Servicos'
import Frota from './pages/Frota'
import Contato from './pages/Contato'


function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AOSInit() {
  useEffect(() => {
    if (window.AOS) window.AOS.init({ once: true, offset: 60, duration: 800, easing: 'ease-out-cubic' })
  }, [])
  return null
}

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5511999999999"
      target="_blank"
      rel="noreferrer"
      className="whatsapp-float"
      title="Fale conosco no WhatsApp"
    >
      <i className="ph ph-whatsapp-logo"></i>
    </a>
  )
}

function AppInner() {
  return (
    <>
      <ScrollToTop />
      <AOSInit />
      <Cursor />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/empresa" element={<Empresa />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/frota" element={<Frota />} />
          <Route path="/contato" element={<Contato />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}