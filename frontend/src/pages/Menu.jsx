import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import api from '../services/api'
import './Menu.css'

function Menu() {
  const [categories, setCategories] = useState([])
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [tableNumber, setTableNumber] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [showOrderSuccess, setShowOrderSuccess] = useState(false)
  const { t } = useLanguage()
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
    // Load cart from localStorage
    const savedCart = localStorage.getItem('guestCart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('guestCart', JSON.stringify(cart))
  }, [cart])

  const fetchData = async () => {
    try {
      const [categoriesRes, menuItemsRes] = await Promise.all([
        api.get('/categories'),
        api.get('/menu-items')
      ])
      setCategories(categoriesRes.data)
      setMenuItems(menuItemsRes.data.filter(item => item.is_available))
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = (menuItem) => {
    console.log('Adding to cart:', menuItem) // Debug log
    
    const existingItem = cart.find(item => item.menu_item_id === menuItem.id)
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.menu_item_id === menuItem.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
      console.log('Updated quantity for existing item') // Debug log
    } else {
      const newItem = {
        menu_item_id: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: 1,
        notes: ''
      }
      setCart([...cart, newItem])
      console.log('Added new item to cart:', newItem) // Debug log
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
      alert('Your cart is empty! Please add items first.')
      return
    }

    if (!tableNumber) {
      alert('Please enter your table number')
      return
    }

    try {
      const orderData = {
        table_id: parseInt(tableNumber), // This will be the table ID (1-10)
        customer_name: customerName || 'Guest',
        items: cart.map(item => ({
          menu_item_id: item.menu_item_id,
          quantity: item.quantity,
          notes: item.notes
        }))
      }

      console.log('Placing order:', orderData) // Debug log

      // Create order without authentication
      const response = await api.post('/orders', orderData)
      
      console.log('Order response:', response.data) // Debug log
      
      // Clear cart
      setCart([])
      localStorage.removeItem('guestCart')
      setShowCart(false)
      setShowOrderSuccess(true)
      setTableNumber('')
      setCustomerName('')
      
      // Hide success message after 5 seconds
      setTimeout(() => setShowOrderSuccess(false), 5000)
    } catch (error) {
      console.error('Order error:', error) // Debug log
      console.error('Error response:', error.response) // Debug log
      alert('Error placing order: ' + (error.response?.data?.message || error.message || 'Please try again'))
    }
  }

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category_id === parseInt(selectedCategory))

  if (loading) return <div className="loading">{t('checkingConnection')}</div>

  return (
    <div className="menu-container">
      <div className="menu-header">
        <button onClick={() => navigate('/')} className="back-button">
          ← {t('home')}
        </button>
        <h1>{t('ourMenu')}</h1>
        <button onClick={() => setShowCart(true)} className="cart-button">
          🛒 Cart ({cart.length})
        </button>
      </div>

      {showOrderSuccess && (
        <div className="success-message">
          ✅ Order placed successfully! Your order has been sent to the kitchen.
        </div>
      )}
      
      <div className="category-filter">
        <button 
          className={selectedCategory === 'all' ? 'active' : ''}
          onClick={() => setSelectedCategory('all')}
        >
          {t('allItems')}
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            className={selectedCategory === category.id ? 'active' : ''}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {filteredItems.map(item => (
          <div key={item.id} className="menu-item-card">
            {item.image && <img src={item.image} alt={item.name} />}
            <div className="item-info">
              <h3>{item.name}</h3>
              <p className="category-name">{item.category?.name}</p>
              <p className="description">{item.description}</p>
              <div className="item-footer">
                <p className="price">${parseFloat(item.price).toFixed(2)}</p>
                <button onClick={() => addToCart(item)} className="add-to-cart-btn">
                  + Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showCart && (
        <div className="cart-modal">
          <div className="cart-modal-content">
            <div className="cart-header">
              <h2>🛒 Your Order</h2>
              <button onClick={() => setShowCart(false)} className="close-btn">✕</button>
            </div>
            
            {cart.length === 0 ? (
              <p className="empty-cart">Your cart is empty. Add items from the menu!</p>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.menu_item_id} className="cart-item">
                      <div className="cart-item-info">
                        <strong>{item.name}</strong>
                        <p>${parseFloat(item.price).toFixed(2)} each</p>
                      </div>
                      
                      <div className="cart-item-controls">
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
                        
                        <button onClick={() => removeFromCart(item.menu_item_id)} className="remove-btn">
                          🗑️
                        </button>
                        
                        <div className="item-total">
                          ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="cart-total">
                  <strong>Total:</strong>
                  <strong>${calculateTotal().toFixed(2)}</strong>
                </div>

                <div className="customer-info">
                  <h3>Your Information</h3>
                  <p className="info-text">Enter a table number between 1-10</p>
                  <input 
                    type="number" 
                    placeholder="Table Number (1-10) *" 
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="table-input"
                    min="1"
                    max="10"
                    required
                  />
                  <input 
                    type="text" 
                    placeholder="Your Name (Optional)" 
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="name-input"
                  />
                </div>
                
                <div className="cart-actions">
                  <button onClick={handlePlaceOrder} className="place-order-btn" disabled={!tableNumber}>
                    📋 Place Order
                  </button>
                  <button onClick={() => setShowCart(false)} className="continue-btn">
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Menu
