import React from 'react'
import './Home.css'

function Home() {
  return (
    <div className="home-container">
      {/* Башкы визиттик карточка / Маалымат */}
      <section className="teacher-info-card">
        <span className="badge">Көркөм өнөр жана технология мугалими:</span>
        <h1>Байназаров Азизбек</h1>
      </section>
      {/* Максаттын башкы блогу */}
      <section className="goal-main-card">
        <h5 className="section-title">Перспективалык өнүгүү максаты</h5>
        <div className="title-underline"></div>
        <p className="main-goal-text">
          Окуучулардын чыгармачылык, эстетикалык жана технологитук жөндөмдөрүн заманбап ыкмалар аркылуу өстүрүү, санариптик инструменттерди Көркөм өнөр жана Технология сабактарына жигердүү киргизүү жана ар бир окуучунун аналитикалык, креативдүү ой жүгүртүүсүн калыптандыруу.
        </p>
      </section>

      {/* Негизги багыттар жана тапшырмалар (Карточкалар) */}
      <section className="goals-grid">
        <div className="goal-card">
          <div className="card-number">01</div>
          <h3>Санариптик жана Креативдүү Ыкмалар</h3>
          <p>
            Салттуу кол өнөрчүлүк менен катар заманбап графикалык программаларды жана 3D-моделдөөнү окутуу.
          </p>
        </div>

        <div className="goal-card">
          <div className="card-number">02</div>
          <h3>Практикага Багытталган Долбоорлор</h3>
          <p>
            Окуучулардын экологдук аң-сезимин жана STEAM жөндөмдөрүн өстүрүүчү практикалык жана долбоордук иштерди уюштуруу.
          </p>
        </div>

        <div className="goal-card">
          <div className="card-number">03</div>
          <h3>Кесиптик Чеберчиликти Арттыруу</h3>
          <p>
            Мугалимдик компетенцияны дайыма жогорулатуу, заманбап педагогикалык технологияларды, интерактивдүү методикаларды өздөштүрүү.
          </p>
        </div>

        <div className="goal-card">
          <div className="card-number">04</div>
          <h3>Окуучулардын Көргөзмө/Конкурстары</h3>
          <p>
            Окуучуларды райондук, республикалык жана эл аралык сүрөт, кол өнөрчүлүк жана стартап конкурстарына даярдоо.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Home