# Login Testing Guide

## Test the Login Directly

### Option 1: Test via Browser Console

1. Open `http://localhost:3000/login` in your browser
2. Press F12 to open Developer Tools
3. Go to Console tab
4. Try to login with:
   - Username: `cashier`
   - Password: `1234`
5. Check the console for any error messages

### Option 2: Test API Directly

Open a new terminal and run:

```bash
# Test cashier login
curl -X POST http://127.0.0.1:8000/api/login -H "Content-Type: application/json" -d "{\"email\":\"cashier\",\"password\":\"1234\"}"

# Test chief login
curl -X POST http://127.0.0.1:8000/api/login -H "Content-Type: application/json" -d "{\"email\":\"chief\",\"password\":\"1234\"}"

# Test waiter login
curl -X POST http://127.0.0.1:8000/api/login -H "Content-Type: application/json" -d "{\"email\":\"waiter\",\"password\":\"1234\"}"
```

### Expected Response:
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

## Common Issues and Solutions

### Issue 1: "Invalid credentials"
**Possible Causes:**
- Wrong username or password
- Database not seeded properly
- Backend not running

**Solution:**
1. Make sure backend is running: `http://127.0.0.1:8000`
2. Check if users exist in database
3. Try exact credentials:
   - cashier / 1234
   - chief / 1234
   - waiter / 1234

### Issue 2: "Network Error" or "Failed to fetch"
**Possible Causes:**
- Backend not running
- CORS issue
- Wrong API URL

**Solution:**
1. Check backend is running: `http://127.0.0.1:8000/api/health`
2. Check frontend API config: `frontend/src/services/api.js`
3. Make sure MySQL is running in XAMPP

### Issue 3: "422 Unprocessable Entity"
**Possible Causes:**
- Validation error
- Missing required fields

**Solution:**
1. Make sure both username and password are filled
2. Check browser console for detailed error

## Debug Steps

1. **Check Backend Health:**
   ```
   http://127.0.0.1:8000/api/health
   ```
   Should return: `{"status":"ok","message":"Restaurant API is running"}`

2. **Check Frontend API Config:**
   File: `frontend/src/services/api.js`
   Should have: `baseURL: 'http://127.0.0.1:8000/api'`

3. **Check Browser Console:**
   - Open DevTools (F12)
   - Go to Console tab
   - Look for error messages
   - Check Network tab for failed requests

4. **Check Database:**
   - Open phpMyAdmin: `http://localhost/phpmyadmin`
   - Check `users` table
   - Verify 3 users exist: cashier, chief, waiter

## Valid Credentials

| Username | Password | Role    |
|----------|----------|---------|
| cashier  | 1234     | Cashier |
| chief    | 1234     | Chef    |
| waiter   | 1234     | Waiter  |

**Note:** Username is case-sensitive (use lowercase)

## If Still Not Working

1. **Restart Backend:**
   ```bash
   cd backend
   C:\xampp_new\php\php.exe artisan serve --host=127.0.0.1 --port=8000
   ```

2. **Restart Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Clear Browser Cache:**
   - Press Ctrl+Shift+Delete
   - Clear cached images and files
   - Reload page

4. **Re-seed Database:**
   ```bash
   cd backend
   C:\xampp_new\php\php.exe artisan migrate:fresh --seed
   ```

## Test Results

I've tested all three users via API and they all work:
- ✅ cashier / 1234 - Working
- ✅ chief / 1234 - Working
- ✅ waiter / 1234 - Working

The backend API is functioning correctly. If you're getting "invalid credentials" in the browser, please:
1. Check the browser console for detailed error
2. Verify you're typing the username correctly (lowercase)
3. Make sure password is exactly "1234"
