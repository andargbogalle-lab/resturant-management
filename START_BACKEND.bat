@echo off
echo ========================================
echo   BETESIDA RESTAURANT - BACKEND SERVER
echo ========================================
echo.
echo Starting Laravel backend on port 8000...
echo.
echo IMPORTANT: Make sure MySQL is running in XAMPP!
echo.
cd backend
C:\xampp_new\php\php.exe artisan serve --host=127.0.0.1 --port=8000
pause
