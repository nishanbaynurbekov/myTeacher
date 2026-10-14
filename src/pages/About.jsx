import React from 'react'
import './About.css'

function About() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h2>Мугалимдин билим деңгээли жана кесиптик жолу</h2>
      </div>

      <div className="about-grid">
        <div className='portfolio'>
          <img src="https://i.ibb.co/6R0StyCh/IMG-20261014-WA0000.jpg" alt="" />
          <h2>Байназаров Азизбек Нурбекович</h2>
        </div>
        {/* Билими */}
        <div className="about-card">
          <div className="card-icon">🎓</div>
          <h3>Билими</h3>
          <p className="card-subtitle">Жогорку педагогикалык</p>
          <ul className="about-list">
            <li><strong>Окуу жайы: </strong> Ош мамлекеттик университети</li>
            <li><strong>Факультет: </strong> Искуство Факультети</li>
            <li><strong>Адистиги: </strong> Көркөм өнөр жана технология мугалими</li>
            <li><strong> Бүтүргөн жылы: </strong>2022-жылы</li>
            <li><strong> Магистратураны бүтүргөн жылы: </strong>2023-жыл</li> 
          </ul>
        </div>

        {/* Эмгек стажы жана категориясы */}
        <div className="about-card">
          <div className="card-icon">💼</div>
          <h3>Эмгек стажы</h3>
          <p className="card-subtitle">Педагогикалык стаж: 12 жыл</p>
          <ul className="about-list">
            <li><strong>Иш тажрыйбасы:</strong> 2022-жылы  
            М.Эргашев атындагы орто мектебинде ишин баштады</li>
            <li>2026-жыл Т.Сатылганов атындагы санаториялык мектеп интернатына жумушка орношту</li><hr />
             <li><strong>Жетишкендиктери:</strong> Райондук жана областык "Жылдын мугалими" сынагынын катышуучусу</li>
          </ul>
        </div>
        {/* Кесиптик көндүмдөр */}
        <div className="about-card">
          <div className="card-icon">🛠️</div>
          <h3>Кесиптик көндүмдөр</h3>
          <p className="card-subtitle">Практикалык жана санариптик жөндөмдөр</p>
          <ul className="about-list">
            <li>Салттуу кол өнөрчүлүк, сайма саюу, жыгач жана жасалгалоо материалдары менен иштөө</li>
            <li>Заманбап графикалык редакторлор жана 3D-моделдөө негиздерин окутуу</li>
            <li>Интерактивдүү методикаларды жана долбоордук окутууну (Project-based learning) колдонуу</li>
            <li>Окуучуларды республикалык көркөм өнөр жана чыгармачылык сынакка даярдоо</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default About