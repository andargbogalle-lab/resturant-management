# 🏨 Complete System Workflow - Betesida Restaurant & Hotel

## Overview
This document describes the complete workflow for both restaurant orders and room bookings, from customer actions to staff processing.

---

# 🍽️ RESTAURANT ORDER WORKFLOW

## Step 1: Customer Places Food Order (No Login Required)

### Customer Actions:
1. **Browse Menu**
   - Go to `http://localhost:3000/menu`
   - View all 23 Ethiopian dishes organized by category
   - See prices, descriptions, and photos

2. **Add Items to Cart**
   - Click "Add to Cart" on desired dishes
   - Adjust quantity if needed
   - View cart total

3. **Select Table**
   - Choose table number (T01 to T10)
   - Enter guest name (optional)
   - Add special instructions (optional)

4. **Place Order**
   - Click "Place Order" button
   - Order is sent to system
   - Customer receives order confirmation
   - **Order Status: "pending"**

---

## Step 2: Cashier Receives and Accepts Order

### Cashier Dashboard:
1. **Login**
   - Username: `cashier`
   - Password: `1234`
   - Go to Cashier Dashboard

2. **View New Orders**
   - **All customer orders come to cashier first**
   - See all pending orders in cashier dashboard
   - View order details:
     - Table number
     - Guest name
     - Items ordered
     - Quantities
     - Total amount
     - Special instructions

3. **Review and Accept Order**
   - Cashier reviews the order
   - Verifies items and quantities
   - Confirms table number
   - Click "Accept Order" button
   - **Order Status: "pending" → "confirmed"**
   - **Order is now sent to kitchen (chef can see it)**

---

## Step 3: Chef Receives Order in Kitchen

### Chef Dashboard:
1. **Login**
   - Username: `chief`
   - Password: `1234`
   - Go to Chef Dashboard

2. **View Kitchen Orders**
   - See all confirmed orders
   - View detailed order information:
     - Order number
     - Table number
     - Items to prepare
     - Quantities
     - Special instructions (e.g., "extra spicy", "no onions")
     - Time order was placed

3. **Start Preparing**
   - Click "Start Preparing" button
   - **Order Status: "confirmed" → "preparing"**
   - Chef begins cooking

4. **Complete Preparation**
   - When food is ready, click "Ready" button
   - **Order Status: "preparing" → "ready"**
   - System notifies waiter

---

## Step 4: Waiter Delivers Food

### Waiter Dashboard:
1. **Login**
   - Username: `waiter`
   - Password: `1234`
   - Go to Waiter Dashboard

2. **View Ready Orders**
   - See all orders with status "ready"
   - View which table needs service
   - View items to deliver

3. **Deliver Food**
   - Pick up food from kitchen
   - Deliver to customer's table
   - Click "Delivered" button
   - **Order Status: "ready" → "delivered"**

---

## Step 5: Customer Finishes and Requests Bill

### Customer Actions:
1. **Finish Meal**
   - Enjoy the food
   - Call waiter for bill

### Waiter Actions:
1. **Inform Cashier**
   - Tell cashier customer wants to pay
   - Provide table number

---

## Step 6: Cashier Processes Payment

### Cashier Dashboard:
1. **View Order**
   - Find order by table number
   - View total amount
   - View all items ordered

2. **Process Payment**
   - Click "Process Payment" button
   - Select payment method:
     - Cash
     - Card
     - Mobile Money
   - Enter amount received
   - Calculate change (if cash)

3. **Generate Bill/Receipt**
   - System generates receipt with:
     - Restaurant name: "Betesida Restaurant"
     - Date and time
     - Table number
     - Items ordered with prices
     - Subtotal
     - Tax (if applicable)
     - Total amount
     - Payment method
     - Cashier name
   - Print receipt
   - Give to customer
   - **Order Status: "delivered" → "completed"**

4. **Clear Table**
   - Mark table as available
   - **Table Status: "occupied" → "available"**

---

# 🛏️ ROOM BOOKING WORKFLOW

## Step 1: Customer Books Room (No Login Required)

