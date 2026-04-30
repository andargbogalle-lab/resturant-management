import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import api from '../../services/api'
import './Dashboard.css'

function CustomerDashboard() {
  const [user, setUser] = useState(null)
  const [menuItems, setMenuItems] = useState([])
  const [categories, setCategories] = useState([])
  const [myOrders, setMyOrders] = useState([])
  const [cart, setCart] = useState([])
  const [activeTab, setActiveTab] = useState('menu')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showCart, setShowCart] = useState(false)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [feedbackForm, setFeedbackForm] = useState({
    rating: 5,
    comment: ''
  })
  const { t } = useLanguage()
  const navigate = useNavigate()

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token')
    
    if (!userData || userData.role !== 'customer' || !token) {
      navigate('/login')
      return
    }
    
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(userData)
    fetchData()
  }, [navigate])

  const fetchData = async () => {
    try {
      const [menuRes, categoriesRes, ordersRes] = await Promise.all([
        api.get('/menu-items'),
        api.get('/categories'),
        api.get('/orders')
      ])
      
      setMenuItems(menuRes.data.filter(item => item.is_available))
      setCategories(categoriesRes.data)
      setMyOrders(ordersRes.data.filter(o => o.user_id === user?.id))
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const addToCart = (menuItem) => {
    const existingItem = cart.find(item => item.menu_item_id === menuItem.id)
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.menu_item_id === menuItem.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, {
        menu_item_id: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: 1,
        notes: ''
      }])
    }
  }

  const removeFromCart = (menuItemId) => {
    setCart(cart.filter(item => item.menu_item_id !== menuItemId))
  }

  const updateCartQuantity = (menuItemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(menuItemId)
      return
    }
    setCart(cart.map(item => 
      item.menu_item_id === menuItemId ? { ...item, quantity } : item
    ))
  }

  const updateCartNotes = (menuItemId, notes) => {
    setCart(cart.map(item => 
      item.menu_item_id === menuItemId ? { ...item, notes } : item
    ))
  }

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0)
  }

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty')
      return
    }

    try {
      const orderData = {
        table_id: 1, // Default table for customer orders
        items: cart.map(item => ({
          menu_item_id: item.menu_item_id,
          quantity: item.quantity,
          notes: item.notes
        }))
      }

      await api.post('/orders', orderData)
      
      alert('Order placed successfully! A waiter will serve you shortly.')
      setCart([])
      setShowCart(false)
      fetchData()
    } catch (error) {
      alert('Error placing order: ' + (error.response?.data?.message || 'Unknown error'))
    }
  }

  const handleSubmitFeedback = async (e) => {
    e.preventDefault()
    
    try {
      await api.post('/feedback', feedbackForm)
      alert('Thank you for your feedback!')
      setShowFeedbackForm(false)
      setFeedbackForm({ rating: 5, comment: '' })
    } catch (error) {
      alert('Error submitting feedback')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const filteredMenuItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category_id == selectedCategory)

  if (!user) return <div className="loading">Loading...</div>

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>🍴 {t('customer')} Dashboard</h1>
        <div className="user-info">
          <span>{t('welcome')}, {user.name}</span>
          <button onClick={() => setShowCart(true)} className="cart-btn">
            🛒 Cart ({cart.length})
          </button>
          <button onClick={handleLogout} className="logout-btn">{t('logout')}</button>
        </div>
      </div>

      <div className="tabs">
        <button className={activeTab === 'menu' ? 'active' : ''} onClick={() => setActiveTab('menu')}>Browse Menu</button>
        <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>My Orders</button>
        <button className={activeTab === 'feedback' ? 'active' : ''} onClick={() => setActiveTab('feedback')}>Feedback</button>
      </div>

      {activeTab === 'menu' && (
        <div className="management-section">
          <h2>{t('ourMenu')}</h2>
          
          <div className="category-filter">
            <button 
              className={selectedCategory === 'all' ? 'active' : ''} 
              onClick={() => setSelectedCategory('all')}
            >
              {t('allItems')}
            </button>
            {categories.map(cat => (
              <button 
                key={cat.id}
                className={selectedCategory == cat.id ? 'active' : ''} 
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="menu-items-grid">
            {filteredMenuItems.map(item => (
              <div key={item.id} className="menu-item-card customer">
                <h3>{item.name}</h3>
                <p className="item-description">{item.description}</p>
                <p className="item-category">{item.category?.name}</p>
                <div className="item-footer">
                  <span className="item-price">${parseFloat(item.price).toFixed(2)}</span>
                  <button onClick={() => addToCart(item)} className="add-btn">
                    + Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="management-section">
          <h2>{t('orderHistory')}</h2>
          
          {myOrders.length === 0 ? (
            <p className="empty-message">You haven't placed any orders yet</p>
          ) : (
            <div className="orders-list">
              {myOrders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <h3>Order #{order.id}</h3>
                    <span className={`status-badge ${order.status}`}>{order.status}</span>
                  </div>
                  
                  <div className="order-details">
                    <p><strong>Table:</strong> {order.table?.table_number}</p>
                    <p><strong>Items:</strong> {order.items?.length || 0}</p>
                    <p><strong>Total:</strong> ${parseFloat(order.total_amount).toFixed(2)}</p>
                    <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
                  </div>

                  {order.items && order.items.length > 0 && (
                    <div className="order-items">
                      <h4>Items:</h4>
                      {order.items.map(item => (
                        <div key={item.id} className="order-item-detail">
                          <span>{item.quantity}x {item.menu_item?.name}</span>
                          <span>${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'feedback' && (
        <div className="management-section">
          <h2>Share Your Feedback</h2>
          
          <button onClick={() => setShowFeedbackForm(true)} className="action-btn primary">
            ⭐ Leave Feedback
          </button>

          {showFeedbackForm && (
            <div className="modal">
              <div className="modal-content">
                <h3>Your Feedback</h3>
                
                <form onSubmit={handleSubmitFeedback}>
                  <div className="form-group">
                    <label>Rating</label>
                    <div className="rating-selector">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          className={`star-btn ${feedbackForm.rating >= star ? 'active' : ''}`}
                          onClick={() => setFeedbackForm({...feedbackForm, rating: star})}
                        >
                          ⭐
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Comment</label>
                    <textarea 
                      placeholder="Tell us about your experience..."
                      value={feedbackForm.comment}
                      onChange={(e) => setFeedbackForm({...feedbackForm, comment: e.target.value})}
                      rows="5"
                      required
                    />
                  </div>

                  <div className="modal-actions">
                    <button type="submit" className="save-btn">Submit Feedback</button>
                    <button type="button" onClick={() => setShowFeedbackForm(false)} className="cancel-btn">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {showCart && (
        <div className="modal">
          <div className="modal-content large">
            <h3>🛒 Your Cart</h3>
            
            {cart.length === 0 ? (
              <p className="empty-message">Your cart is empty</p>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.menu_item_id} className="cart-item">
                      <div className="item-info">
                        <strong>{item.name}</strong>
                        <p>${parseFloat(item.price).toFixed(2)} each</p>
                      </div>
                      
                      <div className="quantity-control">
                        <button onClick={() => updateCartQuantity(item.menu_item_id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateCartQuantity(item.menu_item_id, item.quantity + 1)}>+</button>
                      </div>
                      
                      <input 
                        type="text" 
                        placeholder="Special requests..." 
                        value={item.notes}
                        onChange={(e) => updateCartNotes(item.menu_item_id, e.target.value)}
                        className="notes-input"
                      />
                      
                      <button onClick={() => removeFromCart(item.menu_item_id)} className="remove-btn">🗑️</button>
                      
                      <div className="item-total">
                        ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="cart-total">
                  <strong>Total:</strong>
                  <strong>${calculateTotal().toFixed(2)}</strong>
                </div>
              </>
            )}
            
            <div className="modal-actions">
              <button onClick={handlePlaceOrder} className="save-btn" disabled={cart.length === 0}>
                Place Order
              </button>
              <button onClick={() => setShowCart(false)} className="cancel-btn">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomerDashboard
