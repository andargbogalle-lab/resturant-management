# Quick Start Guide - Restaurant System

## Current Status ✓

✅ PHP 8.2.12 installed (XAMPP)
✅ Composer installed
✅ Frontend dependencies installed
⚠️ Backend needs ZIP extension enabled

## Step 1: Enable PHP ZIP Extension (Required for Laravel)

1. Open this file in Notepad (as Administrator):
   ```
   C:\xampp_new\php\php.ini
   ```

2. Find this line (around line 900-950):
   ```
   ;extension=zip
   ```

3. Remove the semicolon to enable it:
   ```
   extension=zip
   ```

4. Save the file

## Step 2: Install Backend Dependencies

Open terminal in your project folder and run:

```bash
cd backend
C:\xampp_new\php\php.exe ..\composer.phar install
```

## Step 3: Setup Laravel Environment

```bash
# Copy environment file
copy .env.example .env

# Generate application key
C:\xampp_new\php\php.exe artisan key:generate
```

## Step 4: Configure Database

You have two options:

### Option A: Use MySQL (Already in XAMPP)

1. Start XAMPP MySQL service
2. Open phpMyAdmin: http://localhost/phpmyadmin
3. Create database: `restaurant_system`
4. Edit `backend/.env`:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=restaurant_system
   DB_USERNAME=root
   DB_PASSWORD=
   ```

### Option B: Install PostgreSQL

1. Download: https://www.postgresql.org/download/windows/
2. Install and set password
3. Create database: `restaurant_system`
4. Keep the `.env` as is (already configured for PostgreSQL)

## Step 5: Run Migrations

```bash
cd backend
C:\xampp_new\php\php.exe artisan migrate
```

## Step 6: Start Servers

### Terminal 1 - Backend:
```bash
cd backend
C:\xampp_new\php\php.exe artisan serve
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

## Access Your Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Health Check: http://localhost:8000/api/health

## Troubleshooting

**If composer install still fails:**
```bash
# Alternative: Install without dev dependencies first
C:\xampp_new\php\php.exe ..\composer.phar install --no-dev
```

**If you get "Class not found" errors:**
```bash
C:\xampp_new\php\php.exe artisan config:clear
C:\xampp_new\php\php.exe artisan cache:clear
```

## Next Steps

Once everything is running:
1. Test the connection at http://localhost:3000
2. You should see "Backend Status: ok"
3. Start building your restaurant features!

## Quick Commands Reference

```bash
# Backend
C:\xampp_new\php\php.exe artisan migrate          # Run migrations
C:\xampp_new\php\php.exe artisan make:controller  # Create controller
C:\xampp_new\php\php.exe artisan make:model       # Create model
C:\xampp_new\php\php.exe artisan serve            # Start server

# Frontend
npm run dev      # Start development server
npm run build    # Build for production
```
