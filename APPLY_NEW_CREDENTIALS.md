# 🔄 APPLY NEW CREDENTIALS - STEP BY STEP

## 🎯 GOAL
Change all user credentials to simple usernames and password "1234"

---

## ✅ WHAT YOU NEED

- [ ] MySQL running in XAMPP (GREEN status)
- [ ] Backend folder accessible
- [ ] 2 minutes of time

---

## 📋 STEP-BY-STEP GUIDE

### **STEP 1: Check MySQL is Running** ⭐

1. Open **XAMPP Control Panel**
2. Look at **MySQL** row
3. Should be **GREEN** with "Running" status
4. If not, click **"Start"**

**✅ Success:** MySQL is green

---

### **STEP 2: Update Database** 🔄

**Choose ONE method:**

#### **Method A: Easy Way (Recommended)**

1. Find file: **`UPDATE_DATABASE.bat`**
2. **Double-click** it
3. Press any key when prompted
4. Wait for completion
5. Done! ✅

#### **Method B: Command Line**

1. Open **Command Prompt** or **PowerShell**
2. Navigate to backend:
   ```bash
   cd C:\xampp_new\htdocs\resturant system\backend
   ```
3. Run update command:
   ```bash
   C:\xampp_new\php\php.exe artisan migrate:fresh --seed
   ```
4. Wait for completion
5. Done! ✅

---

### **STEP 3: Verify Update** ✅

**Check the output:**

You should see:
```
Dropped all tables successfully.
Migration table created successfully.
Migrating: 2024_01_01_000000_create_users_table
Migrated:  2024_01_01_000000_create_users_table
...
Database seeding completed successfully.
```

**✅ Success:** No errors, "completed successfully"

---

### **STEP 4: Test Login** 🧪

1. **Make sure servers are running:**
   - Backend: `START_BACKEND.bat`
   - Frontend: `START_FRONTEND.bat`

2. **Open browser:**
   ```
   http://localhost:3000/login
   ```

3. **Try Manager login:**
   - Username: **manager**
   - Password: **1234**
   - Click **Login**

4. **Should see:** Manager Dashboard ✅

---

### **STEP 5: Test All Users** 👥

Try logging in with each user:

**Manager:**
```
Username: manager
Password: 1234
✅ Should see: Manager Dashboard
```

**Cashier:**
```
Username: cashier
Password: 1234
✅ Should see: Cashier Dashboard
```

**Chef:**
```
Username: chef
Password: 1234
✅ Should see: Chef Dashboard
```

**Waiter:**
```
Username: waiter
Password: 1234
✅ Should see: Waiter Dashboard
```

**Customer:**
```
Username: customer
Password: 1234
✅ Should see: Customer Dashboard
```

---

## 🎉 SUCCESS INDICATORS

**You'll know it worked when:**

✅ Command completed without errors
✅ Can login with username "manager"
✅ Password "1234" works
✅ Redirects to correct dashboard
✅ All 5 users can login

---

## ❌ TROUBLESHOOTING

### **Problem 1: MySQL Connection Error**

**Error:**
```
SQLSTATE[HY000] [2002] Connection refused
```

**Solution:**
1. Open XAMPP Control Panel
2. Start MySQL (must be GREEN)
3. Run update command again

---

### **Problem 2: Artisan Not Found**

**Error:**
```
Could not open input file: artisan
```

**Solution:**
```bash
# Make sure you're in backend folder
cd C:\xampp_new\htdocs\resturant system\backend

# Check if artisan exists
dir artisan

# Then run command
C:\xampp_new\php\php.exe artisan migrate:fresh --seed
```

---

### **Problem 3: Can't Login After Update**

**Symptoms:**
- Enter "manager" and "1234"
- Says "Invalid credentials"

**Solutions:**

1. **Clear browser cache:**
   - Press **Ctrl + Shift + R**
   - Try login again

2. **Check if update ran:**
   - Run `UPDATE_DATABASE.bat` again
   - Make sure it completes successfully

3. **Check backend is running:**
   - Backend terminal should show "Server running"
   - Test: http://127.0.0.1:8000/api/health

4. **Try different user:**
   - Username: **chef**
   - Password: **1234**

---

### **Problem 4: Old Credentials Still Work**

**Symptoms:**
- Can still login with "manager@restaurant.com"
- New credentials don't work

**Solution:**
- Database wasn't updated
- Run `UPDATE_DATABASE.bat` again
- Make sure MySQL is running first

---

## 📊 BEFORE vs AFTER

### **BEFORE UPDATE:**

| Role | Email | Password |
|------|-------|----------|
| Manager | manager@restaurant.com | password |
| Cashier | cashier@restaurant.com | password |
| Chef | chef@restaurant.com | password |
| Waiter | waiter@restaurant.com | password |
| Customer | customer@restaurant.com | password |

### **AFTER UPDATE:**

| Role | Username | Password |
|------|----------|----------|
| Manager | manager | 1234 |
| Cashier | cashier | 1234 |
| Chef | chef | 1234 |
| Waiter | waiter | 1234 |
| Customer | customer | 1234 |

**Much simpler!** ✅

---

## 🔍 VERIFICATION CHECKLIST

After update, verify:

- [ ] Command completed successfully
- [ ] No error messages
- [ ] Backend server is running
- [ ] Frontend server is running
- [ ] Can access http://localhost:3000/login
- [ ] Can login with "manager" / "1234"
- [ ] Redirects to Manager Dashboard
- [ ] Can logout and login with other users
- [ ] All 5 users work with password "1234"

**If all checked: SUCCESS!** 🎉

---

## 💡 TIPS

### **Tip 1: Remember the Pattern**
- Username = role name (lowercase)
- Password = always 1234

### **Tip 2: No @ Symbol**
- Old: manager@restaurant.com
- New: manager (no @ symbol)

### **Tip 3: Same Password**
- All users have password: 1234
- Easy to remember!

### **Tip 4: Fresh Start**
- Update deletes all old data
- Gives you clean database
- Good for testing

---

## 🚀 QUICK COMMAND REFERENCE

### **Update Database:**
```bash
cd backend
C:\xampp_new\php\php.exe artisan migrate:fresh --seed
```

### **Check Database:**
```bash
C:\xampp_new\php\php.exe artisan tinker
>>> User::all()->pluck('email', 'role');
```

### **Test Backend:**
```bash
curl http://127.0.0.1:8000/api/health
```

---

## 📞 NEED HELP?

1. **Check MySQL is running** (XAMPP green status)
2. **Run UPDATE_DATABASE.bat** again
3. **Clear browser cache** (Ctrl+Shift+R)
4. **Restart servers** (backend and frontend)
5. **Read troubleshooting section** above

---

## ✅ FINAL CHECK

**Test this exact sequence:**

1. ✅ MySQL running in XAMPP
2. ✅ Run `UPDATE_DATABASE.bat`
3. ✅ See "completed successfully"
4. ✅ Start backend: `START_BACKEND.bat`
5. ✅ Start frontend: `START_FRONTEND.bat`
6. ✅ Open: http://localhost:3000/login
7. ✅ Enter: manager / 1234
8. ✅ Click Login
9. ✅ See Manager Dashboard

**If all steps work: PERFECT!** 🎉

---

## 🎊 YOU'RE DONE!

**New credentials are active:**

```
manager  / 1234
cashier  / 1234
chef     / 1234
waiter   / 1234
customer / 1234
```

**Simple, easy, ready to use!** 🇪🇹🍽️

---

**ቤተ ሳይዳ ሬስቶራንት - Betesida Restaurant**
