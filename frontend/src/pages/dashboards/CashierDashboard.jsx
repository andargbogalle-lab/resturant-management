import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import api from '../../services/api'
import './Dashboard.css'

function CashierDashboard() {
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [payments, setPayments] = useState([])
  const [activeTab, setActiveTab] = useState('overview')
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [paymentForm, setPaymentForm] = useState({
    payment_method: 'cash',
    amount_paid: '',
    transaction_id: ''
  })
  const { t } = useLanguage()
  const navigate = useNavigate()

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token')
    
    if (!userData || userData.role !== 'cashier' || !token) {
      navigate('/login')
      return
    }
    
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(userData)
    fetchData()
  }, [navigate])

  const fetchData = async () => {
    try {
      const [ordersRes, paymentsRes] = await Promise.all([
        api.get('/orders'),
        api.get('/payments')
      ])
      
      setOrders(ordersRes.data)
      setPayments(paymentsRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleProcessPayment = (order) => {
    setSelectedOrder(order)
    setPaymentForm({
      payment_method: 'cash',
      amount_paid: order.total_amount,
      transaction_id: ''
    })
    setShowPaymentForm(true)
  }

  const handleSubmitPayment = async (e) => {
    e.preventDefault()
    
    try {
      const paymentData = {
        order_id: selectedOrder.id,
        payment_method: paymentForm.payment_method,
        amount_paid: parseFloat(paymentForm.amount_paid),
        transaction_id: paymentForm.transaction_id || null
      }

      await api.post('/payments', paymentData)
      
      // Update order status to completed
      await api.patch(`/orders/${selectedOrder.id}/status`, { status: 'completed' })
      
      alert('Payment processed successfully!')
      setShowPaymentForm(false)
      setSelectedOrder(null)
      fetchData()
    } catch (error) {
      alert('Error processing payment: ' + (error.response?.data?.message || 'Unknown error'))
    }
  }

  const handleRefund = async (paymentId) => {
    if (!confirm('Are you sure you want to refund this payment?')) return
    
    try {
      await api.post(`/payments/${paymentId}/refund`)
      alert('Refund processed successfully')
      fetchData()
    } catch (error) {
      alert('Error processing refund')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const getTodayPayments = () => {
    const today = new Date().toDateString()
    return payments.filter(p => new Date(p.created_at).toDateString() === today)
  }

  const getTodayRevenue = () => {
    return getTodayPayments()
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + parseFloat(p.amount_paid), 0)
  }

  const getChange = () => {
    if (!paymentForm.amount_paid || !selectedOrder) return 0
    return parseFloat(paymentForm.amount_paid) - parseFloat(selectedOrder.total_amount)
  }

  if (!user) return <div className="loading">Loading...</div>

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>💰 {t('cashier')} Dashboard</h1>
        <div className="user-info">
          <span>{t('welcome')}, {user.name}</span>
          <button onClick={handleLogout} className="logout-btn">{t('logout')}</button>
        </div>
      </div>

      <div className="tabs">
        <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={activeTab === 'pending' ? 'active' : ''} onClick={() => setActiveTab('pending')}>Pending Payments</button>
        <button className={activeTab === 'history' ? 'active' : ''} onClick={() => setActiveTab('history')}>Payment History</button>
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Pending Payments</h3>
              <p className="stat-number">{orders.filter(o => o.status === 'ready' && !o.payment).length}</p>
            </div>
            <div className="stat-card">
              <h3>Today's Transactions</h3>
              <p className="stat-number">{getTodayPayments().length}</p>
            </div>
            <div className="stat-card">
              <h3>Today's Revenue</h3>
              <p className="stat-number">${getTodayRevenue().toFixed(2)}</p>
            </div>
          </div>
        </>
      )}

      {activeTab === 'pending' && (
        <div className="management-section">
          <h2>Orders Ready for Payment</h2>
          
          {orders.filter(o => ['ready', 'completed'].includes(o.status) && !o.payment).length === 0 ? (
            <p className="empty-message">No pending payments</p>
          ) : (
            <div className="orders-grid">
              {orders.filter(o => ['ready', 'completed'].includes(o.status) && !o.payment).map(order => (
                <div key={order.id} className="order-card payment-card">
                  <div className="order-header">
                    <h3>Order #{order.id}</h3>
                    <span className={`status-badge ${order.status}`}>{order.status}</span>
                  </div>
                  
                  <div className="order-details">
                    <p><strong>Table:</strong> {order.table?.table_number}</p>
                    <p><strong>Items:</strong> {order.items?.length || 0}</p>
                    <p><strong>Time:</strong> {new Date(order.created_at).toLocaleTimeString()}</p>
                  </div>
                  
                  <div className="order-total">
                    <strong>Total Amount:</strong>
                    <strong className="amount">${parseFloat(order.total_amount).toFixed(2)}</strong>
                  </div>
                  
                  <button onClick={() => handleProcessPayment(order)} className="action-btn primary">
                    💳 Process Payment
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="management-section">
          <h2>Payment History (Today)</h2>
          
          <table className="data-table">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Order ID</th>
                <th>Method</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getTodayPayments().map(payment => (
                <tr key={payment.id}>
                  <td>#{payment.id}</td>
                  <td>#{payment.order_id}</td>
                  <td><span className="payment-method">{payment.payment_method}</span></td>
                  <td>${parseFloat(payment.amount_paid).toFixed(2)}</td>
                  <td><span className={`status-badge ${payment.status}`}>{payment.status}</span></td>
                  <td>{new Date(payment.created_at).toLocaleTimeString()}</td>
                  <td>
                    {payment.status === 'completed' && (
                      <button onClick={() => handleRefund(payment.id)} className="refund-btn">
                        Refund
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showPaymentForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Process Payment - Order #{selectedOrder?.id}</h3>
            
            <div className="payment-summary">
              <p><strong>Table:</strong> {selectedOrder?.table?.table_number}</p>
              <p><strong>Order Total:</strong> ${parseFloat(selectedOrder?.total_amount).toFixed(2)}</p>
            </div>

            <form onSubmit={handleSubmitPayment}>
              <div className="form-group">
                <label>Payment Method</label>
                <select 
                  value={paymentForm.payment_method} 
                  onChange={(e) => setPaymentForm({...paymentForm, payment_method: e.target.value})}
                  required
                >
                  <option value="cash">💵 Cash</option>
                  <option value="card">💳 Card</option>
                  <option value="mobile">📱 Mobile Payment (Chapa)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Amount Paid</label>
                <input 
                  type="number" 
                  step="0.01" 
                  value={paymentForm.amount_paid}
                  onChange={(e) => setPaymentForm({...paymentForm, amount_paid: e.target.value})}
                  required
                />
              </div>

              {paymentForm.payment_method !== 'cash' && (
                <div className="form-group">
                  <label>Transaction ID</label>
                  <input 
                    type="text" 
                    placeholder="Enter transaction ID"
                    value={paymentForm.transaction_id}
                    onChange={(e) => setPaymentForm({...paymentForm, transaction_id: e.target.value})}
                  />
                </div>
              )}

              {paymentForm.payment_method === 'cash' && getChange() >= 0 && (
                <div className="change-display">
                  <strong>Change to Return:</strong>
                  <strong className="change-amount">${getChange().toFixed(2)}</strong>
                </div>
              )}

              {getChange() < 0 && (
                <div className="error-message">
                  Amount paid is less than order total
                </div>
              )}

              <div className="modal-actions">
                <button type="submit" className="save-btn" disabled={getChange() < 0}>
                  Complete Payment
                </button>
                <button type="button" onClick={() => { setShowPaymentForm(false); setSelectedOrder(null); }} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CashierDashboard
