import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import api from '../../services/api'
import './Dashboard.css'

function ChefDashboard() {
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const { t } = useLanguage()
  const navigate = useNavigate()

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token')
    
    if (!userData || userData.role !== 'chef' || !token) {
      navigate('/login')
      return
    }
    
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(userData)
    fetchOrders()
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchOrders, 30000)
    return () => clearInterval(interval)
  }, [navigate])

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders')
      const kitchenOrders = response.data.filter(o => ['pending', 'preparing', 'ready'].includes(o.status))
      setOrders(kitchenOrders.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)))
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.patch(`/orders/${orderId}/status`, { status: newStatus })
      fetchOrders()
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(null)
      }
    } catch (error) {
      alert('Error updating order status')
    }
  }

  const handleUpdateItemStatus = async (orderId, itemId, newStatus) => {
    try {
      await api.patch(`/orders/${orderId}/items/${itemId}/status`, { status: newStatus })
      fetchOrders()
    } catch (error) {
      alert('Error updating item status')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const getOrderPriority = (order) => {
    const minutes = Math.floor((new Date() - new Date(order.created_at)) / 60000)
    if (minutes > 30) return 'urgent'
    if (minutes > 15) return 'high'
    return 'normal'
  }

  if (!user) return <div className="loading">Loading...</div>

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>👨‍🍳 {t('chef')} Dashboard</h1>
        <div className="user-info">
          <span>{t('welcome')}, {user.name}</span>
          <button onClick={handleLogout} className="logout-btn">{t('logout')}</button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{t('pendingOrders')}</h3>
          <p className="stat-number">{orders.filter(o => o.status === 'pending').length}</p>
        </div>
        <div className="stat-card">
          <h3>{t('preparing')}</h3>
          <p className="stat-number">{orders.filter(o => o.status === 'preparing').length}</p>
        </div>
        <div className="stat-card">
          <h3>Ready to Serve</h3>
          <p className="stat-number">{orders.filter(o => o.status === 'ready').length}</p>
        </div>
      </div>

      <div className="management-section">
        <h2>{t('kitchenOrders')}</h2>
        
        {orders.length === 0 ? (
          <p className="empty-message">{t('noPendingOrders')}</p>
        ) : (
          <div className="kitchen-queue">
            {orders.map(order => {
              const priority = getOrderPriority(order)
              const waitTime = Math.floor((new Date() - new Date(order.created_at)) / 60000)
              
              return (
                <div key={order.id} className={`order-card kitchen-order ${priority}`}>
                  <div className="order-header">
                    <div>
                      <h3>Order #{order.id}</h3>
                      <p className="table-info">Table {order.table?.table_number}</p>
                    </div>
                    <div className="order-meta">
                      <span className={`status-badge ${order.status}`}>{order.status}</span>
                      <span className={`priority-badge ${priority}`}>
                        {waitTime} min ago
                      </span>
                    </div>
                  </div>

                  <div className="order-items-list">
                    <h4>Items:</h4>
                    {order.items && order.items.map(item => (
                      <div key={item.id} className="kitchen-item">
                        <div className="item-details">
                          <strong>{item.quantity}x {item.menu_item?.name}</strong>
                          {item.notes && <p className="item-notes">📝 {item.notes}</p>}
                        </div>
                        <span className={`item-status ${item.status || 'pending'}`}>
                          {item.status || 'pending'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="order-actions">
                    {order.status === 'pending' && (
                      <button 
                        onClick={() => handleUpdateOrderStatus(order.id, 'preparing')} 
                        className="action-btn primary"
                      >
                        🔥 Start Preparing
                      </button>
                    )}
                    
                    {order.status === 'preparing' && (
                      <button 
                        onClick={() => handleUpdateOrderStatus(order.id, 'ready')} 
                        className="action-btn success"
                      >
                        ✅ Mark as Ready
                      </button>
                    )}
                    
                    {order.status === 'ready' && (
                      <div className="ready-indicator">
                        🔔 Ready for pickup by waiter
                      </div>
                    )}
                    
                    <button 
                      onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)} 
                      className="action-btn secondary"
                    >
                      {selectedOrder?.id === order.id ? 'Hide Details' : 'View Details'}
                    </button>
                  </div>

                  {selectedOrder?.id === order.id && (
                    <div className="order-details-expanded">
                      <h4>Order Details</h4>
                      <p><strong>Customer Notes:</strong> {order.notes || 'None'}</p>
                      <p><strong>Total Amount:</strong> ${parseFloat(order.total_amount).toFixed(2)}</p>
                      <p><strong>Created:</strong> {new Date(order.created_at).toLocaleString()}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default ChefDashboard
