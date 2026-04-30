# 🏗️ System Architecture - Betesida Restaurant

## 📊 System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    BETESIDA RESTAURANT SYSTEM                │
└─────────────────────────────────────────────────────────────┘

┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   BROWSER    │ ───> │   FRONTEND   │ ───> │   BACKEND    │
│ (Port 3000)  │ <─── │  React+Vite  │ <─── │   Laravel    │
└──────────────┘      └──────────────┘      └──────────────┘
                                                     │
                                                     ▼
                                            ┌──────────────┐
                                            │    MySQL     │
                                            │  (Port 3306) │
                                            └──────────────┘
```

---

## 🔄 How It Works

### **1. User Opens Browser**
```
http://localhost:3000
```
- Loads React frontend
- Shows homepage with navigation

### **2. User Clicks "Menu"**
```
Frontend → Backend API
GET http://127.0.0.1:8000/api/menu-items
```
- Frontend requests menu items
- Backend queries MySQL database
- Returns 23 Ethiopian dishes

### **3. User Adds to Cart**
```
Frontend (localStorage)
```
- Cart stored in browser
- No backend call yet
- Persists across page refreshes

### **4. User Places Order**
```
Frontend → Backend API
POST http://127.0.0.1:8000/api/orders
```
- Frontend sends order data
- Backend saves to MySQL
- Returns success response

---

## 🗂️ Database Structure

### **Tables:**

```
restaurant_system (Database)
├── users (Staff & customers)
├── categories (Food categories)
├── menu_items (Ethiopian dishes)
├── tables (Restaurant tables 1-10)
├── orders (Customer orders)
├── order_items (Order details)
├── payments (Payment records)
├── inventory (Stock management)
├── feedback (Customer reviews)
└── settings (System config)
```

---

## 🎭 User Roles

### **1. Guest (No Login)**
- ✅ View menu
- ✅ Add to cart
- ✅ Place orders
- ❌ No dashboard access

### **2. Customer (Login Required)**
- ✅ Everything guests can do
- ✅ View order history
- ✅ Submit feedback
- ✅ Customer dashboard

### **3. Waiter**
- ✅ Manage tables
- ✅ Create orders for customers
- ✅ View order status
- ✅ Waiter dashboard

### **4. Chef**
- ✅ View kitchen queue
- ✅ Update order status
- ✅ Mark items as ready
- ✅ Chef dashboard

### **5. Cashier**
- ✅ Process payments
- ✅ Handle refunds
- ✅ View payment history
- ✅ Daily reports
- ✅ Cashier dashboard

### **6. Manager**
- ✅ Everything above
- ✅ Manage staff
- ✅ Manage menu items
- ✅ Manage inventory
- ✅ View all reports
- ✅ System settings
- ✅ Manager dashboard

---

## 🔐 Authentication Flow

### **Guest Ordering (No Auth):**
```
Browser → Menu → Add to Cart → Place Order → Success
```
- No login required
- Just enter table number
- Order goes to kitchen

### **Staff Login:**
```
Browser → Login → Dashboard → Role-specific features
```
- Email + password
- Redirects to role dashboard
- Access control by role

---

## 📡 API Endpoints

### **Public (No Auth):**
```
GET  /api/categories          - List categories
GET  /api/menu-items          - List menu items
GET  /api/tables              - List tables
POST /api/orders              - Place order (guest)
POST /api/login               - Login
POST /api/register            - Register
```

### **Protected (Auth Required):**
```
GET    /api/orders            - List orders
PATCH  /api/orders/{id}/status - Update order
GET    /api/payments          - List payments
POST   /api/payments          - Process payment
GET    /api/users             - List users (manager)
POST   /api/users             - Create user (manager)
GET    /api/inventory         - List inventory (manager)
```

---

## 🌐 Port Configuration

| Service | Port | URL |
|---------|------|-----|
| **Frontend** | 3000 | http://localhost:3000 |
| **Backend** | 8000 | http://127.0.0.1:8000 |
| **MySQL** | 3306 | localhost:3306 |
| **phpMyAdmin** | 80 | http://localhost/phpmyadmin |

---

## 📁 Project Structure

```
resturant system/
│
├── backend/                    # Laravel API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/   # API controllers
│   │   │   └── Middleware/    # Auth & role checks
│   │   └── Models/            # Database models
│   ├── config/                # Configuration
│   ├── database/
│   │   ├── migrations/        # Database schema
│   │   └── seeders/           # Sample data
│   ├── routes/
│   │   └── api.php            # API routes
│   └── .env                   # Environment config
│
├── frontend/                   # React SPA
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── context/           # State management
│   │   ├── pages/             # Page components
│   │   │   ├── dashboards/    # Role dashboards
│   │   │   ├── Home.jsx       # Homepage
│   │   │   ├── Menu.jsx       # Menu & ordering
│   │   │   ├── Login.jsx      # Login page
│   │   │   └── Tables.jsx     # Table view
│   │   ├── services/
│   │   │   └── api.js         # API client
│   │   └── main.jsx           # Entry point
│   └── package.json           # Dependencies
│
└── Documentation/              # Guides
    ├── START_SYSTEM.md
    ├── QUICK_START_GUIDE.md
    └── FIX_SYSTEM_NOT_RESPONDING.md
