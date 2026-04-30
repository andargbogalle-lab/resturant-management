import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import api from '../services/api'
import './Home.css'

function Home() {
  const [health, setHealth] = useState(null)
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()
  const navigate = useNavigate()

  useEffect(() => {
    checkHealth()
  }, [])

  const checkHealth = async () => {
    try {
      const response = await api.get('/health')
      setHealth(response.data)
    } catch (error) {
      console.error('API Error:', error)
      setHealth({ status: 'error', message: 'Cannot connect to backend' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="logo-container">
          <img 
            src="/logo.png" 
            alt="Betesida Restaurant Logo" 
            className="logo"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        </div>
        <h1 className="main-title">
          {t('restaurantName')}
        </h1>
        <h2 className="subtitle">
          Betesida Restaurant & Hotel
        </h2>
        <p className="tagline">
          🍽️ Authentic Ethiopian Cuisine | 🛏️ Comfortable Accommodations
        </p>
      </div>

      {/* Advertising Section */}
      <div className="advertising-section">
        <h2 className="section-title">Welcome to Betesida</h2>
        <p className="section-description">
          Experience the finest Ethiopian dining and comfortable lodging
        </p>

        <div className="features-grid">
          {/* Restaurant Feature */}
          <div className="feature-card restaurant-card" onClick={() => navigate('/menu')}>
            <div className="feature-image">
              <div className="image-placeholder restaurant-bg">
                <span className="feature-icon">🍽️</span>
              </div>
            </div>
            <div className="feature-content">
              <h3>Ethiopian Restaurant</h3>
              <p>Authentic traditional dishes prepared by expert chefs</p>
              <ul className="feature-list">
                <li>✓ 23+ Traditional Dishes</li>
                <li>✓ Fresh Ingredients Daily</li>
                <li>✓ Vegetarian Options</li>
                <li>✓ Traditional Coffee Ceremony</li>
              </ul>
              <button className="feature-btn">View Menu</button>
            </div>
          </div>

          {/* Hotel Feature */}
          <div className="feature-card hotel-card" onClick={() => navigate('/rooms')}>
            <div className="feature-image">
              <div className="image-placeholder hotel-bg">
                <span className="feature-icon">🛏️</span>
              </div>
            </div>
            <div className="feature-content">
              <h3>Comfortable Bedrooms</h3>
              <p>Relax in our well-appointed rooms with modern amenities</p>
              <ul className="feature-list">
                <li>✓ 10 Clean & Comfortable Rooms</li>
                <li>✓ Single, Double & Suite Options</li>
                <li>✓ Affordable Rates</li>
                <li>✓ Friendly Service</li>
              </ul>
              <button className="feature-btn">Book Now</button>
            </div>
          </div>
        </div>
      </div>

      {/* Room Types Section */}
      <div className="rooms-section">
        <h2 className="section-title">Our Rooms</h2>
        <div className="rooms-grid">
          <div className="room-card">
            <div className="room-image single-room">
              <span className="room-icon">🛏️</span>
            </div>
            <h3>Single Room</h3>
            <p className="room-price">500 Birr/night</p>
            <p className="room-capacity">1 Person</p>
            <ul className="room-features">
              <li>• Comfortable bed</li>
              <li>• Private bathroom</li>
              <li>• Free WiFi</li>
            </ul>
          </div>

          <div className="room-card featured">
            <div className="room-image double-room">
              <span className="room-icon">🛏️🛏️</span>
            </div>
            <h3>Double Room</h3>
            <p className="room-price">800 Birr/night</p>
            <p className="room-capacity">2 People</p>
            <ul className="room-features">
              <li>• Queen size bed</li>
              <li>• Private bathroom</li>
              <li>• TV & WiFi</li>
            </ul>
            <span className="popular-badge">Most Popular</span>
          </div>

          <div className="room-card">
            <div className="room-image suite-room">
              <span className="room-icon">🏨</span>
            </div>
            <h3>Suite</h3>
            <p className="room-price">1500 Birr/night</p>
            <p className="room-capacity">4 People</p>
            <ul className="room-features">
              <li>• Spacious living area</li>
              <li>• Premium amenities</li>
              <li>• Best views</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Special Offers */}
      <div className="offers-section">
        <h2 className="section-title">Special Offers</h2>
        <div className="offers-grid">
          <div className="offer-card">
            <span className="offer-icon">🎉</span>
            <h3>Dine & Stay Package</h3>
            <p>Book a room and get 20% off your meals</p>
          </div>
          <div className="offer-card">
            <span className="offer-icon">☕</span>
            <h3>Free Coffee Ceremony</h3>
            <p>Complimentary traditional coffee for hotel guests</p>
          </div>
          <div className="offer-card">
            <span className="offer-icon">🌟</span>
            <h3>Weekend Special</h3>
            <p>Stay 2 nights, get 3rd night 50% off</p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="contact-section">
        <h2 className="section-title">Visit Us</h2>
        <div className="contact-info">
          <div className="contact-item">
            <span className="contact-icon">📍</span>
            <p>Addis Ababa, Ethiopia</p>
          </div>
          <div className="contact-item">
            <span className="contact-icon">📞</span>
            <p>+251 11 XXX XXXX</p>
          </div>
          <div className="contact-item">
            <span className="contact-icon">⏰</span>
            <p>Open Daily: 7:00 AM - 11:00 PM</p>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="status-section">
        {loading ? (
          <p>{t('checkingConnection')}</p>
        ) : (
          <div className="status-info">
            <p>{t('backendStatus')}: <strong className={health?.status === 'ok' ? 'status-ok' : 'status-error'}>{health?.status}</strong></p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
