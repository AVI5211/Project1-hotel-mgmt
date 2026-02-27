#!/bin/bash

# Hotel Management System - Quick Start Script
# This script helps you set up the project quickly

set -e

echo "🏨 Hotel Management System - Quick Start"
echo "=========================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Error: Docker is not installed."
    echo "Please install Docker Desktop from: https://www.docker.com/products/docker-desktop"
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Error: Docker Compose is not installed."
    echo "Please install Docker Compose."
    exit 1
fi

echo "✅ Docker is installed"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo ""
    echo "⚠️  IMPORTANT: Please edit .env and set your JWT_SECRET!"
    echo "   Cloudinary is OPTIONAL - you can leave it empty for local dev."
    echo "   Images will be stored locally in backend/src/uploads/"
    echo ""
    read -p "Press Enter after you've configured .env (or press Ctrl+C to exit)..."
fi

echo "🚀 Starting all services..."
echo ""

# Use docker-compose or docker compose based on availability
if command -v docker-compose &> /dev/null; then
    docker-compose up
else
    docker compose up
fi
