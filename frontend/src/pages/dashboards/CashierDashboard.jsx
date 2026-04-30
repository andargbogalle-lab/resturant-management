import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import api from '../../services/api'
import './Dashboard.css'

function CashierDashboard() {
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [payments, setPayments] = useState([])
  const [bookings, setBookings] = useState([])
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
      const [ordersRes, paymentsRes, bookingsRes] = await Promise.all([
        api.get('/orders'),
        api.get('/payments'),
        api.get('/room-bookings')
      ])
      
      console.log('Orders fetched:', ordersRes.data)
      console.log('Sample order:', ordersRes.data[0])
      setOrders(ordersRes.data)
      setPayments(paymentsRes.data)
      setBookings(bookingsRes.data)
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

  const generateReceiptFromHistory = (payment) => {
    const order = orders.find(o => o.id === payment.order_id)
    if (!order) {
      alert('Order details not found')
      return
    }
    
    const receiptWindow = window.open('', '_blank', 'width=400,height=600')
    const receiptDate = new Date(payment.created_at).toLocaleString()
    
    receiptWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Receipt - Order #${order.id}</title>
        <style>
          body {
            font-family: 'Courier New', monospace;
            width: 300px;
            margin: 20px auto;
            padding: 20px;
          }
          .header {
            text-align: center;
            border-bottom: 2px dashed #000;
            padding-bottom: 10px;
            margin-bottom: 15px;
          }
          .header h1 {
            margin: 0;
            font-size: 20px;
          }
          .header p {
            margin: 5px 0;
            font-size: 12px;
          }
          .section {
            margin: 15px 0;
            border-bottom: 1px dashed #000;
            padding-bottom: 10px;
          }
          .row {
            display: flex;
            justify-content: space-between;
            margin: 5px 0;
          }
          .items {
            margin: 10px 0;
          }
          .item {
            display: flex;
            justify-content: space-between;
            margin: 5px 0;
            font-size: 13px;
          }
          .total {
            font-size: 16px;
            font-weight: bold;
            margin-top: 10px;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
          }
          .reprint {
            text-align: center;
            color: #999;
            font-size: 11px;
            margin-top: 10px;
          }
          @media print {
            body {
              margin: 0;
              padding: 10px;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>ቤተ ሳይዳ ሬስቶራንት</h1>
          <h2>Betesida Restaurant & Hotel</h2>
          <p>Thank you for your visit!</p>
        </div>
        
        <div class="section">
          <div class="row">
            <span>Receipt #:</span>
            <span>${payment.id}</span>
          </div>
          <div class="row">
            <span>Order #:</span>
            <span>${order.id}</span>
          </div>
          <div class="row">
            <span>Table:</span>
            <span>${order.table?.table_number || 'N/A'}</span>
          </div>
          <div class="row">
            <span>Date:</span>
            <span>${receiptDate}</span>
          </div>
          <div class="row">
            <span>Cashier:</span>
            <span>${payment.cashier?.name || 'N/A'}</span>
          </div>
        </div>
        
        <div class="section">
          <h3 style="margin: 10px 0;">Items:</h3>
          <div class="items">
            ${(order.order_items || []).map(item => `
              <div class="item">
                <span>${item.quantity}x ${item.menu_item?.name || 'Item'}</span>
                <span>$${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="section">
          <div class="row">
            <span>Subtotal:</span>
            <span>$${parseFloat(order.total_amount).toFixed(2)}</span>
          </div>
          <div class="row total">
            <span>TOTAL:</span>
            <span>$${parseFloat(order.total_amount).toFixed(2)}</span>
          </div>
        </div>
        
        <div class="section">
          <div class="row">
            <span>Payment Method:</span>
            <span>${payment.payment_method.toUpperCase()}</span>
          </div>
          <div class="row">
            <span>Status:</span>
            <span>${payment.status.toUpperCase()}</span>
          </div>
        </div>
        
        <div class="footer">
          <p>Thank you for dining with us!</p>
          <p>Please come again!</p>
          <p style="margin-top: 15px; font-size: 10px;">
            This is an official receipt<br/>
            Keep for your records
          </p>
          <p class="reprint">*** REPRINT ***</p>
        </div>
        
        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `)
    receiptWindow.document.close()
  }

  const generateReceipt = (order, payment) => {
    const receiptWindow = window.open('', '_blank', 'width=400,height=600')
    const receiptDate = new Date().toLocaleString()
    const change = parseFloat(paymentForm.amount_paid) - parseFloat(order.total_amount)
    
    receiptWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Receipt - Order #${order.id}</title>
        <style>
          body {
            font-family: 'Courier New', monospace;
            width: 300px;
            margin: 20px auto;
            padding: 20px;
          }
          .header {
            text-align: center;
            border-bottom: 2px dashed #000;
            padding-bottom: 10px;
            margin-bottom: 15px;
          }
          .header h1 {
            margin: 0;
            font-size: 20px;
          }
          .header p {
            margin: 5px 0;
            font-size: 12px;
          }
          .section {
            margin: 15px 0;
            border-bottom: 1px dashed #000;
            padding-bottom: 10px;
          }
          .row {
            display: flex;
            justify-content: space-between;
            margin: 5px 0;
          }
          .items {
            margin: 10px 0;
          }
          .item {
            display: flex;
            justify-content: space-between;
            margin: 5px 0;
            font-size: 13px;
          }
          .total {
            font-size: 16px;
            font-weight: bold;
            margin-top: 10px;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
          }
          @media print {
            body {
              margin: 0;
              padding: 10px;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>ቤተ ሳይዳ ሬስቶራንት</h1>
          <h2>Betesida Restaurant & Hotel</h2>
          <p>Thank you for your visit!</p>
        </div>
        
        <div class="section">
          <div class="row">
            <span>Receipt #:</span>
            <span>${payment.id}</span>
          </div>
          <div class="row">
            <span>Order #:</span>
            <span>${order.id}</span>
          </div>
          <div class="row">
            <span>Table:</span>
            <span>${order.table?.table_number || 'N/A'}</span>
          </div>
          <div class="row">
            <span>Date:</span>
            <span>${receiptDate}</span>
          </div>
          <div class="row">
            <span>Cashier:</span>
            <span>${user.name}</span>
          </div>
        </div>
        
        <div class="section">
          <h3 style="margin: 10px 0;">Items:</h3>
          <div class="items">
            ${(order.order_items || []).map(item => `
              <div class="item">
                <span>${item.quantity}x ${item.menu_item?.name || 'Item'}</span>
                <span>$${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="section">
          <div class="row">
            <span>Subtotal:</span>
            <span>$${parseFloat(order.total_amount).toFixed(2)}</span>
          </div>
          <div class="row total">
            <span>TOTAL:</span>
            <span>$${parseFloat(order.total_amount).toFixed(2)}</span>
          </div>
        </div>
        
        <div class="section">
          <div class="row">
            <span>Payment Method:</span>
            <span>${paymentForm.payment_method.toUpperCase()}</span>
          </div>
          <div class="row">
            <span>Amount Paid:</span>
            <span>$${parseFloat(paymentForm.amount_paid).toFixed(2)}</span>
          </div>
          ${change > 0 ? `
          <div class="row">
            <span>Change:</span>
            <span>$${change.toFixed(2)}</span>
          </div>
          ` : ''}
          ${paymentForm.transaction_id ? `
          <div class="row">
            <span>Transaction ID:</span>
            <span>${paymentForm.transaction_id}</span>
          </div>
          ` : ''}
        </div>
        
        <div class="footer">
          <p>Thank you for dining with us!</p>
          <p>Please come again!</p>
          <p style="margin-top: 15px; font-size: 10px;">
            This is an official receipt<br/>
            Keep for your records
          </p>
        </div>
        
        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `)
    receiptWindow.document.close()
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

      // Process payment first
      const paymentResponse = await api.post('/payments', paymentData)
      const payment = paymentResponse.data
      
      // If order is pending (prepayment), send to kitchen after payment
      if (selectedOrder.status === 'pending') {
        await api.patch(`/orders/${selectedOrder.id}/status`, { status: 'confirmed' })
        
        // Generate receipt
        generateReceipt(selectedOrder, payment)
        
        alert('✅ Payment received! Receipt generated. Order sent to kitchen.')
      } else {
        // If order is already served, mark as completed
        await api.patch(`/orders/${selectedOrder.id}/status`, { status: 'completed' })
        
        // Generate receipt
        generateReceipt(selectedOrder, payment)
        
        alert('✅ Payment processed successfully! Receipt generated.')
      }
      
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

  const getMonthlyPayments = () => {
    const now = new Date()
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    return payments.filter(p => new Date(p.created_at) >= firstDayOfMonth)
  }

  const getMonthlyRevenue = () => {
    return getMonthlyPayments()
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + parseFloat(p.total || p.amount || 0), 0)
  }

  const handleProcessBookingPayment = async (booking) => {
    if (!confirm(`Process payment for ${booking.guest_name}?\nAmount: $${parseFloat(booking.total_amount).toFixed(2)}`)) return
    
    const paymentMethod = prompt('Payment method (cash/card/mobile):', 'cash')
    if (!paymentMethod || !['cash', 'card', 'mobile'].includes(paymentMethod.toLowerCase())) {
      alert('Invalid payment method')
      return
    }

    try {
      // Update booking status to confirmed (paid)
      await api.put(`/room-bookings/${booking.id}`, { status: 'confirmed' })
      
      // Generate booking receipt
      generateBookingReceipt(booking, paymentMethod.toLowerCase())
      
      alert('✅ Payment processed! Booking confirmed. Receipt generated.')
      fetchData()
    } catch (error) {
      alert('Error processing booking payment: ' + (error.response?.data?.message || 'Unknown error'))
    }
  }

  const generateBookingReceipt = (booking, paymentMethod) => {
    const receiptWindow = window.open('', '_blank', 'width=400,height=600')
    const receiptDate = new Date().toLocaleString()
    const nights = Math.ceil((new Date(booking.check_out_date) - new Date(booking.check_in_date)) / (1000 * 60 * 60 * 24))
    
    receiptWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Booking Receipt - ${booking.guest_name}</title>
        <style>
          body {
            font-family: 'Courier New', monospace;
            width: 300px;
            margin: 20px auto;
            padding: 20px;
          }
          .header {
            text-align: center;
            border-bottom: 2px dashed #000;
            padding-bottom: 10px;
            margin-bottom: 15px;
          }
          .header h1 {
            margin: 0;
            font-size: 20px;
          }
          .header p {
            margin: 5px 0;
            font-size: 12px;
          }
          .section {
            margin: 15px 0;
            border-bottom: 1px dashed #000;
            padding-bottom: 10px;
          }
          .row {
            display: flex;
            justify-content: space-between;
            margin: 5px 0;
          }
          .total {
            font-size: 16px;
            font-weight: bold;
            margin-top: 10px;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
          }
          @media print {
            body {
              margin: 0;
              padding: 10px;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>ቤተ ሳይዳ ሬስቶራንት</h1>
          <h2>Betesida Restaurant & Hotel</h2>
          <p>Room Booking Receipt</p>
        </div>
        
        <div class="section">
          <div class="row">
            <span>Booking ID:</span>
            <span>#${booking.id}</span>
          </div>
          <div class="row">
            <span>Guest Name:</span>
            <span>${booking.guest_name}</span>
          </div>
          <div class="row">
            <span>Phone:</span>
            <span>${booking.guest_phone}</span>
          </div>
          <div class="row">
            <span>Date:</span>
            <span>${receiptDate}</span>
          </div>
          <div class="row">
            <span>Cashier:</span>
            <span>${user.name}</span>
          </div>
        </div>
        
        <div class="section">
          <h3 style="margin: 10px 0;">Booking Details:</h3>
          <div class="row">
            <span>Room Number:</span>
            <span>${booking.room?.room_number || 'N/A'}</span>
          </div>
          <div class="row">
            <span>Room Type:</span>
            <span style="text-transform: capitalize">${booking.room?.room_type || 'N/A'}</span>
          </div>
          <div class="row">
            <span>Check-in:</span>
            <span>${new Date(booking.check_in_date).toLocaleDateString()}</span>
          </div>
          <div class="row">
            <span>Check-out:</span>
            <span>${new Date(booking.check_out_date).toLocaleDateString()}</span>
          </div>
          <div class="row">
            <span>Number of Nights:</span>
            <span>${nights}</span>
          </div>
          <div class="row">
            <span>Price per Night:</span>
            <span>$${parseFloat(booking.room?.price_per_night || 0).toFixed(2)}</span>
          </div>
        </div>
        
        <div class="section">
          <div class="row total">
            <span>TOTAL AMOUNT:</span>
            <span>$${parseFloat(booking.total_amount).toFixed(2)}</span>
          </div>
          <div class="row">
            <span>Payment Method:</span>
            <span style="text-transform: uppercase">${paymentMethod}</span>
          </div>
          <div class="row">
            <span>Status:</span>
            <span style="text-transform: uppercase">PAID</span>
          </div>
        </div>
        
        ${booking.notes ? `
        <div class="section">
          <div class="row">
            <span>Notes:</span>
          </div>
          <p style="margin: 5px 0; font-size: 12px;">${booking.notes}</p>
        </div>
        ` : ''}
        
        <div class="footer">
          <p>Thank you for choosing us!</p>
          <p>Enjoy your stay!</p>
          <p style="margin-top: 15px; font-size: 10px;">
            This is an official booking receipt<br/>
            Keep for your records<br/>
            Present at check-in
          </p>
        </div>
        
        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `)
    receiptWindow.document.close()
  }

  const generateDailyReport = () => {
    const todayPayments = getTodayPayments()
    const todayRevenue = getTodayRevenue()
    const todayBookings = bookings.filter(b => new Date(b.created_at).toDateString() === new Date().toDateString())
    const todayBookingRevenue = todayBookings
      .filter(b => b.status === 'confirmed' || b.status === 'checked_in')
      .reduce((sum, b) => sum + parseFloat(b.total_amount || 0), 0)
    const totalRevenue = todayRevenue + todayBookingRevenue
    const today = new Date().toLocaleDateString()
    
    const reportWindow = window.open('', '_blank', 'width=800,height=600')
    
    reportWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Daily Report - ${today}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 20px;
          }
          .header {
            text-align: center;
            border-bottom: 3px solid #333;
            padding-bottom: 15px;
            margin-bottom: 20px;
          }
          .header h1 {
            margin: 0;
            color: #333;
          }
          .section {
            margin: 20px 0;
          }
          .section h2 {
            background-color: #4caf50;
            color: white;
            padding: 10px;
            margin: 15px 0 10px 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 10px 0;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
            font-weight: bold;
          }
          .summary {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
          }
          .summary-item {
            display: flex;
            justify-content: space-between;
            margin: 8px 0;
            font-size: 16px;
          }
          .total {
            font-size: 20px;
            font-weight: bold;
            color: #4caf50;
            border-top: 2px solid #333;
            padding-top: 10px;
            margin-top: 10px;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 15px;
            border-top: 2px solid #333;
            color: #666;
          }
          @media print {
            body {
              margin: 0;
              padding: 15px;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>ቤተ ሳይዳ ሬስቶራንት - Betesida Restaurant & Hotel</h1>
          <h2>Daily Sales Report</h2>
          <p><strong>Date:</strong> ${today}</p>
          <p><strong>Prepared by:</strong> ${user.name} (Cashier)</p>
          <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
        </div>
        
        <div class="section">
          <h2>📊 Summary</h2>
          <div class="summary">
            <div class="summary-item">
              <span>Food Orders:</span>
              <strong>${todayPayments.length} transactions - $${todayRevenue.toFixed(2)}</strong>
            </div>
            <div class="summary-item">
              <span>Room Bookings:</span>
              <strong>${todayBookings.length} bookings - $${todayBookingRevenue.toFixed(2)}</strong>
            </div>
            <div class="summary-item total">
              <span>Total Revenue:</span>
              <strong>$${totalRevenue.toFixed(2)}</strong>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>🍽️ Food Orders</h2>
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Payment ID</th>
                <th>Order ID</th>
                <th>Method</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${todayPayments.map(payment => `
                <tr>
                  <td>${new Date(payment.created_at).toLocaleTimeString()}</td>
                  <td>#${payment.id}</td>
                  <td>#${payment.order_id}</td>
                  <td style="text-transform: capitalize">${payment.payment_method}</td>
                  <td>$${parseFloat(payment.total || payment.amount || 0).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="section">
          <h2>🏨 Room Bookings</h2>
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Booking ID</th>
                <th>Guest Name</th>
                <th>Room</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${todayBookings.map(booking => `
                <tr>
                  <td>${new Date(booking.created_at).toLocaleTimeString()}</td>
                  <td>#${booking.id}</td>
                  <td>${booking.guest_name}</td>
                  <td>${booking.room?.room_number || 'N/A'}</td>
                  <td>$${parseFloat(booking.total_amount).toFixed(2)}</td>
                  <td style="text-transform: capitalize">${booking.status}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="footer">
          <p><strong>ቤተ ሳይዳ ሬስቶራንት - Betesida Restaurant & Hotel</strong></p>
          <p>This is an official daily report</p>
          <p>For Manager Review</p>
        </div>
        
        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `)
    reportWindow.document.close()
  }

  const generateMonthlyReport = () => {
    const monthlyPayments = getMonthlyPayments()
    const monthlyRevenue = getMonthlyRevenue()
    const now = new Date()
    const monthName = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    
    const reportWindow = window.open('', '_blank', 'width=800,height=600')
    
    reportWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Monthly Report - ${monthName}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 20px;
          }
          .header {
            text-align: center;
            border-bottom: 3px solid #333;
            padding-bottom: 15px;
            margin-bottom: 20px;
          }
          .header h1 {
            margin: 0;
            color: #333;
          }
          .section {
            margin: 20px 0;
          }
          .section h2 {
            background-color: #2196F3;
            color: white;
            padding: 10px;
            margin: 15px 0 10px 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 10px 0;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
            font-weight: bold;
          }
          .summary {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
          }
          .summary-item {
            display: flex;
            justify-content: space-between;
            margin: 8px 0;
            font-size: 16px;
          }
          .total {
            font-size: 20px;
            font-weight: bold;
            color: #2196F3;
            border-top: 2px solid #333;
            padding-top: 10px;
            margin-top: 10px;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 15px;
            border-top: 2px solid #333;
            color: #666;
          }
          @media print {
            body {
              margin: 0;
              padding: 15px;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>ቤተ ሳይዳ ሬስቶራንት - Betesida Restaurant & Hotel</h1>
          <h2>Monthly Sales Report</h2>
          <p><strong>Period:</strong> ${monthName}</p>
          <p><strong>Prepared by:</strong> ${user.name} (Cashier)</p>
          <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
        </div>
        
        <div class="section">
          <h2>📊 Monthly Summary</h2>
          <div class="summary">
            <div class="summary-item">
              <span>Total Transactions:</span>
              <strong>${monthlyPayments.length}</strong>
            </div>
            <div class="summary-item">
              <span>Completed Payments:</span>
              <strong>${monthlyPayments.filter(p => p.status === 'completed').length}</strong>
            </div>
            <div class="summary-item">
              <span>Average Transaction:</span>
              <strong>$${monthlyPayments.length > 0 ? (monthlyRevenue / monthlyPayments.length).toFixed(2) : '0.00'}</strong>
            </div>
            <div class="summary-item total">
              <span>Total Revenue:</span>
              <strong>$${monthlyRevenue.toFixed(2)}</strong>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>💳 Payment Methods Breakdown</h2>
          <table>
            <thead>
              <tr>
                <th>Payment Method</th>
                <th>Transactions</th>
                <th>Amount</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              ${['cash', 'card', 'mobile'].map(method => {
                const methodPayments = monthlyPayments.filter(p => p.payment_method === method)
                const amount = methodPayments.reduce((sum, p) => sum + parseFloat(p.total || p.amount || 0), 0)
                const percentage = monthlyRevenue > 0 ? ((amount / monthlyRevenue) * 100).toFixed(1) : 0
                return `
                  <tr>
                    <td style="text-transform: capitalize">${method}</td>
                    <td>${methodPayments.length}</td>
                    <td>$${amount.toFixed(2)}</td>
                    <td>${percentage}%</td>
                  </tr>
                `
              }).join('')}
            </tbody>
          </table>
        </div>

        <div class="section">
          <h2>📈 Daily Breakdown</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Transactions</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              ${(() => {
                const dailyData = {}
                monthlyPayments.forEach(p => {
                  const date = new Date(p.created_at).toLocaleDateString()
                  if (!dailyData[date]) {
                    dailyData[date] = { count: 0, revenue: 0 }
                  }
                  dailyData[date].count++
                  dailyData[date].revenue += parseFloat(p.total || p.amount || 0)
                })
                return Object.entries(dailyData)
                  .sort((a, b) => new Date(b[0]) - new Date(a[0]))
                  .map(([date, data]) => `
                    <tr>
                      <td>${date}</td>
                      <td>${data.count}</td>
                      <td>$${data.revenue.toFixed(2)}</td>
                    </tr>
                  `).join('')
              })()}
            </tbody>
          </table>
        </div>

        <div class="footer">
          <p><strong>ቤተ ሳይዳ ሬስቶራንት - Betesida Restaurant & Hotel</strong></p>
          <p>This is an official monthly report</p>
          <p>For Manager Review</p>
        </div>
        
        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `)
    reportWindow.document.close()
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
        <button className={activeTab === 'pending' ? 'active' : ''} onClick={() => setActiveTab('pending')}>Pending Orders</button>
        <button className={activeTab === 'bookings' ? 'active' : ''} onClick={() => setActiveTab('bookings')}>Room Bookings</button>
        <button className={activeTab === 'payments' ? 'active' : ''} onClick={() => setActiveTab('payments')}>Pending Payments</button>
        <button className={activeTab === 'history' ? 'active' : ''} onClick={() => setActiveTab('history')}>Payment History</button>
        <button className={activeTab === 'reports' ? 'active' : ''} onClick={() => setActiveTab('reports')}>Reports</button>
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Pending Orders</h3>
              <p className="stat-number">{orders.filter(o => o.status === 'pending').length}</p>
            </div>
            <div className="stat-card">
              <h3>Pending Bookings</h3>
              <p className="stat-number">{bookings.filter(b => b.status === 'pending').length}</p>
              <p style={{ fontSize: '0.8em', color: '#666' }}>Awaiting payment</p>
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
          <h2>Pending Orders (Payment Required First)</h2>
          
          {orders.filter(o => o.status === 'pending').length === 0 ? (
            <p className="empty-message">No pending orders</p>
          ) : (
            <div className="orders-grid">
              {orders.filter(o => o.status === 'pending').map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <h3>Order #{order.id}</h3>
                    <span className={`status-badge ${order.status}`}>{order.status}</span>
                  </div>
                  
                  <div className="order-details">
                    <p><strong>Table:</strong> {order.table?.table_number}</p>
                    <p><strong>Time:</strong> {new Date(order.created_at).toLocaleTimeString()}</p>
                    <p><strong>Notes:</strong> {order.notes || 'None'}</p>
                  </div>
                  
                  <div className="order-items-list">
                    <h4>Items:</h4>
                    {(order.order_items || []).map(item => (
                      <div key={item.id} className="order-item">
                        <span>{item.quantity}x {item.menu_item?.name || 'Unknown Item'}</span>
                        <span>${parseFloat(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="order-total">
                    <strong>Total Amount:</strong>
                    <strong className="amount">${parseFloat(order.total_amount).toFixed(2)}</strong>
                  </div>
                  
                  <div style={{ backgroundColor: '#fff3cd', padding: '10px', borderRadius: '5px', marginBottom: '10px', border: '1px solid #ffc107' }}>
                    <strong>⚠️ Payment Required First</strong>
                    <p style={{ margin: '5px 0 0 0', fontSize: '0.9em' }}>Customer must pay before order goes to kitchen</p>
                  </div>
                  
                  <button 
                    onClick={() => handleProcessPayment(order)} 
                    className="action-btn primary"
                    style={{ backgroundColor: '#28a745' }}
                  >
                    💳 Collect Payment First
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'bookings' && (
        <div className="management-section">
          <h2>🏨 Room Bookings</h2>
          
          <div style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
            <div style={{ backgroundColor: '#fff3cd', padding: '10px', borderRadius: '5px', flex: 1 }}>
              <strong>Pending:</strong> {bookings.filter(b => b.status === 'pending').length}
            </div>
            <div style={{ backgroundColor: '#d4edda', padding: '10px', borderRadius: '5px', flex: 1 }}>
              <strong>Confirmed:</strong> {bookings.filter(b => b.status === 'confirmed').length}
            </div>
            <div style={{ backgroundColor: '#d1ecf1', padding: '10px', borderRadius: '5px', flex: 1 }}>
              <strong>Checked In:</strong> {bookings.filter(b => b.status === 'checked_in').length}
            </div>
          </div>

          <h3>Pending Bookings (Awaiting Payment)</h3>
          {bookings.filter(b => b.status === 'pending').length === 0 ? (
            <p className="empty-message">No pending bookings</p>
          ) : (
            <div className="orders-grid">
              {bookings.filter(b => b.status === 'pending').map(booking => (
                <div key={booking.id} className="order-card" style={{ borderLeft: '4px solid #ff9800' }}>
                  <div className="order-header">
                    <h3>Booking #{booking.id}</h3>
                    <span className={`status-badge ${booking.status}`}>{booking.status}</span>
                  </div>
                  
                  <div className="order-details">
                    <p><strong>Guest:</strong> {booking.guest_name}</p>
                    <p><strong>Phone:</strong> {booking.guest_phone}</p>
                    <p><strong>Room:</strong> {booking.room?.room_number} ({booking.room?.room_type})</p>
                    <p><strong>Check-in:</strong> {new Date(booking.check_in_date).toLocaleDateString()}</p>
                    <p><strong>Check-out:</strong> {new Date(booking.check_out_date).toLocaleDateString()}</p>
                    <p><strong>Nights:</strong> {Math.ceil((new Date(booking.check_out_date) - new Date(booking.check_in_date)) / (1000 * 60 * 60 * 24))}</p>
                    {booking.notes && <p><strong>Notes:</strong> {booking.notes}</p>}
                  </div>
                  
                  <div className="order-total">
                    <strong>Total Amount:</strong>
                    <strong className="amount">${parseFloat(booking.total_amount).toFixed(2)}</strong>
                  </div>
                  
                  <div style={{ backgroundColor: '#fff3cd', padding: '10px', borderRadius: '5px', marginBottom: '10px', border: '1px solid #ffc107' }}>
                    <strong>⚠️ Payment Required</strong>
                    <p style={{ margin: '5px 0 0 0', fontSize: '0.9em' }}>Process payment to confirm booking</p>
                  </div>
                  
                  <button 
                    onClick={() => handleProcessBookingPayment(booking)} 
                    className="action-btn primary"
                    style={{ backgroundColor: '#ff9800' }}
                  >
                    💳 Process Payment & Confirm
                  </button>
                </div>
              ))}
            </div>
          )}

          <h3 style={{ marginTop: '30px' }}>All Bookings</h3>
          <table className="data-table" style={{ color: '#000' }}>
            <thead>
              <tr>
                <th style={{ color: '#000' }}>ID</th>
                <th style={{ color: '#000' }}>Guest Name</th>
                <th style={{ color: '#000' }}>Room</th>
                <th style={{ color: '#000' }}>Check-in</th>
                <th style={{ color: '#000' }}>Check-out</th>
                <th style={{ color: '#000' }}>Amount</th>
                <th style={{ color: '#000' }}>Status</th>
                <th style={{ color: '#000' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking.id}>
                  <td style={{ color: '#000' }}>#{booking.id}</td>
                  <td style={{ color: '#000' }}>{booking.guest_name}</td>
                  <td style={{ color: '#000' }}>{booking.room?.room_number}</td>
                  <td style={{ color: '#000' }}>{new Date(booking.check_in_date).toLocaleDateString()}</td>
                  <td style={{ color: '#000' }}>{new Date(booking.check_out_date).toLocaleDateString()}</td>
                  <td style={{ color: '#000' }}>${parseFloat(booking.total_amount).toFixed(2)}</td>
                  <td><span className={`status-badge ${booking.status}`}>{booking.status}</span></td>
                  <td>
                    {booking.status === 'pending' && (
                      <button 
                        onClick={() => handleProcessBookingPayment(booking)}
                        className="action-btn secondary"
                        style={{ fontSize: '0.85em' }}
                      >
                        💳 Pay
                      </button>
                    )}
                    {booking.status === 'confirmed' && (
                      <button 
                        onClick={() => generateBookingReceipt(booking, 'cash')}
                        className="action-btn secondary"
                        style={{ fontSize: '0.85em' }}
                      >
                        🖨️ Receipt
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'payments' && (
        <div className="management-section">
          <h2>Post-Meal Payments (Already Served)</h2>
          <p style={{ color: '#666', fontSize: '0.9em', marginBottom: '15px' }}>
            These orders were already paid and served. This section is for any additional payments or adjustments.
          </p>
          
          {orders.filter(o => ['served'].includes(o.status) && !o.payment).length === 0 ? (
            <p className="empty-message">No post-meal payments pending</p>
          ) : (
            <div className="orders-grid">
              {orders.filter(o => ['served'].includes(o.status) && !o.payment).map(order => (
                <div key={order.id} className="order-card payment-card">
                  <div className="order-header">
                    <h3>Order #{order.id}</h3>
                    <span className={`status-badge ${order.status}`}>{order.status}</span>
                  </div>
                  
                  <div className="order-details">
                    <p><strong>Table:</strong> {order.table?.table_number}</p>
                    <p><strong>Time:</strong> {new Date(order.created_at).toLocaleTimeString()}</p>
                  </div>
                  
                  <div className="order-items-list">
                    <h4>Items:</h4>
                    {(order.order_items || []).map(item => (
                      <div key={item.id} className="order-item">
                        <span>{item.quantity}x {item.menu_item?.name || 'Unknown Item'}</span>
                        <span>${parseFloat(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
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
          
          <table className="data-table" style={{ color: '#000' }}>
            <thead>
              <tr>
                <th style={{ color: '#000' }}>Payment ID</th>
                <th style={{ color: '#000' }}>Order ID</th>
                <th style={{ color: '#000' }}>Method</th>
                <th style={{ color: '#000' }}>Amount</th>
                <th style={{ color: '#000' }}>Status</th>
                <th style={{ color: '#000' }}>Time</th>
                <th style={{ color: '#000' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getTodayPayments().map(payment => (
                <tr key={payment.id}>
                  <td style={{ color: '#000' }}>#{payment.id}</td>
                  <td style={{ color: '#000' }}>#{payment.order_id}</td>
                  <td><span className="payment-method">{payment.payment_method}</span></td>
                  <td style={{ color: '#000' }}>${parseFloat(payment.total || payment.amount).toFixed(2)}</td>
                  <td><span className={`status-badge ${payment.status}`}>{payment.status}</span></td>
                  <td style={{ color: '#000' }}>{new Date(payment.created_at).toLocaleTimeString()}</td>
                  <td>
                    <button 
                      onClick={() => generateReceiptFromHistory(payment)} 
                      className="action-btn secondary"
                      style={{ marginRight: '5px', fontSize: '0.85em' }}
                    >
                      🖨️ Receipt
                    </button>
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

      {activeTab === 'reports' && (
        <div className="management-section">
          <h2>📊 Reports for Manager</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
            <div style={{ backgroundColor: '#f0f8ff', padding: '20px', borderRadius: '10px', border: '2px solid #4caf50' }}>
              <h3 style={{ color: '#4caf50', marginTop: 0 }}>📅 Daily Report</h3>
              <p style={{ color: '#666', marginBottom: '15px' }}>Generate today's sales report with all transactions and revenue breakdown</p>
              
              <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Today's Transactions:</span>
                  <strong>{getTodayPayments().length}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Today's Revenue:</span>
                  <strong style={{ color: '#4caf50' }}>${getTodayRevenue().toFixed(2)}</strong>
                </div>
              </div>
              
              <button 
                onClick={generateDailyReport}
                className="action-btn primary"
                style={{ width: '100%', backgroundColor: '#4caf50', padding: '12px' }}
              >
                🖨️ Generate & Print Daily Report
              </button>
            </div>

            <div style={{ backgroundColor: '#f0f8ff', padding: '20px', borderRadius: '10px', border: '2px solid #2196F3' }}>
              <h3 style={{ color: '#2196F3', marginTop: 0 }}>📆 Monthly Report</h3>
              <p style={{ color: '#666', marginBottom: '15px' }}>Generate this month's comprehensive sales report with daily breakdown</p>
              
              <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Month's Transactions:</span>
                  <strong>{getMonthlyPayments().length}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Month's Revenue:</span>
                  <strong style={{ color: '#2196F3' }}>${getMonthlyRevenue().toFixed(2)}</strong>
                </div>
              </div>
              
              <button 
                onClick={generateMonthlyReport}
                className="action-btn primary"
                style={{ width: '100%', backgroundColor: '#2196F3', padding: '12px' }}
              >
                🖨️ Generate & Print Monthly Report
              </button>
            </div>
          </div>

          <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderRadius: '5px', border: '1px solid #ffc107', marginTop: '20px' }}>
            <h4 style={{ marginTop: 0 }}>📋 Report Instructions:</h4>
            <ul style={{ marginBottom: 0 }}>
              <li>Click the button to generate and print the report</li>
              <li>The report will open in a new window with print dialog</li>
              <li>You can save as PDF or print to physical printer</li>
              <li>Reports include all transaction details and revenue breakdown</li>
              <li>Daily reports show today's data, Monthly reports show current month</li>
              <li>Reports are formatted for manager review</li>
            </ul>
          </div>
        </div>
      )}

      {showPaymentForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Process Payment - Order #{selectedOrder?.id}</h3>
            
            {selectedOrder?.status === 'pending' && (
              <div style={{ backgroundColor: '#d4edda', padding: '10px', borderRadius: '5px', marginBottom: '15px', border: '1px solid #28a745' }}>
                <strong>💰 Prepayment Required</strong>
                <p style={{ margin: '5px 0 0 0', fontSize: '0.9em' }}>After payment, order will be sent to kitchen</p>
              </div>
            )}
            
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
                  {selectedOrder?.status === 'pending' ? '💳 Collect Payment & Send to Kitchen' : '💳 Complete Payment'}
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
