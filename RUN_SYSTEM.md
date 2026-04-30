# 🚀 How to Run Betesida Restaurant System

## Prerequisites
- ✅ XAMPP installed at `C:\xampp_new\`
- ✅ Node.js and npm installed
- ✅ MySQL database running
- ✅ Composer installed

---

## 📋 Step-by-Step Instructions

### 1️⃣ Start MySQL Database
1. Open XAMPP Control Panel
2. Start **MySQL** service
3. Ensure it's running on port 3306

### 2️⃣ Start Backend (Laravel)

Open **PowerShell** or **Command Prompt**:

```powershell
# Navigate to backend folder
cd "C:\xampp_new\htdocs\resturant system\backend"

# Start Laravel server
C:\xampp_new\php\php.exe artisan serve --host=127.0.0.1 --port=8000
```

**Expected Output:**
```
INFO  Server running on [http://127.0.0.1:8000].
Press Ctrl+C to stop the server
```

✅ Backend is now running at: **http://127.0.0.1:8000**

---

### 3️⃣ Start Frontend (React)

Open a **NEW** PowerShell or Command Prompt window:

```powershell
# Navigate to frontend folder
cd "C:\xampp_new\htdocs\resturant system\frontend"

# Start React development server
npm run dev
```

**Expected Output:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

✅ Frontend is now running at: **http://localhost:5173/**

---

## 🌐 Access the System

Open your browser and go to: **http://localhost:5173/**

---

## 🔑 Login Credentials

### Demo Accounts (All use password: `password`)

| Role | Email | Password |
|------|-------|----------|
| 👨‍💼 Manager | manager@restaurant.com | password |
| 💰 Cashier | cashier@restaurant.com | password |
| 👨‍🍳 Chef | chef@restaurant.com | password |
| 🧑‍🍽️ Waiter | waiter@restaurant.com | password |
| 🍴 Customer | customer@restaurant.com | password |

---

## 🎯 Quick Test Workflow

### Test 1: Waiter Creates Order
1. Login as **waiter@restaurant.com**
2. Click **Tables** tab
3. Click **Take Order** on any available table
4. Select items from menu
5. Add quantities and notes
6. Click **Submit Order**
7. ✅ Order sent to kitchen!

### Test 2: Chef Prepares Order
1. Login as **chef@restaurant.com**
2. See the new order in queue
3. Click **🔥 Start Preparing**
4. After a moment, click **✅ Mark as Ready**
5. ✅ Order ready for serving!

### Test 3: Cashier Processes Payment
1. Login as **cashier@restaurant.com**
2. Click **Pending Payments** tab
3. Click **💳 Process Payment**
4. Select payment method (Cash/Card/Mobile)
5. Enter amount paid
6. Click **Complete Payment**
7. ✅ Payment processed!

### Test 4: Manager Manages System
1. Login as **manager@restaurant.com**
2. **Staff Management**: Add/Edit/Delete staff
3. **Menu Management**: Add/Edit/Delete menu items
4. **Inventory**: Update stock levels
5. ✅ Full control!

### Test 5: Customer Orders
1. Login as **customer@restaurant.com**
2. Browse menu by category
3. Add items to cart (🛒 icon)
4. View cart and adjust quantities
5. Click **Place Order**
6. Check **My Orders** tab
7. Leave feedback in **Feedback** tab
8. ✅ Self-service complete!

---

## 🛑 How to Stop

### Stop Frontend:
- Press `Ctrl + C` in the frontend terminal
- Type `Y` to confirm

### Stop Backend:
- Press `Ctrl + C` in the backend terminal

### Stop MySQL:
- Open XAMPP Control Panel
- Click **Stop** next to MySQL

---

## 🔧 Troubleshooting

### Problem: "Port 8000 already in use"
**Solution:**
```powershell
# Find process using port 8000
netstat -ano | findstr :8000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F

# Or use a different port
C:\xampp_new\php\php.exe artisan serve --host=127.0.0.1 --port=8001
```

### Problem: "Port 5173 already in use"
**Solution:**
```powershell
# Kill Node process
taskkill /F /IM node.exe

# Or change port in vite.config.js
```

### Problem: "CSRF token mismatch"
**Solution:** Already fixed! CSRF is disabled for API routes.

### Problem: "Database connection error"
**Solution:**
1. Check MySQL is running in XAMPP
2. Verify `.env` file in backend folder:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=restaurant_system
   DB_USERNAME=root
   DB_PASSWORD=
   ```

### Problem: "Menu items not showing"
**Solution:**
```powershell
cd backend
C:\xampp_new\php\php.exe artisan migrate:fresh --seed
```
This will reset and reseed the database with sample data.

---

## 📱 Features Available

### ✅ Manager Dashboard
- Staff management (CRUD)
- Menu management (CRUD)
- Inventory management (CRUD)
- Low stock alerts
- Overview statistics

### ✅ Waiter Dashboard
- Table management
- Order creation with menu
- Active orders tracking
- Table status updates

### ✅ Chef Dashboard
- Kitchen order queue
- Priority-based display
- Order status updates
- Auto-refresh every 30s

### ✅ Cashier Dashboard
- Payment processing
- Multiple payment methods
- Change calculation
- Payment history
- Refund functionality

### ✅ Customer Dashboard
- Menu browsing
- Shopping cart
- Order placement
- Order history
- Feedback system

---

## 🌍 Language Support

Switch between **English** and **Amharic (አማርኛ)** using the language toggle button in the navbar:
- 🇬🇧 EN / 🇪🇹 አማ

---

## 📊 Database Info

- **Database Name:** restaurant_system
- **Tables:** users, categories, menu_items, tables, orders, order_items, payments, inventory, feedback, settings
- **Sample Data:** 5 users, 4 categories, 13 menu items, 10 tables

---

## 🎉 System is Ready!

All 5 actors can now fully process their tasks:
- ✅ Managers can manage everything
- ✅ Waiters can take orders
- ✅ Chefs can prepare orders
- ✅ Cashiers can process payments
- ✅ Customers can order and give feedback

**Enjoy using Betesida Restaurant System! 🍽️**
