@echo off
echo ========================================
echo Restaurant System - MySQL Setup
echo ========================================
echo.

echo Step 1: Enabling PHP ZIP Extension...
echo.
echo Opening php.ini file...
start notepad C:\xampp_new\php\php.ini
echo.
echo IMPORTANT: In the opened file:
echo 1. Press Ctrl+F and search for: extension=zip
echo 2. If you find ;extension=zip (with semicolon), remove the semicolon
echo 3. Save the file (Ctrl+S) and close Notepad
echo 4. Come back here and press any key to continue...
echo.
pause

echo.
echo Step 2: Starting XAMPP MySQL...
echo.
start C:\xampp_new\mysql_start.bat
timeout /t 3 /nobreak >nul

echo.
echo Step 3: Creating Database...
echo.
C:\xampp_new\mysql\bin\mysql.exe -u root -e "CREATE DATABASE IF NOT EXISTS restaurant_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
if %errorlevel% equ 0 (
    echo ✓ Database 'restaurant_system' created successfully!
) else (
    echo ✗ Failed to create database. Make sure MySQL is running.
    echo   You can create it manually in phpMyAdmin: http://localhost/phpmyadmin
)

echo.
echo Step 4: Installing Laravel Dependencies...
echo.
cd backend
C:\xampp_new\php\php.exe ..\composer.phar install --no-interaction --prefer-dist

echo.
echo Step 5: Generating Application Key...
echo.
C:\xampp_new\php\php.exe artisan key:generate --force

echo.
echo Step 6: Running Database Migrations...
echo.
C:\xampp_new\php\php.exe artisan migrate --force

echo.
echo ========================================
echo Setup Complete! 🎉
echo ========================================
echo.
echo Your restaurant system is ready!
echo.
echo To start the application:
echo.
echo Terminal 1 - Backend:
echo   cd backend
echo   C:\xampp_new\php\php.exe artisan serve
echo.
echo Terminal 2 - Frontend:
echo   cd frontend
echo   npm run dev
echo.
echo Then open: http://localhost:3000
echo.
pause
