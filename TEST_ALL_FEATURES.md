# 🧪 Complete System Test Guide

## ✅ Servers Running

**Backend:** http://127.0.0.1:8000/ ✅
**Frontend:** http://localhost:3000/ ✅

---

## 🎯 Test Each Feature Step-by-Step

### 1️⃣ TEST GUEST ORDERING (No Login)

**URL:** http://localhost:3000/menu

**Steps:**
1. Open menu page
2. Click "+ Add to Cart" on any item (e.g., Burger)
3. Click "+ Add to Cart" on another item (e.g., Coke)
4. Click "🛒 Cart (2)" button
5. Adjust quantity using +/- buttons
6. Add special note: "No onions"
7. Enter Table Number: **5**
8. Enter Name: **John** (optional)
9. Click "📋 Place Order"
10. Should see: ✅ "Order placed successfully!"

**Expected Result:** Order created and sent to kitchen

**If Not Working:** Check browser console (F12) for errors

---

### 2️⃣ TEST WAITER DASHBOARD

**URL:** http://localhost:3000/login

**Login:**
- Email: `waiter@restaurant.com`
- Password: `password`

**Steps:**
1. After login, should redirect to Waiter Dashboard
2. Click **"Tables"** tab
3. Should see grid of tables with colors:
   - Green = Available
   - Orange = Occupied
   - Blue = Reserved
4. Click **"Take Order"** on an available table
5. Should open order form with menu
6. Click category filters (All, Drinks, Meals, etc.)
7. Click on menu items to add to order
8. Adjust quantities with +/- buttons
9. Add special notes
10. Click **"Submit Order"**
11. Should see success message
12. Table should change to "Occupied"
13. Click **"Active Orders"** tab
14. Should see the order you just created

**Expected Result:** Can create orders and manage tables

**If Not Working:** 
- Check if you see the tabs (Overview, Tables, Active Orders)
- Check if menu items load in the order form
- Check browser console for errors

---

### 3️⃣ TEST CHEF DASHBOARD

**URL:** http://localhost:3000/login

**Login:**
- Email: `chef@restaurant.com`
- Password: `password`

**Steps:**
1. After login, should redirect to Chef Dashboard
2. Should see statistics:
   - Pending Orders
   - Preparing
   - Ready to Serve
3. Should see list of orders with:
   - Order number
   - Table number
   - Items list
   - Wait time (minutes ago)
   - Priority color (red/orange/green)
4. Click **"🔥 Start Preparing"** on a pending order
5. Status should change to "preparing"
6. Click **"✅ Mark as Ready"**
7. Status should change to "ready"
8. Click **"View Details"** to expand order info

**Expected Result:** Can view and update order status

**If Not Working:**
- Check if orders appear in the list
- Check if buttons work
- Check browser console for errors

---

### 4️⃣ TEST CASHIER DASHBOARD

**URL:** http://localhost:3000/login

**Login:**
- Email: `cashier@restaurant.com`
- Password: `password`

**Steps:**
1. After login, should redirect to Cashier Dashboard
2. Click **"Pending Payments"** tab
3. Should see orders ready for payment
4. Click **"💳 Process Payment"** on an order
5. Should open payment form
6. Select payment method:
   - Cash
   - Card
   - Mobile (Chapa)
7. Enter amount paid (e.g., 50.00)
8. Should show change if cash
9. Click **"Complete Payment"**
10. Should see success message
11. Click **"Payment History"** tab
12. Should see the payment you just processed

**Expected Result:** Can process payments with different methods

**If Not Working:**
- Check if pending orders appear
- Check if payment form opens
- Check if change calculation works
- Check browser console for errors

---

### 5️⃣ TEST MANAGER DASHBOARD

**URL:** http://localhost:3000/login

**Login:**
- Email: `manager@restaurant.com`
- Password: `password`

**Steps:**

#### A. Staff Management
1. Click **"Staff Management"** tab
2. Should see table of all users
3. Click **"+ Add Staff"**
4. Fill form:
   - Name: Test Waiter
   - Email: test@test.com
   - Password: password
   - Role: Waiter
5. Click **"Save"**
6. Should see new user in table
7. Click **"Edit"** on the user
8. Change name to "Test Waiter 2"
9. Click **"Save"**
10. Click **"Delete"**
11. Confirm deletion

#### B. Menu Management
1. Click **"Menu Management"** tab
2. Should see table of menu items
3. Click **"+ Add Menu Item"**
4. Fill form:
   - Category: Select one
   - Name: Test Pizza
   - Description: Delicious pizza
   - Price: 15.99
   - Available: Checked
