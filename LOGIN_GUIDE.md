# 🔐 LOGIN GUIDE - Betesida Restaurant

## 🎯 SIMPLE LOGIN CREDENTIALS

**All users now have simple usernames and the same password!**

---

## 👥 WHO CAN LOGIN?

### **5 User Types:**

1. 👔 **Manager** - Full system access
2. 💰 **Cashier** - Payment processing
3. 👨‍🍳 **Chef** - Kitchen management
4. 🍽️ **Waiter** - Table & order management
5. 🛍️ **Customer** - Menu browsing & ordering

---

## 🔑 LOGIN CREDENTIALS

### **Manager:**
```
Username: manager
Password: 1234
Access: Full system control
```

### **Cashier:**
```
Username: cashier
Password: 1234
Access: Payments, refunds, reports
```

### **Chef:**
```
Username: chef
Password: 1234
Access: Kitchen orders, status updates
```

### **Waiter:**
```
Username: waiter
Password: 1234
Access: Tables, orders, serving
```

### **Customer:**
```
Username: customer
Password: 1234
Access: Menu, cart, order history
```

---

## 📋 HOW TO LOGIN

### **Step 1: Open Login Page**
```
http://localhost:3000/login
```

### **Step 2: Enter Credentials**
```
Username: manager
Password: 1234
```

### **Step 3: Click Login**
- System will verify credentials
- Redirect to role-specific dashboard

### **Step 4: Start Working!**
- Each role sees their own dashboard
- Access features based on role

---

## 🎯 LOGIN EXAMPLES

### **Example 1: Manager Login**

1. Go to: http://localhost:3000/login
2. Enter:
   ```
   Username: manager
   Password: 1234
   ```
3. Click **Login**
4. **Result:** Manager Dashboard
   - Staff management
   - Menu management
   - Inventory
   - Reports

---

### **Example 2: Chef Login**

1. Go to: http://localhost:3000/login
2. Enter:
   ```
   Username: chef
   Password: 1234
   ```
3. Click **Login**
4. **Result:** Chef Dashboard
   - Kitchen queue
   - Pending orders
   - Order status updates

---

### **Example 3: Cashier Login**

1. Go to: http://localhost:3000/login
2. Enter:
   ```
   Username: cashier
   Password: 1234
   ```
3. Click **Login**
4. **Result:** Cashier Dashboard
   - Pending payments
   - Payment processing
   - Daily reports

---

## 🚫 GUEST ORDERING (No Login)

**Guests don't need to login!**

1. Go to: http://localhost:3000
2. Click **"Menu"**
3. Browse Ethiopian dishes
4. Add items to cart
5. Enter table number
6. Place order
7. Done! ✅

**No username or password needed for guests!**

---

## 🔄 SWITCHING USERS

### **To Switch Accounts:**

1. Click **"Logout"** button (top right)
2. Returns to login page
3. Enter different username
4. Login with password: 1234
5. See different dashboard

### **Example:**
```
1. Login as: chef / 1234
2. See: Chef Dashboard
3. Logout
4. Login as: cashier / 1234
5. See: Cashier Dashboard
```

---

## 🎨 WHAT EACH ROLE SEES

### **Manager Dashboard:**
```
📊 Overview
├─ Staff Management
├─ Menu Management
├─ Inventory Management
├─ Reports & Analytics
└─ System Settings
```

### **Cashier Dashboard:**
```
💰 Overview
├─ Pending Payments
├─ Payment Processing
├─ Payment History
└─ Daily Reports
```

### **Chef Dashboard:**
```
👨‍🍳 Kitchen Queue
├─ Pending Orders
├─ Preparing Orders
├─ Ready Orders
└─ Order Details
```

### **Waiter Dashboard:**
```
🍽️ Overview
├─ Table Management
├─ Create Orders
├─ Active Orders
└─ Table Status
```

### **Customer Dashboard:**
```
🛍️ Menu
├─ Browse Menu
├─ My Orders
├─ Order History
└─ Feedback
```

---

## ❌ TROUBLESHOOTING

### **Problem: Invalid Credentials**

**Error:** "Invalid email or password"

**Solutions:**

1. **Check username:**
   - Use: **manager** (not manager@restaurant.com)
   - No @ symbol
   - All lowercase

2. **Check password:**
   - Use: **1234** (not "password")
   - Just numbers
   - No spaces

3. **Update database:**
   - Run `UPDATE_DATABASE.bat`
   - Apply new credentials

4. **Clear cache:**
   - Press Ctrl + Shift + R
   - Try login again

---

### **Problem: Can't Access Login Page**

**Error:** Page won't load

**Solutions:**

1. **Check servers:**
   - Backend running? (START_BACKEND.bat)
   - Frontend running? (START_FRONTEND.bat)

2. **Check URL:**
   - Use: http://localhost:3000/login
   - Not: http://127.0.0.1:3000/login

3. **Check MySQL:**
   - XAMPP MySQL must be GREEN
   - Start if not running

---

### **Problem: Redirects to Wrong Dashboard**

**Symptoms:**
- Login as chef
- See manager dashboard

**Solution:**
- Logout completely
- Clear browser cache
- Login again

---

## 📊 CREDENTIAL SUMMARY TABLE

| Username | Password | Role | Dashboard |
|----------|----------|------|-----------|
| manager | 1234 | Manager | Full access |
| cashier | 1234 | Cashier | Payments |
| chef | 1234 | Chef | Kitchen |
| waiter | 1234 | Waiter | Tables |
| customer | 1234 | Customer | Menu |

---

## 💡 TIPS

### **Tip 1: Remember the Pattern**
```
Username = Role name (lowercase)
Password = Always 1234
```

### **Tip 2: No Email Needed**
```
❌ Wrong: manager@restaurant.com
✅ Right: manager
```

### **Tip 3: Same Password**
```
All users: 1234
Easy to remember!
```

### **Tip 4: Guest Access**
```
No login needed for:
- Viewing menu
- Adding to cart
- Placing orders
```

---

## 🔐 SECURITY NOTES

### **For Production:**

⚠️ **These simple credentials are for DEVELOPMENT only!**

**For production, you should:**
1. Use strong passwords
2. Use email addresses
3. Enable email verification
4. Add two-factor authentication
5. Implement password reset

**Current setup is for easy testing!**

---

## ✅ QUICK TEST

**Test all logins:**

```bash
# Manager
Username: manager
Password: 1234
✅ Manager Dashboard

# Cashier
Username: cashier
Password: 1234
✅ Cashier Dashboard

# Chef
Username: chef
Password: 1234
✅ Chef Dashboard

# Waiter
Username: waiter
Password: 1234
✅ Waiter Dashboard

# Customer
Username: customer
Password: 1234
✅ Customer Dashboard
```

**All working? Perfect!** 🎉

---

## 🎊 READY TO USE!

**Login is now super simple:**

1. Go to login page
2. Enter username (manager, chef, etc.)
3. Enter password: 1234
4. Click Login
5. Start working!

**Easy, fast, simple!** 🇪🇹🍽️

---

**ቤተ ሳይዳ ሬስቶራንት - Betesida Restaurant**

**Simple credentials for easy access!**
