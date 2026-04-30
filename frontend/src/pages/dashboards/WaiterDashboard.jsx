import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import api from '../../services/api'
import './Dashboard.css'

function WaiterDashboard() {
  const [user, setUser] = useState(null)
  const [tables, setTables] = useState([])
  const [menuItems, setMenuItems] = useState([])
  const [categories, setCategories] = useState([])
  const [orders, setOrders] = useState([])
  const [activeTab, setActiveTab] = useState('overview')
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [selectedTable, setSelectedTable] = useState(null)
  const [orderItems, setOrderItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { t } = useLanguage()
  const navigate = useNavigate()

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token')
    
    if (!userData || userData.role !== 'waiter' || !token) {
      navigate('/login')
      return
    }
    
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(userData)
    fetchData()
  }, [navigate])

  const fetchData = async () => {
    try {
      const [tablesRes, menuRes, categoriesRes, ordersRes] = await Promise.all([
        api.get('/tables'),
        api.get('/menu-items'),
        api.get('/categories'),
        api.get('/orders')
      ])
      
      setTables(tablesRes.data)
      setMenuItems(menuRes.data.filter(item => item.is_available))
      setCategories(categoriesRes.data)
      setOrders(ordersRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleCreateOrder = (table) => {
    setSelectedTable(table)
    setOrderItems([])
    setShowOrderForm(true)
  }

  const addItemToOrder = (menuItem) => {
    const existingItem = orderItems.find(item => item.menu_item_id === menuItem.id)
    
    if (existingItem) {
      setOrderItems(orderItems.map(item => 
        item.menu_item_id === menuItem.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setOrderItems([...orderItems, {
        menu_item_id: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: 1,
        notes: ''
      }])
    }
  }

  const removeItemFromOrder = (menuItemId) => {
    setOrderItems(orderItems.filter(item => item.menu_item_id !== menuItemId))
  }

  const updateItemQuantity = (menuItemId, quantity) => {
    if (quantity <= 0) {
      removeItemFromOrder(menuItemId)
      return
    }
    setOrderItems(orderItems.map(item => 
      item.menu_item_id === menuItemId ? { ...item, quantity } : item
    ))
  }

  const updateItemNotes = (menuItemId, notes) => {
    setOrderItems(orderItems.map(item => 
      item.menu_item_id === menuItemId ? { ...item, notes } : item
    ))
  }

  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0)
  }

  const handleSubmitOrder = async () => {
    if (orderItems.length === 0) {
      alert('Please add items to the order')
      return
    }

    try {
      const orderData = {
        table_id: selectedTable.id,
        items: orderItems.map(item => ({
          menu_item_id: item.menu_item_id,
          quantity: item.quantity,
          notes: item.notes
        }))
      }

      await api.post('/orders', orderData)
      
      // Update table status to occupied
      await api.put(`/tables/${selectedTable.id}`, { status: 'occupied' })
      
      alert('Order created successfully!')
      setShowOrderForm(false)
      setSelectedTable(null)
      setOrderItems([])
      fetchData()
    } catch (error) {
      alert('Error creating order: ' + (error.response?.data?.message || 'Unknown error'))
    }
  }

  const handleUpdateTableStatus = async (tableId, status) => {
    try {
      await api.put(`/tables/${tableId}`, { status })
      fetchData()
    } catch (error) {
      alert('Error updating table status')
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
        <h1>🍽️ {t('waiter')} Dashboard</h1>
        <div className="user-info">
          <span>{t('welcome')}, {user.name}</span>
          <button onClick={handleLogout} className="logout-btn">{t('logout')}</button>
        </div>
      </div>

      <div className="tabs">
        <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={activeTab === 'tables' ? 'active' : ''} onClick={() => setActiveTab('tables')}>Tables</button>
        <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>Active Orders</button>
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>{t('availableTables')}</h3>
              <p className="stat-number">{tables.filter(t => t.status === 'available').length}</p>
            </div>
            <div className="stat-card">
              <h3>{t('occupiedTables')}</h3>
              <p className="stat-number">{tables.filter(t => t.status === 'occupied').length}</p>
            </div>
            <div className="stat-card">
              <h3>Active Orders</h3>
              <p className="stat-number">{orders.filter(o => ['pending', 'preparing'].includes(o.status)).length}</p>
            </div>
          </div>
        </>
      )}

      {activeTab === 'tables' && (
        <div className="management-section">
          <h2>Table Management</h2>
          <div className="tables-grid">
            {tables.map(table => (
              <div key={table.id} className={`table-card ${table.status}`}>
                <h3>Table {table.table_number}</h3>
                <p>{table.capacity} {t('seats')}</p>
                <p className={`status-badge ${table.status}`}>{t(table.status)}</p>
                
                {table.status === 'available' && (
                  <button onClick={() => handleCreateOrder(table)} className="action-btn">
                    ➕ Take Order
                  </button>
                )}
                
                {table.status === 'occupied' && (
                  <button onClick={() => handleUpdateTableStatus(table.id, 'available')} className="action-btn">
                    ✅ Clear Table
                  </button>
                )}
                
                {table.status === 'reserved' && (
                  <button onClick={() => handleUpdateTableStatus(table.id, 'occupied')} className="action-btn">
                    👥 Seat Guests
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="management-section">
          <h2>Active Orders</h2>
          <div className="orders-list">
            {orders.filter(o => ['pending', 'preparing', 'ready'].includes(o.status)).length === 0 ? (
              <p>No active orders</p>
            ) : (
              orders.filter(o => ['pending', 'preparing', 'ready'].includes(o.status)).map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <h3>Order #{order.id}</h3>
                    <span className={`status-badge ${order.status}`}>{order.status}</span>
                  </div>
                  <p><strong>Table:</strong> {order.table?.table_number}</p>
                  <p><strong>Total:</strong> ${parseFloat(order.total_amount).toFixed(2)}</p>
                  <p><strong>Items:</strong> {order.items?.length || 0}</p>
                  <p><strong>Time:</strong> {new Date(order.created_at).toLocaleTimeString()}</p>
                  
                  {order.status === 'ready' && (
                    <button className="action-btn">✅ Serve Order</button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {showOrderForm && (
        <div className="modal">
          <div className="modal-content large">
            <h3>Create Order - Table {selectedTable?.table_number}</h3>
            
            <div className="order-form-container">
              <div className="menu-section">
                <h4>Select Items</h4>
                
                <div className="category-filter">
                  <button 
                    className={selectedCategory === 'all' ? 'active' : ''} 
                    onClick={() => setSelectedCategory('all')}
                  >
                    All
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
                    <div key={item.id} className="menu-item-card" onClick={() => addItemToOrder(item)}>
                      <h4>{item.name}</h4>
                      <p className="item-description">{item.description}</p>
                      <p className="item-price">${parseFloat(item.price).toFixed(2)}</p>
                      <button className="add-btn">+ Add</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="order-summary">
                <h4>Order Summary</h4>
                
                {orderItems.length === 0 ? (
                  <p className="empty-order">No items added yet</p>
                ) : (
                  <>
                    {orderItems.map(item => (
                      <div key={item.menu_item_id} className="order-item">
                        <div className="item-info">
                          <strong>{item.name}</strong>
                          <p>${parseFloat(item.price).toFixed(2)} each</p>
                        </div>
                        
                        <div className="quantity-control">
                          <button onClick={() => updateItemQuantity(item.menu_item_id, item.quantity - 1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateItemQuantity(item.menu_item_id, item.quantity + 1)}>+</button>
                        </div>
                        
                        <input 
                          type="text" 
                          placeholder="Special notes..." 
                          value={item.notes}
                          onChange={(e) => updateItemNotes(item.menu_item_id, e.target.value)}
                          className="notes-input"
                        />
                        
                        <button onClick={() => removeItemFromOrder(item.menu_item_id)} className="remove-btn">🗑️</button>
                        
                        <div className="item-total">
                          ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                    
                    <div className="order-total">
                      <strong>Total:</strong>
                      <strong>${calculateTotal().toFixed(2)}</strong>
                    </div>
                  </>
                )}
                
                <div className="modal-actions">
                  <button onClick={handleSubmitOrder} className="save-btn" disabled={orderItems.length === 0}>
                    Submit Order
                  </button>
                  <button onClick={() => { setShowOrderForm(false); setSelectedTable(null); setOrderItems([]); }} className="cancel-btn">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WaiterDashboard
