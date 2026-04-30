import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import api from '../services/api'
import './Rooms.css'

function Rooms() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [bookingForm, setBookingForm] = useState({
    guest_name: '',
    guest_phone: '',
    check_in_date: '',
    check_out_date: '',
    notes: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const { t } = useLanguage()
  const navigate = useNavigate()

  useEffect(() => {
    fetchRooms()
  }, [])

  const fetchRooms = async () => {
    try {
      const response = await api.get('/rooms')
      setRooms(response.data)
    } catch (error) {
      console.error('Error fetching rooms:', error)
      alert('Failed to load rooms. Please make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleBookRoom = (room) => {
    if (room.status !== 'available') {
      alert('This room is not available')
      return
    }
    setSelectedRoom(room)
    setShowBookingForm(true)
  }

  const handleSubmitBooking = async (e) => {
    e.preventDefault()
    
    if (!bookingForm.guest_name || !bookingForm.guest_phone || !bookingForm.check_in_date || !bookingForm.check_out_date) {
      alert('Please fill in all required fields')
      return
    }

    // Calculate total amount
    const checkIn = new Date(bookingForm.check_in_date)
    const checkOut = new Date(bookingForm.check_out_date)
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))
    
    if (nights <= 0) {
      alert('Check-out date must be after check-in date')
      return
    }

    const totalAmount = selectedRoom.price_per_night * nights

    try {
      const bookingData = {
        room_id: selectedRoom.id,
        guest_name: bookingForm.guest_name,
        guest_phone: bookingForm.guest_phone,
        check_in_date: bookingForm.check_in_date,
        check_out_date: bookingForm.check_out_date,
        notes: bookingForm.notes
      }

      const response = await api.post('/room-bookings', bookingData)
      
      console.log('Booking successful:', response.data)

      setShowSuccess(true)
      setShowBookingForm(false)
      setBookingForm({
        guest_name: '',
        guest_phone: '',
        check_in_date: '',
        check_out_date: '',
        notes: ''
      })
      
      // Refresh rooms to update availability
      fetchRooms()
      
      setTimeout(() => setShowSuccess(false), 5000)
    } catch (error) {
      console.error('Booking error:', error)
      const errorMessage = error.response?.data?.message || error.response?.data?.errors || error.message
      alert('Error booking room: ' + (typeof errorMessage === 'object' ? JSON.stringify(errorMessage) : errorMessage))
    }
  }

  const calculateNights = () => {
    if (bookingForm.check_in_date && bookingForm.check_out_date) {
      const checkIn = new Date(bookingForm.check_in_date)
      const checkOut = new Date(bookingForm.check_out_date)
      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))
      return nights > 0 ? nights : 0
    }
    return 0
  }

  const calculateTotal = () => {
    const nights = calculateNights()
    return nights * (selectedRoom?.price_per_night || 0)
  }

  const getRoomIcon = (type) => {
    switch(type) {
      case 'single': return '🛏️'
      case 'double': return '🛏️🛏️'
      case 'suite': return '🏨'
      default: return '🛏️'
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'available': return 'status-available'
      case 'occupied': return 'status-occupied'
      case 'reserved': return 'status-reserved'
      case 'maintenance': return 'status-maintenance'
      default: return ''
    }
  }

  if (loading) return <div className="loading">Loading rooms...</div>

  return (
    <div className="rooms-page-container">
      <div className="rooms-header">
        <button onClick={() => navigate('/')} className="back-button">
          ← Back to Home
        </button>
        <h1>🛏️ Our Bedrooms</h1>
        <p className="subtitle">Choose your perfect room</p>
      </div>

      {showSuccess && (
        <div className="success-message">
          ✅ Room booked successfully! We'll contact you soon to confirm.
        </div>
      )}

      <div className="rooms-grid">
        {rooms.map(room => (
          <div key={room.id} className={`room-card ${room.status !== 'available' ? 'unavailable' : ''}`}>
            <div className={`room-status-badge ${getStatusColor(room.status)}`}>
              {room.status}
            </div>
            
            <div className="room-icon-large">
              {getRoomIcon(room.room_type)}
            </div>
            
            <h2>{room.room_number}</h2>
            <h3 className="room-type">{room.room_type.toUpperCase()}</h3>
            
            <p className="room-description">{room.description}</p>
            
            <div className="room-details">
              <div className="detail-item">
                <span className="detail-icon">👥</span>
                <span>{room.capacity} {room.capacity === 1 ? 'Person' : 'People'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">💰</span>
                <span>{room.price_per_night} Birr/night</span>
              </div>
            </div>

            <div className="room-features">
              <span>✓ Private Bathroom</span>
              <span>✓ Free WiFi</span>
              <span>✓ Clean Towels</span>
              {room.room_type === 'suite' && <span>✓ Living Area</span>}
            </div>

            <button 
              onClick={() => handleBookRoom(room)}
              className={`book-button ${room.status !== 'available' ? 'disabled' : ''}`}
              disabled={room.status !== 'available'}
            >
              {room.status === 'available' ? '📅 Book Now' : `Not Available (${room.status})`}
            </button>
          </div>
        ))}
      </div>

      {showBookingForm && selectedRoom && (
        <div className="booking-modal">
          <div className="booking-modal-content">
            <div className="booking-header">
              <h2>Book {selectedRoom.room_number}</h2>
              <button onClick={() => setShowBookingForm(false)} className="close-btn">✕</button>
            </div>

            <div className="room-summary">
              <p><strong>Room Type:</strong> {selectedRoom.room_type}</p>
              <p><strong>Capacity:</strong> {selectedRoom.capacity} {selectedRoom.capacity === 1 ? 'Person' : 'People'}</p>
              <p><strong>Price:</strong> {selectedRoom.price_per_night} Birr/night</p>
            </div>

            <form onSubmit={handleSubmitBooking}>
              <div className="form-group">
                <label>Guest Name *</label>
                <input 
                  type="text"
                  value={bookingForm.guest_name}
                  onChange={(e) => setBookingForm({...bookingForm, guest_name: e.target.value})}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input 
                  type="tel"
                  value={bookingForm.guest_phone}
                  onChange={(e) => setBookingForm({...bookingForm, guest_phone: e.target.value})}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Check-in Date *</label>
                  <input 
                    type="date"
                    value={bookingForm.check_in_date}
                    onChange={(e) => setBookingForm({...bookingForm, check_in_date: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Check-out Date *</label>
                  <input 
                    type="date"
                    value={bookingForm.check_out_date}
                    onChange={(e) => setBookingForm({...bookingForm, check_out_date: e.target.value})}
                    min={bookingForm.check_in_date || new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Special Requests (Optional)</label>
                <textarea 
                  value={bookingForm.notes}
                  onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
                  placeholder="Any special requests or requirements..."
                  rows="3"
                />
              </div>

              {calculateNights() > 0 && (
                <div className="booking-summary">
                  <div className="summary-row">
                    <span>Number of Nights:</span>
                    <strong>{calculateNights()}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Price per Night:</span>
                    <strong>{selectedRoom.price_per_night} Birr</strong>
                  </div>
                  <div className="summary-row total">
                    <span>Total Amount:</span>
                    <strong>{calculateTotal()} Birr</strong>
                  </div>
                </div>
              )}

              <div className="modal-actions">
                <button type="submit" className="submit-btn">
                  Confirm Booking
                </button>
                <button type="button" onClick={() => setShowBookingForm(false)} className="cancel-btn">
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

export default Rooms
