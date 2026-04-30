# 🎉 WELCOME TO BETESIDA RESTAURANT SYSTEM

## 📖 READ THIS FIRST!

This is a complete restaurant management system with:
- ✅ Guest ordering (no login required)
- ✅ 23 Ethiopian dishes with Amharic names
- ✅ 5 role-based dashboards
- ✅ Full order management
- ✅ Payment processing
- ✅ Inventory management

---

## 🚀 QUICK START (3 Steps)

### **STEP 1: Start MySQL**
1. Open XAMPP Control Panel
2. Click "Start" next to MySQL
3. Wait for green "Running" status

### **STEP 2: Start Backend**
Double-click: **`START_BACKEND.bat`**

### **STEP 3: Start Frontend**
Double-click: **`START_FRONTEND.bat`**

### **DONE!**
Open: **http://localhost:3000**

---

## 📚 DOCUMENTATION GUIDE

### **🆘 HAVING PROBLEMS?**

**System not responding?**
→ Read: **`FIX_SYSTEM_NOT_RESPONDING.md`**

**First time setup?**
→ Read: **`START_SYSTEM.md`**

**Want quick start?**
→ Read: **`QUICK_START_GUIDE.md`**

### **📖 LEARNING THE SYSTEM**

**Understand architecture?**
→ Read: **`SYSTEM_ARCHITECTURE.md`**

**See Ethiopian menu?**
→ Read: **`ETHIOPIAN_MENU.md`**

**Learn dashboard features?**
→ Read: **`DASHBOARDS_IMPLEMENTATION.md`**

### **🔧 TROUBLESHOOTING**

**Buttons not working?**
→ Read: **`BUTTON_FIX.md`**

**Cart issues?**
→ Read: **`DEBUG_CART_ISSUE.md`**

**Setup problems?**
→ Read: **`FINAL_SETUP.md`**

---

## 🎯 WHAT YOU CAN DO

### **As a Guest (No Login):**
1. Browse menu
2. Add items to cart
3. Place orders
4. Enter table number

### **As Staff (Login Required):**

**Manager:**
- Manage staff
- Manage menu
- Manage inventory
- View reports

**Cashier:**
- Process payments
- Handle refunds
- View payment history

**Chef:**
- View kitchen queue
- Update order status
- Mark items ready

**Waiter:**
- Manage tables
- Create orders
- View order status

**Customer:**
- View order history
- Submit feedback
- Track orders

---

## 🔑 LOGIN CREDENTIALS

All passwords are: **`password`**

| Role | Email |
|------|-------|
| Manager | manager@restaurant.com |
| Cashier | cashier@restaurant.com |
| Chef | chef@restaurant.com |
| Waiter | waiter@restaurant.com |
| Customer | customer@restaurant.com |

---

## 🍽️ ETHIOPIAN MENU

### **23 Authentic Dishes:**

**ወጥ (Wot - Stews):**
- ዶሮ ወጥ (Doro Wot) - 250 Birr
- ስጋ ወጥ (Siga Wot) - 200 Birr
- ምስር ወጥ (Misir Wot) - 120 Birr
- ቅቅል (Kikil) - 180 Birr
- ቀይ ስጋ ወጥ (Key Siga Wot) - 220 Birr

**ጥብስ (Tibs - Sautéed):**
- ጥብስ (Tibs) - 200 Birr
- ደረቅ ጥብስ (Derek Tibs) - 250 Birr
- ሸክላ ጥብስ (Shekla Tibs) - 280 Birr
- አዋዜ ጥብስ (Awaze Tibs) - 230 Birr
- ዱለት ጥብስ (Dulet Tibs) - 180 Birr

**ጾም (Fasting Food):**
- በያይነቱ (Beyaynetu) - 150 Birr
- ሽሮ (Shiro) - 80 Birr
- ጎመን (Gomen) - 70 Birr
- ምስር (Misir) - 75 Birr
- አተር ክክ (Ater Kik) - 70 Birr
- ፎሶሊያ (Fosolia) - 80 Birr
- ድንች (Dinich) - 60 Birr

**መጠጦች (Beverages):**
- ቡና (Ethiopian Coffee) - 25 Birr
- ጠጅ (Tej) - 100 Birr
- ጠላ (Tella) - 50 Birr
- ስፕሪስ (Spris) - 30 Birr
- አምቦ (Ambo) - 25 Birr
- ፍሬሽ ጁስ (Fresh Juice) - 40 Birr

---

## 🔗 IMPORTANT URLS

| What | URL |
|------|-----|
| **Homepage** | http://localhost:3000 |
| **Menu** | http://localhost:3000/menu |
| **Login** | http://localhost:3000/login |
| **Backend Health** | http://127.0.0.1:8000/api/health |
| **Menu Items API** | http://127.0.0.1:8000/api/menu-items |
| **phpMyAdmin** | http://localhost/phpmyadmin |

---

## ✅ SYSTEM CHECK

**Run this to check if everything is working:**

Double-click: **`CHECK_SYSTEM.bat`**

It will tell you:
- ✅ Is MySQL running?
- ✅ Is backend responding?
- ✅ Are menu items loaded?

---

## 🎯 TEST THE SYSTEM

### **Quick Test (2 minutes):**

1. Open http://localhost:3000
2. Click "Menu"
3. Click "+ Add to Cart" on any dish
4. Cart button updates: 🛒 Cart (0) → 🛒 Cart (1)
5. Click cart button
6. Enter table number: 5
7. Click "Place Order"
8. See success message ✅

