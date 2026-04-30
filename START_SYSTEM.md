# 🚀 START THE RESTAURANT SYSTEM - COMPLETE GUIDE

## ⚠️ CRITICAL: MySQL Must Be Running!

**The #1 reason the system doesn't work is MySQL not running in XAMPP.**

---

## 📋 STEP-BY-STEP STARTUP (5 Minutes)

### **STEP 1: Start MySQL in XAMPP** ⭐ MOST IMPORTANT!

1. **Open XAMPP Control Panel**
   - Location: `C:\xampp_new\xampp-control.exe`
   - Or search "XAMPP" in Windows Start menu

2. **Start MySQL**
   - Find the "MySQL" row
   - Click the **"Start"** button
   - Wait until it shows **green "Running"** status
   - Port should show: **3306**

3. **Verify MySQL is Running**
   - MySQL row should be **highlighted in green**
   - Status should say **"Running"**
   - If you see red or stopped, click "Start" again

**⚠️ If MySQL won't start:**
- Port 3306 might be in use
- Check if another MySQL is running
- Restart XAMPP as Administrator

---

### **STEP 2: Start Backend Server**

Open **Command Prompt** or **PowerShell**:

```bash
cd C:\xampp_new\htdocs\resturant system\backend
C:\xampp_new\php\php.exe artisan serve --host=127.0.0.1 --port=8000
```

**✅ Success looks like:**
```
INFO  Server running on [http://127.0.0.1:8000].
Press Ctrl+C to stop the server
```

**Keep this terminal open!** Don't close it.

---

### **STEP 3: Test Backend Connection**

Open browser and go to:
```
http://127.0.0.1:8000/api/health
```

**✅ Should see:**
```json
{
  "status": "ok",
  "message": "Restaurant API is running"
}
```

**❌ If you see error:**
- Check if MySQL is running (green in XAMPP)
- Check backend terminal for errors
- See troubleshooting section below

---

### **STEP 4: Test Menu Items**

Go to:
```
http://127.0.0.1:8000/api/menu-items
```

**✅ Should see:** JSON array with 23 Ethiopian food items

**❌ If empty array `[]`:**
- Database needs seeding
- Run: `C:\xampp_new\php\php.exe artisan db:seed`

---

### **STEP 5: Start Frontend Server**

Open **NEW** Command Prompt or PowerShell:

```bash
cd C:\xampp_new\htdocs\resturant system\frontend
npm run dev
```

**✅ Success looks like:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

**Keep this terminal open too!**

---

### **STEP 6: Open the Website**

Open browser:
```
http://localhost:3000
```

**✅ Should see:**
- Betesida Restaurant homepage
- Navigation: Home | Menu | Login
- Backend Status: **ok**

---

### **STEP 7: Test Guest Ordering**

1. **Click "Menu"** in navigation
2. **Should see:** 23 Ethiopian dishes with Amharic names
3. **Click "+ Add to Cart"** on any item
4. **Cart button should update:** 🛒 Cart (0) → 🛒 Cart (1)
5. **Click cart button** to view cart
6. **Enter table number:** 1-10
7. **Click "Place Order"**
8. **Should see:** ✅ Success message

---

## 🔍 TROUBLESHOOTING

### **Problem 1: MySQL Won't Start**

**Error:** "Port 3306 in use" or MySQL stays red

**Solutions:**
1. **Check if another MySQL is running:**
   - Open Task Manager (Ctrl+Shift+Esc)
   - Look for "mysqld.exe"
   - End task if found
   - Try starting XAMPP MySQL again

2. **Run XAMPP as Administrator:**
   - Right-click `xampp-control.exe`
   - Select "Run as administrator"
   - Try starting MySQL

3. **Change MySQL port:**
   - In XAMPP, click "Config" next to MySQL
   - Select "my.ini"
   - Change port from 3306 to 3307
   - Update `backend/.env`: `DB_PORT=3307`
   - Restart MySQL

---

### **Problem 2: Backend Shows "Connection Refused"**

**Error in terminal:**
```
SQLSTATE[HY000] [2002] No connection could be made because the target machine actively refused it
```

**This means MySQL is NOT running!**

**Fix:**
1. Go to XAMPP Control Panel
2. Start MySQL (must show green "Running")
3. Restart backend server (Ctrl+C, then run command again)

---

### **Problem 3: Menu Items Not Loading**

**Symptoms:**
- Menu page is empty
- No food items show
- Just categories

**Fix:**
```bash
cd backend
C:\xampp_new\php\php.exe artisan db:seed
```

This will add 23 Ethiopian dishes to database.

---

### **Problem 4: Buttons Not Clickable**

**Symptoms:**
- Can't click "+ Add to Cart"
- Buttons don't respond

**Fix:**
1. **Hard refresh:** Press **Ctrl + Shift + R**
2. **Clear cache:** Press **Ctrl + Shift + Delete**
3. **Check console:** Press **F12**, look for errors

---

### **Problem 5: Can't Place Order**

**Symptoms:**
- Cart works but order fails
- Error message when clicking "Place Order"

