# 🔍 Debug: Cart Not Working

## 🎯 How to Check What's Wrong

### **Step 1: Open Browser Console**

1. Open the website: http://localhost:3000/menu
2. Press **F12** on keyboard (or right-click → Inspect)
3. Click **Console** tab
4. Keep it open

### **Step 2: Try Adding to Cart**

1. Click "+ Add to Cart" button on any food item
2. Watch the Console tab

### **Step 3: What Should You See?**

**✅ If Working:**
```
Adding to cart: {id: 1, name: "ዶሮ ወጥ (Doro Wot)", ...}
Added new item to cart: {menu_item_id: 1, name: "ዶሮ ወጥ (Doro Wot)", ...}
```
- Cart button should show: 🛒 Cart (1)

**❌ If Not Working:**
You might see:
- Red error messages
- Nothing happens
- Button doesn't respond

---

## 🔧 Common Issues & Fixes

### **Issue 1: Button Doesn't Respond**

**Symptoms:**
- Click button, nothing happens
- No console logs
- Cart count stays at (0)

**Fix:**
1. Hard refresh: **Ctrl + Shift + R**
2. Clear cache: **Ctrl + Shift + Delete**
3. Close and reopen browser

---

### **Issue 2: JavaScript Error**

**Symptoms:**
- Red error in console
- Says "undefined" or "cannot read property"

**Fix:**
1. Check if menu items loaded
2. Go to: http://localhost:3000/menu
3. Do you see food items?
4. If NO items show, backend issue

---

### **Issue 3: Items Show But Can't Add**

**Symptoms:**
- Food items display correctly
- Button visible but doesn't work
- No console logs

**Fix:**
1. Check if button is clickable
2. Try clicking different items
3. Check browser console for errors

---

## 🧪 Manual Test

### **Test 1: Check Menu Items Load**

Open: http://localhost:3000/menu

**Should see:**
- Ethiopian food items with names
- Prices in Birr
- Category filters
- "+ Add to Cart" buttons

**If you DON'T see items:**
- Backend not running
- MySQL not running
- Database empty

---

### **Test 2: Check Cart Button**

Look at top right of menu page.

**Should see:**
- 🛒 Cart (0) button
- Orange/yellow color
- Clickable

**Click it:**
- Should open modal
- Shows "Your cart is empty"

---

### **Test 3: Add Item**

1. Click "+ Add to Cart" on **ዶሮ ወጥ (Doro Wot)**
2. Cart button should change to: 🛒 Cart (1)
3. Click cart button
4. Should see Doro Wot in cart

---

## 📸 What to Check

### **1. Are Menu Items Showing?**
- [ ] Yes, I see Ethiopian food
- [ ] No, page is empty

### **2. Is Cart Button Visible?**
- [ ] Yes, I see 🛒 Cart (0)
- [ ] No, I don't see it

### **3. Can You Click Add to Cart?**
- [ ] Yes, button responds
- [ ] No, nothing happens

### **4. Any Errors in Console?**
- [ ] Yes, red errors
- [ ] No errors

---

## 🚨 Quick Fixes

### **Fix 1: Restart Everything**

```bash
# Stop servers (Ctrl+C in terminals)

# Restart Backend
cd backend
C:\xampp_new\php\php.exe artisan serve --host=127.0.0.1 --port=8000

# Restart Frontend (new terminal)
cd frontend
npm run dev
```

### **Fix 2: Clear Browser Cache**

1. Press **Ctrl + Shift + Delete**
2. Select "Cached images and files"
3. Click "Clear data"
4. Refresh page: **Ctrl + F5**

### **Fix 3: Check MySQL**

1. Open XAMPP Control Panel
2. MySQL should show green "Running"
3. If not, click "Start"

---

## 📋 Checklist

Before reporting issue, verify:

- [ ] Backend running: http://127.0.0.1:8000/api/health
- [ ] Frontend running: http://localhost:3000/
- [ ] MySQL running in XAMPP (green status)
- [ ] Menu items visible on page
- [ ] Cart button visible at top
- [ ] Browser console open (F12)
- [ ] Tried hard refresh (Ctrl + Shift + R)

---

## 🎯 Expected Behavior

### **When You Click "+ Add to Cart":**

1. **Console shows:** "Adding to cart: ..."
2. **Cart button updates:** 🛒 Cart (0) → 🛒 Cart (1)
3. **Button gives feedback:** Slight animation
4. **Item added to cart**

### **When You Click Cart Button:**

1. **Modal opens**
2. **Shows your items**
3. **Can adjust quantity**
4. **Can add notes**
5. **Can place order**

---

## 📞 Report Issue

If still not working, provide:

1. **Screenshot of menu page**
2. **Screenshot of browser console (F12)**
3. **What happens when you click button**
4. **Any error messages**

---

## ✅ Success Test

**Cart is working if:**
- ✅ Click "+ Add to Cart"
- ✅ Cart count increases: (0) → (1)
- ✅ Click cart button
- ✅ See item in cart
- ✅ Can adjust quantity
- ✅ Can place order

**If all ✅, cart is working perfectly!** 🎉
