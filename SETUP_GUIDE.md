# Restaurant Management System - Complete Setup Guide

## Project Structure
```
restaurant-system/
├── backend/          # Laravel 11 API
└── frontend/         # React Application
```

## Prerequisites Installation

### 1. Install PHP 8.2+
**Windows:**
- Download from: https://windows.php.net/download/
- Or use Chocolatey: `choco install php`
- Add PHP to your system PATH

### 2. Install Composer
- Download from: https://getcomposer.org/download/
- Run the installer

### 3. Install PostgreSQL
- Download from: https://www.postgresql.org/download/windows/
- During installation, set a password for the postgres user
- Default port: 5432

### 4. Install Node.js & npm
- Download from: https://nodejs.org/ (LTS version recommended)
- npm comes bundled with Node.js

## Backend Setup (Laravel)

### Step 1: Install Dependencies
```bash
cd backend
composer install
```

### Step 2: Environment Configuration
```bash
cp .env.example .env
```

Edit `.env` file and configure PostgreSQL:
```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=restaurant_system
DB_USERNAME=postgres
DB_PASSWORD=your_postgres_password
```

### Step 3: Generate Application Key
```bash
php artisan key:generate
```

### Step 4: Create Database
Open PostgreSQL command line or pgAdmin and create the database:
```sql
CREATE DATABASE restaurant_system;
```

### Step 5: Run Migrations
```bash
php artisan migrate
```

### Step 6: Start Laravel Server
```bash
php artisan serve
```
Backend will run at: http://localhost:8000

## Frontend Setup (React)

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```
Frontend will run at: http://localhost:3000

## Testing the Integration

1. Open browser and go to: http://localhost:3000
2. You should see "Restaurant Management System" page
3. Backend status should show: "ok" with message "Restaurant API is running"

## Database Schema

The system includes these tables:
- **users** - System users
- **categories** - Menu categories
- **menu_items** - Restaurant menu items
- **tables** - Restaurant tables
- **orders** - Customer orders
- **order_items** - Items in each order

## API Endpoints

Base URL: `http://localhost:8000/api`

- `GET /health` - Health check
- `GET /user` - Get authenticated user (requires auth)

## Technology Stack

- **Backend**: Laravel 11, PHP 8.2+, PostgreSQL
- **Frontend**: React 18, Vite, React Router, Axios
- **Authentication**: Laravel Sanctum
- **API**: RESTful with CORS enabled

## Next Steps

After setup is complete, you can:
1. Create API controllers for restaurant operations
2. Build React components for menu, orders, tables
3. Implement authentication system
4. Add form validation on both sides

## Troubleshooting

**PHP not found:**
- Make sure PHP is added to system PATH
- Restart terminal after installation

**Composer not found:**
- Restart terminal after Composer installation
- Check if Composer is in PATH

**Database connection failed:**
- Verify PostgreSQL is running
- Check database credentials in .env
- Ensure database exists

**Port already in use:**
- Laravel: `php artisan serve --port=8001`
- React: Change port in vite.config.js
