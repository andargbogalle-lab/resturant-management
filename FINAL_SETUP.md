# Final Setup Steps - Restaurant System

## ✅ What's Already Done

1. ✅ All project files created
2. ✅ Frontend dependencies installed
3. ✅ MySQL database created (`restaurant_system`)
4. ✅ Configuration files set for MySQL
5. ✅ Composer installed
6. ⏳ Backend dependencies installing (may still be running)

## 🚀 Complete the Setup (2 Minutes)

### Option 1: Automated (Recommended)

**Just double-click:** `setup-mysql.bat`

It will:
1. Help you enable ZIP extension
2. Install Laravel dependencies
3. Generate app key
4. Run database migrations
5. Everything ready!

### Option 2: Manual Steps

#### Step 1: Enable ZIP Extension (30 seconds)
```
1. Open: C:\xampp_new\php\php.ini
2. Find: ;extension=zip
3. Change to: extension=zip
4. Save file
```

#### Step 2: Install Backend (1 minute)
```bash
cd backend
C:\xampp_new\php\php.exe ..\composer.phar install
```

#### Step 3: Setup Laravel (30 seconds)
```bash
C:\xampp_new\php\php.exe artisan key:generate
C:\xampp_new\php\php.exe artisan migrate
```

## 🎯 Start the Application

### Easy Way:
Double-click `start-app.bat`

### Manual Way:
**Terminal 1:**
```bash
cd backend
C:\xampp_new\php\php.exe artisan serve
```

**Terminal 2:**
```bash
cd frontend
npm run dev
```

## 🌐 Access Your App

Open browser: **http://localhost:3000**

You should see:
- "Restaurant Management System" title
- Backend Status: **ok**
- Message: "Restaurant API is running"

## 📊 Database Access

**phpMyAdmin:** http://localhost/phpmyadmin
- Username: `root`
- Password: (empty)
- Database: `restaurant_system`

## 🗄️ Database Tables Created

After migration, you'll have:
1. **users** - User accounts
2. **categories** - Menu categories (Appetizers, Main Course, etc.)
3. **menu_items** - Food items with prices
4. **tables** - Restaurant tables
5. **orders** - Customer orders
6. **order_items** - Order details

## 🛠️ Quick Commands

```bash
# View all routes
C:\xampp_new\php\php.exe artisan route:list

# Create new controller
C:\xampp_new\php\php.exe artisan make:controller MenuController

# Create new model
C:\xampp_new\php\php.exe artisan make:model Reservation

# Fresh migration (reset database)
C:\xampp_new\php\php.exe artisan migrate:fresh
```

## ❓ Troubleshooting

**If composer install is still running:**
- Wait for it to complete (may take 5-10 minutes first time)
- Or press Ctrl+C and run `setup-mysql.bat`

**If you see "Class not found":**
```bash
C:\xampp_new\php\php.exe artisan config:clear
C:\xampp_new\php\php.exe artisan cache:clear
```

**If MySQL connection fails:**
- Start XAMPP Control Panel
- Start MySQL service
- Check if database exists in phpMyAdmin

## 🎉 You're Ready!

Once both servers are running and you see the homepage, your full-stack restaurant system is live!

Next: Start building features like menu management, orders, and table reservations.
