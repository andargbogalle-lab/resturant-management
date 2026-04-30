import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import './Navbar.css'

function Navbar() {
  const { language, toggleLanguage, t } = useLanguage()

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🍽️ {t('restaurantName')}
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">{t('home')}</Link>
          </li>
          <li className="nav-item">
            <Link to="/menu" className="nav-link">{t('menu')}</Link>
          </li>
          <li className="nav-item">
            <button onClick={toggleLanguage} className="nav-link lang-btn">
              {language === 'en' ? '🇪🇹 አማ' : '🇬🇧 EN'}
            </button>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link login-link">
              👤 {t('login')}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
