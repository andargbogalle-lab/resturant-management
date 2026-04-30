@echo off
echo Starting Restaurant Management System...
echo.

echo Starting Backend Server...
start "Restaurant Backend" cmd /k "cd backend && C:\xampp_new\php\php.exe artisan serve"

timeout /t 3 /nobreak >nul

echo Starting Frontend Server...
start "Restaurant Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo Servers Starting...
echo ========================================
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Two terminal windows will open.
echo Press Ctrl+C in each window to stop the servers.
echo.
pause