**If all steps work: System is perfect!** 🎉

---

## ❌ COMMON PROBLEMS

### **Problem 1: System Not Responding**
**Solution:** MySQL is not running!
→ Start MySQL in XAMPP (green status)
→ Read: `FIX_SYSTEM_NOT_RESPONDING.md`

### **Problem 2: Buttons Not Clickable**
**Solution:** Clear browser cache
→ Press Ctrl + Shift + R
→ Read: `BUTTON_FIX.md`

### **Problem 3: Menu Empty**
**Solution:** Database needs seeding
```bash
cd backend
C:\xampp_new\php\php.exe artisan db:seed
```

### **Problem 4: Can't Place Order**
**Solution:** Check table number
→ Must be between 1-10
→ MySQL must be running

---

## 🛠️ SYSTEM REQUIREMENTS

✅ **Windows** (with XAMPP)
✅ **XAMPP** (MySQL + PHP 8.2)
✅ **Node.js** (for frontend)
✅ **Composer** (for backend)
✅ **Modern Browser** (Chrome, Firefox, Edge)

---

## 📁 PROJECT STRUCTURE

```
resturant system/
├── backend/              # Laravel API
├── frontend/             # React SPA
├── START_BACKEND.bat     # Start backend server
├── START_FRONTEND.bat    # Start frontend server
├── CHECK_SYSTEM.bat      # Check system status
└── Documentation/        # All guides
```

---

## 🎓 LEARNING PATH

### **Day 1: Setup**
1. Read `QUICK_START_GUIDE.md`
2. Start the system
3. Test guest ordering

### **Day 2: Explore**
1. Read `SYSTEM_ARCHITECTURE.md`
2. Try all user roles
3. Test dashboards

### **Day 3: Customize**
1. Add new menu items
2. Modify categories
3. Customize UI

---

## 💡 PRO TIPS

### **Tip 1: Always Start MySQL First**
Before starting backend, make sure MySQL is green in XAMPP.

### **Tip 2: Keep Terminals Open**
Don't close backend or frontend terminals while using the system.

### **Tip 3: Hard Refresh After Changes**
Press Ctrl + Shift + R to clear cache and see changes.

### **Tip 4: Check Console for Errors**
Press F12 in browser to see JavaScript errors.

### **Tip 5: Use CHECK_SYSTEM.bat**
Run it anytime to diagnose issues quickly.

---

## 🎉 FEATURES

### **✅ Guest Ordering**
- No login required
- Quick cart system
- Table-based ordering

### **✅ Multi-Language**
- Amharic (አማርኛ)
- English
- Easy toggle

### **✅ Role-Based Access**
- 5 different roles
- Custom dashboards
- Access control

### **✅ Real-Time Updates**
- Live order status
- Kitchen queue
- Payment tracking

### **✅ Ethiopian Menu**
- 23 authentic dishes
- Traditional categories
- Amharic names

### **✅ Complete Management**
- Staff management
- Inventory tracking
- Payment processing
- Reports & analytics

---

## 🚀 GETTING STARTED

### **Never Used Before?**

1. **Read:** `QUICK_START_GUIDE.md`
2. **Start:** MySQL → Backend → Frontend
3. **Test:** Open http://localhost:3000
4. **Order:** Go to Menu → Add to Cart → Place Order

### **Having Problems?**

1. **Check:** Is MySQL running? (XAMPP green)
2. **Read:** `FIX_SYSTEM_NOT_RESPONDING.md`
3. **Run:** `CHECK_SYSTEM.bat`
4. **Test:** http://127.0.0.1:8000/api/health

### **Want to Learn More?**

1. **Architecture:** `SYSTEM_ARCHITECTURE.md`
2. **Menu Details:** `ETHIOPIAN_MENU.md`
3. **Dashboards:** `DASHBOARDS_IMPLEMENTATION.md`

---

## 📞 NEED HELP?

### **Step 1: Check Documentation**
- Read the relevant `.md` file above
- Most issues are covered

### **Step 2: Run Diagnostics**
- Run `CHECK_SYSTEM.bat`
- Check browser console (F12)

### **Step 3: Verify Basics**
- Is MySQL green in XAMPP?
- Are both servers running?
- Did you hard refresh? (Ctrl+Shift+R)

---

## 🎊 YOU'RE READY!

**Everything you need is in this folder:**

📄 **Quick Start:** `QUICK_START_GUIDE.md`
🔧 **Fix Issues:** `FIX_SYSTEM_NOT_RESPONDING.md`
📚 **Learn System:** `SYSTEM_ARCHITECTURE.md`
🍽️ **See Menu:** `ETHIOPIAN_MENU.md`

**Start the system and enjoy!** 🇪🇹

---

## 🌟 QUICK REFERENCE

**Start System:**
```
1. XAMPP → Start MySQL
2. Double-click START_BACKEND.bat
3. Double-click START_FRONTEND.bat
4. Open http://localhost:3000
```

**Check System:**
```
Double-click CHECK_SYSTEM.bat
```

**Fix Issues:**
```
Read FIX_SYSTEM_NOT_RESPONDING.md
```

---

**Built with ❤️ for Betesida Restaurant**

**ቤተ ሳይዳ ሬስቶራንት** 🇪🇹🍽️

**Enjoy your restaurant management system!** 🎉
