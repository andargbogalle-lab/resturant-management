# 🛏️ How to Book Rooms - User Guide

## For Guests (No Login Required)

### Step 1: Access the Rooms Page
You have two ways to access the room booking page:

**Option A: From Home Page**
1. Open your browser and go to: `http://localhost:3000`
2. Scroll down to the "Comfortable Bedrooms" section
3. Click the **"Book Now"** button

**Option B: Direct Link**
1. Go directly to: `http://localhost:3000/rooms`

---

### Step 2: Browse Available Rooms

You will see all 10 rooms displayed with:
- **Room Number** (R01 to R10)
- **Room Type** (Single, Double, or Suite)
- **Price per Night** (in Ethiopian Birr)
- **Capacity** (number of people)
- **Status Badge**:
  - 🟢 **Available** - You can book this room
  - 🔴 **Occupied** - Currently in use
  - 🟡 **Reserved** - Already booked
  - 🔧 **Maintenance** - Under maintenance

**Room Types & Prices:**
- **Single Room** (R01-R03): 500 Birr/night - 1 person
- **Double Room** (R04-R07): 800 Birr/night - 2 people
- **Suite** (R08-R10): 1500 Birr/night - 4 people

---

### Step 3: Select a Room

1. Find a room with **"Available"** status (green badge)
2. Click the **"📅 Book Now"** button on that room card
3. A booking form will appear

**Note:** You can only book rooms that show "Available" status. Occupied or reserved rooms cannot be booked.

---

### Step 4: Fill in Booking Details

The booking form will ask for:

#### Required Information:
1. **Guest Name** - Your full name
2. **Phone Number** - Your contact number (e.g., 0911234567)
3. **Check-in Date** - When you want to arrive
   - Must be today or a future date
4. **Check-out Date** - When you want to leave
   - Must be after check-in date

#### Optional Information:
5. **Special Requests** - Any special needs or requests
   - Example: "Need extra pillows" or "Late check-in"

---

### Step 5: Review Your Booking

The form will automatically calculate:
- **Number of Nights** - Days between check-in and check-out
- **Price per Night** - Room's nightly rate
- **Total Amount** - Total cost (Price × Nights)

**Example:**
```
Room: R05 (Double Room)
Check-in: May 1, 2026
Check-out: May 3, 2026
Nights: 2
Price: 800 Birr/night
Total: 1,600 Birr
```

---

### Step 6: Confirm Booking

1. Review all information carefully
2. Click **"Confirm Booking"** button
3. Wait for confirmation message

**Success!** You will see:
- ✅ Green success message: "Room booked successfully! We'll contact you soon to confirm."
- The booking form will close
- The room list will refresh to show updated availability

---

### Step 7: What Happens Next

After booking:
1. Your booking is saved in the system
2. The room status changes to "Reserved"
3. Staff will contact you at the phone number you provided
4. You can arrive on your check-in date

---

## For Staff (Cashier/Manager)

### Managing Bookings

**Login Required:**
- Username: `cashier`
- Password: `1234`

### View All Bookings
- Access: `GET /api/room-bookings`
- See all guest bookings with details

### Update Booking Status

**When guest arrives (Check-in):**
```
PUT /api/room-bookings/{id}
Body: { "status": "checked_in" }
```
- Room status changes to "Occupied"

**When guest leaves (Check-out):**
```
PUT /api/room-bookings/{id}
Body: { "status": "checked_out" }
```
- Room status changes to "Available"

**Cancel a booking:**
```
POST /api/room-bookings/{id}/cancel
```
- Room status changes to "Available"

---

## Troubleshooting

### Problem: "Room is not available" message
**Solution:** The room is already booked for those dates. Try:
- Different dates
- Different room

### Problem: "Check-out date must be after check-in date"
**Solution:** Make sure:
- Check-out date is at least 1 day after check-in
- Dates are entered correctly

### Problem: "Please fill in all required fields"
**Solution:** Make sure you filled in:
- Guest name
- Phone number
- Check-in date
- Check-out date

### Problem: "Failed to load rooms"
**Solution:** 
- Make sure backend is running: `http://127.0.0.1:8000`
- Check if MySQL is running in XAMPP
- Refresh the page

---

## API Endpoints Reference

### Public Endpoints (No Authentication)

**Get All Rooms:**
```
GET http://127.0.0.1:8000/api/rooms
```

**Get Room Details:**
```
GET http://127.0.0.1:8000/api/rooms/{id}
```

**Create Booking:**
```
POST http://127.0.0.1:8000/api/room-bookings
Body: {
  "room_id": 5,
  "guest_name": "John Doe",
  "guest_phone": "0911234567",
  "check_in_date": "2026-05-01",
  "check_out_date": "2026-05-03",
  "notes": "Late check-in please"
}
```

**Get All Bookings:**
```
GET http://127.0.0.1:8000/api/room-bookings
```

**Get Booking Details:**
```
GET http://127.0.0.1:8000/api/room-bookings/{id}
```

### Protected Endpoints (Cashier/Manager Only)

**Update Booking:**
```
PUT http://127.0.0.1:8000/api/room-bookings/{id}
Headers: Authorization: Bearer {token}
Body: { "status": "checked_in" }
```

**Cancel Booking:**
```
POST http://127.0.0.1:8000/api/room-bookings/{id}/cancel
Headers: Authorization: Bearer {token}
```

**Delete Booking:**
```
DELETE http://127.0.0.1:8000/api/room-bookings/{id}
Headers: Authorization: Bearer {token}
```

---

## Tips for Guests

1. **Book Early** - Popular rooms fill up quickly
2. **Check Dates** - Double-check your check-in and check-out dates
3. **Provide Accurate Phone** - Staff will call to confirm
4. **Special Requests** - Mention any special needs in the notes
5. **Arrive on Time** - Arrive on your check-in date

---

## Contact Information

**Betesida Restaurant & Hotel**
- 📍 Location: Addis Ababa, Ethiopia
- 📞 Phone: +251 11 XXX XXXX
- ⏰ Hours: Open Daily 7:00 AM - 11:00 PM

---

## System Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection
- JavaScript enabled

---

**Enjoy your stay at Betesida Hotel! 🏨**
