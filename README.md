# Restaurant Management System

Full-stack restaurant management application built with Laravel 11 and React 18.

## 🚀 Quick Start (Automated)

### One-Click Setup:
1. Double-click `setup-mysql.bat`
2. Follow the prompts
3. Done!

### One-Click Start:
- Double-click `start-app.bat` to start both servers

## 📋 Manual Setup

### Prerequisites
✅ PHP 8.2.12 (XAMPP installed)
✅ MySQL (XAMPP)
✅ Node.js & npm
✅ Composer

### Step 1: Enable PHP ZIP Extension
1. Open `C:\xampp_new\php\php.ini`
2. Find `;extension=zip` and change to `extension=zip`
3. Save file

### Step 2: Create Database
```bash
# Start XAMPP MySQL, then:
C:\xampp_new\mysql\bin\mysql.exe -u root -e "CREATE DATABASE restaurant_system;"
```

Or use phpMyAdmin: http://localhost/phpmyadmin

### Step 3: Install Backend
```bash
cd backend
C:\xampp_new\php\php.exe ..\composer.phar install
C:\xampp_new\php\php.exe artisan key:generate
C:\xampp_new\php\php.exe artisan migrate
```

### Step 4: Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
C:\xampp_new\php\php.exe artisan serve
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## 🌐 Access Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **API Health:** http://localhost:8000/api/health
- **phpMyAdmin:** http://localhost/phpmyadmin

## 🗄️ Database Schema

### Tables:
- **users** - System users and authentication
- **categories** - Menu item categories
- **menu_items** - Restaurant menu items
- **tables** - Restaurant tables
- **orders** - Customer orders
- **order_items** - Items in each order

## 🛠️ Technology Stack

### Backend
- Laravel 11
- PHP 8.2
- MySQL
- Laravel Sanctum (Authentication)

### Frontend
- React 18
- Vite
- React Router
- Axios

## 📁 Project Structure

```
restaurant-system/
├── backend/              # Laravel API
│   ├── app/
│   │   ├── Models/      # Database models
│   │   └── Http/        # Controllers & Middleware
│   ├── database/
│   │   └── migrations/  # Database migrations
│   ├── routes/
│   │   └── api.php      # API routes
│   └── config/          # Configuration files
│
├── frontend/            # React Application
│   ├── src/
│   │   ├── pages/      # Page components
│   │   ├── services/   # API integration
│   │   └── App.jsx     # Main app component
│   └── public/
│
├── setup-mysql.bat     # Automated setup script
├── start-app.bat       # Start both servers
└── README.md           # This file
```

## 🔧 Common Commands

### Backend (Laravel)
```bash
# Run migrations
C:\xampp_new\php\php.exe artisan migrate

# Create new migration
C:\xampp_new\php\php.exe artisan make:migration create_table_name

# Create controller
C:\xampp_new\php\php.exe artisan make:controller ControllerName

# Create model
C:\xampp_new\php\php.exe artisan make:model ModelName

# Clear cache
C:\xampp_new\php\php.exe artisan cache:clear
C:\xampp_new\php\php.exe artisan config:clear
```

### Frontend (React)
```bash
# Install new package
npm install package-name

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🐛 Troubleshooting

**MySQL Connection Failed:**
- Make sure XAMPP MySQL is running
- Check credentials in `backend/.env`
- Verify database exists

**Composer Install Fails:**
- Enable ZIP extension in php.ini
- Run: `C:\xampp_new\php\php.exe ..\composer.phar install --no-dev`

**Port Already in Use:**
- Backend: `C:\xampp_new\php\php.exe artisan serve --port=8001`
- Frontend: Change port in `vite.config.js`

**Class Not Found:**
```bash
C:\xampp_new\php\php.exe artisan config:clear
C:\xampp_new\php\php.exe artisan cache:clear
```

## 📝 Next Steps

1. ✅ Setup complete
2. 🔨 Build restaurant features:
   - Menu management
   - Order system
   - Table management
   - User authentication
3. 🎨 Customize UI
4. 🚀 Deploy to production

## 📄 License

MIT License
"# resturant-management" 
"# resturant-management" 
