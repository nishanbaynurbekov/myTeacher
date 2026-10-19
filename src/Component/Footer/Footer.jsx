import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* 1-колонка: Сайт жөнүндө */}
        <div className="footer-col">
          <h3>Электрондук Портфолио</h3>
          <p>Көркөм өнөр жана технология мугалиминин кесиптик өнүгүүсү, жетишкендиктери жана стандарттары.</p>
        </div>
        
        {/* 2-колонка: Навигация шилтемелери */}
        <div className="footer-col">
          <h4>Ыкчам шилтемелер</h4>
          <ul className="footer-links">
            <li><Link to="/">Главная страница</Link></li>
            <li><Link to="/about">Биз жөнүндө</Link></li>
            <li><Link to="/grand">Сыйлыктар</Link></li>
            <li><Link to="/standart">Предметтик стандарттар</Link></li>
          </ul>
        </div>

        {/* 3-колонка: Байланыш маалыматтары */}
        <div className="footer-col">
          <h4>Байланыш</h4>
          <p>📍 Ош обласы Ноокат шаары</p>
          <p>🏫 Т Сатылганов мектеби</p>
          <p>📧 bainazarovazizbek2@gmail.com</p>
          <p> </p>
          <div className="social-links" style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
          <a href="https://instagram.com/_toktogul_media" target="_blank" rel="noopener noreferrer" style={{ color: '#e1306c', textDecoration: 'none', fontWeight: '600' }}>📸 Instagram</a>
          <a href="https://wa.me/996703482891" target="_blank" rel="noopener noreferrer" style={{ color: '#25d366', textDecoration: 'none', fontWeight: '600' }}>💬 WhatsApp</a>
          </div>
        </div>
      </div>

      {/* Автордук укук */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Мугалимдин Портфолиосу. Бардык укуктар корголгон.</p>
      </div>
    </footer>
  )
}

export default Footer