**Check:**
1. **MySQL running?** (XAMPP green status)
2. **Backend running?** (Terminal still open)
3. **Table number entered?** (Must be 1-10)
4. **Browser console errors?** (Press F12)

---

## 📊 System Status Checklist

Before testing, verify all these:

- [ ] **XAMPP MySQL:** Green "Running" status
- [ ] **Backend Terminal:** Shows "Server running on [http://127.0.0.1:8000]"
- [ ] **Frontend Terminal:** Shows "Local: http://localhost:3000/"
- [ ] **Backend Health:** http://127.0.0.1:8000/api/health shows "ok"
- [ ] **Menu Items:** http://127.0.0.1:8000/api/menu-items shows 23 items
- [ ] **Frontend:** http://localhost:3000 loads homepage

---

## 🎯 Quick Test Flow

### **Complete Order Test (2 minutes):**

1. ✅ Open: http://localhost:3000
2. ✅ Click "Menu"
3. ✅ See Ethiopian food items
4. ✅ Click "+ Add to Cart" on "ዶሮ ወጥ (Doro Wot)"
5. ✅ Cart shows: 🛒 Cart (1)
6. ✅ Click cart button
7. ✅ See Doro Wot in cart
8. ✅ Enter table number: 5
9. ✅ Click "Place Order"
10. ✅ See success message: "Order placed successfully!"

**If all steps work: System is fully functional!** 🎉

---

## 🔧 Common Errors & Solutions

### **Error: "Class 'ZipArchive' not found"**
```bash
# Enable ZIP extension
1. Open: C:\xampp_new\php\php.ini
2. Find: ;extension=zip
3. Change to: extension=zip
4. Save and restart backend
```

### **Error: "No application encryption key"**
```bash
cd backend
C:\xampp_new\php\php.exe artisan key:generate
```

### **Error: "Table 'restaurant_system.users' doesn't exist"**
```bash
cd backend
C:\xampp_new\php\php.exe artisan migrate
C:\xampp_new\php\php.exe artisan db:seed
```

### **Error: "CORS policy blocked"**
- Backend must run on port 8000
- Frontend must run on port 3000
- Check `backend/config/cors.php`

---

## 💡 Pro Tips

### **Tip 1: Keep Terminals Open**
- Don't close backend terminal
- Don't close frontend terminal
- Both must stay running

### **Tip 2: Check MySQL First**
- Always verify MySQL is green in XAMPP
- This is the #1 cause of issues

### **Tip 3: Hard Refresh**
- After code changes: Ctrl + Shift + R
- Clears cached CSS/JS

### **Tip 4: Browser Console**
- Press F12 to see errors
- Console tab shows JavaScript errors
- Network tab shows API calls

---

## 🎉 SUCCESS INDICATORS

**System is working when:**

✅ **XAMPP:** MySQL shows green "Running"
✅ **Backend:** Terminal shows "Server running"
✅ **Frontend:** Terminal shows "Local: http://localhost:3000"
✅ **Health Check:** Returns `{"status":"ok"}`
✅ **Menu Items:** Shows 23 Ethiopian dishes
✅ **Homepage:** Loads with navigation
✅ **Menu Page:** Shows food items with prices
✅ **Add to Cart:** Button works, cart count increases
✅ **Place Order:** Success message appears

---

## 📞 Still Not Working?

If you've tried everything and it still doesn't work:

1. **Take screenshots of:**
   - XAMPP Control Panel (MySQL status)
   - Backend terminal
   - Frontend terminal
   - Browser console (F12)
   - Any error messages

2. **Check these URLs:**
   - http://127.0.0.1:8000/api/health
   - http://127.0.0.1:8000/api/menu-items
   - http://localhost:3000

3. **Provide this info:**
   - What step failed?
   - What error message?
   - Is MySQL green in XAMPP?

---

## 🚀 QUICK START COMMANDS

**Copy and paste these:**

```bash
# Terminal 1: Start Backend
cd C:\xampp_new\htdocs\resturant system\backend
C:\xampp_new\php\php.exe artisan serve --host=127.0.0.1 --port=8000

# Terminal 2: Start Frontend
cd C:\xampp_new\htdocs\resturant system\frontend
npm run dev
```

**Then open:** http://localhost:3000

---

## ✅ FINAL CHECKLIST

Before asking for help, verify:

- [ ] MySQL is green and running in XAMPP
- [ ] Backend terminal is open and shows "Server running"
- [ ] Frontend terminal is open and shows "Local: http://localhost:3000"
- [ ] http://127.0.0.1:8000/api/health returns "ok"
- [ ] http://127.0.0.1:8000/api/menu-items shows items
- [ ] http://localhost:3000 loads the homepage
- [ ] Tried hard refresh (Ctrl + Shift + R)
- [ ] Checked browser console for errors (F12)

---

## 🎊 YOU'RE READY!

**Follow the steps above and your restaurant system will be running!**

**Main URL:** http://localhost:3000

**Enjoy your Ethiopian restaurant management system!** 🇪🇹🍽️
