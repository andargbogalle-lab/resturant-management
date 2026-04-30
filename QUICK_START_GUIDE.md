# 🚀 QUICK START GUIDE - Betesida Restaurant System

## ⚡ FASTEST WAY TO START (3 Steps)

### **STEP 1: Start MySQL** ⭐
1. Open **XAMPP Control Panel**
2. Click **"Start"** next to MySQL
3. Wait for **green "Running"** status

### **STEP 2: Start Backend**
Double-click: **`START_BACKEND.bat`**

### **STEP 3: Start Frontend**
Double-click: **`START_FRONTEND.bat`**

### **DONE!** 🎉
Open browser: **http://localhost:3000**

---

## 🔍 CHECK IF SYSTEM IS WORKING

Double-click: **`CHECK_SYSTEM.bat`**

This will tell you:
- ✅ Is MySQL running?
- ✅ Is backend responding?
- ✅ Are menu items loaded?

---

## 🎯 WHAT YOU SHOULD SEE

### **1. XAMPP Control Panel**
```
MySQL: [Running] (green background)
Port: 3306
```

### **2. Backend Terminal**
```
INFO  Server running on [http://127.0.0.1:8000].
Press Ctrl+C to stop the server
```

### **3. Frontend Terminal**
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:3000/
```

### **4. Browser (http://localhost:3000)**
```
ቤተ ሳይዳ ሬስቶራንት
Betesida Restaurant

[Home] [Menu] [Login]

Backend Status: ok ✅
```

---

## 🧪 TEST THE SYSTEM

### **Test 1: View Menu**
1. Click **"Menu"** in navigation
2. Should see **23 Ethiopian dishes**
3. Categories: ወጥ, ጥብስ, ጾም, መጠጦች

### **Test 2: Add to Cart**
1. Click **"+ Add to Cart"** on any dish
2. Cart button updates: 🛒 Cart (0) → 🛒 Cart (1)
3. Click cart button to view

### **Test 3: Place Order**
1. In cart modal, enter **table number** (1-10)
2. Click **"Place Order"**
3. See success message: ✅ "Order placed successfully!"

---

## ❌ TROUBLESHOOTING

### **Problem: MySQL won't start**
**Solution:**
1. Close XAMPP
2. Right-click `xampp-control.exe`
3. Select **"Run as administrator"**
4. Try starting MySQL again

### **Problem: Backend shows connection error**
**Solution:**
1. Check if MySQL is **green** in XAMPP
2. If not, start MySQL first
3. Then restart backend (Ctrl+C, run START_BACKEND.bat again)

### **Problem: Menu page is empty**
**Solution:**
```bash
cd backend
C:\xampp_new\php\php.exe artisan db:seed
```

### **Problem: Buttons don't work**
**Solution:**
1. Press **Ctrl + Shift + R** (hard refresh)
2. Clear browser cache
3. Try different browser

---

## 📋 SYSTEM REQUIREMENTS

✅ **XAMPP MySQL:** Must be running (green status)
✅ **Backend:** Port 8000 must be free
✅ **Frontend:** Port 3000 must be free
✅ **Database:** `restaurant_system` must exist
✅ **Browser:** Chrome, Firefox, or Edge

---

## 🔗 IMPORTANT URLS

| Service | URL | What to See |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | Homepage with navigation |
| **Backend Health** | http://127.0.0.1:8000/api/health | `{"status":"ok"}` |
| **Menu Items** | http://127.0.0.1:8000/api/menu-items | 23 Ethiopian dishes |
| **phpMyAdmin** | http://localhost/phpmyadmin | Database management |

---

## 🎓 USER ACCOUNTS

### **Login Credentials:**
All passwords are: **`password`**

| Role | Email | Password |
|------|-------|----------|
| **Manager** | manager@restaurant.com | password |
| **Cashier** | cashier@restaurant.com | password |
| **Chef** | chef@restaurant.com | password |
| **Waiter** | waiter@restaurant.com | password |
| **Customer** | customer@restaurant.com | password |

### **Guest Ordering:**
- No login required!
- Just go to Menu and order
- Enter table number (1-10)

---

## 🍽️ ETHIOPIAN MENU ITEMS

### **ወጥ (Wot - Stews):**
- ዶሮ ወጥ (Doro Wot) - Spicy chicken stew
- ስጋ ወጥ (Siga Wot) - Beef stew
- ምስር ወጥ (Misir Wot) - Red lentil stew
- And more...

### **ጥብስ (Tibs - Sautéed):**
- ጥብስ (Tibs) - Sautéed meat
- ደረቅ ጥብስ (Derek Tibs) - Dry fried meat
- ሸክላ ጥብስ (Shekla Tibs) - Clay pot tibs

### **ጾም (Fasting Food):**
- በያይነቱ (Beyaynetu) - Mixed vegetarian platter
- ሽሮ (Shiro) - Chickpea stew
- ጎመን (Gomen) - Collard greens

### **መጠጦች (Beverages):**
- ቡና (Ethiopian Coffee)
- ጠጅ (Tej) - Honey wine
- ጠላ (Tella) - Traditional beer

---

## 💡 TIPS

### **Tip 1: Keep Terminals Open**
Don't close the backend or frontend terminals while using the system.

### **Tip 2: MySQL First**
Always start MySQL in XAMPP before starting backend.

### **Tip 3: Hard Refresh**
After any changes, press **Ctrl + Shift + R** to clear cache.

### **Tip 4: Check Console**
Press **F12** to see errors in browser console.

---

## 🎉 SUCCESS!

**Your system is working if:**
- ✅ MySQL is green in XAMPP
- ✅ Backend terminal shows "Server running"
- ✅ Frontend terminal shows "Local: http://localhost:3000"
- ✅ Homepage loads with navigation
- ✅ Menu shows 23 Ethiopian dishes
- ✅ Can add items to cart
- ✅ Can place orders

---

## 📞 NEED HELP?

1. Run **`CHECK_SYSTEM.bat`** to diagnose issues
2. Check **`START_SYSTEM.md`** for detailed troubleshooting
3. Press **F12** in browser to see console errors
4. Take screenshots of any error messages

---

## 🚀 READY TO GO!

**Start the system:**
1. Start MySQL in XAMPP
2. Double-click `START_BACKEND.bat`
3. Double-click `START_FRONTEND.bat`
4. Open http://localhost:3000

**Enjoy your restaurant system!** 🇪🇹🍽️