### Customer Actions:
1. **Browse Rooms**
   - Go to `http://localhost:3000/rooms`
   - View all 10 bedrooms
   - See room details:
     - Room number (R01-R10)
     - Room type (Single, Double, Suite)
     - Price per night
     - Capacity
     - Availability status
     - Features

2. **Select Room**
   - Click "Book Now" on available room
   - Booking form appears

3. **Fill Booking Form**
   - Guest name (required)
   - Phone number (required)
   - Check-in date (required)
   - Check-out date (required)
   - Special requests (optional)
   - System automatically calculates:
     - Number of nights
     - Total amount

4. **Submit Booking**
   - Click "Confirm Booking" button
   - Booking is sent to system
   - Customer sees success message
   - **Booking Status: "confirmed"**
   - **Room Status: "available" → "reserved"**

---

## Step 2: Cashier Receives Booking

### Cashier Dashboard:
1. **View New Bookings**
   - See all confirmed bookings
   - View booking details:
     - Booking ID
     - Guest name
     - Guest phone
     - Room number
     - Room type
     - Check-in date
     - Check-out date
     - Number of nights
     - Total amount
     - Special requests
     - Booking date/time

2. **Contact Guest**
   - Call guest at provided phone number
   - Confirm booking details
   - Inform guest about:
     - Check-in time (e.g., 2:00 PM)
     - Check-out time (e.g., 12:00 PM)
     - Payment policy
     - Cancellation policy

---

## Step 3: Guest Arrives (Check-in)

### Cashier Actions:
1. **Guest Arrives**
   - Guest comes to reception
   - Provides name and booking details

2. **Verify Booking**
   - Search booking by:
     - Guest name
     - Phone number
     - Booking ID
   - Verify identity

3. **Process Check-in**
   - Click "Check-in" button
   - **Booking Status: "confirmed" → "checked_in"**
   - **Room Status: "reserved" → "occupied"**

4. **Collect Payment**
   - Process payment for room
   - Select payment method:
     - Cash
     - Card
     - Mobile Money
   - Enter amount received
   - Calculate change (if cash)

5. **Generate Receipt**
   - System generates booking receipt with:
     - Hotel name: "Betesida Hotel"
     - Date and time
     - Guest name
     - Guest phone
     - **Room number** (e.g., R05)
     - Room type (e.g., Double Room)
     - **Check-in date** (e.g., May 1, 2026)
     - **Check-out date** (e.g., May 3, 2026)
     - Number of nights (e.g., 2 nights)
     - Price per night (e.g., 800 Birr)
     - Total amount paid (e.g., 1,600 Birr)
     - Payment method
     - Cashier name
     - Receipt number
   - Print receipt
   - Give to guest

6. **Provide Room Key**
   - Give room key to guest
   - Explain hotel facilities:
     - WiFi password
     - Breakfast time
     - Restaurant location
     - Check-out time

---

## Step 4: Guest Stay

### Guest Experience:
1. **During Stay**
   - Guest stays in room
   - Can order room service (if available)
   - Can dine at restaurant
   - Enjoy hotel facilities

### Staff Monitoring:
1. **Cashier Dashboard**
   - Monitor checked-in guests
   - Track check-out dates
   - Prepare for upcoming check-outs

---

## Step 5: Guest Checks Out

### Guest Actions:
1. **Prepare to Leave**
   - Pack belongings
   - Come to reception
   - Return room key

### Cashier Actions:
1. **Process Check-out**
   - Verify guest identity
   - Check for any additional charges:
     - Room service
     - Mini-bar
     - Damages
   - Click "Check-out" button
   - **Booking Status: "checked_in" → "checked_out"**
   - **Room Status: "occupied" → "available"**

2. **Final Payment (if needed)**
   - Process any additional charges
   - Generate final receipt if needed

3. **Thank Guest**
   - Thank guest for staying
   - Ask for feedback
   - Invite to return

---

# 📊 COMPLETE WORKFLOW SUMMARY

