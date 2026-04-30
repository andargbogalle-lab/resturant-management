# Restaurant System - Laravel Backend

## Setup Instructions

### Prerequisites
- PHP 8.2 or higher
- Composer
- PostgreSQL

### Installation

1. Install dependencies:
```bash
composer install
```

2. Copy environment file:
```bash
cp .env.example .env
```

3. Generate application key:
```bash
php artisan key:generate
```

4. Configure PostgreSQL database in `.env`:
```
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=restaurant_system
DB_USERNAME=postgres
DB_PASSWORD=your_password
```

5. Run migrations:
```bash
php artisan migrate
```

6. Start the development server:
```bash
php artisan serve
```

The API will be available at `http://localhost:8000`

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/user` - Get authenticated user (requires authentication)
