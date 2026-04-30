# 🔧 Fix Login "Invalid Credentials" Issue

## What I've Done

### 1. ✅ Verified Backend API is Working
I tested all three users via direct API calls and they all work perfectly:
- ✅ cashier / 1234 - Working
- ✅ chief / 1234 - Working  
- ✅ waiter / 1234 - Working

### 2. ✅ Updated Login Page
Added detailed console logging and credential hints:
- Shows valid credentials on login page
- Adds detailed error logging in browser console
- Warns that username is case-sensitive

### 3. ✅ Verified Configuration
- CORS: Configured correctly for localhost:3000
- Sanctum: Configured correctly
- API Service: Points to correct backend URL

---

## How to Debug the Issue

### Step 1: Open Browser Console
1. Go to `http://localhost:3000/login`
2. Press **F12** to open Developer Tools
3. Click on **Console** tab
4. Keep it open while you try to login

### Step 2: Try to Login
Use these exact credentials (copy and paste to avoid typos):

**Username:** `cashier`  
**Password:** `1234`

### Step 3: Check Console Output
You should see detailed logs like:
```
=== LOGIN ATTEMPT ===
Username: cashier
Password length: 4
API URL: http://127.0.0.1:8000/api/login
```

If login fails, you'll see:
```
=== LOGIN ERROR ===
Error object: {...}
Error response: {...}
Error data: {...}
```

### Step 4: Check Network Tab
1. In Developer Tools, click **Network** tab
2. Try to login again
3. Look for a request to `login`
4. Click on it to see:
   - Request Headers
   - Request Payload
   - Response

---

## Common Issues and Solutions

### Issue 1: "Invalid credentials" Error

