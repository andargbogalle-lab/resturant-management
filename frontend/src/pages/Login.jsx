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
      console.log('=== LOGIN ATTEMPT ===')
      console.log('Username:', email)
      console.log('Password length:', password.length)
      console.log('API URL:', 'http://127.0.0.1:8000/api/login')
      
      const response = await api.post('/login', { email, password })
      
      console.log('=== LOGIN SUCCESS ===')
      console.log('Response:', response.data)
      
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      
      // Redirect based on role
      const role = response.data.user.role
      console.log('Redirecting to:', `/dashboard/${role}`)
      navigate(`/dashboard/${role}`)
    } catch (err) {
      console.error('=== LOGIN ERROR ===')
      console.error('Error object:', err)
      console.error('Error response:', err.response)
      console.error('Error data:', err.response?.data)
      console.error('Error status:', err.response?.status)
      
      const errorMessage = err.response?.data?.message || err.message || 'Login failed'
      console.error('Displaying error:', errorMessage)
      setError(errorMessage)
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
            <label>Username</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your username"
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
      </div>
    </div>
  )
}

export default Login
