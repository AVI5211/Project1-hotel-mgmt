# Hotel Management System

## Overview

This Hotel Management System is a full-stack application designed to provide users with a seamless experience for searching and booking hotels in various locations. Key features include:

- **Search for Hotels**: Users can search for hotels across different locations.
- **Room Booking**: Book rooms based on the number of people visiting.
- **Pseudo Payment System**: Make payments using a credit card simulation.
- **Booking History**: View a record of all past bookings.
- **Admin Features**: Admin users can manage locations and add new hotels.

## Features

- **User**:
  - Search for hotels by location.
  - Book rooms based on group size.
  - Make pseudo payments via a credit card form.
  - View booking history for past reservations.
- **Admin**:
  - Add new hotel locations.
  - Manage existing hotels (add, update, or delete).

## Tech Stack

- **Frontend**:

  - React
  - React Query (for data fetching and caching)
  - Lucide-react-icons (for icons)
  - Shacn (for styling)

- **Backend**:
  - Express (for server-side logic)
  - Multer (for file uploads)
  - Cloudinary (for storing hotel images)
  - Docker (for containerization)

## Setup Guide

### Prerequisites

- **Node.js:** v20.0.0 or higher (LTS recommended)
- **npm:** v10.0.0 or higher
- **Docker Desktop:** v20.10+ (for containerized setup)

### Option 1: Docker Setup (Recommended) 🐳

The easiest way to run the entire application:

```bash
# 1. Clone the repository
git clone https://github.com/subediaakash/hotel-management-system.git
cd hotel-management-system

# 2. Copy and configure environment variables
cp .env.example .env
# Edit .env with your Cloudinary credentials

# 3. Start everything with one command
docker-compose up
```

**That's it!** The application will:
- Start PostgreSQL database
- Run Prisma migrations
- Seed initial data
- Start backend API (http://localhost:5000)
- Start frontend dev server (http://localhost:5173)

📚 For detailed Docker instructions, see [DOCKER_SETUP.md](DOCKER_SETUP.md)

### Option 2: Manual Setup

If you prefer running services individually:

#### 1. Clone the Repository

```bash
git clone https://github.com/subediaakash/hotel-management-system.git
cd hotel-management-system
```

#### 2. Set up the Backend

```bash
cd backend

# Install dependencies
npm install

# Start PostgreSQL (using Docker)
docker-compose up -d

# Configure environment
cp .env.example .env
# Edit .env with your configuration

# Run migrations and seed
npx prisma migrate dev
npx prisma db seed

# Start development server
npm run dev
```

Backend will run on http://localhost:5000

#### 3. Set up the Frontend

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Set VITE_API_URL=http://localhost:5000/api

# Start development server
npm run dev
```

Frontend will run on http://localhost:5173

### 4. Add Hotels and Locations

- Sign up as an **Admin** to add new hotels and manage locations.

Once everything is set up, you are ready to explore and use the Hotel Management System!

---

Enjoy your hotel booking experience!



### TODO : add admin side ui for adding hotels and verifying bookings

