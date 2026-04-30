# ⚡ RUN THIS NOW - UPDATE CREDENTIALS

## 🎯 YOUR CREDENTIALS ARE READY!

All users are configured with simple credentials:

```
Username: manager   Password: 1234
Username: cashier   Password: 1234
Username: chef      Password: 1234
Username: waiter    Password: 1234
Username: customer  Password: 1234
```

---

## 🚀 APPLY CHANGES NOW (2 Steps)

### **STEP 1: Make Sure MySQL is Running** ⭐

1. Open **XAMPP Control Panel**
2. Look at **MySQL** row
3. Should be **GREEN** "Running"
4. If not, click **"Start"**

✅ **MySQL must be GREEN before continuing!**

---

### **STEP 2: Update Database** 🔄

**Choose ONE method:**

#### **Method A: Double-Click This File** (Easiest!)

Find and double-click:
```
UPDATE_DATABASE.bat
```

That's it! Wait for it to complete.

---

#### **Method B: Copy-Paste Command** (Alternative)

1. Open **Command Prompt** or **PowerShell**
2. Copy and paste this:

```bash
cd C:\xampp_new\htdocs\resturant system\backend
C:\xampp_new\php\php.exe artisan migrate:fresh --seed
```

3. Press **Enter**
4. Wait for completion

---

## ✅ YOU'LL SEE THIS:

```
Dropped all tables successfully.
Migration table created successfully.
Migrating: 2024_01_01_000000_create_users_table
Migrated:  2024_01_01_000000_create_users_table
...
Database seeding completed successfully.
```

**✅ Success!** Credentials are now active!

---

## 🧪 TEST IT NOW

1. **Start servers** (if not running):
   - Double-click `START_BACKEND.bat`
   - Double-click `START_FRONTEND.bat`

2. **Open browser:**
   ```
   http://localhost:3000/login
   ```

3. **Login as Manager:**
   ```
   Username: manager
   Password: 1234
   ```

4. **Click Login**

5. **Should see:** Manager Dashboard ✅

---

## 🎉 ALL USERS READY

**Test each one:**

```
✓ manager  / 1234  → Manager Dashboard
✓ cashier  / 1234  → Cashier Dashboard
✓ chef     / 1234  → Chef Dashboard
✓ waiter   / 1234  → Waiter Dashboard
✓ customer / 1234  → Customer Dashboard
```

---

## ⚠️ IMPORTANT

- **MySQL must be running** (GREEN in XAMPP)
- **This will delete old data** (fresh start)
- **Menu items will be recreated** (23 Ethiopian dishes)
- **Takes about 30 seconds**

---

## 🎊 THAT'S IT!

**Just 2 steps:**
1. ✅ MySQL running (GREEN)
2. ✅ Run `UPDATE_DATABASE.bat`

**Then login with:**
- Username: **manager**
- Password: **1234**

**Simple!** 🇪🇹🍽️

---

**ቤተ ሳይዳ ሬስቶራንት - Betesida Restaurant**