5. Click **"Save"**
6. Should see new item in table
7. Click **"Edit"** on the item
8. Change price to 16.99
9. Click **"Save"**
10. Click **"Delete"**
11. Confirm deletion

#### C. Inventory Management
1. Click **"Inventory"** tab
2. Should see table of inventory items
3. Click **"+ Add Item"**
4. Fill form:
   - Item Name: Tomatoes
   - Quantity: 50
   - Unit: kg
   - Cost per Unit: 2.50
   - Minimum Stock: 10
5. Click **"Save"**
6. Should see new item in table
7. Items with quantity <= minimum should be highlighted red
8. Click **"Edit"** on the item
9. Change quantity to 5
10. Should show "Low Stock" warning
11. Click **"Delete"**
12. Confirm deletion

**Expected Result:** Can manage staff, menu, and inventory

**If Not Working:**
- Check if tabs appear
- Check if tables load with data
- Check if forms open
- Check if CRUD operations work
- Check browser console for errors

---

## 🔍 Common Issues & Solutions

### Issue 1: "Nothing happens when I click buttons"

**Solution:**
1. Open browser console (Press F12)
2. Go to Console tab
3. Look for red error messages
4. Share the error message

### Issue 2: "Can't see any data in tables"

**Solution:**
1. Check if backend is running: http://127.0.0.1:8000/api/health
2. Should see: `{"status":"ok","message":"Restaurant API is running"}`
3. If not, restart backend:
   ```
   cd backend
   C:\xampp_new\php\php.exe artisan serve --host=127.0.0.1 --port=8000
   ```

### Issue 3: "Login doesn't work"

**Solution:**
1. Make sure you're using correct credentials:
   - manager@restaurant.com / password
   - cashier@restaurant.com / password
   - chef@restaurant.com / password
   - waiter@restaurant.com / password
2. Check browser console for errors
3. Check if backend is running

### Issue 4: "Orders not appearing"

**Solution:**
1. Check if database has data:
   ```
   cd backend
   C:\xampp_new\php\php.exe artisan tinker
   >>> \App\Models\Order::count()
   ```
2. If 0, seed database:
   ```
   C:\xampp_new\php\php.exe artisan db:seed
   ```

### Issue 5: "Page is blank or white screen"

**Solution:**
1. Check if frontend is running: http://localhost:3000/
2. Open browser console (F12)
3. Look for errors
4. Restart frontend:
   ```
   cd frontend
   npm run dev
   ```

---

## 📊 What Should Work

### ✅ Guest Features (No Login):
- Browse menu
- Add items to cart
- Place orders
- Enter table number

### ✅ Waiter Features:
- View tables
- Create orders
- Manage table status
- View active orders

### ✅ Chef Features:
- View kitchen queue
- Update order status (pending → preparing → ready)
- See order details
- Priority indicators

### ✅ Cashier Features:
- View pending payments
- Process payments (cash/card/mobile)
- Calculate change
- View payment history
- Process refunds

### ✅ Manager Features:
- Add/Edit/Delete staff
- Add/Edit/Delete menu items
- Add/Edit/Delete inventory
- View statistics
- Low stock alerts

---

## 🚨 If NOTHING Works

1. **Stop both servers:**
   - Press Ctrl+C in both terminal windows

2. **Clear all caches:**
   ```bash
   cd backend
   C:\xampp_new\php\php.exe artisan cache:clear
   C:\xampp_new\php\php.exe artisan config:clear
   C:\xampp_new\php\php.exe artisan route:clear
   ```

3. **Restart MySQL in XAMPP**

4. **Restart backend:**
   ```bash
   cd backend
   C:\xampp_new\php\php.exe artisan serve --host=127.0.0.1 --port=8000
   ```

5. **Restart frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Clear browser cache:**
   - Press Ctrl+Shift+Delete
   - Clear cached images and files
   - Close and reopen browser

7. **Try again**

---

## 📝 Report Issues

If something doesn't work, please provide:

1. **Which feature** you're testing
2. **What you did** (step-by-step)
3. **What happened** (what you see)
4. **What you expected** (what should happen)
5. **Browser console errors** (F12 → Console tab)
6. **Screenshots** if possible

---

## ✅ Success Checklist

- [ ] Guest can order from menu
- [ ] Waiter can create orders
- [ ] Waiter can manage tables
- [ ] Chef can see orders
- [ ] Chef can update order status
- [ ] Cashier can process payments
- [ ] Manager can add staff
- [ ] Manager can add menu items
- [ ] Manager can manage inventory

**If all checked, system is fully functional!** 🎉
