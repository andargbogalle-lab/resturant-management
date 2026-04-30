import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      console.log('Attempting login with:', email)
      const response = await api.post('/login', { email, password })
      console.log('Login response:', response.data)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      
      // Redirect based on role
      const role = response.data.user.role
      navigate(`/dashboard/${role}`)
    } catch (err) {
      console.error('Login error:', err)
      console.error('Error response:', err.response)
      setError(err.response?.data?.message || err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <button onClick={() => navigate('/')} className="back-button-login">
        ← Back to Home
      </button>
      <div className="login-box">
        <h1 style={{ color: '#FFD700' }}>🍽️ ቤተ ሳይዳ ሬስቶራንት</h1>
        <h2>Login</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="demo-accounts">
          <h3>Demo Accounts (password: password)</h3>
          <ul>
            <li>Manager: manager@restaurant.com</li>
            <li>Cashier: cashier@restaurant.com</li>
            <li>Chef: chef@restaurant.com</li>
            <li>Waiter: waiter@restaurant.com</li>
            <li>Customer: customer@restaurant.com</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Login
