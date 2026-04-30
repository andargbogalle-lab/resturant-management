import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import api from '../services/api'
import './Tables.css'

function Tables() {
  const [tables, setTables] = useState([])
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()
  const navigate = useNavigate()

  useEffect(() => {
    fetchTables()
  }, [])

  const fetchTables = async () => {
    try {
      const response = await api.get('/tables')
      setTables(response.data)
    } catch (error) {
      console.error('Error fetching tables:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return '#4CAF50'
      case 'occupied': return '#f44336'
      case 'reserved': return '#FF9800'
      default: return '#999'
    }
  }

  if (loading) return <div className="loading">{t('checkingConnection')}</div>

  return (
    <div className="tables-container">
      <div className="page-header">
        <button onClick={() => navigate('/')} className="back-button">
          ← {t('home')}
        </button>
        <h1>{t('restaurantTables')}</h1>
      </div>
      
      <div className="tables-grid">
        {tables.map(table => (
          <div 
            key={table.id} 
            className="table-card"
            style={{ borderColor: getStatusColor(table.status) }}
          >
            <div className="table-number">Table {table.table_number}</div>
            <div className="table-capacity">
              <span>👥 {table.capacity} {t('seats')}</span>
            </div>
            <div 
              className="table-status"
              style={{ backgroundColor: getStatusColor(table.status) }}
            >
              {t(table.status).toUpperCase()}
            </div>
          </div>
        ))}
      </div>

      {tables.length === 0 && (
        <div className="no-data">{t('noTables')}</div>
      )}
    </div>
  )
}

export default Tables
