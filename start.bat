@echo off
REM Hotel Management System - Quick Start Script for Windows
REM This script helps you set up the project quickly

echo.
echo 🏨 Hotel Management System - Quick Start
echo ==========================================
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Docker is not installed.
    echo Please install Docker Desktop from: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

echo ✅ Docker is installed
echo.

REM Check if .env exists
if not exist .env (
    echo 📝 Creating .env file from .env.example...
    copy .env.example .env
    echo.
    echo ⚠️  IMPORTANT: Please edit .env and add your Cloudinary credentials!
    echo    Get free credentials at: https://cloudinary.com
    echo.
    pause
)

echo 🚀 Starting all services...
echo.

docker-compose up