## Restaurant Order Flow:
```
Customer → Places Order (pending)
    ↓
Cashier → Receives Order FIRST → Reviews → Accepts (confirmed)
    ↓
Chef → Receives Order from Cashier → Prepares Food (preparing → ready)
    ↓
Waiter → Delivers Food (delivered)
    ↓
Cashier → Processes Payment → Generates Bill (completed)
```

**Important**: Orders go to CASHIER FIRST, not directly to chef!

## Room Booking Flow:
```
Customer → Books Room (confirmed, room: reserved)
    ↓
Cashier → Contacts Guest → Confirms Details
    ↓
Guest Arrives → Cashier Checks In (checked_in, room: occupied)
    ↓
Cashier → Processes Payment → Generates Receipt with Room Number & Dates
    ↓
Guest → Receives Key → Stays in Room
    ↓
Guest → Checks Out → Cashier Processes (checked_out, room: available)
```

---

# 📋 RECEIPT EXAMPLES

## Restaurant Bill Receipt:
```
═══════════════════════════════════════
        BETESIDA RESTAURANT
═══════════════════════════════════════
Date: May 1, 2026          Time: 2:30 PM
Table: T05
Guest: John Doe
Order #: ORD-001
───────────────────────────────────────
ITEMS:
Doro Wot x2              500.00 Birr
Tibs x1                  280.00 Birr
Ethiopian Coffee x2      100.00 Birr
───────────────────────────────────────
Subtotal:                880.00 Birr
Tax (15%):               132.00 Birr
───────────────────────────────────────
TOTAL:                 1,012.00 Birr
───────────────────────────────────────
Payment Method: Cash
Amount Paid:           1,100.00 Birr
Change:                   88.00 Birr
───────────────────────────────────────
Cashier: Cashier
Thank you for dining with us!
═══════════════════════════════════════
```

## Room Booking Receipt:
```
═══════════════════════════════════════
         BETESIDA HOTEL
═══════════════════════════════════════
BOOKING RECEIPT
Receipt #: BK-001
Date: May 1, 2026          Time: 2:00 PM
───────────────────────────────────────
GUEST INFORMATION:
Name: John Doe
Phone: 0911234567
───────────────────────────────────────
ROOM DETAILS:
Room Number: R05
Room Type: Double Room
Capacity: 2 People
───────────────────────────────────────
STAY DETAILS:
Check-in Date:  May 1, 2026
Check-out Date: May 3, 2026
Number of Nights: 2
───────────────────────────────────────
CHARGES:
Price per Night:         800.00 Birr
Number of Nights: x2
───────────────────────────────────────
TOTAL AMOUNT:          1,600.00 Birr
───────────────────────────────────────
Payment Method: Cash
Amount Paid:           1,600.00 Birr
Change:                    0.00 Birr
───────────────────────────────────────
Check-in Time: 2:00 PM
Check-out Time: 12:00 PM (Noon)
───────────────────────────────────────
WiFi: BetesidaGuest
Password: [provided separately]
───────────────────────────────────────
Cashier: Cashier
Thank you for choosing Betesida Hotel!
Enjoy your stay!
═══════════════════════════════════════
```

---

# 🎯 KEY POINTS

## For Restaurant Orders:
✅ Customer orders without login
✅ Cashier accepts and sends to kitchen
✅ Chef sees detailed order with special instructions
✅ Chef updates status as preparing → ready
✅ Waiter delivers food
✅ Cashier processes payment and prints bill
✅ Bill includes all items, prices, and payment details

## For Room Bookings:
✅ Customer books without login
✅ System calculates nights and total automatically
✅ Cashier checks in guest
✅ Cashier processes payment
✅ **Receipt shows: Room Number, Check-in Date, Check-out Date**
✅ Guest receives key and stays
✅ Cashier checks out guest when leaving
✅ Room becomes available again

---

# 📱 USER ROLES & ACCESS

| Role    | Can Do                                              |
|---------|-----------------------------------------------------|
| Guest   | Order food, Book rooms (no login)                   |
| Cashier | Accept orders, Process payments, Check-in/out guests|
| Chef    | View orders, Update cooking status                  |
| Waiter  | View ready orders, Deliver food, Manage tables      |

---

**This is the complete workflow for Betesida Restaurant & Hotel Management System!**
