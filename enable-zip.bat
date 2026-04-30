@echo off
echo Enabling PHP ZIP Extension...
echo.
echo Please follow these steps:
echo.
echo 1. Open C:\xampp_new\php\php.ini in Notepad (as Administrator)
echo 2. Find the line: ;extension=zip
echo 3. Remove the semicolon: extension=zip
echo 4. Save the file
echo 5. Come back and press any key to continue...
echo.
pause

echo.
echo Installing Laravel dependencies...
cd backend
C:\xampp_new\php\php.exe ..\composer.phar install

echo.
echo Copying environment file...
copy .env.example .env

echo.
echo Generating application key...
C:\xampp_new\php\php.exe artisan key:generate

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Configure database in backend\.env
echo 2. Run: C:\xampp_new\php\php.exe artisan migrate
echo 3. Start backend: C:\xampp_new\php\php.exe artisan serve
echo 4. Start frontend: cd frontend ^&^& npm run dev
echo.
pause
