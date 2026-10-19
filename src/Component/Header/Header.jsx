import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHouse, faGraduationCap, faAward, faFileLines} from '@fortawesome/free-solid-svg-icons'
import './Header.css'

function Header() {
  return (
    <div className="portfolio-header">
      {/* Үстүңкү меню (Навигация) */}
      <div className="nav-bar">
        <div className="right-links">
          <Link to="/" className="nav-link">
            <span className="link-icon">
              <FontAwesomeIcon icon={faHouse}/></span>
            <span className="link-text">Жетишкендиктер</span>
          </Link>
          <Link to="/about" className="nav-link">
            <span className="link-icon">
              <FontAwesomeIcon icon={faGraduationCap}  />
            </span>
            <span className="link-text">Портфолио</span>
          </Link>
          <Link to="/miss" className="nav-link">
            <span className="link-icon">
              <FontAwesomeIcon icon={faAward} style={{color: "gold"}}/>
            </span>
            <span className="link-text">Максат</span>
          </Link>
          <Link to="/standart" className="nav-link">
            <span className="link-icon">
              <FontAwesomeIcon icon={faFileLines}/>
            </span>
            <span className="link-text">Предметтик стандарттар</span>
          </Link>
        </div>
      </div>

      {/* Ортодогу башкы жазуу */}
      <div className="hero-section">
        <h1 className="hero-text">Мугалимдин электрондук портфолиосу</h1>
      </div>
    </div>
  )
}

export default Header