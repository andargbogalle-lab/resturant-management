@echo off
echo ========================================
echo   SYSTEM STATUS CHECK
echo ========================================
echo.
echo Checking if MySQL is accessible...
echo.
C:\xampp_new\php\php.exe -r "try { $pdo = new PDO('mysql:host=127.0.0.1;port=3306', 'root', ''); echo 'SUCCESS: MySQL is running and accessible!\n'; } catch (Exception $e) { echo 'ERROR: MySQL is NOT running or not accessible!\n'; echo 'Please start MySQL in XAMPP Control Panel.\n'; }"
echo.
echo ========================================
echo.
echo Checking if backend server is running...
echo.
curl -s http://127.0.0.1:8000/api/health
echo.
echo.
echo ========================================
echo.
echo Checking if menu items exist...
echo.
curl -s http://127.0.0.1:8000/api/menu-items | C:\xampp_new\php\php.exe -r "$json = json_decode(file_get_contents('php://stdin'), true); echo 'Menu items found: ' . count($json) . '\n';"
echo.
echo ========================================
echo.
pause
