@echo off
echo ========================================
echo   UPDATE DATABASE WITH NEW CREDENTIALS
echo ========================================
echo.
echo This will:
echo - Reset the database
echo - Create new users with simple credentials
echo - Username: manager, chef, cashier, waiter, customer
echo - Password: 1234 (for all users)
echo.
echo WARNING: This will delete all existing data!
echo.
pause
echo.
echo Updating database...
echo.
cd backend
C:\xampp_new\php\php.exe artisan migrate:fresh --seed
echo.
echo ========================================
echo   UPDATE COMPLETE!
echo ========================================
echo.
echo New Login Credentials:
echo.
echo Manager:  username: manager   password: 1234
echo Cashier:  username: cashier   password: 1234
echo Chef:     username: chef      password: 1234
echo Waiter:   username: waiter    password: 1234
echo Customer: username: customer  password: 1234
echo.
echo ========================================
echo.
echo You can now login at: http://localhost:3000/login
echo.
pause
