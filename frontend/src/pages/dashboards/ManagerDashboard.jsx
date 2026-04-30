import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import api from '../../services/api'
import './Dashboard.css'
import './ManagerDashboard.css'

function ManagerDashboard() {
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({ orders: 0, tables: 0, menuItems: 0 })
  const [activeTab, setActiveTab] = useState('overview')
  const [users, setUsers] = useState([])
  const [menuItems, setMenuItems] = useState([])
  const [categories, setCategories] = useState([])
  const [inventory, setInventory] = useState([])
  const [showUserForm, setShowUserForm] = useState(false)
  const [showMenuForm, setShowMenuForm] = useState(false)
  const [showInventoryForm, setShowInventoryForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const { t } = useLanguage()
  const navigate = useNavigate()

  const [userForm, setUserForm] = useState({
    name: '', email: '', password: '', role: 'waiter', phone: ''
  })

  const [menuForm, setMenuForm] = useState({
    category_id: '', name: '', description: '', price: '', is_available: true
  })

  const [inventoryForm, setInventoryForm] = useState({
    item_name: '', quantity: '', unit: '', cost_per_unit: '', minimum_stock: ''
  })

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token')
    
    if (!userData || userData.role !== 'manager' || !token) {
      navigate('/login')
      return
    }
    
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(userData)
    fetchStats()
    fetchUsers()
    fetchMenuItems()
    fetchCategories()
    fetchInventory()
  }, [navigate])

  const fetchStats = async () => {
    try {
      const [ordersRes, tablesRes, menuRes] = await Promise.all([
        api.get('/orders'),
        api.get('/tables'),
        api.get('/menu-items')
      ])
      
      setStats({
        orders: ordersRes.data.length,
        tables: tablesRes.data.length,
        menuItems: menuRes.data.length
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users')
      setUsers(response.data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const fetchMenuItems = async () => {
    try {
      const response = await api.get('/menu-items')
      setMenuItems(response.data)
    } catch (error) {
      console.error('Error fetching menu items:', error)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories')
      setCategories(response.data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchInventory = async () => {
    try {
      const response = await api.get('/inventory')
      setInventory(response.data)
    } catch (error) {
      console.error('Error fetching inventory:', error)
    }
  }

  const handleAddUser = async (e) => {
    e.preventDefault()
    try {
      if (editingItem) {
        await api.put(`/users/${editingItem.id}`, userForm)
      } else {
        await api.post('/users', userForm)
      }
      fetchUsers()
      setShowUserForm(false)
      setEditingItem(null)
      setUserForm({ name: '', email: '', password: '', role: 'waiter', phone: '' })
    } catch (error) {
      alert('Error: ' + (error.response?.data?.message || 'Failed to save user'))
    }
  }

  const handleDeleteUser = async (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/users/${id}`)
        fetchUsers()
      } catch (error) {
        alert('Error deleting user')
      }
    }
  }

  const handleAddMenuItem = async (e) => {
    e.preventDefault()
    try {
      if (editingItem) {
        await api.put(`/menu-items/${editingItem.id}`, menuForm)
      } else {
        await api.post('/menu-items', menuForm)
      }
      fetchMenuItems()
      setShowMenuForm(false)
      setEditingItem(null)
      setMenuForm({ category_id: '', name: '', description: '', price: '', is_available: true })
    } catch (error) {
      alert('Error: ' + (error.response?.data?.message || 'Failed to save menu item'))
    }
  }

  const handleDeleteMenuItem = async (id) => {
    if (confirm('Are you sure you want to delete this menu item?')) {
      try {
        await api.delete(`/menu-items/${id}`)
        fetchMenuItems()
      } catch (error) {
        alert('Error deleting menu item')
      }
    }
  }

  const handleAddInventory = async (e) => {
    e.preventDefault()
    try {
      if (editingItem) {
        await api.put(`/inventory/${editingItem.id}`, inventoryForm)
      } else {
        await api.post('/inventory', inventoryForm)
      }
      fetchInventory()
      setShowInventoryForm(false)
      setEditingItem(null)
      setInventoryForm({ item_name: '', quantity: '', unit: '', cost_per_unit: '', minimum_stock: '' })
    } catch (error) {
      alert('Error: ' + (error.response?.data?.message || 'Failed to save inventory'))
    }
  }

  const handleDeleteInventory = async (id) => {
    if (confirm('Are you sure you want to delete this inventory item?')) {
      try {
        await api.delete(`/inventory/${id}`)
        fetchInventory()
      } catch (error) {
        alert('Error deleting inventory')
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  if (!user) return <div className="loading">Loading...</div>

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>👨‍💼 {t('manager')} Dashboard</h1>
        <div className="user-info">
          <span>{t('welcome')}, {user.name}</span>
          <button onClick={handleLogout} className="logout-btn">{t('logout')}</button>
        </div>
      </div>

      <div className="tabs">
        <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>Staff Management</button>
        <button className={activeTab === 'menu' ? 'active' : ''} onClick={() => setActiveTab('menu')}>Menu Management</button>
        <button className={activeTab === 'inventory' ? 'active' : ''} onClick={() => setActiveTab('inventory')}>Inventory</button>
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>{t('totalOrders')}</h3>
              <p className="stat-number">{stats.orders}</p>
            </div>
            <div className="stat-card">
              <h3>{t('totalTables')}</h3>
              <p className="stat-number">{stats.tables}</p>
            </div>
            <div className="stat-card">
              <h3>{t('menuItems')}</h3>
              <p className="stat-number">{stats.menuItems}</p>
            </div>
          </div>
        </>
      )}

      {activeTab === 'users' && (
        <div className="management-section">
          <div className="section-header">
            <h2>Staff Management</h2>
            <button onClick={() => { setShowUserForm(true); setEditingItem(null); }} className="add-btn">+ Add Staff</button>
          </div>

          {showUserForm && (
            <div className="modal">
              <div className="modal-content">
                <h3>{editingItem ? 'Edit Staff' : 'Add New Staff'}</h3>
                <form onSubmit={handleAddUser}>
                  <input type="text" placeholder="Name" value={userForm.name} onChange={(e) => setUserForm({...userForm, name: e.target.value})} required />
                  <input type="email" placeholder="Email" value={userForm.email} onChange={(e) => setUserForm({...userForm, email: e.target.value})} required />
                  <input type="password" placeholder="Password" value={userForm.password} onChange={(e) => setUserForm({...userForm, password: e.target.value})} required={!editingItem} />
                  <input type="text" placeholder="Phone" value={userForm.phone} onChange={(e) => setUserForm({...userForm, phone: e.target.value})} />
                  <select value={userForm.role} onChange={(e) => setUserForm({...userForm, role: e.target.value})}>
                    <option value="cashier">Cashier</option>
                    <option value="chef">Chef</option>
                    <option value="waiter">Waiter</option>
                  </select>
                  <div className="modal-actions">
                    <button type="submit" className="save-btn">Save</button>
                    <button type="button" onClick={() => { setShowUserForm(false); setEditingItem(null); }} className="cancel-btn">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td><span className={`role-badge ${u.role}`}>{u.role}</span></td>
                  <td>{u.phone}</td>
                  <td>
                    <button onClick={() => { setEditingItem(u); setUserForm(u); setShowUserForm(true); }} className="edit-btn">Edit</button>
                    <button onClick={() => handleDeleteUser(u.id)} className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'menu' && (
        <div className="management-section">
          <div className="section-header">
            <h2>Menu Management</h2>
            <button onClick={() => { setShowMenuForm(true); setEditingItem(null); }} className="add-btn">+ Add Menu Item</button>
          </div>

          {showMenuForm && (
            <div className="modal">
              <div className="modal-content">
                <h3>{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</h3>
                <form onSubmit={handleAddMenuItem}>
                  <select value={menuForm.category_id} onChange={(e) => setMenuForm({...menuForm, category_id: e.target.value})} required>
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  <input type="text" placeholder="Name" value={menuForm.name} onChange={(e) => setMenuForm({...menuForm, name: e.target.value})} required />
                  <textarea placeholder="Description" value={menuForm.description} onChange={(e) => setMenuForm({...menuForm, description: e.target.value})} />
                  <input type="number" step="0.01" placeholder="Price" value={menuForm.price} onChange={(e) => setMenuForm({...menuForm, price: e.target.value})} required />
                  <label>
                    <input type="checkbox" checked={menuForm.is_available} onChange={(e) => setMenuForm({...menuForm, is_available: e.target.checked})} />
                    Available
                  </label>
                  <div className="modal-actions">
                    <button type="submit" className="save-btn">Save</button>
                    <button type="button" onClick={() => { setShowMenuForm(false); setEditingItem(null); }} className="cancel-btn">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.category?.name}</td>
                  <td>${parseFloat(item.price).toFixed(2)}</td>
                  <td><span className={`status-badge ${item.is_available ? 'available' : 'unavailable'}`}>{item.is_available ? 'Available' : 'Unavailable'}</span></td>
                  <td>
                    <button onClick={() => { setEditingItem(item); setMenuForm(item); setShowMenuForm(true); }} className="edit-btn">Edit</button>
                    <button onClick={() => handleDeleteMenuItem(item.id)} className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'inventory' && (
        <div className="management-section">
          <div className="section-header">
            <h2>Inventory Management</h2>
            <button onClick={() => { setShowInventoryForm(true); setEditingItem(null); }} className="add-btn">+ Add Item</button>
          </div>

          {showInventoryForm && (
            <div className="modal">
              <div className="modal-content">
                <h3>{editingItem ? 'Edit Inventory' : 'Add Inventory Item'}</h3>
                <form onSubmit={handleAddInventory}>
                  <input type="text" placeholder="Item Name" value={inventoryForm.item_name} onChange={(e) => setInventoryForm({...inventoryForm, item_name: e.target.value})} required />
                  <input type="number" placeholder="Quantity" value={inventoryForm.quantity} onChange={(e) => setInventoryForm({...inventoryForm, quantity: e.target.value})} required />
                  <input type="text" placeholder="Unit (kg, liters, pieces)" value={inventoryForm.unit} onChange={(e) => setInventoryForm({...inventoryForm, unit: e.target.value})} required />
                  <input type="number" step="0.01" placeholder="Cost per Unit" value={inventoryForm.cost_per_unit} onChange={(e) => setInventoryForm({...inventoryForm, cost_per_unit: e.target.value})} required />
                  <input type="number" placeholder="Minimum Stock" value={inventoryForm.minimum_stock} onChange={(e) => setInventoryForm({...inventoryForm, minimum_stock: e.target.value})} required />
                  <div className="modal-actions">
                    <button type="submit" className="save-btn">Save</button>
                    <button type="button" onClick={() => { setShowInventoryForm(false); setEditingItem(null); }} className="cancel-btn">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <table className="data-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Cost/Unit</th>
                <th>Min Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map(item => (
                <tr key={item.id} className={item.quantity <= item.minimum_stock ? 'low-stock' : ''}>
                  <td>{item.item_name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unit}</td>
                  <td>${parseFloat(item.cost_per_unit).toFixed(2)}</td>
                  <td>{item.minimum_stock}</td>
                  <td>
                    {item.quantity <= item.minimum_stock ? 
                      <span className="status-badge low">Low Stock</span> : 
                      <span className="status-badge ok">OK</span>
                    }
                  </td>
                  <td>
                    <button onClick={() => { setEditingItem(item); setInventoryForm(item); setShowInventoryForm(true); }} className="edit-btn">Edit</button>
                    <button onClick={() => handleDeleteInventory(item.id)} className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ManagerDashboard
