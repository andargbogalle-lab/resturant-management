import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)
    if (error.response?.status === 401) {
      console.log('Unauthorized - redirect to login')
    }
    return Promise.reject(error)
  }
)

export default api
