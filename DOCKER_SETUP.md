# Docker Setup Guide for Hotel Management System

## 🚀 Quick Start with Docker

This project is fully containerized for easy local development. Everything runs with a single command!

### Prerequisites

- Docker Desktop (version 20.10+)
- Docker Compose (version 2.0+)
- Git

### Node Version

This project uses **Node 20 LTS** for maximum compatibility with:
- TypeScript 5.x
- Prisma 5.17+
- Vite 5.x
- React 18.x

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/subediaakash/hotel-management-system.git
cd hotel-management-system
```

### 2. Configure Environment Variables

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# JWT Secret (Required - Change this!)
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Cloudinary Configuration (OPTIONAL for local dev)
# Leave empty to use local storage in ./backend/src/uploads
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# API URL for Frontend
VITE_API_URL=http://localhost:5000/api
```

**For Local Development:**
- You can leave Cloudinary settings **empty**
- Images will be stored locally in `backend/src/uploads/`
- No external service needed!

**For Production:**
- Configure Cloudinary for cloud storage
- Get free credentials at https://cloudinary.com

### 3. Start All Services

```bash
docker-compose up
```

This single command will:
- ✅ Start PostgreSQL database
- ✅ Run Prisma migrations
- ✅ Seed initial data (hotels, admins)
- ✅ Start backend API server
- ✅ Start frontend development server

**Wait for all services to be ready (takes 1-2 minutes on first run)**

### 4. Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **Database:** postgresql://hotel_user:hotel_password@localhost:5432/hotel_db

## 🛠️ Docker Commands

### Start services in background
```bash
docker-compose up -d
```

### View logs
```bash
docker-compose logs -f
docker-compose logs backend
docker-compose logs frontend
```

### Stop services
```bash
docker-compose down
```

### Stop and remove volumes (clean database)
```bash
docker-compose down -v
```

### Rebuild containers
```bash
docker-compose up --build
```

### Run Prisma commands
```bash
# Run migrations
docker-compose exec backend npx prisma migrate dev

# Seed database
docker-compose exec backend npx prisma db seed

# Open Prisma Studio
docker-compose exec backend npx prisma studio
```

### Access container shell
```bash
docker-compose exec backend sh
docker-compose exec frontend sh
```

## 🏗️ Architecture

```
hotel-management-system/
├── docker-compose.yml       # Orchestrates all services
├── .env                     # Environment configuration
├── backend/
│   ├── Dockerfile          # Backend container config
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   ├── seed.ts         # Initial data
│   │   └── migrations/     # Database migrations
│   └── src/                # Backend source code
└── frontend/
    ├── Dockerfile          # Frontend container config
    └── src/                # Frontend source code
```

## 📊 Database

The PostgreSQL database is automatically configured with:
- **Database:** hotel_db
- **User:** hotel_user
- **Password:** hotel_password
- **Port:** 5432

### Initial Seed Data

When you start the application, the database is seeded with:
- **Admin account:** (Check `backend/prisma/seed.ts`)
- **Sample hotels** in multiple locations
- **Sample locations:** Kathmandu, Sydney, Paris, Melbourne, etc.

## 🐛 Troubleshooting

### Port Already in Use

If you get port conflicts:

```bash
# Stop conflicting services
docker-compose down

# Change ports in docker-compose.yml if needed
```

### Database Connection Issues

```bash
# Reset database
docker-compose down -v
docker-compose up
```

### Frontend Can't Connect to Backend

Make sure `VITE_API_URL` in `.env` is set correctly:
```env
VITE_API_URL=http://localhost:5000/api
```

### Permission Issues on Linux/Mac

```bash
sudo docker-compose up
```

## 🔧 Development Workflow

1. **Hot Reload:** Both frontend and backend support hot-reload. Changes to code are reflected immediately.

2. **Database Changes:**
   ```bash
   # After modifying schema.prisma
   docker-compose exec backend npx prisma migrate dev --name your_migration_name
   ```

3. **Install New Dependencies:**
   ```bash
   # Stop containers
   docker-compose down
   
   # Rebuild with new dependencies
   docker-compose up --build
   ```

## 📝 Notes

- First-time setup takes longer due to image downloads and dependency installation
- Data persists across restarts in Docker volumes
- Use `docker-compose down -v` to completely reset (deletes all data)
- Backend runs on port 5000, Frontend on port 5173

## 🚫 Without Docker (Alternative)

If you prefer running without Docker:

### Backend
```bash
cd backend
npm install
docker-compose up -d postgres  # Just run database
npx prisma migrate dev
npx prisma db seed
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

**Happy Coding! 🎉**