```

---

## 🔄 Order Flow

### **Guest Order Flow:**

```
1. Customer → Menu Page
   ↓
2. Browse Ethiopian dishes
   ↓
3. Click "+ Add to Cart"
   ↓
4. Cart stored in browser (localStorage)
   ↓
5. Click cart button (🛒)
   ↓
6. Enter table number (1-10)
   ↓
7. Click "Place Order"
   ↓
8. Frontend → POST /api/orders
   ↓
9. Backend saves to MySQL
   ↓
10. Order appears in Chef dashboard
    ↓
11. Chef prepares food
    ↓
12. Waiter serves customer
    ↓
13. Cashier processes payment
    ↓
14. Order completed ✅
```

---

## 🛠️ Technology Stack

### **Frontend:**
- **React 18** - UI framework
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS3** - Styling

### **Backend:**
- **Laravel 11** - PHP framework
- **Sanctum** - API authentication
- **MySQL** - Database
- **PHP 8.2** - Programming language

### **Development:**
- **XAMPP** - Local server (MySQL + PHP)
- **npm** - Package manager
- **Composer** - PHP dependencies

---

## 🔒 Security Features

### **1. CORS Protection**
```php
// backend/config/cors.php
'allowed_origins' => ['http://localhost:3000']
```

### **2. Role-Based Access**
```php
// Middleware checks user role
Route::middleware(['role:manager'])->group(...)
```

### **3. Input Validation**
```php
// All inputs validated
$validator = Validator::make($request->all(), [...])
```

### **4. SQL Injection Prevention**
```php
// Laravel ORM (Eloquent) prevents SQL injection
Order::where('id', $id)->first()
```

---

## 📊 Data Flow Example

### **Placing an Order:**

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ User clicks "Place Order"
       ▼
┌─────────────┐
│  Menu.jsx   │ Collects cart data
└──────┬──────┘
       │ POST /api/orders
       ▼
┌─────────────┐
│   api.js    │ Axios HTTP request
└──────┬──────┘
       │ HTTP POST
       ▼
┌─────────────┐
│ Laravel API │ routes/api.php
└──────┬──────┘
       │ Route to controller
       ▼
┌─────────────┐
│OrderControl │ Validates & processes
└──────┬──────┘
       │ Save to database
       ▼
┌─────────────┐
│    MySQL    │ Stores order
└──────┬──────┘
       │ Returns success
       ▼
┌─────────────┐
│   Browser   │ Shows success message
└─────────────┘
```

---

## 🎯 Key Features

### **1. Multi-Language Support**
- Amharic (አማርኛ)
- English
- Toggle in UI

### **2. Real-Time Updates**
- Orders update live
- Kitchen queue refreshes
- Payment status updates

### **3. Role-Based Dashboards**
- Each role sees relevant features
- Access control enforced
- Custom UI per role

### **4. Guest Ordering**
- No registration required
- Quick ordering process
- Table-based tracking

### **5. Ethiopian Menu**
- 23 authentic dishes
- Amharic names
- Traditional categories

---

## 🔍 Debugging Points

### **Frontend Issues:**
```
Browser Console (F12)
→ Check for JavaScript errors
→ Check API calls in Network tab
→ Check localStorage for cart data
```

### **Backend Issues:**
```
backend/storage/logs/laravel.log
→ Check for PHP errors
→ Check for database errors
→ Check for validation errors
```

### **Database Issues:**
```
phpMyAdmin (http://localhost/phpmyadmin)
→ Check if tables exist
→ Check if data is inserted
→ Check table relationships
```

---

## ✅ System Health Checks

### **1. MySQL Running?**
```
XAMPP → MySQL → Green "Running"
```

### **2. Backend Running?**
```
http://127.0.0.1:8000/api/health
→ Should return: {"status":"ok"}
```

### **3. Frontend Running?**
```
http://localhost:3000
→ Should load homepage
```

### **4. Database Connected?**
```
http://127.0.0.1:8000/api/menu-items
→ Should return 23 items
```

---

## 🎉 Success Criteria

**System is fully operational when:**

✅ All 3 servers running (MySQL, Backend, Frontend)
✅ Homepage loads with navigation
✅ Menu shows 23 Ethiopian dishes
✅ Cart functionality works
✅ Orders can be placed
✅ Staff can login
✅ Dashboards are accessible
✅ Payments can be processed

---

## 📚 Documentation Files

- **START_SYSTEM.md** - Complete startup guide
- **QUICK_START_GUIDE.md** - Fast startup (3 steps)
- **FIX_SYSTEM_NOT_RESPONDING.md** - Troubleshooting
- **SYSTEM_ARCHITECTURE.md** - This file
- **ETHIOPIAN_MENU.md** - Menu details
- **DASHBOARDS_IMPLEMENTATION.md** - Dashboard features

---

## 🚀 Quick Reference

**Start System:**
1. Start MySQL in XAMPP
2. Run `START_BACKEND.bat`
3. Run `START_FRONTEND.bat`
4. Open http://localhost:3000

**Check System:**
- Run `CHECK_SYSTEM.bat`

**Stop System:**
- Ctrl+C in both terminals
- Stop MySQL in XAMPP

---

**Built with ❤️ for Betesida Restaurant** 🇪🇹🍽️
