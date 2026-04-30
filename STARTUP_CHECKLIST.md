# ✅ STARTUP CHECKLIST - Betesida Restaurant

## 🎯 USE THIS EVERY TIME YOU START THE SYSTEM

---

## 📋 PRE-START CHECKLIST

Before starting, verify:

- [ ] **XAMPP is installed** at `C:\xampp_new\`
- [ ] **Project folder** is at `C:\xampp_new\htdocs\resturant system\`
- [ ] **No other programs** using port 3000, 3306, or 8000
- [ ] **Browser is ready** (Chrome, Firefox, or Edge)

---

## 🚀 STARTUP SEQUENCE

### **STEP 1: START MYSQL** ⭐ MOST IMPORTANT!

- [ ] Open **XAMPP Control Panel**
- [ ] Find **MySQL** row
- [ ] Click **"Start"** button
- [ ] Wait for **GREEN** status
- [ ] Verify it says **"Running"**
- [ ] Port shows **3306**

**✅ Success:** MySQL row is GREEN with "Running" status

**❌ Failed:** See troubleshooting section below

---

### **STEP 2: START BACKEND**

- [ ] Double-click **`START_BACKEND.bat`**
- [ ] Wait for terminal to open
- [ ] See message: **"Server running on [http://127.0.0.1:8000]"**
- [ ] Keep terminal **OPEN** (don't close it!)

**✅ Success:** Terminal shows "Server running"

**❌ Failed:** See troubleshooting section below

---

### **STEP 3: VERIFY BACKEND**

- [ ] Open browser
- [ ] Go to: **http://127.0.0.1:8000/api/health**
- [ ] See: **`{"status":"ok","message":"Restaurant API is running"}`**

**✅ Success:** JSON response with "ok" status

**❌ Failed:** See troubleshooting section below

---

### **STEP 4: CHECK MENU ITEMS**

- [ ] In browser, go to: **http://127.0.0.1:8000/api/menu-items**
- [ ] See: **Long JSON array with 23 items**
- [ ] First item should be: **"ዶሮ ወጥ (Doro Wot)"**

**✅ Success:** 23 Ethiopian dishes in JSON

**❌ Failed:** Run `cd backend && C:\xampp_new\php\php.exe artisan db:seed`

---

### **STEP 5: START FRONTEND**

- [ ] Double-click **`START_FRONTEND.bat`**
- [ ] Wait for terminal to open
- [ ] See message: **"Local: http://localhost:3000/"**
- [ ] Keep terminal **OPEN** (don't close it!)

**✅ Success:** Terminal shows "Local: http://localhost:3000/"

**❌ Failed:** See troubleshooting section below

---

### **STEP 6: VERIFY FRONTEND**

- [ ] Open browser
- [ ] Go to: **http://localhost:3000**
- [ ] See: **"ቤተ ሳይዳ ሬስቶራንት" (Betesida Restaurant)**
- [ ] See navigation: **Home | Menu | Login**
- [ ] See: **"Backend Status: ok"**

**✅ Success:** Homepage loads with navigation

**❌ Failed:** See troubleshooting section below

---

### **STEP 7: TEST MENU PAGE**

- [ ] Click **"Menu"** in navigation
- [ ] See: **23 Ethiopian dishes**
- [ ] See categories: **ወጥ, ጥብስ, ጾም, መጠጦች**
- [ ] See prices in **Birr**
- [ ] See **"+ Add to Cart"** buttons

**✅ Success:** Menu page shows all dishes

**❌ Failed:** Hard refresh (Ctrl+Shift+R) and try again

---

### **STEP 8: TEST ADD TO CART**

- [ ] Click **"+ Add to Cart"** on **"ዶሮ ወጥ (Doro Wot)"**
- [ ] Cart button updates: **🛒 Cart (0) → 🛒 Cart (1)**
- [ ] Button gives visual feedback (color change)
- [ ] No errors in console (press F12 to check)

**✅ Success:** Cart count increases

**❌ Failed:** See "Buttons Not Clickable" troubleshooting

---

### **STEP 9: TEST CART MODAL**

- [ ] Click **🛒 Cart** button
- [ ] Modal opens
- [ ] See: **"Your Order"** heading
- [ ] See: **Doro Wot** in cart
- [ ] See: **Quantity controls** (- and +)
- [ ] See: **Table number input**
- [ ] See: **"Place Order"** button

**✅ Success:** Cart modal shows item

**❌ Failed:** Check browser console for errors

---

### **STEP 10: TEST ORDER PLACEMENT**

- [ ] In cart modal, enter **table number: 5**
- [ ] Click **"Place Order"** button
- [ ] See: **"✅ Order placed successfully!"** message
- [ ] Cart clears automatically
- [ ] Modal closes
- [ ] Cart button resets: **🛒 Cart (0)**

**✅ Success:** Order placed, success message shown

**❌ Failed:** See "Can't Place Order" troubleshooting

---

## 🎉 SYSTEM IS READY!

**If all 10 steps passed: Your system is fully operational!**

You can now:
- ✅ Take guest orders
- ✅ Login as staff
- ✅ Use dashboards
- ✅ Process payments
- ✅ Manage inventory

---

## ❌ TROUBLESHOOTING

### **STEP 1 FAILED: MySQL Won't Start**

**Problem:** MySQL button stays gray or shows error

**Solutions:**

1. **Port in use:**
   - [ ] Open Task Manager (Ctrl+Shift+Esc)
   - [ ] Find "mysqld.exe"
   - [ ] End task
   - [ ] Try starting MySQL again

2. **Run as Administrator:**
   - [ ] Close XAMPP
   - [ ] Right-click `xampp-control.exe`
   - [ ] Select "Run as administrator"
   - [ ] Try starting MySQL

3. **Restart computer:**
   - [ ] Restart Windows
   - [ ] Open XAMPP
   - [ ] Try starting MySQL

---

### **STEP 2 FAILED: Backend Won't Start**

**Problem:** Terminal shows error or closes immediately

**Check:**

1. **MySQL running?**
   - [ ] Go back to STEP 1
   - [ ] Make sure MySQL is GREEN

2. **Port 8000 in use?**
   - [ ] Close any other programs using port 8000
   - [ ] Try again

3. **PHP path correct?**
   - [ ] Check if `C:\xampp_new\php\php.exe` exists
   - [ ] If not, update path in `START_BACKEND.bat`

---

### **STEP 3 FAILED: Backend Health Check Fails**

**Problem:** http://127.0.0.1:8000/api/health shows error

**Solutions:**

1. **Connection refused:**
   - [ ] Backend not running
   - [ ] Go back to STEP 2

2. **MySQL connection error:**
   - [ ] MySQL not running
   - [ ] Go back to STEP 1
   - [ ] Restart backend after MySQL is green

3. **500 Internal Server Error:**
   - [ ] Check `backend/storage/logs/laravel.log`
   - [ ] Look for error message
   - [ ] Fix the error

---

### **STEP 4 FAILED: No Menu Items**

**Problem:** API returns empty array `[]`

**Solution:**

```bash
cd backend
C:\xampp_new\php\php.exe artisan db:seed
```

This will add 23 Ethiopian dishes to database.

---

### **STEP 5 FAILED: Frontend Won't Start**

**Problem:** Terminal shows error

**Solutions:**

1. **Port 3000 in use:**
   - [ ] Close any other programs using port 3000
   - [ ] Try again

2. **Dependencies not installed:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Node.js not installed:**
   - [ ] Install Node.js from nodejs.org
   - [ ] Try again

---

### **STEP 6 FAILED: Frontend Doesn't Load**

**Problem:** http://localhost:3000 shows error

**Solutions:**

1. **Backend not running:**
   - [ ] Go back to STEP 2
   - [ ] Make sure backend is running

2. **CORS error:**
   - [ ] Check browser console (F12)
   - [ ] Make sure backend is on port 8000
   - [ ] Make sure frontend is on port 3000

3. **Hard refresh:**
   - [ ] Press Ctrl + Shift + R
   - [ ] Clear cache
   - [ ] Try again

---

### **STEP 8 FAILED: Buttons Not Clickable**

**Problem:** Can't click "+ Add to Cart"

**Solutions:**

1. **Hard refresh:**
   - [ ] Press **Ctrl + Shift + R**
   - [ ] Try clicking again

2. **Clear cache:**
   - [ ] Press **Ctrl + Shift + Delete**
   - [ ] Select "Cached images and files"
   - [ ] Click "Clear data"
   - [ ] Refresh page

3. **Check console:**
   - [ ] Press **F12**
   - [ ] Go to Console tab
   - [ ] Look for errors
   - [ ] Fix errors

---

### **STEP 10 FAILED: Can't Place Order**

**Problem:** Order fails when clicking "Place Order"

**Check:**

1. **Table number entered?**
   - [ ] Must enter a number
   - [ ] Must be between 1-10

2. **MySQL running?**
   - [ ] Check XAMPP
   - [ ] MySQL must be GREEN

3. **Backend running?**
   - [ ] Check backend terminal
   - [ ] Must show "Server running"

4. **Console errors?**
   - [ ] Press F12
   - [ ] Check Console tab
   - [ ] Look for error messages

---

## 🔄 RESTART PROCEDURE

**If something goes wrong, restart everything:**

### **1. Stop Everything:**
- [ ] Press **Ctrl+C** in backend terminal
- [ ] Press **Ctrl+C** in frontend terminal
- [ ] Click **"Stop"** next to MySQL in XAMPP

### **2. Wait 10 seconds**

### **3. Start Again:**
- [ ] Start MySQL (STEP 1)
- [ ] Start Backend (STEP 2)
- [ ] Start Frontend (STEP 5)

---

## 📊 QUICK STATUS CHECK

**Run this anytime to check system status:**

Double-click: **`CHECK_SYSTEM.bat`**

It will show:
- ✅ MySQL status
- ✅ Backend status
- ✅ Menu items count

---

## 💡 PRO TIPS

### **Tip 1: Save This Checklist**
Bookmark this file and use it every time you start the system.

### **Tip 2: Check MySQL First**
90% of issues are because MySQL is not running.

### **Tip 3: Keep Terminals Open**
Don't close backend or frontend terminals while using the system.

### **Tip 4: Hard Refresh Often**
After any changes, press Ctrl + Shift + R.

### **Tip 5: Use CHECK_SYSTEM.bat**
Run it to quickly diagnose issues.

---

## 📞 STILL STUCK?

If you've gone through this checklist and still have issues:

1. **Take screenshots of:**
   - [ ] XAMPP Control Panel
   - [ ] Backend terminal
   - [ ] Frontend terminal
   - [ ] Browser console (F12)
   - [ ] Any error messages

2. **Check these files:**
   - [ ] `backend/storage/logs/laravel.log`
   - [ ] Browser console (F12)

3. **Read these guides:**
   - [ ] `FIX_SYSTEM_NOT_RESPONDING.md`
   - [ ] `START_SYSTEM.md`
   - [ ] `QUICK_START_GUIDE.md`

---

## ✅ FINAL VERIFICATION

**System is fully operational when ALL of these are true:**

- [ ] XAMPP MySQL is GREEN with "Running" status
- [ ] Backend terminal shows "Server running on [http://127.0.0.1:8000]"
- [ ] Frontend terminal shows "Local: http://localhost:3000/"
- [ ] http://127.0.0.1:8000/api/health returns `{"status":"ok"}`
- [ ] http://127.0.0.1:8000/api/menu-items returns 23 items
- [ ] http://localhost:3000 loads homepage
- [ ] Menu page shows 23 Ethiopian dishes
- [ ] Can add items to cart
- [ ] Cart count increases
- [ ] Can open cart modal
- [ ] Can place order successfully

**If ALL checked: SYSTEM IS PERFECT!** 🎉

---

## 🎊 YOU'RE DONE!

**Your Betesida Restaurant System is now running!**

**Main URL:** http://localhost:3000

**Enjoy!** 🇪🇹🍽️

---

**Print this checklist and keep it handy!**

**ቤተ ሳይዳ ሬስቶራንት - Betesida Restaurant** ❤️
