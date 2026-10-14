import React, { useState, useEffect } from 'react'
import './Standart.css'

const API_URL = 'https://69e59424ce4e908a155e2650.mockapi.io/Bhh/chyngyz'

function Standart() {
  const [standards, setStandards] = useState([])
  const [loading, setLoading] = useState(false)
  
  const [isAdmin, setIsAdmin] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [showLoginModal, setShowLoginModal] = useState(false)

  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editingId, setEditingId] = useState(null)

  const fetchStandards = async () => {
    setLoading(true)
    try {
      const response = await fetch(API_URL)
      const data = await response.json()
      setStandards(data)
    } catch (error) {
      console.error('Маалыматты жүктөөдө ката чыкты:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStandards()
  }, [])

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isAdmin) return alert('Конокторго маалымат кошууга тыюу салынат!')
    if (!title.trim() || !content.trim()) return alert('Бардык талааларды толтуруңуз!')

    const payload = {
      category: category || '1. Негизги милдеттер:',
      title,
      content
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
      fetchStandards()
    } catch (error) {
      console.error('Сактоодо ката чыкты:', error)
    }
  }

  const handleDelete = async (id) => {
    if (!isAdmin) return alert('Конокторго өчүрүүгө тыюу салынат!')
    if (!window.confirm('Бул пунктту өчүрүүнү каалайсызбы?')) return

    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      })
      fetchStandards()
    } catch (error) {
      console.error('Өчүрүүдө ката чыкты:', error)
    }
  }

  const startEdit = (item) => {
    if (!isAdmin) return
    setEditingId(item.id)
    setCategory(item.category || '')
    setTitle(item.title || '')
    setContent(item.content || '')
  }

  const resetForm = () => {
    setEditingId(null)
    setCategory('')
    setTitle('')
    setContent('')
  }

  return (
    <div className="standart-container">
      {/* Документтин баш жагы */}
      <div className="document-header-title">
        <h2>Мугалимдин негизги милдети</h2>
        <p className="doc-subtitle">Кыргыз Республикасынын билим берүү стандарттары жана квалификациялык талаптар</p>
      </div>

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

      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Мугалимдин сырсөзүн киргизиңиз</h3>
            <form onSubmit={handleAdminLogin}>
              <input
                type="password"
                placeholder="Сыр сөз (admin123)"
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

      {isAdmin && (
        <form className="standart-form" onSubmit={handleSubmit}>
          <h3>{editingId ? 'Бөлүктү өзгөртүү' : 'Жаңы пункт кошуу'}</h3>
          
          <div className="form-group">
            <label>Категория (бөлүм):</label>
            <input
              type="text"
              placeholder="мис: 1. Негизги милдеттери:"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Номер же пункт:</label>
            <input
              type="text"
              placeholder="мис: 1.1."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Мазмуну (талап):</label>
            <textarea
              placeholder="Толук тексту..."
              rows="4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Өзгөртүүнү сактоо' : 'Кошуу'}
            </button>
            {editingId && (
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Жокко чыгаруу
              </button>
            )}
          </div>
        </form>
      )}

      {/* Документ сымал көрүнүш (Кагаз форматындагы барак) */}
      <div className="document-sheet">
        <div className="document-content-area">
          <h3>Нормативдик талаптардын тизмеси {!isAdmin && <span className="guest-notice">(Конок режими)</span>}</h3>

          {loading ? (
            <p className="loading-text">Жүктөлүүдө...</p>
          ) : standards.length === 0 ? (
            <p className="empty-text">Маалыматтар азырынча кошула элек.</p>
          ) : (
            <div className="standards-list-block">
              {standards.map((item) => (
                <div key={item.id} className="standard-item-row">
                  <div className="item-text-content">
                    <span className="item-category-label">{item.category}</span>
                    <p className="item-main-text">
                      <strong className="item-number">{item.title}</strong><br /> {item.content}
                    </p>
                  </div>
                  
                  {isAdmin && (
                    <div className="item-actions">
                      <button className="btn-edit" onClick={() => startEdit(item)} title="Өзгөртүү">✏️</button>
                      <button className="btn-delete" onClick={() => handleDelete(item.id)} title="Өчүрүү">🗑️</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Standart