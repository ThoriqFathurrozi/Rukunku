# Rukunku - Fullstack Laravel + React Project

Rukunku is a full-featured web application built with **Laravel** (backend) and **React + Vite** (frontend). It provides tools for managing residential environments, including resident data, house information, and more.

---

## 📦 Backend Setup (Laravel)

### 1. Clone the Repository

```bash
git clone https://github.com/ThoriqFathurrozi/Rukunku.git
cd Rukunku/backend
```

### 2. Install PHP Dependencies

Ensure you have **PHP ≥ 8.1** and **Composer** installed.

```bash
composer install
```

> If Composer isn't installed, refer to the [Composer Installation Guide](https://getcomposer.org/doc/00-intro.md).

### 3. Configure Environment File

```bash
#mac or linux
cp .env.example .env

#windows powershell or cmd
Copy-Item -Path "env.example" -Destination ".env"
```

Update `.env` with your local settings:

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password

APP_URL=http://localhost:8000 #or specify url backend you running

SANCTUM_STATEFUL_DOMAINS=localhost:5173,127.0.0.1:5173 #or specify base uri frontend you running
SESSION_DOMAIN=localhost
SESSION_DRIVER=cookie
```

Also update `config/cors.php` if needed:

```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => [env('FRONTEND_URL', 'http://localhost:5173')],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
'supports_credentials' => true,
```

### 4. Generate Application Key

```bash
php artisan key:generate
```

### 5. Run Migrations and Seeders

```bash
php artisan migrate --seed
```

### 6. Start Laravel Development Server

```bash
php artisan serve
# or specify a port
php artisan serve --port=8001
```

---

## ⚛️ Frontend Setup (React + Vite)

### 1. Move to the Frontend Directory

```bash
cd ../frontend
```

### 2. Install Node.js Dependencies

Ensure you have **Node.js** and **npm** installed.

```bash
npm install
```

### 3. Configure Environment File

```bash
#mac or linux
cp .env.example .env

#windows powershell or cmd
Copy-Item -Path "env.example" -Destination ".env"
```

Update `.env`:

```dotenv
VITE_API_BASE_URL=http://localhost:8000
```

### 4. Start Development Server

```bash
npm run dev
```

> Make sure the backend server is running before launching the frontend.

---

## 🧠 Tips

- Ensure the ports used in `.env` match between backend and frontend.
- For authentication to work with **Laravel Sanctum**, the domains must match and cookies should be allowed (CORS, stateful domains).
- For production setup, make sure to update `APP_ENV`, `APP_DEBUG`, and configure a production web server (e.g., Nginx).

---

## 📚 Resources

- [Laravel Documentation](https://laravel.com/docs)
- [React Documentation](https://reactjs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Laravel Sanctum](https://laravel.com/docs/sanctum)

---

## 👨‍💻 Author

Built by [Thoriq Fathurrozi](https://github.com/ThoriqFathurrozi)
