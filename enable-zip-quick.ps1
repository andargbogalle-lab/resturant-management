# Quick script to enable ZIP extension
$phpIniPath = "C:\xampp_new\php\php.ini"

Write-Host "Enabling PHP ZIP Extension..." -ForegroundColor Green
Write-Host ""

# Read the file
$content = Get-Content $phpIniPath

# Replace ;extension=zip with extension=zip
$newContent = $content -replace ';extension=zip', 'extension=zip'

# Write back
$newContent | Set-Content $phpIniPath

Write-Host "✓ ZIP extension enabled!" -ForegroundColor Green
Write-Host ""
Write-Host "Now installing Laravel dependencies..." -ForegroundColor Yellow
Write-Host ""

# Install composer dependencies
Set-Location "backend"
& C:\xampp_new\php\php.exe ..\composer.phar install --no-interaction

Write-Host ""
Write-Host "✓ Dependencies installed!" -ForegroundColor Green
Write-Host ""
Write-Host "Generating application key..." -ForegroundColor Yellow
& C:\xampp_new\php\php.exe artisan key:generate

Write-Host ""
Write-Host "Running database migrations..." -ForegroundColor Yellow
& C:\xampp_new\php\php.exe artisan migrate

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✓ Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Start your servers:" -ForegroundColor Cyan
Write-Host "  Backend:  C:\xampp_new\php\php.exe artisan serve" -ForegroundColor White
Write-Host "  Frontend: npm run dev" -ForegroundColor White
Write-Host ""

pause
