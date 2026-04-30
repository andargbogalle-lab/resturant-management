# 🔑 UPDATED LOGIN CREDENTIALS

## ✅ NEW SIMPLE CREDENTIALS

All users now have **simple usernames** and the **same password: 1234**

---

## 👥 LOGIN CREDENTIALS

| Role | Username | Password |
|------|----------|----------|
| **Manager** | manager | 1234 |
| **Cashier** | cashier | 1234 |
| **Chef** | chef | 1234 |
| **Waiter** | waiter | 1234 |
| **Customer** | customer | 1234 |

---

## 🔄 HOW TO APPLY CHANGES

### **Step 1: Make Sure MySQL is Running**
- Open XAMPP Control Panel
- MySQL should be GREEN "Running"

### **Step 2: Reset Database with New Credentials**

Open Command Prompt or PowerShell in the backend folder:

```bash
cd backend
C:\xampp_new\php\php.exe artisan migrate:fresh --seed
```

**What this does:**
- Drops all tables
- Recreates all tables
- Seeds with new user credentials
- Adds 23 Ethiopian menu items
- Creates 10 tables

### **Step 3: Verify Changes**

Try logging in:
1. Go to: http://localhost:3000/login
2. Username: **manager**
3. Password: **1234**
4. Should login successfully!

---

## 🎯 QUICK LOGIN EXAMPLES

### **Manager Login:**
```
Username: manager
Password: 1234
```

### **Chef Login:**
```
Username: chef
Password: 1234
```

### **Cashier Login:**
```
Username: cashier
Password: 1234
```

### **Waiter Login:**
```
Username: waiter
Password: 1234
```

### **Customer Login:**
```
Username: customer
Password: 1234
```

---

## ⚠️ IMPORTANT NOTES

### **Note 1: Email Field**
The login form still says "Email" but you enter the **username** (manager, chef, etc.)

### **Note 2: Database Reset**
Running `migrate:fresh --seed` will:
- ✅ Delete all existing data
- ✅ Create fresh tables
- ✅ Add new users with simple credentials
- ✅ Add menu items
- ✅ Add tables

### **Note 3: Existing Orders**
If you had test orders, they will be deleted. This gives you a fresh start.

---

## 🔧 TROUBLESHOOTING

### **Problem: Command Not Working**

**Error:** "Could not open input file: artisan"

**Solution:**
```bash
# Make sure you're in the backend folder
cd C:\xampp_new\htdocs\resturant system\backend

# Then run the command
C:\xampp_new\php\php.exe artisan migrate:fresh --seed
```

### **Problem: MySQL Connection Error**

**Error:** "Connection refused"

**Solution:**
1. Open XAMPP Control Panel
2. Start MySQL (must be GREEN)
3. Try the command again

### **Problem: Can't Login After Update**

**Solution:**
1. Make sure you ran `migrate:fresh --seed`
2. Use username (not email): **manager**
3. Use password: **1234**
4. Clear browser cache (Ctrl+Shift+R)

---

## 📋 VERIFICATION CHECKLIST

After running the update command:

- [ ] Command completed without errors
- [ ] Go to http://localhost:3000/login
- [ ] Enter username: **manager**
- [ ] Enter password: **1234**
- [ ] Click Login
- [ ] Should redirect to Manager Dashboard
- [ ] Try other users (chef, cashier, waiter, customer)

---

## 🎉 SUCCESS!

**New credentials are:**
- ✅ Simple usernames (manager, chef, cashier, waiter, customer)
- ✅ Same password for all: **1234**
- ✅ Easy to remember
- ✅ Quick to type

---

## 📝 SUMMARY OF CHANGES

### **Before:**
```
Email: manager@restaurant.com
Password: password
```

### **After:**
```
Username: manager
Password: 1234
```

**Much simpler!** 🎉

---

## 🚀 QUICK START WITH NEW CREDENTIALS

1. **Start MySQL** in XAMPP
2. **Run update command:**
   ```bash
   cd backend
   C:\xampp_new\php\php.exe artisan migrate:fresh --seed
   ```
3. **Start servers:**
   - Double-click `START_BACKEND.bat`
   - Double-click `START_FRONTEND.bat`
4. **Login:**
   - Go to http://localhost:3000/login
   - Username: **manager**
   - Password: **1234**

---

**Easy to remember, easy to use!** 🇪🇹🍽️

**ቤተ ሳይዳ ሬስቶራንት - Betesida Restaurant**
