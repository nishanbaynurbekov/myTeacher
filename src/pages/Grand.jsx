import React, { useState, useEffect } from 'react'
import './Grand.css'

const API_URL = 'https://69e59424ce4e908a155e2650.mockapi.io/Bhh/product'

function Grand() {
  const [grands, setGrands] = useState([])
  const [loading, setLoading] = useState(false)
  
  // Роль үчүн штаттар (Админ же Конок)
  const [isAdmin, setIsAdmin] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [showLoginModal, setShowLoginModal] = useState(false)

  // Форма үчүн штаттар
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [year, setYear] = useState('')
  const [image, setImage] = useState('')
  const [editingId, setEditingId] = useState(null)

  // 1. Сыйлыктарды APIден жүктөө (GET)
  const fetchGrands = async () => {
    setLoading(true)
    try {
      const response = await fetch(API_URL)
      const data = await response.json()
      setGrands(data)
    } catch (error) {
      console.error('Маалыматты жүктөөдө ката чыкты:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGrands()
  }, [])

  // Админ сырсөзүн текшерүү (Сырсөз: admin123 - муну каалагандай өзгөртө аласыз)
  const handleAdminLogin = (e) => {
    e.preventDefault()
    if (passwordInput === 'admin123') {
      setIsAdmin(true)
      setShowLoginModal(false)
      setPasswordInput('')
    } else {
      alert('Сыр сөз туура эмес!')
    }
  }

  const handleLogout = () => {
    setIsAdmin(false)
    resetForm()
  }

  // 2. Кошуу жана Өзгөртүү (POST / PUT)
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isAdmin) return alert('Конокторго маалымат кошууга тыюу салынат!')
    if (!title.trim()) return alert('Сыйлыктын атын жазыңыз!')

    const payload = {
      title,
      description,
      year: year || new Date().getFullYear().toString(),
      image: image || 'https://via.placeholder.com/300x200?text=Сыйлык'
    }

    try {
      if (editingId) {
        await fetch(`${API_URL}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
      } else {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
      }

      resetForm()
      fetchGrands()
    } catch (error) {
      console.error('Сыйлыкты сактоодо ката чыкты:', error)
    }
  }

  // 3. Өчүрүү (DELETE)
  const handleDelete = async (id) => {
    if (!isAdmin) return alert('Конокторго өчүрүүгө тыюу салынат!')
    if (!window.confirm('Бул сыйлыкты өчүрүүнү каалайсызбы?')) return

    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      })
      fetchGrands()
    } catch (error) {
      console.error('Өчүрүүдө ката чыкты:', error)
    }
  }

  const startEdit = (item) => {
    if (!isAdmin) return
    setEditingId(item.id)
    setTitle(item.title || '')
    setDescription(item.description || '')
    setYear(item.year || '')
    setImage(item.image || '')
  }

  const resetForm = () => {
    setEditingId(null)
    setTitle('')
    setDescription('')
    setYear('')
    setImage('')
  }

  return (
    <div className="grand-container">
      <div className="grand-header">
        <h2>Мугалимдин сыйлыктары жана жетишкендиктери</h2>
        <p>Сыйлыктардын галереясы</p>
        
        {/* Конок же Админ экенин башкаруу баскычы */}
        <div className="auth-status-bar">
          {isAdmin ? (
            <div className="admin-badge-box">
              <span className="admin-tag">👨‍💻 Режим: Администратор (Мугалим)</span>
              <button className="btn-logout" onClick={handleLogout}>Чыгуу</button>
            </div>
          ) : (
            <button className="btn-login-toggle" onClick={() => setShowLoginModal(true)}>
              🔐 Мугалим катары кирүү (Админ)
            </button>
          )}
        </div>
      </div>

      {/* Админ сырсөзүн суроо терезеси (Модал) */}
      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Мугалимдин сырсөзүн киргизиңиз</h3>
            <form onSubmit={handleAdminLogin}>
              <input
                type="password"
                placeholder="Сыр сөз (мис: admin123)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                autoFocus
                required
              />
              <div className="modal-buttons">
                <button type="submit" className="btn btn-primary">Кирүү</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowLoginModal(false)}>Жокко чыгаруу</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Кошуу же өзгөртүү формасы (Бул ЖАЛГЫЗ АДМИНГЕ ГАНА көрүнөт) */}
      {isAdmin && (
        <form className="grand-form" onSubmit={handleSubmit}>
          <h3>{editingId ? 'Сыйлыкты өзгөртүү' : 'Жаңы сыйлык кошуу'}</h3>
          
          <div className="form-group">
            <input
              type="text"
              placeholder="Сыйлыктын аталышы (мис: Жылдын мыкты мугалими)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Алынган жылы (мис: 2024)"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input 
              type="url" 
              placeholder="Сүрөт шилтемеси (URL)" 
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <div className="form-group">
            <textarea
              placeholder="Сыйлык жөнүндө кыскача маалымат же сүрөттөмө..."
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Өзгөртүүнү сактоо' : 'Сыйлыкты кошуу'}
            </button>
            {editingId && (
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Жокко чыгаруу
              </button>
            )}
          </div>
        </form>
      )}

      {/* Сыйлыктардын тизмеси */}
      <div className="grand-list-section">
        <h3>Сыйлыктардын тизмеси {!isAdmin && <span className="guest-notice">(Конок режими: Көрүү гана)</span>}</h3>

        {loading ? (
          <p className="loading-text">Жүктөлүүдө...</p>
        ) : grands.length === 0 ? (
          <p className="empty-text">Азырынча сыйлыктар кошула элек.</p>
        ) : (
          <div className="grand-grid">
            {grands.map((item) => (
              <div key={item.id} className="grand-card">
                <div>
                  {item.image && (
                    <div className="card-image-wrapper">
                      <img src={item.image} alt={item.title} className="card-img" />
                    </div>
                  )}
                  <div className="card-badge">{item.year || '—'}</div>
                  <h4 className="card-title">{item.title}</h4>
                  <p className="card-desc">{item.description}</p>
                </div>
                
                {/* Өзгөртүү жана өчүрүү кнопкалары АДМИНГЕ ГАНА көрүнөт */}
                {isAdmin && (
                  <div className="card-actions">
                    <button className="btn-edit" onClick={() => startEdit(item)}>
                      ✏️ Өзгөртүү
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(item.id)}>
                      🗑️ Өчүрүү
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Grand