**Possible Causes:**
1. Typing username wrong (it's case-sensitive)
2. Extra spaces in username or password
3. Database not seeded properly

**Solutions:**

**A. Copy-Paste Credentials**
Don't type them - copy and paste:
- Username: `cashier`
- Password: `1234`

**B. Check Database**
1. Open phpMyAdmin: `http://localhost/phpmyadmin`
2. Select database (probably `restaurant_db` or similar)
3. Click on `users` table
4. Verify you see 3 users:
   - email: cashier, name: Cashier
   - email: chief, name: Chief
   - email: waiter, name: Waiter

**C. Re-seed Database**
If users are missing, re-seed:
```bash
cd backend
C:\xampp_new\php\php.exe artisan migrate:fresh --seed
```

---

### Issue 2: Network Error / Cannot Connect

**Possible Causes:**
1. Backend not running
2. MySQL not running
3. Wrong port

**Solutions:**

**A. Check Backend is Running**
Open: `http://127.0.0.1:8000/api/health`

Should see: `{"status":"ok","message":"Restaurant API is running"}`

If not working:
```bash
cd backend
C:\xampp_new\php\php.exe artisan serve --host=127.0.0.1 --port=8000
```

**B. Check MySQL is Running**
1. Open XAMPP Control Panel
2. Make sure MySQL is started (green)
3. If not, click "Start" button

**C. Check Frontend is Running**
Open: `http://localhost:3000`

If not working:
```bash
cd frontend
npm run dev
```

---

### Issue 3: CORS Error

**Symptoms:**
- Console shows: "Access-Control-Allow-Origin" error
- Network tab shows request failed

**Solution:**
Backend CORS is already configured for localhost:3000. If you still see CORS errors:

1. Make sure you're accessing via `http://localhost:3000` (not 127.0.0.1:3000)
2. Clear browser cache (Ctrl+Shift+Delete)
3. Restart backend server

---

### Issue 4: 422 Validation Error

**Symptoms:**
- Error says "422 Unprocessable Entity"
- Console shows validation errors

**Solution:**
Make sure both fields are filled:
- Username field must not be empty
- Password field must not be empty

---

## Quick Test Commands

### Test Backend API Directly:

**PowerShell:**
```powershell
$body = @{email="cashier"; password="1234"} | ConvertTo-Json
Invoke-WebRequest -Uri "http://127.0.0.1:8000/api/login" -Method POST -Body $body -ContentType "application/json" -UseBasicParsing | Select-Object -ExpandProperty Content
```

**Expected Output:**
```json
{
  "user": {
    "id": 1,
    "name": "Cashier",
    "email": "cashier",
    "role": "cashier"
  },
  "token": "...",
  "message": "Login successful"
}
```

---

## What to Check in Browser Console

When you try to login, look for these logs:

### ✅ Good Signs:
```
=== LOGIN ATTEMPT ===
Username: cashier
Password length: 4
=== LOGIN SUCCESS ===
Response: {user: {...}, token: "...", message: "Login successful"}
Redirecting to: /dashboard/cashier
```

### ❌ Bad Signs:
```
=== LOGIN ERROR ===
Error status: 401
Error data: {message: "Invalid credentials"}
```

If you see 401 error with "Invalid credentials", it means:
- Username or password is wrong
- User doesn't exist in database

---

## Step-by-Step Verification

### 1. Verify Backend Health
```
http://127.0.0.1:8000/api/health
```
✅ Should return: `{"status":"ok"}`

### 2. Verify Users Exist
```
http://localhost/phpmyadmin
```
✅ Check `users` table has 3 users

### 3. Verify Frontend Loads
```
http://localhost:3000
```
✅ Should show home page

### 4. Verify Login Page Loads
```
http://localhost:3000/login
```
✅ Should show login form with credential hints

### 5. Test Login
- Username: `cashier`
- Password: `1234`
✅ Should redirect to cashier dashboard

---

## If Nothing Works

### Nuclear Option: Complete Reset

1. **Stop Everything:**
   - Stop backend (Ctrl+C)
   - Stop frontend (Ctrl+C)
   - Stop MySQL in XAMPP

2. **Start MySQL:**
   - Open XAMPP Control Panel
   - Start MySQL

3. **Reset Database:**
   ```bash
   cd backend
   C:\xampp_new\php\php.exe artisan migrate:fresh --seed
   ```
   Wait for: "Database seeding completed successfully"

4. **Start Backend:**
   ```bash
   C:\xampp_new\php\php.exe artisan serve --host=127.0.0.1 --port=8000
   ```
   Wait for: "Server running on [http://127.0.0.1:8000]"

5. **Start Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```
   Wait for: "Local: http://localhost:3000"

6. **Clear Browser:**
   - Press Ctrl+Shift+Delete
   - Clear cache and cookies
   - Close and reopen browser

7. **Try Login Again:**
   - Go to `http://localhost:3000/login`
   - Username: `cashier`
   - Password: `1234`

---

## What I Need From You

To help you better, please tell me:

1. **What exact error message do you see?**
   - "Invalid credentials"
   - "Network error"
   - "422 error"
   - Something else?

2. **What does the browser console show?**
   - Open DevTools (F12)
   - Go to Console tab
   - Copy and paste the error messages

3. **What does the Network tab show?**
   - Open DevTools (F12)
   - Go to Network tab
   - Try to login
   - Click on the "login" request
   - What's the status code? (200, 401, 422, 500?)
   - What's in the Response tab?

4. **Which username are you trying?**
   - cashier
   - chief
   - waiter
   - Something else?

5. **Are you typing or copy-pasting?**
   - Try copy-pasting the credentials from the login page

---

## Updated Login Page Features

The login page now shows:
- ✅ Valid credentials displayed on the page
- ✅ Warning that username is case-sensitive
- ✅ Detailed console logging for debugging
- ✅ Better error messages

Just refresh the page to see the updates!

---

**Next Steps:**
1. Refresh the login page: `http://localhost:3000/login`
2. Open browser console (F12)
3. Try to login with: cashier / 1234
4. Tell me what you see in the console
