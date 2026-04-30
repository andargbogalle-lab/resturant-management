import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import api from '../../services/api'
import './Dashboard.css'

function ManagerDashboard() {
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [payments, setPayments] = useState([])
  const [users, setUsers] = useState([])
  const [menuItems, setMenuItems] = useState([])
  const [tables, setTables] = useState([])
  const [rooms, setRooms] = useState([])
  const [bookings, setBookings] = useState([])
  const [activeTab, setActiveTab] = useState('overview')
  const [dateRange, setDateRange] = useState('today')
  const { t } = useLanguage()
  const navigate = useNavigate()

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token')
    
    if (!userData || userData.role !== 'manager' || !token) {
      navigate('/login')
      return
    }
    
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(userData)
    fetchAllData()
  }, [navigate])

  const fetchAllData = async () => {
    try {
      const [ordersRes, paymentsRes, usersRes, menuRes, tablesRes, roomsRes, bookingsRes] = await Promise.all([
        api.get('/orders'),
        api.get('/payments'),
        api.get('/users'),
        api.get('/menu-items'),
        api.get('/tables'),
        api.get('/rooms'),
        api.get('/room-bookings')
      ])
      
      setOrders(ordersRes.data)
      setPayments(paymentsRes.data)
      setUsers(usersRes.data)
      setMenuItems(menuRes.data)
      setTables(tablesRes.data)
      setRooms(roomsRes.data)
      setBookings(bookingsRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  // Analytics Functions
  const getFilteredData = () => {
    const now = new Date()
    let startDate

    switch(dateRange) {
      case 'today':
        startDate = new Date(now.setHours(0, 0, 0, 0))
        break
      case 'week':
        startDate = new Date(now.setDate(now.getDate() - 7))
        break
      case 'month':
        startDate = new Date(now.setMonth(now.getMonth() - 1))
        break
      default:
        startDate = new Date(0)
    }

    return {
      orders: orders.filter(o => new Date(o.created_at) >= startDate),
      payments: payments.filter(p => new Date(p.created_at) >= startDate),
      bookings: bookings.filter(b => new Date(b.created_at) >= startDate)
    }
  }

  const calculateRevenue = () => {
    const filtered = getFilteredData()
    const orderRevenue = filtered.payments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + parseFloat(p.total || p.amount || 0), 0)
    
    const bookingRevenue = filtered.bookings
      .filter(b => b.status === 'confirmed' || b.status === 'checked_in')
      .reduce((sum, b) => sum + parseFloat(b.total_price || 0), 0)
    
    return {
      total: orderRevenue + bookingRevenue,
      orders: orderRevenue,
      bookings: bookingRevenue
    }
  }

  const getTopSellingItems = () => {
    const filtered = getFilteredData()
    const itemCounts = {}
    
    filtered.orders.forEach(order => {
      (order.order_items || []).forEach(item => {
        const itemName = item.menu_item?.name || 'Unknown'
        if (!itemCounts[itemName]) {
          itemCounts[itemName] = { name: itemName, count: 0, revenue: 0 }
        }
        itemCounts[itemName].count += item.quantity
        itemCounts[itemName].revenue += parseFloat(item.price) * item.quantity
      })
    })
    
    return Object.values(itemCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
  }

  const getStaffPerformance = () => {
    const filtered = getFilteredData()
    const staffStats = {}
    
    users.forEach(u => {
      staffStats[u.id] = {
        name: u.name,
        role: u.role,
        orders: 0,
        payments: 0,
        revenue: 0
      }
    })
    
    filtered.orders.forEach(order => {
      if (order.waiter_id && staffStats[order.waiter_id]) {
        staffStats[order.waiter_id].orders++
      }
    })
    
    filtered.payments.forEach(payment => {
      if (payment.cashier_id && staffStats[payment.cashier_id]) {
        staffStats[payment.cashier_id].payments++
        staffStats[payment.cashier_id].revenue += parseFloat(payment.total || payment.amount || 0)
      }
    })
    
    return Object.values(staffStats).filter(s => s.orders > 0 || s.payments > 0)
  }

  const revenue = calculateRevenue()
  const filtered = getFilteredData()
  const topItems = getTopSellingItems()
  const staffPerformance = getStaffPerformance()

  if (!user) return <div className="loading">Loading...</div>

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>📊 Manager Dashboard</h1>
        <div className="user-info">
          <span>{t('welcome')}, {user.name}</span>
          <button onClick={handleLogout} className="logout-btn">{t('logout')}</button>
        </div>
      </div>

      <div className="tabs">
        <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={activeTab === 'reports' ? 'active' : ''} onClick={() => setActiveTab('reports')}>Reports</button>
        <button className={activeTab === 'staff' ? 'active' : ''} onClick={() => setActiveTab('staff')}>Staff</button>
        <button className={activeTab === 'inventory' ? 'active' : ''} onClick={() => setActiveTab('inventory')}>Inventory</button>
        <button className={activeTab === 'rooms' ? 'active' : ''} onClick={() => setActiveTab('rooms')}>Rooms</button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Date Range:</label>
        <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} style={{ padding: '8px', borderRadius: '5px' }}>
          <option value="today">Today</option>
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="all">All Time</option>
        </select>
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="stats-grid">
            <div className="stat-card" style={{ backgroundColor: '#4caf50', color: 'white' }}>
              <h3>Total Revenue</h3>
              <p className="stat-number">${revenue.total.toFixed(2)}</p>
              <p style={{ fontSize: '0.85em', marginTop: '5px' }}>
                Orders: ${revenue.orders.toFixed(2)} | Rooms: ${revenue.bookings.toFixed(2)}
              </p>
            </div>
            <div className="stat-card">
              <h3>Total Orders</h3>
              <p className="stat-number">{filtered.orders.length}</p>
              <p style={{ fontSize: '0.85em', marginTop: '5px' }}>
                Completed: {filtered.orders.filter(o => o.status === 'completed').length}
              </p>
            </div>
            <div className="stat-card">
              <h3>Room Bookings</h3>
              <p className="stat-number">{filtered.bookings.length}</p>
              <p style={{ fontSize: '0.85em', marginTop: '5px' }}>
                Active: {bookings.filter(b => b.status === 'checked_in').length}
              </p>
            </div>
            <div className="stat-card">
              <h3>Staff Members</h3>
              <p className="stat-number">{users.length}</p>
              <p style={{ fontSize: '0.85em', marginTop: '5px' }}>
                Active: {users.filter(u => u.role !== 'customer').length}
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
            <div className="management-section">
              <h2>📈 Top Selling Items</h2>
              {topItems.length === 0 ? (
                <p>No data available</p>
              ) : (
                <table className="data-table" style={{ color: '#000' }}>
                  <thead>
                    <tr>
                      <th style={{ color: '#000' }}>Item</th>
                      <th style={{ color: '#000' }}>Sold</th>
                      <th style={{ color: '#000' }}>Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topItems.map((item, index) => (
                      <tr key={index}>
                        <td style={{ color: '#000' }}>{item.name}</td>
                        <td style={{ color: '#000' }}>{item.count}</td>
                        <td style={{ color: '#000' }}>${item.revenue.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="management-section">
              <h2>🏪 Current Status</h2>
              <div style={{ padding: '15px' }}>
                <div style={{ marginBottom: '15px' }}>
                  <h4>Tables</h4>
                  <p>Available: {tables.filter(t => t.status === 'available').length} / {tables.length}</p>
                  <p>Occupied: {tables.filter(t => t.status === 'occupied').length}</p>
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <h4>Rooms</h4>
                  <p>Available: {rooms.filter(r => r.status === 'available').length} / {rooms.length}</p>
                  <p>Occupied: {rooms.filter(r => r.status === 'occupied').length}</p>
                </div>
                <div>
                  <h4>Active Orders</h4>
                  <p>Pending: {orders.filter(o => o.status === 'pending').length}</p>
                  <p>Preparing: {orders.filter(o => o.status === 'preparing').length}</p>
                  <p>Ready: {orders.filter(o => o.status === 'ready').length}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'reports' && (
        <div className="management-section">
          <h2>📊 Detailed Reports</h2>
          
          <div style={{ marginBottom: '30px' }}>
            <h3>Revenue Breakdown</h3>
            <table className="data-table" style={{ color: '#000' }}>
              <thead>
                <tr>
                  <th style={{ color: '#000' }}>Category</th>
                  <th style={{ color: '#000' }}>Count</th>
                  <th style={{ color: '#000' }}>Amount</th>
                  <th style={{ color: '#000' }}>Percentage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ color: '#000' }}>Food Orders</td>
                  <td style={{ color: '#000' }}>{filtered.payments.length}</td>
                  <td style={{ color: '#000' }}>${revenue.orders.toFixed(2)}</td>
                  <td style={{ color: '#000' }}>{revenue.total > 0 ? ((revenue.orders / revenue.total) * 100).toFixed(1) : 0}%</td>
                </tr>
                <tr>
                  <td style={{ color: '#000' }}>Room Bookings</td>
                  <td style={{ color: '#000' }}>{filtered.bookings.length}</td>
                  <td style={{ color: '#000' }}>${revenue.bookings.toFixed(2)}</td>
                  <td style={{ color: '#000' }}>{revenue.total > 0 ? ((revenue.bookings / revenue.total) * 100).toFixed(1) : 0}%</td>
                </tr>
                <tr style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
                  <td style={{ color: '#000' }}>TOTAL</td>
                  <td style={{ color: '#000' }}>{filtered.payments.length + filtered.bookings.length}</td>
                  <td style={{ color: '#000' }}>${revenue.total.toFixed(2)}</td>
                  <td style={{ color: '#000' }}>100%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h3>Payment Methods</h3>
            <table className="data-table" style={{ color: '#000' }}>
              <thead>
                <tr>
                  <th style={{ color: '#000' }}>Method</th>
                  <th style={{ color: '#000' }}>Transactions</th>
                  <th style={{ color: '#000' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {['cash', 'card', 'mobile'].map(method => {
                  const methodPayments = filtered.payments.filter(p => p.payment_method === method)
                  const amount = methodPayments.reduce((sum, p) => sum + parseFloat(p.total || p.amount || 0), 0)
                  return (
                    <tr key={method}>
                      <td style={{ textTransform: 'capitalize', color: '#000' }}>{method}</td>
                      <td style={{ color: '#000' }}>{methodPayments.length}</td>
                      <td style={{ color: '#000' }}>${amount.toFixed(2)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div>
            <h3>Order Status Distribution</h3>
            <table className="data-table" style={{ color: '#000' }}>
              <thead>
                <tr>
                  <th style={{ color: '#000' }}>Status</th>
                  <th style={{ color: '#000' }}>Count</th>
                  <th style={{ color: '#000' }}>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {['pending', 'confirmed', 'preparing', 'ready', 'served', 'completed', 'cancelled'].map(status => {
                  const count = filtered.orders.filter(o => o.status === status).length
                  return (
                    <tr key={status}>
                      <td style={{ textTransform: 'capitalize', color: '#000' }}>{status}</td>
                      <td style={{ color: '#000' }}>{count}</td>
                      <td style={{ color: '#000' }}>{filtered.orders.length > 0 ? ((count / filtered.orders.length) * 100).toFixed(1) : 0}%</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'staff' && (
        <div className="management-section">
          <h2>👥 Staff Management & Performance</h2>
          
          <div style={{ marginBottom: '30px' }}>
            <h3>Staff Performance ({dateRange})</h3>
            {staffPerformance.length === 0 ? (
              <p>No performance data available</p>
            ) : (
              <table className="data-table" style={{ color: '#000' }}>
                <thead>
                  <tr>
                    <th style={{ color: '#000' }}>Name</th>
                    <th style={{ color: '#000' }}>Role</th>
                    <th style={{ color: '#000' }}>Orders Handled</th>
                    <th style={{ color: '#000' }}>Payments Processed</th>
                    <th style={{ color: '#000' }}>Revenue Generated</th>
                  </tr>
                </thead>
                <tbody>
                  {staffPerformance.map((staff, index) => (
                    <tr key={index}>
                      <td style={{ color: '#000' }}>{staff.name}</td>
                      <td style={{ textTransform: 'capitalize', color: '#000' }}>{staff.role}</td>
                      <td style={{ color: '#000' }}>{staff.orders}</td>
                      <td style={{ color: '#000' }}>{staff.payments}</td>
                      <td style={{ color: '#000' }}>${staff.revenue.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div>
            <h3>All Staff Members</h3>
            <table className="data-table" style={{ color: '#000' }}>
              <thead>
                <tr>
                  <th style={{ color: '#000' }}>Name</th>
                  <th style={{ color: '#000' }}>Role</th>
                  <th style={{ color: '#000' }}>Phone</th>
                  <th style={{ color: '#000' }}>Email/Username</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td style={{ color: '#000' }}>{u.name}</td>
                    <td style={{ textTransform: 'capitalize', color: '#000' }}>{u.role}</td>
                    <td style={{ color: '#000' }}>{u.phone || 'N/A'}</td>
                    <td style={{ color: '#000' }}>{u.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'inventory' && (
        <div className="management-section">
          <h2>📦 Menu Items & Inventory</h2>
          
          <div style={{ marginBottom: '20px' }}>
            <p><strong>Total Items:</strong> {menuItems.length}</p>
            <p><strong>Available:</strong> {menuItems.filter(m => m.is_available).length}</p>
            <p><strong>Unavailable:</strong> {menuItems.filter(m => !m.is_available).length}</p>
          </div>

          <table className="data-table" style={{ color: '#000' }}>
            <thead>
              <tr>
                <th style={{ color: '#000' }}>Item Name</th>
                <th style={{ color: '#000' }}>Category</th>
                <th style={{ color: '#000' }}>Price</th>
                <th style={{ color: '#000' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map(item => (
                <tr key={item.id}>
                  <td style={{ color: '#000' }}>{item.name}</td>
                  <td style={{ color: '#000' }}>{item.category?.name || 'N/A'}</td>
                  <td style={{ color: '#000' }}>${parseFloat(item.price).toFixed(2)}</td>
                  <td>
                    <span className={`status-badge ${item.is_available ? 'completed' : 'cancelled'}`}>
                      {item.is_available ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'rooms' && (
        <div className="management-section">
          <h2>🏨 Room Management</h2>
          
          <div style={{ marginBottom: '20px' }}>
            <h3>Room Status</h3>
            <p><strong>Total Rooms:</strong> {rooms.length}</p>
            <p><strong>Available:</strong> {rooms.filter(r => r.status === 'available').length}</p>
            <p><strong>Occupied:</strong> {rooms.filter(r => r.status === 'occupied').length}</p>
            <p><strong>Reserved:</strong> {rooms.filter(r => r.status === 'reserved').length}</p>
          </div>

          <table className="data-table" style={{ color: '#000' }}>
            <thead>
              <tr>
                <th style={{ color: '#000' }}>Room Number</th>
                <th style={{ color: '#000' }}>Type</th>
                <th style={{ color: '#000' }}>Price/Night</th>
                <th style={{ color: '#000' }}>Capacity</th>
                <th style={{ color: '#000' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map(room => (
                <tr key={room.id}>
                  <td style={{ color: '#000' }}>{room.room_number}</td>
                  <td style={{ textTransform: 'capitalize', color: '#000' }}>{room.room_type}</td>
                  <td style={{ color: '#000' }}>${parseFloat(room.price_per_night).toFixed(2)}</td>
                  <td style={{ color: '#000' }}>{room.capacity} guests</td>
                  <td>
                    <span className={`status-badge ${room.status}`}>
                      {room.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: '30px' }}>
            <h3>Recent Bookings</h3>
            <table className="data-table" style={{ color: '#000' }}>
              <thead>
                <tr>
                  <th style={{ color: '#000' }}>Booking ID</th>
                  <th style={{ color: '#000' }}>Room</th>
                  <th style={{ color: '#000' }}>Guest Name</th>
                  <th style={{ color: '#000' }}>Check-in</th>
                  <th style={{ color: '#000' }}>Check-out</th>
                  <th style={{ color: '#000' }}>Total Price</th>
                  <th style={{ color: '#000' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 10).map(booking => (
                  <tr key={booking.id}>
                    <td style={{ color: '#000' }}>#{booking.id}</td>
                    <td style={{ color: '#000' }}>{booking.room?.room_number}</td>
                    <td style={{ color: '#000' }}>{booking.guest_name}</td>
                    <td style={{ color: '#000' }}>{new Date(booking.check_in_date).toLocaleDateString()}</td>
                    <td style={{ color: '#000' }}>{new Date(booking.check_out_date).toLocaleDateString()}</td>
                    <td style={{ color: '#000' }}>${parseFloat(booking.total_price).toFixed(2)}</td>
                    <td>
                      <span className={`status-badge ${booking.status}`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManagerDashboard
